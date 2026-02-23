import { Github, Star } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "Pydantic-AI-Pinescript-Expert",
            description: "RAG AI Agent built with Pydantic AI that serves as an expert on Pine Script v6, providing accurate code generation and technical analysis guidance.",
            stars: null,
            tags: ["Python", "Pydantic-AI", "RAG", "pgvector", "Streamlit"],
            githubUrl: "https://github.com/FaustoS88/Pydantic-AI-Pinescript-Expert",
            featured: true
        },
        {
            title: "Pydantic-AI-Gmail-Agent",
            description: "Intelligent AI agent built to manage Gmail accounts. Processes starred emails, generates dynamic replies, and manages spam while preventing duplicate responses.",
            stars: 7,
            tags: ["Python", "Pydantic-AI", "Gmail API", "Automation"],
            githubUrl: "https://github.com/FaustoS88/Pydantic-AI-Gmail-Agent",
            featured: false
        },
        {
            title: "SmolAgents-MCPs",
            description: "AI assistant utilizing the SmolAgents library integrated with Brave Search and Crawl4ai Model Context Protocol (MCP) servers for advanced web search and orchestration.",
            stars: 4,
            tags: ["Python", "SmolAgents", "MCP", "Crawl4ai"],
            githubUrl: "https://github.com/FaustoS88/SmolAgents-MCPs",
            featured: false
        },
        {
            title: "MultiLanguage-RAG-Agent",
            description: "A comprehensive Retrieval-Augmented Generation system that extracts documentation via crawl4ai powered by a Streamlit UI and vector DB integration.",
            stars: 1,
            tags: ["Python", "RAG", "Crawl4ai", "Vector DB"],
            githubUrl: "https://github.com/FaustoS88/MultiLanguage-RAG-Agent",
            featured: false
        }
    ];

    return (
        <section id="projects" className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Projects</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    A showcase of public open-source tools and agents I've built.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`glass-card p-6 sm:p-8 flex flex-col h-full relative group transition-all duration-300 hover:border-slate-600/50 ${project.featured ? 'ring-1 ring-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : ''
                            }`}
                    >
                        {project.featured && (
                            <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white shadow-lg">
                                Top Project
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h3>
                            <div className="flex gap-3">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                                >
                                    <Github size={20} />
                                </a>
                            </div>
                        </div>

                        <p className="text-slate-400 mb-6 flex-grow leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-6 border-t border-slate-800/50">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 text-xs font-medium rounded-md bg-slate-900/80 text-blue-300 border border-slate-700/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {project.stars !== null && (
                                <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium px-2 py-1 bg-slate-900/50 rounded-md">
                                    <Star size={14} className="text-amber-400" />
                                    <span>{project.stars}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
