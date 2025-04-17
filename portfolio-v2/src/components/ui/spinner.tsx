import { cn } from "@/lib/utils";
import type React from "react";

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary" | "white";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "default",
  className = "",
}) => {
  const sizeClasses = {
    xs: "h-3 w-3 border-[1.5px]",
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  };

  const variantClasses = {
    default: "border-current border-t-transparent",
    primary: "border-primary border-t-transparent",
    secondary: "border-secondary border-t-transparent",
    white: "border-white border-t-transparent",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    />
  );
};

export default Spinner;
