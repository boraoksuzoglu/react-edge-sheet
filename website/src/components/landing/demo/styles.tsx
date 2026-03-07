import type { SheetEdge } from 'react-edge-sheet';

/** Float away from edge with all-rounded corners. On mobile, bottom/top sheets get edge-to-edge (no radius on touching edge). */
export function floatStyle(
  extra?: React.CSSProperties,
  options?: { isMobile?: boolean; edge?: SheetEdge }
): React.CSSProperties {
  const { isMobile = false, edge } = options ?? {};
  let borderRadius = '1.25rem';

  if (isMobile && edge) {
    if (edge === 'bottom') borderRadius = '1.25rem 1.25rem 0 0';
    else if (edge === 'top') borderRadius = '0 0 1.25rem 1.25rem';
  }

  return {
    backgroundColor: 'color-mix(in oklch, var(--glass-surface) 96%, transparent)',
    backdropFilter: 'blur(32px)',
    WebkitBackdropFilter: 'blur(32px)',
    border: '1px solid color-mix(in oklch, var(--glass-border) 60%, transparent)',
    boxShadow:
      '0 32px 80px -16px rgba(0,0,0,0.28), 0 0 0 1px color-mix(in oklch, var(--glass-border) 30%, transparent)',
    borderRadius,
    ...extra,
  };
}

export const pill: React.CSSProperties = {
  width: 36,
  height: 4,
  borderRadius: 9999,
  background: 'color-mix(in oklch, var(--glass-border) 80%, transparent)',
  margin: '0 auto 1.25rem',
};

export const label: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'var(--foreground-muted)',
  marginBottom: '0.25rem',
};

export const heading: React.CSSProperties = {
  margin: '0 0 1.25rem',
  fontWeight: 700,
  fontSize: '1.15rem',
  color: 'var(--foreground)',
  letterSpacing: '-0.02em',
};

export function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: 'color-mix(in oklch, var(--glass-border) 35%, transparent)',
        margin: '0.75rem 0',
      }}
    />
  );
}
