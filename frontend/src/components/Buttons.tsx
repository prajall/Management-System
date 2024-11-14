import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  className,
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2";

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 focus:ring-primary/50",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 focus:ring-secondary/50",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary/10 active:bg-primary/20 focus:ring-primary/50",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const SmallButton: React.FC<Omit<ButtonProps, "size">> = (props) => (
  <Button size="small" {...props} />
);

export const MediumButton: React.FC<Omit<ButtonProps, "size">> = (props) => (
  <Button size="medium" {...props} />
);

export const LargeButton: React.FC<Omit<ButtonProps, "size">> = (props) => (
  <Button size="large" {...props} />
);

export default Button;
