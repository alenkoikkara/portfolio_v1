import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../components/SidebarNavigation';

import img1 from '../assets/photography/img1.webp';
import img2 from '../assets/photography/img2.webp';
import img3 from '../assets/photography/img3.webp';
import img4 from '../assets/photography/img4.webp';
import img5 from '../assets/photography/img5.webp';
import img6 from '../assets/photography/img6.webp';
import img7 from '../assets/photography/img7.webp';
import img8 from '../assets/photography/img8.webp';
import img9 from '../assets/photography/img9.webp';
import img10 from '../assets/photography/img10.webp';
import img11 from '../assets/photography/img11.webp';
import img12 from '../assets/photography/img12.webp';
import img13 from '../assets/photography/img13.webp';
import img14 from '../assets/photography/img14.webp';
import img15 from '../assets/photography/img15.webp';
import img16 from '../assets/photography/img16.webp';
import img17 from '../assets/photography/img17.webp';
import img18 from '../assets/photography/img18.webp';
import img19 from '../assets/photography/img19.webp';
import img20 from '../assets/photography/img20.webp';

import thumb1 from '../assets/photography/img1_small.jpg';
import thumb2 from '../assets/photography/img2_small.jpg';
import thumb3 from '../assets/photography/img3_small.jpg';
import thumb4 from '../assets/photography/img4_small.jpg';
import thumb5 from '../assets/photography/img5_small.jpg';
import thumb6 from '../assets/photography/img6_small.jpg';
import thumb7 from '../assets/photography/img7_small.jpg';
import thumb8 from '../assets/photography/img8_small.jpg';
import thumb9 from '../assets/photography/img9_small.jpg';
import thumb10 from '../assets/photography/img10_small.jpg';
import thumb11 from '../assets/photography/img11_small.jpg';
import thumb12 from '../assets/photography/img12_small.jpg';
import thumb13 from '../assets/photography/img13_small.jpg';
import thumb14 from '../assets/photography/img14_small.jpg';
import thumb15 from '../assets/photography/img15_small.jpg';
import thumb16 from '../assets/photography/img16_small.jpg';
import thumb17 from '../assets/photography/img17_small.jpg';
import thumb18 from '../assets/photography/img18_small.jpg';
import thumb19 from '../assets/photography/img19_small.jpg';
import thumb20 from '../assets/photography/img20_small.jpg';

import img7_w from '../assets/photography/img7_w.png';
import img1_w from '../assets/photography/img1_w.png';
import img2_w from '../assets/photography/img2_w.png';
import img3_w from '../assets/photography/img3_w.png';
import img4_w from '../assets/photography/img4_w.png';
import img5_w from '../assets/photography/img5_w.png';
import img6_w from '../assets/photography/img6_w.png';
import img8_w from '../assets/photography/img8_w.png';
import img10_w from '../assets/photography/img10_w.png';

// 4 photos per row, each with its own metadata
const PHOTO_ROWS = [
  [
    { src: thumb1, altSrc: img1_w, fullSrc: img1, title: 'Render', date: 'Friday, May 30, 2025 at 8:05 PM', location: 'Madison, Chicago', lens: '250mm / f4-5.6 IS II', specialHover: 'splash' },
    { src: thumb13, fullSrc: img13, title: 'Bridges & Tunnels', date: 'Friday, August 30, 2025 at 7:57 PM', location: 'Cherry Blossom, Chicago', lens: '135mm / f4-5.6 IS II' },
    { src: thumb4, altSrc: img4_w, fullSrc: img4, title: 'Lonely Docks', date: 'Saturday, May 24, 2025 at 6:50 PM', location: 'New York, NY', lens: '26mm / f/1.6', specialHover: 'splash' },
    { src: thumb18, fullSrc: img18, title: 'Stopping by the woods', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'New York, NY', lens: '100mm / f/1.4' },
  ],
  [
    { src: thumb2, altSrc: img2_w, fullSrc: img2, title: 'Horizon', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'New York, NY', lens: '100mm / f/1.4', specialHover: 'splash' },
    { src: thumb14, fullSrc: img14, title: 'Lego City', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'New York, NY', lens: '100mm / f/1.4' },
    { src: thumb5, altSrc: img5_w, fullSrc: img5, title: 'Astigmatic Eyes', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'New York, NY', lens: '100mm / f/1.4', specialHover: 'splash' },
    { src: thumb6, altSrc: img6_w, fullSrc: img6, title: 'Karwan', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'Mahabaleshwar, Maharashtra', lens: '100mm / f/1.4', specialHover: 'splash' },
  ],
  [
    { src: thumb9, fullSrc: img9, title: 'Christmas', date: 'Friday, December 30, 2024 at 6:06 PM', location: 'New York, NY', lens: '55mm / f4-5.6 IS II' },
    { src: thumb10, altSrc: img10_w, fullSrc: img10, title: 'Little Sailor', date: 'Friday, May 5, 2023 at 4:07 PM', location: 'Fort Kochi, Kerala', lens: '26mm / f/1.6', specialHover: 'splash' },
    { src: thumb11, fullSrc: img11, title: 'Undisclosed Location', date: 'Friday, January 1, 2025 at 2:58 PM', location: 'New York, NY', lens: '208mm / f4-5.6 IS II' },
    { src: thumb12, fullSrc: img12, title: 'Shy', date: 'Friday, August 30, 2025 at 7:45 PM', location: 'Cherry Blossom, Chicago', lens: '250mm / f4-5.6 IS II' },
  ],
  [
    { src: thumb8, altSrc: img8_w, fullSrc: img8, title: 'Damen | Madison', date: 'Tuesday, May 17, 2024 at 11:22 AM', location: 'Damen & Madison, Chicago', lens: '96mm / f4-5.6 IS II', specialHover: 'splash' },
    { src: thumb15, fullSrc: img15, title: 'Goodbyes & Goodnights', date: 'Sunday, May 17, 2025 at 11:58 AM', location: 'Damen Greenline, Chicago', lens: '163mm / f4-5.6 IS II' },
    { src: thumb16, fullSrc: img16, title: 'Anxious', date: 'Sunday, May 17, 2025 at 11:58 AM', location: 'Damen Greenline, Chicago', lens: '163mm / f4-5.6 IS II' },
    { src: thumb7, altSrc: img7_w, fullSrc: img7, title: 'City of Dreams', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'Worli Ceiling, Mumbai', lens: '100mm / f/1.4', specialHover: 'splash' },
  ],
  [
    { src: thumb17, fullSrc: img17, title: 'Who poked me? - Sky', date: 'Friday, August 30, 2025 at 7:57 PM', location: 'Cherry Blossom, Chicago', lens: '135mm / f4-5.6 IS II' },
    { src: thumb19, fullSrc: img19, title: 'Vulnerable', date: 'Sunday, May 17, 2025 at 11:58 AM', location: 'Damen Greenline, Chicago', lens: '163mm / f4-5.6 IS II' },
    { src: thumb3, altSrc: img3_w, fullSrc: img3, title: 'Ashland Intersection', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'Madison & Ashland, Chicago', lens: '100mm / f/1.4', specialHover: 'splash' },
    { src: thumb20, fullSrc: img20, title: 'Action', date: 'Sunday, May 17, 2025 at 11:58 AM', location: 'Damen Greenline, Chicago', lens: '163mm / f4-5.6 IS II' },
  ],
];

import SwitchO from '../components/SwitchO';

// Sidebar nav labels
const SIDEBAR_LINKS = ['Photography', 'Graphic Design', 'Blogs'];

function MetadataPanel({ photo, active }) {
  return (
    <div
      className="h-full flex flex-col justify-end overflow-hidden whitespace-nowrap"
      style={{
        width: active ? '100%' : '0%',
        opacity: active ? 1 : 0,
        padding: active ? '0 0' : '0 0',
        transition: 'width 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease 0.15s, padding 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        flexShrink: 0,
      }}
    >
      {photo && (
        <>
          <h3
            className="text-[28px] font-bold text-bbblack leading-tight mb-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {photo.title}
          </h3>
          <p className="text-[11px] text-slate font-medium leading-relaxed">{photo.date}</p>
          <p className="text-[11px] text-slate font-medium">{photo.location}</p>
          <p className="text-[11px] text-slate font-medium">{photo.lens}</p>
        </>
      )}
    </div>
  );
}

function PhotoRow({ photos, onPhotoClick }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Which neighbor compresses: right neighbor usually, left if hovering last photo
  const getCompressIdx = (hIdx) => {
    if (hIdx === null) return -1;
    return hIdx < photos.length - 1 ? hIdx + 1 : hIdx - 1;
  };

  const compressIdx = getCompressIdx(hoveredIdx);

  return (
    <div className="flex gap-5">
      {photos.map((photo, idx) => {
        const isHovered = hoveredIdx === idx;
        const isCompressed = idx === compressIdx;

        // Pseudo-random values for organic altSrc background blending
        const randomX = 40 + (idx * 27) % 20;
        const randomY = 40 + (idx * 43) % 20;
        const randomStop1 = 20 + (idx * 31) % 25;
        const randomStop2 = 65 + (idx * 37) % 25;
        const altMask = `radial-gradient(ellipse at ${randomX}% ${randomY}%, black ${randomStop1}%, transparent ${randomStop2}%)`;

        return (
          <div
            key={idx}
            className="overflow-hidden"
            style={{
              flex: '1 1 0%',
              minWidth: 0,
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div
              className="w-full h-full"
              style={{
                display: 'flex',
                flexDirection: 'row',
                aspectRatio: '1 / 1',
              }}
            >
              {/* Left Metadata Panel — active if the hovered image is to the left */}
              <MetadataPanel 
                photo={photos[idx - 1]} 
                active={isCompressed && hoveredIdx === idx - 1} 
              />

              {/* Photo — zoom on self-hover */}
              <div 
                className="h-full overflow-hidden relative group" 
                style={{ flex: '1', minWidth: 0 }}
                onClick={() => onPhotoClick(photo)}
              >
                {photo.specialHover === 'splash' && photo.altSrc ? (
                  <>
                    {/* The initial image (img10_w) */}
                    <img
                      src={photo.altSrc}
                      alt={photo.title + ' initial'}
                      className="absolute inset-0 w-full h-full object-cover opacity-40 z-10"
                      style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                        WebkitMaskImage: altMask,
                        maskImage: altMask,
                      }}
                    />
                    {/* The revealed image (img10_small) with watercolor painting splash */}
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="absolute inset-0 w-full h-full object-cover z-20"
                      style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1.15)',
                        filter: isHovered 
                          ? 'saturate(1) blur(0px) contrast(1)' 
                          : 'saturate(4) blur(16px) contrast(1.2)',
                        opacity: isHovered ? 1 : 0,
                        WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                        WebkitMaskSize: isHovered ? '250% 250%' : '0% 0%',
                        WebkitMaskPosition: 'center',
                        WebkitMaskRepeat: 'no-repeat',
                        maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                        maskSize: isHovered ? '250% 250%' : '0% 0%',
                        maskPosition: 'center',
                        maskRepeat: 'no-repeat',
                        transition: 'transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.9s ease, opacity 0.4s ease, -webkit-mask-size 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), mask-size 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      }}
                    />
                  </>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    style={{
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                )}
              </div>

              {/* Right Metadata Panel — active if the hovered image is to the right */}
              <MetadataPanel 
                photo={photos[idx + 1]} 
                active={isCompressed && hoveredIdx === idx + 1} 
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PhotographyPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigate = useNavigate();
  const pageRoutes = ["/photography", "/graphicdesign", "/blogs"];

  return (
    <div className="min-h-screen bg-white relative" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      {/* Right Sidebar Navigation */}
      <SidebarNavigation 
        links={SIDEBAR_LINKS} 
        activeIndex={0} 
        onLinkClick={(index) => navigate(pageRoutes[index])}
      />
      {/* Hero Section */}
      <section className="flex items-center justify-center pt-[20%] pb-[20%] px-8">
        <h1 className="text-[64px] font-bold leading-none">
          <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--color-slate)' }}>I l</span>
          <SwitchO className="text-bbblack" />
          <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--color-slate)' }}>ve ph</span>
          <SwitchO className="text-bbblack" />
          <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--color-slate)' }}>t</span>
          <SwitchO className="text-bbblack" />
          <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--color-slate)' }}>graphy too !</span>
        </h1>
      </section>

      {/* Photo Grid — 4 per row, equal size, scales with viewport */}
      <section className="px-8 pb-24 flex flex-col gap-5">
        {PHOTO_ROWS.map((row, idx) => (
          <PhotoRow key={idx} photos={row} onPhotoClick={setSelectedPhoto} />
        ))}
      </section>

      {/* Lightbox / Full View Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#10110E]/95 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.fullSrc || selectedPhoto.src} 
              alt={selectedPhoto.title} 
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent flex justify-between items-end opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div>
                <h3 className="text-white text-2xl font-bold mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>{selectedPhoto.title}</h3>
                <p className="text-white/80 text-sm font-medium">{selectedPhoto.date} • {selectedPhoto.location}</p>
              </div>
              <p className="text-white/80 text-sm font-medium">{selectedPhoto.lens}</p>
            </div>
          </div>
          <button 
            className="absolute top-8 right-8 text-white/60 hover:text-white hover:scale-110 transition-all duration-300 p-2"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close full view"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
