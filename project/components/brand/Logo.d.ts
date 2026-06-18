import * as React from "react";

/**
 * The Idea Factory logo lockup or mark. The full lockup comes in two
 * tones — red wordmark for light backgrounds, white wordmark for dark
 * backgrounds (using the color tone on dark grounds is a brand-rule
 * violation). The squared mark is one artwork that works on both.
 * @startingPoint section="Brand" subtitle="Logo lockup & mark" viewport="700x180"
 */
export interface LogoProps {
  /** Full horizontal lockup or squared mark. @default "full" */
  variant?: "full" | "mark";
  /**
   * Wordmark tone (full lockup only). Use "white" on dark backgrounds
   * — black, Maryland red, or photography. @default "color"
   */
  tone?: "color" | "white";
  /** Pixel height; width scales automatically. */
  height?: number;
  /** Path prefix to the project root so assets/ resolves. @default "" */
  basePath?: string;
  alt?: string;
}

export function Logo(props: LogoProps): JSX.Element;
