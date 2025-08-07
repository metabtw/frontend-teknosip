import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline';
}

function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variant === 'default' && 'bg-primary text-primary-foreground border-transparent',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground border-transparent',
        variant === 'destructive' && 'bg-destructive text-destructive-foreground border-transparent',
        variant === 'success' && 'bg-green-100 text-green-800 border-transparent',
        variant === 'warning' && 'bg-yellow-100 text-yellow-800 border-transparent',
        variant === 'outline' && 'text-foreground',
        className
      )}
      {...props}
    />
  );
}

export { Badge };