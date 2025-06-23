import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }
);

Input.displayName = "Input";