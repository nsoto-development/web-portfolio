"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ExperienceJob } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

type ExperienceCardProps = {
  job: ExperienceJob;
  /** When true and the job has bullets, show the expand control. Off on landing. */
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const bulletListStyle = {
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-sm)",
  color: "var(--text-secondary)",
  lineHeight: "var(--leading-normal)",
} as const;

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul style={bulletListStyle}>
      {bullets.map((bullet) => (
        <li
          key={bullet}
          style={{
            display: "flex",
            gap: "var(--space-2)",
            alignItems: "flex-start",
          }}
        >
          <span
            aria-hidden
            style={{
              flexShrink: 0,
              color: "var(--brand)",
              fontFamily: "var(--font-mono)",
              lineHeight: "inherit",
            }}
          >
            –
          </span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceCard({
  job,
  expandable = false,
  expanded = false,
  onToggle,
}: ExperienceCardProps) {
  const reduce = useReducedMotion();
  const canExpand = expandable && Boolean(job.bullets?.length);
  const bullets = job.bullets;

  return (
    <div id={job.id} className="experience-card-anchor">
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
      {canExpand && bullets && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {reduce ? (
            expanded ? (
              <div style={{ marginBottom: "var(--space-3)" }}>
                <BulletList bullets={bullets} />
              </div>
            ) : null
          ) : (
            <motion.div
              initial={false}
              animate={{
                gridTemplateRows: expanded ? "1fr" : "0fr",
                opacity: expanded ? 1 : 0,
              }}
              transition={{
                gridTemplateRows: { duration: 0.35, ease: easeOut },
                opacity: { duration: 0.2, ease: easeOut },
              }}
              style={{ display: "grid" }}
              aria-hidden={!expanded}
            >
              {/* Spacing lives inside the clip so collapsed height stays 0 (no flex-gap jump). */}
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <div style={{ paddingBottom: "var(--space-3)" }}>
                  <BulletList bullets={bullets} />
                </div>
              </div>
            </motion.div>
          )}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-1)",
              alignSelf: "flex-start",
              padding: 0,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              color: "var(--brand)",
            }}
          >
            {expanded ? "Hide details" : "Show details"}
            <ChevronDown
              size={14}
              aria-hidden
              style={{
                transform: expanded ? "rotate(180deg)" : "none",
                transition: reduce ? undefined : "transform 150ms ease",
              }}
            />
          </button>
        </div>
      )}
      {job.stack.length > 0 && (
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
          {job.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      )}
      </Card>
    </div>
  );
}
