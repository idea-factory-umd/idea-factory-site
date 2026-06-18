import React from "react";

/**
 * Idea Factory primary action element. Bold, blocky, squared corners
 * echoing the Mondrian block language. Maryland Red is the default.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  href,
  disabled = false,
  iconAfter,
  iconBefore,
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "var(--font-heading)",
    fontWeight: "var(--weight-bold)",
    letterSpacing: "0.01em",
    textTransform: "uppercase",
    border: "var(--border-width-strong) solid transparent",
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    lineHeight: 1,
    transition: "background var(--dur-fast) var(--ease-std), color var(--dur-fast) var(--ease-std), border-color var(--dur-fast) var(--ease-std), transform var(--dur-fast) var(--ease-std)",
    opacity: disabled ? 0.45 : 1,
    whiteSpace: "nowrap",
  };

  const sizes = {
    sm: { fontSize: "13px", padding: "9px 16px" },
    md: { fontSize: "15px", padding: "13px 24px" },
    lg: { fontSize: "17px", padding: "17px 34px" },
  };

  const variants = {
    primary: { background: "var(--action)", color: "var(--text-on-red)", borderColor: "var(--action)" },
    dark:    { background: "var(--md-black)", color: "var(--md-white)", borderColor: "var(--md-black)" },
    outline: { background: "transparent", color: "var(--md-black)", borderColor: "var(--md-black)" },
    ghost:   { background: "transparent", color: "var(--md-red)", borderColor: "transparent", textTransform: "none", fontFamily: "var(--font-heading)" },
  };

  const cls = `if-btn if-btn--${variant}`;
  const Tag = as === "a" || href ? "a" : "button";

  return (
    <Tag
      className={cls}
      href={href}
      disabled={Tag === "button" ? disabled : undefined}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...rest}
    >
      {iconBefore}
      {children}
      {iconAfter}
    </Tag>
  );
}
