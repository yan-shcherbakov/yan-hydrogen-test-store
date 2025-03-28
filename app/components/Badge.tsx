import {ReactNode} from 'react';

type BadgeProps = {
  className?: string;
  children: ReactNode;
};

export function Badge({children, className = ''}: BadgeProps) {
  return (
    <div
      className={`px-2 py-1 border border-red-500 rounded-[25px] text-sm font-bold text-red-500 ${className}`}
    >
      {children}
    </div>
  );
}
