import type { ExperienceJob } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export function ExperienceCard({ job }: { job: ExperienceJob }) {
  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-md)",
              color: "var(--text-primary)",
            }}
          >
            {job.role}
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: "var(--brand)",
            }}
          >
            {job.company}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "var(--space-2)",
          }}
        >
          <Badge tone={job.status === "Current" ? "success" : "neutral"} dot={job.status === "Current"}>
            {job.status}
          </Badge>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-2xs)",
              color: "var(--text-tertiary)",
            }}
          >
            {job.dates}
          </span>
        </div>
      </div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          color: "var(--text-secondary)",
          lineHeight: "var(--leading-normal)",
          margin: 0,
        }}
      >
        {job.detail}
      </p>
      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
        {job.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </Card>
  );
}
