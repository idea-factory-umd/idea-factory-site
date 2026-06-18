import React from "react";

/**
 * Audience entry box — the primary "way in" on the homepage
 * (Students · Faculty/Researchers · Companies · Partners). A solid
 * color block with a big Interstate label that inverts on hover.
 */
export function AudienceCard({
  title,
  description,
  tone = "red",
  href = "#",
  style,
  ...rest
}) {
  const tones = {
    red:   { background: "var(--md-red)", color: "var(--md-white)" },
    black: { background: "var(--md-black)", color: "var(--md-white)" },
    gold:  { background: "var(--md-gold)", color: "var(--md-black)" },
    white: { background: "var(--md-white)", color: "var(--md-black)", border: "var(--border-width-strong) solid var(--md-black)" },
  };
  const t = tones[tone] || tones.red;
  return (
    <a
      href={href}
      className="if-audience if-card-link"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "var(--space-6)",
        minHeight: "240px",
        padding: "var(--space-6)",
        textDecoration: "none",
        background: t.background,
        color: t.color,
        border: t.border || "var(--border-width-strong) solid transparent",
        ...style,
      }}
      {...rest}
    >
      <h3 style={{ color: "inherit", fontSize: "var(--fs-h2)", lineHeight: 1.05, fontWeight: "var(--weight-black)", margin: 0 }}>
        {title}
      </h3>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
        {description && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", lineHeight: 1.5, margin: 0, color: "inherit", opacity: 0.92, maxWidth: "26ch" }}>
            {description}
          </p>
        )}
        <span aria-hidden="true" style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--weight-black)", fontSize: "28px", lineHeight: 1 }}>
          ››
        </span>
      </div>
    </a>
  );
}
