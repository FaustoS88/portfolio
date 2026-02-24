import type { Theme } from '../data/uiText';

type TechItem = { name: string; icon?: string };

type ExpertiseProps = {
    theme: Theme;
    text: {
        titleTop: string;
        titleBottom: string;
        description: string;
    };
};

const BASE = '/portfolio/assets/';
const SI = 'https://cdn.simpleicons.org';

const techStackTop: TechItem[] = [
    { name: 'Python',     icon: `${SI}/python/3776AB` },
    { name: 'FastAPI',    icon: `${SI}/fastapi/009688` },
    { name: 'TypeScript', icon: `${SI}/typescript/3178C6` },
    { name: 'React',      icon: `${SI}/react/61DAFB` },
    { name: 'Node.js',    icon: `${SI}/nodedotjs/339933` },
    { name: 'Docker',     icon: `${SI}/docker/2496ED` },
    { name: 'PostgreSQL', icon: `${SI}/postgresql/336791` },
    { name: 'GitHub',     icon: `${BASE}github.ico` },
    { name: 'AWS',        icon: `${BASE}aws-color.ico` },
    { name: 'Google Colab', icon: `${BASE}colab-color.ico` },
    { name: 'Nginx',      icon: `${SI}/nginx/00AA4E` },
    { name: 'Linux',      icon: `${SI}/linux/FCC624` },
];

const techStackBottom: TechItem[] = [
    { name: 'Pydantic-AI', icon: `${SI}/pydantic/E92063` },
    { name: 'LangGraph',   icon: `${BASE}langgraph-color.ico` },
    { name: 'LangChain',   icon: `${BASE}langchainLogo.ico` },
    { name: 'pgvector' },
    { name: 'crawl4ai' },
    { name: 'SmolAgents' },
    { name: 'MCP Servers', icon: `${BASE}mcp.ico` },
    { name: 'Anthropic',   icon: `${BASE}anthropic.ico` },
    { name: 'Claude',      icon: `${BASE}claude-color.ico` },
    { name: 'Gemini',      icon: `${BASE}gemini-color.ico` },
    { name: 'DeepSeek',    icon: `${BASE}deepseek-color.ico` },
    { name: 'HuggingFace', icon: `${BASE}huggingface-color.ico` },
    { name: 'Ollama',      icon: `${BASE}ollama.ico` },
    { name: 'OpenAI',      icon: `${SI}/openai/FFFFFF` },
];

// Duplicate for seamless infinite scroll
const topRow = [...techStackTop, ...techStackTop];
const bottomRow = [...techStackBottom, ...techStackBottom];

const Expertise = ({ theme, text }: ExpertiseProps) => {
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
                <div className={`absolute inset-y-0 left-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-r ${theme === 'dark' ? 'from-slate-950' : 'from-white'} to-transparent`}></div>
                <div className={`absolute inset-y-0 right-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-l ${theme === 'dark' ? 'from-slate-950' : 'from-white'} to-transparent`}></div>

                {/* Top Row - Core Engineering */}
                <div className="flex overflow-hidden w-full">
                    <div className="animate-marquee items-center gap-4 sm:gap-6 min-w-full">
                        {topRow.map((tech, idx) => (
                            <div key={idx} className={`px-5 py-3 sm:px-6 sm:py-4 border rounded-full flex-shrink-0 flex items-center gap-2 transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
                                {tech.icon && (
                                    <img src={tech.icon} alt={tech.name} className="h-5 w-5 object-contain flex-shrink-0" />
                                )}
                                <span className={`font-mono text-sm sm:text-base font-medium tracking-wide ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Row - AI Intelligence */}
                <div className="flex overflow-hidden w-full">
                    <div className="animate-marquee-slow items-center gap-4 sm:gap-6 min-w-full" style={{ animationDirection: 'reverse' }}>
                        {bottomRow.map((tech, idx) => (
                            <div key={idx} className={`px-5 py-3 sm:px-6 sm:py-4 border rounded-full flex-shrink-0 flex items-center gap-2 transition-colors ${theme === 'dark' ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-200'}`}>
                                {tech.icon && (
                                    <img src={tech.icon} alt={tech.name} className="h-5 w-5 object-contain flex-shrink-0" />
                                )}
                                <span className={`font-mono text-sm sm:text-base font-medium tracking-wide ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                                    {tech.name}
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
