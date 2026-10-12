import type React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'navy' | 'green' | 'red' | 'blue' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'navy',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    gold: 'bg-amber-50 text-amber-800 border-amber-300',
    navy: 'bg-[#0a192f]/10 text-[#0a192f] border-[#0a192f]/20',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    red: 'bg-rose-50 text-rose-800 border-rose-300',
    blue: 'bg-sky-50 text-sky-800 border-sky-300',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border tracking-wide uppercase ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
