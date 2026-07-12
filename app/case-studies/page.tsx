import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { publishedCaseStudies } from "@/lib/case-studies/registry";

export const metadata: Metadata = {
  title: "Case studies — nsoto.dev",
  description:
    "Engineering case studies on nsoto.dev — systems thinking, architectural decisions, and shipped work beyond the landing page.",
  openGraph: {
    title: "Case studies",
    description: "Engineering narratives on architecture, consolidation, and portfolio engineering.",
    url: "https://nsoto.dev/case-studies",
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
};

const lifecycleTone = {
  architecture: "brand",
  planned: "warning",
  "in-progress": "warning",
  implemented: "success",
} as const;

export default function CaseStudiesIndexPage() {
  return (
    <>
      <SiteNav />
      <main className="hub-page-main">
        <div className="hub-page-content">
          <header className="hub-page-header">
            <p className="case-study-eyebrow">{"</ CASE STUDIES >"}</p>
            <h1 className="hub-page-title">Case studies</h1>
            <p className="hub-page-subtitle">
              Long-form narratives on architecture, constraints, and decisions — living documents
              that update as related work ships.
            </p>
          </header>
          <div className="hub-card-list">
            {publishedCaseStudies.map((study) => (
              <Link key={study.slug} href={study.href} style={{ textDecoration: "none" }}>
                <Card interactive>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "var(--space-4)",
                      marginBottom: "var(--space-4)",
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
                      {study.title}
                    </h2>
                    <Badge tone={lifecycleTone[study.lifecycle]}>
                      {study.lifecycle === "in-progress" ? "In progress" : study.lifecycle}
                    </Badge>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: "var(--leading-normal)",
                      margin: "0 0 var(--space-4)",
                    }}
                  >
                    {study.subtitle}
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--brand)",
                    }}
                  >
                    Read case study
                    <ArrowRight size={14} aria-hidden />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
