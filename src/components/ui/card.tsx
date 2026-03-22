import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6",
        hover &&
          "transition-all duration-300 hover:scale-[1.02] hover:border-border-glow-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
