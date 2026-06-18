import React from "react";

/**
 * The Idea Factory logo. Full horizontal lockup (mark + wordmark) or
 * mark-only.
 *
 * TWO tones of the full lockup exist, and choosing correctly is a
 * brand rule:
 *   - tone="color" (default): wordmark in Maryland red — for white or
 *     light backgrounds.
 *   - tone="white": wordmark in white — REQUIRED on dark backgrounds
 *     (black/red footers, dark bands). The mark itself keeps its white
 *     panel + red/gold/black in both tones.
 * The mark-only variant is a single artwork (white panel built in) and
 * works on light and dark.
 *
 * Never recolor, stretch, or distort — pass height and let width scale.
 *
 * `basePath` should point at the project root so the SVG resolves
 * (e.g. "../../" from a component card, "" if assets/ is at the web root).
 */
export function Logo({
  variant = "full",
  tone = "color",
  height,
  basePath = "",
  alt,
  style,
  ...rest
}) {
  const files = {
    full: tone === "white" ? "assets/logo/if-logo-white.svg" : "assets/logo/if-logo.svg",
    mark: "assets/logo/if-mark.svg",
  };
  const src = basePath + (files[variant] || files.full);
  const h = height || (variant === "mark" ? 40 : 44);
  return (
    <img
      src={src}
      alt={alt || "The Idea Factory"}
      style={{ height: h, width: "auto", display: "block", ...style }}
      {...rest}
    />
  );
}
