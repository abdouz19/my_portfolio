import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "colored";
  color?: string;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  color,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-card text-muted",
        variant === "colored" && color,
        className,
      )}
    >
      {children}
    </span>
  );
}
