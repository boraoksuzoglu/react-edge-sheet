import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'brand' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-[color-mix(in_oklch,var(--glass-surface)_80%,transparent)] text-[var(--foreground)] border border-[color-mix(in_oklch,var(--glass-border)_50%,transparent)]':
            variant === 'default',
          'bg-[color-mix(in_oklch,var(--color-brand)_15%,transparent)] text-[var(--color-brand)] border border-[color-mix(in_oklch,var(--color-brand)_30%,transparent)]':
            variant === 'brand',
          'bg-[color-mix(in_oklch,var(--glass-surface)_50%,transparent)] text-[var(--foreground-muted)] border border-[color-mix(in_oklch,var(--glass-border)_30%,transparent)]':
            variant === 'muted',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
