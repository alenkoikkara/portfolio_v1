import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FluidCanvas from './components/FluidCanvas';
import Navbar from './components/Navbar';
import BottomBar from './components/BottomBar';
import CustomCursor from './components/CustomCursor';
import PhotographyPage from './pages/PhotographyPage';
import SidebarNavigation from './components/SidebarNavigation';
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
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 mix-blend-difference">
      {[0, 1, 2, 3, 4].map((i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          className={`w-[6px] h-[6px] cursor-pointer border transition-all duration-300 ${activeSection === i ? 'border-white scale-150' : 'border-white/50'
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

  const pageRoutes = ["/photography", null, null];
  const navigate = useNavigate();

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
    if (pageRoutes[index]) {
      navigate(pageRoutes[index]);
      return;
    }
    if (lenis) {
      lenis.scrollTo(index * window.innerHeight, { lerp: 0.05 });
    }
  };

  return (
    <SidebarNavigation 
      links={pages}
      activeIndex={-1}
      className={`transition-opacity duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onLinkClick={scrollTo}
    />
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


function HomePage() {
  return (
    <ReactLenis root>
      <div className="relative w-full">
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
      </div>
    </ReactLenis>
  );
}

import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="relative w-full">
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <BottomBar />
    </div>
  );
}

export default App;
