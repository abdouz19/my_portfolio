"use client";

import React, { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useAutoScroll } from "@/lib/hooks/use-auto-scroll";
import { GalleryDots } from "./gallery-dots";

interface GalleryCarouselProps {
  children: React.ReactNode;
  itemCount: number;
  autoScroll?: boolean;
  className?: string;
}

const DOT_THRESHOLD = 3;

export function GalleryCarousel({
  children,
  itemCount,
  autoScroll = true,
  className,
}: GalleryCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const shouldClone = itemCount > 3;
  const shouldAutoScroll = autoScroll && shouldClone;

  const { pause, resume } = useAutoScroll(containerRef, {
    enabled: shouldAutoScroll,
  });

  const items = React.Children.toArray(children);
  const displayItems = shouldClone
    ? [...items, ...items, ...items]
    : items;

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || !container.firstElementChild) return;

    const firstChild = container.firstElementChild as HTMLElement;
    const gap = 16;
    const itemWidth = firstChild.offsetWidth + gap;
    const index = Math.round(container.scrollLeft / itemWidth) % itemCount;
    setCurrentIndex(index);
  }, [itemCount]);

  const handleDotClick = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container || !container.firstElementChild) return;

      const firstChild = container.firstElementChild as HTMLElement;
      const gap = 16;
      const itemWidth = firstChild.offsetWidth + gap;
      const offset = shouldClone ? itemCount : 0;

      container.scrollTo({
        left: (offset + index) * itemWidth,
        behavior: "smooth",
      });
    },
    [itemCount, shouldClone],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX;
      startScrollLeft.current = containerRef.current?.scrollLeft ?? 0;
      pause();
    },
    [pause],
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const dx = e.pageX - startX.current;
    containerRef.current.scrollLeft = startScrollLeft.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    resume();
  }, [resume]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX;
      startScrollLeft.current = containerRef.current?.scrollLeft ?? 0;
      pause();
    },
    [pause],
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const dx = e.touches[0].pageX - startX.current;
    containerRef.current.scrollLeft = startScrollLeft.current - dx;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    resume();
  }, [resume]);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={pause}
        className={cn(
          "flex gap-4 overflow-x-auto cursor-grab active:cursor-grabbing",
          shouldClone ? "justify-start" : "justify-center",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {displayItems}
      </div>

      {itemCount > DOT_THRESHOLD && (
        <GalleryDots
          total={itemCount}
          current={currentIndex}
          onDotClick={handleDotClick}
        />
      )}
    </div>
  );
}
