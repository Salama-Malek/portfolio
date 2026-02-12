import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/motion';

type BaseProps = {
  className?: string;
  children: ReactNode;
};

type SectionProps = BaseProps & HTMLAttributes<HTMLElement>;
type DivProps = BaseProps & HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: DivProps) {
  return (
    <div className={cn('container', className)} {...props}>
      {children}
    </div>
  );
}

export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section id={id} className={cn('section', className)} {...props}>
      {children}
    </section>
  );
}

export function Grid({ className, children, ...props }: DivProps) {
  return (
    <div className={cn('grid', className)} {...props}>
      {children}
    </div>
  );
}
