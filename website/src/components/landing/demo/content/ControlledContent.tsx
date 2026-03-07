'use client';

import { pill, label, heading } from '../styles';

interface ControlledContentProps {
  onClose: () => void;
}

export function ControlledContent({ onClose }: ControlledContentProps) {
  return (
    <>
      <div style={pill} />
      <div style={label}>Controlled mode</div>
      <div style={heading}>State owned externally</div>
      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--foreground-muted)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Pass{' '}
        <code
          style={{
            color: 'var(--color-atmos-indigo)',
            background: 'color-mix(in oklch, var(--glass-overlay) 90%, transparent)',
            padding: '1px 6px',
            borderRadius: '0.25rem',
            fontSize: '0.8125rem',
          }}
        >
          open
        </code>{' '}
        +{' '}
        <code
          style={{
            color: 'var(--color-atmos-indigo)',
            background: 'color-mix(in oklch, var(--glass-overlay) 90%, transparent)',
            padding: '1px 6px',
            borderRadius: '0.25rem',
            fontSize: '0.8125rem',
          }}
        >
          onOpenChange
        </code>{' '}
        to let your parent component own the open state. No ref needed.
      </p>
      <button
        onClick={onClose}
        style={{
          padding: '0.5rem 1.25rem',
          borderRadius: '0.75rem',
          border: 'none',
          background: 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
          color: 'white',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Close
      </button>
    </>
  );
}
