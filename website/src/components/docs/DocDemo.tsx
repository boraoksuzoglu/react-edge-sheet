'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { Sheet, SheetRef, SheetEdge } from 'react-edge-sheet';

interface DocDemoProps {
  edge?: SheetEdge;
  label?: string;
  sheetStyle?: React.CSSProperties;
  backdropStyle?: React.CSSProperties;
  children?: any;
}

/** Float the sheet panel away from the screen edge with full rounded corners */
function buildSheetStyle(side: SheetEdge, extra?: React.CSSProperties): React.CSSProperties {
  return {
    backgroundColor: 'color-mix(in oklch, var(--glass-surface) 96%, transparent)',
    backdropFilter: 'blur(32px)',
    WebkitBackdropFilter: 'blur(32px)',
    border: '1px solid color-mix(in oklch, var(--glass-border) 60%, transparent)',
    boxShadow: '0 32px 80px -16px rgba(0,0,0,0.25), 0 0 0 1px color-mix(in oklch, var(--glass-border) 25%, transparent)',
    borderRadius: '1.25rem',
    padding: '1.5rem',
    ...(side === 'left' && { width: 280 }),
    ...(side === 'right' && { width: 280 }),
    ...extra,
  };
}

const pill: React.CSSProperties = {
  width: 36, height: 4, borderRadius: 9999,
  background: 'color-mix(in oklch, var(--glass-border) 80%, transparent)',
  margin: '0 auto 1.25rem',
};

function DefaultContent({ side, onClose }: { side: SheetEdge; onClose: () => void }) {
  return (
    <div>
      {(side === 'bottom' || side === 'top') && <div style={pill} />}
      <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--foreground-muted)', marginBottom: '0.25rem' }}>
        Example
      </div>
      <h2 style={{ margin: '0 0 0.75rem', color: 'var(--foreground)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
        {side.charAt(0).toUpperCase() + side.slice(1)} Sheet
      </h2>
      <p style={{ color: 'var(--foreground-muted)', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: 1.65 }}>
        Slides in from the <strong style={{ color: 'var(--foreground)' }}>{side}</strong> edge. Press <kbd style={{ fontSize: '0.75rem', background: 'color-mix(in oklch, var(--glass-border) 40%, transparent)', borderRadius: '0.25rem', padding: '1px 5px', fontFamily: 'inherit' }}>Esc</kbd> or click the backdrop to dismiss.
      </p>
      <button
        onClick={onClose}
        style={{
          padding: '0.5rem 1.25rem', borderRadius: '0.75rem', border: 'none',
          background: 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
          color: 'white', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
        }}
      >
        Close
      </button>
    </div>
  );
}

// ── Dynamic Height special demo ─────────────────────────────────────────────

const TASK_POOL = [
  'Review pull requests',
  'Update dependencies',
  'Write unit tests',
  'Deploy to staging',
  'Optimize bundle size',
  'Fix accessibility issues',
];

function DynamicHeightContent({ onClose }: { onClose: () => void }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design the landing page', done: false },
    { id: 2, text: 'Write documentation', done: false },
  ]);
  const nextId = useRef(3);

  const addTask = () => {
    if (tasks.length >= TASK_POOL.length) return;
    setTasks(prev => [...prev, { id: nextId.current++, text: TASK_POOL[prev.length], done: false }]);
  };
  const removeTask = (id: number) => setTasks(prev => prev.filter(t => t.id !== id));
  const toggleTask = (id: number) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div>
      <div style={pill} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>Today&apos;s Tasks</h2>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-atmos-purple)', background: 'color-mix(in oklch, var(--color-atmos-purple) 12%, transparent)', border: '1px solid color-mix(in oklch, var(--color-atmos-purple) 25%, transparent)', padding: '2px 8px', borderRadius: 9999, letterSpacing: '0.05em' }}>
          animateSize ✓
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1.25rem' }}>
        {tasks.map(task => (
          <div
            key={task.id}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.75rem',
              borderRadius: '0.75rem', border: '1px solid color-mix(in oklch, var(--glass-border) 35%, transparent)',
              background: 'color-mix(in oklch, var(--glass-surface) 60%, transparent)', transition: 'all 0.2s',
            }}
          >
            <button
              onClick={() => toggleTask(task.id)}
              style={{
                width: 20, height: 20, borderRadius: '0.375rem', border: '1.5px solid',
                borderColor: task.done ? 'var(--color-atmos-purple)' : 'color-mix(in oklch, var(--glass-border) 70%, transparent)',
                background: task.done ? 'var(--color-atmos-purple)' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s', color: 'white', fontSize: '0.7rem',
              }}
            >{task.done ? '✓' : ''}</button>
            <span style={{
              flex: 1, fontSize: '0.875rem',
              color: task.done ? 'var(--foreground-muted)' : 'var(--foreground)',
              textDecoration: task.done ? 'line-through' : 'none', transition: 'all 0.2s',
            }}>{task.text}</span>
            <button
              onClick={() => removeTask(task.id)}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px 6px', borderRadius: '0.375rem', fontSize: '0.75rem', color: 'var(--foreground-muted)', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in oklch, oklch(60% 0.22 20) 12%, transparent)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >✕</button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.625rem' }}>
        <button
          onClick={addTask}
          disabled={tasks.length >= TASK_POOL.length}
          style={{
            flex: 1, padding: '0.5625rem 1rem', borderRadius: '0.75rem', fontFamily: 'inherit',
            border: '1px dashed color-mix(in oklch, var(--glass-border) 60%, transparent)',
            background: 'transparent', cursor: tasks.length >= TASK_POOL.length ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground-muted)',
            opacity: tasks.length >= TASK_POOL.length ? 0.4 : 1, transition: 'all 0.2s',
          }}
        >+ Add Task</button>
        <button
          onClick={onClose}
          style={{ padding: '0.5625rem 1.25rem', borderRadius: '0.75rem', fontFamily: 'inherit', border: 'none', background: 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))', color: 'white', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
        >Done</button>
      </div>
    </div>
  );
}

// ── DocDemo export ──────────────────────────────────────────────────────────

export function DocDemo({
  edge = 'bottom',
  label,
  sheetStyle,
  backdropStyle,
  children,
}: DocDemoProps) {
  const ref = useRef<SheetRef>(null);
  const isDynamic = label?.toLowerCase().includes('dynamic') || label?.toLowerCase().includes('height');
  const defaultLabel = label ?? `Open ${edge.charAt(0).toUpperCase() + edge.slice(1)} Sheet`;

  return (
    <div style={{ margin: '1.25rem 0' }}>
      <button
        onClick={() => ref.current?.open()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 1.25rem', borderRadius: '0.625rem',
          border: '1px solid color-mix(in oklch, var(--glass-border) 60%, transparent)',
          background: 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
          color: '#fff', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
          fontFamily: 'inherit', boxShadow: '0 4px 12px -2px oklch(68% 0.22 290 / 0.3)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px -4px oklch(68% 0.22 290 / 0.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 12px -2px oklch(68% 0.22 290 / 0.3)'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.8 }}>
          <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
        </svg>
        {defaultLabel}
      </button>

      <Sheet
        ref={ref}
        edge={edge}
        animateSize={isDynamic}
        style={sheetStyle ? { ...buildSheetStyle(edge), ...sheetStyle } : buildSheetStyle(edge)}
        backdropStyle={backdropStyle}
      >
        {children !== undefined
          ? children
          : isDynamic
            ? <DynamicHeightContent onClose={() => ref.current?.close()} />
            : <DefaultContent side={edge} onClose={() => ref.current?.close()} />}
      </Sheet>
    </div>
  );
}
