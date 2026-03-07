import Link from 'next/link';
import { CopyButton } from '@/components/ui/CopyButton';
import { Badge } from '@/components/ui/Badge';

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6 animate-[fade-in_0.5s_ease-out_both]">
          <Badge variant="brand">v0.1.0 — Now Available</Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-6 animate-[slide-up_0.6s_cubic-bezier(0.4,0,0.2,1)_0.1s_both]">
          Slide in from{' '}
          <span
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            any edge
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-10 animate-[slide-up_0.6s_cubic-bezier(0.4,0,0.2,1)_0.2s_both]">
          A lightweight, TypeScript-first React component library for sliding sheet panels from top,
          bottom, left, or right. Zero dependencies. ~4 kB gzipped. Dual controlled + imperative
          APIs.
        </p>

        {/* Install command */}
        <div className="flex justify-center mb-12 animate-[slide-up_0.6s_cubic-bezier(0.4,0,0.2,1)_0.3s_both]">
          <div className="glass-card flex items-center gap-3 px-5 py-3 !rounded-full">
            <span className="text-[var(--foreground-muted)] text-sm select-none">$</span>
            <code className="font-mono text-sm text-[var(--foreground)]">
              npm install react-edge-sheet
            </code>
            <CopyButton text="npm install react-edge-sheet" />
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-[slide-up_0.6s_cubic-bezier(0.4,0,0.2,1)_0.35s_both]">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
            }}
          >
            Get Started
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="https://github.com/boraoksuzoglu/react-edge-sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-[var(--foreground)] glass-card hover:scale-105 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Phone frame mockup */}
        <div className="flex justify-center animate-[fade-in_0.8s_ease-out_0.45s_both]">
          <div
            style={{
              position: 'relative',
              width: '260px',
              height: '420px',
              borderRadius: '2.5rem',
              border: '2px solid color-mix(in oklch, var(--glass-border) 80%, transparent)',
              background: 'color-mix(in oklch, var(--glass-surface) 40%, transparent)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow:
                '0 32px 80px -16px oklch(0% 0 0 / 0.18), 0 0 0 1px color-mix(in oklch, var(--glass-border) 40%, transparent)',
              overflow: 'hidden',
            }}
          >
            {/* Phone notch */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '72px',
                height: '8px',
                borderRadius: '9999px',
                background: 'color-mix(in oklch, var(--glass-border) 60%, transparent)',
                zIndex: 10,
              }}
            />

            {/* App UI placeholder rows */}
            <div
              style={{
                padding: '2.5rem 1.25rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {/* Header bar */}
              <div
                style={{
                  height: '10px',
                  borderRadius: '9999px',
                  width: '55%',
                  background: 'color-mix(in oklch, var(--foreground) 20%, transparent)',
                }}
              />
              {/* Content rows */}
              {[100, 80, 90, 65, 85].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: '8px',
                    borderRadius: '9999px',
                    width: `${w}%`,
                    background: 'color-mix(in oklch, var(--foreground) 10%, transparent)',
                  }}
                />
              ))}
              {/* Card placeholder */}
              <div
                style={{
                  marginTop: '0.5rem',
                  height: '64px',
                  borderRadius: '0.75rem',
                  background: 'color-mix(in oklch, var(--glass-border) 30%, transparent)',
                  border: '1px solid color-mix(in oklch, var(--glass-border) 40%, transparent)',
                }}
              />
              {[70, 50].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: '8px',
                    borderRadius: '9999px',
                    width: `${w}%`,
                    background: 'color-mix(in oklch, var(--foreground) 10%, transparent)',
                  }}
                />
              ))}
            </div>

            {/* Glass bottom sheet — theme-aware for light/dark visibility */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '52%',
                borderRadius: '1.5rem 1.5rem 0 0',
                background: 'var(--hero-sheet-bg)',
                borderTop: '1px solid var(--hero-sheet-border-top)',
                borderLeft: '1px solid var(--hero-sheet-border-side)',
                borderRight: '1px solid var(--hero-sheet-border-side)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                padding: '1rem 1.25rem',
                animation: 'panel-bottom 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both',
                boxShadow: '0 -8px 32px -8px oklch(0% 0 0 / 0.2)',
              }}
            >
              {/* Drag handle */}
              <div
                style={{
                  width: '32px',
                  height: '4px',
                  borderRadius: '9999px',
                  background: 'var(--hero-sheet-handle)',
                  margin: '0 auto 1rem',
                }}
              />
              {/* Sheet content rows */}
              <div
                style={{
                  height: '9px',
                  borderRadius: '9999px',
                  width: '60%',
                  background: 'var(--hero-sheet-row-1)',
                  marginBottom: '0.75rem',
                }}
              />
              <div
                style={{
                  height: '7px',
                  borderRadius: '9999px',
                  width: '85%',
                  background: 'var(--hero-sheet-row-2)',
                  marginBottom: '0.5rem',
                }}
              />
              <div
                style={{
                  height: '7px',
                  borderRadius: '9999px',
                  width: '70%',
                  background: 'var(--hero-sheet-row-2)',
                  marginBottom: '1rem',
                }}
              />
              {/* Action button */}
              <div
                style={{
                  height: '32px',
                  borderRadius: '0.5rem',
                  width: '100%',
                  background: 'var(--hero-sheet-btn-bg)',
                  border: '1px solid var(--hero-sheet-btn-border)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
