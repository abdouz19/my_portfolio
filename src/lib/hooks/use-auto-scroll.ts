"use client";

import { useCallback, useEffect, useRef } from "react";

interface UseAutoScrollOptions {
  speed?: number;
  enabled?: boolean;
}

export function useAutoScroll(
  containerRef: React.RefObject<HTMLDivElement | null>,
  options?: UseAutoScrollOptions,
): { pause: () => void; resume: () => void } {
  const speed = options?.speed ?? 30;
  const enabled = options?.enabled ?? true;

  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const step = useCallback(() => {
    const container = containerRef.current;
    if (!container || pausedRef.current) {
      rafRef.current = requestAnimationFrame(step);
      return;
    }

    container.scrollLeft += speed / 60;

    // Seamless loop: when we've scrolled one full set, wrap back
    const oneSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft >= oneSetWidth * 2) {
      container.scrollLeft -= oneSetWidth;
    }

    rafRef.current = requestAnimationFrame(step);
  }, [containerRef, speed]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotionRef.current) return;
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, step]);

  return { pause, resume };
}
