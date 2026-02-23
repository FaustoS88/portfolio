import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, Bot, Key, Settings2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are FaustoOS, the autonomous AI assistant for Fausto Saccoccio's 2026 portfolio.
Your purpose is to answer technical questions from recruiters and engineers about Fausto's background and projects.
Keep answers concise (1-3 sentences max), confident, and highly technical. Do NOT hallucinate. If unsure, offer his email: faustosaccoccio1988@gmail.com.

ABOUT FAUSTO:
Self-taught AI Engineer (2+ years) specializing in Python, Pydantic-AI, RAG, and Multi-Agent Orchestration. 
He builds full-stack production systems (React/TS, FastAPI, PostgreSQL/pgvector, VPS/Docker). 
His background in Natural Sciences and Financial Markets gives him strong domain intuition. He is located in Barcelona, Spain.

KEY PROJECTS:
1. Ragnablock / Ragnarok Finance (ragnarok.finance): A production multi-module AI trading platform. He architected the whole system (VPS, Nginx, Docker, strict Auth with JWT/OAuth2). Modules include Mimir (PgVector RAG), RuneForge (Pine Script generator), Valkyrie (Multi-agent scanner), and Heimdall (async alerts).
2. Pine Script Expert (Pydantic-AI/RAG): An agent crawling TradingView's docs into pgvector to generate Pine Script v6 strategies. Handles complex tool calls.
3. Gmail Agent (Pydantic-AI): Processes unread starred emails to draft context-aware replies. Avoids duplicates manually managing stars correctly.
4. Context7 / MultiLanguage RAG Agent (LangGraph): Hybrid graph-aware CLI/Streamlit app supporting routing between simple quick queries and deep step-by-step code generation.
5. AI Engineer CLI: Terminal-based multi-provider coding assistant using DeepSeek/Claude with MCP integration.

TONE: Professional, technically precise, fast-paced. Emphasize his ability to ship real-world production AI applications at high velocity from scratch.
`;

const AgentChat = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Connection established to FaustoOS v2.0... (Powered by Gemini Flash 8B)' },
        { role: 'model', content: "Hello. I'm an autonomous agent designed to answer questions about Fausto Saccoccio's engineering capabilities. What would you like to know?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messageCount, setMessageCount] = useState(parseInt(localStorage.getItem('chatMsgCount') || '0'));
    const [showKeyInput, setShowKeyInput] = useState(false);
    const [customKey, setCustomKey] = useState(localStorage.getItem('customGeminiKey') || '');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleSaveKey = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedKey = customKey.trim();
        localStorage.setItem('customGeminiKey', trimmedKey);
        setShowKeyInput(false);
        setMessages(prev => [...prev, { role: 'system', content: trimmedKey ? 'Custom API key saved! Guest rate limits disabled.' : 'Custom API key removed. Using guest rate limits.' }]);
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
    }, [messages, isTyping]);

    const getAgentResponse = async (userInput: string) => {
        const activeKey = customKey.trim() || import.meta.env.VITE_GEMINI_API_KEY;

        if (!activeKey) {
            // Fallback for demo without key
            return "FaustoOS is currently in offline demo mode. Please click the Settings/Gear icon above to provide your own Gemini API key and activate the agent safely, or reach out to Fausto directly via email at faustosaccoccio1988@gmail.com!";
        }

        try {
            const dynamicAi = new GoogleGenAI({ apiKey: activeKey });
            // Lightweight one-shot request with system instruction config
            const response = await dynamicAi.models.generateContent({
                model: 'gemini-1.5-flash-8b',
                contents: userInput,
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                    temperature: 0.2
                }
            });

            return response.text || "I was unable to formulate a response.";
        } catch (error: any) {
            console.error("Gemini API Error:", error);
            if (error?.message?.includes('API key not valid') || error?.status === 401 || error?.status === 403) {
                return "Authentication error: The provided API key is invalid or unauthorized. Please verify your custom key in the settings panel.";
            }
            return "Error connecting to the LLM endpoint. Please check the console log.";
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');

        // Only enforce rate limit if no custom key is provided
        if (!customKey.trim() && messageCount >= 10) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }, { role: 'system', content: 'RATE LIMIT EXCEEDED' }, { role: 'model', content: "Host rate limit exceeded. Guest sessions are limited to 10 messages to prevent API abuse. To continue chatting, please provide your own Gemini API key by clicking the gear icon above, or contact Fausto at faustosaccoccio1988@gmail.com." }]);
            return;
        }

        if (!customKey.trim()) {
            setMessageCount(prev => {
                const newCount = prev + 1;
                localStorage.setItem('chatMsgCount', newCount.toString());
                return newCount;
            });
        }

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsTyping(true);

        const response = await getAgentResponse(userMessage);

        setMessages(prev => [...prev, { role: 'model', content: response }]);
        setIsTyping(false);
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-slate-950/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col h-[400px]">

            {/* Header */}
            <div className="flex flex-col border-b border-slate-800">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900">
                    <div className="flex items-center">
                        <div className="flex gap-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                            <TerminalIcon size={14} className="text-blue-400" /> pydantic_agent_v3.py (Live)
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowKeyInput(!showKeyInput)}
                        className={`p-1.5 rounded-md transition-colors ${customKey.trim() ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-400 hover:text-blue-400 hover:bg-blue-400/10'}`}
                        title="Bring Your Own Key"
                    >
                        <Settings2 size={16} />
                    </button>
                </div>

                {/* BYOK Input Area */}
                {showKeyInput && (
                    <form onSubmit={handleSaveKey} className="px-4 py-3 bg-slate-900/50 border-t border-slate-800/50 flex gap-2">
                        <div className="relative flex-1 text-slate-500">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2"><Key size={14} /></span>
                            <input
                                type="password"
                                value={customKey}
                                onChange={(e) => setCustomKey(e.target.value)}
                                placeholder="Paste Gemini API Key (Optional)..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 pl-9 pr-3 text-slate-300 font-mono text-xs focus:outline-none focus:border-blue-500/50 placeholder:text-slate-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                            Save
                        </button>
                    </form>
                )}
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
                        placeholder="Ask about my tech stack..."
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
}

export default AgentChat;
