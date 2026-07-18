"use client";

import { useState, type ReactNode } from "react";
import type { ExperienceJob } from "@/lib/portfolio-data";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { Tabs } from "@/components/ui/Tabs";

export const EXPERIENCE_FILTER_ITEMS = [
  { label: "All", value: "all" },
  { label: "Cloud", value: "cloud" },
  { label: "Integration", value: "integration" },
  { label: "Data", value: "data" },
] as const;

type ExperienceListProps = {
  jobs: ExperienceJob[];
  /** Optional left-side heading rendered beside the filter tabs. */
  heading?: ReactNode;
  /** When false, render the full list without category tabs (M2d highlights). */
  showFilters?: boolean;
};

export function ExperienceList({
  jobs,
  heading,
  showFilters = true,
}: ExperienceListProps) {
  const [filter, setFilter] = useState("all");
  const visible = showFilters
    ? jobs.filter((j) => filter === "all" || j.category === filter)
    : jobs;

  return (
    <div>
      {(heading || showFilters) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: heading ? "space-between" : "flex-end",
            marginBottom: "var(--space-8)",
            flexWrap: "wrap",
            gap: "var(--space-4)",
          }}
        >
          {heading}
          {showFilters && (
            <Tabs
              value={filter}
              onChange={setFilter}
              className="landing-tabs-scroll"
              items={[...EXPERIENCE_FILTER_ITEMS]}
            />
          )}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {visible.map((j) => (
          <ExperienceCard key={j.id} job={j} />
        ))}
      </div>
    </div>
  );
}
