import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
}

export function IconButton({ icon, label, className = '', ...props }: IconButtonProps) {
  return (
    <button 
      className={`p-3 rounded-xl glass hover:glass-hover transition-all duration-300 text-foreground/70 hover:text-foreground flex items-center justify-center ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  );
}
