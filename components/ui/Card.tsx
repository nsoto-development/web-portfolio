"use client";

import type { CSSProperties } from "react";
import { Card as DSCard } from "@nsoto/portfolio-ui";
import type { CardProps as DSCardProps } from "@nsoto/portfolio-ui";

export type CardProps = DSCardProps & {
  style?: CSSProperties;
};

export function Card(props: CardProps) {
  return <DSCard {...props} />;
}
