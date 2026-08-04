"use client";

import { useEffect, useState } from "react";
import {
  resolveAmbientTier,
  type AmbientTier,
} from "@/lib/hero-tier/ambientCapability";

export type AmbientTierState = "pending" | AmbientTier;

/**
 * SSR/first paint / mobile: treat as reduced (no canvas).
 * Only probes when `active` (desktop) — skips GPU work on mobile.
 */
export function useAmbientCapability(active: boolean): AmbientTierState {
  const [probed, setProbed] = useState<AmbientTierState>("pending");

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    resolveAmbientTier().then((result) => {
      if (!cancelled) setProbed(result);
    });
    return () => {
      cancelled = true;
    };
  }, [active]);

  if (!active) return "reduced";
  return probed;
}
