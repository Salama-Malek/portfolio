import type { ReactNode } from 'react';
import { cn, usePrefersReducedMotion } from '../lib/motion';

type MotionSafeProps = {
  className?: string;
  children: ReactNode;
};

export function MotionSafe({ className, children }: MotionSafeProps) {
  const reducedMotion = usePrefersReducedMotion();
  return <div className={cn(className, reducedMotion && 'motion-reduced')}>{children}</div>;
}
