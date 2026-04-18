import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';

/**
 * Custom hook to manage auto-hiding of sticky bars (Navbar / BottomBar).
 * - Fades out on scroll down
 * - Fades in on scroll up or at the very top/bottom of the page
 * - Fades in if the mouse hovers near the specified edge
 *
 * @param {'top' | 'bottom'} edge - The edge to track for mouse hover
 * @param {number} hoverThreshold - Pixel distance from the edge to trigger visibility
 * @returns {boolean} isVisible
 */
export function useAutoHide(edge = 'top', hoverThreshold = 100) {
  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const [isHoverVisible, setIsHoverVisible] = useState(false);

  useLenis(({ scroll, direction, limit }) => {
    if (scroll <= 50) {
      if (!isScrollVisible) setIsScrollVisible(true);
    } else if (scroll >= limit - 50) {
      if (!isScrollVisible) setIsScrollVisible(true); // show at absolute bottom
    } else {
      if (direction === 1 && isScrollVisible) {
        setIsScrollVisible(false);
      } else if (direction === -1 && !isScrollVisible) {
        setIsScrollVisible(true);
      }
    }
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const distance = edge === 'top' 
        ? e.clientY 
        : window.innerHeight - e.clientY;

      const hovered = distance < hoverThreshold;
      if (hovered !== isHoverVisible) {
        setIsHoverVisible(hovered);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [edge, hoverThreshold, isHoverVisible]);

  return isScrollVisible || isHoverVisible;
}
