import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SwitchO from '../components/SwitchO';
import SidebarNavigation from '../components/SidebarNavigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SIDEBAR_LINKS = ['Photography', 'Graphic Design', 'Blogs'];

const PROJECTS = [
  {
    id: 1,
    title: `K<span class="o-target text-transparent inline-block w-[1ch] text-center">o</span>morebi`,
    subtitle: 'Japanese Cafe',
    intro: `<span class="text-[#B25D38] font-bold">K<span class="o-target text-transparent inline-block w-[1ch] text-center">o</span>morebi</span> is a conceptual coffee brand inspired by the Japanese word 木漏れ日,<br/>which translates to "sunlight filtered through tree leaves."<br/>The brand explores calmness, warmth, and quiet moments — positioning coffee<br/>not as a rush, but as a pause.`,
    features: [
      {
        id: 1,
        title: `1. Typ<span class="o-target text-transparent inline-block w-[1ch] text-center">o</span>graphy`,
        image: '',
        content: `
          <p class="mb-3">Loram was chosen as the primary typeface for its:</p>
          <ul class="list-disc pl-5 mb-3 space-y-1">
            <li>Clean geometry</li>
            <li>Soft curves</li>
            <li>Contemporary yet calm personality</li>
          </ul>
          <p>It complements the brand's philosophy by staying legible and modern, without<br/>overpowering the visuals.</p>
        `
      },
      {
        id: 2,
        title: `2. L<span class="o-target text-transparent inline-block w-[1ch] text-center">o</span>go & Symbol`,
        image: '',
        content: `
          <p class="mb-3">The logo mark is inspired by coffee beans and organic forms, subtly referencing nature<br/>and craftsmanship.</p>
          <p>Its simplicity allows it to scale seamlessly across packaging, print, and digital touchpoints<br/>while maintaining brand recognition.</p>
        `
      },
      {
        id: 3,
        title: `3. Packaging`,
        image: '',
        content: `
          <p class="mb-3">The cup and box packaging were designed to feel quietly c<span class="o-target text-transparent inline-block w-[1ch] text-center">o</span>nfident.</p>
          <ul class="list-disc pl-5 mb-3 space-y-1">
            <li>Minimal branding allows the materials and illustrations to breathe</li>
            <li>Subtle floral detailing adds character without clutter</li>
            <li>Dark packaging reinforces a premium, reflective cafe experience</li>
          </ul>
          <p>The goal was to create packaging that feels just as thoughtful on a cafe counter as it does<br/>in the customer's hands.</p>
        `
      }
    ],
    outro: `This project demonstrates my approach to concept-driven branding, where<br/>every design decision is tied back to a central idea and emotional experience.<br/><span class="text-[#B25D38] font-bold">K<span class="o-target text-transparent inline-block w-[1ch] text-center">o</span>morebi</span> exists as a visual exploration of how branding can feel calm, poetic,<br/>and intentional, even in a fast-paced industry like coffee.`
  },
  {
    id: 2,
    title: 'Project Two',
    subtitle: 'Brand Identity',
    intro: `This is a placeholder for your second graphic design project. You can replace this text with the actual intro description for the project.`,
    features: [
      { id: 1, title: '1. Feature One', image: '', content: '<p>Description for feature one.</p>' },
      { id: 2, title: '2. Feature Two', image: '', content: '<p>Description for feature two.</p>' },
      { id: 3, title: '3. Feature Three', image: '', content: '<p>Description for feature three.</p>' }
    ],
    outro: `This is a placeholder for the outro text of your second project.`
  },
  {
    id: 3,
    title: 'Project Three',
    subtitle: 'Editorial Design',
    intro: `This is a placeholder for your third graphic design project. You can replace this text with the actual intro description for the project.`,
    features: [
      { id: 1, title: '1. Feature One', image: '', content: '<p>Description for feature one.</p>' },
      { id: 2, title: '2. Feature Two', image: '', content: '<p>Description for feature two.</p>' },
      { id: 3, title: '3. Feature Three', image: '', content: '<p>Description for feature three.</p>' }
    ],
    outro: `This is a placeholder for the outro text of your third project.`
  }
];

export default function GraphicDesignPage() {
  const navigate = useNavigate();
  const pageRoutes = ["/photography", "/graphicdesign", "/blogs"];
  const project = PROJECTS[0]; // Render only one project per page

  useEffect(() => {
    const indicator = document.getElementById('scroll-indicator');
    const handleScroll = () => {
      if (indicator) {
        const newOpacity = Math.max(0, 1 - window.scrollY / 200);
        indicator.style.opacity = newOpacity;
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init

    const timer = setTimeout(() => {
      const targets = gsap.utils.toArray('.o-target');
      const traveler = document.getElementById('traveling-o');
      if (!targets.length || !traveler) return;

      const moveTraveler = (target, duration = 0.8) => {
        // Query the DOM dynamically to ensure we get the live node, avoiding detached node issues
        const liveTargets = gsap.utils.toArray('.o-target');
        const targetIndex = targets.indexOf(target);
        const liveTarget = liveTargets[targetIndex] || target;

        const rect = liveTarget.getBoundingClientRect();
        const style = window.getComputedStyle(liveTarget);
        
        gsap.to(traveler, {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          duration: duration,
          ease: "power3.out"
        });
      };

      // Place immediately at first target
      moveTraveler(targets[0], 0);

      targets.forEach((target) => {
        ScrollTrigger.create({
          trigger: target,
          start: "top 60%", // triggers when target is 60% down the viewport
          end: "bottom top",
          onEnter: () => moveTraveler(target),
          onEnterBack: () => moveTraveler(target)
        });
      });

      const onResize = () => {
        ScrollTrigger.refresh();
        // Recalculate position for the first target dynamically or track active
        moveTraveler(targets[0], 0); // Failsafe reposition
      };
      window.addEventListener('resize', onResize);
    }, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  return (
    <div className="min-h-screen bg-white relative pb-32" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      
      {/* The Traveling O */}
      <span id="traveling-o" className="absolute top-0 left-0 pointer-events-none z-[100] m-0 p-0 font-bold text-bbblack w-[1ch] text-center inline-block">
        <SwitchO fontSize="inherit" />
      </span>

      <SidebarNavigation 
        links={SIDEBAR_LINKS} 
        activeIndex={1} 
        onLinkClick={(index) => navigate(pageRoutes[index])}
      />

      {/* Hero Section */}
      <section className="w-full h-screen flex flex-col items-center justify-center px-8">
        <h1 className="text-[48px] md:text-[64px] font-bold text-bbblack leading-none text-center max-w-[1000px]">
          A bit m<span className="o-target text-transparent inline-block w-[1ch] text-center">o</span>re to the Creative Space.
        </h1>
      </section>

      {/* Scroll Indicator */}
      <div
        id="scroll-indicator"
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none"
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

      {/* Project Details */}
      <div className="w-full flex flex-col gap-40">
        <section className="w-full px-8 max-w-[1200px] mx-auto flex flex-col items-center">
          
          {/* Project Header */}
            <div className="text-center mb-8">
              <h2 className="text-[32px] md:text-[40px] font-bold text-bbblack leading-none mb-2" dangerouslySetInnerHTML={{ __html: project.title }} />
              <p className="text-[12px] md:text-[14px] font-semibold text-slate/70">{project.subtitle}</p>
            </div>

            {/* Project Intro */}
            <div 
              className="max-w-[700px] text-center text-[12px] md:text-[14px] font-semibold text-bbblack/80 leading-relaxed mb-32"
              dangerouslySetInnerHTML={{ __html: project.intro }}
            />

            {/* Features */}
            <div className="w-full flex flex-col gap-32 mb-32">
              {project.features.map((feature) => (
                <div key={feature.id} className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full">
                  {/* Image Block */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    {feature.image ? (
                      <img src={feature.image} alt={feature.title} className="max-w-full max-h-[400px] object-contain" />
                    ) : (
                      <div className="w-full max-w-[400px] aspect-[4/3] bg-[#F7F7F7] border border-slate/10 rounded-lg flex items-center justify-center text-slate/40 font-bold text-xs uppercase tracking-widest shadow-inner">
                        Image Placeholder
                      </div>
                    )}
                  </div>

                  {/* Text Block */}
                  <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                    <h3 className="text-[24px] md:text-[28px] font-bold text-bbblack mb-6" dangerouslySetInnerHTML={{ __html: feature.title }} />
                    <div 
                      className="text-[13px] md:text-[14px] font-semibold text-bbblack/80 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: feature.content }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Project Outro */}
          <div 
            className="max-w-[700px] text-center text-[12px] md:text-[14px] font-semibold text-bbblack/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: project.outro }}
          />

        </section>
      </div>
    </div>
  );
}
