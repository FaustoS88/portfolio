import { Github, Star, ExternalLink } from 'lucide-react';

const Projects = () => {
    const projects = [
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
    ];

    return (
        <section id="projects" className="py-24 relative z-10">
            <div className="text-center mb-20 relative">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    Featured <span className="text-gradient">Engineering</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
                    Hover over the cards to explore the technical architecture and statistics behind my open-source intelligence platforms.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 px-4 sm:px-0">
                {projects.map((project, index) => (
                    <div key={index} className="group perspective-1000 h-[450px] w-full cursor-pointer">
                        <div className="relative w-full h-full preserve-3d">

                            {/* === FRONT FACE === */}
                            <div className="absolute inset-0 backface-hidden bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col hover-lift">
                                {project.featured && (
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-teal-500 to-emerald-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse-glow z-20">
                                        <Star className="text-white w-6 h-6 sm:w-8 sm:h-8 fill-white" />
                                    </div>
                                )}

                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 pr-8 sm:pr-10">
                                    {project.title}
                                </h3>

                                <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-800/80 text-blue-300 border border-slate-700/50">
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700/50">
                                            +{project.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* === BACK FACE === */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(16,185,129,0.15)]">

                                <div>
                                    <h4 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-4 sm:mb-6 border-b border-slate-800 pb-3 sm:pb-4">
                                        Technical Specifications
                                    </h4>

                                    <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-3 sm:gap-x-4 mb-6 sm:mb-8">
                                        {Object.entries(project.stats).map(([key, value]) => (
                                            <div key={key} className="flex flex-col">
                                                <span className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">{key}</span>
                                                <span className="text-white text-lg sm:text-xl font-bold">{value}</span>
                                            </div>
                                        ))}
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">Stars</span>
                                            <span className="text-amber-400 text-lg sm:text-xl font-bold flex items-center gap-1.5 sm:gap-2">
                                                {project.stars} <Star size={16} className="fill-amber-400 sm:w-[18px] sm:h-[18px]" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 text-[10px] sm:text-xs font-medium rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:gap-4 mt-auto pt-4 sm:pt-6 border-t border-slate-800/80">
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-950 text-sm sm:text-base font-bold py-2.5 sm:py-3 rounded-xl hover:bg-slate-200 transition-colors"
                                    >
                                        <Github size={20} /> View Source
                                    </a>
                                    {project.featured && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-14 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors border border-slate-700"
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
