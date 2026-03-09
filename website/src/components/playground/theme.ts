// ─── Theme-aware color tokens ─────────────────────────────────────────────────
// All values use CSS var() so they adapt automatically to light / dark theme.

export const C = {
  // Surfaces
  bg: 'var(--background)',
  bgPanel: 'color-mix(in oklch, var(--glass-surface) 70%, var(--background))',
  bgEditor: 'color-mix(in oklch, var(--background) 88%, var(--glass-overlay))',
  bgTabBar: 'color-mix(in oklch, var(--glass-surface) 50%, var(--background))',
  bgStatusBar: 'color-mix(in oklch, var(--background) 94%, var(--glass-surface))',
  bgInput: 'color-mix(in oklch, var(--glass-overlay) 80%, var(--background))',
  bgElevated: 'color-mix(in oklch, var(--glass-surface) 90%, var(--background))',
  bgButton: 'color-mix(in oklch, var(--glass-overlay) 90%, var(--background))',
  // Borders
  border: 'color-mix(in oklch, var(--glass-border) 65%, transparent)',
  borderSubtle: 'color-mix(in oklch, var(--glass-border) 40%, transparent)',
  borderFaint: 'color-mix(in oklch, var(--glass-border) 22%, transparent)',
  // Text
  text: 'var(--foreground)',
  textMuted: 'var(--foreground-muted)',
  textDim: 'color-mix(in oklch, var(--foreground-muted) 72%, transparent)',
  textDimmer: 'color-mix(in oklch, var(--foreground-muted) 48%, transparent)',
  textFaint: 'color-mix(in oklch, var(--foreground-muted) 32%, transparent)',
} as const;

export const LABEL_STYLE: React.CSSProperties = {
  fontSize: '0.59rem',
  fontWeight: 700,
  letterSpacing: '0.13em',
  color: C.textDim,
  textTransform: 'uppercase',
  marginBottom: '0.55rem',
};

export const TEXT_INPUT: React.CSSProperties = {
  width: '100%',
  padding: '0.3rem 0.5rem',
  borderRadius: '0.375rem',
  border: `1px solid ${C.border}`,
  background: C.bgInput,
  color: C.text,
  fontSize: '0.75rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-mono)',
};
