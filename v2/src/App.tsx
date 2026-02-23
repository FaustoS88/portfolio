import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen text-slate-200 overflow-x-hidden relative bg-[#050505]">

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

      <Navbar />

      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Expertise />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
