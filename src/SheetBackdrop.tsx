import React, { useMemo } from 'react';
import { useSheetContext } from './context/SheetContext';
import { OPACITY_TRANSITION } from './utils';

interface SheetBackdropProps {
  closeOnBackdropClick: boolean;
  backdropStyle?: React.CSSProperties;
  backdropClassName?: string;
  /** Override backdrop opacity transition. Default uses built-in timing. */
  transition?: string;
}

export function SheetBackdrop({
  closeOnBackdropClick,
  backdropStyle,
  backdropClassName,
  transition: transitionOverride,
}: SheetBackdropProps) {
  const { isExiting, isEntered, close } = useSheetContext();

  const style = useMemo<React.CSSProperties>(
    () => ({
      position: 'absolute',
      inset: 0,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      opacity: isExiting ? 0 : isEntered ? 1 : 0,
      transition: transitionOverride ?? OPACITY_TRANSITION,
      cursor: closeOnBackdropClick ? 'pointer' : 'default',
      ...backdropStyle,
    }),
    [closeOnBackdropClick, isExiting, isEntered, backdropStyle, transitionOverride]
  );

  return (
    <div
      aria-hidden
      style={style}
      className={backdropClassName}
      onClick={closeOnBackdropClick ? close : undefined}
    />
  );
}
