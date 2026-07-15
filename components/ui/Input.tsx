"use client";

import type { CSSProperties, InputHTMLAttributes } from "react";
import { Input as DSInput } from "@nsoto/portfolio-ui";
import type { InputProps as DSInputProps } from "@nsoto/portfolio-ui";

export type InputProps = DSInputProps &
  Pick<InputHTMLAttributes<HTMLInputElement>, "name" | "required" | "id" | "autoComplete"> & {
    style?: CSSProperties;
  };

export function Input(props: InputProps) {
  return <DSInput {...props} />;
}
