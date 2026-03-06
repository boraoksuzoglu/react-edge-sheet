import { render, screen, fireEvent } from '@testing-library/react';
import { createRef, act } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Sheet } from './Sheet';
import { useSheetContext } from './context/SheetContext';
import type { SheetRef } from './types';

describe('Sheet', () => {
  it('renders nothing when closed', () => {
    const ref = createRef<SheetRef>();
    render(
      <Sheet ref={ref} edge="bottom">
        <p>Content</p>
      </Sheet>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('shows dialog after open()', async () => {
    const ref = createRef<SheetRef>();
    render(
      <Sheet ref={ref} edge="bottom">
        <p>Hello</p>
      </Sheet>
    );
    await act(async () => {
      ref.current?.open();
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('remains visible during exit animation after Escape', async () => {
    const ref = createRef<SheetRef>();
    render(
      <Sheet ref={ref} edge="bottom">
        <p>Hello</p>
      </Sheet>
    );
    await act(async () => {
      ref.current?.open();
    });
    fireEvent.keyDown(document, { key: 'Escape' });
    // still in DOM — exit animation running
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies aria-label to dialog element', async () => {
    const ref = createRef<SheetRef>();
    render(
      <Sheet ref={ref} edge="bottom" aria-label="Settings">
        <p>Content</p>
      </Sheet>
    );
    await act(async () => {
      ref.current?.open();
    });
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument();
  });

  it('controlled open prop renders/hides sheet', async () => {
    const { rerender, queryByRole } = render(
      <Sheet edge="bottom" open={false}>
        <p>Content</p>
      </Sheet>
    );
    expect(queryByRole('dialog')).toBeNull();
    rerender(
      <Sheet edge="bottom" open={true}>
        <p>Content</p>
      </Sheet>
    );
    await act(async () => {});
    expect(queryByRole('dialog')).toBeInTheDocument();
  });

  it('backdrop click closes the sheet', async () => {
    const onOpenChange = vi.fn();
    const ref = createRef<SheetRef>();
    render(
      <Sheet ref={ref} edge="bottom" onOpenChange={onOpenChange}>
        <p>Content</p>
      </Sheet>
    );
    await act(async () => {
      ref.current?.open();
    });
    // The backdrop is the aria-hidden div inside the sheet portal
    const backdrop = document.body.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('renders into document.body by default (portal)', async () => {
    const ref = createRef<SheetRef>();
    const { container } = render(
      <Sheet ref={ref} edge="bottom">
        <p>Portal content</p>
      </Sheet>
    );
    await act(async () => {
      ref.current?.open();
    });
    // Sheet is portaled → not inside render container
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    // But it IS in document.body
    expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('useSheetContext throws when used outside Sheet', () => {
    function BadConsumer() {
      useSheetContext();
      return null;
    }
    expect(() => render(<BadConsumer />)).toThrow('useSheetContext must be used within a Sheet');
  });
});
