"use client";

import Link from "next/link";
import React from "react";

type NavLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href?: string;
  active?: boolean;
};

/**
 * Next.js adapter — kit NavLink is a plain <a>; hub routes use next/link.
 * Permanent app seam (playbook C), not temporary kit drift.
 */
export function NavLink({
  children,
  href = "#",
  active = false,
  onClick,
  style,
  ...rest
}: NavLinkProps) {
  const [hover, setHover] = React.useState(false);
  const sharedStyle = {
    position: "relative" as const,
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-sm)",
    color: active ? "var(--text-primary)" : "var(--text-secondary)",
    textDecoration: "none",
    paddingBottom: "4px",
    transition: "var(--transition-default)",
    display: "inline-flex",
    alignItems: "center",
    lineHeight: 1,
    ...style,
  };

  const underline = (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "1.5px",
        background: "var(--brand)",
        transform: active || hover ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform var(--duration-base) var(--ease-out)",
      }}
    />
  );

  const hoverHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} style={sharedStyle} {...hoverHandlers}>
        {children}
        {underline}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} style={sharedStyle} {...hoverHandlers} {...rest}>
      {children}
      {underline}
    </a>
  );
}
