"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface BrowserFrameProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function BrowserFrame({
  src,
  alt,
  title,
  className,
}: BrowserFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "w-full rounded-xl bg-gray-900 border border-gray-700 overflow-hidden",
        "shadow-lg hover:shadow-2xl transition-shadow duration-300",
        className,
      )}
    >
      <div className="h-[32px] bg-gray-800 flex items-center px-3 gap-2">
        <div className="w-[10px] h-[10px] rounded-full bg-red-500" />
        <div className="w-[10px] h-[10px] rounded-full bg-yellow-500" />
        <div className="w-[10px] h-[10px] rounded-full bg-green-500" />
        {title && (
          <span className="flex-1 text-center text-xs text-gray-500 truncate">
            {title}
          </span>
        )}
      </div>

      <div className="aspect-[16/10] relative overflow-hidden bg-gray-800">
        {hasError ? (
          <div className="flex h-full items-center justify-center text-gray-500 text-sm">
            No image
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </motion.div>
  );
}
