import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { cn, usePrefersReducedMotion } from '../lib/motion';

type ButtonProps = {
  href?: string;
  className?: string;
  variant?: 'primary' | 'ghost' | 'gradient' | 'magnetic';
  children: ReactNode;
};

export function Button({ href, className, variant = 'primary', children }: ButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (variant !== 'magnetic' || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      className={cn('btn', `btn-${variant}`, className)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </a>
  );
}
