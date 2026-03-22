"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import { useInView } from "@/lib/hooks/use-in-view";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "+",
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const { ref, isInView } = useInView({ threshold: 0.3, once: true });
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {count}
      {suffix}
    </span>
  );
}
