import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Card({
  as: Component = 'div',
  accent = true,
  className = '',
  children,
  padding = 'md',
  ...props
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10',
  };

  const baseStyles =
    'group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/80 shadow-xl shadow-indigo-500/10 transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-700 hover:shadow-indigo-500/20';

  return (
    <Component
      className={cn(baseStyles, paddingStyles[padding] || paddingStyles.md, className)}
      {...props}
    >
      {accent && (
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent opacity-70 transition duration-300 ease-out group-hover:via-sky-400"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 flex h-full flex-col gap-4 text-slate-200">{children}</div>
    </Component>
  );
}
