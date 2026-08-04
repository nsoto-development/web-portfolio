"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionRevealProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: CSSProperties;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Landing section — fade/rise once when scrolled into view. */
export function SectionReveal({ children, id, className, style }: SectionRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section id={id} className={className} style={style}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      {children}
    </motion.section>
  );
}
