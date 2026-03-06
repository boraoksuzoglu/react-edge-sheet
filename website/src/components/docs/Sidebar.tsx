'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNav } from '@/lib/nav';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-8 pr-4 hidden md:block">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-3 px-3">
        Documentation
      </p>
      <nav className="flex flex-col gap-0.5">
        {docsNav.map((item) => {
          const href = `/docs/${item.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              className={cn(
                'px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-[color-mix(in_oklch,var(--color-brand)_12%,transparent)] text-[var(--color-brand)] font-medium'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[color-mix(in_oklch,var(--glass-surface)_60%,transparent)]'
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
