import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const links = [
        { name: 'Home', href: '#home' },
        { name: 'Expertise', href: '#expertise' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <img src="/portfolio/images/Ai_logo.png" alt="Fausto Saccoccio" className="h-8 w-auto opacity-100" />
                        <span className="ml-3 font-semibold text-lg tracking-tight text-white hidden sm:block">Fausto Saccoccio</span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="animated-underline px-3 py-2 text-sm font-medium hover:text-white"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-slate-900/95 backdrop-blur-lg absolute w-full left-0 origin-top">
                    <div className="pt-2 pb-3 space-y-1 shadow-xl">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
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
