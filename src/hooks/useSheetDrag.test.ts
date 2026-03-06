import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSheetDrag } from './useSheetDrag';

// Helper: simulate the full drag lifecycle via native DOM events
function simulateDrag(
  handlers: { onMouseDown: (e: React.MouseEvent) => void },
  start: { x: number; y: number },
  end: { x: number; y: number }
) {
  act(() => {
    handlers.onMouseDown({
      target: document.body,
      clientX: start.x,
      clientY: start.y,
    } as unknown as React.MouseEvent);
  });
  act(() => {
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: end.x, clientY: end.y }));
  });
  act(() => {
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: end.x, clientY: end.y }));
  });
}

describe('useSheetDrag – initial state', () => {
  it('starts not dragging with zero offset', () => {
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn: vi.fn() })
    );
    expect(result.current.isDragging).toBe(false);
    expect(result.current.dragOffset).toBe(0);
  });
});

describe('useSheetDrag – enabled=false', () => {
  it('disabled hook never activates', () => {
    const closeFn = vi.fn();
    const { result } = renderHook(() => useSheetDrag({ edge: 'bottom', enabled: false, closeFn }));
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 0, y: 200 });
    expect(result.current.isDragging).toBe(false);
    expect(closeFn).not.toHaveBeenCalled();
  });
});

describe('useSheetDrag – activation threshold', () => {
  it('delta < 6px does not activate drag', () => {
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn: vi.fn() })
    );
    act(() => {
      result.current.handlers.onMouseDown({
        target: document.body,
        clientX: 0,
        clientY: 0,
      } as unknown as React.MouseEvent);
    });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 5 }));
    });
    expect(result.current.isDragging).toBe(false);
    expect(result.current.dragOffset).toBe(0);
    // cleanup
    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 5 }));
    });
  });

  it('delta >= 6px activates drag', () => {
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn: vi.fn() })
    );
    act(() => {
      result.current.handlers.onMouseDown({
        target: document.body,
        clientX: 0,
        clientY: 0,
      } as unknown as React.MouseEvent);
    });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 10 }));
    });
    expect(result.current.isDragging).toBe(true);
    // cleanup
    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 10 }));
    });
  });
});

describe('useSheetDrag – dismiss direction', () => {
  it('bottom edge: downward drag past threshold calls closeFn', () => {
    const closeFn = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn, threshold: 80 })
    );
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 0, y: 100 });
    expect(closeFn).toHaveBeenCalledOnce();
  });

  it('top edge: upward drag past threshold calls closeFn', () => {
    const closeFn = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'top', enabled: true, closeFn, threshold: 80 })
    );
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 0, y: -100 });
    expect(closeFn).toHaveBeenCalledOnce();
  });

  it('left edge: leftward drag past threshold calls closeFn', () => {
    const closeFn = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'left', enabled: true, closeFn, threshold: 80 })
    );
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: -100, y: 0 });
    expect(closeFn).toHaveBeenCalledOnce();
  });

  it('right edge: rightward drag past threshold calls closeFn', () => {
    const closeFn = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'right', enabled: true, closeFn, threshold: 80 })
    );
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 100, y: 0 });
    expect(closeFn).toHaveBeenCalledOnce();
  });

  it('drag below threshold with velocity disabled does not close', () => {
    const closeFn = vi.fn();
    const { result } = renderHook(() =>
      // velocityThreshold: Infinity disables velocity-based dismissal so only distance matters
      useSheetDrag({
        edge: 'bottom',
        enabled: true,
        closeFn,
        threshold: 80,
        velocityThreshold: Infinity,
      })
    );
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 0, y: 30 });
    expect(closeFn).not.toHaveBeenCalled();
  });

  it('drag in wrong direction does not close', () => {
    const closeFn = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn, threshold: 80 })
    );
    // upward drag on a bottom sheet = wrong direction
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 0, y: -100 });
    expect(closeFn).not.toHaveBeenCalled();
  });
});

describe('useSheetDrag – rubber band', () => {
  it('drag against dismiss direction applies 20% resistance', () => {
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn: vi.fn() })
    );
    act(() => {
      result.current.handlers.onMouseDown({
        target: document.body,
        clientX: 0,
        clientY: 0,
      } as unknown as React.MouseEvent);
    });
    // upward drag (against dismiss) on bottom sheet → 20% of -100 = -20
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: -100 }));
    });
    expect(result.current.dragOffset).toBeCloseTo(-20);
    // cleanup
    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: -100 }));
    });
  });

  it('drag toward dismiss direction applies full resistance', () => {
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn: vi.fn() })
    );
    act(() => {
      result.current.handlers.onMouseDown({
        target: document.body,
        clientX: 0,
        clientY: 0,
      } as unknown as React.MouseEvent);
    });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 50 }));
    });
    expect(result.current.dragOffset).toBe(50);
    // cleanup
    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 50 }));
    });
  });
});

describe('useSheetDrag – snap points', () => {
  it('toward dismiss from snap > 0 → onSnapChange(snap - 1)', () => {
    const closeFn = vi.fn();
    const onSnapChange = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({
        edge: 'bottom',
        enabled: true,
        closeFn,
        threshold: 80,
        snapPoints: ['25vh', '50vh', '90vh'],
        currentSnap: 2,
        onSnapChange,
      })
    );
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 0, y: 100 });
    expect(onSnapChange).toHaveBeenCalledWith(1);
    expect(closeFn).not.toHaveBeenCalled();
  });

  it('toward dismiss from snap 0 → closeFn', () => {
    const closeFn = vi.fn();
    const onSnapChange = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({
        edge: 'bottom',
        enabled: true,
        closeFn,
        threshold: 80,
        snapPoints: ['25vh', '50vh', '90vh'],
        currentSnap: 0,
        onSnapChange,
      })
    );
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 0, y: 100 });
    expect(closeFn).toHaveBeenCalledOnce();
    expect(onSnapChange).not.toHaveBeenCalled();
  });

  it('away from dismiss → onSnapChange(snap + 1)', () => {
    const closeFn = vi.fn();
    const onSnapChange = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({
        edge: 'bottom',
        enabled: true,
        closeFn,
        threshold: 80,
        snapPoints: ['25vh', '50vh', '90vh'],
        currentSnap: 1,
        onSnapChange,
      })
    );
    simulateDrag(result.current.handlers, { x: 0, y: 0 }, { x: 0, y: -100 });
    expect(onSnapChange).toHaveBeenCalledWith(2);
    expect(closeFn).not.toHaveBeenCalled();
  });
});

describe('useSheetDrag – interactive elements', () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    input = document.createElement('input');
    document.body.appendChild(input);
  });

  afterEach(() => {
    document.body.removeChild(input);
  });

  it('drag started on input is ignored', () => {
    const closeFn = vi.fn();
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn, threshold: 80 })
    );
    act(() => {
      result.current.handlers.onMouseDown({
        target: input,
        clientX: 0,
        clientY: 0,
      } as unknown as React.MouseEvent);
    });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 100 }));
    });
    expect(result.current.isDragging).toBe(false);
    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 100 }));
    });
    expect(closeFn).not.toHaveBeenCalled();
  });
});

describe('useSheetDrag – cleanup on release', () => {
  it('resets isDragging and dragOffset after release', () => {
    const { result } = renderHook(() =>
      useSheetDrag({ edge: 'bottom', enabled: true, closeFn: vi.fn(), threshold: 200 })
    );
    act(() => {
      result.current.handlers.onMouseDown({
        target: document.body,
        clientX: 0,
        clientY: 0,
      } as unknown as React.MouseEvent);
    });
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 50 }));
    });
    expect(result.current.isDragging).toBe(true);
    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 50 }));
    });
    expect(result.current.isDragging).toBe(false);
    expect(result.current.dragOffset).toBe(0);
  });
});
