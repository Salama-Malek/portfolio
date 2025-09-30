import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const variantStyles = {
  primary:
    'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 text-slate-50 shadow-lg shadow-indigo-500/20 hover:from-sky-400 hover:via-indigo-400 hover:to-purple-400 hover:shadow-indigo-500/30 focus-visible:outline-sky-400',
  secondary:
    'border border-slate-700/70 bg-slate-900/80 text-slate-100 shadow-lg shadow-slate-900/40 hover:border-slate-500 hover:bg-slate-800/80 hover:shadow-slate-900/50 focus-visible:outline-slate-400',
  ghost:
    'border border-transparent bg-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900/60 hover:text-slate-50 focus-visible:outline-slate-400',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const Button = React.forwardRef(
  (
    {
      asChild = false,
      variant = 'primary',
      size = 'md',
      className = '',
      children,
      href,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const styles = cn(
      baseStyles,
      variantStyles[variant] || variantStyles.primary,
      sizeStyles[size] || sizeStyles.md,
      className,
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(children.props.className, styles),
      });
    }

    if (href) {
      return (
        <a ref={ref} href={href} target={target} rel={rel} className={styles} {...props}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export const buttonClasses = ({ variant = 'primary', size = 'md', className = '' } = {}) =>
  cn(baseStyles, variantStyles[variant] || variantStyles.primary, sizeStyles[size] || sizeStyles.md, className);

export default Button;
