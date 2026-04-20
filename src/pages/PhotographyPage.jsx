import React, { useState } from 'react';
import { useRandomToggle } from '../hooks/useRandomToggle';

// Photography images
import citySunset from '../assets/photography/city_sunset.png';
import benchBw from '../assets/photography/bench_bw.png';
import harbor from '../assets/photography/harbor.png';
import streetGlow from '../assets/photography/street_glow.png';
import cloudscape from '../assets/photography/cloudscape.png';
import beachSilhouette from '../assets/photography/beach_silhouette.png';
import rooftopView from '../assets/photography/rooftop_view.png';
import trainStation from '../assets/photography/train_station.png';

// 4 photos per row, each with its own metadata
const PHOTO_ROWS = [
  [
    { src: citySunset, title: 'Lego City', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'New York, NY', lens: '100mm / f/1.4' },
    { src: citySunset, title: 'Lego City', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'New York, NY', lens: '100mm / f/1.4' },
    { src: harbor, title: 'Harbor Dusk', date: 'Friday, Jun 20, 2025 at 8:45 PM', location: 'Vancouver, CA', lens: '24mm / f/2.8' },
    { src: rooftopView, title: 'Golden Hour', date: 'Thursday, Jul 10, 2025 at 7:30 PM', location: 'Seattle, WA', lens: '24mm / f/2.8' },
  ],
  [
    { src: streetGlow, title: 'Night Walk', date: 'Wednesday, Jan 15, 2025 at 11:30 PM', location: 'Brooklyn, NY', lens: '35mm / f/1.4' },
    { src: cloudscape, title: 'Storm Coming', date: 'Saturday, Apr 5, 2025 at 6:12 PM', location: 'Kansas City, MO', lens: '16mm / f/4' },
    { src: trainStation, title: 'Platform 3', date: 'Monday, Feb 24, 2025 at 9:15 PM', location: 'London, UK', lens: '35mm / f/1.4' },
    { src: beachSilhouette, title: 'City of Dreams', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'Mumbai, IN', lens: '100mm / f/1.4' },
  ],
  [
    { src: streetGlow, title: 'Night Walk', date: 'Wednesday, Jan 15, 2025 at 11:30 PM', location: 'Brooklyn, NY', lens: '35mm / f/1.4' },
    { src: cloudscape, title: 'Storm Coming', date: 'Saturday, Apr 5, 2025 at 6:12 PM', location: 'Kansas City, MO', lens: '16mm / f/4' },
    { src: trainStation, title: 'Platform 3', date: 'Monday, Feb 24, 2025 at 9:15 PM', location: 'London, UK', lens: '35mm / f/1.4' },
    { src: beachSilhouette, title: 'City of Dreams', date: 'Saturday, May 17, 2025 at 7:58 PM', location: 'Mumbai, IN', lens: '100mm / f/1.4' },
  ],
];

// Sidebar nav labels
const SIDEBAR_LINKS = ['Photography', 'G', 'B'];

// Each "o" gets its own independent toggle
function SwitchO({ fontSize = '64px', className = '' }) {
  const useSatoshi = useRandomToggle(900, 2500);

  return (
    <span
      className={className}
      style={{
        fontFamily: useSatoshi ? 'Satoshi, sans-serif' : '"Pixelify Sans", system-ui',
        fontSize,
        display: 'inline-block',
        verticalAlign: useSatoshi ? 'baseline' : '2px',
        transition: 'font-size 0.15s ease',
      }}
    >
      o
    </span>
  );
}

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

function PhotoRow({ photos }) {
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
              <div className="h-full overflow-hidden" style={{ flex: '1', minWidth: 0 }}>
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
  return (
    <div className="min-h-screen bg-white relative" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      {/* Right Sidebar Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-8 text-[12px] font-bold">
        {SIDEBAR_LINKS.map((label, i) => (
          <div
            key={i}
            className={`group flex items-center justify-end cursor-pointer transition-colors duration-300 ${i === 0 ? 'text-bbblack' : 'text-slate hover:text-bbblack'
              }`}
          >
            <span className="flex">
              <span>{label[0]}</span>
              <span className="max-w-0 opacity-0 overflow-hidden transition-all duration-1800 ease-in-out group-hover:max-w-[150px] group-hover:opacity-100 whitespace-nowrap">
                {label.slice(1)}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="flex items-center justify-center pt-[20%] pb-[20%] px-8">
        <h1 className="text-[64px] font-bold text-bbblack leading-none">
          I l<SwitchO />ve ph<SwitchO />t<SwitchO />graphy too !
        </h1>
      </section>

      {/* Photo Grid — 4 per row, equal size, scales with viewport */}
      <section className="px-8 pb-24 flex flex-col gap-5">
        {PHOTO_ROWS.map((row, idx) => (
          <PhotoRow key={idx} photos={row} />
        ))}
      </section>
    </div>
  );
}
