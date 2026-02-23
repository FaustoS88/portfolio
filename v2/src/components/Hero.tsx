import { Terminal } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2 flex flex-col space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    Hi, I'm <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        Fausto Saccoccio
                    </span>
                </h1>

                <h2 className="text-xl sm:text-2xl font-medium text-slate-300">
                    AI Engineer & Full Stack Developer
                </h2>

                <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg">
                    I build production-grade <span className="text-purple-300 font-medium">Multi-Agent Systems</span>, <span className="text-blue-300 font-medium">RAG pipelines</span>, and scalable full-stack applications solving real-world problems.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                        href="#contact"
                        className="px-6 py-3 rounded-xl bg-slate-100 text-slate-900 font-medium hover:bg-white transition-all text-center shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        Get in Touch
                    </a>
                    <a
                        href="#projects"
                        className="px-6 py-3 rounded-xl bg-slate-800/50 text-white font-medium hover:bg-slate-800 border border-slate-700 transition-all text-center backdrop-blur-sm"
                    >
                        View My Work
                    </a>
                </div>
            </div>

            {/* Decorative Terminal/Code Window */}
            <div className="w-full md:w-1/2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-700"></div>
                <div className="relative glass-card overflow-hidden">
                    <div className="flex items-center px-4 py-3 bg-slate-900/80 border-b border-slate-800/80">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                        </div>
                        <div className="mx-auto text-xs text-slate-500 font-mono flex items-center gap-2">
                            <Terminal size={14} /> pydantic_agent.py
                        </div>
                    </div>
                    <div className="p-5 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                        <div className="text-slate-300">
                            <span className="text-purple-400">from</span> pydantic_ai <span className="text-purple-400">import</span> Agent<br />
                            <span className="text-purple-400">from</span> pydantic <span className="text-purple-400">import</span> BaseModel<br />
                            <br />
                            <span className="text-blue-400">class</span> <span className="text-emerald-300">Engineer</span>(BaseModel):<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;role: str = <span className="text-amber-300">"Multi-Agent Architect"</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;stack: list = [<span className="text-amber-300">"Python"</span>, <span className="text-amber-300">"FastAPI"</span>, <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"PostgreSQL"</span>]<br />
                            <br />
                            agent = Agent(<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;model=<span className="text-amber-300">'deepseek-v3'</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;system_prompt=<span className="text-amber-300">'Build resilient, scalable systems.'</span><br />
                            )<br />
                            <br />
                            <span className="text-slate-500"># Ready to deploy</span><br />
                            <span className="text-purple-400">await</span> agent.run(<span className="text-amber-300">"Solve complex problem"</span>)
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
