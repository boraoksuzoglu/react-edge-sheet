import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useScrollLock } from './useScrollLock';

// Reset body styles before each test so tests are independent.
// Also reset the module-level counter by re-importing — vitest resets modules
// per test file by default, so the counter starts at 0 for this file.
beforeEach(() => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
});

describe('useScrollLock', () => {
  it('locks body overflow when enabled', () => {
    renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores overflow on unmount', () => {
    document.body.style.overflow = 'auto';
    const { unmount } = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('does nothing when enabled=false', () => {
    renderHook(() => useScrollLock(false));
    expect(document.body.style.overflow).toBe('');
  });

  it('does not restore when disabled=false then unmounted', () => {
    document.body.style.overflow = 'scroll';
    const { unmount } = renderHook(() => useScrollLock(false));
    unmount();
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('multiple sheets: second lock does not double-apply; first unlock keeps lock active', () => {
    const { unmount: unmountA } = renderHook(() => useScrollLock(true));
    const { unmount: unmountB } = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');

    // Closing A should NOT restore scroll (B is still open)
    unmountA();
    expect(document.body.style.overflow).toBe('hidden');

    // Closing B restores
    unmountB();
    expect(document.body.style.overflow).toBe('');
  });

  it('restores correctly when both sheets close in reverse order', () => {
    const { unmount: unmountA } = renderHook(() => useScrollLock(true));
    const { unmount: unmountB } = renderHook(() => useScrollLock(true));
    unmountB();
    expect(document.body.style.overflow).toBe('hidden');
    unmountA();
    expect(document.body.style.overflow).toBe('');
  });
});
