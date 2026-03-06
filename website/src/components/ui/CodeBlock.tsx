import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  html: string;
  code: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ html, code, filename, className }: CodeBlockProps) {
  return (
    <div className={`relative rounded-xl overflow-hidden border border-[color-mix(in_oklch,var(--glass-border)_40%,transparent)] bg-[color-mix(in_oklch,var(--glass-surface)_70%,transparent)] ${className ?? ''}`}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[color-mix(in_oklch,var(--glass-border)_30%,transparent)]">
          <span className="text-xs font-mono text-[var(--foreground-muted)]">{filename}</span>
          <CopyButton text={code} />
        </div>
      )}
      {!filename && (
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={code} />
        </div>
      )}
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
