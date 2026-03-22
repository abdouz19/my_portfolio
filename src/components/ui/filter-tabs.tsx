"use client";

import { cn } from "@/lib/utils/cn";

interface FilterTabsProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

export function FilterTabs({
  categories,
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
            activeFilter === category
              ? "bg-accent-blue text-white"
              : "border border-border text-muted hover:border-accent-blue hover:text-accent-blue",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
