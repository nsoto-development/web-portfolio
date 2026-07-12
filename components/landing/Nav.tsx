"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import { IconButton } from "@/components/ui/IconButton";
import { NavLink } from "@/components/ui/NavLink";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [menuOpen]);

  function navigate(href: string) {
    setActive(href);
    setMenuOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          className="landing-nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <header
        className="landing-nav"
        style={{
          background: scrolled || menuOpen ? "rgba(0,0,0,0.75)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom:
            scrolled || menuOpen ? "1px solid var(--border-subtle)" : "1px solid transparent",
          transition: "var(--transition-default)",
        }}
      >
        <div
          className="landing-nav-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px max(24px, calc((100% - 1120px) / 2))",
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
            <Image
              src="/logo/nsoto-mark-cyan.png"
              alt=""
              width={26}
              height={26}
              style={{ height: 26, width: "auto" }}
            />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span>{portfolioData.name}</span>
              <span
                className="landing-nav-brand-subtitle"
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--weight-regular)",
                  color: "var(--text-tertiary)",
                }}
              >
                nsoto<span style={{ color: "var(--brand)" }}>.dev</span>
              </span>
            </span>
          </a>
          <nav className="landing-nav-desktop" aria-label="Primary">
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
          <div className="landing-nav-menu-btn">
            <IconButton
              icon={menuOpen ? <X size={18} /> : <Menu size={18} />}
              label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            />
          </div>
        </div>
        {menuOpen && (
          <nav className="landing-nav-mobile-panel" aria-label="Mobile">
            {portfolioData.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={active === item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
                style={{ padding: "12px 8px", fontSize: "var(--text-sm)" }}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={portfolioData.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                padding: "12px 8px",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
              }}
            >
              <GithubIcon size={18} />
              GitHub
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
