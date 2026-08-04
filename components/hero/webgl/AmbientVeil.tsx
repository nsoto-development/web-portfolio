"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { AmbientStyle } from "@/components/hero/preview/useHeroPreviewParams";
import { readBrandColor } from "@/components/hero/webgl/brandColor";

type AmbientVeilProps = {
  style: Exclude<AmbientStyle, "off">;
};

type Rgb = { r: number; g: number; b: number };

function parseBrandRgb(css: string): Rgb {
  const c = new THREE.Color(css);
  return {
    r: Math.round(c.r * 255),
    g: Math.round(c.g * 255),
    b: Math.round(c.b * 255),
  };
}

type PaintSurface = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
};

type PaintCtx = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  rgb: Rgb;
  px: number;
  py: number;
  scroll: number;
  t: number;
};

function paintRadial(
  p: PaintCtx,
  x: number,
  y: number,
  radius: number,
  peak: number,
  rgb: Rgb = p.rgb,
) {
  const { ctx, w, h } = p;
  const { r, g, b } = rgb;
  const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
  grad.addColorStop(0, `rgba(${r},${g},${b},${peak})`);
  grad.addColorStop(0.4, `rgba(${r},${g},${b},${peak * 0.35})`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function paintLinear(
  p: PaintCtx,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  peak: number,
) {
  const { ctx, w, h, rgb } = p;
  const { r, g, b } = rgb;
  const grad = ctx.createLinearGradient(x0, y0, x1, y1);
  grad.addColorStop(0, `rgba(${r},${g},${b},${peak})`);
  grad.addColorStop(0.55, `rgba(${r},${g},${b},${peak * 0.25})`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

/** Current favorite — multi soft fields, cursor + scroll. */
function paintWash(p: PaintCtx) {
  const { w, h, px, py, scroll, t } = p;
  const R = Math.max(w, h);
  paintRadial(p, w * 0.05 + Math.sin(t * 0.08) * w * 0.03, h * 0.1, R * 1.35, 0.28);
  paintRadial(p, w * 0.85, h * (0.55 + scroll * 0.35), R * 1.25, 0.18);
  paintRadial(p, px, py, R * 1.15, 0.22);
}

/** Architectural: light from top + sides, less page-center presence. */
function paintEdge(p: PaintCtx) {
  const { w, h, px, py, scroll, t } = p;
  const R = Math.max(w, h);
  paintLinear(p, 0, 0, 0, h * 0.85, 0.3);
  paintRadial(p, w * 0.0, h * 0.15, R * 1.2, 0.22);
  paintRadial(p, w * 1.0, h * (0.35 + scroll * 0.2), R * 1.15, 0.16);
  // Cursor only nudges the top wash slightly
  paintRadial(p, px, Math.min(py, h * 0.35), R * 1.4, 0.12);
  void t;
}

/** Mostly cursor-driven bias — still oversized so it isn’t an orb. */
function paintSpot(p: PaintCtx) {
  const { w, h, px, py, scroll } = p;
  const R = Math.max(w, h);
  paintRadial(p, w * 0.5, h * 0.15, R * 1.5, 0.1);
  paintRadial(p, px, py, R * 1.35, 0.34);
  paintRadial(p, w * 0.8, h * (0.7 + scroll * 0.2), R * 1.4, 0.1);
}

/** Even, slow atmosphere — lower contrast, more “room air” than light pool. */
function paintFog(p: PaintCtx) {
  const { w, h, px, py, scroll, t } = p;
  const R = Math.max(w, h);
  const driftX = Math.sin(t * 0.07) * w * 0.08;
  const driftY = Math.cos(t * 0.05) * h * 0.05;
  paintRadial(p, w * 0.3 + driftX, h * 0.4 + driftY, R * 1.6, 0.16);
  paintRadial(p, w * 0.75 - driftX * 0.5, h * (0.55 + scroll * 0.15), R * 1.55, 0.14);
  paintRadial(p, px, py, R * 1.5, 0.1);
  const lift = {
    r: Math.min(255, p.rgb.r + 40),
    g: Math.min(255, p.rgb.g + 40),
    b: Math.min(255, p.rgb.b + 30),
  };
  paintRadial(p, w * 0.5, h * 0.2, R * 1.7, 0.08, lift);
}

/** Soft diagonal shaft — studio beam across the page. */
function paintBeam(p: PaintCtx) {
  const { w, h, px, py, scroll, t } = p;
  const R = Math.max(w, h);
  const skew = (px / w - 0.5) * w * 0.15;
  paintLinear(
    p,
    w * 0.05 + skew,
    h * -0.05,
    w * 0.95 + skew,
    h * (0.75 + scroll * 0.1),
    0.26,
  );
  paintRadial(p, w * 0.35 + Math.sin(t * 0.06) * 20, h * 0.2, R * 1.3, 0.12);
  paintRadial(p, px, py, R * 1.45, 0.1);
}

/** Horizon / floor glow — light pools along the bottom and side. */
function paintRim(p: PaintCtx) {
  const { w, h, px, py, scroll } = p;
  const R = Math.max(w, h);
  paintLinear(p, 0, h, 0, h * 0.25, 0.28);
  paintRadial(p, w * 0.2, h * (0.95 - scroll * 0.1), R * 1.2, 0.22);
  paintRadial(p, w * 0.9, h * 0.7, R * 1.15, 0.14);
  paintRadial(p, px, Math.max(py, h * 0.55), R * 1.4, 0.12);
}

/** Upper-left key light — single soft source, gentle cursor nudge. */
function paintNorth(p: PaintCtx) {
  const { w, h, px, py, t } = p;
  const R = Math.max(w, h);
  paintRadial(
    p,
    w * 0.08 + (px / w) * w * 0.12,
    h * 0.02 + Math.sin(t * 0.05) * 8,
    R * 1.45,
    0.34,
  );
  paintLinear(p, 0, 0, w * 0.7, h * 0.55, 0.14);
  paintRadial(p, px, Math.min(py, h * 0.45), R * 1.5, 0.08);
}

/** Lit periphery, quieter center — page sits in a soft well. */
function paintDepth(p: PaintCtx) {
  const { w, h, px, scroll } = p;
  const R = Math.max(w, h);
  paintRadial(p, 0, 0, R * 1.1, 0.2);
  paintRadial(p, w, h * 0.15, R * 1.1, 0.16);
  paintRadial(p, w * 0.15, h * (0.9 + scroll * 0.05), R * 1.15, 0.18);
  paintRadial(p, w * 0.9, h * 0.85, R * 1.1, 0.14);
  // Very soft center lift so it doesn’t feel like a hole punched in the page
  paintRadial(p, w * 0.5 + (px - w * 0.5) * 0.15, h * 0.45, R * 1.6, 0.05);
}

/** Quieter than fog — barely-there air, almost a tint. */
function paintMist(p: PaintCtx) {
  const { w, h, px, py, scroll, t } = p;
  const R = Math.max(w, h);
  const drift = Math.sin(t * 0.04) * w * 0.06;
  paintRadial(p, w * 0.4 + drift, h * 0.35, R * 1.8, 0.1);
  paintRadial(p, w * 0.7 - drift, h * (0.6 + scroll * 0.1), R * 1.75, 0.09);
  paintRadial(p, px, py, R * 1.7, 0.06);
}

const PAINTERS: Record<Exclude<AmbientStyle, "off">, (p: PaintCtx) => void> = {
  wash: paintWash,
  edge: paintEdge,
  spot: paintSpot,
  fog: paintFog,
  beam: paintBeam,
  rim: paintRim,
  north: paintNorth,
  depth: paintDepth,
  mist: paintMist,
};

/**
 * Full-viewport ambient washes (not centered orbs). Style variants share
 * the same oversized-light approach + scroll-paused demand loop.
 */
export function AmbientVeil({ style }: AmbientVeilProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const surface = useRef<PaintSurface | null>(null);
  const smooth = useRef(new THREE.Vector2(0, 0));
  const scroll = useRef(0);
  const { viewport } = useThree();

  const brand = useMemo(() => parseBrandRgb(readBrandColor()), []);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    surface.current = { canvas, ctx, texture };

    return () => {
      texture.dispose();
      surface.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    const s = surface.current;
    const m = mesh.current;
    if (!s || !m) return;

    const dt = Math.min(delta, 0.05);
    smooth.current.lerp(state.pointer, 1 - Math.exp(-2 * dt));

    if (typeof window !== "undefined") {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scroll.current +=
        (window.scrollY / max - scroll.current) * (1 - Math.exp(-2.5 * dt));
    }

    const { canvas, ctx, texture } = s;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const paintCtx: PaintCtx = {
      ctx,
      w,
      h,
      rgb: brand,
      px: (smooth.current.x * 0.5 + 0.5) * w,
      py: (1 - (smooth.current.y * 0.5 + 0.5)) * h,
      scroll: scroll.current,
      t: state.clock.elapsedTime,
    };

    PAINTERS[style](paintCtx);

    texture.needsUpdate = true;
    m.scale.set(viewport.width, viewport.height, 1);

    const mat = m.material as THREE.MeshBasicMaterial;
    if (mat.map !== texture) {
      mat.map = texture;
      mat.needsUpdate = true;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -1]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={1}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}
