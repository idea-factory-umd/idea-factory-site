import * as React from "react";

/**
 * Identity-band search field; collapses to an icon on mobile.
 * @startingPoint section="Forms" subtitle="Search field" viewport="700x120"
 */
export interface SearchFieldProps {
  placeholder?: string;
  /** Icon-only collapsed state for mobile. @default false */
  compact?: boolean;
}

export function SearchField(props: SearchFieldProps): JSX.Element;
