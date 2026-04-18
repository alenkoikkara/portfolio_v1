import { useState, useEffect } from 'react';

/**
 * A custom hook that returns a boolean state which randomly toggles between true and false.
 * Used for creating randomized blinking/typing effects like chaotic font switching.
 *
 * @param {number} minTime - The minimum delay before toggling (in milliseconds)
 * @param {number} maxTime - The maximum delay before toggling (in milliseconds)
 * @returns {boolean} The active toggled state
 */
export function useRandomToggle(minTime = 500, maxTime = 1500) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const trigger = () => {
      setActive(prev => !prev);
      // Determine the next random delay
      const nextDelay = Math.random() * (maxTime - minTime) + minTime;
      timeoutId = setTimeout(trigger, nextDelay);
    };
    
    // Start the recursive random timeout
    const initialDelay = Math.random() * (maxTime - minTime) + minTime;
    timeoutId = setTimeout(trigger, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [minTime, maxTime]);

  return active;
}
