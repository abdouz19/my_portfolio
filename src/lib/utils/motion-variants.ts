import { type Variants } from "framer-motion";

const shouldReduceMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const noMotion: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = shouldReduceMotion
  ? noMotion
  : {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    };

export const fadeInLeft: Variants = shouldReduceMotion
  ? noMotion
  : {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    };

export const staggerContainer: Variants = shouldReduceMotion
  ? noMotion
  : {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
    };

export const scaleIn: Variants = shouldReduceMotion
  ? noMotion
  : {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    };
