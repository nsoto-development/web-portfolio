import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/landing/Footer";
import { CaseStudySectionBlock } from "@/components/case-studies/CaseStudySection";
import { CaseStudyStatus } from "@/components/case-studies/CaseStudyStatus";
import type { CaseStudy } from "@/lib/case-studies/types";

type CaseStudyLayoutProps = {
  study: CaseStudy;
};

export function CaseStudyLayout({ study }: CaseStudyLayoutProps) {
  return (
    <>
      <SiteNav />
      <main className="case-study-main">
        <article className="case-study-article">
          <header className="case-study-header">
            <p className="case-study-eyebrow">{"</ CASE STUDY >"}</p>
            <h1 className="case-study-title">{study.title}</h1>
            <p className="case-study-subtitle">{study.subtitle}</p>
            <p className="case-study-meta">
              Updated{" "}
              <time dateTime={study.lastUpdated}>
                {new Date(study.lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          </header>
          <CaseStudyStatus status={study.status} />
          {study.sections.map((section) => (
            <CaseStudySectionBlock key={section.id} section={section} study={study} />
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
