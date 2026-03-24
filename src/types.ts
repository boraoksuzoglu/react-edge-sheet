import type React from 'react';
import type { AnimationPreset } from './utils';

export type SheetEdge = 'top' | 'bottom' | 'left' | 'right';

/** Props passed to custom backdrop components via `backdropComponent` */
export interface SheetBackdropComponentProps {
  isExiting: boolean;
  isEntered: boolean;
  close: () => void;
  closeOnBackdropClick: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export interface SheetRef {
  open(): void;
  close(): void;
  toggle(): void;
  isOpen: boolean;
}

export interface SheetProps {
  children?: React.ReactNode;
  /** Which screen edge the sheet slides from. Default: 'bottom' */
  edge?: SheetEdge;
  /** Horizontal align for top/bottom, vertical align for left/right. Default: 'center' */
  align?: 'start' | 'center' | 'end';
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Fires after enter animation completes */
  onOpen?: () => void;
  /** Fires after exit animation completes */
  onClose?: () => void;
  /** Portal target. undefined = document.body, null = inline render */
  portal?: HTMLElement | null;
  /** Close when backdrop is clicked. Default: true */
  closeOnBackdropClick?: boolean;
  /**
   * When false, no backdrop is rendered (sheet-only modal).
   * Default: true (shows default or custom backdrop)
   */
  backdrop?: boolean;
  /** Custom backdrop. Receives SheetBackdropComponentProps. Ignored when backdrop is false. */
  backdropComponent?: (props: SheetBackdropComponentProps) => React.ReactNode;
  /** Animate panel size changes via ResizeObserver. Default: true */
  animateSize?: boolean;
  /** CSS z-index. Default: 200 */
  zIndex?: number;
  /**
   * Shorthand: max-height for top/bottom edges, max-width for left/right edges.
   * Prefer `maxHeight` / `maxWidth` for explicit control.
   */
  maxSize?: string;
  /** Max-height of the panel. Applies to all edges (vertical edges clamp content height; horizontal edges add an optional cap). */
  maxHeight?: string;
  /** Max-width of the panel. Applies to all edges (horizontal edges clamp drawer width; vertical edges add an optional cap). */
  maxWidth?: string;
  /**
   * Shorthand: min-height for top/bottom edges, min-width for left/right edges.
   * Prefer `minHeight` / `minWidth` for explicit control.
   */
  minSize?: string;
  /** Min-height of the panel. */
  minHeight?: string;
  /** Min-width of the panel. */
  minWidth?: string;
  style?: React.CSSProperties;
  className?: string;
  /** CSS class applied to the inner content wrapper (the div that wraps children). */
  contentClassName?: string;
  /** Inline styles for the inner content wrapper. */
  contentStyle?: React.CSSProperties;
  backdropStyle?: React.CSSProperties;
  backdropClassName?: string;
  /** Override panel slide transition (e.g. "transform 0.3s ease"). Default uses built-in timing. */
  transition?: string;
  /** Override size-change transition when animateSize is true (e.g. "0.2s ease"). */
  sizeTransition?: string;
  /** Override backdrop opacity transition (e.g. "opacity 0.3s ease"). Only applies to default backdrop. */
  backdropTransition?: string;
  /** Animation preset for the slide transition. Overridden by transition/enterTransition/exitTransition. */
  animationPreset?: AnimationPreset;
  /** Override transition for enter animation only. Takes priority over animationPreset. */
  enterTransition?: string;
  /** Override transition for exit animation only. Takes priority over animationPreset. */
  exitTransition?: string;
  /** ARIA label for the dialog element. */
  'aria-label'?: string;
  /** ID of element that labels the dialog. */
  'aria-labelledby'?: string;
  /** ID of element that describes the dialog. */
  'aria-describedby'?: string;
  /** Enable drag-to-dismiss gesture. Default: false (true when showDragHandle is true). */
  draggable?: boolean;
  /** Show a drag handle pill. Also enables draggable unless explicitly set to false. */
  showDragHandle?: boolean;
  /** Inline styles applied to the default drag handle pill. Ignored when dragHandleComponent is provided. */
  dragHandleStyle?: React.CSSProperties;
  /** CSS class applied to the default drag handle pill. Ignored when dragHandleComponent is provided. */
  dragHandleClassName?: string;
  /** Replace the default drag handle pill with a custom element. Position it however you like. */
  dragHandleComponent?: React.ReactNode;
  /** Pixels to drag before dismissing. Default: 80 */
  dragThreshold?: number;
  /** Velocity (px/ms) above which release triggers dismiss. Default: 0.3 */
  dragVelocityThreshold?: number;
  /** Snap points array, e.g. ['200px','50vh','90vh']. Ascending order. */
  snapPoints?: string[];
  /** Initial snap index. Default: last (largest) snap point. */
  defaultSnapPoint?: number;
  /** Called when snap point changes. */
  onSnapChange?: (index: number) => void;
  /**
   * When true (default), body scroll is locked while the sheet is open (`overflow: hidden`).
   * Set to false to keep the page scrollable behind the sheet.
   */
  scrollLock?: boolean;
  /**
   * When scroll is locked, body gets padding-right to prevent layout shift from scrollbar.
   * Ignored when `scrollLock` is false.
   * - true (default): use scrollbar width
   * - false: no padding
   * - string: custom value (e.g. "0", "1rem")
   */
  scrollLockPadding?: boolean | string;
}
