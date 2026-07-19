import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { landingAppTeasers, type AppsStubEntry } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

function teaserLine(app: AppsStubEntry): string {
  return app.blurb ?? app.description ?? app.domain;
}

function AppTeaserCard({ app }: { app: AppsStubEntry }) {
  const isLive = Boolean(app.href);
  const body = (
    <Card
      interactive={isLive}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        overflow: "hidden",
        padding: 0,
      }}
    >
      {app.preview && (
        <div className="landing-apps-preview">
          <Image
            src={app.preview.src}
            alt={app.preview.alt}
            width={app.preview.width}
            height={app.preview.height}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
          padding: "var(--space-5)",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--space-3)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-lg)",
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            {app.name}
          </h3>
          <Badge tone={isLive ? "success" : "neutral"} dot={isLive}>
            {app.status}
          </Badge>
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--text-primary)",
            lineHeight: "var(--leading-normal)",
            margin: 0,
            opacity: 0.85,
            flex: 1,
          }}
        >
          {teaserLine(app)}
        </p>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-1)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            color: "var(--brand)",
          }}
        >
          {app.domain}
          <ArrowUpRight size={14} aria-hidden />
        </span>
      </div>
    </Card>
  );

  if (!app.href) return body;

  return (
    <a
      href={app.href}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
    >
      {body}
    </a>
  );
}

export function Apps() {
  const teasers = landingAppTeasers();

  return (
    <section
      id="apps"
      className="landing-section"
      style={{
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "var(--space-16) var(--space-6)",
      }}
    >
      <p className="case-study-eyebrow">{"</ APPS >"}</p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          flexWrap: "wrap",
          marginBottom: "var(--space-3)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-2xl)",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Side projects
        </h2>
        <Link href="/apps" className="landing-section-cta">
          See all apps
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
      <p className="landing-section-sub">
        Live apps on their own domains — prove the work quickly, then open the full catalog.
      </p>
      <div className="landing-apps-teaser-grid">
        {teasers.map((app) => (
          <AppTeaserCard key={app.domain} app={app} />
        ))}
      </div>
    </section>
  );
}
