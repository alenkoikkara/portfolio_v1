import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRandomToggle } from '../hooks/useRandomToggle';
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

// 4 photos per row, each with its own metadata
const PHOTO_ROWS = [
  [
    { src: thumb1, fullSrc: img1, title: 'Lego City', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'New York, NY', lens: '100mm / f/1.4' },
    { src: thumb2, fullSrc: img2, title: 'Lego City', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'New York, NY', lens: '100mm / f/1.4' },
    { src: thumb3, fullSrc: img3, title: 'Harbor Dusk', date: 'Friday, Jun 20, 2025 at 8:45 PM', location: 'Vancouver, CA', lens: '24mm / f/2.8' },
    { src: thumb4, fullSrc: img4, title: 'Golden Hour', date: 'Thursday, Jul 10, 2025 at 7:30 PM', location: 'Seattle, WA', lens: '24mm / f/2.8' },
  ],
  [
    { src: thumb5, fullSrc: img5, title: 'Night Walk', date: 'Wednesday, Jan 15, 2025 at 11:30 PM', location: 'Brooklyn, NY', lens: '35mm / f/1.4' },
    { src: thumb6, fullSrc: img6, title: 'Storm Coming', date: 'Saturday, Apr 5, 2025 at 6:12 PM', location: 'Kansas City, MO', lens: '16mm / f/4' },
    { src: thumb7, fullSrc: img7, title: 'Platform 3', date: 'Monday, Feb 24, 2025 at 9:15 PM', location: 'London, UK', lens: '35mm / f/1.4' },
    { src: thumb8, fullSrc: img8, title: 'City of Dreams', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'Mumbai, IN', lens: '100mm / f/1.4' },
  ],
  [
    { src: thumb9, fullSrc: img9, title: 'Night Walk', date: 'Wednesday, Jan 15, 2025 at 11:30 PM', location: 'Brooklyn, NY', lens: '35mm / f/1.4' },
    { src: thumb10, fullSrc: img10, title: 'Storm Coming', date: 'Saturday, Apr 5, 2025 at 6:12 PM', location: 'Kansas City, MO', lens: '16mm / f/4' },
    { src: thumb11, fullSrc: img11, title: 'Platform 3', date: 'Monday, Feb 24, 2025 at 9:15 PM', location: 'London, UK', lens: '35mm / f/1.4' },
    { src: thumb12, fullSrc: img12, title: 'City of Dreams', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'Mumbai, IN', lens: '100mm / f/1.4' },
  ],
  [
    { src: thumb13, fullSrc: img13, title: 'Night Walk', date: 'Wednesday, Jan 15, 2025 at 11:30 PM', location: 'Brooklyn, NY', lens: '35mm / f/1.4' },
    { src: thumb14, fullSrc: img14, title: 'Storm Coming', date: 'Saturday, Apr 5, 2025 at 6:12 PM', location: 'Kansas City, MO', lens: '16mm / f/4' },
    { src: thumb15, fullSrc: img15, title: 'Platform 3', date: 'Monday, Feb 24, 2025 at 9:15 PM', location: 'London, UK', lens: '35mm / f/1.4' },
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
                className="h-full overflow-hidden" 
                style={{ flex: '1', minWidth: 0 }}
                onClick={() => onPhotoClick(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
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
        <h1 className="text-[64px] font-bold text-bbblack leading-none">
          I l<SwitchO />ve ph<SwitchO />t<SwitchO />graphy too !
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
