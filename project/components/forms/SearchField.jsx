import React from "react";

/**
 * Family-wide search field that lives in the identity band. On mobile
 * it collapses to an icon-only button (set `compact`). Visual element
 * only in mockups — the real search carries over from the site family.
 */
export function SearchField({ placeholder = "Search the Idea Factory", compact = false, style, ...rest }) {
  const Glass = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  if (compact) {
    return (
      <button type="button" aria-label="Search" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, background: "transparent", border: "none", color: "var(--md-black)", cursor: "pointer", ...style }} {...rest}>
        {Glass}
      </button>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "var(--md-white)",
        border: "var(--border-width) solid var(--gray-300)",
        borderRadius: "var(--radius-md)",
        padding: "0 14px",
        color: "var(--text-subtle)",
        ...style,
      }}
    >
      <input
        type="search"
        placeholder={placeholder}
        className="if-input"
        style={{ border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-body)", padding: "12px 0", minWidth: "220px" }}
        {...rest}
      />
      {Glass}
    </div>
  );
}
