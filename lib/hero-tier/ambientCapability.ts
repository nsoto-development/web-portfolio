"use client";

/**
 * M5-style capability gate: reduced-motion → cache → off-screen fps probe.
 * `full` → default ambient (fog); `reduced` → no canvas.
 */

export type AmbientTier = "full" | "reduced";

export const AMBIENT_TIER_STORAGE_KEY = "nsoto:ambient-tier:v2";

const FPS_THRESHOLD = 45;
const SAMPLE_MS = 1000;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readCachedTier(): AmbientTier | null {
  try {
    const raw = sessionStorage.getItem(AMBIENT_TIER_STORAGE_KEY);
    if (raw === "full" || raw === "reduced") return raw;
  } catch {
    /* private mode / blocked */
  }
  return null;
}

function writeCachedTier(tier: AmbientTier): void {
  try {
    sessionStorage.setItem(AMBIENT_TIER_STORAGE_KEY, tier);
  } catch {
    /* ignore */
  }
}

/**
 * Hidden fps probe (~1s). Resolves `full` if sustained ≥ ~45fps.
 * Uses a detached canvas (not in the DOM) to avoid layout/composite flicker.
 */
export function probeAmbientFps(): Promise<AmbientTier> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve("reduced");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const gl =
      canvas.getContext("webgl", {
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      }) ||
      canvas.getContext("experimental-webgl", {
        antialias: false,
        alpha: true,
      });

    if (!gl) {
      resolve("reduced");
      return;
    }

    const glCtx = gl as WebGLRenderingContext;
    let frames = 0;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      frames += 1;
      glCtx.clearColor(0, 0, 0, 0);
      glCtx.clear(glCtx.COLOR_BUFFER_BIT);

      if (now - start >= SAMPLE_MS) {
        cancelAnimationFrame(raf);
        const fps = frames / ((now - start) / 1000);
        resolve(fps >= FPS_THRESHOLD ? "full" : "reduced");
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
  });
}

/** Decision order: reduced-motion → session cache → fps probe. */
export async function resolveAmbientTier(): Promise<AmbientTier> {
  if (prefersReducedMotion()) {
    writeCachedTier("reduced");
    return "reduced";
  }

  const cached = readCachedTier();
  if (cached) return cached;

  const tier = await probeAmbientFps();
  writeCachedTier(tier);
  return tier;
}
