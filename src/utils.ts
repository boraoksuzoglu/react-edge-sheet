import { useEffect, useLayoutEffect } from 'react';
import type { SheetEdge } from './types';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary',
].join(',');

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    (el) => !el.closest('[aria-hidden="true"]')
  );
}

export const ANIMATION_PRESETS = {
  default: 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bounce: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  snappy: 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export type AnimationPreset = keyof typeof ANIMATION_PRESETS;

// 150% (not 100%) prevents pixel-flash on some devices
export const TRANSFORMS: Record<SheetEdge, { initial: string; exit: string; entered: string }> = {
  bottom: { initial: 'translateY(150%)', exit: 'translateY(150%)', entered: 'translateY(0)' },
  top: { initial: 'translateY(-150%)', exit: 'translateY(-150%)', entered: 'translateY(0)' },
  left: { initial: 'translateX(-150%)', exit: 'translateX(-150%)', entered: 'translateX(0)' },
  right: { initial: 'translateX(150%)', exit: 'translateX(150%)', entered: 'translateX(0)' },
};

const FLEX_START = 'flex-start';
const FLEX_END = 'flex-end';
const CENTER = 'center';

export const ALIGNMENTS: Record<SheetEdge, { alignItems: string; justifyContent: string }> = {
  bottom: { alignItems: 'flex-end', justifyContent: CENTER },
  top: { alignItems: 'flex-start', justifyContent: CENTER },
  left: { alignItems: CENTER, justifyContent: FLEX_START },
  right: { alignItems: CENTER, justifyContent: FLEX_END },
};

/**
 * Resolve flex alignment for the sheet container.
 * - `top`/`bottom` edges: `align` shifts the panel **horizontally** (justifyContent)
 * - `left`/`right` edges: `align` shifts the panel **vertically** (alignItems)
 */
export function getAlignment(
  edge: SheetEdge,
  align?: 'start' | 'center' | 'end'
): { alignItems: string; justifyContent: string } {
  const base = ALIGNMENTS[edge];
  if (!align || align === 'center') return base;

  const flexMap = { start: FLEX_START, center: CENTER, end: FLEX_END };

  if (edge === 'top' || edge === 'bottom') {
    return { ...base, justifyContent: flexMap[align] };
  }
  return { ...base, alignItems: flexMap[align] };
}

export const TRANSITION = ANIMATION_PRESETS.default;
export const SIZE_TRANSITION = '0.3s cubic-bezier(0.4, 0, 0.2, 1)';
export const OPACITY_TRANSITION = 'opacity 0.42s cubic-bezier(0.4, 0, 0.2, 1)';

/** Returns true for vertical edges (top/bottom) */
export function isVertical(edge: SheetEdge): boolean {
  return edge === 'top' || edge === 'bottom';
}

export function resolvePortalTarget(portal?: HTMLElement | null): HTMLElement | null {
  if (portal === null) return null; // inline render
  if (portal) return portal; // custom target
  if (typeof document === 'undefined') return null; // SSR
  return document.body; // default
}

// SSR-safe layout effect
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
