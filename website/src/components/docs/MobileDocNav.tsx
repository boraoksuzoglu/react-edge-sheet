'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNav } from '@/lib/nav';

export function MobileDocNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden sticky top-14 z-40 glass-nav">
      <div className="flex overflow-x-auto gap-1.5 px-4 py-2.5 scrollbar-hide">
        {docsNav.map((item) => {
          const href = `/docs/${item.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              className={
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ' +
                (active
                  ? 'bg-[var(--color-brand)] text-white shadow-sm'
                  : 'text-[var(--foreground-muted)] border border-[color-mix(in_oklch,var(--glass-border)_60%,transparent)] hover:text-[var(--foreground)] hover:border-[color-mix(in_oklch,var(--glass-border)_90%,transparent)]')
              }
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
