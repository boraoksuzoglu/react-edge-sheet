import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseSheetOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseSheetReturn {
  isOpen: boolean;
  isExiting: boolean;
  isEntered: boolean;
  isVisible: boolean;
  openFn: () => void;
  closeFn: () => void;
  toggle: () => void;
  /**
   * Call when the panel's slide transition completes.
   * Fires `onOpen` after enter, fires `onClose` and unmounts after exit.
   */
  onTransitionEnd: () => void;
}

export function useSheet({
  open: controlledOpen,
  onOpenChange,
  onOpen,
  onClose,
}: UseSheetOptions): UseSheetReturn {
  const [isOpen, setIsOpen] = useState(() => controlledOpen ?? false);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  const isExitingRef = useRef(false);

  // Keep callbacks in refs to avoid stale closures / effect deps churn
  const onCloseRef = useRef(onClose);
  const onOpenRef = useRef(onOpen);
  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  const isVisible = isOpen || isExiting;

  // rAF enter animation — browser needs one paint cycle to register initial position
  useEffect(() => {
    if (!isOpen) {
      setIsEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setIsEntered(true));
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  const openFn = useCallback(() => {
    isExitingRef.current = false;
    setIsExiting(false);
    setIsOpen(true);
    onOpenChangeRef.current?.(true);
  }, []);

  // isExitingRef prevents double-fire stale closure
  const closeFn = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    setIsExiting(true);
    setIsOpen(false);
    onOpenChangeRef.current?.(false);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) closeFn();
    else openFn();
  }, [isOpen, closeFn, openFn]);

  // Sync external `open` prop → internal state.
  // Uses a prev-ref so the effect only runs when controlledOpen actually changes,
  // and never puts isOpen in deps (avoids the infinite-loop).
  const prevControlledOpenRef = useRef(controlledOpen);
  useEffect(() => {
    if (controlledOpen === prevControlledOpenRef.current) return;
    prevControlledOpenRef.current = controlledOpen;
    if (controlledOpen === undefined) return;
    if (controlledOpen) {
      isExitingRef.current = false;
      setIsExiting(false);
      setIsOpen(true);
    } else {
      if (isExitingRef.current) return;
      isExitingRef.current = true;
      setIsExiting(true);
      setIsOpen(false);
    }
  }, [controlledOpen]);

  const onTransitionEnd = useCallback(() => {
    if (isExitingRef.current) {
      isExitingRef.current = false;
      setIsExiting(false);
      onCloseRef.current?.();
    } else {
      onOpenRef.current?.();
    }
  }, []);

  return {
    isOpen,
    isExiting,
    isEntered,
    isVisible,
    openFn,
    closeFn,
    toggle,
    onTransitionEnd,
  };
}
