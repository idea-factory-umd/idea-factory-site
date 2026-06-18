import React from "react";

/**
 * Text input. Squared, hairline border with a red focus underline
 * (echoes the heavy brand rules). Serif body text for legibility.
 */
export function Input({ label, id, hint, type = "text", style, ...rest }) {
  return (
    <label htmlFor={id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--weight-bold)", fontSize: "13px", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {label}
        </span>
      )}
      <input
        id={id}
        type={type}
        className="if-input"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--fs-body)",
          color: "var(--text-body)",
          background: "var(--md-white)",
          border: "var(--border-width) solid var(--gray-300)",
          borderRadius: "var(--radius-md)",
          padding: "12px 14px",
          ...style,
        }}
        {...rest}
      />
      {hint && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-small)", color: "var(--text-subtle)" }}>{hint}</span>
      )}
    </label>
  );
}
