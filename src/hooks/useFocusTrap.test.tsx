import React, { useRef } from 'react';
import { render, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFocusTrap } from './useFocusTrap';

// Helper component
function Trap({
  isVisible,
  isEntered,
  children,
}: {
  isVisible: boolean;
  isEntered: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, isVisible, isEntered);
  return (
    <div ref={ref} tabIndex={-1} data-testid="trap">
      {children}
    </div>
  );
}

function dispatchTab(shiftKey = false) {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true }));
}

describe('useFocusTrap – auto-focus', () => {
  it('focuses first focusable element when isEntered becomes true', async () => {
    const { rerender, getByTestId } = render(
      <Trap isVisible={true} isEntered={false}>
        <button data-testid="btn1">First</button>
        <button>Last</button>
      </Trap>
    );
    await act(async () => {
      rerender(
        <Trap isVisible={true} isEntered={true}>
          <button data-testid="btn1">First</button>
          <button>Last</button>
        </Trap>
      );
    });
    expect(document.activeElement).toBe(getByTestId('btn1'));
  });

  it('focuses container when no focusable children', async () => {
    const { rerender, getByTestId } = render(
      <Trap isVisible={true} isEntered={false}>
        <p>No buttons here</p>
      </Trap>
    );
    await act(async () => {
      rerender(
        <Trap isVisible={true} isEntered={true}>
          <p>No buttons here</p>
        </Trap>
      );
    });
    expect(document.activeElement).toBe(getByTestId('trap'));
  });
});

describe('useFocusTrap – Tab cycling', () => {
  it('Tab on last element wraps to first', async () => {
    const { getByTestId } = render(
      <Trap isVisible={true} isEntered={true}>
        <button data-testid="first">First</button>
        <button data-testid="last">Last</button>
      </Trap>
    );
    getByTestId('last').focus();
    dispatchTab(false);
    expect(document.activeElement).toBe(getByTestId('first'));
  });

  it('Shift+Tab on first element wraps to last', async () => {
    const { getByTestId } = render(
      <Trap isVisible={true} isEntered={true}>
        <button data-testid="first">First</button>
        <button data-testid="last">Last</button>
      </Trap>
    );
    getByTestId('first').focus();
    dispatchTab(true);
    expect(document.activeElement).toBe(getByTestId('last'));
  });

  it('Tab on middle element does not wrap', async () => {
    const { getByTestId } = render(
      <Trap isVisible={true} isEntered={true}>
        <button data-testid="first">First</button>
        <button data-testid="middle">Middle</button>
        <button data-testid="last">Last</button>
      </Trap>
    );
    getByTestId('middle').focus();
    // Normal Tab — browser handles it, trap should not prevent
    dispatchTab(false);
    // Focus stays on middle (jsdom doesn't move focus on normal Tab)
    expect(document.activeElement).toBe(getByTestId('middle'));
  });

  it('Tab with no focusable children focuses container', async () => {
    const { getByTestId } = render(
      <Trap isVisible={true} isEntered={true}>
        <p>No buttons</p>
      </Trap>
    );
    dispatchTab(false);
    expect(document.activeElement).toBe(getByTestId('trap'));
  });
});

describe('useFocusTrap – focus restoration', () => {
  it('restores focus to previously focused element on close', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(
      <Trap isVisible={true} isEntered={true}>
        <button>Inside</button>
      </Trap>
    );

    // Close the sheet
    rerender(
      <Trap isVisible={false} isEntered={false}>
        <button>Inside</button>
      </Trap>
    );

    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });

  it('does not throw when previous element is removed from DOM', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const focusSpy = vi.spyOn(trigger, 'focus');

    const { rerender } = render(
      <Trap isVisible={true} isEntered={true}>
        <button>Inside</button>
      </Trap>
    );

    // Remove the trigger before closing the sheet
    document.body.removeChild(trigger);

    expect(() => {
      rerender(
        <Trap isVisible={false} isEntered={false}>
          <button>Inside</button>
        </Trap>
      );
    }).not.toThrow();

    // focus() should NOT have been called since element is not in document
    expect(focusSpy).not.toHaveBeenCalled();
  });
});
