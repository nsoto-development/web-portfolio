"use client";

import React from "react";

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
};

export function NavLink({ children, href = "#", active = false, onClick, style, ...rest }: NavLinkProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-sm)",
        color: active ? "var(--text-primary)" : "var(--text-secondary)",
        textDecoration: "none",
        paddingBottom: "4px",
        transition: "var(--transition-default)",
        ...style,
      }}
      {...rest}
    >
      {children}
      <span
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
    </a>
  );
}
