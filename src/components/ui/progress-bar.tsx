"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useInView } from "@/lib/hooks/use-in-view";

interface ProgressBarProps {
  percentage: number;
  color: string;
  className?: string;
}

export function ProgressBar({ percentage, color, className }: ProgressBarProps) {
  const { ref, isInView } = useInView({ threshold: 0.3, once: true });

  return (
    <div
      ref={ref}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-card", className)}
    >
      <motion.div
        className={cn("h-full rounded-full", color)}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
