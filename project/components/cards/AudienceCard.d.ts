import * as React from "react";

/**
 * Audience entry box — the homepage "way in" for each audience.
 * @startingPoint section="Cards" subtitle="Audience entry box" viewport="700x300"
 */
export interface AudienceCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** @default "red" */
  tone?: "red" | "black" | "gold" | "white";
  href?: string;
}

export function AudienceCard(props: AudienceCardProps): JSX.Element;
