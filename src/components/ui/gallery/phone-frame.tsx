"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface PhoneFrameProps {
  src: string;
  alt: string;
  accentColor?: string;
  className?: string;
}

export function PhoneFrame({
  src,
  alt,
  accentColor,
  className,
}: PhoneFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "w-[110px] h-[240px] md:w-[120px] md:h-[260px] xl:w-[140px] xl:h-[300px]",
        "rounded-[28px] bg-gray-900 border border-gray-700 p-[6px] relative overflow-hidden",
        "shadow-lg hover:shadow-2xl transition-shadow duration-300",
        accentColor,
        className,
      )}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] rounded-b-xl bg-gray-900 z-10" />

      <div className="rounded-[22px] overflow-hidden h-full w-full relative bg-gray-800">
        {hasError ? (
          <div className="flex h-full items-center justify-center text-gray-500 text-xs">
            No image
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 110px, (max-width: 1280px) 120px, 140px"
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </motion.div>
  );
}
