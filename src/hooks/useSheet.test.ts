import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSheet } from './useSheet';

describe('useSheet – uncontrolled', () => {
  it('starts closed', () => {
    const { result } = renderHook(() => useSheet({}));
    expect(result.current.isOpen).toBe(false);
    expect(result.current.isVisible).toBe(false);
  });

  it('openFn → isOpen:true, isVisible:true', () => {
    const { result } = renderHook(() => useSheet({}));
    act(() => result.current.openFn());
    expect(result.current.isOpen).toBe(true);
    expect(result.current.isVisible).toBe(true);
  });

  it('closeFn → isOpen:false, isExiting:true, isVisible:true (exit animation running)', () => {
    const { result } = renderHook(() => useSheet({}));
    act(() => result.current.openFn());
    act(() => result.current.closeFn());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.isExiting).toBe(true);
    expect(result.current.isVisible).toBe(true);
  });

  it('onTransitionEnd after close → isVisible:false (animation done)', () => {
    const { result } = renderHook(() => useSheet({}));
    act(() => result.current.openFn());
    act(() => result.current.closeFn());
    act(() => result.current.onTransitionEnd());
    expect(result.current.isExiting).toBe(false);
    expect(result.current.isVisible).toBe(false);
  });

  it('onTransitionEnd after open → fires onOpen', () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() => useSheet({ onOpen }));
    act(() => result.current.openFn());
    act(() => result.current.onTransitionEnd());
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('onTransitionEnd after close → fires onClose', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useSheet({ onClose }));
    act(() => result.current.openFn());
    act(() => result.current.closeFn());
    act(() => result.current.onTransitionEnd());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('toggle: closed → open → exiting', () => {
    const { result } = renderHook(() => useSheet({}));
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.isExiting).toBe(true);
  });

  it('double closeFn is a no-op (guard prevents double-fire)', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useSheet({ onOpenChange }));
    act(() => result.current.openFn());
    act(() => {
      result.current.closeFn();
      result.current.closeFn();
    });
    // open(true) + close(false) = 2 calls, NOT 3
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  it('fires onOpenChange with correct values', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useSheet({ onOpenChange }));
    act(() => result.current.openFn());
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    act(() => result.current.closeFn());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});

describe('useSheet – controlled', () => {
  it('syncs open prop: false → true', () => {
    const { result, rerender } = renderHook(({ open }) => useSheet({ open }), {
      initialProps: { open: false },
    });
    expect(result.current.isOpen).toBe(false);
    rerender({ open: true });
    expect(result.current.isOpen).toBe(true);
  });

  it('syncs open prop: true → false (starts exit)', () => {
    const { result, rerender } = renderHook(({ open }) => useSheet({ open }), {
      initialProps: { open: true },
    });
    rerender({ open: false });
    expect(result.current.isExiting).toBe(true);
    expect(result.current.isOpen).toBe(false);
  });
});
