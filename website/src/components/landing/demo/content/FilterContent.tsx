'use client';

import { useState } from 'react';
import { pill, label, heading } from '../styles';

const filterGroups = [
  { id: 'rating', label: 'Rating', icon: '★', options: ['4+ Stars', '3+ Stars', 'Any'] },
  { id: 'price', label: 'Price', icon: '$', options: ['Under $10', '$10–$50', '$50+'] },
  { id: 'delivery', label: 'Delivery', icon: '◷', options: ['Today', 'This week', 'Any'] },
];

export function FilterContent({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<Record<string, string>>({
    rating: '4+ Stars',
    price: '$10–$50',
    delivery: 'Any',
  });

  return (
    <div style={{ padding: '1.5rem 1.75rem 1.75rem', minWidth: 0, maxWidth: '100%' }}>
      <div style={pill} />
      <div style={label}>Refine</div>
      <div style={{ ...heading, marginBottom: '1.5rem' }}>Filter results</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filterGroups.map((f) => (
          <div key={f.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '0.5rem',
                  background: 'color-mix(in oklch, var(--color-atmos-purple) 15%, transparent)',
                  color: 'var(--color-atmos-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                }}
              >
                {f.icon}
              </span>
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--foreground-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                {f.label}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {f.options.map((opt) => {
                const isActive = selected[f.id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSelected((s) => ({ ...s, [f.id]: opt }))}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.75rem',
                      border: `1px solid ${isActive ? 'color-mix(in oklch, var(--color-atmos-purple) 50%, transparent)' : 'color-mix(in oklch, var(--glass-border) 50%, transparent)'}`,
                      background: isActive
                        ? 'color-mix(in oklch, var(--color-atmos-purple) 12%, transparent)'
                        : 'color-mix(in oklch, var(--glass-surface) 60%, transparent)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: isActive ? 'var(--color-atmos-purple)' : 'var(--foreground)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        style={{
          width: '100%',
          marginTop: '1.25rem',
          padding: '0.75rem 1.25rem',
          borderRadius: '0.875rem',
          border: 'none',
          background: 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
          color: 'white',
          fontWeight: 600,
          fontSize: '0.9375rem',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: '0 4px 16px -4px oklch(68% 0.22 290 / 0.4)',
        }}
      >
        Apply filters
      </button>
    </div>
  );
}
