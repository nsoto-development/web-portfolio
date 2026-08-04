"use client";

import dynamic from "next/dynamic";
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
}: {
  style: AmbientStyle;
  styleParam: AmbientStyle | null;
  lab: boolean;
}) {
  if (!lab) return null;

  const label = style === "off" ? "normal" : style;

  return (
    <div className="hero-bakeoff-chip" aria-label="Ambient veil style">
      <span className="hero-bakeoff-chip-label">
        ambient · {label}
        {styleParam === null ? " · auto" : ""}
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

/** Site ambient veil — fog by default when the device passes the M5-style gate. */
export function SiteAmbient() {
  const { styleParam, lab } = useHeroPreviewParams();
  const tier = useAmbientCapability();
  const style = resolveStyle(styleParam, tier);
  const enabled = style !== "off";
  const layerClass = AMBIENT_UNMASKED_STYLES.has(style)
    ? "site-ambient-layer is-unmasked"
    : "site-ambient-layer";

  return (
    <>
      {enabled ? (
        <div className={layerClass} aria-hidden="true">
          <AmbientCanvas style={style} />
        </div>
      ) : null}
      <AmbientChip style={style} styleParam={styleParam} lab={lab} />
    </>
  );
}
