import type { HTMLAttributes, ReactNode } from 'react';
import { cn, usePrefersReducedMotion } from '../lib/motion';

type MotionSafeProps = {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function MotionSafe({ className, children, ...props }: MotionSafeProps) {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <div className={cn(className, reducedMotion && 'motion-reduced')} {...props}>
      {children}
    </div>
  );
}
