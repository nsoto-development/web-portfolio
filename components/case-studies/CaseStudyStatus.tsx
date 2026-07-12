import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { CaseStudyStatusCallout } from "@/lib/case-studies/types";

type CaseStudyStatusProps = {
  status: CaseStudyStatusCallout;
};

export function CaseStudyStatus({ status }: CaseStudyStatusProps) {
  return (
    <Card
      padding="var(--space-5)"
      style={{
        borderColor: "var(--border-brand-subtle)",
        background: "linear-gradient(135deg, var(--bg-surface) 0%, rgba(10, 158, 250, 0.04) 100%)",
        marginBottom: "var(--space-12)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
        <Badge tone="brand" dot>
          {status.phaseLabel}
        </Badge>
      </div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-md)",
          fontWeight: "var(--weight-semibold)",
          color: "var(--text-primary)",
          margin: "0 0 var(--space-3)",
        }}
      >
        {status.headline}
      </p>
      <p
        className="case-study-prose"
        style={{
          margin: 0,
          fontSize: "var(--text-sm)",
          color: "var(--text-secondary)",
        }}
      >
        {status.body}
      </p>
    </Card>
  );
}
