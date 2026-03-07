'use client';

import { useRef, useState } from 'react';
import { pill, label, heading } from '../styles';

const NOTE_PLACEHOLDERS = [
  'Remember to call back',
  'Buy groceries',
  'Follow up on email',
  'Review design mockups',
  'Schedule dentist',
];

export function DynamicNotesContent({ onClose }: { onClose: () => void }) {
  const [notes, setNotes] = useState<string[]>(['Welcome! Add notes below.']);
  const nextIdx = useRef(0);

  const addNote = () => {
    if (notes.length >= 6) return;
    const text = NOTE_PLACEHOLDERS[nextIdx.current % NOTE_PLACEHOLDERS.length];
    nextIdx.current += 1;
    setNotes((prev) => [...prev, text]);
  };

  const removeNote = (idx: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== idx));
  };

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
      <div style={{ ...heading, marginBottom: '1rem' }}>Quick Notes</div>
      <p
        style={{
          fontSize: '0.8125rem',
          color: 'var(--foreground-muted)',
          marginBottom: '1rem',
          lineHeight: 1.5,
        }}
      >
        Each note adds height. Remove to shrink.
      </p>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}
      >
        {notes.map((note, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid color-mix(in oklch, var(--glass-border) 40%, transparent)',
              background: 'color-mix(in oklch, var(--glass-surface) 55%, transparent)',
            }}
          >
            <span style={{ fontSize: '1rem', opacity: 0.5 }}>✎</span>
            <span
              style={{
                flex: 1,
                fontSize: '0.875rem',
                color: 'var(--foreground)',
              }}
            >
              {note}
            </span>
            <button
              onClick={() => removeNote(i)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                color: 'var(--foreground-muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  'color-mix(in oklch, oklch(60% 0.22 20) 12%, transparent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={addNote}
          disabled={notes.length >= 6}
          style={{
            flex: 1,
            padding: '0.625rem 1rem',
            borderRadius: '0.75rem',
            border: '1px dashed color-mix(in oklch, var(--glass-border) 60%, transparent)',
            background: 'transparent',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--foreground-muted)',
            cursor: notes.length >= 6 ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            opacity: notes.length >= 6 ? 0.5 : 1,
          }}
        >
          + Add note
        </button>
        <button
          onClick={onClose}
          style={{
            padding: '0.625rem 1.25rem',
            borderRadius: '0.75rem',
            border: 'none',
            background:
              'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
