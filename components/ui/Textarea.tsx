"use client";

import type { CSSProperties, TextareaHTMLAttributes } from "react";
import { Textarea as DSTextarea } from "@nsoto/portfolio-ui";
import type { TextareaProps as DSTextareaProps } from "@nsoto/portfolio-ui";

export type TextareaProps = DSTextareaProps &
  Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "required" | "id"> & {
    style?: CSSProperties;
  };

export function Textarea(props: TextareaProps) {
  return <DSTextarea {...props} />;
}
