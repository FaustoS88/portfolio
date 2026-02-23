import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 mb-20">
            <div className="glass-card max-w-4xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Decorative background glow inside the card */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/20 blur-[60px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">extraordinary.</span>
                    </h2>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                        Currently looking for new opportunities as an AI Engineer or Full Stack Developer. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                        <a
                            href="mailto:faustosaccoccio1988@gmail.com"
                            className="px-8 py-4 w-full sm:w-auto rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
                        >
                            Say Hello
                        </a>

                        <div className="flex items-center gap-2 text-slate-400 bg-slate-900/50 px-6 py-4 rounded-xl border border-slate-700/50 w-full sm:w-auto justify-center">
                            <MapPin size={18} className="text-rose-400" />
                            <span>Barcelona, Spain</span>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-800/50 flex justify-center gap-6">
                        <a
                            href="https://github.com/FaustoS88"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white hover:-translate-y-1 transition-all duration-300"
                            aria-label="GitHub"
                        >
                            <Github size={28} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/fausto-saccoccio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={28} />
                        </a>
                        <a
                            href="mailto:faustosaccoccio1988@gmail.com"
                            className="text-slate-400 hover:text-rose-400 hover:-translate-y-1 transition-all duration-300"
                            aria-label="Email"
                        >
                            <Mail size={28} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12 text-slate-500 text-sm">
                <p>&copy; 2026 Fausto Saccoccio. Built with React & Tailwind.</p>
            </div>
        </section>
    );
};

export default Contact;
