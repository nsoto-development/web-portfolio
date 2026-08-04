"use client";

import { useEffect, useState } from "react";

/** Matches site mobile breakpoint (`max-width: 768px` in globals.css). */
export const DESKTOP_MIN_WIDTH_PX = 769;

/**
 * `null` until mounted (SSR-safe). Ambient should stay off while null/false.
 */
export function useDesktopViewport(): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH_PX}px)`);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return matches;
}
