import { GlassCard } from '@/components/ui/GlassCard';

const features = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M3 9h6M3 15h6M15 3v18M15 9h6M15 15h6" />
      </svg>
    ),
    title: 'All 4 Edges',
    description:
      "Panels from top, bottom, left, or right. Just pass the `edge` prop and you're done.",
    color: 'var(--color-atmos-purple)',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    title: 'Dual API',
    description:
      'Controlled via `open` prop or imperative via `ref.current.open()` — pick what fits your code.',
    color: 'var(--color-atmos-blue)',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Zero Dependencies',
    description:
      '~4 kB gzipped. No lodash, no framer-motion, no emotion. Just React and your styles.',
    color: 'var(--color-atmos-indigo)',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M16.5 9.4L7.55 4.24a1 1 0 0 0-1.05 0L2 6.69v10.62l4.5 2.45a1 1 0 0 0 1.05 0L16.5 14.6" />
        <path d="M22 9.4l-4.5 2.45a1 1 0 0 1-1.05 0L12 9.4" />
        <path d="M22 9.4v5.2l-4.5 2.45" />
        <path d="M12 9.4v5.2l-4.5 2.45" />
      </svg>
    ),
    title: 'TypeScript First',
    description: 'Full types for props, refs, and side variants. Autocomplete and safety included.',
    color: 'var(--color-brand)',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="text-[var(--foreground-muted)]">
            Built for production, tuned for developer experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="flex flex-col gap-4 !p-5">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{
                  color: feature.color,
                  backgroundColor: `color-mix(in oklch, ${feature.color} 12%, transparent)`,
                }}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">{feature.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
