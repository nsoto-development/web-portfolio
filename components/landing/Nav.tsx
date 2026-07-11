"use client";

import Image from "next/image";
import { GithubIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import { IconButton } from "@/components/ui/IconButton";
import { NavLink } from "@/components/ui/NavLink";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px max(24px, calc((100% - 1120px) / 2))",
        background: scrolled ? "rgba(0,0,0,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        transition: "var(--transition-default)",
      }}
    >
      <a
        href="#top"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-md)",
          fontWeight: "var(--weight-semibold)",
          color: "var(--text-primary)",
          textDecoration: "none",
        }}
      >
        <Image src="/logo/nsoto-mark-cyan.png" alt="" width={26} height={26} style={{ height: 26, width: "auto" }} />
        nsoto<span style={{ color: "var(--brand)" }}>.dev</span>
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-8)" }}>
        {portfolioData.nav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            active={active === item.href}
            onClick={() => setActive(item.href)}
          >
            {item.label}
          </NavLink>
        ))}
        <a
          href={portfolioData.links.github}
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex" }}
        >
          <IconButton icon={<GithubIcon size={18} />} label="GitHub" />
        </a>
      </nav>
    </header>
  );
}
