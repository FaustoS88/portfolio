import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import type { Theme } from '../data/uiText';

type ContactProps = {
    theme: Theme;
    text: {
        titleTop: string;
        titleBottom: string;
        sub: string;
        hello: string;
        builtWith: string;
    };
};

const Contact = ({ theme, text }: ContactProps) => {
    return (
        <section id="contact" className="py-20 mb-20">
            <div className={`glass-card max-w-4xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900/40 border border-slate-800' : 'bg-white border border-slate-200'}`}>
                {/* Decorative background glow inside the card */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/20 blur-[60px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 text-center">
                    <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {text.titleTop} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{text.titleBottom}</span>
                    </h2>

                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-lg max-w-2xl mx-auto mb-10`}>
                        {text.sub}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                        <a
                            href="mailto:faustosaccoccio1988@gmail.com"
                            className={`px-8 py-4 w-full sm:w-auto rounded-xl font-bold transition-colors shadow-lg ${theme === 'dark' ? 'bg-white text-slate-900 hover:bg-slate-200 shadow-white/10' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-500/20'}`}
                        >
                            {text.hello}
                        </a>

                        <div className={`flex items-center gap-2 px-6 py-4 rounded-xl border w-full sm:w-auto justify-center ${theme === 'dark' ? 'text-slate-400 bg-slate-900/50 border-slate-700/50' : 'text-slate-900 bg-white border-slate-300'}`}>
                            <MapPin size={18} className={theme === 'dark' ? 'text-rose-400' : 'text-slate-900'} />
                            <span>{theme === 'dark' ? 'Barcelona, Spain' : 'Barcelona, Spain'}</span>
                        </div>
                    </div>

                    <div className={`pt-8 flex justify-center gap-6 ${theme === 'dark' ? 'border-t border-slate-800/50' : 'border-t border-slate-300/80'}`}>
                        <a
                            href="https://github.com/FaustoS88"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'} hover:-translate-y-1 transition-all duration-300`}
                            aria-label="GitHub"
                        >
                            <Github size={28} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/fausto-saccoccio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'} hover:-translate-y-1 transition-all duration-300`}
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={28} />
                        </a>
                        <a
                            href="mailto:faustosaccoccio1988@gmail.com"
                            className={`${theme === 'dark' ? 'text-slate-400 hover:text-rose-400' : 'text-slate-500 hover:text-rose-500'} hover:-translate-y-1 transition-all duration-300`}
                            aria-label="Email"
                        >
                            <Mail size={28} />
                        </a>
                    </div>
                </div>
            </div>

            <div className={`text-center mt-12 text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                <p>&copy; 2026 Fausto Saccoccio. {text.builtWith}</p>
            </div>
        </section>
    );
};

export default Contact;
