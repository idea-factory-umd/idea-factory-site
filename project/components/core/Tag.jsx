import React from "react";

/**
 * Pill tag / filter chip. Static tags label program cards
 * (e.g. "Undergraduate", "Funding"); interactive chips drive the
 * Students-page filter.
 */
export function Tag({
  children,
  interactive = false,
  pressed = false,
  tone = "neutral",
  onClick,
  style,
  ...rest
}) {
  const tones = {
    neutral: { background: "var(--gray-100)", color: "var(--text-muted)", borderColor: "var(--gray-200)" },
    red:     { background: "var(--red-tint)", color: "var(--md-red)", borderColor: "var(--red-tint-2)" },
    gold:    { background: "var(--gold-tint)", color: "#7a5b00", borderColor: "var(--gold-tint-2)" },
    dark:    { background: "var(--md-black)", color: "var(--md-white)", borderColor: "var(--md-black)" },
  };

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "var(--font-heading)",
    fontWeight: "var(--weight-bold)",
    fontSize: "12px",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    padding: interactive ? "9px 16px" : "5px 11px",
    borderRadius: "var(--radius-pill)",
    border: "var(--border-width) solid",
    lineHeight: 1,
    cursor: interactive ? "pointer" : "default",
    ...tones[tone],
  };

  if (interactive) {
    return (
      <button
        type="button"
        className="if-chip"
        aria-pressed={pressed}
        onClick={onClick}
        style={{ ...base, background: "var(--md-white)", color: "var(--md-black)", borderColor: "var(--gray-300)", ...style }}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <span className="if-tag" style={{ ...base, ...style }} {...rest}>
      {children}
    </span>
  );
}
