"use client";

import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  padding?: string;
};

export function Card({
  children,
  interactive = false,
  padding = "var(--space-6)",
  style,
  onClick,
  ...rest
}: CardProps) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--bg-surface)",
        border: `1px solid ${hover && interactive ? "var(--border-brand)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow:
          hover && interactive ? "var(--shadow-lg), var(--glow-brand-sm)" : "var(--shadow-card)",
        transform: hover && interactive ? "translateY(-2px)" : "translateY(0)",
        transition: "var(--transition-default)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
