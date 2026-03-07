const stats = [
  { value: '~9KB', label: 'Bundle size (minified)' },
  { value: '0', label: 'Runtime dependencies' },
  { value: 'React 17+', label: 'Peer compatibility' },
  { value: 'SSR Safe', label: 'Next.js & Remix ready' },
];

export function Stats() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <p className="text-sm text-[var(--foreground-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
