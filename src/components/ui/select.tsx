import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, onChange, value, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-9 w-full rounded-full px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={onChange}
        value={value}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";

export { Select };
