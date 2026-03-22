"use client";

import { motion } from "framer-motion";
import { type ProjectScreenshots } from "@/lib/types/project";
import { cn } from "@/lib/utils/cn";
import {
  fadeInUp,
  galleryFrameVariants,
  parallaxFrame,
} from "@/lib/utils/motion-variants";
import { PhoneFrame } from "./phone-frame";
import { BrowserFrame } from "./browser-frame";
import { DesktopFrame } from "./desktop-frame";
import { GalleryCarousel } from "./gallery-carousel";

interface ProjectGalleryProps {
  screenshots: ProjectScreenshots;
  projectTitle: string;
}

function MobileStaticLayout({ images }: { images: string[] }) {
  const positions: Array<"left" | "center" | "right"> = ["left", "center", "right"];
  const displayImages = images.slice(0, 3);

  return (
    <div
      className="flex items-end justify-center h-[280px]"
      style={{ perspective: "1000px" }}
    >
      {displayImages.map((src, i) => {
        const pos = positions[i] ?? "center";
        const style = parallaxFrame[pos];

        return (
          <motion.div
            key={src}
            custom={i}
            variants={galleryFrameVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              scale: style.scale,
              zIndex: style.zIndex,
              rotateY: style.rotateY,
              opacity: style.opacity,
            }}
          >
            <PhoneFrame src={src} alt={`Screenshot ${i + 1}`} />
          </motion.div>
        );
      })}
    </div>
  );
}

function MobileGallery({ images }: { images: string[] }) {
  if (images.length <= 3) {
    return <MobileStaticLayout images={images} />;
  }

  return (
    <GalleryCarousel itemCount={images.length} autoScroll>
      {images.map((src, i) => (
        <motion.div
          key={src}
          custom={i}
          variants={galleryFrameVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <PhoneFrame src={src} alt={`Screenshot ${i + 1}`} />
        </motion.div>
      ))}
    </GalleryCarousel>
  );
}

function WebGallery({ images, title }: { images: string[]; title: string }) {
  if (images.length === 1) {
    return (
      <div className={cn("h-[280px] p-3 flex items-center justify-center")}>
        <motion.div
          custom={0}
          variants={galleryFrameVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-lg"
        >
          <BrowserFrame src={images[0]} alt={`${title} screenshot`} title={title} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-[280px] p-3">
      <GalleryCarousel itemCount={images.length}>
        {images.map((src, i) => (
          <motion.div
            key={src}
            custom={i}
            variants={galleryFrameVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-shrink-0 w-[320px]"
          >
            <BrowserFrame src={src} alt={`${title} screenshot ${i + 1}`} title={title} />
          </motion.div>
        ))}
      </GalleryCarousel>
    </div>
  );
}

function DesktopGallery({ images, title }: { images: string[]; title: string }) {
  if (images.length === 1) {
    return (
      <div className={cn("h-[280px] p-3 flex items-center justify-center")}>
        <motion.div
          custom={0}
          variants={galleryFrameVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-lg"
        >
          <DesktopFrame src={images[0]} alt={`${title} screenshot`} title={title} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-[280px] p-3">
      <GalleryCarousel itemCount={images.length}>
        {images.map((src, i) => (
          <motion.div
            key={src}
            custom={i}
            variants={galleryFrameVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-shrink-0 w-[320px]"
          >
            <DesktopFrame
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              title={title}
            />
          </motion.div>
        ))}
      </GalleryCarousel>
    </div>
  );
}

export function ProjectGallery({
  screenshots,
  projectTitle,
}: ProjectGalleryProps) {
  if (screenshots.images.length === 0) return null;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {screenshots.platform === "mobile" && (
        <MobileGallery images={screenshots.images} />
      )}
      {screenshots.platform === "web" && (
        <WebGallery images={screenshots.images} title={projectTitle} />
      )}
      {screenshots.platform === "desktop" && (
        <DesktopGallery images={screenshots.images} title={projectTitle} />
      )}
    </motion.div>
  );
}
