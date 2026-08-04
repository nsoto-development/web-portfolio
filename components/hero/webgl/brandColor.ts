"use client";

/** Read `--brand` once for Three materials (token-aligned, no hard-coded palette). */
export function readBrandColor(fallback = "#0a9efa"): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--brand")
    .trim();
  return value || fallback;
}
