import React, { useState, useEffect } from 'react';
import FluidCanvas from './components/FluidCanvas';
import Navbar from './components/Navbar';
import BottomBar from './components/BottomBar';
import CustomCursor from './components/CustomCursor';
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


function PageNavigation() {
  const pages = [
    "Photography",
    "Blogs",
    "Graphic Design"
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const lenis = useLenis(({ scroll }) => {
    const current = Math.round(scroll / window.innerHeight);
    setActiveSection(current);
    setIsScrolled(prev => {
      const next = scroll > 100;
      return prev !== next ? next : prev;
    });
  });

  const scrollTo = (index) => {
    if (lenis) {
      lenis.scrollTo(index * window.innerHeight, { lerp: 0.05 });
    }
  };

  return (
    <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-8 text-[12px] font-bold transition-opacity duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {[0, 1, 2].map((i) => (
        <div 
          key={i}
          onClick={() => scrollTo(i)}
          className={`group flex items-center justify-end cursor-pointer transition-colors duration-300 text-slate hover:text-bbblack`}
        >
          <span className="flex">
            <span>{pages[i][0]}</span>
            <span className="max-w-0 opacity-0 overflow-hidden transition-all duration-1800 ease-in-out group-hover:max-w-[150px] group-hover:opacity-100 whitespace-nowrap">
              {pages[i].slice(1)}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}


function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useLenis(({ scroll }) => {
    // Fade out over the first 200px of scroll
    const newOpacity = Math.max(0, 1 - scroll / 200);
    setOpacity(newOpacity);
  });

  return (
    <div
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 transition-opacity duration-300 pointer-events-none"
      style={{ opacity }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-bbblack animate-bounce"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}


function App() {
  return (
    <ReactLenis root>
      <div className="relative w-full">
        <CustomCursor />
        <Navbar />
        <DotNavigation />
        <PageNavigation />
        {/* Physical Scroll Sections */}
        <main className="relative">
          <section className="h-screen w-full" data-section="0" />
          <section className="h-screen w-full" data-section="1" />
          <section className="h-screen w-full" data-section="2" />
          <section className="h-screen w-full" data-section="3" />
          <section className="h-screen w-full" data-section="4" />
        </main>

        <FluidCanvas />
        <ScrollIndicator />
        <BottomBar />
      </div>
    </ReactLenis>
  )
}

export default App;
