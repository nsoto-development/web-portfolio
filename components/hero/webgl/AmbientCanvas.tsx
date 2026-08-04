"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { AmbientStyle } from "@/components/hero/preview/useHeroPreviewParams";
import { AmbientVeil } from "@/components/hero/webgl/AmbientVeil";

type AmbientCanvasProps = {
  style: Exclude<AmbientStyle, "off">;
};

function AmbientFrameController({ onReady }: { onReady?: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  const scrolling = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerRaf = useRef<number | null>(null);
  const readyOnce = useRef(false);

  useFrame(() => {
    if (readyOnce.current || !onReady) return;
    readyOnce.current = true;
    onReady();
  });

  useEffect(() => {
    const onScroll = () => {
      scrolling.current = true;
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        scrolling.current = false;
        invalidate();
      }, 140);
    };

    const onPointerMove = () => {
      if (scrolling.current) return;
      if (pointerRaf.current != null) return;
      pointerRaf.current = window.requestAnimationFrame(() => {
        pointerRaf.current = null;
        invalidate();
      });
    };

    const idle = window.setInterval(() => {
      if (!scrolling.current) invalidate();
    }, 480);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    invalidate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.clearInterval(idle);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      if (pointerRaf.current != null) cancelAnimationFrame(pointerRaf.current);
    };
  }, [invalidate]);

  return null;
}

export function AmbientCanvas({
  style,
  onReady,
}: AmbientCanvasProps & { onReady?: () => void }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={1}
      orthographic
      camera={{ position: [0, 0, 5], zoom: 40, near: 0.1, far: 20 }}
      gl={{
        antialias: false,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: "low-power",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
      eventSource={typeof document !== "undefined" ? document.documentElement : undefined}
      eventPrefix="client"
    >
      <AmbientFrameController onReady={onReady} />
      <AmbientVeil style={style} />
    </Canvas>
  );
}
