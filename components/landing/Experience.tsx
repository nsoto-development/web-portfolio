import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { landingExperienceHighlights } from "@/lib/portfolio-data";
import { HoverLift, SectionReveal } from "@/components/landing/motion";

export function Experience() {
  const jobs = landingExperienceHighlights();

  return (
    <SectionReveal
      id="work"
      className="landing-section"
      style={{
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "var(--space-16) var(--space-6)",
      }}
    >
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
          Experience
        </h2>
        <Link href="/experience" className="landing-section-cta">
          Full experience
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
      <p className="landing-section-sub">
        Selected roles across integrations, cloud, and data platforms.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {jobs.map((j) => (
          <HoverLift key={j.id} y={6}>
            <Link
              href={`/experience#${j.id}`}
              className="experience-card-link"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ExperienceCard job={j} />
            </Link>
          </HoverLift>
        ))}
      </div>
    </SectionReveal>
  );
}
