"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseAutoScrollOptions {
  speed?: number;
  enabled?: boolean;
}

export function useAutoScroll(
  containerRef: React.RefObject<HTMLDivElement | null>,
  options?: UseAutoScrollOptions,
): { pause: () => void; resume: () => void; isScrolling: boolean } {
  const speed = options?.speed ?? 30;
  const enabled = options?.enabled ?? true;

  const [isScrolling, setIsScrolling] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionRef = useRef(false);

  const isTouchOnlyRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    isTouchOnlyRef.current = window.matchMedia("(hover: none)").matches;
  }, []);

  const step = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollLeft += speed / 60;

    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      container.scrollLeft = 0;
    }

    rafRef.current = requestAnimationFrame(step);
  }, [containerRef, speed]);

  const startScrolling = useCallback(() => {
    if (reducedMotionRef.current || isTouchOnlyRef.current || !enabled) return;
    setIsScrolling(true);
    rafRef.current = requestAnimationFrame(step);
  }, [enabled, step]);

  const pause = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsScrolling(false);
  }, []);

  const resume = useCallback(() => {
    if (reducedMotionRef.current || isTouchOnlyRef.current || !enabled) return;
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      startScrolling();
      timeoutRef.current = null;
    }, 1500);
  }, [enabled, startScrolling]);

  useEffect(() => {
    if (enabled && !reducedMotionRef.current) {
      startScrolling();
    }
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, startScrolling]);

  return { pause, resume, isScrolling };
}
