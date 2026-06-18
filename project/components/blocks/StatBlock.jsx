import React from "react";

/**
 * Big proof-point stat. Oversized Interstate numeral over a short
 * label — the brand leads with evidence (since 1983, $94.8B, 19k jobs).
 * Drop several into an "impact band" with `tone` alternating.
 */
export function StatBlock({
  value,
  label,
  tone = "light",
  align = "left",
  style,
  ...rest
}) {
  const tones = {
    light: { background: "transparent", num: "var(--md-black)", lab: "var(--text-muted)", accent: "var(--md-red)" },
    red:   { background: "var(--md-red)", num: "var(--md-white)", lab: "rgba(255,255,255,0.85)", accent: "var(--md-gold)" },
    dark:  { background: "var(--md-black)", num: "var(--md-white)", lab: "rgba(255,255,255,0.7)", accent: "var(--md-gold)" },
    gold:  { background: "var(--md-gold)", num: "var(--md-black)", lab: "#5c4400", accent: "var(--md-red)" },
  };
  const t = tones[tone] || tones.light;
  return (
    <div
      style={{
        background: t.background,
        padding: tone === "light" ? "0" : "var(--space-6)",
        textAlign: align,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: "var(--weight-black)",
          fontSize: "clamp(44px, 6vw, 72px)",
          lineHeight: 0.95,
          letterSpacing: "var(--tracking-stat)",
          color: t.num,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: "var(--weight-bold)",
          fontSize: "14px",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: t.lab,
          marginTop: "12px",
          borderTop: `var(--border-width-rule) solid ${t.accent}`,
          paddingTop: "12px",
          display: "inline-block",
        }}
      >
        {label}
      </div>
    </div>
  );
}
