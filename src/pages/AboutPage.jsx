import React, { useState } from 'react';
import SwitchO from '../components/SwitchO';
import SidebarNavigation from '../components/SidebarNavigation';
import ContactModal from '../components/ContactModal';

const SIDEBAR_LINKS = ['Photography', 'Graphic Design', 'Blogs'];

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white relative flex flex-col items-center justify-center" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      <SidebarNavigation 
        links={SIDEBAR_LINKS} 
        activeIndex={-1} 
      />

      <div className="w-full px-8 flex flex-col items-center mt-[-10vh]">
        <h1 className="text-[54px] md:text-[72px] font-bold text-bbblack leading-none mb-24 text-center">
          S<SwitchO fontSize="inherit" />mething ab<SwitchO fontSize="inherit" />ut me...
        </h1>
        
        <div className="max-w-[500px] w-full text-left">
          <p className="text-[13px] md:text-[15px] text-[#404040] font-semibold leading-relaxed mb-8">
            Most people see a computer screen; I see a playground for interactive storytelling. With a background in Computer Science and a passion for premium branding, I specialize in the 'Artisan' side of tech. Whether it's designing a full-stack investment dashboard or crafting a scroll-linked 3D experience, I'm all about creating tools that are as beautiful as they are functional. I don't just write code—I build digital atmospheres.
          </p>
          
          <div 
            onClick={() => setIsContactOpen(true)}
            className="inline-flex items-center text-[13px] font-bold text-slate hover:text-bbblack transition-opacity cursor-pointer"
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
