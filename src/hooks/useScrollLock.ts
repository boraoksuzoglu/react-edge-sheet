import { useEffect } from 'react';

// Module-level counter: multiple open sheets increment/decrement without clobbering each other.
let lockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';

function resolvePaddingRight(padding: boolean | string | undefined): string | null {
  if (padding === false) return null;
  if (typeof padding === 'string') return padding;
  // true or undefined: use scrollbar width
  const scrollbarWidth = typeof window !== 'undefined'
    ? window.innerWidth - document.documentElement.clientWidth
    : 0;
  return scrollbarWidth > 0 ? `${scrollbarWidth}px` : null;
}

export function useScrollLock(enabled: boolean, padding?: boolean | string): void {
  useEffect(() => {
    if (!enabled) return;

    const paddingRight = resolvePaddingRight(padding);

    if (lockCount === 0) {
      const body = document.body;
      savedOverflow = body.style.overflow;
      savedPaddingRight = body.style.paddingRight;
      body.style.overflow = 'hidden';
      if (paddingRight !== null) {
        body.style.paddingRight = paddingRight;
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
  }, [enabled, padding]);
}
