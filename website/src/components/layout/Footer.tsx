import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[color-mix(in_oklch,var(--glass-border)_30%,transparent)] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--foreground-muted)]">
          © {new Date().getFullYear()} react-edge-sheet. MIT License.
        </p>
        <div className="flex items-center gap-6 text-sm text-[var(--foreground-muted)]">
          <a
            href="https://github.com/boraoksuzoglu/react-edge-sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/react-edge-sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            npm
          </a>
          <a href="/llms.txt" className="hover:text-[var(--foreground)] transition-colors">
            llms.txt
          </a>
          <Link
            href="/docs/getting-started"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
