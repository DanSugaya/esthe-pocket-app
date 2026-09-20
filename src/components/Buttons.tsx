import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export const PrimaryButton = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`w-full rounded-lg bg-[var(--color-primary,#1e3a8a)] py-3 px-4 text-center font-bold text-white transition-opacity hover:opacity-90 active:opacity-100 ${className}`}
    >
      {children}
    </button>
  );
};

export const OutlineButton = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`w-full rounded-lg border border-[var(--color-primary,#1e3a8a)] py-3 px-4 text-center font-bold text-[var(--color-primary,#1e3a8a)] transition-colors hover:bg-blue-50 ${className}`}
    >
      {children}
    </button>
  );
};