import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentRect = useRef(null);
  const animating = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const animate = () => {
      const el = cursor;
      const rect = currentRect.current;

      if (rect) {
        // Hovering — morph to cover the clickable element
        el.style.width = `${rect.width + 16}px`;
        el.style.height = `${rect.height + 8}px`;
        el.style.left = `${rect.x + rect.width / 2 - (rect.width + 16) / 2}px`;
        el.style.top = `${rect.y + rect.height / 2 - (rect.height + 8) / 2}px`;
        el.style.borderRadius = '4px';
        el.style.transform = 'skewX(-4deg)';
      } else {
        // Default — small circle following mouse
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.left = `${mousePos.current.x - 10}px`;
        el.style.top = `${mousePos.current.y - 10}px`;
        el.style.borderRadius = '50%';
        el.style.transform = 'skewX(0deg)';
      }

      animating.current = false;
    };

    const scheduleUpdate = () => {
      if (!animating.current) {
        animating.current = true;
        requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const target = e.target;
      const clickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[class*="cursor-pointer"]');

      if (clickable) {
        const r = clickable.getBoundingClientRect();
        currentRect.current = { x: r.left, y: r.top, width: r.width, height: r.height };
      } else {
        currentRect.current = null;
      }

      scheduleUpdate();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-9999 mix-blend-difference bg-white border border-bbblack"
      style={{
        width: 20,
        height: 20,
        left: -40,
        top: -40,
        borderRadius: '50%',
        transform: 'skewX(0deg)',
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), left 0.15s ease-out, top 0.15s ease-out, border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
};

export default CustomCursor;
