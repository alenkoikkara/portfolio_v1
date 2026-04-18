import React, { useState, useEffect } from 'react';
import FluidCanvas from './components/FluidCanvas';
import Navbar from './components/Navbar';
import BottomBar from './components/BottomBar';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

function DotNavigation() {
  const [activeSection, setActiveSection] = useState(0);
  const lenis = useLenis(({ scroll }) => {
    const current = Math.round(scroll / window.innerHeight);
    setActiveSection(current);
  });

  const scrollTo = (index) => {
    if (lenis) {
      lenis.scrollTo(index * window.innerHeight, { lerp: 0.05 });
    }
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          className={`w-[6px] h-[6px] cursor-pointer border transition-all duration-300 ${activeSection === i ? 'border-dove-dark scale-150' : 'border-dove'
            }`}
          aria-label={`Scroll to section ${i + 1}`}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <ReactLenis root>
      <div className="relative w-full">
        <Navbar />
        <DotNavigation />

        {/* Physical Scroll Sections */}
        <main className="relative">
          <section className="h-screen w-full" data-section="0" />
          <section className="h-screen w-full" data-section="1" />
          <section className="h-screen w-full" data-section="2" />
          <section className="h-screen w-full" data-section="3" />
          <section className="h-screen w-full" data-section="4" />
        </main>

        <FluidCanvas />
        <BottomBar />
      </div>
    </ReactLenis>
  )
}

export default App;
