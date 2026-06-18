import * as React from "react";

/**
 * One of the four stage glyphs with the red→black→gold color story.
 * @startingPoint section="Brand" subtitle="Four-stage glyph system" viewport="700x200"
 */
export interface StageGlyphProps {
  /** 1=Blueprint, 2=Proving Ground, 3=Assembly Line, 4=Scale-Up. @default 1 */
  stage?: 1 | 2 | 3 | 4;
  /** "transparent" inside color blocks; "tiled" (white tile) on dark/colored grounds. @default "transparent" */
  variant?: "transparent" | "tiled";
  /** Square pixel size. @default 96 */
  size?: number;
  /** Path prefix to project root so assets/ resolves. @default "" */
  basePath?: string;
}

export function StageGlyph(props: StageGlyphProps): JSX.Element;
