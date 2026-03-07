'use client';

import { useRef, useState } from 'react';
import { pill, label, heading } from '../styles';

const TASK_POOL = [
  'Review pull requests',
  'Update dependencies',
  'Write unit tests',
  'Deploy to staging',
  'Team standup call',
  'Fix accessibility issues',
  'Optimize bundle size',
];

export function DynamicContent({ onClose }: { onClose: () => void }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design the landing page', done: false },
    { id: 2, text: 'Write documentation', done: false },
  ]);
  const nextId = useRef(3);

  const addTask = () => {
    if (tasks.length >= TASK_POOL.length) return;
    setTasks((prev) => [
      ...prev,
      { id: nextId.current++, text: TASK_POOL[prev.length], done: false },
    ]);
  };
  const removeTask = (id: number) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const toggleTask = (id: number) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <div style={{ padding: '1.5rem 1.75rem 1.75rem', minWidth: 0, maxWidth: '100%' }}>
      <div style={pill} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.25rem',
        }}
      >
        <div style={label}>Dynamic Height</div>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--color-atmos-purple)',
            background: 'color-mix(in oklch, var(--color-atmos-purple) 12%, transparent)',
            border: '1px solid color-mix(in oklch, var(--color-atmos-purple) 25%, transparent)',
            padding: '2px 8px',
            borderRadius: 9999,
          }}
        >
          animateSize ✓
        </span>
      </div>
      <div style={{ ...heading, marginBottom: '0.5rem' }}>Today&apos;s Tasks</div>
      <p
        style={{
          fontSize: '0.8125rem',
          color: 'var(--foreground-muted)',
          marginBottom: '1rem',
          lineHeight: 1.5,
        }}
      >
        Add or remove tasks. The sheet animates to fit.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
          marginBottom: '1.25rem',
          minHeight: 0,
        }}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 0.75rem',
              borderRadius: '0.75rem',
              border: '1px solid color-mix(in oklch, var(--glass-border) 35%, transparent)',
              background: 'color-mix(in oklch, var(--glass-surface) 60%, transparent)',
              transition: 'all 0.2s',
            }}
          >
            <button
              onClick={() => toggleTask(task.id)}
              style={{
                width: 20,
                height: 20,
                borderRadius: '0.375rem',
                border: '1.5px solid',
                borderColor: task.done
                  ? 'var(--color-atmos-purple)'
                  : 'color-mix(in oklch, var(--glass-border) 70%, transparent)',
                background: task.done ? 'var(--color-atmos-purple)' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
                color: 'white',
                fontSize: '0.7rem',
              }}
            >
              {task.done ? '✓' : ''}
            </button>
            <span
              style={{
                flex: 1,
                fontSize: '0.875rem',
                color: task.done ? 'var(--foreground-muted)' : 'var(--foreground)',
                textDecoration: task.done ? 'line-through' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                color: 'var(--foreground-muted)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  'color-mix(in oklch, oklch(60% 0.22 20) 12%, transparent)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.625rem' }}>
        <button
          onClick={addTask}
          disabled={tasks.length >= TASK_POOL.length}
          style={{
            flex: 1,
            padding: '0.5625rem 1rem',
            borderRadius: '0.75rem',
            fontFamily: 'inherit',
            border: '1px dashed color-mix(in oklch, var(--glass-border) 60%, transparent)',
            background: 'transparent',
            cursor: tasks.length >= TASK_POOL.length ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--foreground-muted)',
            opacity: tasks.length >= TASK_POOL.length ? 0.4 : 1,
            transition: 'all 0.2s',
          }}
        >
          + Add Task
        </button>
        <button
          onClick={onClose}
          style={{
            padding: '0.5625rem 1.25rem',
            borderRadius: '0.75rem',
            fontFamily: 'inherit',
            border: 'none',
            background:
              'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
