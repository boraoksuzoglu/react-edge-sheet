'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';

// ── Shared helpers ─────────────────────────────────────────────────────────

const glassPanel = (extra?: React.CSSProperties): React.CSSProperties => ({
  backgroundColor: 'color-mix(in oklch, var(--glass-surface) 96%, transparent)',
  backdropFilter: 'blur(32px)',
  WebkitBackdropFilter: 'blur(32px)',
  border: '1px solid color-mix(in oklch, var(--glass-border) 60%, transparent)',
  boxShadow: '0 32px 80px -16px rgba(0,0,0,0.25)',
  borderRadius: '1.25rem',
  ...extra,
});

const btn = (accent = 'var(--color-atmos-purple)'): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1.25rem',
  borderRadius: '0.625rem',
  border: 'none',
  background: `linear-gradient(135deg, ${accent}, var(--color-atmos-blue))`,
  color: '#fff',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 600,
  fontFamily: 'inherit',
  transition: 'transform 0.15s, opacity 0.15s',
});

// ── Drag to Dismiss ────────────────────────────────────────────────────────

export function DragToDismissDemo() {
  const ref = useRef<SheetRef>(null);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          style={btn()}
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
        <span style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>
          Drag anywhere · handle is visual only
        </span>
      </div>

      <Sheet ref={ref} edge="bottom" showDragHandle style={glassPanel()}>
        <div style={{ padding: '1.25rem 1.5rem 1.75rem' }}>
          <div style={{ marginTop: '0.5rem' }}>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--foreground-muted)',
                marginBottom: '0.375rem',
              }}
            >
              Share
            </div>
            <h3
              style={{
                margin: '0 0 1rem',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--foreground)',
                letterSpacing: '-0.02em',
              }}
            >
              design-system-v2.fig
            </h3>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { icon: '🔗', label: 'Copy link' },
                { icon: '✉️', label: 'Email' },
                { icon: '💬', label: 'Message' },
                { icon: '⭐', label: 'Star' },
              ].map((a) => (
                <button
                  key={a.label}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.75rem 0.5rem',
                    borderRadius: '0.875rem',
                    border: '1px solid color-mix(in oklch, var(--glass-border) 35%, transparent)',
                    background: 'color-mix(in oklch, var(--glass-surface) 50%, transparent)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      'color-mix(in oklch, var(--glass-border) 20%, transparent)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      'color-mix(in oklch, var(--glass-surface) 50%, transparent)')
                  }
                  onClick={() => ref.current?.close()}
                >
                  <span style={{ fontSize: '1.25rem' }}>{a.icon}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--foreground-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {a.label}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {[
                { icon: '👁', label: 'View only', desc: 'Can view and comment' },
                { icon: '✏️', label: 'Can edit', desc: 'Full editing access' },
                { icon: '🗑', label: 'Remove access', desc: 'Revoke permissions' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => ref.current?.close()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.625rem 0.75rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      'color-mix(in oklch, var(--glass-border) 15%, transparent)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '0.625rem',
                      background: 'color-mix(in oklch, var(--glass-border) 20%, transparent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div
                      style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                      {item.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

// ── Snap Points ────────────────────────────────────────────────────────────

const MAP_ITEMS = [
  { emoji: '☕', name: 'Blue Bottle Coffee', dist: '120m', rating: '4.8', tag: 'Café' },
  { emoji: '🍜', name: 'Ichiran Ramen', dist: '280m', rating: '4.9', tag: 'Restaurant' },
  { emoji: '📚', name: 'City Bookshop', dist: '350m', rating: '4.7', tag: 'Shop' },
  { emoji: '🌿', name: 'Rooftop Garden', dist: '500m', rating: '4.6', tag: 'Park' },
  { emoji: '🎨', name: 'Modern Art Gallery', dist: '620m', rating: '4.5', tag: 'Culture' },
];

const SNAP_CONFIGS = [
  { label: 'Peek', size: '25vh' },
  { label: 'Half', size: '55vh' },
  { label: 'Full', size: '92vh' },
];

export function SnapPointsDemo() {
  const ref = useRef<SheetRef>(null);
  const [snapIdx, setSnapIdx] = useState(2);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          style={btn('var(--color-atmos-indigo)')}
          onClick={() => ref.current?.open()}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
          }}
        >
          Open map sheet
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>
          3 snap points · drag up/down to cycle
        </span>
      </div>

      <Sheet
        ref={ref}
        edge="bottom"
        showDragHandle
        snapPoints={SNAP_CONFIGS.map((s) => s.size)}
        defaultSnapPoint={2}
        onSnapChange={setSnapIdx}
        style={glassPanel({ overflow: 'hidden' })}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '92vh' }}>
          {/* top padding for the absolute handle */}
          <div style={{ height: '1.25rem', flexShrink: 0 }} />

          {/* Header — always visible */}
          <div style={{ padding: '1rem 1.5rem 0.75rem', flexShrink: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--foreground-muted)',
                    marginBottom: '0.125rem',
                  }}
                >
                  Nearby
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: 'var(--foreground)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {MAP_ITEMS.length} places found
                </h3>
              </div>
              {/* Snap indicator pills */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {SNAP_CONFIGS.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: 9999,
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      background:
                        snapIdx === i
                          ? 'var(--color-atmos-indigo)'
                          : 'color-mix(in oklch, var(--glass-border) 20%, transparent)',
                      color: snapIdx === i ? 'white' : 'var(--foreground-muted)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Category filters */}
            <div
              style={{
                display: 'flex',
                gap: '0.375rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem',
              }}
            >
              {['All', 'Café', 'Restaurant', 'Shop', 'Park', 'Culture'].map((cat, i) => (
                <div
                  key={cat}
                  style={{
                    flexShrink: 0,
                    padding: '0.3rem 0.75rem',
                    borderRadius: 9999,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background:
                      i === 0
                        ? 'var(--color-atmos-indigo)'
                        : 'color-mix(in oklch, var(--glass-border) 15%, transparent)',
                    color: i === 0 ? 'white' : 'var(--foreground-muted)',
                    border: '1px solid color-mix(in oklch, var(--glass-border) 30%, transparent)',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Scrollable list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem 1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {MAP_ITEMS.map((item, i) => (
                <div
                  key={item.name}
                  onClick={() => ref.current?.close()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.875rem',
                    borderRadius: '1rem',
                    border: '1px solid color-mix(in oklch, var(--glass-border) 25%, transparent)',
                    background:
                      i === 0
                        ? 'color-mix(in oklch, var(--color-atmos-indigo) 8%, transparent)'
                        : 'color-mix(in oklch, var(--glass-surface) 60%, transparent)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    borderColor:
                      i === 0
                        ? 'color-mix(in oklch, var(--color-atmos-indigo) 30%, transparent)'
                        : undefined,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      'color-mix(in oklch, var(--glass-border) 20%, transparent)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      i === 0
                        ? 'color-mix(in oklch, var(--color-atmos-indigo) 8%, transparent)'
                        : 'color-mix(in oklch, var(--glass-surface) 60%, transparent)')
                  }
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '0.75rem',
                      background: 'color-mix(in oklch, var(--glass-border) 25%, transparent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.375rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--foreground)',
                        marginBottom: '0.125rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--foreground-muted)' }}>
                        {item.dist}
                      </span>
                      <span
                        style={{
                          width: 2,
                          height: 2,
                          borderRadius: '50%',
                          background: 'var(--foreground-muted)',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--color-atmos-indigo)',
                          fontWeight: 600,
                        }}
                      >
                        ★ {item.rating}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 9999,
                      background: 'color-mix(in oklch, var(--glass-border) 20%, transparent)',
                      color: 'var(--foreground-muted)',
                      flexShrink: 0,
                    }}
                  >
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

// ── Sidebar Drag ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: '⬡', label: 'Overview', active: true },
  { icon: '◈', label: 'Projects', badge: '4' },
  { icon: '◎', label: 'Analytics' },
  { icon: '◇', label: 'Team' },
  { icon: '○', label: 'Settings' },
];

export function SidebarDragDemo() {
  const ref = useRef<SheetRef>(null);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <button
        style={btn('var(--color-atmos-blue)')}
        onClick={() => ref.current?.open()}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
        }}
      >
        Open sidebar
      </button>

      <Sheet
        ref={ref}
        edge="right"
        draggable
        maxWidth="280px"
        style={{
          backgroundColor: 'color-mix(in oklch, var(--glass-surface) 96%, transparent)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid color-mix(in oklch, var(--glass-border) 60%, transparent)',
          boxShadow: '-24px 0 80px rgba(0,0,0,0.2)',
          borderRadius: '1.25rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          {/* User */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.75rem',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '0.75rem',
                background:
                  'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.9rem',
                flexShrink: 0,
              }}
            >
              B
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>
                Bora
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--foreground-muted)' }}>Pro plan</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            <div
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--foreground-muted)',
                marginBottom: '0.5rem',
                paddingLeft: '0.625rem',
              }}
            >
              Workspace
            </div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => ref.current?.close()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5625rem 0.75rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  background: item.active
                    ? 'color-mix(in oklch, var(--color-atmos-purple) 12%, transparent)'
                    : 'transparent',
                  color: item.active ? 'var(--color-atmos-purple)' : 'var(--foreground-muted)',
                }}
                onMouseEnter={(e) => {
                  if (!item.active)
                    e.currentTarget.style.background =
                      'color-mix(in oklch, var(--glass-border) 18%, transparent)';
                }}
                onMouseLeave={(e) => {
                  if (!item.active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>
                  {item.icon}
                </span>
                <span
                  style={{ flex: 1, fontSize: '0.875rem', fontWeight: item.active ? 600 : 400 }}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      background: 'var(--color-atmos-purple)',
                      color: 'white',
                      padding: '0.125rem 0.375rem',
                      borderRadius: 9999,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Hint */}
          <div
            style={{
              paddingTop: '1rem',
              borderTop: '1px solid color-mix(in oklch, var(--glass-border) 25%, transparent)',
              fontSize: '0.72rem',
              color: 'var(--foreground-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <span>→</span> Drag right to close
          </div>
        </div>
      </Sheet>
    </div>
  );
}

// ── Music Player Snap ──────────────────────────────────────────────────────

const TRACKS = [
  { title: 'Neon Reverie', artist: 'Synthwave Artist', duration: '3:42' },
  { title: 'Chrome Dreams', artist: 'Synthwave Artist', duration: '4:11' },
  { title: 'Electric Sunset', artist: 'Synthwave Artist', duration: '3:28' },
  { title: 'Midnight Drive', artist: 'Synthwave Artist', duration: '5:03' },
];

function ProgressBar({ playing }: { playing: boolean }) {
  const [progress, setProgress] = useState(32);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.3));
    }, 100);
    return () => clearInterval(id);
  }, [playing]);

  const mins = Math.floor((progress / 100) * 222);
  const secs = mins % 60;
  const totalMins = Math.floor(222 / 60);
  const totalSecs = 222 % 60;
  const fmt = (m: number, s: number) => `${m}:${String(s).padStart(2, '0')}`;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          position: 'relative',
          height: 3,
          borderRadius: 9999,
          background: 'rgba(255,255,255,0.15)',
          marginBottom: '0.5rem',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #ff6b6b, #ffa07a)',
            borderRadius: 9999,
            transition: 'width 0.1s linear',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${progress}%`,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'white',
            transform: 'translate(-50%,-50%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.68rem',
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        <span>{fmt(Math.floor(mins / 60), secs)}</span>
        <span>{fmt(totalMins, totalSecs)}</span>
      </div>
    </div>
  );
}

export function MusicPlayerDemo() {
  const ref = useRef<SheetRef>(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [snapIdx, setSnapIdx] = useState(0);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          style={{
            ...btn('oklch(45% 0.18 290)'),
            background: 'linear-gradient(135deg, #1a1520, #0d0d20)',
          }}
          onClick={() => {
            setPlaying(false);
            ref.current?.open();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          ▶ Open player
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>
          2 snap heights · mini and full screen
        </span>
      </div>

      <Sheet
        ref={ref}
        edge="bottom"
        showDragHandle
        snapPoints={['96px', '100vh']}
        defaultSnapPoint={0}
        onSnapChange={(i) => {
          setSnapIdx(i);
        }}
        style={{
          background: 'linear-gradient(180deg, #1a1229 0%, #0d0d1a 60%, #080810 100%)',
          borderRadius: '1.5rem 1.5rem 0 0',
          overflow: 'hidden',
          boxShadow: '0 -8px 60px rgba(120,60,200,0.25), 0 -1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Content — always full height, sheet clips to snap height */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* top padding for the absolute handle */}
          <div style={{ height: '1rem', flexShrink: 0 }} />

          {/* Mini strip — visible at 96px snap */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              padding: '0.625rem 1.25rem',
              flexShrink: 0,
              cursor: 'pointer',
            }}
            onClick={() => {
              if (snapIdx === 0) ref.current?.open();
            }}
          >
            {/* Tiny album art */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: '0.625rem',
                background: 'linear-gradient(135deg, #7c3aed, #db2777, #f97316)',
                flexShrink: 0,
                boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'white',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {TRACKS[track].title}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.45)',
                  marginTop: '0.125rem',
                }}
              >
                {TRACKS[track].artist}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlaying((p) => !p);
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: 'white',
                color: '#1a1229',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontFamily: 'inherit',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {playing ? '⏸' : '▶'}
            </button>
          </div>

          {/* Full player — revealed as sheet expands */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem 1.5rem 1.5rem',
              overflow: 'hidden',
            }}
          >
            {/* Big album art */}
            <div
              style={{
                flex: '0 0 auto',
                aspectRatio: '1',
                maxWidth: '220px',
                width: '100%',
                margin: '0 auto 1.5rem',
                borderRadius: '1.25rem',
                background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f97316 100%)',
                boxShadow: '0 24px 60px rgba(124,58,237,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  height: '1px',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  right: '1rem',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                }}
              />
            </div>

            {/* Track info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.25rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    color: 'white',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {TRACKS[track].title}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.45)',
                    marginTop: '0.125rem',
                  }}
                >
                  {TRACKS[track].artist}
                </div>
              </div>
              <button
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                ♡
              </button>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: '1.25rem' }}>
              <ProgressBar playing={playing} />
            </div>

            {/* Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <button
                onClick={() => setTrack((t) => (t === 0 ? TRACKS.length - 1 : t - 1))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                ⏮
              </button>

              <button
                onClick={() => setPlaying((p) => !p)}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'white',
                  color: '#1a1229',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {playing ? '⏸' : '▶'}
              </button>

              <button
                onClick={() => setTrack((t) => (t + 1) % TRACKS.length)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                ⏭
              </button>
            </div>

            {/* Playlist */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: '0.75rem',
                }}
              >
                Up next
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {TRACKS.map((t, i) => (
                  <button
                    key={t.title}
                    onClick={() => setTrack(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      background: i === track ? 'rgba(255,255,255,0.08)' : 'transparent',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (i !== track) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (i !== track) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '0.5rem',
                        background: `hsl(${260 + i * 30}, 60%, 45%)`,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        color: 'white',
                        fontWeight: 700,
                      }}
                    >
                      {i === track && playing ? '▶' : i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: i === track ? 600 : 400,
                          color: i === track ? 'white' : 'rgba(255,255,255,0.6)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {t.title}
                      </div>
                    </div>
                    <span
                      style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}
                    >
                      {t.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
