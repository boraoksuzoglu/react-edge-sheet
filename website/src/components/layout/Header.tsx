'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/docs/getting-started', label: 'Docs' },
  { href: '/docs/api', label: 'API' },
  { href: '/docs/examples', label: 'Examples' },
  { href: '/playground', label: 'Playground' },
  { href: 'https://github.com/boraoksuzoglu/react-edge-sheet', label: 'GitHub', external: true },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-[var(--foreground)] hover:text-[var(--color-brand)] transition-colors"
        >
          <div className="h-7 w-7 rounded-lg bg-[var(--color-brand)] flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span>react-edge-sheet</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm transition-colors',
                pathname?.startsWith(link.href) && !link.external
                  ? 'text-[var(--color-brand)] bg-[color-mix(in_oklch,var(--color-brand)_10%,transparent)]'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[color-mix(in_oklch,var(--glass-surface)_60%,transparent)]'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="h-9 w-9 flex items-center justify-center rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[color-mix(in_oklch,var(--glass-surface)_60%,transparent)]"
          >
            {mobileOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[color-mix(in_oklch,var(--glass-border)_30%,transparent)] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'px-3 py-2 rounded-md text-sm transition-colors',
                pathname?.startsWith(link.href) && !link.external
                  ? 'text-[var(--color-brand)] bg-[color-mix(in_oklch,var(--color-brand)_10%,transparent)]'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
