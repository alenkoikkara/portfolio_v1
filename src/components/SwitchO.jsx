import React from 'react';
import { useRandomToggle } from '../hooks/useRandomToggle';

export default function SwitchO({ fontSize = '64px', className = '' }) {
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
