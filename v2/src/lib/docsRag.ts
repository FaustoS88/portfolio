type DocsSource = {
    key: string;
    label: string;
    baseUrl: string;
    seeds: string[];
    maxPages: number;
};

type DocsIntent =
    | { kind: 'source'; source: DocsSource }
    | { kind: 'url'; url: string; label: string; maxPages: number };

type IndexedChunk = {
    id: string;
    url: string;
    text: string;
    terms: Record<string, number>;
    length: number;
};

type CachedIndex = {
    builtAt: string;
    label: string;
    chunks: IndexedChunk[];
};

type BuildOpts = {
    onStatus?: (message: string) => void;
};

export type DocsContextResult = {
    context: string;
    sourceLabel: string;
    chunkCount: number;
    usedCache: boolean;
    topScore: number;
};

const CACHE_VERSION = 'v1';
const CHUNK_SIZE = 900;
const CHUNK_OVERLAP = 140;
const MAX_TEXT_PER_PAGE = 18000;
const MAX_CONTEXT_CHUNKS = 8;
const CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 3;

export const docsRagMeta = {
    cacheDays: Math.round(CACHE_MAX_AGE_MS / (1000 * 60 * 60 * 24)),
    maxContextChunks: MAX_CONTEXT_CHUNKS,
    chunkSize: CHUNK_SIZE
};

const SOURCES: DocsSource[] = [
    {
        key: 'pydantic-ai',
        label: 'PydanticAI Docs',
        baseUrl: 'https://ai.pydantic.dev',
        seeds: [
            'https://ai.pydantic.dev/',
            'https://ai.pydantic.dev/examples/',
            'https://ai.pydantic.dev/examples/weather-agent/'
        ],
        maxPages: 26
    },
    {
        key: 'fastapi',
        label: 'FastAPI Docs',
        baseUrl: 'https://fastapi.tiangolo.com',
        seeds: ['https://fastapi.tiangolo.com/'],
        maxPages: 10
    },
    {
        key: 'langchain',
        label: 'LangChain Docs',
        baseUrl: 'https://python.langchain.com',
        seeds: ['https://python.langchain.com/docs/introduction/'],
        maxPages: 10
    },
    {
        key: 'langgraph',
        label: 'LangGraph Docs',
        baseUrl: 'https://langchain-ai.github.io/langgraph',
        seeds: ['https://langchain-ai.github.io/langgraph/'],
        maxPages: 10
    }
];

const tokenize = (text: string): string[] =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(token => token.length > 2);

const STOP_WORDS = new Set([
    'the', 'and', 'for', 'with', 'from', 'that', 'this', 'show', 'make', 'using', 'according',
    'official', 'ufficial', 'docs', 'documentation', 'please', 'about', 'como', 'come', 'para',
    'con', 'que', 'how', 'what', 'where', 'when', 'why', 'agent'
]);

const termFrequency = (tokens: string[]): Record<string, number> => {
    const bag: Record<string, number> = {};
    for (const token of tokens) bag[token] = (bag[token] || 0) + 1;
    return bag;
};

const cacheKey = (key: string) => `docs-rag:${CACHE_VERSION}:${key}`;

const normalizeUrl = (raw: string): string | null => {
    try {
        const url = new URL(raw);
        url.hash = '';
        return url.toString();
    } catch {
        return null;
    }
};

const inferIntent = (query: string): DocsIntent | null => {
    const explicit = query.match(/https?:\/\/[^\s)]+/i)?.[0];
    if (explicit) {
        const normalized = normalizeUrl(explicit);
        if (normalized) {
            return { kind: 'url', url: normalized, label: normalized, maxPages: 8 };
        }
    }

    const q = query.toLowerCase();
    if (/pydantic[\s-]?ai|ai\.pydantic\.dev/.test(q)) return { kind: 'source', source: SOURCES[0] };
    if (/fastapi/.test(q)) return { kind: 'source', source: SOURCES[1] };
    if (/langchain/.test(q)) return { kind: 'source', source: SOURCES[2] };
    if (/langgraph/.test(q)) return { kind: 'source', source: SOURCES[3] };
    return null;
};

const fetchHtmlWithProxy = async (url: string): Promise<string> => {
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxy);
    if (!response.ok) throw new Error(`Proxy fetch failed (${response.status})`);
    const payload = await response.json();
    return payload.contents || '';
};

const parsePage = (url: string, html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const main = doc.querySelector('main, article, [role="main"], .md-content, .markdown, .content, #content');
    const text = ((main?.textContent || doc.body?.textContent) || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, MAX_TEXT_PER_PAGE);

    const links = Array.from(doc.querySelectorAll('a[href]'))
        .map(a => a.getAttribute('href') || '')
        .map(href => {
            try {
                return new URL(href, url).toString();
            } catch {
                return null;
            }
        })
        .filter((href): href is string => Boolean(href));

    return { text, links };
};

const chunkText = (url: string, text: string): IndexedChunk[] => {
    const chunks: IndexedChunk[] = [];
    if (!text) return chunks;

    let offset = 0;
    let idx = 0;
    while (offset < text.length) {
        const slice = text.slice(offset, offset + CHUNK_SIZE).trim();
        if (!slice) break;

        const tokens = tokenize(slice);
        chunks.push({
            id: `${url}#${idx}`,
            url,
            text: slice,
            terms: termFrequency(tokens),
            length: Math.max(tokens.length, 1)
        });

        if (offset + CHUNK_SIZE >= text.length) break;
        offset += CHUNK_SIZE - CHUNK_OVERLAP;
        idx += 1;
    }

    return chunks;
};

const crawl = async (seedUrls: string[], maxPages: number, baseHost: string, onStatus?: (m: string) => void): Promise<IndexedChunk[]> => {
    const queue = [...seedUrls];
    const visited = new Set<string>();
    const chunks: IndexedChunk[] = [];

    while (queue.length > 0 && visited.size < maxPages) {
        const current = normalizeUrl(queue.shift() || '');
        if (!current || visited.has(current)) continue;
        visited.add(current);

        onStatus?.(`[Docs] Reading ${visited.size}/${maxPages}: ${current}`);

        let html = '';
        try {
            html = await fetchHtmlWithProxy(current);
        } catch {
            continue;
        }

        const { text, links } = parsePage(current, html);
        chunks.push(...chunkText(current, text));

        for (const rawLink of links) {
            const link = normalizeUrl(rawLink);
            if (!link || visited.has(link)) continue;
            try {
                const parsed = new URL(link);
                if (parsed.host !== baseHost) continue;
                if (!queue.includes(link)) queue.push(link);
            } catch {
                continue;
            }
        }
    }

    return chunks;
};

const loadCache = (key: string): CachedIndex | null => {
    try {
        const raw = localStorage.getItem(cacheKey(key));
        if (!raw) return null;
        const parsed = JSON.parse(raw) as CachedIndex;
        if (!parsed?.chunks?.length) return null;

        const age = Date.now() - new Date(parsed.builtAt).getTime();
        if (age > CACHE_MAX_AGE_MS) return null;
        return parsed;
    } catch {
        return null;
    }
};

const saveCache = (key: string, value: CachedIndex) => {
    try {
        localStorage.setItem(cacheKey(key), JSON.stringify(value));
    } catch {
        // Ignore cache write errors (quota/private mode) and continue in-memory.
    }
};

const scoreChunks = (query: string, chunks: IndexedChunk[]) => {
    if (!chunks.length) return [] as Array<{ chunk: IndexedChunk; score: number }>;

    const queryTokens = tokenize(query);
    if (!queryTokens.length) return [] as Array<{ chunk: IndexedChunk; score: number }>;

    const qTerms = termFrequency(queryTokens);
    const normalizedQuery = query.toLowerCase();
    const intentTokens = queryTokens.filter(token => !STOP_WORDS.has(token));
    const weatherIntent = /\bweather\b|\bmeteo\b/.test(normalizedQuery);
    const pydanticIntent = /pydantic[\s-]?ai|ai\.pydantic\.dev/.test(normalizedQuery);
    const docCount = chunks.length;
    const df: Record<string, number> = {};
    for (const token of Object.keys(qTerms)) {
        df[token] = 0;
        for (const chunk of chunks) {
            if (chunk.terms[token]) df[token] += 1;
        }
    }

    const scored = chunks.map(chunk => {
        let score = 0;
        for (const [token, qTf] of Object.entries(qTerms)) {
            const tf = chunk.terms[token] || 0;
            if (!tf) continue;
            const idf = Math.log((docCount + 1) / ((df[token] || 0) + 1)) + 1;
            score += (tf / chunk.length) * idf * qTf;
        }

        const phrase = query.trim().toLowerCase();
        if (phrase.length > 5 && chunk.text.toLowerCase().includes(phrase)) score += 0.25;
        const lowerUrl = chunk.url.toLowerCase();
        const lowerText = chunk.text.toLowerCase();
        const urlTokens = tokenize(lowerUrl.replace(/[/:._-]+/g, ' '));
        const urlSet = new Set(urlTokens);
        const headingLike = lowerText.slice(0, 220);

        let urlOverlap = 0;
        for (const token of intentTokens) {
            if (urlSet.has(token)) urlOverlap += 1;
            if (headingLike.includes(token)) score += 0.05;
        }
        if (intentTokens.length > 0) {
            score += (urlOverlap / intentTokens.length) * 0.7;
        }

        if (weatherIntent && (lowerUrl.includes('weather') || lowerUrl.includes('example') || lowerText.includes('weather agent'))) {
            score += 0.6;
        }
        if (weatherIntent && (lowerText.includes('get_lat_lng') || lowerText.includes('get_weather'))) {
            score += 0.8;
        }
        if (pydanticIntent && lowerUrl.includes('ai.pydantic.dev')) {
            score += 0.1;
        }
        return { chunk, score };
    });

    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_CONTEXT_CHUNKS);
};

const buildIndexForIntent = async (intent: DocsIntent, opts: BuildOpts): Promise<CachedIndex> => {
    if (intent.kind === 'source') {
        const key = intent.source.key;
        const cached = loadCache(key);
        if (cached) {
            opts.onStatus?.(`[Docs] Loaded cached index: ${intent.source.label} (${cached.chunks.length} chunks).`);
            return cached;
        }

        opts.onStatus?.(`[Docs] Building local index: ${intent.source.label}...`);
        const chunks = await crawl(intent.source.seeds, intent.source.maxPages, new URL(intent.source.baseUrl).host, opts.onStatus);
        const built: CachedIndex = { builtAt: new Date().toISOString(), label: intent.source.label, chunks };
        saveCache(key, built);
        opts.onStatus?.(`[Docs] Index ready: ${chunks.length} chunks.`);
        return built;
    }

    opts.onStatus?.(`[Docs] Building local index from URL: ${intent.url}`);
    const host = new URL(intent.url).host;
    const chunks = await crawl([intent.url], intent.maxPages, host, opts.onStatus);
    return { builtAt: new Date().toISOString(), label: intent.label, chunks };
};

export const getDocsContextForQuery = async (query: string, opts: BuildOpts = {}): Promise<DocsContextResult | null> => {
    const intent = inferIntent(query);
    if (!intent) return null;

    const usedCache = intent.kind === 'source' && Boolean(loadCache(intent.source.key));
    const index = await buildIndexForIntent(intent, opts);
    if (!index.chunks.length) return null;

    const ranked = scoreChunks(query, index.chunks);
    const fallback = ranked.length
        ? ranked
        : index.chunks.slice(0, Math.min(MAX_CONTEXT_CHUNKS, index.chunks.length)).map(chunk => ({ chunk, score: 0 }));

    const contextBlocks = fallback.map((item, i) => (
        `Source ${i + 1}: ${item.chunk.url}\n` +
        `Relevance: ${item.score.toFixed(4)}\n` +
        `${item.chunk.text}`
    ));

    return {
        context: contextBlocks.join('\n\n---\n\n'),
        sourceLabel: index.label,
        chunkCount: fallback.length,
        usedCache,
        topScore: fallback[0]?.score || 0
    };
};
