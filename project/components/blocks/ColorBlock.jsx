import React from "react";

/**
 * The core Mondrian layout device — a solid block of brand color that
 * structures content. Compose several edge-to-edge in a grid to build
 * the heroes, stat bands, and stage headers. Accepts any children
 * (headline, glyph, number) and an optional stage numeral.
 */
export function ColorBlock({
  tone = "red",
  children,
  number,
  pad = "var(--space-7)",
  minHeight,
  align = "flex-start",
  justify = "flex-start",
  style,
  ...rest
}) {
  const tones = {
    red:       { background: "var(--md-red)", color: "var(--md-white)" },
    black:     { background: "var(--md-black)", color: "var(--md-white)" },
    gold:      { background: "var(--md-gold)", color: "var(--md-black)" },
    white:     { background: "var(--md-white)", color: "var(--md-black)" },
    redTint:   { background: "var(--red-tint)", color: "var(--md-black)" },
    goldTint:  { background: "var(--gold-tint)", color: "var(--md-black)" },
    gray:      { background: "var(--gray-100)", color: "var(--md-black)" },
  };
  const t = tones[tone] || tones.red;
  return (
    <div
      style={{
        position: "relative",
        background: t.background,
        color: t.color,
        padding: pad,
        minHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...rest}
    >
      {number != null && (
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "var(--weight-black)",
            fontSize: "16px",
            letterSpacing: "var(--tracking-label)",
            opacity: 0.85,
            marginBottom: "8px",
          }}
        >
          {String(number).padStart(2, "0")}
        </span>
      )}
      {children}
    </div>
  );
}
