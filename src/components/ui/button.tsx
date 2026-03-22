import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

const variantStyles = {
  primary:
    "bg-accent-blue text-white hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/25",
  outline:
    "border border-accent-blue text-accent-blue hover:bg-accent-blue/10",
  ghost: "text-foreground hover:bg-card",
  gradient:
    "bg-gradient-to-r from-accent-red to-pink-500 text-white hover:from-accent-red/90 hover:to-pink-500/90",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}
