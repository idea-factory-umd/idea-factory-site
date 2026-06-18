import React from "react";

/**
 * One of the four stage glyphs (Blueprint → Proving Ground →
 * Assembly Line → Scale-Up), built from the logo's block language
 * with the red→black→gold color story. Transparent set sits inside
 * color blocks; tiled (white-tile) set sits on dark/colored grounds.
 */
const STAGES = {
  1: { name: "Blueprint", tagline: "Learn to think like a builder.", file: "stage-01-blueprint" },
  2: { name: "Proving Ground", tagline: "Where your idea meets the real world.", file: "stage-02-proving-ground" },
  3: { name: "Assembly Line", tagline: "This is where companies get built.", file: "stage-03-assembly-line" },
  4: { name: "Scale-Up", tagline: "Where it takes off.", file: "stage-04-scale-up" },
};

export function StageGlyph({
  stage = 1,
  variant = "transparent",
  size = 96,
  basePath = "",
  style,
  ...rest
}) {
  const s = STAGES[stage] || STAGES[1];
  const suffix = variant === "tiled" ? "-tile" : "";
  const src = `${basePath}assets/glyphs/${s.file}${suffix}.svg`;
  return (
    <img
      src={src}
      alt={`Stage ${String(stage).padStart(2, "0")} — ${s.name}`}
      width={size}
      height={size}
      style={{ display: "block", ...style }}
      {...rest}
    />
  );
}

StageGlyph.stages = STAGES;
