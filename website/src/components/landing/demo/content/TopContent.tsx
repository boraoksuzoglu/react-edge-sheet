'use client';

import { useState } from 'react';
import { label, Divider } from '../styles';

const commands = [
  { key: '⌘D', label: 'Open Docs', icon: '§' },
  { key: '⌘A', label: 'API Reference', icon: '⁜' },
  { key: '⌘G', label: 'View on GitHub', icon: '◇' },
];

export function TopContent({ onClose }: { onClose: () => void }) {
  const [val, setVal] = useState('');
  return (
    <div style={{ padding: '0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1.25rem',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: 'var(--foreground-muted)', flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          autoFocus
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Search anything..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '1rem',
            color: 'var(--foreground)',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={onClose}
          style={{
            border: 'none',
            background: 'color-mix(in oklch, var(--glass-border) 40%, transparent)',
            borderRadius: '0.375rem',
            padding: '2px 8px',
            fontSize: '0.75rem',
            color: 'var(--foreground-muted)',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Esc
        </button>
      </div>
      <Divider />
      <div style={{ padding: '0.5rem 0.75rem 0.875rem' }}>
        <div
          style={{
            ...label,
            padding: '0 0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          Suggestions
        </div>
        {commands.map((c) => (
          <button
            key={c.label}
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.625rem',
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
            <span style={{ fontSize: '1rem' }}>{c.icon}</span>
            <span
              style={{
                flex: 1,
                fontSize: '0.9rem',
                color: 'var(--foreground)',
                fontWeight: 450,
              }}
            >
              {c.label}
            </span>
            <kbd
              style={{
                fontSize: '0.7rem',
                color: 'var(--foreground-muted)',
                background: 'color-mix(in oklch, var(--glass-border) 40%, transparent)',
                borderRadius: '0.25rem',
                padding: '2px 6px',
                fontFamily: 'inherit',
              }}
            >
              {c.key}
            </kbd>
          </button>
        ))}
      </div>
    </div>
  );
}
