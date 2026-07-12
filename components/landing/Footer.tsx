import Image from "next/image";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { portfolioData } from "@/lib/portfolio-data";
import { IconButton } from "@/components/ui/IconButton";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "var(--space-6) max(24px, calc((100% - 1120px) / 2))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        color: "var(--text-tertiary)",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
        <Image src="/logo/nsoto-mark-cyan.png" alt="" width={16} height={16} style={{ height: 16, width: "auto" }} />
        © {year} nsoto.dev
      </span>
      <div style={{ display: "flex", gap: "var(--space-2)" }}>
        <a
          href={portfolioData.links.github}
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex" }}
        >
          <IconButton icon={<GithubIcon size={16} />} label="GitHub" />
        </a>
        <a
          href={portfolioData.links.linkedin}
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex" }}
        >
          <IconButton icon={<LinkedinIcon size={16} />} label="LinkedIn" />
        </a>
        <a href={`mailto:${portfolioData.links.email}`} style={{ display: "inline-flex" }}>
          <IconButton icon={<Mail size={16} />} label="Email" />
        </a>
      </div>
    </footer>
  );
}
