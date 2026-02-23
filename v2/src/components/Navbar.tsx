import { useState } from 'react';
import type { Lang, Theme } from '../data/uiText';

type NavbarProps = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    lang: Lang;
    setLang: (lang: Lang) => void;
    navText: {
        home: string;
        expertise: string;
        projects: string;
        contact: string;
        theme: string;
        language: string;
    };
};

const Navbar = ({ theme, setTheme, lang, setLang, navText }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const links = [
        { name: navText.home, href: '#home' },
        { name: navText.expertise, href: '#expertise' },
        { name: navText.projects, href: '#projects' },
        { name: navText.contact, href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full backdrop-blur-md z-50 border-b ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/85 border-slate-200'}`}>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <img src="/portfolio/images/Ai_logo.png" alt="Fausto Saccoccio" className="h-8 w-auto opacity-100" />
                        <span className={`ml-3 font-semibold text-lg tracking-tight hidden sm:block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Fausto Saccoccio</span>
                    </div>

                    <div className="hidden lg:block">
                        <div className="ml-8 flex items-center space-x-4">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`animated-underline px-3 py-2 text-sm font-medium ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button
                                type="button"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={`px-3 py-1.5 text-xs rounded-lg border ${theme === 'dark' ? 'border-slate-700 text-slate-300 hover:text-white' : 'border-slate-300 text-slate-700 hover:text-slate-900'}`}
                            >
                                {navText.theme}: {theme === 'dark' ? 'Dark' : 'Light'}
                            </button>
                            <select
                                value={lang}
                                onChange={(e) => setLang(e.target.value as Lang)}
                                className={`px-2 py-1.5 text-xs rounded-lg border bg-transparent ${theme === 'dark' ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'}`}
                                aria-label={navText.language}
                            >
                                <option value="en">EN</option>
                                <option value="it">IT</option>
                                <option value="es">ES</option>
                            </select>
                        </div>
                    </div>

                    <div className="lg:hidden flex items-center">
                        <button
                            type="button"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`mr-2 px-2 py-1 text-[10px] rounded border ${theme === 'dark' ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'}`}
                        >
                            {theme === 'dark' ? 'Dark' : 'Light'}
                        </button>
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value as Lang)}
                            className={`mr-2 px-1.5 py-1 text-[10px] rounded border bg-transparent ${theme === 'dark' ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'}`}
                            aria-label={navText.language}
                        >
                            <option value="en">EN</option>
                            <option value="it">IT</option>
                            <option value="es">ES</option>
                        </select>
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} focus:outline-none`}
                        >
                            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className={`md:hidden backdrop-blur-lg absolute w-full left-0 origin-top ${theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'}`}>
                    <div className="pt-2 pb-3 space-y-1 shadow-xl">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
