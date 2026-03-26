import React from 'react';
import { cn } from '@/shared/utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'block w-full px-3 py-2 border border-neutral-300 rounded-jira shadow-sm',
            'text-sm text-neutral-900 placeholder-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed',
            error && 'border-danger-DEFAULT focus:ring-danger-DEFAULT',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-danger-DEFAULT">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
