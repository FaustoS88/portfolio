import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client using the Vite environment variable
// We use gemini-2.5-flash as it has a very generous free tier suitable for a portfolio
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'demo_key' });

const SYSTEM_INSTRUCTION = `
You are FaustoOS, an autonomous agent built by Fausto Saccoccio. 
You act as an interactive portfolio assistant for recruiters and engineers.
Keep answers very concise(1 - 3 sentences max), confident, and highly technical.
Fausto specializes in Python, Pydantic - AI, RAG pipelines, FastAPI, React / TypeScript.
He built a Pine Script Expert(35 stars), an autonomous Gmail Agent, and complex RAG and MCP tools.
He is looking for new opportunities in 2026. He is located in Barcelona, Spain.
Contact email: faustosaccoccio1988 @gmail.com
Do NOT hallucinate.If you don't know, say you are a lightweight portfolio agent and provide his email.
`;

const AgentChat = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Connection established to FaustoOS v2.0... (Powered by Gemini Flash)' },
        { role: 'model', content: "Hello. I'm an autonomous agent designed to answer questions about Fausto Saccoccio's engineering capabilities. What would you like to know?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

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
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            // Fallback for demo without key
            return "The VITE_GEMINI_API_KEY environment variable is missing. In a live environment, this would answer your query using Gemini 2.5 Flash.";
        }

        try {
            // Lightweight one-shot request with system instruction config
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userInput,
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                    temperature: 0.2
                }
            });

            return response.text || "I was unable to formulate a response.";
        } catch (error) {
            console.error("Gemini API Error:", error);
            return "Error connecting to the LLM endpoint. Please check the console log.";
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsTyping(true);

        const response = await getAgentResponse(userMessage);

        setMessages(prev => [...prev, { role: 'model', content: response }]);
        setIsTyping(false);
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-slate-950/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col h-[400px]">

            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                    <TerminalIcon size={14} className="text-blue-400" /> pydantic_agent_v3.py (Live)
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
