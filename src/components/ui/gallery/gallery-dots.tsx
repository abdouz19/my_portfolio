"use client";

import { cn } from "@/lib/utils/cn";

interface GalleryDotsProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
}

export function GalleryDots({ total, current, onDotClick }: GalleryDotsProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-3">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onDotClick?.(i)}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            i === current ? "bg-accent-blue scale-125" : "bg-gray-600",
          )}
        />
      ))}
    </div>
  );
}
