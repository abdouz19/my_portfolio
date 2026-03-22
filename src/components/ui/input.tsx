"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, required, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium">
          {label}
          {required && <span className="text-accent-red"> *</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted transition-colors focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-ring/20",
            error && "border-accent-red focus:border-accent-red focus:ring-accent-red/20",
            className,
          )}
          required={required}
          {...props}
        />
        {error && (
          <p className="text-sm text-accent-red">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
