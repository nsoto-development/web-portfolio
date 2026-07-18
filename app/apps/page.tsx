import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { portfolioData, type AppsStubEntry } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Side Projects",
  description:
    "Side projects on nsoto.dev — chess and budget apps, plus published @nsoto design-system packages.",
  openGraph: {
    title: "Side Projects",
    description:
      "Side projects linked from the nsoto.dev hub — chess.nsoto.dev, budget.nsoto.dev, and @nsoto npm packages.",
    url: `${SITE_URL}/apps`,
    siteName: "nsoto.dev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/nsoto-dev-og.png",
        width: 1731,
        height: 909,
        alt: "nsoto.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Side Projects",
    description:
      "Side projects linked from the nsoto.dev hub — chess.nsoto.dev, budget.nsoto.dev, and @nsoto npm packages.",
    images: ["/og/nsoto-dev-og.png"],
  },
};

const externalLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-sm)",
  color: "var(--brand)",
  textDecoration: "none",
} as const;

const repoLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--text-tertiary)",
  textDecoration: "none",
  padding: "2px",
  borderRadius: "var(--radius-sm)",
  transition: "var(--transition-default)",
} as const;

function AppCard({ app }: { app: AppsStubEntry }) {
  const isLive = Boolean(app.href);

  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "var(--space-4)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-lg)",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {app.name}
        </h2>
        <Badge tone={isLive ? "success" : "neutral"} dot={isLive}>
          {app.status}
        </Badge>
      </div>
      {app.description && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--text-secondary)",
            lineHeight: "var(--leading-normal)",
            margin: 0,
            flex: 1,
          }}
        >
          {app.description}
        </p>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          flexWrap: "wrap",
        }}
      >
        {app.href ? (
          <a href={app.href} target="_blank" rel="noreferrer" style={externalLinkStyle}>
            {app.domain}
            <ArrowUpRight size={14} aria-hidden />
          </a>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              color: "var(--text-tertiary)",
            }}
          >
            {app.domain}
          </span>
        )}
        {app.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            style={externalLinkStyle}
          >
            {link.label}
            <ArrowUpRight size={14} aria-hidden />
          </a>
        ))}
        {app.repo && (
          <a
            href={app.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={`${app.name} on GitHub`}
            title="View source on GitHub"
            style={repoLinkStyle}
            className="app-card-repo-link"
          >
            <GithubIcon size={16} />
          </a>
        )}
      </div>
    </Card>
  );
}

export default function AppsStubPage() {
  const { appsStub } = portfolioData;

  return (
    <>
      <SiteNav />
      <main className="hub-page-main">
        <div className="hub-page-content">
          <header className="hub-page-header">
            <p className="case-study-eyebrow">{appsStub.eyebrow}</p>
            <h1 className="hub-page-title">{appsStub.headline}</h1>
            <p className="hub-page-subtitle">{appsStub.sub}</p>
          </header>
          <div className="apps-card-list">
            {appsStub.entries.map((app) => (
              <div key={app.domain} className="apps-card-item">
                <AppCard app={app} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
