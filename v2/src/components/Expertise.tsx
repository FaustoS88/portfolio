import type { Theme } from '../data/uiText';

type ExpertiseProps = {
    theme: Theme;
    text: {
        titleTop: string;
        titleBottom: string;
        description: string;
    };
};

const Expertise = ({ theme, text }: ExpertiseProps) => {
    // We duplicate the lists to create a seamless infinite scroll effect
    const techStackTop = [
        "Python", "FastAPI", "TypeScript", "React", "Node.js", "Docker", "PostgreSQL", "Nginx", "Linux",
        "Python", "FastAPI", "TypeScript", "React", "Node.js", "Docker", "PostgreSQL", "Nginx", "Linux"
    ];

    const techStackBottom = [
        "Pydantic-AI", "LangGraph", "pgvector", "crawl4ai", "SmolAgents", "MCP Servers", "OpenAI", "Anthropic", "Gemini", "DeepSeek",
        "Pydantic-AI", "LangGraph", "pgvector", "crawl4ai", "SmolAgents", "MCP Servers", "OpenAI", "Anthropic", "Gemini", "DeepSeek"
    ];

    return (
        <section id="expertise" className={`py-24 sm:py-32 overflow-hidden relative border-t border-b ${theme === 'dark' ? 'bg-slate-950 border-white/5' : 'bg-white border-slate-200'}`}>
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16 sm:mb-24">
                <h2 className={`text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {text.titleTop} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">{text.titleBottom}</span>
                </h2>
                <p className={`text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {text.description}
                </p>
            </div>

            {/* Marquee Section */}
            <div className="w-full flex flex-col gap-6 sm:gap-8 relative select-none">

                {/* Gradient Fades for the edges */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

                {/* Top Row - Core Engineering */}
                <div className="flex overflow-hidden w-full group">
                    <div className="animate-marquee items-center gap-4 sm:gap-6 min-w-full">
                        {techStackTop.map((tech, idx) => (
                            <div key={idx} className="px-6 py-3 sm:px-8 sm:py-4 bg-slate-900 border border-slate-800 rounded-full flex-shrink-0 flex items-center gap-2 group-hover/btn:border-emerald-500/50 transition-colors">
                                <span className="text-slate-300 font-mono text-sm sm:text-base md:text-lg font-medium tracking-wide">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Row - AI Intelligence */}
                <div className="flex overflow-hidden w-full group">
                    <div className="animate-marquee-slow items-center gap-4 sm:gap-6 min-w-full" style={{ animationDirection: 'reverse' }}>
                        {techStackBottom.map((tech, idx) => (
                            <div key={idx} className="px-6 py-3 sm:px-8 sm:py-4 bg-emerald-950/20 border border-emerald-900/30 rounded-full flex-shrink-0 flex items-center gap-2 group-hover/btn:border-emerald-500/50 transition-colors">
                                <span className="text-emerald-400 font-mono text-sm sm:text-base md:text-lg font-medium tracking-wide">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Expertise;
