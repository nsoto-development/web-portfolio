import type { ReactNode } from "react";
import { OptionsTable } from "@/components/case-studies/OptionsTable";
import type { CaseStudy, CaseStudySection } from "@/lib/case-studies/types";

const inlinePattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function parseInline(text: string): ReactNode[] {
  const parts = text.split(inlinePattern).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="case-study-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const external = href.startsWith("http");
      return (
        <a key={i} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {label}
        </a>
      );
    }
    return part;
  });
}

function CaseStudyProse({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/);

  return (
    <div className="case-study-prose">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((line) => line.replace(/^- /, ""));
          return (
            <ul key={i}>
              {items.map((item) => (
                <li key={item}>{parseInline(item)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{parseInline(trimmed)}</p>;
      })}
    </div>
  );
}

type CaseStudySectionProps = {
  section: CaseStudySection;
  study: CaseStudy;
};

export function CaseStudySectionBlock({ section, study }: CaseStudySectionProps) {
  return (
    <section id={section.id} className="case-study-section">
      <p className="case-study-eyebrow">{section.eyebrow}</p>
      <h2 className="case-study-heading">{section.heading}</h2>
      {section.body && section.kind !== "constraints" && <CaseStudyProse body={section.body} />}
      {section.kind === "constraints" && (
        <OptionsTable mode="constraints" rows={study.constraints} />
      )}
      {section.kind === "options" && (
        <OptionsTable mode="options" rows={study.options} />
      )}
      {section.bullets && (
        <ul className="case-study-prose case-study-bullets">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{parseInline(bullet)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
