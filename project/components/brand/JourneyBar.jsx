import React from "react";
import { StageGlyph } from "./StageGlyph.jsx";

/**
 * "You are here" journey bar for program detail pages. Shows all four
 * stages in sequence; the active stage is full color, the rest greyed.
 * Built as one component — set `active` per page.
 */
export function JourneyBar({ active = 1, basePath = "", onSelect, style, ...rest }) {
  const stages = [1, 2, 3, 4];
  return (
    <nav
      aria-label="Ecosystem journey"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2px",
        background: "var(--md-black)",
        border: "var(--border-width-strong) solid var(--md-black)",
        ...style,
      }}
      {...rest}
    >
      {stages.map((n) => {
        const s = StageGlyph.stages[n];
        const isActive = n === active;
        return (
          <button
            key={n}
            type="button"
            className="if-journey-stage"
            aria-current={isActive ? "step" : undefined}
            onClick={onSelect ? () => onSelect(n) : undefined}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              padding: "20px 14px 18px",
              background: isActive ? "var(--md-white)" : "#f7f7f7",
              border: "none",
              cursor: onSelect ? "pointer" : "default",
              opacity: isActive ? 1 : 0.55,
              filter: isActive ? "none" : "grayscale(1)",
            }}
          >
            <StageGlyph stage={n} variant="transparent" size={56} basePath={basePath} />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "var(--weight-bold)",
                fontSize: "11px",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--md-black)",
              }}
            >
              <span style={{ color: "var(--md-red)" }}>{String(n).padStart(2, "0")}</span>{" "}
              {s.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
