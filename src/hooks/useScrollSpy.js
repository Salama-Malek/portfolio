import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position and determine which section is currently active
 * @param {Array} sectionIds - Array of section IDs to track
 * @param {number} offset - Offset from top to consider section active (default: -100)
 * @returns {number} - Index of currently active section
 */
export const useScrollSpy = (sectionIds, offset = -100) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + Math.abs(offset);
      
      // Find the section that's currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeIndex;
};

export default useScrollSpy;
