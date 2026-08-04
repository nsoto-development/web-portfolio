"use client";

import { useEffect, useState } from "react";
import {
  resolveAmbientTier,
  type AmbientTier,
} from "@/lib/hero-tier/ambientCapability";

export type AmbientTierState = "pending" | AmbientTier;

/**
 * SSR/first paint: pending (treat as reduced). Promotes to full/reduced once.
 */
export function useAmbientCapability(): AmbientTierState {
  const [tier, setTier] = useState<AmbientTierState>("pending");

  useEffect(() => {
    let cancelled = false;
    resolveAmbientTier().then((result) => {
      if (!cancelled) setTier(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return tier;
}
