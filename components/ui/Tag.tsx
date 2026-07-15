"use client";

import type { CSSProperties } from "react";
import { Tag as DSTag } from "@nsoto/portfolio-ui";
import type { TagProps as DSTagProps } from "@nsoto/portfolio-ui";

export type TagProps = DSTagProps & {
  style?: CSSProperties;
};

export function Tag(props: TagProps) {
  return <DSTag {...props} />;
}
