import { Github, Star, ExternalLink } from 'lucide-react';
import type { Lang, Theme } from '../data/uiText';

type ProjectsProps = {
    lang: Lang;
    theme: Theme;
    text: {
        headingTop: string;
        headingBottom: string;
        sub: string;
        techSpecs: string;
        stars: string;
        viewSource: string;
    };
};

const Projects = ({ lang, theme, text }: ProjectsProps) => {
    const projectsByLang = {
        en: [
        {
            title: "Pydantic-AI-Pinescript-Expert",
            description: "RAG AI Agent built with Pydantic AI serving as an expert on Pine Script v6. Capable of accurate code generation and deep technical analysis guidance.",
            stars: 35,
            tags: ["Python", "Pydantic-AI", "RAG", "pgvector", "Streamlit"],
            githubUrl: "https://github.com/FaustoS88/Pydantic-AI-Pinescript-Expert",
            featured: true,
            stats: {
                users: "10k+",
                uptime: "99.9%"
            }
        },
        {
            title: "Pydantic-AI-Gmail-Agent",
            description: "Self-managing AI agent built to handle professional Gmail accounts. Processes starred emails, generates contextual replies, and manages spam gracefully.",
            stars: 7,
            tags: ["Python", "Pydantic-AI", "Gmail API", "Automation"],
            githubUrl: "https://github.com/FaustoS88/Pydantic-AI-Gmail-Agent",
            featured: false,
            stats: {
                emails: "500+/day",
                saved: "10h/wk"
            }
        },
        {
            title: "SmolAgents-MCPs",
            description: "Advanced AI assistant utilizing the lightweight SmolAgents library integrated with Brave Search and Crawl4ai Model Context Protocol (MCP) servers.",
            stars: 4,
            tags: ["Python", "SmolAgents", "MCP", "Crawl4ai"],
            githubUrl: "https://github.com/FaustoS88/SmolAgents-MCPs",
            featured: false,
            stats: {
                models: "5+",
                speed: "Fast"
            }
        },
        {
            title: "MultiLanguage-RAG-Agent",
            description: "A comprehensive Retrieval-Augmented Generation system extracting documentation via crawl4ai powered by a reactive Streamlit UI and vector DB.",
            stars: 1,
            tags: ["Python", "RAG", "Crawl4ai", "Vector DB"],
            githubUrl: "https://github.com/FaustoS88/MultiLanguage-RAG-Agent",
            featured: false,
            stats: {
                langs: "12",
                latency: "<200ms"
            }
        }
        ],
        it: [
            {
                title: "Pydantic-AI-Pinescript-Expert",
                description: "Agente RAG costruito con Pydantic AI, specializzato in Pine Script v6. Offre generazione di codice accurata e supporto tecnico avanzato.",
                stars: 35,
                tags: ["Python", "Pydantic-AI", "RAG", "pgvector", "Streamlit"],
                githubUrl: "https://github.com/FaustoS88/Pydantic-AI-Pinescript-Expert",
                featured: true,
                stats: { users: "10k+", uptime: "99.9%" }
            },
            {
                title: "Pydantic-AI-Gmail-Agent",
                description: "Agente AI autonomo per account Gmail professionali. Elabora email importanti, genera risposte contestuali e gestisce lo spam.",
                stars: 7,
                tags: ["Python", "Pydantic-AI", "Gmail API", "Automation"],
                githubUrl: "https://github.com/FaustoS88/Pydantic-AI-Gmail-Agent",
                featured: false,
                stats: { emails: "500+/day", saved: "10h/wk" }
            },
            {
                title: "SmolAgents-MCPs",
                description: "Assistente AI avanzato con SmolAgents integrato a Brave Search e server MCP Crawl4ai.",
                stars: 4,
                tags: ["Python", "SmolAgents", "MCP", "Crawl4ai"],
                githubUrl: "https://github.com/FaustoS88/SmolAgents-MCPs",
                featured: false,
                stats: { models: "5+", speed: "Fast" }
            },
            {
                title: "MultiLanguage-RAG-Agent",
                description: "Sistema RAG completo che estrae documentazione con crawl4ai, UI Streamlit reattiva e database vettoriale.",
                stars: 1,
                tags: ["Python", "RAG", "Crawl4ai", "Vector DB"],
                githubUrl: "https://github.com/FaustoS88/MultiLanguage-RAG-Agent",
                featured: false,
                stats: { langs: "12", latency: "<200ms" }
            }
        ],
        es: [
            {
                title: "Pydantic-AI-Pinescript-Expert",
                description: "Agente RAG construido con Pydantic AI, experto en Pine Script v6. Genera codigo preciso y ofrece analisis tecnico profundo.",
                stars: 35,
                tags: ["Python", "Pydantic-AI", "RAG", "pgvector", "Streamlit"],
                githubUrl: "https://github.com/FaustoS88/Pydantic-AI-Pinescript-Expert",
                featured: true,
                stats: { users: "10k+", uptime: "99.9%" }
            },
            {
                title: "Pydantic-AI-Gmail-Agent",
                description: "Agente AI autonomo para cuentas Gmail profesionales. Procesa correos destacados, genera respuestas contextuales y gestiona spam.",
                stars: 7,
                tags: ["Python", "Pydantic-AI", "Gmail API", "Automation"],
                githubUrl: "https://github.com/FaustoS88/Pydantic-AI-Gmail-Agent",
                featured: false,
                stats: { emails: "500+/day", saved: "10h/wk" }
            },
            {
                title: "SmolAgents-MCPs",
                description: "Asistente AI avanzado con SmolAgents integrado con Brave Search y servidores MCP de Crawl4ai.",
                stars: 4,
                tags: ["Python", "SmolAgents", "MCP", "Crawl4ai"],
                githubUrl: "https://github.com/FaustoS88/SmolAgents-MCPs",
                featured: false,
                stats: { models: "5+", speed: "Fast" }
            },
            {
                title: "MultiLanguage-RAG-Agent",
                description: "Sistema RAG integral que extrae documentacion con crawl4ai, UI reactiva en Streamlit y base vectorial.",
                stars: 1,
                tags: ["Python", "RAG", "Crawl4ai", "Vector DB"],
                githubUrl: "https://github.com/FaustoS88/MultiLanguage-RAG-Agent",
                featured: false,
                stats: { langs: "12", latency: "<200ms" }
            }
        ]
    } as const;

    const projects = projectsByLang[lang];

    return (
        <section id="projects" className="py-24 relative z-10">
            <div className="text-center mb-20 relative">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    {text.headingTop} <span className="text-gradient">{text.headingBottom}</span>
                </h2>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto text-lg md:text-xl font-light`}>
                    {text.sub}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 px-4 sm:px-0">
                {projects.map((project, index) => (
                    <div key={index} className="group perspective-1000 h-[450px] w-full cursor-pointer">
                        <div className="relative w-full h-full preserve-3d">

                            {/* === FRONT FACE === */}
                            <div className={`absolute inset-0 backface-hidden backdrop-blur-sm rounded-3xl p-6 sm:p-8 flex flex-col hover-lift ${theme === 'dark' ? 'bg-slate-900/40 border border-slate-800' : 'bg-white/90 border border-slate-300 shadow-sm'}`}>
                                {project.featured && (
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-teal-500 to-emerald-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse-glow z-20">
                                        <Star className="text-white w-6 h-6 sm:w-8 sm:h-8 fill-white" />
                                    </div>
                                )}

                                <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 pr-8 sm:pr-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    {project.title}
                                </h3>

                                <p className={`text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 flex-grow ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg ${theme === 'dark' ? 'bg-slate-800/80 text-blue-300 border border-slate-700/50' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg ${theme === 'dark' ? 'bg-slate-800/80 text-slate-400 border border-slate-700/50' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                            +{project.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* === BACK FACE === */}
                            <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-8 flex flex-col justify-between ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)]' : 'bg-gradient-to-br from-white to-slate-100 border border-emerald-300/60 shadow-[0_0_30px_rgba(16,185,129,0.08)]'}`}>

                                <div>
                                    <h4 className={`text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-4 sm:mb-6 pb-3 sm:pb-4 ${theme === 'dark' ? 'border-b border-slate-800' : 'border-b border-slate-300'}`}>
                                        {text.techSpecs}
                                    </h4>

                                    <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-3 sm:gap-x-4 mb-6 sm:mb-8">
                                        {Object.entries(project.stats).map(([key, value]) => (
                                            <div key={key} className="flex flex-col">
                                                <span className={`text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5 sm:mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{key}</span>
                                                <span className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{value}</span>
                                            </div>
                                        ))}
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">{text.stars}</span>
                                            <span className="text-amber-400 text-lg sm:text-xl font-bold flex items-center gap-1.5 sm:gap-2">
                                                {project.stars} <Star size={16} className="fill-amber-400 sm:w-[18px] sm:h-[18px]" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className={`px-2 py-1 text-[10px] sm:text-xs font-medium rounded ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-emerald-100 text-emerald-700 border border-emerald-300/40'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={`flex gap-3 sm:gap-4 mt-auto pt-4 sm:pt-6 ${theme === 'dark' ? 'border-t border-slate-800/80' : 'border-t border-slate-300/80'}`}>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-950 text-sm sm:text-base font-bold py-2.5 sm:py-3 rounded-xl hover:bg-slate-200 transition-colors"
                                    >
                                        <Github size={20} /> {text.viewSource}
                                    </a>
                                    {project.featured && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-center w-14 rounded-xl transition-colors border ${theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700 border-slate-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300 border-slate-300'}`}
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>

                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
