import type { ReactNode } from 'react';
import { cn } from '../lib/motion';

type TypographyProps = {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  children: ReactNode;
};

export function Display({ as = 'h1', className, children }: TypographyProps) {
  const Comp = as;
  return <Comp className={cn('type-display', className)}>{children}</Comp>;
}

export function H1({ as = 'h1', className, children }: TypographyProps) {
  const Comp = as;
  return <Comp className={cn('type-h1', className)}>{children}</Comp>;
}

export function H2({ as = 'h2', className, children }: TypographyProps) {
  const Comp = as;
  return <Comp className={cn('type-h2', className)}>{children}</Comp>;
}

export function H3({ as = 'h3', className, children }: TypographyProps) {
  const Comp = as;
  return <Comp className={cn('type-h3', className)}>{children}</Comp>;
}

export function H4({ as = 'h4', className, children }: TypographyProps) {
  const Comp = as;
  return <Comp className={cn('type-h4', className)}>{children}</Comp>;
}

export function Body({ as = 'p', className, children }: TypographyProps) {
  const Comp = as;
  return <Comp className={cn('type-body', className)}>{children}</Comp>;
}

export function Caption({ as = 'span', className, children }: TypographyProps) {
  const Comp = as;
  return <Comp className={cn('type-caption', className)}>{children}</Comp>;
}
