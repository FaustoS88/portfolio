
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30 font-sans overflow-x-hidden relative">
      {/* Background Blobs */}
      <div className="fixed top-[-150px] right-[-150px] md:top-[-250px] md:right-[-250px] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-blue-500/10 blur-[80px] z-0 pointer-events-none" />
      <div className="fixed bottom-[-150px] left-[-150px] md:bottom-[-250px] md:left-[-250px] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500/10 blur-[80px] z-0 pointer-events-none" />

      <div className="relative z-10 hidden opacity-5 pointer-events-none fixed inset-0 flex items-center justify-center">
        <img src="/Ai_logo.png" alt="Background" className="max-w-[80vw] max-h-[80vh] object-contain" />
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
