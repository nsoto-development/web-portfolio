"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { useEffect, useState, type MouseEvent } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import { IconButton } from "@/components/ui/IconButton";
import { NavLink } from "@/components/ui/NavLink";

function resolveNavHref(href: string, onHome: boolean): string {
  if (href.startsWith("#")) {
    return onHome ? href : `/${href}`;
  }
  return href;
}

function isNavItemActive(href: string, pathname: string, activeHash: string): boolean {
  if (href.startsWith("#")) {
    return pathname === "/" && activeHash === href;
  }
  if (href === "/case-studies") {
    return pathname === "/case-studies" || pathname.startsWith("/case-studies/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [menuOpen]);

  function scrollToSection(href: string) {
    setActiveHash(href);
    setMenuOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function handleNavClick(href: string, e: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#")) return;
    if (onHome) {
      e.preventDefault();
      scrollToSection(href);
    } else {
      setMenuOpen(false);
    }
  }

  const brandHref = onHome ? "#top" : "/";

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
          background: scrolled || menuOpen || !onHome ? "rgba(0,0,0,0.75)" : "transparent",
          backdropFilter: scrolled || menuOpen || !onHome ? "blur(12px)" : "none",
          borderBottom:
            scrolled || menuOpen || !onHome
              ? "1px solid var(--border-subtle)"
              : "1px solid transparent",
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
          {onHome ? (
            <a
              href={brandHref}
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
          ) : (
            <Link
              href="/"
              className="case-study-back"
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
            </Link>
          )}
          <nav className="landing-nav-desktop" aria-label="Primary">
            {portfolioData.nav.map((item) => {
              const href = resolveNavHref(item.href, onHome);
              const active = isNavItemActive(item.href, pathname, activeHash);

              return (
                <NavLink
                  key={item.href}
                  href={href}
                  active={active}
                  onClick={(e) => {
                    if (item.href.startsWith("#") && onHome) {
                      handleNavClick(item.href, e);
                    }
                  }}
                >
                  {item.label}
                </NavLink>
              );
            })}
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
            {portfolioData.nav.map((item) => {
              const href = resolveNavHref(item.href, onHome);
              const active = isNavItemActive(item.href, pathname, activeHash);

              return (
                <NavLink
                  key={item.href}
                  href={href}
                  active={active}
                  onClick={(e) => {
                    if (item.href.startsWith("#") && onHome) {
                      e.preventDefault();
                      scrollToSection(item.href);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                  style={{ padding: "12px 8px", fontSize: "var(--text-sm)" }}
                >
                  {item.label}
                </NavLink>
              );
            })}
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
