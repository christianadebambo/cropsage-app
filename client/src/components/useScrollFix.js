import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollFix = () => {
  const location = useLocation();
  // Refs to store timeouts and animation frame requests
  const scrollTimeoutRef = useRef(null);
  const scrollListenerRef = useRef(null);

  // Function to force a reflow of the document
  const forceReflow = useCallback(() => {
    void document.body.offsetHeight;
  }, []);

  // Effect to reset scroll position on route change
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'visible';
      forceReflow();
    };

    resetScroll();

    // Additional reflow after a short delay
    scrollTimeoutRef.current = setTimeout(() => {
      forceReflow();
    }, 100);

    // Clean up function
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [location, forceReflow]);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (scrollListenerRef.current) {
        cancelAnimationFrame(scrollListenerRef.current);
      }
      scrollListenerRef.current = requestAnimationFrame(() => {
        forceReflow();
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollListenerRef.current) {
        cancelAnimationFrame(scrollListenerRef.current);
      }
    };
  }, [forceReflow]);
};

export default useScrollFix;