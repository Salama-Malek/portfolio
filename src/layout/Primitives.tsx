import type { ReactNode } from 'react';
import { cn } from '../lib/motion';

type BasicProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Container({ className, children }: BasicProps) {
  return <div className={cn('container', className)}>{children}</div>;
}

export function Section({ id, className, children }: BasicProps) {
  return (
    <section id={id} className={cn('section', className)}>
      {children}
    </section>
  );
}

export function Grid({ className, children }: BasicProps) {
  return <div className={cn('grid', className)}>{children}</div>;
}
