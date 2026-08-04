"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  AMBIENT_STYLE_OPTIONS,
  AMBIENT_UNMASKED_STYLES,
  DEFAULT_AMBIENT_STYLE,
  ambientHref,
  useHeroPreviewParams,
  type AmbientStyle,
} from "@/components/hero/preview/useHeroPreviewParams";
import {
  useAmbientCapability,
  type AmbientTierState,
} from "@/lib/hero-tier/useAmbientCapability";
import { useDesktopViewport } from "@/lib/hero-tier/useDesktopViewport";

const AmbientCanvas = dynamic(
  () =>
    import("@/components/hero/webgl/AmbientCanvas").then((m) => m.AmbientCanvas),
  { ssr: false },
);

function resolveStyle(
  styleParam: AmbientStyle | null,
  tier: AmbientTierState,
): AmbientStyle {
  if (styleParam !== null) return styleParam;
  if (tier === "full") return DEFAULT_AMBIENT_STYLE;
  return "off";
}

function AmbientChip({
  style,
  styleParam,
  lab,
  desktop,
}: {
  style: AmbientStyle;
  styleParam: AmbientStyle | null;
  lab: boolean;
  desktop: boolean | null;
}) {
  if (!lab) return null;

  const label = style === "off" ? "normal" : style;
  const desktopNote = desktop === false ? " · desktop only" : "";

  return (
    <div className="hero-bakeoff-chip" aria-label="Ambient veil style">
      <span className="hero-bakeoff-chip-label">
        ambient · {label}
        {styleParam === null ? " · auto" : ""}
        {desktopNote}
      </span>
      <div className="hero-bakeoff-chip-links">
        {AMBIENT_STYLE_OPTIONS.map((mode) => (
          <a
            key={mode.id}
            href={ambientHref(mode.id)}
            className={
              mode.id === style
                ? "hero-bakeoff-chip-link is-active"
                : "hero-bakeoff-chip-link"
            }
          >
            {mode.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function AmbientLayer({ style }: { style: Exclude<AmbientStyle, "off"> }) {
  const [revealed, setRevealed] = useState(false);
  const layerClass = [
    "site-ambient-layer",
    AMBIENT_UNMASKED_STYLES.has(style) ? "is-unmasked" : "",
    revealed ? "is-ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={layerClass} aria-hidden="true">
      <AmbientCanvas style={style} onReady={() => setRevealed(true)} />
    </div>
  );
}

/** Site ambient veil — desktop only; fog by default when capability gate passes. */
export function SiteAmbient() {
  const { styleParam, lab } = useHeroPreviewParams();
  const desktop = useDesktopViewport();
  const tier = useAmbientCapability(desktop === true);
  const style = resolveStyle(styleParam, tier);
  const enabled = desktop === true && style !== "off";

  return (
    <>
      {enabled ? <AmbientLayer key={style} style={style} /> : null}
      <AmbientChip
        style={style}
        styleParam={styleParam}
        lab={lab}
        desktop={desktop}
      />
    </>
  );
}
