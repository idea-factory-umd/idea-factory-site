import * as React from "react";

/**
 * Idea Factory action button — bold, uppercase Interstate, squared blocks.
 * @startingPoint section="Core" subtitle="Primary / dark / outline / ghost actions" viewport="700x200"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "dark" | "outline" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render as a link or a button. @default "button" */
  as?: "button" | "a";
  href?: string;
  disabled?: boolean;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
