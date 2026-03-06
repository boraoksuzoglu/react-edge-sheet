import { useState, useRef, useCallback } from 'react';
import type { SheetEdge } from '../types';

interface UseSheetDragOptions {
  edge: SheetEdge;
  enabled: boolean;
  closeFn: () => void;
  threshold?: number;
  velocityThreshold?: number;
  snapPoints?: string[];
  currentSnap?: number;
  onSnapChange?: (index: number) => void;
}

interface UseSheetDragReturn {
  handlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
  dragOffset: number;
  isDragging: boolean;
}

// Elements that should NOT trigger drag (user is interacting with them directly)
const INTERACTIVE = 'input, textarea, select, [contenteditable], [data-no-drag]';

// Pixels of movement required before drag mode activates (prevents accidental drag on taps/clicks)
const ACTIVATION_PX = 6;

function getClientPos(e: MouseEvent | TouchEvent): { x: number; y: number } {
  if ('touches' in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

export function useSheetDrag({
  edge,
  enabled,
  closeFn,
  threshold = 80,
  velocityThreshold = 0.3,
  snapPoints,
  currentSnap,
  onSnapChange,
}: UseSheetDragOptions): UseSheetDragReturn {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const startTime = useRef(0);
  const activated = useRef(false); // true once movement exceeds ACTIVATION_PX

  const vertical = edge === 'top' || edge === 'bottom';
  const dismissPositive = edge === 'bottom' || edge === 'right';

  const getRawDelta = useCallback(
    (pos: { x: number; y: number }): number =>
      vertical ? pos.y - startPos.current.y : pos.x - startPos.current.x,
    [vertical]
  );

  const applyRubberBand = useCallback(
    (delta: number): number => {
      const towardDismiss = dismissPositive ? delta > 0 : delta < 0;
      return towardDismiss ? delta : delta * 0.2;
    },
    [dismissPositive]
  );

  const cleanup = useCallback(() => {
    document.body.style.removeProperty('user-select');
    document.body.style.removeProperty('-webkit-user-select');
  }, []);

  const onMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const pos = getClientPos(e);
      const raw = getRawDelta(pos);

      if (!activated.current) {
        // Wait until the user has moved enough to be clearly dragging
        if (Math.abs(raw) < ACTIVATION_PX) return;
        activated.current = true;
        setIsDragging(true);
        // Prevent text selection during drag
        document.body.style.setProperty('user-select', 'none');
        document.body.style.setProperty('-webkit-user-select', 'none');
      }

      setDragOffset(applyRubberBand(raw));
    },
    [getRawDelta, applyRubberBand]
  );

  const onEnd = useCallback(
    (e: MouseEvent | TouchEvent) => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove, { passive: true } as EventListenerOptions);
      document.removeEventListener('touchend', onEnd);
      cleanup();

      // Always reset — prevents stale offset on next open
      setDragOffset(0);
      setIsDragging(false);

      if (!activated.current) return; // tap, not a drag — nothing to do
      activated.current = false;

      const pos =
        'changedTouches' in e
          ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
          : { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };

      const delta = getRawDelta(pos);
      const elapsed = Date.now() - startTime.current;
      const velocity = Math.abs(delta) / Math.max(elapsed, 1);
      const isDismissDir = dismissPositive ? delta > 0 : delta < 0;

      if (isDismissDir && (Math.abs(delta) > threshold || velocity > velocityThreshold)) {
        if (snapPoints && currentSnap !== undefined && onSnapChange) {
          if (currentSnap === 0) {
            closeFn();
          } else {
            onSnapChange(Math.max(currentSnap - 1, 0));
          }
        } else {
          closeFn();
        }
      } else if (!isDismissDir && snapPoints && currentSnap !== undefined && onSnapChange) {
        if (Math.abs(delta) > threshold || velocity > velocityThreshold) {
          onSnapChange(Math.min(currentSnap + 1, snapPoints.length - 1));
        }
      }
    },
    [
      onMove,
      cleanup,
      getRawDelta,
      dismissPositive,
      threshold,
      velocityThreshold,
      closeFn,
      snapPoints,
      currentSnap,
      onSnapChange,
    ]
  );

  const startDrag = useCallback(
    (target: EventTarget | null, clientX: number, clientY: number) => {
      if (!enabled) return;
      // Don't intercept native interactions on form elements
      if (target instanceof Element && target.closest(INTERACTIVE)) return;

      startPos.current = { x: clientX, y: clientY };
      startTime.current = Date.now();
      activated.current = false;

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove, { passive: true });
      document.addEventListener('touchend', onEnd);
    },
    [enabled, onMove, onEnd]
  );

  const handlers = {
    onMouseDown: useCallback(
      (e: React.MouseEvent) => {
        startDrag(e.target, e.clientX, e.clientY);
      },
      [startDrag]
    ),
    onTouchStart: useCallback(
      (e: React.TouchEvent) => {
        startDrag(e.target, e.touches[0].clientX, e.touches[0].clientY);
      },
      [startDrag]
    ),
  };

  return { handlers, dragOffset, isDragging };
}
