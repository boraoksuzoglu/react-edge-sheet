import { useEffect } from 'react';

// Module-level counter: multiple open sheets increment/decrement without clobbering each other.
let lockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';

export function useScrollLock(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    if (lockCount === 0) {
      const body = document.body;
      savedOverflow = body.style.overflow;
      savedPaddingRight = body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        const body = document.body;
        body.style.overflow = savedOverflow;
        body.style.paddingRight = savedPaddingRight;
      }
    };
  }, [enabled]);
}
