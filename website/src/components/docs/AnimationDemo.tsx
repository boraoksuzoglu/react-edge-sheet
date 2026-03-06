'use client';

import React, { useRef, useState } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';
import type { AnimationPreset } from 'react-edge-sheet';

function buildSheetStyle(): React.CSSProperties {
  return {
    backgroundColor: 'color-mix(in oklch, var(--glass-surface) 96%, transparent)',
    backdropFilter: 'blur(32px)',
    WebkitBackdropFilter: 'blur(32px)',
    border: '1px solid color-mix(in oklch, var(--glass-border) 60%, transparent)',
    boxShadow: '0 32px 80px -16px rgba(0,0,0,0.25), 0 0 0 1px color-mix(in oklch, var(--glass-border) 25%, transparent)',
    borderRadius: '1.25rem',
    padding: '1.5rem',
  };
}

const pill: React.CSSProperties = {
  width: 36, height: 4, borderRadius: 9999,
  background: 'color-mix(in oklch, var(--glass-border) 80%, transparent)',
  margin: '0 auto 1.25rem',
};

const PRESETS: { id: AnimationPreset; label: string; desc: string }[] = [
  { id: 'default', label: 'Default', desc: '0.42s material' },
  { id: 'spring',  label: 'Spring',  desc: '0.5s overshoot' },
  { id: 'bounce',  label: 'Bounce',  desc: '0.6s big bounce' },
  { id: 'snappy',  label: 'Snappy',  desc: '0.22s fast' },
  { id: 'slow',    label: 'Slow',    desc: '0.7s cinematic' },
];

export function AnimationPresetDemo() {
  const ref = useRef<SheetRef>(null);
  const [active, setActive] = useState<AnimationPreset>('default');

  return (
    <div style={{ margin: '1.25rem 0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.875rem' }}>
        {PRESETS.map(p => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            style={{
              padding: '0.35rem 0.875rem',
              borderRadius: '0.5rem',
              border: '1px solid',
              borderColor: active === p.id
                ? 'color-mix(in oklch, var(--color-atmos-purple) 60%, transparent)'
                : 'color-mix(in oklch, var(--glass-border) 50%, transparent)',
              background: active === p.id
                ? 'color-mix(in oklch, var(--color-atmos-purple) 12%, transparent)'
                : 'transparent',
              color: active === p.id ? 'var(--color-atmos-purple)' : 'var(--foreground-muted)',
              fontSize: '0.8125rem',
              fontWeight: active === p.id ? 600 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => ref.current?.open()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1.25rem', borderRadius: '0.625rem',
            border: 'none',
            background: 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
            color: '#fff', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
            fontFamily: 'inherit', boxShadow: '0 4px 12px -2px oklch(68% 0.22 290 / 0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
        >
          Try &quot;{active}&quot; preset
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)', fontFamily: 'monospace' }}>
          animationPreset=&quot;{active}&quot;
        </span>
      </div>

      <Sheet
        ref={ref}
        edge="bottom"
        animationPreset={active}
        style={buildSheetStyle()}
      >
        <div style={pill} />
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground-muted)', marginBottom: '0.25rem' }}>
          Animation Preset
        </div>
        <h3 style={{ margin: '0 0 0.5rem', color: 'var(--foreground)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
          {PRESETS.find(p => p.id === active)?.label}
        </h3>
        <p style={{ color: 'var(--foreground-muted)', margin: '0 0 1.25rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
          {PRESETS.find(p => p.id === active)?.desc} — close and reopen to compare with a different preset.
        </p>
        <button
          onClick={() => ref.current?.close()}
          style={{
            padding: '0.5rem 1.25rem', borderRadius: '0.75rem', border: 'none',
            background: 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
            color: 'white', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
          }}
        >
          Close
        </button>
      </Sheet>
    </div>
  );
}

// ── Asymmetric enter/exit demo ────────────────────────────────────────────────

const ASYMMETRIC_PRESETS: { label: string; enter: string; exit: string; desc: string }[] = [
  {
    label: 'Fast in, slow out',
    enter: 'transform 0.15s cubic-bezier(0, 0, 0.2, 1)',
    exit:  'transform 0.55s cubic-bezier(0.4, 0, 1, 1)',
    desc:  'Instant feel when opening, graceful close',
  },
  {
    label: 'Slow in, fast out',
    enter: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    exit:  'transform 0.18s cubic-bezier(0.4, 0, 1, 1)',
    desc:  'Dramatic entrance, snappy dismiss',
  },
  {
    label: 'Instant open',
    enter: 'transform 0s',
    exit:  'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    desc:  'Command-palette style — no enter animation',
  },
];

export function AsymmetricTransitionDemo() {
  const ref = useRef<SheetRef>(null);
  const [active, setActive] = useState(0);

  const preset = ASYMMETRIC_PRESETS[active];

  return (
    <div style={{ margin: '1.25rem 0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.875rem' }}>
        {ASYMMETRIC_PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActive(i)}
            style={{
              padding: '0.35rem 0.875rem',
              borderRadius: '0.5rem',
              border: '1px solid',
              borderColor: active === i
                ? 'color-mix(in oklch, var(--color-atmos-indigo) 60%, transparent)'
                : 'color-mix(in oklch, var(--glass-border) 50%, transparent)',
              background: active === i
                ? 'color-mix(in oklch, var(--color-atmos-indigo) 12%, transparent)'
                : 'transparent',
              color: active === i ? 'var(--color-atmos-indigo)' : 'var(--foreground-muted)',
              fontSize: '0.8125rem',
              fontWeight: active === i ? 600 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => ref.current?.open()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1.25rem', borderRadius: '0.625rem',
            border: 'none',
            background: 'linear-gradient(135deg, var(--color-atmos-indigo), var(--color-atmos-purple))',
            color: '#fff', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
            fontFamily: 'inherit',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
        >
          Open sheet
        </button>
        <span style={{ fontSize: '0.78rem', color: 'var(--foreground-muted)' }}>
          {preset.desc}
        </span>
      </div>

      <Sheet
        ref={ref}
        edge="bottom"
        enterTransition={preset.enter}
        exitTransition={preset.exit}
        style={buildSheetStyle()}
      >
        <div style={pill} />
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground-muted)', marginBottom: '0.25rem' }}>
          Asymmetric
        </div>
        <h3 style={{ margin: '0 0 0.5rem', color: 'var(--foreground)', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
          {preset.label}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1.25rem' }}>
          <code style={{ fontSize: '0.78rem', color: 'var(--color-atmos-indigo)', background: 'color-mix(in oklch, var(--color-atmos-indigo) 8%, transparent)', padding: '0.25rem 0.625rem', borderRadius: '0.375rem' }}>
            enter: {preset.enter}
          </code>
          <code style={{ fontSize: '0.78rem', color: 'var(--color-atmos-purple)', background: 'color-mix(in oklch, var(--color-atmos-purple) 8%, transparent)', padding: '0.25rem 0.625rem', borderRadius: '0.375rem' }}>
            exit: {preset.exit}
          </code>
        </div>
        <button
          onClick={() => ref.current?.close()}
          style={{
            padding: '0.5rem 1.25rem', borderRadius: '0.75rem', border: 'none',
            background: 'linear-gradient(135deg, var(--color-atmos-indigo), var(--color-atmos-purple))',
            color: 'white', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
          }}
        >
          Close (notice the exit)
        </button>
      </Sheet>
    </div>
  );
}
