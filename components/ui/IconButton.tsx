"use client";

import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { IconButton as DSIconButton } from "@nsoto/portfolio-ui";
import type { IconButtonProps as DSIconButtonProps } from "@nsoto/portfolio-ui";

export type IconButtonProps = DSIconButtonProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "aria-expanded"> & {
    style?: CSSProperties;
  };

export function IconButton(props: IconButtonProps) {
  return <DSIconButton {...props} />;
}
