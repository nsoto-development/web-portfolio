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
 * Hidden off-screen canvas probe (~1s). Resolves `full` if sustained ≥ ~45fps.
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
    canvas.style.cssText =
      "position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
    document.body.appendChild(canvas);

    const gl =
      canvas.getContext("webgl", {
        antialias: false,
        powerPreference: "low-power",
      }) ||
      canvas.getContext("experimental-webgl", {
        antialias: false,
      });

    if (!gl) {
      canvas.remove();
      resolve("reduced");
      return;
    }

    const glCtx = gl as WebGLRenderingContext;
    let frames = 0;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      frames += 1;
      // Minimal draw so the GPU actually works
      glCtx.clearColor((frames % 10) / 10, 0.1, 0.2, 1);
      glCtx.clear(glCtx.COLOR_BUFFER_BIT);

      if (now - start >= SAMPLE_MS) {
        cancelAnimationFrame(raf);
        canvas.remove();
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
