import AgentChat from './AgentChat';
import type { Lang, Theme } from '../data/uiText';

type HeroProps = {
    lang: Lang;
    theme: Theme;
    text: {
        badge: string;
        titleTop: string;
        titleBottom: string;
        description: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };
};

const Hero = ({ lang, theme, text }: HeroProps) => {
    return (
        <section id="home" className="min-h-[95vh] flex flex-col lg:flex-row items-center justify-between relative z-10 pt-24 pb-12 gap-12">

            {/* Left side: Text Content */}
            <div className="w-full lg:w-[55%] flex flex-col text-left">

                {/* Dynamic Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 self-start hover-lift ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    <span className={`text-xs sm:text-sm font-medium tracking-wide uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{text.badge}</span>
                </div>

                <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.05] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {text.titleTop} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 animate-pulse-glow">{text.titleBottom}</span>
                </h1>

                <p className={`text-base sm:text-lg md:text-xl max-w-xl font-light leading-relaxed mb-10 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {text.description}
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                    <a href="#projects" className="group relative px-8 py-3.5 bg-white text-slate-950 font-bold text-base rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center border border-transparent">
                        <span className="relative flex items-center justify-center gap-2">
                            {text.ctaPrimary}
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </a>

                    <a href="#contact" className={`px-8 py-3.5 font-bold text-base rounded-xl border transition-all duration-300 w-full sm:w-auto text-center ${theme === 'dark' ? 'text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800' : 'text-slate-700 border-slate-300 hover:text-slate-900 hover:bg-slate-200'}`}>
                        {text.ctaSecondary}
                    </a>
                </div>
            </div>

            {/* Right side: Interactive Terminal Chat */}
            <div className="w-full lg:w-[45%] relative perspective-1000 mt-8 md:mt-12 lg:mt-0 xl:mb-0 mb-4 flex justify-center">
                {/* Background decorative glow for terminal */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-20 blur-2xl rounded-full z-0 animate-pulse-glow"></div>
                <div className="relative z-10 w-full transform lg:rotate-y-[-5deg] lg:rotate-x-[5deg] transition-transform duration-500 hover:rotate-y-0 hover:rotate-x-0">
                    <AgentChat lang={lang} />
                </div>
            </div>

        </section>
    );
};

export default Hero;
