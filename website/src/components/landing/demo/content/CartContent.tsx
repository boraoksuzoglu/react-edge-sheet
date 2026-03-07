'use client';

import { pill, label, heading, Divider } from '../styles';

const cartItems = [
  { name: 'Wireless Earbuds Pro', qty: 1, price: 79, color: 'oklch(65% 0.15 290)' },
  { name: 'USB-C Fast Cable 2m', qty: 2, price: 12, color: 'oklch(55% 0.12 250)' },
];

export function CartContent({ onClose }: { onClose: () => void }) {
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  return (
    <div style={{ padding: '1.5rem 1.75rem', minWidth: 0, maxWidth: '100%' }}>
      <div style={pill} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div style={label}>Shopping Cart</div>
          <div style={heading}>{cartItems.length} items</div>
        </div>
        <button
          onClick={onClose}
          style={{
            border: 'none',
            background: 'color-mix(in oklch, var(--glass-border) 40%, transparent)',
            borderRadius: '0.5rem',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '0.875rem',
            color: 'var(--foreground-muted)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              'color-mix(in oklch, var(--glass-border) 60%, transparent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              'color-mix(in oklch, var(--glass-border) 40%, transparent)';
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}
      >
        {cartItems.map((item) => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem',
              borderRadius: '1rem',
              background: 'color-mix(in oklch, var(--glass-surface) 55%, transparent)',
              border: '1px solid color-mix(in oklch, var(--glass-border) 40%, transparent)',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '0.75rem',
                background: `linear-gradient(135deg, ${item.color}, color-mix(in oklch, ${item.color} 70%, black))`,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  marginBottom: '0.25rem',
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--foreground-muted)',
                }}
              >
                ×{item.qty} · ${item.price} each
              </div>
            </div>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--foreground)',
                letterSpacing: '-0.02em',
              }}
            >
              ${item.price * item.qty}
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--foreground)' }}>
          Subtotal
        </span>
        <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--foreground)' }}>
          ${total}
        </span>
      </div>
      <button
        onClick={onClose}
        style={{
          width: '100%',
          padding: '0.875rem 1.25rem',
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
        Proceed to Checkout
      </button>
    </div>
  );
}
