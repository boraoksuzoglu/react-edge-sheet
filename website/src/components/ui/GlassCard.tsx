import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  heavy?: boolean;
}

export function GlassCard({ children, className, heavy }: GlassCardProps) {
  return (
    <div className={cn(heavy ? 'glass-heavy' : 'glass-card', 'p-6', className)}>
      {children}
    </div>
  );
}
