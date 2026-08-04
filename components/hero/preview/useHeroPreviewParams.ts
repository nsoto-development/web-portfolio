"use client";

import { useSearchParams } from "next/navigation";

/** Spike ambient styles — `off` = no canvas. */
export type AmbientStyle =
  | "off"
  | "wash"
  | "edge"
  | "spot"
  | "fog"
  | "beam"
  | "rim"
  | "north"
  | "depth"
  | "mist";

export type HeroPreviewParams = {
  /** Explicit `?heroambient=` — `null` means auto (fog when capable). */
  styleParam: AmbientStyle | null;
  /** Shareable feedback UI (`?ambientlab=1`). */
  lab: boolean;
};

const STYLES: AmbientStyle[] = [
  "off",
  "wash",
  "edge",
  "spot",
  "fog",
  "beam",
  "rim",
  "north",
  "depth",
  "mist",
];

/** Default ambient when the device passes the capability gate. */
export const DEFAULT_AMBIENT_STYLE: Exclude<AmbientStyle, "off"> = "fog";

/** Top-weighted looks — skip nav soft-mask so the light isn’t cropped. */
export const AMBIENT_UNMASKED_STYLES: ReadonlySet<AmbientStyle> = new Set([
  "edge",
  "north",
]);

/** Brave (and some clients) lowercase query keys — match case-insensitively. */
function getParamCI(searchParams: URLSearchParams, name: string): string | null {
  const target = name.toLowerCase();
  for (const [key, value] of searchParams.entries()) {
    if (key.toLowerCase() === target) return value;
  }
  return null;
}

function deleteParamCI(searchParams: URLSearchParams, name: string): void {
  const target = name.toLowerCase();
  for (const key of [...searchParams.keys()]) {
    if (key.toLowerCase() === target) searchParams.delete(key);
  }
}

function parseStyleParam(value: string | null): AmbientStyle | null {
  if (value === null || value === "") return null;
  const normalized = value.toLowerCase();
  if ((STYLES as string[]).includes(normalized)) {
    return normalized as AmbientStyle;
  }
  if (normalized === "present" || normalized === "subtle") return "wash";
  return null;
}

function parseLab(value: string | null): boolean {
  if (value === null) return false;
  const v = value.toLowerCase();
  return v === "1" || v === "true";
}

/** Query-driven bake-off + auto default. */
export function useHeroPreviewParams(): HeroPreviewParams {
  const searchParams = useSearchParams();
  const raw =
    getParamCI(searchParams, "heroambient") ??
    getParamCI(searchParams, "herointensity");
  return {
    styleParam: parseStyleParam(raw),
    lab: parseLab(getParamCI(searchParams, "ambientlab")),
  };
}

/** Chip/share links use lowercase keys so Brave URL bar lowercasing still works. */
export function ambientHref(style: AmbientStyle): string {
  if (typeof window === "undefined") {
    return `/?ambientlab=1&heroambient=${style}`;
  }
  const url = new URL(window.location.href);
  deleteParamCI(url.searchParams, "ambientlab");
  deleteParamCI(url.searchParams, "heroambient");
  deleteParamCI(url.searchParams, "herointensity");
  deleteParamCI(url.searchParams, "heroscene");
  url.searchParams.set("ambientlab", "1");
  // Always set explicitly — `off` must not fall through to auto fog
  url.searchParams.set("heroambient", style);
  return `${url.pathname}${url.search}${url.hash}`;
}

export const AMBIENT_STYLE_OPTIONS: { id: AmbientStyle; label: string }[] = [
  { id: "off", label: "normal" },
  { id: "wash", label: "wash" },
  { id: "edge", label: "edge" },
  { id: "spot", label: "spot" },
  { id: "fog", label: "fog" },
  { id: "beam", label: "beam" },
  { id: "rim", label: "rim" },
  { id: "north", label: "north" },
  { id: "depth", label: "depth" },
  { id: "mist", label: "mist" },
];
