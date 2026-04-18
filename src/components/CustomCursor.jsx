import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      // Check if the current element or any parent uses a cursor-pointer class,
      // or if it's inherently clickable (a, button)
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[class*="cursor-pointer"]') ||
        target.closest('[class*="hover"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* 
        Outer soft ring that trails slightly, typical in Apple-style pointers.
        We'll just do a single crisp inverted circle for now, which feels very iPad OS. 
      */}
      <div
        className="fixed pointer-events-none z-9999 rounded-full mix-blend-difference bg-white border border-bbblack"
        style={{
          width: 20,
          height: 20,
          left: position.x - 10,
          top: position.y - 10,
          transform: `scale(${isHovering ? 1.3 : 1})`,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </>
  );
};

export default CustomCursor;
