import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Terminal as TerminalIcon, Send, Bot, Key, Settings2, Globe, HelpCircle, Maximize2, Minimize2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { FAUSTO_AGENT_PROMPT } from '../data/agentPrompt';
import { docsRagMeta, getDocsContextForQuery } from '../lib/docsRag';
import { uiText, type Lang } from '../data/uiText';

const getInitialMessages = (lang: Lang) => [
    { role: 'system', content: uiText[lang].chat.initialSystem },
    { role: 'model', content: uiText[lang].chat.initialModel }
];

type AgentChatProps = { lang: Lang };

const AgentChat = ({ lang }: AgentChatProps) => {
    const labels = uiText[lang].chat;
    const [messages, setMessages] = useState<{ role: string, content: string }[]>(() => {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { return getInitialMessages(lang); }
        }
        return getInitialMessages(lang);
    });
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messageCount, setMessageCount] = useState(parseInt(localStorage.getItem('chatMsgCount') || '0'));
    const [showKeyInput, setShowKeyInput] = useState(false);
    const [customKey, setCustomKey] = useState(localStorage.getItem('customGeminiKey') || '');
    const [useWebSearch, setUseWebSearch] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const isSendingRef = useRef(false);

    const handleSaveKey = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedKey = customKey.trim();
        localStorage.setItem('customGeminiKey', trimmedKey);
        setShowKeyInput(false);
        setMessages(prev => [...prev, { role: 'system', content: trimmedKey ? 'Custom API key saved! Guest limits disabled.' : 'Custom API key removed. Using guest rate limits.' }]);
    };

    const handleClearChat = () => {
        setMessages(getInitialMessages(lang));
        localStorage.removeItem('chatHistory');
        localStorage.setItem('chatMsgCount', '0');
        setMessageCount(0);
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }, [messages, isTyping]);

    useEffect(() => {
        const initial = getInitialMessages(lang);
        setMessages(initial);
        localStorage.setItem('chatHistory', JSON.stringify(initial));
        localStorage.setItem('chatMsgCount', '0');
        setMessageCount(0);
    }, [lang]);

    const getAgentResponse = async (userInput: string, chatHistory: any[]) => {
        const activeKey = customKey.trim() || import.meta.env.VITE_GEMINI_API_KEY;

        if (!activeKey) {
            return "FaustoOS is currently in offline demo mode. Please click the Settings/Gear icon above to provide your own Gemini API key and activate the agent safely, or reach out to Fausto directly via email at faustosaccoccio1988@gmail.com!";
        }

        try {
            const dynamicAi = new GoogleGenAI({ apiKey: activeKey });
            const extractErrorMessage = (error: any): string => {
                if (typeof error?.message === 'string' && error.message.length > 0) return error.message;
                if (typeof error?.error?.message === 'string' && error.error.message.length > 0) return error.error.message;
                try {
                    return JSON.stringify(error);
                } catch {
                    return String(error);
                }
            };

            const shouldFallbackNoTools = (error: any): boolean => {
                const message = extractErrorMessage(error);
                return (
                    message.includes('Tool use with function calling is unsupported by the model') ||
                    message.includes('function_calling_config') ||
                    message.includes('not found for API version') ||
                    message.includes('is not found')
                );
            };

            const runGenerate = async (model: string, tools?: any) => {
                try {
                    return await dynamicAi.models.generateContent({
                        model,
                        contents: historyContents,
                        config: {
                            systemInstruction: FAUSTO_AGENT_PROMPT,
                            temperature: 0.2,
                            tools
                        }
                    });
                } catch (error: any) {
                    if (!tools || !shouldFallbackNoTools(error)) throw error;
                    return await dynamicAi.models.generateContent({
                        model: 'gemini-2.5-flash-lite',
                        contents: historyContents,
                        config: {
                            systemInstruction: FAUSTO_AGENT_PROMPT,
                            temperature: 0.2
                        }
                    });
                }
            };

            // Convert local state messages to Gemini prompt format and append new input
            const historyContents: any[] = chatHistory
                .filter(m => m.role !== 'system')
                .map(m => ({ role: m.role, parts: [{ text: m.content }] }));

            historyContents.push({ role: 'user', parts: [{ text: userInput }] });
            let docsContextResult: Awaited<ReturnType<typeof getDocsContextForQuery>> = null;
            if (useWebSearch) {
                docsContextResult = await getDocsContextForQuery(userInput, {
                    onStatus: (message) => setMessages(prev => [...prev, { role: 'system', content: message }])
                });
            }

            const weakDocsConfidence = Boolean(docsContextResult && docsContextResult.topScore < 0.03);
            if (weakDocsConfidence) {
                setMessages(prev => [...prev, {
                    role: 'system',
                    content: '[Docs-RAG] Low relevance in local docs chunks, falling back to web search route.'
                }]);
            }

            const route = !useWebSearch ? 'base' : (docsContextResult && !weakDocsConfidence ? 'docs_rag' : 'web_search');

            let response: any;

            if (route === 'docs_rag') {
                setMessages(prev => [...prev, {
                    role: 'system',
                    content: `[Docs-RAG] Using ${docsContextResult?.sourceLabel} (${docsContextResult?.chunkCount} retrieved chunks${docsContextResult?.usedCache ? ', cached index' : ''}, top score: ${docsContextResult?.topScore.toFixed(3)}).`
                }]);

                const ragPrompt = [
                    'You are answering with local documentation retrieval context.',
                    'Use only the retrieved snippets below when stating doc-specific claims.',
                    'If context is insufficient, say what is missing and suggest enabling Search ON for broader web context.',
                    '',
                    'Retrieved documentation context:',
                    docsContextResult?.context || ''
                ].join('\n');

                historyContents.push({ role: 'user', parts: [{ text: ragPrompt }] });

                response = await runGenerate('gemini-2.5-flash-lite');
            } else {
                const tools = route === 'web_search' ? [{ googleSearch: {} }] : undefined;
                const model = route === 'web_search' ? 'gemini-2.5-flash' : 'gemini-2.5-flash-lite';
                response = await runGenerate(model, tools);
            }

            if (response?.text) return response.text;
            if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
                return response.candidates[0].content.parts[0].text;
            }
            return "I was unable to formulate a response.";
        } catch (error: any) {
            console.error("Gemini API Error:", error);
            if (error?.message?.includes('API key not valid') || error?.status === 401 || error?.status === 403) {
                return "Authentication error: The provided API key is invalid or unauthorized. Please verify your custom key in the settings panel.";
            }

            let errorMessage = "Unknown error connecting to the LLM endpoint.";
            try {
                const parsed = JSON.parse(error?.message || '');
                if (parsed.error && parsed.error.message) {
                    errorMessage = parsed.error.message;
                }
            } catch (e) {
                errorMessage = error?.message || error?.error?.message || error.toString();
            }
            return `Gemini API Error: ${errorMessage}`;
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSendingRef.current) return;
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');

        // Only enforce rate limit if no custom key is provided
        if (!customKey.trim() && messageCount >= 10) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }, { role: 'system', content: 'RATE LIMIT EXCEEDED' }, { role: 'model', content: "Host rate limit exceeded. Guest sessions are limited to 10 messages to prevent API abuse. To continue chatting, please provide your own Gemini API key." }]);
            return;
        }

        if (!customKey.trim()) {
            setMessageCount(prev => {
                const newCount = prev + 1;
                localStorage.setItem('chatMsgCount', newCount.toString());
                return newCount;
            });
        }

        // Keep local reference to history for the API call 
        const currentHistory = [...messages];
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsTyping(true);
        isSendingRef.current = true;

        try {
            const response = await getAgentResponse(userMessage, currentHistory);
            setMessages(prev => [...prev, { role: 'model', content: response }]);
        } finally {
            setIsTyping(false);
            isSendingRef.current = false;
        }
    };

    const chatContent = (
        <div className={`transition-all duration-300 ease-in-out bg-slate-950/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col ${isExpanded
            ? 'fixed inset-4 md:inset-12 z-[9999] h-[calc(100vh-2rem)] md:h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] md:w-[calc(100vw-6rem)] max-w-none resize-none'
            : 'w-full max-w-lg mx-auto relative h-[400px] min-h-[300px] max-h-[80vh] resize-y'
            }`}>

            {/* Header */}
            <div className="flex flex-col border-b border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-slate-900 gap-2 sm:gap-0">
                    <div className="flex items-center">
                        <div className="flex gap-2 mr-3 sm:mr-4">
                            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-400 font-mono flex items-center gap-1 sm:gap-2">
                            <TerminalIcon size={12} className="text-blue-400 sm:w-3.5 sm:h-3.5" /> pydantic_agent_v3.py <span className="hidden sm:inline">(Live)</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
                        <button
                            type="button"
                            onClick={handleClearChat}
                            className="p-1 sm:p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-colors text-[10px] sm:text-xs font-medium"
                            title="Clear Chat History"
                        >
                            {labels.clear}
                        </button>
                        <button
                            type="button"
                            onClick={() => setUseWebSearch(!useWebSearch)}
                            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-colors text-[10px] sm:text-xs font-medium border ${useWebSearch ? 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30' : 'text-slate-500 bg-slate-800/50 border-slate-700/50 hover:text-slate-300'}`}
                            title="Toggle Web Browsing"
                        >
                            <Globe size={12} className={`sm:w-3.5 sm:h-3.5 ${useWebSearch ? 'animate-pulse' : ''}`} />
                            <span>{useWebSearch ? labels.searchOn : labels.searchOff}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowKeyInput(!showKeyInput)}
                            className={`p-1 sm:p-1.5 rounded-md transition-colors ${customKey.trim() ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-400 hover:text-blue-400 hover:bg-blue-400/10'}`}
                            title="Bring Your Own Keys"
                        >
                            <Settings2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-1 sm:p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                            title={isExpanded ? "Minimize Chat" : "Maximize Chat"}
                        >
                            {isExpanded ? <Minimize2 size={14} className="sm:w-4 sm:h-4" /> : <Maximize2 size={14} className="sm:w-4 sm:h-4" />}
                        </button>
                    </div>
                </div>

                {/* BYOK Input Area */}
                {showKeyInput && (
                    <div className="px-4 py-3 bg-slate-900/50 border-t border-slate-800/50 flex flex-col gap-2">
                        <form onSubmit={handleSaveKey} className="flex gap-2">
                            <div className="relative flex-1 text-slate-500">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2"><Key size={14} /></span>
                                <input
                                    type="password"
                                    value={customKey}
                                    onChange={(e) => setCustomKey(e.target.value)}
                                    placeholder={labels.keyPlaceholder}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 pl-9 pr-3 text-slate-300 font-mono text-xs focus:outline-none focus:border-blue-500/50 placeholder:text-slate-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
                            >
                                {labels.saveKey}
                            </button>
                        </form>
                        <div className="flex items-center justify-end gap-1.5 mt-1">
                            <div className="relative group flex items-center">
                                <HelpCircle size={12} className="text-slate-500 hover:text-slate-300 cursor-help" />
                                <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 border border-slate-700 rounded shadow-xl text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                    Generate a free key, paste it here, and click Save. Your key is stored securely in your browser and is never sent to our servers.
                                </div>
                            </div>
                            <a
                                href="https://aistudio.google.com/app/api-keys"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-slate-500 hover:text-emerald-400 transition-colors"
                            >
                                {labels.getFreeKey}
                            </a>
                        </div>
                    </div>
                )}

                <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-900/50">
                    <div className="text-[10px] text-slate-400">
                        {labels.ragInfo} ({docsRagMeta.maxContextChunks} chunks max, ~{docsRagMeta.chunkSize} chars/chunk)
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="text-[10px] text-slate-500">{labels.suggestionsTitle}</span>
                        {labels.suggestions.map((suggestion, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setInput(suggestion)}
                                className="px-2 py-1 rounded border border-slate-700 text-[10px] text-slate-300 hover:bg-slate-800 transition-colors text-left"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} `}>

                        {msg.role === 'system' && (
                            <div className="w-full text-center text-slate-600 text-xs italic my-2">
                                {msg.content}
                            </div>
                        )}

                        {msg.role === 'model' && (
                            <div className="flex gap-2 max-w-[85%]">
                                <div className="w-6 h-6 rounded bg-blue-900/50 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot size={14} className="text-blue-400" />
                                </div>
                                <div className="bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl rounded-tl-sm px-4 py-2 leading-relaxed whitespace-pre-wrap">
                                    {msg.content}
                                </div>
                            </div>
                        )}

                        {msg.role === 'user' && (
                            <div className="flex gap-2 max-w-[85%] flex-row-reverse">
                                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 leading-relaxed shadow-lg shadow-blue-500/20">
                                    {msg.content}
                                </div>
                            </div>
                        )}

                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-2 max-w-[85%]">
                        <div className="w-6 h-6 rounded bg-blue-900/50 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot size={14} className="text-blue-400" />
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900/80 border-t border-slate-800">
                <div className="relative flex items-center">
                    <span className="absolute left-3 text-blue-500 font-mono font-bold">{'>'}</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={labels.inputPlaceholder}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-8 pr-12 text-slate-200 font-mono text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:bg-slate-800 hover:bg-blue-500 transition-colors"
                    >
                        <Send size={14} />
                    </button>
                </div>
            </form>

        </div>
    );

    // If expanded, break out of the DOM hierarchy completely to avoid CSS transform/relative parent trapping
    if (isExpanded) {
        return createPortal(
            <div className="fixed inset-0 z-[9990] bg-slate-950/80 backdrop-blur-sm">
                {chatContent}
            </div>,
            document.body
        );
    }

    return chatContent;
}

export default AgentChat;
