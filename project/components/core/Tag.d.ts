import * as React from "react";

/**
 * Pill tag (static label) or interactive filter chip.
 * @startingPoint section="Core" subtitle="Tags & filter chips" viewport="700x140"
 */
export interface TagProps {
  children: React.ReactNode;
  /** Render as a pressable filter chip instead of a static label. @default false */
  interactive?: boolean;
  /** Chip pressed/selected state (interactive only). @default false */
  pressed?: boolean;
  /** Color tone for static tags. @default "neutral" */
  tone?: "neutral" | "red" | "gold" | "dark";
  onClick?: () => void;
}

export function Tag(props: TagProps): JSX.Element;
