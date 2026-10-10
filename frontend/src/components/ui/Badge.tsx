import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
        {
          "border-transparent bg-gray-900 text-gray-50": variant === 'default',
          "border-transparent bg-gray-100 text-gray-900": variant === 'secondary',
          "border-transparent bg-red-100 text-red-800": variant === 'destructive',
          "border-transparent bg-green-100 text-green-800": variant === 'success',
          "text-gray-950": variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}
