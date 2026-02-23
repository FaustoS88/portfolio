# Portfolio V2 (React + TypeScript)

This is the active version of the portfolio site, including the live AI chat component.

## What is implemented
- React 19 + Vite + TypeScript frontend
- BYOK Gemini integration (`@google/genai`)
- `Search ON` mode with native `googleSearch`
- Client-side Docs Mini-RAG for docs-focused questions (no backend)

## Docs Mini-RAG (Client-Side)
When a prompt looks docs-related (for example: pydantic-ai, FastAPI, LangChain, LangGraph, or an explicit docs URL), the agent can:
1. Crawl a small set of docs pages in the browser
2. Chunk the text locally
3. Cache the index in browser storage
4. Retrieve top relevant chunks per query
5. Answer using only those retrieved chunks

Implementation file:
- `src/lib/docsRag.ts`

## Local Setup
```bash
cd v2
npm install
npm run dev
```

Optional env for local development:
```bash
VITE_GEMINI_API_KEY=your_key_here
```

## Validation / Testing
### 1) Build check
```bash
npm run build
```

### 2) Gemini tools compatibility check
```bash
npm run test:gemini-tools
```
This verifies the key API behavior:
- mixed `googleSearch + functionDeclarations` fails
- `googleSearch` only works
- `functionDeclarations` only may work depending on model support

### 3) Manual UI smoke test
1. Start app with `npm run dev`
2. Open the chat widget
3. Toggle `Search ON`
4. Ask a docs question: `Can you read pydantic-ai docs and show how to build a weather agent?`
5. Confirm you see docs indexing/retrieval status lines and a grounded answer

## Deploy (GitHub Pages)
```bash
npm run deploy
```

## Notes
- This project is intentionally client-side to stay free-hosted on GitHub Pages.
- No server-side secret storage is used in production; users can provide their own API key in the UI.
