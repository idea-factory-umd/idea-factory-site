import * as React from "react";

/**
 * Oversized proof-point stat (numeral + label) for impact bands.
 * @startingPoint section="Blocks" subtitle="Proof-point statistics" viewport="700x220"
 */
export interface StatBlockProps {
  /** The number, e.g. "$94.8B" or "18,992". */
  value: React.ReactNode;
  /** Short uppercase label under the numeral. */
  label: React.ReactNode;
  /** @default "light" */
  tone?: "light" | "red" | "dark" | "gold";
  /** @default "left" */
  align?: "left" | "center";
}

export function StatBlock(props: StatBlockProps): JSX.Element;
