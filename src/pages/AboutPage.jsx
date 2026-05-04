import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SwitchO from '../components/SwitchO';
import SidebarNavigation from '../components/SidebarNavigation';
import ContactModal from '../components/ContactModal';

const SIDEBAR_LINKS = ['Photography', 'Graphic Design', 'Blogs'];

const TypingCursor = () => (
  <span className="relative inline-block ml-[2px]">
    <span className="animate-cursor-blink font-light text-[#0D99FF]">|</span>
    <span className="absolute left-full top-0 ml-[2px] whitespace-nowrap bg-[#0D99FF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm z-10 tracking-wide leading-none font-sans" style={{ marginTop: '0.2em' }}>
      Alen Koikkara
    </span>
  </span>
);

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [visibleHeaderCount, setVisibleHeaderCount] = useState(0);
  const [visibleParaCount, setVisibleParaCount] = useState(0);
  const navigate = useNavigate();
  const pageRoutes = ["/photography", "/graphicdesign", "/blogs"];

  const PARA_TEXT = "Most people see a computer screen; I see a playground for interactive storytelling. With a background in Computer Science and a passion for premium branding, I specialize in the 'Artisan' side of tech. Whether it's designing a full-stack investment dashboard or crafting a scroll-linked 3D experience, I'm all about creating tools that are as beautiful as they are functional. I don't just write code—I build digital atmospheres.";

  const TEXT_ITEMS = [
    'S', <SwitchO key="o1" fontSize="inherit" />, 'm', 'e', 't', 'h', 'i', 'n', 'g', ' ',
    'a', 'b', <SwitchO key="o2" fontSize="inherit" />, 'u', 't', ' ', 'm', 'e', '.', '.', '.'
  ];

  useEffect(() => {
    let isMounted = true;
    
    const typeSequence = async () => {
      // Type "Something about"
      for (let i = 1; i <= 15; i++) {
        if (!isMounted) return;
        await new Promise(r => setTimeout(r, Math.random() * 50 + 50)); 
        setVisibleHeaderCount(i);
      }
      
      // Thinking pause at "about"
      if (!isMounted) return;
      await new Promise(r => setTimeout(r, 1000));

      // Finish " me..."
      for (let i = 16; i <= 21; i++) {
        if (!isMounted) return;
        await new Promise(r => setTimeout(r, Math.random() * 50 + 50));
        setVisibleHeaderCount(i);
      }

      // Small pause before moving to paragraph
      if (!isMounted) return;
      await new Promise(r => setTimeout(r, 400));

      // Determine 3 random indices to pause at during paragraph typing
      const pauseIndices = [];
      for(let i=0; i<3; i++) {
        pauseIndices.push(Math.floor(Math.random() * (PARA_TEXT.length - 20)) + 10);
      }

      // Type out paragraph
      for (let i = 1; i <= PARA_TEXT.length; i++) {
        if (!isMounted) return;
        await new Promise(r => setTimeout(r, Math.random() * 15 + 10)); // Faster typing for long text
        setVisibleParaCount(i);
        
        if (pauseIndices.includes(i)) {
          // Pause and blink randomly
          await new Promise(r => setTimeout(r, Math.random() * 500 + 400));
        }
      }
    };
    
    const timer = setTimeout(typeSequence, 400);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative flex flex-col items-center justify-center" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      <SidebarNavigation 
        links={SIDEBAR_LINKS} 
        activeIndex={-1} 
        onLinkClick={(index) => navigate(pageRoutes[index])}
      />

      <style>
        {`
          @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-cursor-blink {
            animation: cursor-blink 1s step-end infinite;
          }
        `}
      </style>

      <div className="w-full px-8 flex flex-col items-center mt-[-10vh]">
        <h1 className="text-[54px] md:text-[72px] font-bold text-bbblack leading-none mb-24 text-center">
          {TEXT_ITEMS.slice(0, visibleHeaderCount).map((item, idx) => (
            <React.Fragment key={idx}>{item}</React.Fragment>
          ))}
          {visibleHeaderCount < TEXT_ITEMS.length && (
            <TypingCursor />
          )}
        </h1>
        
        <div className="max-w-[500px] w-full text-left">
          <p className="text-[13px] md:text-[15px] text-[#404040] font-semibold leading-relaxed mb-8">
            {PARA_TEXT.slice(0, visibleParaCount)}
            {visibleHeaderCount === TEXT_ITEMS.length && (
              <TypingCursor />
            )}
          </p>
          
          <div 
            onClick={() => setIsContactOpen(true)}
            className={`inline-flex items-center text-[13px] font-bold text-slate hover:text-bbblack transition-opacity duration-1000 cursor-pointer ${visibleParaCount === PARA_TEXT.length ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            Lets build something 
            <svg className="w-3 h-3 ml-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 16.8V7H7.2"/>
            </svg>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
