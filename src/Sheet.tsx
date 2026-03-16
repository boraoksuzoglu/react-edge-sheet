import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { SheetBackdropComponentProps, SheetProps, SheetRef } from './types';
import { SheetContext } from './context/SheetContext';
import { useSheet } from './hooks/useSheet';
import { useSheetDrag } from './hooks/useSheetDrag';
import { useEscapeKey } from './hooks/useEscapeKey';
import { useScrollLock } from './hooks/useScrollLock';
import { useFocusTrap } from './hooks/useFocusTrap';
import { SheetBackdrop } from './SheetBackdrop';
import { SheetContent } from './SheetContent';
import { getAlignment, resolvePortalTarget } from './utils';

export const Sheet = forwardRef<SheetRef, SheetProps>(function Sheet(
  {
    children,
    edge = 'bottom',
    align,
    open: controlledOpen,
    onOpenChange,
    onOpen,
    onClose,
    portal,
    closeOnBackdropClick = true,
    backdrop = true,
    backdropComponent,
    animateSize = true,
    zIndex = 200,
    maxSize,
    maxWidth,
    maxHeight,
    minSize,
    minWidth,
    minHeight,
    style,
    className,
    contentClassName,
    contentStyle,
    backdropStyle,
    backdropClassName,
    transition,
    enterTransition,
    exitTransition,
    animationPreset,
    sizeTransition,
    backdropTransition,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    draggable: draggableProp,
    showDragHandle = false,
    dragHandleStyle,
    dragHandleClassName,
    dragHandleComponent,
    dragThreshold = 80,
    dragVelocityThreshold = 0.3,
    snapPoints,
    defaultSnapPoint,
    onSnapChange,
    scrollLockPadding = true,
  },
  ref
) {
  const { isOpen, isExiting, isEntered, isVisible, openFn, closeFn, toggle, onTransitionEnd } =
    useSheet({ open: controlledOpen, onOpenChange, onOpen, onClose });

  const containerRef = useRef<HTMLDivElement>(null);

  useEscapeKey(isVisible, closeFn);
  useScrollLock(isVisible, scrollLockPadding);
  useFocusTrap(containerRef, isVisible, isEntered);

  // Snap state
  const [currentSnap, setCurrentSnap] = useState(
    () => defaultSnapPoint ?? (snapPoints ? snapPoints.length - 1 : 0)
  );

  const handleSnapChange = useCallback(
    (index: number) => {
      setCurrentSnap(index);
      onSnapChange?.(index);
    },
    [onSnapChange]
  );

  // draggable = true if showDragHandle is true (unless explicitly false)
  const draggable = draggableProp !== undefined ? draggableProp : showDragHandle;

  const {
    handlers: dragHandlers,
    dragOffset,
    isDragging,
  } = useSheetDrag({
    edge,
    enabled: draggable && isVisible,
    closeFn,
    threshold: dragThreshold,
    velocityThreshold: dragVelocityThreshold,
    snapPoints,
    currentSnap,
    onSnapChange: handleSnapChange,
  });

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      // Only react to the transform property on the panel itself.
      // When snap points are active, height/width also transitions — filtering by 'transform'
      // prevents double-firing (the e.target check handles children bubbling up).
      if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
      onTransitionEnd();
    },
    [onTransitionEnd]
  );

  useImperativeHandle(ref, () => ({ open: openFn, close: closeFn, toggle, isOpen }), [
    openFn,
    closeFn,
    toggle,
    isOpen,
  ]);

  const portalTarget = resolvePortalTarget(portal);
  const alignment = getAlignment(edge, align);

  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: alignment.alignItems,
      justifyContent: alignment.justifyContent,
      zIndex,
    }),
    [alignment, zIndex]
  );

  const contextValue = useMemo(
    () => ({ isExiting, isEntered, close: closeFn }),
    [isExiting, isEntered, closeFn]
  );

  if (!isVisible) return null;

  const showBackdrop = backdrop !== false;
  const backdropProps: SheetBackdropComponentProps = {
    isExiting,
    isEntered,
    close: closeFn,
    closeOnBackdropClick,
    style: backdropStyle,
    className: backdropClassName,
  };

  const snapSize = snapPoints ? snapPoints[currentSnap] : undefined;

  const content = (
    <SheetContext.Provider value={contextValue}>
      <div style={containerStyle}>
        {showBackdrop &&
          (backdropComponent ? (
            backdropComponent(backdropProps)
          ) : (
            <SheetBackdrop
              closeOnBackdropClick={closeOnBackdropClick}
              backdropStyle={backdropStyle}
              backdropClassName={backdropClassName}
              transition={backdropTransition}
            />
          ))}
        <SheetContent
          edge={edge}
          animateSize={animateSize}
          maxSize={maxSize}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          minSize={minSize}
          minWidth={minWidth}
          minHeight={minHeight}
          transition={transition}
          enterTransition={enterTransition}
          exitTransition={exitTransition}
          animationPreset={animationPreset}
          sizeTransition={sizeTransition}
          style={style}
          className={className}
          contentClassName={contentClassName}
          contentStyle={contentStyle}
          isVisible={isVisible}
          onTransitionEnd={handleTransitionEnd}
          containerRef={containerRef}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          dragOffset={dragOffset}
          isDragging={isDragging}
          dragHandlers={draggable ? dragHandlers : undefined}
          showDragHandle={showDragHandle}
          dragHandleStyle={dragHandleStyle}
          dragHandleClassName={dragHandleClassName}
          dragHandleComponent={dragHandleComponent}
          snapSize={snapSize}
        >
          {children}
        </SheetContent>
      </div>
    </SheetContext.Provider>
  );

  if (portalTarget === null) return content;
  return createPortal(content, portalTarget);
});

Sheet.displayName = 'Sheet';
