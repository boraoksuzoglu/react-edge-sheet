'use client';

import { pill, label, heading } from '../styles';

const actions = [
  { icon: '↗', label: 'Share', color: 'oklch(65% 0.20 255)' },
  { icon: '⧉', label: 'Duplicate', color: 'oklch(60% 0.18 200)' },
  { icon: '↓', label: 'Download', color: 'oklch(62% 0.22 145)' },
  { icon: '✕', label: 'Delete', color: 'oklch(60% 0.22 20)' },
];

export function BottomContent({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
      <div style={pill} />
      <div style={label}>Actions</div>
      <div style={heading}>Quick Actions</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                'color-mix(in oklch, var(--glass-border) 25%, transparent)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: '0.625rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `color-mix(in oklch, ${a.color} 15%, transparent)`,
                color: a.color,
                fontSize: '1rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {a.icon}
            </span>
            <span
              style={{
                fontWeight: 500,
                fontSize: '0.9375rem',
                color: 'var(--foreground)',
              }}
            >
              {a.label}
            </span>
            <svg
              style={{ marginLeft: 'auto', opacity: 0.3 }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
