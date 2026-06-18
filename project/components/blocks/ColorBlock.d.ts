import * as React from "react";

/**
 * Mondrian color block — the core layout device for heroes and bands.
 * @startingPoint section="Blocks" subtitle="Mondrian color-block primitive" viewport="700x260"
 */
export interface ColorBlockProps {
  /** @default "red" */
  tone?: "red" | "black" | "gold" | "white" | "redTint" | "goldTint" | "gray";
  children?: React.ReactNode;
  /** Optional stage numeral shown top-left (e.g. 1 → "01"). */
  number?: number;
  /** CSS padding. @default "var(--space-7)" */
  pad?: string;
  minHeight?: string | number;
  align?: string;
  justify?: string;
}

export function ColorBlock(props: ColorBlockProps): JSX.Element;
