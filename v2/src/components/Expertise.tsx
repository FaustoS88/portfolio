import { BrainCircuit, Database, Layers, Terminal } from 'lucide-react';

const Expertise = () => {
    const skills = [
        {
            title: "AI & Agent Orchrestration",
            description: "Building production-grade multi-agent systems using Pydantic-AI, MCP, and LangGraph. Deep experience with function calling and contextual AI memory.",
            icon: <BrainCircuit className="text-blue-400 w-8 h-8" />,
            tags: ["Pydantic-AI", "RAG", "MCP", "LangGraph", "DeepSeek", "OpenAI"]
        },
        {
            title: "Backend Engineering",
            description: "Architecting robust microservices and fast APIs. Designing complex relational schemas and enabling vector search for semantic data retrieval.",
            icon: <Database className="text-purple-400 w-8 h-8" />,
            tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "SQLAlchemy"]
        },
        {
            title: "Frontend Development",
            description: "Crafting reactive, type-safe user interfaces with modern tooling. Emphasizing clean glassmorphism aesthetics and performance.",
            icon: <Layers className="text-pink-400 w-8 h-8" />,
            tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Streamlit"]
        },
        {
            title: "DevOps & Infrastructure",
            description: "Deploying and maintaining applications on VPS environments. Configuring secure authentication, rate-limiting, and automated deployment scripts.",
            icon: <Terminal className="text-emerald-400 w-8 h-8" />,
            tags: ["Docker", "Nginx", "Linux/VPS", "Git", "JWT Auth"]
        }
    ];

    return (
        <section id="expertise" className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Expertise</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Specialized in bridging the gap between cutting-edge AI capabilities and robust full-stack applications.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                    <div key={index} className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300">
                        <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 w-max border border-slate-700/50 group-hover:border-slate-600 transition-colors">
                            {skill.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">{skill.title}</h3>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            {skill.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {skill.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Expertise;
