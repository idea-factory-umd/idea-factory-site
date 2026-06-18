import React from "react";
import { Tag } from "../core/Tag.jsx";

/**
 * Program directory box for the audience pages (e.g. Students). Fully
 * visible, no hover-to-reveal: image · plain-language label (full
 * official name in smaller type) · one factual line · tag(s).
 * No stage glyphs here — kept clean for findability.
 */
export function ProgramCard({
  label,
  fullName,
  line,
  tags = [],
  image,
  href = "#",
  style,
  ...rest
}) {
  return (
    <a
      href={href}
      className="if-card-link"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-card)",
        border: "var(--border-width) solid var(--border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--text-body)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          aspectRatio: "16 / 9",
          background: image
            ? `center/cover no-repeat url(${image})`
            : "repeating-linear-gradient(135deg, var(--gray-100), var(--gray-100) 14px, var(--gray-200) 14px, var(--gray-200) 28px)",
          borderBottom: "var(--border-width) solid var(--border)",
          position: "relative",
        }}
      >
        {!image && (
          <span style={{ position: "absolute", left: 12, bottom: 10, fontFamily: "var(--font-heading)", fontSize: "10px", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-subtle)" }}>
            Photo
          </span>
        )}
      </div>
      <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        <h3 style={{ fontSize: "20px", lineHeight: 1.15, margin: 0, color: "var(--text-strong)", fontWeight: "var(--weight-bold)" }}>
          {label}
        </h3>
        {fullName && (
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "12px", letterSpacing: "0.01em", color: "var(--text-subtle)", textTransform: "uppercase", marginTop: "-4px" }}>
            {fullName}
          </div>
        )}
        {line && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", lineHeight: 1.5, margin: 0, color: "var(--text-muted)" }}>
            {line}
          </p>
        )}
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "8px" }}>
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
