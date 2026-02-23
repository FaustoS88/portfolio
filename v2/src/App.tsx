import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { uiText, type Lang, type Theme } from './data/uiText';

function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'en');
  const t = uiText[lang];

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('theme-light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <div className={`min-h-screen overflow-x-hidden relative ${theme === 'dark' ? 'text-slate-200 bg-[#050505]' : 'text-slate-800 bg-slate-100'}`}>

      {/* Animated Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="animated-bg-shape w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-emerald-600/10 top-[-10%] left-[-10%]"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="animated-bg-shape w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-teal-600/10 bottom-[-20%] right-[-10%]"
          style={{ animationDelay: '-5s' }}
        ></div>
        <div
          className="animated-bg-shape w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-green-600/10 top-[40%] right-[10%]"
          style={{ animationDelay: '-10s' }}
        ></div>
      </div>

      <Navbar theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} navText={t.nav} />

      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero lang={lang} theme={theme} text={t.hero} />
        <Expertise theme={theme} text={t.expertise} />
        <Projects lang={lang} theme={theme} text={t.projects} />
        <Contact theme={theme} text={t.contact} />
      </main>
    </div>
  );
}

export default App;
