"use client";

import type { CSSProperties } from "react";
import { Tabs as DSTabs } from "@nsoto/portfolio-ui";
import type { TabsProps as DSTabsProps } from "@nsoto/portfolio-ui";

export type TabsProps = DSTabsProps & {
  /** App layout helper (e.g. horizontal scroll on small screens). */
  className?: string;
  style?: CSSProperties;
};

/** Wraps kit Tabs; optional className is hub layout only (not kit chrome). */
export function Tabs({ className, style, ...props }: TabsProps) {
  const tabs = <DSTabs {...props} style={style} />;
  if (!className) return tabs;
  return <div className={className}>{tabs}</div>;
}
