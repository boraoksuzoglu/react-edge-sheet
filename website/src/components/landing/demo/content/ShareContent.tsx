'use client';

import { pill, label, heading } from '../styles';
import { useIsMobile } from '../useIsMobile';

const shareOptions = [
  { icon: '✉', label: 'Email', color: 'oklch(60% 0.15 250)' },
  { icon: '𝕏', label: 'X', color: 'oklch(45% 0.08 260)' },
  { icon: 'in', label: 'LinkedIn', color: 'oklch(55% 0.18 250)' },
  { icon: '⎘', label: 'Copy link', color: 'oklch(62% 0.20 145)' },
];

export function ShareContent({ onClose }: { onClose: () => void }) {
  const isMobile = useIsMobile();

  return (
    <div style={{ padding: '1.5rem 1.75rem 1.75rem', minWidth: 0, maxWidth: '100%' }}>
      <div style={pill} />
      <div style={label}>Share</div>
      <div style={{ ...heading, marginBottom: '1.5rem' }}>Share this page</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {shareOptions.map((opt) => (
          <button
            key={opt.label}
            onClick={onClose}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.25rem 0.75rem',
              borderRadius: '1rem',
              border: '1px solid color-mix(in oklch, var(--glass-border) 45%, transparent)',
              background: 'color-mix(in oklch, var(--glass-surface) 55%, transparent)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px -8px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = `color-mix(in oklch, ${opt.color} 40%, transparent)`;
              e.currentTarget.style.background = `color-mix(in oklch, ${opt.color} 8%, transparent)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor =
                'color-mix(in oklch, var(--glass-border) 45%, transparent)';
              e.currentTarget.style.background =
                'color-mix(in oklch, var(--glass-surface) 55%, transparent)';
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                background: `color-mix(in oklch, ${opt.color} 14%, transparent)`,
                color: opt.color,
                border: '1px solid color-mix(in oklch, var(--glass-border) 35%, transparent)',
              }}
            >
              {opt.icon}
            </div>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--foreground)',
              }}
            >
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
