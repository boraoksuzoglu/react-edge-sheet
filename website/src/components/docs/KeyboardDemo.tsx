'use client';

import React, { useRef, useState } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';

function buildSheetStyle(): React.CSSProperties {
  return {
    backgroundColor: 'color-mix(in oklch, var(--glass-surface) 96%, transparent)',
    backdropFilter: 'blur(32px)',
    WebkitBackdropFilter: 'blur(32px)',
    border: '1px solid color-mix(in oklch, var(--glass-border) 60%, transparent)',
    boxShadow: '0 32px 80px -16px rgba(0,0,0,0.25)',
    borderRadius: '1.25rem',
    padding: '1.5rem',
  };
}

const pill: React.CSSProperties = {
  width: 36,
  height: 4,
  borderRadius: 9999,
  background: 'color-mix(in oklch, var(--glass-border) 80%, transparent)',
  margin: '0 auto 1.25rem',
};

const triggerBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1.25rem',
  borderRadius: '0.625rem',
  border: 'none',
  background: 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 600,
  fontFamily: 'inherit',
  transition: 'transform 0.15s',
};

// ── Focus trap demo ───────────────────────────────────────────────────────────

export function FocusTrapDemo() {
  const ref = useRef<SheetRef>(null);

  return (
    <div style={{ margin: '1.25rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          ref={() => {
            /* this is the restore target */
          }}
          id="focus-trap-trigger"
          style={triggerBtn}
          onClick={() => ref.current?.open()}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
          }}
        >
          Open sheet (then press Tab)
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>
          Tab stays inside · Esc closes · focus restores
        </span>
      </div>

      <Sheet
        ref={ref}
        edge="bottom"
        aria-labelledby="trap-title"
        aria-describedby="trap-desc"
        style={buildSheetStyle()}
      >
        <div style={pill} />
        <h3
          id="trap-title"
          style={{
            margin: '0 0 0.25rem',
            color: 'var(--foreground)',
            fontWeight: 700,
            fontSize: '1.05rem',
            letterSpacing: '-0.02em',
          }}
        >
          Focus Trap Demo
        </h3>
        <p
          id="trap-desc"
          style={{
            margin: '0 0 1.25rem',
            color: 'var(--foreground-muted)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}
        >
          Press{' '}
          <kbd
            style={{
              fontSize: '0.72rem',
              background: 'color-mix(in oklch, var(--glass-border) 40%, transparent)',
              borderRadius: '0.25rem',
              padding: '1px 5px',
              fontFamily: 'inherit',
            }}
          >
            Tab
          </kbd>{' '}
          repeatedly — focus cycles through the 4 elements below and wraps back. Press{' '}
          <kbd
            style={{
              fontSize: '0.72rem',
              background: 'color-mix(in oklch, var(--glass-border) 40%, transparent)',
              borderRadius: '0.25rem',
              padding: '1px 5px',
              fontFamily: 'inherit',
            }}
          >
            Esc
          </kbd>{' '}
          to close.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.625rem',
            marginBottom: '1.25rem',
          }}
        >
          <input
            placeholder="1. Text input"
            style={{
              padding: '0.5625rem 0.75rem',
              borderRadius: '0.625rem',
              border: '1px solid color-mix(in oklch, var(--glass-border) 50%, transparent)',
              background: 'color-mix(in oklch, var(--glass-surface) 50%, transparent)',
              color: 'var(--foreground)',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-atmos-purple)')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor =
                'color-mix(in oklch, var(--glass-border) 50%, transparent)')
            }
          />
          <select
            style={{
              padding: '0.5625rem 0.75rem',
              borderRadius: '0.625rem',
              border: '1px solid color-mix(in oklch, var(--glass-border) 50%, transparent)',
              background: 'color-mix(in oklch, var(--glass-surface) 80%, transparent)',
              color: 'var(--foreground)',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
              outline: 'none',
              cursor: 'pointer',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-atmos-purple)')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor =
                'color-mix(in oklch, var(--glass-border) 50%, transparent)')
            }
          >
            <option>2. Select dropdown</option>
            <option>Option A</option>
            <option>Option B</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.625rem' }}>
          <button
            onClick={() => ref.current?.close()}
            style={{
              flex: 1,
              padding: '0.5625rem',
              borderRadius: '0.75rem',
              border: '1px solid color-mix(in oklch, var(--glass-border) 50%, transparent)',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: 'var(--foreground)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                'color-mix(in oklch, var(--glass-border) 20%, transparent)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            3. Cancel
          </button>
          <button
            onClick={() => ref.current?.close()}
            style={{
              flex: 1,
              padding: '0.5625rem',
              borderRadius: '0.75rem',
              border: 'none',
              background:
                'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'white',
            }}
          >
            4. Confirm
          </button>
        </div>
      </Sheet>
    </div>
  );
}

// ── ARIA demo ─────────────────────────────────────────────────────────────────

export function AriaDemo() {
  const ref = useRef<SheetRef>(null);
  const [mode, setMode] = useState<'labelledby' | 'label' | 'describedby'>('labelledby');

  const modeConfig = {
    labelledby: {
      label: 'aria-labelledby',
      desc: 'Points to a heading element inside the sheet',
      color: 'var(--color-atmos-purple)',
    },
    label: {
      label: 'aria-label',
      desc: 'Direct string label (no visible heading needed)',
      color: 'var(--color-atmos-blue)',
    },
    describedby: {
      label: 'aria-describedby',
      desc: 'Points to a description paragraph',
      color: 'var(--color-atmos-indigo)',
    },
  };

  const cfg = modeConfig[mode];

  return (
    <div style={{ margin: '1.25rem 0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.875rem' }}>
        {(Object.keys(modeConfig) as (typeof mode)[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '0.35rem 0.875rem',
              borderRadius: '0.5rem',
              border: '1px solid',
              borderColor:
                mode === m
                  ? `color-mix(in oklch, ${modeConfig[m].color} 60%, transparent)`
                  : 'color-mix(in oklch, var(--glass-border) 50%, transparent)',
              background:
                mode === m
                  ? `color-mix(in oklch, ${modeConfig[m].color} 12%, transparent)`
                  : 'transparent',
              color: mode === m ? modeConfig[m].color : 'var(--foreground-muted)',
              fontSize: '0.8125rem',
              fontWeight: mode === m ? 600 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {modeConfig[m].label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          style={{
            ...triggerBtn,
            background: `linear-gradient(135deg, ${cfg.color}, var(--color-atmos-blue))`,
          }}
          onClick={() => ref.current?.open()}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
          }}
        >
          Open sheet
        </button>
        <span style={{ fontSize: '0.78rem', color: 'var(--foreground-muted)' }}>{cfg.desc}</span>
      </div>

      <Sheet
        ref={ref}
        edge="bottom"
        aria-label={mode === 'label' ? 'Navigation menu' : undefined}
        aria-labelledby={mode === 'labelledby' ? 'aria-demo-title' : undefined}
        aria-describedby={mode === 'describedby' ? 'aria-demo-desc' : undefined}
        style={buildSheetStyle()}
      >
        <div style={pill} />

        {mode === 'labelledby' && (
          <>
            <div
              style={{
                display: 'inline-block',
                marginBottom: '0.25rem',
                padding: '2px 8px',
                borderRadius: '0.375rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                background: `color-mix(in oklch, ${cfg.color} 12%, transparent)`,
                color: cfg.color,
              }}
            >
              ← aria-labelledby=&quot;aria-demo-title&quot;
            </div>
            <h3
              id="aria-demo-title"
              style={{
                margin: '0.25rem 0 1rem',
                color: 'var(--foreground)',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
              }}
            >
              Notification Settings
            </h3>
          </>
        )}

        {mode === 'label' && (
          <>
            <div
              style={{
                display: 'inline-block',
                marginBottom: '0.75rem',
                padding: '2px 8px',
                borderRadius: '0.375rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                background: `color-mix(in oklch, ${cfg.color} 12%, transparent)`,
                color: cfg.color,
              }}
            >
              ← aria-label=&quot;Navigation menu&quot;
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {['Dashboard', 'Projects', 'Settings'].map((item) => (
                <button
                  key={item}
                  onClick={() => ref.current?.close()}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--foreground)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
          </>
        )}

        {mode === 'describedby' && (
          <>
            <h3
              style={{
                margin: '0 0 0.25rem',
                color: 'var(--foreground)',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
              }}
            >
              Delete item?
            </h3>
            <div
              style={{
                display: 'inline-block',
                marginBottom: '0.25rem',
                padding: '2px 8px',
                borderRadius: '0.375rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                background: `color-mix(in oklch, ${cfg.color} 12%, transparent)`,
                color: cfg.color,
              }}
            >
              ← aria-describedby=&quot;aria-demo-desc&quot;
            </div>
            <p
              id="aria-demo-desc"
              style={{
                margin: '0.25rem 0 1.25rem',
                color: 'var(--foreground-muted)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
              }}
            >
              This will permanently delete the item. This action cannot be undone.
            </p>
          </>
        )}

        <div style={{ display: 'flex', gap: '0.625rem', marginTop: '1rem' }}>
          <button
            onClick={() => ref.current?.close()}
            style={{
              flex: 1,
              padding: '0.5625rem',
              borderRadius: '0.75rem',
              border: '1px solid color-mix(in oklch, var(--glass-border) 50%, transparent)',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: 'var(--foreground)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => ref.current?.close()}
            style={{
              flex: 1,
              padding: '0.5625rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: `linear-gradient(135deg, ${cfg.color}, var(--color-atmos-blue))`,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'white',
            }}
          >
            Confirm
          </button>
        </div>
      </Sheet>
    </div>
  );
}
