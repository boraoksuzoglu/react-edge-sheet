import { useEffect, useRef } from 'react';
import { getFocusableElements } from '../utils';

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isVisible: boolean,
  isEntered: boolean
): void {
  const previousFocusRef = useRef<Element | null>(null);

  // Save previous focus + Tab cycle trap
  useEffect(() => {
    if (!isVisible) return;
    previousFocusRef.current = document.activeElement;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;
      const focusable = getFocusableElements(container);
      if (focusable.length === 0) {
        // No focusable children — keep focus on the container itself
        e.preventDefault();
        container.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === container) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      const prev = previousFocusRef.current;
      if (prev && 'focus' in prev && document.contains(prev)) {
        (prev as HTMLElement).focus();
      }
    };
  }, [isVisible, containerRef]);

  // Auto-focus first focusable element (or container as fallback) when animation completes
  useEffect(() => {
    if (!isEntered) return;
    const container = containerRef.current;
    if (!container) return;
    const focusable = getFocusableElements(container);
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      container.focus();
    }
  }, [isEntered, containerRef]);
}
