"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
};

/** Subtle translateY on hover/tap for cards and CTAs. */
export function HoverLift({ children, className, style, disabled }: HoverLiftProps) {
  const reduce = useReducedMotion();

  if (reduce || disabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
