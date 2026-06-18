import * as React from "react";

/**
 * Program directory box for audience pages (image, label, full name, line, tags).
 * @startingPoint section="Cards" subtitle="Program directory box" viewport="700x420"
 */
export interface ProgramCardProps {
  /** Short plain-language label, e.g. "Hinman CEOs". */
  label: React.ReactNode;
  /** Full official name in smaller type (optional). */
  fullName?: React.ReactNode;
  /** One factual line, always visible. */
  line?: React.ReactNode;
  /** Tag labels (Undergraduate · Graduate · Online · Funding · Community & space). */
  tags?: string[];
  /** Image URL; omit for a hatched placeholder marked "Photo". */
  image?: string;
  href?: string;
}

export function ProgramCard(props: ProgramCardProps): JSX.Element;
