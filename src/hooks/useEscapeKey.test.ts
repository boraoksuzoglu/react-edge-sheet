import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useEscapeKey } from './useEscapeKey';

function dispatchKey(key: string) {
  document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

describe('useEscapeKey', () => {
  it('fires callback on Escape when enabled', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(true, onEscape));
    dispatchKey('Escape');
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('does not fire on other keys', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(true, onEscape));
    dispatchKey('Enter');
    dispatchKey('Tab');
    dispatchKey('ArrowDown');
    expect(onEscape).not.toHaveBeenCalled();
  });

  it('does not fire when enabled=false', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(false, onEscape));
    dispatchKey('Escape');
    expect(onEscape).not.toHaveBeenCalled();
  });

  it('stops firing after unmount (cleanup)', () => {
    const onEscape = vi.fn();
    const { unmount } = renderHook(() => useEscapeKey(true, onEscape));
    unmount();
    dispatchKey('Escape');
    expect(onEscape).not.toHaveBeenCalled();
  });

  it('re-registers when enabled switches true → false → true', () => {
    const onEscape = vi.fn();
    const { rerender } = renderHook(({ enabled }) => useEscapeKey(enabled, onEscape), {
      initialProps: { enabled: true },
    });
    dispatchKey('Escape');
    expect(onEscape).toHaveBeenCalledTimes(1);

    rerender({ enabled: false });
    dispatchKey('Escape');
    expect(onEscape).toHaveBeenCalledTimes(1); // still 1, disabled

    rerender({ enabled: true });
    dispatchKey('Escape');
    expect(onEscape).toHaveBeenCalledTimes(2);
  });
});
