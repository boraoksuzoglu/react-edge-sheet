import React, { useRef, useMemo } from 'react';
import type { SheetEdge } from './types';
import { useSheetContext } from './context/SheetContext';
import {
  TRANSFORMS,
  TRANSITION,
  ANIMATION_PRESETS,
  SIZE_TRANSITION,
  isVertical,
  useIsomorphicLayoutEffect,
} from './utils';
import type { AnimationPreset } from './utils';

interface SheetContentProps {
  children: React.ReactNode;
  edge: SheetEdge;
  animateSize: boolean;
  maxSize?: string;
  maxWidth?: string;
  maxHeight?: string;
  minSize?: string;
  minWidth?: string;
  minHeight?: string;
  transition?: string;
  enterTransition?: string;
  exitTransition?: string;
  animationPreset?: AnimationPreset;
  sizeTransition?: string;
  style?: React.CSSProperties;
  className?: string;
  innerWrapperClassName?: string;
  innerWrapperStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  isVisible: boolean;
  onTransitionEnd: (e: React.TransitionEvent<HTMLDivElement>) => void;
  containerRef?: React.Ref<HTMLDivElement>;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  dragOffset?: number;
  isDragging?: boolean;
  dragHandlers?: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
  showDragHandle?: boolean;
  dragHandleStyle?: React.CSSProperties;
  dragHandleClassName?: string;
  dragHandleComponent?: React.ReactNode;
  snapSize?: string;
}

export function SheetContent({
  children,
  edge,
  animateSize,
  maxSize,
  maxWidth,
  maxHeight,
  minSize,
  minWidth,
  minHeight,
  transition: transitionOverride,
  enterTransition,
  exitTransition,
  animationPreset,
  sizeTransition: sizeTransitionOverride,
  style,
  className,
  innerWrapperClassName,
  innerWrapperStyle,
  contentClassName,
  contentStyle,
  isVisible,
  onTransitionEnd,
  containerRef,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  dragOffset = 0,
  isDragging = false,
  dragHandlers,
  showDragHandle = false,
  dragHandleStyle,
  dragHandleClassName,
  dragHandleComponent,
  snapSize,
}: SheetContentProps) {
  const { isExiting, isEntered } = useSheetContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = React.useState<number | null>(null);

  const vertical = isVertical(edge);
  const transforms = TRANSFORMS[edge];

  const transform = isExiting
    ? transforms.exit
    : isEntered
      ? transforms.entered
      : transforms.initial;

  // Resolve transition: full override > enter/exitTransition > animationPreset > default
  const resolveTransition = (): string => {
    if (transitionOverride) return transitionOverride;
    const presetValue = animationPreset ? ANIMATION_PRESETS[animationPreset] : TRANSITION;
    if (isExiting && exitTransition) return exitTransition;
    if (!isExiting && enterTransition) return enterTransition;
    return presetValue;
  };

  const resolvedSizeTransition = sizeTransitionOverride ?? SIZE_TRANSITION;

  const resolvedTransition = (() => {
    if (isDragging) return '';
    const slide = resolveTransition();
    // When snap points are active, also animate height/width changes
    if (snapSize) {
      const sizeProp = vertical ? 'height' : 'width';
      return `${slide}, ${sizeProp} ${resolvedSizeTransition}`;
    }
    return slide;
  })();

  // Build drag offset transform
  const dragTranslate = dragOffset
    ? vertical
      ? `translateY(${dragOffset}px)`
      : `translateX(${dragOffset}px)`
    : '';
  const finalTransform = dragOffset ? `${transform} ${dragTranslate}` : transform;

  // ResizeObserver — observe scrollHeight (vertical) or scrollWidth (horizontal)
  useIsomorphicLayoutEffect(() => {
    if (!animateSize || !isVisible || snapSize) return;
    const el = contentRef.current;
    if (!el) return;
    const update = () => setContentSize(vertical ? el.scrollHeight : el.scrollWidth);
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [animateSize, isVisible, vertical, snapSize]);

  // Resolve size constraints:
  // - vertical (top/bottom): maxHeight clamps content height; maxWidth caps width (optional)
  // - horizontal (left/right): maxWidth clamps drawer width; maxHeight caps height (optional)
  const resolvedMaxHeight = vertical ? (maxHeight ?? maxSize) : maxHeight;
  const resolvedMaxWidth = !vertical ? (maxWidth ?? maxSize) : maxWidth;

  const resolvedMinHeight = vertical ? (minHeight ?? minSize) : minHeight;
  const resolvedMinWidth = !vertical ? (minWidth ?? minSize) : minWidth;

  const outerStyle: React.CSSProperties = {
    position: 'relative',
    width: vertical ? '100%' : undefined,
    height: !vertical ? '100%' : undefined,
    flexShrink: 0,
    transform: finalTransform,
    transition: resolvedTransition,
    ...(snapSize && vertical ? { height: snapSize, overflow: 'hidden' } : {}),
    ...(snapSize && !vertical ? { width: snapSize, overflow: 'hidden' } : {}),
    ...(!snapSize && resolvedMaxHeight ? { maxHeight: resolvedMaxHeight } : {}),
    ...(!snapSize && resolvedMaxWidth ? { maxWidth: resolvedMaxWidth } : {}),
    ...(resolvedMinHeight ? { minHeight: resolvedMinHeight } : {}),
    ...(resolvedMinWidth ? { minWidth: resolvedMinWidth } : {}),
    ...style,
  };

  const innerWrapperBaseStyle: React.CSSProperties =
    animateSize && !snapSize
      ? {
          overflow: 'hidden',
          transition: vertical
            ? `height ${resolvedSizeTransition}`
            : `width ${resolvedSizeTransition}`,
          ...(vertical
            ? {
                height: contentSize != null ? `${contentSize}px` : undefined,
                ...(resolvedMaxHeight ? { maxHeight: resolvedMaxHeight } : {}),
                ...(resolvedMinHeight ? { minHeight: resolvedMinHeight } : {}),
              }
            : {
                width: contentSize != null ? `${contentSize}px` : undefined,
                ...(resolvedMaxWidth ? { maxWidth: resolvedMaxWidth } : {}),
                ...(resolvedMinWidth ? { minWidth: resolvedMinWidth } : {}),
              }),
        }
      : {};

  // Drag handle position per edge — memoized since it only depends on edge
  const handleStyle = useMemo<React.CSSProperties>(() => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: '2.5rem',
      height: '0.25rem',
      borderRadius: 999,
      background: 'rgba(128,128,128,0.35)',
      cursor: 'grab',
      zIndex: 1,
    };
    switch (edge) {
      case 'bottom':
        return { ...base, top: '0.5rem', left: '50%', transform: 'translateX(-50%)' };
      case 'top':
        return { ...base, bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return {
          ...base,
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '0.25rem',
          height: '2.5rem',
        };
      case 'right':
        return {
          ...base,
          left: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '0.25rem',
          height: '2.5rem',
        };
    }
  }, [edge]);

  // snapSize drives height/width directly via CSS; animateSize (ResizeObserver-based)
  // would conflict. When snap points are active, size transitions are handled by the
  // combined transition string above (transform + height/width).
  const useAnimateSize = animateSize && !snapSize;

  // Always attach drag handlers to the whole panel (activation threshold in the hook
  // prevents accidental drags; interactive elements are excluded in onMouseDown/onTouchStart)
  const panelCursor = dragHandlers ? (isDragging ? 'grabbing' : 'grab') : undefined;

  return (
    <div
      ref={containerRef}
      style={{ ...outerStyle, ...(panelCursor ? { cursor: panelCursor } : {}) }}
      className={className}
      onTransitionEnd={onTransitionEnd}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...dragHandlers}
    >
      {(showDragHandle || !!dragHandleComponent) &&
        (dragHandleComponent ?? (
          <div style={{ ...handleStyle, ...dragHandleStyle }} className={dragHandleClassName} />
        ))}
      {useAnimateSize ? (
        <div
          style={{ ...innerWrapperBaseStyle, ...innerWrapperStyle }}
          className={innerWrapperClassName}
        >
          <div ref={contentRef} className={contentClassName} style={contentStyle}>
            {children}
          </div>
        </div>
      ) : (
        <div ref={contentRef} className={contentClassName} style={contentStyle}>
          {children}
        </div>
      )}
    </div>
  );
}
