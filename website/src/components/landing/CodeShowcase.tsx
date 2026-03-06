'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  label: string;
  lightHtml: string;
  darkHtml: string;
  code: string;
}

interface CodeShowcaseClientProps {
  tabs: Tab[];
}

export function CodeShowcaseClient({ tabs }: CodeShowcaseClientProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-1 mb-4 p-1 glass-card !rounded-lg !p-1 w-fit">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              'px-3 py-1.5 text-sm rounded-md transition-all duration-200 font-medium',
              active === i
                ? 'bg-[color-mix(in_oklch,var(--color-brand)_15%,transparent)] text-[var(--color-brand)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code panel */}
      <div className="relative rounded-xl overflow-hidden border border-[color-mix(in_oklch,var(--glass-border)_40%,transparent)] bg-[color-mix(in_oklch,var(--glass-surface)_70%,transparent)]">
        {/* Light theme */}
        <div
          data-theme="light"
          className="overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: tabs[active].lightHtml }}
        />
        {/* Dark theme */}
        <div
          data-theme="dark"
          className="overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: tabs[active].darkHtml }}
        />
      </div>
    </div>
  );
}
