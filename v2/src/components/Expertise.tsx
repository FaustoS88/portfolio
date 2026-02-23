const Expertise = () => {
    return (
        <section id="expertise" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                    My <span className="gradient-text">Expertise</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
                    Specializing in cutting-edge AI Agents development with a full stack approach
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="glow-card bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-700">
                    <div className="text-blue-400 text-3xl sm:text-4xl mb-4 sm:mb-6">
                        <i className="fas fa-robot"></i>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">AI Agent Engineering</h3>
                    <p className="text-slate-400 mb-5 sm:mb-6 text-sm sm:text-base">
                        Building sophisticated AI agents with frameworks like Pydantic-AI, LangGraph, and MCP architectures for complex problem-solving.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs sm:text-sm">Pydantic-AI</span>
                        <span className="px-2 sm:px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs sm:text-sm">LangGraph</span>
                        <span className="px-2 sm:px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs sm:text-sm">RAG</span>
                        <span className="px-2 sm:px-3 py-1 bg-pink-900/30 text-pink-400 rounded-full text-xs sm:text-sm">MCP-Servers</span>
                    </div>
                </div>

                <div className="glow-card bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-700">
                    <div className="text-purple-400 text-3xl sm:text-4xl mb-4 sm:mb-6">
                        <i className="fas fa-layer-group"></i>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Full Stack Development</h3>
                    <p className="text-slate-400 mb-5 sm:mb-6 text-sm sm:text-base">
                        End-to-end application development with modern technologies, ensuring seamless integration between frontend and backend systems.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-red-900/30 text-red-400 rounded-full text-xs sm:text-sm">FastAPI</span>
                        <span className="px-2 sm:px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs sm:text-sm">TypeScript-React</span>
                        <span className="px-2 sm:px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs sm:text-sm">Node.js</span>
                        <span className="px-2 sm:px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs sm:text-sm">Python</span>
                        <span className="px-2 sm:px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs sm:text-sm">Vector-DB</span>
                    </div>
                </div>

                <div className="glow-card bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-700">
                    <div className="text-pink-400 text-3xl sm:text-4xl mb-4 sm:mb-6">
                        <i className="fas fa-cogs"></i>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Custom AI Solutions</h3>
                    <p className="text-slate-400 mb-5 sm:mb-6 text-sm sm:text-base">
                        Tailored AI implementations designed specifically for your business needs, from concept to deployment.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs sm:text-sm">Hybrid LLM Integration</span>
                        <span className="px-2 sm:px-3 py-1 bg-pink-900/30 text-pink-400 rounded-full text-xs sm:text-sm">Custom Workflows</span>
                        <span className="px-2 sm:px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs sm:text-sm">Fine-tuning</span>
                        <span className="px-2 sm:px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs sm:text-sm">Agent Orchestration</span>
                    </div>
                </div>
            </div>

            <div className="mt-16 sm:mt-20">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">My <span className="gradient-text">Tech Stack</span></h3>
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
                    <div className="tech-icon text-4xl sm:text-5xl text-blue-400" title="Python"><i className="fab fa-python"></i></div>
                    <div className="tech-icon text-4xl sm:text-5xl text-yellow-400" title="JavaScript"><i className="fab fa-js"></i></div>
                    <div className="tech-icon text-4xl sm:text-5xl" title="TypeScript">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" className="h-8 sm:h-10" />
                    </div>
                    <div className="tech-icon text-4xl sm:text-5xl text-blue-500" title="React"><i className="fab fa-react"></i></div>
                    <div className="tech-icon text-4xl sm:text-5xl border border-white/20 rounded p-1" title="Pydantic-AI">
                        <img src="/portfolio/Ai_logo.png" alt="Pydantic-AI" className="h-8 sm:h-10" />
                    </div>
                    <div className="tech-icon text-4xl sm:text-5xl" title="DeepSeek">
                        <img src="/portfolio/deepseek-color.ico" alt="DeepSeek" className="h-8 sm:h-10" />
                    </div>
                    <div className="tech-icon text-4xl sm:text-5xl" title="GitHub">
                        <img src="/portfolio/github.ico" alt="GitHub" className="h-8 sm:h-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
