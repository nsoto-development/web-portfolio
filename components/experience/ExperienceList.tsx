"use client";

import { useState, type ReactNode } from "react";
import {
  experienceFilterItems,
  jobMatchesExperienceFilter,
  type ExperienceJob,
} from "@/lib/portfolio-data";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { Tabs } from "@/components/ui/Tabs";

type ExperienceListProps = {
  jobs: ExperienceJob[];
  /** Optional left-side heading rendered beside the filter tabs. */
  heading?: ReactNode;
  /** When false, render the full list without tech filters (M2d highlights). */
  showFilters?: boolean;
};

export function ExperienceList({
  jobs,
  heading,
  showFilters = true,
}: ExperienceListProps) {
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>("sedgwick");
  const filterItems = experienceFilterItems(jobs);
  const visible = showFilters
    ? jobs.filter((j) => jobMatchesExperienceFilter(j, filter))
    : jobs;
  const effectiveOpenId =
    openId !== null && visible.some((j) => j.id === openId) ? openId : null;

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
              items={filterItems}
            />
          )}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {visible.map((j) => {
          const expandable = Boolean(j.bullets?.length);
          return (
            <ExperienceCard
              key={j.id}
              job={j}
              expandable={expandable}
              expanded={effectiveOpenId === j.id}
              onToggle={() =>
                setOpenId((current) => (current === j.id ? null : j.id))
              }
            />
          );
        })}
      </div>
    </div>
  );
}
