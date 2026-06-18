import * as React from "react";

/**
 * "You are here" journey bar — all four stages, active one lit.
 * @startingPoint section="Brand" subtitle="Program-page wayfinding" viewport="700x160"
 */
export interface JourneyBarProps {
  /** The lit stage. @default 1 */
  active?: 1 | 2 | 3 | 4;
  /** Path prefix to project root so glyph assets resolve. @default "" */
  basePath?: string;
  /** Optional click handler (n => …) to make stages navigable. */
  onSelect?: (stage: number) => void;
}

export function JourneyBar(props: JourneyBarProps): JSX.Element;
