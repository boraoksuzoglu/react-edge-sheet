'use client';

import { pill, label, heading } from '../styles';

const queueItems = [
  { title: 'Midnight Cascade', artist: 'Atmos Collective', playing: true },
  { title: 'Urban Pulse', artist: 'Neo Beats', playing: false },
  { title: 'Soft Rain', artist: 'Lo-fi Drift', playing: false },
];

export function PlayerQueueContent({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
      <div style={pill} />
      <div style={label}>Queue</div>
      <div style={{ ...heading, marginBottom: '1rem' }}>Up next</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {queueItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid color-mix(in oklch, var(--glass-border) 40%, transparent)',
              background: item.playing
                ? 'color-mix(in oklch, var(--color-atmos-purple) 12%, transparent)'
                : 'color-mix(in oklch, var(--glass-surface) 55%, transparent)',
            }}
          >
            <span style={{ fontSize: '1rem', opacity: item.playing ? 1 : 0.5 }}>
              {item.playing ? '▶' : '♫'}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                {item.artist}
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>{i + 1}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        style={{
          width: '100%',
          marginTop: '1rem',
          padding: '0.625rem 1rem',
          borderRadius: '0.75rem',
          border: 'none',
          background: 'color-mix(in oklch, var(--glass-border) 40%, transparent)',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--foreground-muted)',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Close
      </button>
    </div>
  );
}
