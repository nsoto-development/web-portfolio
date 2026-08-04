"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  paddingLeft: "var(--space-5)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-sm)",
  color: "var(--text-secondary)",
  lineHeight: "var(--leading-normal)",
} as const;

export function ExperienceCard({
  job,
  expandable = false,
  expanded = false,
  onToggle,
}: ExperienceCardProps) {
  const reduce = useReducedMotion();
  const canExpand = expandable && Boolean(job.bullets?.length);
  const bullets = job.bullets;

  const bulletList =
    canExpand && expanded && bullets ? (
      <ul style={bulletListStyle}>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    ) : null;

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
      {reduce ? (
        bulletList
      ) : (
        <AnimatePresence initial={false}>
          {canExpand && expanded && bullets && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOut }}
              style={{ overflow: "hidden" }}
            >
              <ul style={bulletListStyle}>
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {canExpand && (
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
      )}
      {job.stack.length > 0 && (
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
          {job.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      )}
    </Card>
  );
}
