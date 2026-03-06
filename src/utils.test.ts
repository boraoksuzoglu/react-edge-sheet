import { describe, it, expect, vi } from 'vitest';
import { isVertical, getAlignment, resolvePortalTarget, getFocusableElements } from './utils';

describe('isVertical', () => {
  it('true for top/bottom', () => {
    expect(isVertical('top')).toBe(true);
    expect(isVertical('bottom')).toBe(true);
  });
  it('false for left/right', () => {
    expect(isVertical('left')).toBe(false);
    expect(isVertical('right')).toBe(false);
  });
});

describe('getAlignment', () => {
  it('defaults to center', () => {
    expect(getAlignment('bottom').justifyContent).toBe('center');
    expect(getAlignment('left').alignItems).toBe('center');
  });
  it('align=start on top/bottom → justifyContent=flex-start', () => {
    expect(getAlignment('bottom', 'start').justifyContent).toBe('flex-start');
  });
  it('align=end on left/right → alignItems=flex-end', () => {
    expect(getAlignment('left', 'end').alignItems).toBe('flex-end');
  });
});

describe('resolvePortalTarget', () => {
  it('null → null (inline render)', () => expect(resolvePortalTarget(null)).toBe(null));
  it('undefined → document.body (browser)', () =>
    expect(resolvePortalTarget(undefined)).toBe(document.body));
  it('custom element → returned as-is', () => {
    const el = document.createElement('div');
    expect(resolvePortalTarget(el)).toBe(el);
  });
  it('undefined in SSR (no document) → null', () => {
    // vi.stubGlobal temporarily removes document to simulate an SSR environment
    vi.stubGlobal('document', undefined);
    try {
      expect(resolvePortalTarget(undefined)).toBe(null);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe('getFocusableElements', () => {
  it('finds button and input, skips span', () => {
    const div = document.createElement('div');
    div.innerHTML = '<button>A</button><input /><span>text</span>';
    expect(getFocusableElements(div)).toHaveLength(2);
  });
  it('excludes elements inside aria-hidden', () => {
    const div = document.createElement('div');
    div.innerHTML = '<div aria-hidden="true"><button>hidden</button></div><button>visible</button>';
    expect(getFocusableElements(div)).toHaveLength(1);
  });
  it('excludes disabled buttons', () => {
    const div = document.createElement('div');
    div.innerHTML = '<button disabled>no</button><button>yes</button>';
    expect(getFocusableElements(div)).toHaveLength(1);
  });
});
