/* @ds-bundle: {"format":3,"namespace":"IdeaFactoryDesignSystem_745a71","components":[{"name":"ColorBlock","sourcePath":"components/blocks/ColorBlock.jsx"},{"name":"StatBlock","sourcePath":"components/blocks/StatBlock.jsx"},{"name":"JourneyBar","sourcePath":"components/brand/JourneyBar.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"StageGlyph","sourcePath":"components/brand/StageGlyph.jsx"},{"name":"AudienceCard","sourcePath":"components/cards/AudienceCard.jsx"},{"name":"ProgramCard","sourcePath":"components/cards/ProgramCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"}],"sourceHashes":{"components/blocks/ColorBlock.jsx":"a4a81c245e6e","components/blocks/StatBlock.jsx":"334bb551356a","components/brand/JourneyBar.jsx":"b36b809b3f31","components/brand/Logo.jsx":"aa45c8a2dce5","components/brand/StageGlyph.jsx":"8678dcddbb7d","components/cards/AudienceCard.jsx":"a24f14d0adaf","components/cards/ProgramCard.jsx":"293982ed5f6f","components/core/Button.jsx":"62e37235d074","components/core/Tag.jsx":"4118e0ebeead","components/forms/Input.jsx":"fb63b28c8d87","components/forms/SearchField.jsx":"f2030449b238","ui_kits/website/Footer.jsx":"06757c30f589","ui_kits/website/Header.jsx":"2fa33e39ddc4","ui_kits/website/Homepage.jsx":"2641f259e585","ui_kits/website/LogoInline.jsx":"b8ab721f5b18","ui_kits/website/StageGlyphInline.jsx":"bd512bd37fd4","ui_kits/website/StudentsPage.jsx":"d7dfb6a97626","ui_kits/website/data.js":"abdb76a7ab9f","ui_kits/website/image-slot.js":"9309434cb09c","ui_kits/website/tweaks-panel.jsx":"6591467622ed","webflow-export/idea-factory.js":"39de0e4a469a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.IdeaFactoryDesignSystem_745a71 = window.IdeaFactoryDesignSystem_745a71 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/blocks/ColorBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The core Mondrian layout device — a solid block of brand color that
 * structures content. Compose several edge-to-edge in a grid to build
 * the heroes, stat bands, and stage headers. Accepts any children
 * (headline, glyph, number) and an optional stage numeral.
 */
function ColorBlock({
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
    red: {
      background: "var(--md-red)",
      color: "var(--md-white)"
    },
    black: {
      background: "var(--md-black)",
      color: "var(--md-white)"
    },
    gold: {
      background: "var(--md-gold)",
      color: "var(--md-black)"
    },
    white: {
      background: "var(--md-white)",
      color: "var(--md-black)"
    },
    redTint: {
      background: "var(--red-tint)",
      color: "var(--md-black)"
    },
    goldTint: {
      background: "var(--gold-tint)",
      color: "var(--md-black)"
    },
    gray: {
      background: "var(--gray-100)",
      color: "var(--md-black)"
    }
  };
  const t = tones[tone] || tones.red;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      background: t.background,
      color: t.color,
      padding: pad,
      minHeight,
      display: "flex",
      flexDirection: "column",
      alignItems: align,
      justifyContent: justify,
      ...style
    }
  }, rest), number != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: "var(--weight-black)",
      fontSize: "16px",
      letterSpacing: "var(--tracking-label)",
      opacity: 0.85,
      marginBottom: "8px"
    }
  }, String(number).padStart(2, "0")), children);
}
Object.assign(__ds_scope, { ColorBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/ColorBlock.jsx", error: String((e && e.message) || e) }); }

// components/blocks/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Big proof-point stat. Oversized Interstate numeral over a short
 * label — the brand leads with evidence (since 1983, $94.8B, 19k jobs).
 * Drop several into an "impact band" with `tone` alternating.
 */
function StatBlock({
  value,
  label,
  tone = "light",
  align = "left",
  style,
  ...rest
}) {
  const tones = {
    light: {
      background: "transparent",
      num: "var(--md-black)",
      lab: "var(--text-muted)",
      accent: "var(--md-red)"
    },
    red: {
      background: "var(--md-red)",
      num: "var(--md-white)",
      lab: "rgba(255,255,255,0.85)",
      accent: "var(--md-gold)"
    },
    dark: {
      background: "var(--md-black)",
      num: "var(--md-white)",
      lab: "rgba(255,255,255,0.7)",
      accent: "var(--md-gold)"
    },
    gold: {
      background: "var(--md-gold)",
      num: "var(--md-black)",
      lab: "#5c4400",
      accent: "var(--md-red)"
    }
  };
  const t = tones[tone] || tones.light;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: t.background,
      padding: tone === "light" ? "0" : "var(--space-6)",
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: "var(--weight-black)",
      fontSize: "clamp(44px, 6vw, 72px)",
      lineHeight: 0.95,
      letterSpacing: "var(--tracking-stat)",
      color: t.num
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: "var(--weight-bold)",
      fontSize: "14px",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: t.lab,
      marginTop: "12px",
      borderTop: `var(--border-width-rule) solid ${t.accent}`,
      paddingTop: "12px",
      display: "inline-block"
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Logo({
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
    mark: "assets/logo/if-mark.svg"
  };
  const src = basePath + (files[variant] || files.full);
  const h = height || (variant === "mark" ? 40 : 44);
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt || "The Idea Factory",
    style: {
      height: h,
      width: "auto",
      display: "block",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/StageGlyph.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * One of the four stage glyphs (Blueprint → Proving Ground →
 * Assembly Line → Scale-Up), built from the logo's block language
 * with the red→black→gold color story. Transparent set sits inside
 * color blocks; tiled (white-tile) set sits on dark/colored grounds.
 */
const STAGES = {
  1: {
    name: "Blueprint",
    tagline: "Learn to think like a builder.",
    file: "stage-01-blueprint"
  },
  2: {
    name: "Proving Ground",
    tagline: "Where your idea meets the real world.",
    file: "stage-02-proving-ground"
  },
  3: {
    name: "Assembly Line",
    tagline: "This is where companies get built.",
    file: "stage-03-assembly-line"
  },
  4: {
    name: "Scale-Up",
    tagline: "Where it takes off.",
    file: "stage-04-scale-up"
  }
};
function StageGlyph({
  stage = 1,
  variant = "transparent",
  size = 96,
  basePath = "",
  style,
  ...rest
}) {
  const s = STAGES[stage] || STAGES[1];
  const suffix = variant === "tiled" ? "-tile" : "";
  const src = `${basePath}assets/glyphs/${s.file}${suffix}.svg`;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: `Stage ${String(stage).padStart(2, "0")} — ${s.name}`,
    width: size,
    height: size,
    style: {
      display: "block",
      ...style
    }
  }, rest));
}
StageGlyph.stages = STAGES;
Object.assign(__ds_scope, { StageGlyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/StageGlyph.jsx", error: String((e && e.message) || e) }); }

// components/brand/JourneyBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * "You are here" journey bar for program detail pages. Shows all four
 * stages in sequence; the active stage is full color, the rest greyed.
 * Built as one component — set `active` per page.
 */
function JourneyBar({
  active = 1,
  basePath = "",
  onSelect,
  style,
  ...rest
}) {
  const stages = [1, 2, 3, 4];
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Ecosystem journey",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "2px",
      background: "var(--md-black)",
      border: "var(--border-width-strong) solid var(--md-black)",
      ...style
    }
  }, rest), stages.map(n => {
    const s = __ds_scope.StageGlyph.stages[n];
    const isActive = n === active;
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      type: "button",
      className: "if-journey-stage",
      "aria-current": isActive ? "step" : undefined,
      onClick: onSelect ? () => onSelect(n) : undefined,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px 14px 18px",
        background: isActive ? "var(--md-white)" : "#f7f7f7",
        border: "none",
        cursor: onSelect ? "pointer" : "default",
        opacity: isActive ? 1 : 0.55,
        filter: isActive ? "none" : "grayscale(1)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.StageGlyph, {
      stage: n,
      variant: "transparent",
      size: 56,
      basePath: basePath
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: "var(--weight-bold)",
        fontSize: "11px",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: "var(--md-black)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--md-red)"
      }
    }, String(n).padStart(2, "0")), " ", s.name));
  }));
}
Object.assign(__ds_scope, { JourneyBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/JourneyBar.jsx", error: String((e && e.message) || e) }); }

// components/cards/AudienceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Audience entry box — the primary "way in" on the homepage
 * (Students · Faculty/Researchers · Companies · Partners). A solid
 * color block with a big Interstate label that inverts on hover.
 */
function AudienceCard({
  title,
  description,
  tone = "red",
  href = "#",
  style,
  ...rest
}) {
  const tones = {
    red: {
      background: "var(--md-red)",
      color: "var(--md-white)"
    },
    black: {
      background: "var(--md-black)",
      color: "var(--md-white)"
    },
    gold: {
      background: "var(--md-gold)",
      color: "var(--md-black)"
    },
    white: {
      background: "var(--md-white)",
      color: "var(--md-black)",
      border: "var(--border-width-strong) solid var(--md-black)"
    }
  };
  const t = tones[tone] || tones.red;
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: "if-audience if-card-link",
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: "inherit",
      fontSize: "var(--fs-h2)",
      lineHeight: 1.05,
      fontWeight: "var(--weight-black)",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "16px"
    }
  }, description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-body)",
      lineHeight: 1.5,
      margin: 0,
      color: "inherit",
      opacity: 0.92,
      maxWidth: "26ch"
    }
  }, description), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: "var(--weight-black)",
      fontSize: "28px",
      lineHeight: 1
    }
  }, "\u203A\u203A")));
}
Object.assign(__ds_scope, { AudienceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/AudienceCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Idea Factory primary action element. Bold, blocky, squared corners
 * echoing the Mondrian block language. Maryland Red is the default.
 */
function Button({
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
    whiteSpace: "nowrap"
  };
  const sizes = {
    sm: {
      fontSize: "13px",
      padding: "9px 16px"
    },
    md: {
      fontSize: "15px",
      padding: "13px 24px"
    },
    lg: {
      fontSize: "17px",
      padding: "17px 34px"
    }
  };
  const variants = {
    primary: {
      background: "var(--action)",
      color: "var(--text-on-red)",
      borderColor: "var(--action)"
    },
    dark: {
      background: "var(--md-black)",
      color: "var(--md-white)",
      borderColor: "var(--md-black)"
    },
    outline: {
      background: "transparent",
      color: "var(--md-black)",
      borderColor: "var(--md-black)"
    },
    ghost: {
      background: "transparent",
      color: "var(--md-red)",
      borderColor: "transparent",
      textTransform: "none",
      fontFamily: "var(--font-heading)"
    }
  };
  const cls = `if-btn if-btn--${variant}`;
  const Tag = as === "a" || href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    href: href,
    disabled: Tag === "button" ? disabled : undefined,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, rest), iconBefore, children, iconAfter);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pill tag / filter chip. Static tags label program cards
 * (e.g. "Undergraduate", "Funding"); interactive chips drive the
 * Students-page filter.
 */
function Tag({
  children,
  interactive = false,
  pressed = false,
  tone = "neutral",
  onClick,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      background: "var(--gray-100)",
      color: "var(--text-muted)",
      borderColor: "var(--gray-200)"
    },
    red: {
      background: "var(--red-tint)",
      color: "var(--md-red)",
      borderColor: "var(--red-tint-2)"
    },
    gold: {
      background: "var(--gold-tint)",
      color: "#7a5b00",
      borderColor: "var(--gold-tint-2)"
    },
    dark: {
      background: "var(--md-black)",
      color: "var(--md-white)",
      borderColor: "var(--md-black)"
    }
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
    ...tones[tone]
  };
  if (interactive) {
    return /*#__PURE__*/React.createElement("button", _extends({
      type: "button",
      className: "if-chip",
      "aria-pressed": pressed,
      onClick: onClick,
      style: {
        ...base,
        background: "var(--md-white)",
        color: "var(--md-black)",
        borderColor: "var(--gray-300)",
        ...style
      }
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "if-tag",
    style: {
      ...base,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProgramCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Program directory box for the audience pages (e.g. Students). Fully
 * visible, no hover-to-reveal: image · plain-language label (full
 * official name in smaller type) · one factual line · tag(s).
 * No stage glyphs here — kept clean for findability.
 */
function ProgramCard({
  label,
  fullName,
  line,
  tags = [],
  image,
  href = "#",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: "if-card-link",
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      border: "var(--border-width) solid var(--border)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      textDecoration: "none",
      color: "var(--text-body)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16 / 9",
      background: image ? `center/cover no-repeat url(${image})` : "repeating-linear-gradient(135deg, var(--gray-100), var(--gray-100) 14px, var(--gray-200) 14px, var(--gray-200) 28px)",
      borderBottom: "var(--border-width) solid var(--border)",
      position: "relative"
    }
  }, !image && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      bottom: 10,
      fontFamily: "var(--font-heading)",
      fontSize: "10px",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-subtle)"
    }
  }, "Photo")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "20px",
      lineHeight: 1.15,
      margin: 0,
      color: "var(--text-strong)",
      fontWeight: "var(--weight-bold)"
    }
  }, label), fullName && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontSize: "12px",
      letterSpacing: "0.01em",
      color: "var(--text-subtle)",
      textTransform: "uppercase",
      marginTop: "-4px"
    }
  }, fullName), line && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-body)",
      lineHeight: 1.5,
      margin: 0,
      color: "var(--text-muted)"
    }
  }, line), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "auto",
      paddingTop: "8px"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t)))));
}
Object.assign(__ds_scope, { ProgramCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProgramCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input. Squared, hairline border with a red focus underline
 * (echoes the heavy brand rules). Serif body text for legibility.
 */
function Input({
  label,
  id,
  hint,
  type = "text",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: "var(--weight-bold)",
      fontSize: "13px",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    className: "if-input",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      background: "var(--md-white)",
      border: "var(--border-width) solid var(--gray-300)",
      borderRadius: "var(--radius-md)",
      padding: "12px 14px",
      ...style
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-small)",
      color: "var(--text-subtle)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Family-wide search field that lives in the identity band. On mobile
 * it collapses to an icon-only button (set `compact`). Visual element
 * only in mockups — the real search carries over from the site family.
 */
function SearchField({
  placeholder = "Search the Idea Factory",
  compact = false,
  style,
  ...rest
}) {
  const Glass = /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  }));
  if (compact) {
    return /*#__PURE__*/React.createElement("button", _extends({
      type: "button",
      "aria-label": "Search",
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        background: "transparent",
        border: "none",
        color: "var(--md-black)",
        cursor: "pointer",
        ...style
      }
    }, rest), Glass);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      background: "var(--md-white)",
      border: "var(--border-width) solid var(--gray-300)",
      borderRadius: "var(--radius-md)",
      padding: "0 14px",
      color: "var(--text-subtle)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "search",
    placeholder: placeholder,
    className: "if-input",
    style: {
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      padding: "12px 0",
      minWidth: "220px"
    }
  }, rest)), Glass);
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Footer.jsx — editorial footer: gold Mondrian accent strip, a bold
// "Have an idea?" CTA band, structured link columns, newsletter + social.
// Reads tweak values off window.IF_TWEAKS (set by App) for live exploration.
const {
  Button: IFButton
} = window.IdeaFactoryDesignSystem_745a71;
function IFFooter({
  onNav,
  basePath = "../../",
  tweaks
}) {
  const t = tweaks || {};
  const allInterstate = t.footerFont !== "mixed"; // default: all Interstate
  const bg = t.footerBg === "red" ? "var(--md-red)" : "var(--md-black)";
  const showCta = t.footerCta !== false;
  const accent = t.footerAccent === false ? null : t.footerAccent === "red" ? "var(--md-red)" : "var(--md-gold)";

  // Body/utility text face — Interstate (tight, uppercase-friendly) by default;
  // Georgia only when the "mixed" option is chosen.
  const bodyFace = allInterstate ? "var(--font-heading)" : "var(--font-body)";

  // Address block ("under the logos"): refined, widely-tracked light caps —
  // softer than heavy uppercase.
  const addrStyle = {
    fontFamily: "var(--font-heading)",
    fontWeight: 400,
    fontSize: "12.5px",
    lineHeight: 1.9,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontStyle: "normal",
    color: "rgba(255,255,255,0.62)"
  };

  // Anchor the gold vertical line so it terminates at the "Give" button's baseline
  // (re-measured on any layout-affecting change), rather than running to the footer floor.
  const giveRef = React.useRef(null);
  const barRef = React.useRef(null);
  const footerRef = React.useRef(null);
  const ctaHeadRef = React.useRef(null);
  const colsRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const give = giveRef.current,
      bar = barRef.current,
      foot = footerRef.current;
    if (!give || !bar || !foot) return;
    const measure = () => {
      const fb = foot.getBoundingClientRect();
      const gb = give.getBoundingClientRect();
      const cols = colsRef.current;
      // When the footer stacks, the nav columns drop BELOW the Give button — extend
      // the gold line to whichever sits lower so it reaches the lowest nav item.
      const bottom = Math.max(gb.bottom, cols ? cols.getBoundingClientRect().bottom : 0);
      const h = Math.round(bottom - fb.top);
      if (h > 0) bar.style.height = h + "px"; // never strand at 0 — keep the 70% fallback until a real measurement
    };
    measure();
    requestAnimationFrame(measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(foot);
    ro.observe(give);
    if (colsRef.current) ro.observe(colsRef.current);
    return () => ro.disconnect();
  }, [showCta, accent, allInterstate]);

  // "Have an idea? Let's build it." — same treatment as the homepage's
  // "One place. Every stage.": descends from above, fades in from transparent,
  // accelerates into place (easeInQuint), then holds. Off for reduced-motion.
  React.useEffect(() => {
    const el = ctaHeadRef.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const settleTop = vh * 0.62; // settles when the headline's top reaches ~62% down the viewport
      const span = Math.max(1, vh - settleTop);
      let p = (vh - rect.top) / span; // 0 as it enters → 1 at the settle point, then held
      p = Math.max(0, Math.min(1, p));
      const opacity = 1 - (1 - p) * (1 - p); // easeOutQuad fade-in (no positional movement)
      el.style.opacity = opacity.toFixed(3);
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [showCta]);
  const linkGroups = [{
    head: "Explore",
    links: ["Students", "Faculty/Researchers", "Companies", "Partners"]
  }, {
    head: "Discover",
    links: ["News", "Events", "Archives", "Impact"]
  }, {
    head: "Visit",
    links: ["About", "Directions", "Timeline", "Contact"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    ref: footerRef,
    style: {
      background: bg,
      color: "var(--md-white)",
      position: "relative",
      "--brand-col": "calc((min(100vw, var(--container)) - 2 * var(--gutter) - var(--grid-gap)) / 2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      height: "100%",
      margin: "0 auto",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: barRef,
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "16px",
      height: "70%",
      background: "var(--md-gold)",
      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 2.8px), 0 100%)"
    }
  }))), accent && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      display: "flex",
      height: "8px",
      position: "relative",
      zIndex: 5,
      boxShadow: "0 3px 5px rgba(0,0,0,0.38)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 5,
      background: accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 2,
      background: "var(--md-white)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 3,
      background: accent === "var(--md-gold)" ? "var(--md-red)" : "var(--md-gold)"
    }
  })), showCta && /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid rgba(255,255,255,0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "0 calc(var(--gutter) + 40px) 0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "if-foot-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "var(--brand-col) minmax(0, 1fr)",
      gap: "var(--grid-gap)",
      alignItems: "center",
      padding: "clamp(40px, 5vw, 72px) 0"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    ref: ctaHeadRef,
    className: "if-foot-minw if-foot-cta-head",
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "clamp(34px, 5.65vw, 52px)",
      lineHeight: 0.95,
      letterSpacing: "-0.02em",
      color: "var(--md-white)",
      margin: 0,
      maxWidth: "max-content",
      willChange: "opacity"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, "Have an idea?"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--md-gold)",
      whiteSpace: "nowrap"
    }
  }, "Let's build it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: bodyFace,
      fontSize: allInterstate ? "15px" : "16px",
      lineHeight: 1.5,
      color: "rgba(255,255,255,0.78)",
      margin: 0,
      letterSpacing: allInterstate ? "0.01em" : 0
    }
  }, "Get the programs, deadlines, and events that turn ideas into companies \u2014 straight to your inbox."), /*#__PURE__*/React.createElement("div", {
    className: "if-subscribe-row",
    style: {
      display: "flex",
      gap: "10px",
      flexWrap: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "you@umd.edu",
    "aria-label": "Email address",
    onFocus: e => {
      e.currentTarget.style.outline = "none";
      e.currentTarget.style.background = "var(--md-gold)";
      e.currentTarget.style.color = "var(--md-black)";
      e.currentTarget.style.borderColor = "var(--md-gold)";
    },
    onBlur: e => {
      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      e.currentTarget.style.color = "var(--md-white)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
    },
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 500,
      fontSize: "15px",
      padding: "12px 16px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.06)",
      color: "var(--md-white)",
      flex: "1 1 0",
      minWidth: 0,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement(IFButton, {
    variant: "primary",
    style: {
      flexShrink: 0,
      whiteSpace: "nowrap",
      borderRadius: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-btn-text"
  }, "Get updates"))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "clamp(40px, 5vw, 64px) calc(var(--gutter) + 40px) clamp(40px, 5vw, 64px) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "if-foot-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "var(--brand-col) minmax(0, 1fr)",
      gap: "var(--grid-gap)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "if-foot-brand",
    style: {
      maxWidth: "460px",
      width: "fit-content"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "if-foot-minw if-foot-logos",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-logo-link",
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(window.IFLogoInline, {
    className: "if-logo-mark",
    tone: "white",
    height: 44
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 1,
      alignSelf: "stretch",
      background: "rgba(255,255,255,0.25)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "if-logo-link",
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "if-logo-mark",
    src: `${basePath}assets/logo/umd-primary-white.svg`,
    alt: "University of Maryland",
    style: {
      height: 30,
      width: "auto",
      display: "block"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      marginTop: "20px",
      maxWidth: "38ch",
      ...addrStyle
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, "A. James Clark School of Engineering"), /*#__PURE__*/React.createElement("br", null), "University of Maryland", /*#__PURE__*/React.createElement("br", null), "College Park, MD 20742"), /*#__PURE__*/React.createElement("div", {
    className: "if-foot-minw",
    style: {
      display: "flex",
      gap: "12px",
      marginTop: "24px",
      alignItems: "center",
      flexWrap: "wrap",
      width: "100%"
    },
    "aria-label": "Social"
  }, ["X", "in", "f", "IG"].map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    className: "if-social",
    style: {
      width: 40,
      height: 40,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid rgba(255,255,255,0.3)",
      color: "var(--md-white)",
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "13px",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-btn-text"
  }, s))), /*#__PURE__*/React.createElement("a", {
    ref: giveRef,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("home");
    },
    className: "if-give",
    style: {
      flex: "1 1 auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      height: 40,
      padding: "0 18px",
      marginLeft: "4px",
      background: "var(--md-gold)",
      color: "var(--md-black)",
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "13px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-btn-text"
  }, "Give ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u203A\u203A"))))), /*#__PURE__*/React.createElement("div", {
    ref: colsRef,
    className: "if-foot-cols",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "clamp(16px, 2.4vw, 36px)"
    }
  }, linkGroups.map(g => /*#__PURE__*/React.createElement("nav", {
    key: g.head
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "12px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--md-gold)",
      marginBottom: "16px"
    }
  }, g.head), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "11px"
    }
  }, g.links.map(item => /*#__PURE__*/React.createElement("a", {
    key: item,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav(item === "Students" ? "students" : "home");
    },
    className: "if-foot-link",
    style: {
      fontFamily: bodyFace,
      fontWeight: allInterstate ? 500 : 400,
      fontSize: "16px",
      color: "rgba(255,255,255,0.82)",
      textDecoration: "none",
      letterSpacing: allInterstate ? "0.01em" : 0,
      overflowWrap: "normal"
    }
  }, item.split("/").map((part, k, arr) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: k
  }, part, k < arr.length - 1 ? /*#__PURE__*/React.createElement(React.Fragment, null, "/", /*#__PURE__*/React.createElement("wbr", null)) : null))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,0.15)",
      marginTop: "clamp(32px, 4vw, 48px)",
      paddingTop: "var(--space-5)",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "12px",
      fontFamily: bodyFace,
      fontSize: "13px",
      color: "rgba(255,255,255,0.55)",
      letterSpacing: allInterstate ? "0.02em" : 0
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 University of Maryland"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "if-foot-link",
    style: {
      color: "rgba(255,255,255,0.75)",
      fontFamily: bodyFace
    }
  }, "Idea Factory / REFI Staff and Students \u203A\u203A"))));
}
window.IFFooter = IFFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
// Header.jsx — the family chrome: thin UMD bar → identity band → navbar
const {
  Logo,
  SearchField
} = window.IdeaFactoryDesignSystem_745a71;
function IFHeader({
  active,
  onNav,
  basePath = "../../"
}) {
  const t = window.IF_TWEAKS || {};
  const nav = window.IF_DATA.nav;
  const submenus = window.IF_DATA.submenus || {};
  const [openMenu, setOpenMenu] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // The footer repeats all the nav links, so the sticky red navbar is redundant
  // once the footer comes into view: retract it (slide up / collapse) there, and
  // bring it back when scrolling up away from the footer.
  const [navRetract, setNavRetract] = React.useState(false);
  const navUnstick = t.navUnstick;
  React.useEffect(() => {
    if (!navUnstick) {
      setNavRetract(false);
      return;
    }
    const check = () => {
      // Trigger off the footer's NAV COLUMNS (not the footer top) so the navbar
      // only retracts once those bottom nav links are genuinely in view.
      const target = document.querySelector(".if-foot-cols") || document.querySelector("footer");
      if (!target) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      setNavRetract(target.getBoundingClientRect().top < vh - 160);
    };
    window.addEventListener("scroll", check, {
      passive: true
    });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [navUnstick]);
  // Gold accent line: start it even with the TOP of the logo (not the frame top),
  // with a bevelled top mirroring the footer line's bottom angle.
  const bandRef = React.useRef(null);
  const goldBarRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const band = bandRef.current,
      bar = goldBarRef.current;
    if (!band || !bar) return;
    const logo = band.querySelector(".if-logo-mark");
    if (!logo) return;
    const measure = () => {
      const top = Math.round(logo.getBoundingClientRect().top - band.getBoundingClientRect().top);
      if (top > 0) bar.style.top = Math.round(top / 2) + "px"; // raise the line to halve the gap above it
    };
    measure();
    requestAnimationFrame(measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(band);
    ro.observe(logo);
    return () => ro.disconnect();
  }, []);
  const goto = p => {
    setMobileOpen(false);
    onNav(p);
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50
    },
    onMouseLeave: () => setOpenMenu(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--md-black)",
      color: "var(--md-white)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "7px var(--gutter)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      fontFamily: "var(--font-heading)",
      fontSize: "12px",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      fontWeight: 700
    }
  }, "University of Maryland"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "rgba(255,255,255,0.78)"
    }
  }, "A. James Clark School of Engineering"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--md-white)",
      borderBottom: "var(--border-width) solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: bandRef,
    className: "if-id-band",
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      display: "flex",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "if-logo-link",
    onClick: e => {
      e.preventDefault();
      onNav("home");
    },
    style: {
      display: "flex",
      alignItems: "center",
      padding: "18px var(--gutter)",
      borderRight: "var(--border-width) solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement(window.IFLogoInline, {
    className: "if-logo-mark",
    height: 58
  })), /*#__PURE__*/React.createElement("div", {
    className: "if-id-tagline",
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      padding: "0 var(--gutter)",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      lineHeight: 1.4,
      color: "var(--text-muted)",
      maxWidth: "44ch"
    }
  }, "The University of Maryland's home for turning ideas into companies. ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      color: "var(--md-red)",
      whiteSpace: "nowrap"
    }
  }, "One place, every stage."))), /*#__PURE__*/React.createElement("div", {
    className: "if-id-search",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "0 var(--gutter)",
      borderLeft: "var(--border-width) solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement(SearchField, null)), /*#__PURE__*/React.createElement("button", {
    className: "if-burger",
    "aria-label": "Menu",
    "aria-expanded": mobileOpen,
    onClick: () => setMobileOpen(o => !o),
    style: {
      display: "none",
      flexDirection: "column",
      justifyContent: "center",
      gap: "5px",
      width: 56,
      border: "none",
      borderLeft: "var(--border-width) solid var(--border)",
      background: "transparent",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 24,
      height: 2.5,
      background: "var(--md-black)",
      margin: "0 auto",
      transform: mobileOpen ? "translateY(7.5px) rotate(45deg)" : "none",
      transition: "transform var(--dur-base) var(--ease-std)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 24,
      height: 2.5,
      background: "var(--md-black)",
      margin: "0 auto",
      opacity: mobileOpen ? 0 : 1,
      transition: "opacity var(--dur-fast) var(--ease-std)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 24,
      height: 2.5,
      background: "var(--md-black)",
      margin: "0 auto",
      transform: mobileOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
      transition: "transform var(--dur-base) var(--ease-std)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "16px",
      position: "relative",
      alignSelf: "stretch"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    ref: goldBarRef,
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      top: "9px",
      background: "var(--md-gold)",
      clipPath: "polygon(0 0, 100% 2.8px, 100% 100%, 0 100%)"
    }
  })))), /*#__PURE__*/React.createElement("nav", {
    className: "if-navbar",
    style: {
      background: "var(--md-red)",
      position: "relative",
      maxHeight: navRetract ? "0px" : "64px",
      overflow: navRetract ? "hidden" : "visible",
      transition: "max-height 340ms var(--ease-out)"
    }
  }, t.headerLineToNav && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      height: "100%",
      margin: "0 auto",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: "16px",
      background: "var(--md-gold)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "0 var(--gutter)",
      display: "flex",
      flexWrap: "nowrap"
    }
  }, nav.map(item => {
    const isStudents = item === "Students";
    const isHome = item === "Home";
    const on = active === "students" && isStudents || active === "home" && isHome;
    const submenu = submenus[item];
    const linkStyle = {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "14px",
      letterSpacing: "0.03em",
      textTransform: "uppercase",
      color: item === "Give" ? "var(--md-gold)" : "var(--md-white)",
      lineHeight: 1,
      /* fixed: Interstate's default line box is ~1.7 and skews vertical centering */
      padding: "15px 16px 13px",
      /* bottom trimmed 2px: caps-only text leaves the em box's descender zone empty, so equal padding reads as extra space below — this optically centers the letters */
      background: on ? "var(--action-active)" : "transparent",
      textDecoration: "none",
      borderTop: "4px solid transparent",
      borderBottom: on ? "4px solid var(--md-gold)" : "4px solid transparent",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px"
    };
    if (submenu) {
      return /*#__PURE__*/React.createElement("div", {
        key: item,
        className: "if-nav-item",
        style: {
          position: "relative"
        },
        onMouseEnter: () => setOpenMenu(item),
        onMouseLeave: () => setOpenMenu(null)
      }, /*#__PURE__*/React.createElement("a", {
        href: "#",
        className: "if-nav-link",
        "aria-haspopup": "true",
        "aria-expanded": openMenu === item,
        onClick: e => {
          e.preventDefault();
          setOpenMenu(openMenu === item ? null : item);
        },
        style: linkStyle
      }, item, /*#__PURE__*/React.createElement("span", {
        "aria-hidden": "true",
        style: {
          fontSize: 9,
          opacity: 0.85,
          transform: openMenu === item ? "rotate(180deg)" : "none",
          transition: "transform var(--dur-fast) var(--ease-std)"
        }
      }, "\u25BE")), openMenu === item && /*#__PURE__*/React.createElement("div", {
        role: "menu",
        style: {
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 50,
          minWidth: 220,
          background: "var(--md-white)",
          boxShadow: "var(--shadow-lg)",
          borderTop: "4px solid var(--md-gold)"
        }
      }, submenu.map(sub => /*#__PURE__*/React.createElement("a", {
        key: sub,
        href: "#",
        role: "menuitem",
        className: "if-nav-sublink",
        onClick: e => {
          e.preventDefault();
          setOpenMenu(null);
          onNav("home");
        },
        style: {
          display: "block",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "14px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text-strong)",
          padding: "12px 18px",
          textDecoration: "none",
          borderBottom: "1px solid var(--border)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "if-nav-sublink-text"
      }, sub)))));
    }
    return /*#__PURE__*/React.createElement("a", {
      key: item,
      href: "#",
      className: item === "Give" ? "if-give-nav" : "if-nav-link",
      onClick: e => {
        e.preventDefault();
        if (isStudents) onNav("students");else onNav("home");
      },
      style: item === "Give" ? {
        marginLeft: "auto",
        /* right-justify within the navbar */
        marginRight: "16px",
        /* land the right edge on the search box's right edge (884) above */
        alignSelf: "center",
        /* vertically center in the row — does NOT grow the navbar height */
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: "13px",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "8px 18px",
        lineHeight: 1,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center"
      } : linkStyle
    }, item);
  }))), mobileOpen && /*#__PURE__*/React.createElement("div", {
    className: "if-mobile-menu",
    style: {
      background: "var(--md-white)",
      borderBottom: "var(--border-width-strong) solid var(--md-black)",
      maxHeight: "calc(100dvh - 120px)",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      paddingBottom: "36px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px var(--gutter)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(SearchField, null)), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "if-give-mobile",
    onClick: e => {
      e.preventDefault();
      goto("home");
    },
    style: {
      flexShrink: 0,
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "13px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      padding: "10px 18px",
      lineHeight: 1,
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-btn-text"
  }, "Give"))), nav.filter(item => item !== "Give").map(item => {
    const submenu = submenus[item];
    const isStudents = item === "Students";
    return /*#__PURE__*/React.createElement("div", {
      key: item,
      style: {
        borderBottom: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "if-mnav-link",
      onClick: e => {
        e.preventDefault();
        goto(isStudents ? "students" : "home");
      },
      style: {
        display: "block",
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: "16px",
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        color: "var(--md-black)",
        padding: "15px var(--gutter)",
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "if-mnav-text"
    }, item)), submenu && /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: "8px"
      }
    }, submenu.map(sub => /*#__PURE__*/React.createElement("a", {
      key: sub,
      href: "#",
      className: "if-msub-link",
      onClick: e => {
        e.preventDefault();
        goto("home");
      },
      style: {
        display: "block",
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: "14px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        padding: "8px var(--gutter) 8px calc(var(--gutter) + 16px)",
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "if-mnav-text"
    }, sub)))));
  })));
}
window.IFHeader = IFHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Homepage.jsx
try { (() => {
// Homepage.jsx — flagship homepage. Art direction: "Editorial Mondrian"
// Massive Interstate type, full-bleed building photography, asymmetric
// color-block composition, red→black→gold progression.
const IFC = window.IdeaFactoryDesignSystem_745a71;
const IMG = {
  flare: "img/building-flare.png",
  entrance: "img/building-entrance.png",
  dusk: "img/building-dusk.jpg"
};

// Animated count-up for the proof stats. Parses the value's prefix/number/suffix
// ($94.8B, 18,992, 72,000+) and rolls the number from 0 to target when scrolled
// into view, preserving decimals + thousands separators. Module scope so Homepage
// re-renders (e.g. the hero sweep) never remount/restart it. Reduced-motion shows final.
const IFStatCount = React.memo(function IFStatCount({
  value,
  style
}) {
  const ref = React.useRef(null);
  const parse = React.useMemo(() => {
    const m = String(value).match(/^([^\d]*)([\d.,]+)(.*)$/) || [null, "", "0", ""];
    const numStr = m[2];
    const hasComma = numStr.includes(",");
    const plain = numStr.replace(/,/g, "");
    const dot = plain.indexOf(".");
    const decimals = dot >= 0 ? plain.length - dot - 1 : 0;
    return {
      prefix: m[1] || "",
      suffix: m[3] || "",
      target: parseFloat(plain) || 0,
      decimals,
      hasComma
    };
  }, [value]);
  const fmt = React.useCallback(n => {
    let s = n.toFixed(parse.decimals);
    if (parse.hasComma) {
      const parts = s.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      s = parts.join(".");
    }
    return parse.prefix + s + parse.suffix;
  }, [parse]);
  // Drive BOTH the number text and the fade directly through the DOM in one rAF
  // loop — no React state during the animation, so re-renders can't restart the
  // fade or flash a static figure. The number stays invisible until counting
  // begins, then fades in while already rolling, so a static "0" is never seen.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = value;
      el.style.opacity = "1";
      return;
    }
    el.style.opacity = "0";
    el.textContent = fmt(0);
    let started = false,
      raf = null;
    const run = () => {
      const dur = 1600,
        fadeDur = 480,
        t0 = performance.now();
      const ease = x => x * x * x; // easeInCubic — counting accelerates toward the end
      const tick = now => {
        const dt = now - t0;
        const p = Math.min(1, dt / dur);
        el.textContent = p < 1 ? fmt(parse.target * ease(p)) : value;
        el.style.opacity = Math.min(1, dt / fadeDur).toFixed(3);
        if (p < 1) raf = requestAnimationFrame(tick);else el.style.opacity = "1";
      };
      raf = requestAnimationFrame(tick);
    };
    const onScrollOrResize = () => {
      if (started) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.85 && r.bottom > 0) {
        started = true;
        cleanup();
        run();
      }
    };
    const cleanup = () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
    window.addEventListener("scroll", onScrollOrResize, {
      passive: true
    });
    window.addEventListener("resize", onScrollOrResize);
    raf = requestAnimationFrame(onScrollOrResize); // catch the case where it's already in view
    return () => {
      cleanup();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, fmt, parse]);
  // Render once with opacity 0 (never shows a static figure); the effect owns text + opacity thereafter.
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      ...style,
      opacity: 0
    }
  }, value);
}, (a, b) => a.value === b.value); // memoize on value only — parent re-renders (hero sweep, etc.) must NOT reset our DOM-driven text/opacity

function Homepage({
  onNav,
  basePath = "../../"
}) {
  const D = window.IF_DATA;
  const {
    StageGlyph,
    Button
  } = IFC;
  const t = window.IF_TWEAKS || {};

  // Hero headline "reading" highlight: on first hover/touch a spotlight sweeps the
  // words one at a time (each brightens, then dims as the next lights), and when the
  // whole phrase has been read, they all rise to full power together and stay on.
  // heroStep: -1 = all dim, 0..4 = that word spotlit, 999 = all full.
  // Loads at FULL power; the dimming/spotlight sweep begins only on the first
  // hover/touch. Reduced-motion users never dim (sweep guard pre-tripped).
  const heroSweepStarted = React.useRef(!!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
  const [heroStep, setHeroStep] = React.useState(999);
  const startHeroSweep = React.useCallback(() => {
    if (heroSweepStarted.current) return;
    heroSweepStarted.current = true;
    // Build a slow "reading" timeline: each word is spotlit, then a brief all-dim
    // pause before the next lights. "ideas" lingers longer (speech cadence).
    const D = 180,
      gap = 40,
      ideasExtra = 230;
    const seq = [];
    [0, 1, 2, 3, 4].forEach(w => {
      seq.push({
        step: w,
        hold: D + (w === 1 ? ideasExtra : 0)
      });
      if (w < 4) seq.push({
        step: -1,
        hold: gap
      }); // slight pause between words
    });
    seq.push({
      step: 999,
      hold: 0
    }); // all rise to full together
    let k = 0;
    const run = () => {
      const {
        step,
        hold
      } = seq[k];
      setHeroStep(step);
      k += 1;
      if (k < seq.length) setTimeout(run, hold);
    };
    setTimeout(run, 140); // slight delay after the first mouse-over before it begins
  }, []);
  const heroWordOpacity = idx => heroStep === 999 ? 1 : heroStep === idx ? 1 : 0.62;

  // Hold the hero headline hidden until Interstate Black (800) is actually loaded,
  // so it never flashes the fallback font and then swaps. We do NOT trust
  // document.fonts.check() for the initial value (it reports "available" before the
  // glyphs are committed to a paint, which let the fallback flash through). Instead
  // we start hidden whenever the Font Loading API exists and reveal only after the
  // specific face's load() promise resolves AND a frame has painted.
  const [heroFontReady, setHeroFontReady] = React.useState(() => !(typeof document !== "undefined" && document.fonts && document.fonts.load));
  React.useEffect(() => {
    if (heroFontReady) return;
    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setHeroFontReady(true);
      }
    };
    document.fonts.load('800 1em "Interstate"').then(() => {
      // double rAF: let the just-loaded font be committed to a paint before showing
      requestAnimationFrame(() => requestAnimationFrame(reveal));
    }).catch(reveal);
    const tm = setTimeout(reveal, 3000); // safety: never keep the headline hidden
    return () => clearTimeout(tm);
  }, [heroFontReady]);

  // Vertical parallax for the "One place. Every stage." headline: it drifts at
  // a different rate than the photo and settles at its natural position when the
  // section is centered in the viewport. Disabled for reduced-motion.
  const stageMomentRef = React.useRef(null);
  const stageTextRef = React.useRef(null);
  React.useEffect(() => {
    const sec = stageMomentRef.current,
      txt = stageTextRef.current;
    if (!sec || !txt) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = null;
    let locked = false; // once settled, hold — don't reverse on scroll up or replay on scroll down
    const update = () => {
      raf = null;
      if (locked) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const amp = 180; // headline's starting vertical offset (px ABOVE its resting spot)
      // Tie the progress to where the SECTION sits in the viewport so the motion
      // plays out (and settles) while the picture is high in the frame — not while
      // it's still low. p=0 as the section is well into view from the bottom; p=1
      // once its top has risen near the top of the frame, then held.
      const startTop = vh * 0.88; // begin
      const endTop = vh * 0.16; // settle (picture high in frame)
      let p = (startTop - rect.top) / (startTop - endTop);
      p = Math.max(0, Math.min(1, p));
      // Gentle settle with a subtle overbounce. Both phases use smootherstep
      // (velocity → 0 at the ends), so it holds high at the start, eases DOWN and
      // decelerates into a small overshoot, then softly returns to rest — no hard hit.
      const smooth = x => x * x * x * (x * (x * 6 - 15) + 10); // smootherstep
      const over = 12; // overshoot below resting (px) — subtle
      const tt = 0.72; // progress at which it reaches the overshoot point
      let shift;
      if (p < tt) {
        shift = -amp + (amp + over) * smooth(p / tt); // hold high → ease down, decelerating into +over
      } else {
        shift = over * (1 - smooth((p - tt) / (1 - tt))); // ease gently back up from +over to 0
      }
      const opacity = p * p; // fade-in, slightly accelerated (reaches opaque sooner)
      txt.style.transform = `translateY(${shift.toFixed(1)}px)`;
      txt.style.opacity = opacity.toFixed(3);
      if (p >= 1) {
        // fully settled — lock in place, no reverse/replay
        locked = true;
        txt.style.transform = "translateY(0px)";
        txt.style.opacity = "1";
      }
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Subtle scroll-driven "Ken Burns" zoom on the dusk photo. Always-on, every pass.
  // SMOOTHNESS: a continuous rAF loop LERPs the displayed scale toward its scroll
  // target every frame, so motion is decoupled from sparse/aliased scroll events
  // (no choppy jumps). Only `scale` animates, against a FIXED origin — changing
  // transform-origin mid-zoom is itself a source of hitching, so we don't.
  const stageImgRef = React.useRef(null);
  React.useEffect(() => {
    const sec = stageMomentRef.current,
      img = stageImgRef.current;
    if (!sec || !img) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const MIN = 1.0,
      MAX = 1.16;
    let cur = null,
      peak = 0,
      raf = null,
      running = true;
    const progress = () => {
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Same window as the headline parallax so they finish together.
      const startTop = vh * 0.88;
      const endTop = vh * 0.16;
      let p = (startTop - rect.top) / (startTop - endTop);
      p = Math.max(0, Math.min(1, p));
      // Reset ONLY when the section has been scrolled back UP fully out of view
      // (its top below the viewport again) — that re-arms the zoom for the next
      // scroll-down. While in view, progress is monotonic so it never reverses.
      const outBelow = rect.top >= vh;
      return {
        p,
        outBelow
      };
    };
    const frame = () => {
      if (!running) return;
      const {
        p,
        outBelow
      } = progress();
      if (outBelow) {
        peak = 0;
        cur = MIN;
      } // re-arm (off-screen, so not visible)
      else if (p > peak) peak = p; // grow only — hold, never undo, while in view
      if (cur == null) cur = MIN;
      const eased = 1 - Math.pow(1 - peak, 3); // easeOutCubic → gentle arrival
      const target = MIN + (MAX - MIN) * eased;
      cur += (target - cur) * 0.1; // damped catch-up → always smooth
      if (Math.abs(target - cur) < 0.0002) cur = target;
      img.style.transform = `translateZ(0) scale(${cur.toFixed(4)})`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Recolor so each glyph keeps its INTERNAL contrast (distinct modules stay
  // distinguishable) while contrasting with the block it sits on.
  const glyphOnColor = [{
    red: "#ffffff"
  },
  // 01 — red block: all-red → all white
  {
    black: "#ffd200",
    red: "#ffffff",
    check: "#7a0f1d"
  },
  // 02 — dark-red block: black→gold, red→white, checks→block color (read as cut-through)
  {
    black: "#ffffff",
    belt: "#b3b3b3"
  },
  // 03 — black block: black→white (red/gold stay)
  {
    gold: "#ffffff"
  } // 04 — gold block: gold→white (black/red stay)
  ];
  // "Find your way in" grid — how the block sits off the white page.
  const audFrame = {
    shadow: {
      boxShadow: "0 14px 38px -22px rgba(0,0,0,0.32)"
    },
    hairline: {
      border: "1px solid var(--border)"
    },
    accent: {
      borderTop: "6px solid var(--md-red)",
      boxShadow: "0 26px 64px -38px rgba(0,0,0,0.4)"
    },
    line: {
      border: "2px solid var(--md-black)"
    },
    none: {}
  }[t.audienceFrame || "shadow"];

  // Manifesto "reading" highlight: like the hero sweep, but one SENTENCE at a time,
  // each held much longer (reading time) with a longer pause between, then all fade
  // up together slowly at the end. Unlike the hero it BEGINS dimmed. Plays once —
  // on the first scroll into position — and never again until reload.
  const maniRef = React.useRef(null);
  const maniReduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const maniPlayed = React.useRef(maniReduced);
  const [maniStep, setManiStep] = React.useState(maniReduced ? 999 : -1); // -1 all dim · 0/1/2 spotlit · 999 all full
  React.useEffect(() => {
    if (maniPlayed.current) return;
    const el = maniRef.current;
    if (!el) return;
    const runMani = () => {
      const HOLD = 1700,
        GAP = 620; // long enough to read a full sentence; longer pause between
      const seq = [];
      [0, 1, 2].forEach(s => {
        seq.push({
          step: s,
          hold: HOLD
        });
        if (s < 2) seq.push({
          step: -1,
          hold: GAP
        });
      });
      seq.push({
        step: 999,
        hold: 0
      }); // all rise to full together (slow fade via CSS)
      let k = 0;
      const run = () => {
        const {
          step,
          hold
        } = seq[k];
        setManiStep(step);
        k += 1;
        if (k < seq.length) setTimeout(run, hold);
      };
      run();
    };
    const check = () => {
      if (maniPlayed.current) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = el.getBoundingClientRect();
      // fully in frame AND risen so its top sits between ~1/2 and ~1/3 up from the bottom
      if (r.top >= 0 && r.bottom <= vh && r.top <= vh * 0.55) {
        maniPlayed.current = true;
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
        runMani();
      }
    };
    window.addEventListener("scroll", check, {
      passive: true
    });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
  const maniActive = i => maniStep !== 999 && maniStep === i;
  return /*#__PURE__*/React.createElement("main", {
    style: {
      overflowX: "hidden"
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--md-black)",
      position: "relative"
    },
    onMouseEnter: startHeroSweep,
    onTouchStart: startHeroSweep
  }, /*#__PURE__*/React.createElement("div", {
    className: "if-hero-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1.15fr 0.85fr",
      minHeight: "min(86vh, 760px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "clamp(28px, 5vw, 72px)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "18px",
      letterSpacing: "0.01em",
      color: "var(--md-gold)",
      lineHeight: 1.3
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      width: "30px",
      height: "9px",
      marginRight: "12px",
      background: "var(--md-gold)",
      clipPath: "polygon(0 100%, 0 44%, 100% 0, 100% 100%)",
      verticalAlign: "middle"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, "Idea Factory \xB7"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, "University of Maryland")), /*#__PURE__*/React.createElement("h1", {
    className: "if-hero-h1" + (heroStep === 999 && heroSweepStarted.current ? " hero-settling" : ""),
    style: {
      color: "var(--md-white)",
      fontWeight: 800,
      fontSize: "clamp(58px, 8.5vw, 132px)",
      lineHeight: 0.86,
      letterSpacing: "-0.03em",
      margin: "0.3em 0",
      visibility: heroFontReady ? "visible" : "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-hero-word",
    style: {
      opacity: heroWordOpacity(0)
    }
  }, "Where"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "if-hero-word",
    style: {
      opacity: heroWordOpacity(1)
    }
  }, "ideas"), " ", /*#__PURE__*/React.createElement("span", {
    className: "if-hero-word",
    style: {
      opacity: heroWordOpacity(2)
    }
  }, "go"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "if-hero-word",
    style: {
      opacity: heroWordOpacity(3)
    }
  }, "to"), " ", /*#__PURE__*/React.createElement("span", {
    className: "if-hero-word",
    style: {
      opacity: heroWordOpacity(4),
      color: "var(--md-red)"
    }
  }, "work.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "18px 28px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconAfter: /*#__PURE__*/React.createElement("span", null, "\u25BE"),
    onClick: () => {
      const el = document.getElementById("audience");
      const header = document.querySelector("header");
      const offset = (header ? header.offsetHeight : 0) - 1;
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: "smooth"
      });
    }
  }, "Find your path"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      minHeight: 360
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.flare,
    alt: "The E. A. Fernandez Idea Factory building, sunlight flaring off its tiled facade and colored-glass window wall",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "38%",
      height: "10px",
      background: "var(--md-gold)",
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "10px",
      background: "var(--md-red)",
      zIndex: 2
    }
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "clamp(56px, 8vw, 120px) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      marginBottom: "clamp(28px, 4vw, 48px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-eyebrow"
  }, "Who we are"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 2,
      background: "var(--border)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--text-subtle)"
    }
  }, "Est. 1983 \xB7 College Park")), /*#__PURE__*/React.createElement("h2", {
    ref: maniRef,
    className: "if-manifesto" + (maniStep !== 999 && maniStep !== -1 ? " mani-dimming" : ""),
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "clamp(30px, 4.6vw, 64px)",
      lineHeight: 1.03,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)",
      margin: 0,
      maxWidth: "30ch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-manifesto-line" + (maniActive(0) ? " mani-lift" : "")
  }, "We are not a think tank."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "if-manifesto-line" + (maniActive(1) ? " mani-lift" : "")
  }, "We are not a lecture hall."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "if-manifesto-line" + (maniActive(2) ? " mani-lift" : "")
  }, "We are ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--md-red)"
    }
  }, "where ideas get built."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(32px, 4vw, 56px)",
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "clamp(24px, 4vw, 64px)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "clamp(16px, 1.4vw, 19px)",
      lineHeight: 1.65,
      color: "var(--text-muted)",
      margin: 0
    }
  }, "Students become entrepreneurs. Faculty research finds its way to market. Innovators across Maryland test and validate their ideas, refining them until they're ready for the real world."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "clamp(16px, 1.4vw, 19px)",
      lineHeight: 1.65,
      color: "var(--text-muted)",
      margin: 0
    }
  }, "Startups get built. Maryland companies access the intellectual firepower they need to grow. For more than forty years, this is where the state's best ideas have gone to work.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--md-black)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "clamp(48px, 6vw, 88px) var(--gutter) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "clamp(28px, 4vw, 48px)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "var(--md-white)",
      fontSize: "clamp(32px, 4.5vw, 60px)",
      lineHeight: 0.95,
      margin: 0
    }
  }, "One factory. Four stages."))), /*#__PURE__*/React.createElement("div", {
    className: "if-stage-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridAutoRows: "auto minmax(18px, 1fr) auto auto auto",
      gap: "2px",
      background: "rgba(255,255,255,0.12)"
    }
  }, D.stages.map((s, i) => {
    const tones = [{
      bg: "var(--md-red)",
      fg: "#fff",
      num: "rgba(255,255,255,0.55)"
    }, {
      bg: "#7a0f1d",
      fg: "#fff",
      num: "rgba(255,255,255,0.5)"
    }, {
      bg: "var(--md-black)",
      fg: "#fff",
      num: "rgba(255,255,255,0.4)"
    }, t.scaleUpText === "white" ? {
      bg: "var(--md-gold)",
      fg: "#fff",
      num: "rgba(255,255,255,0.6)"
    } : {
      bg: "var(--md-gold)",
      fg: "var(--md-black)",
      num: "rgba(0,0,0,0.4)"
    }][i];
    return /*#__PURE__*/React.createElement("a", {
      key: s.n,
      href: "#",
      onClick: e => e.preventDefault(),
      className: "if-stage-cell",
      style: {
        background: tones.bg,
        color: tones.fg,
        padding: "clamp(24px,3vw,40px) clamp(18px,2vw,28px)",
        minHeight: 320,
        display: "grid",
        gridRow: "span 5",
        gridTemplateRows: "subgrid",
        justifyItems: "center",
        textAlign: "center",
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridRow: 1,
        justifySelf: "start",
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: "var(--fs-small)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        lineHeight: 1,
        color: "inherit"
      }
    }, String(s.n).padStart(2, "0")), t.stageGlyphs === "on color" ? /*#__PURE__*/React.createElement(window.IFStageGlyphInline, {
      className: "if-stage-glyph",
      stage: s.n,
      size: 108,
      palette: glyphOnColor[i],
      style: {
        gridRow: 3,
        marginBottom: 22
      }
    }) : /*#__PURE__*/React.createElement(StageGlyph, {
      className: "if-stage-glyph",
      stage: s.n,
      variant: "tiled",
      basePath: basePath,
      size: 94,
      style: {
        gridRow: 3,
        marginBottom: 22
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        gridRow: 4,
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: "clamp(24px, 2.4vw, 32px)",
        lineHeight: 1.02,
        letterSpacing: "-0.01em",
        color: "inherit"
      }
    }, s.name), /*#__PURE__*/React.createElement("p", {
      style: {
        gridRow: 5,
        fontFamily: "var(--font-heading)",
        fontWeight: 400,
        fontSize: "clamp(17px, 1.4vw, 19px)",
        lineHeight: 1.5,
        margin: "12px 0 0",
        color: "inherit",
        opacity: 0.92
      }
    }, s.tagline));
  }))), /*#__PURE__*/React.createElement("section", {
    ref: stageMomentRef,
    style: {
      position: "relative",
      minHeight: "clamp(360px, 56vh, 620px)",
      aspectRatio: "3 / 2",
      display: "flex",
      alignItems: "flex-start",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    ref: stageImgRef,
    src: IMG.dusk,
    alt: "The E. A. Fernandez Idea Factory at dusk, its colored-glass window wall lit magenta above the entrance stair and signage",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "34% 40%",
      transformOrigin: "38% 36%",
      willChange: "transform",
      backfaceVisibility: "hidden"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(215deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 38%, rgba(0,0,0,0) 62%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: stageTextRef,
    style: {
      position: "absolute",
      top: "30%",
      left: 0,
      right: 0,
      maxWidth: "var(--container)",
      margin: "0 auto",
      width: "100%",
      padding: "0 var(--gutter)",
      willChange: "transform, opacity"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "#fff",
      fontSize: "clamp(40px, 6vw, 84px)",
      lineHeight: 0.92,
      letterSpacing: "-0.02em",
      margin: "0 clamp(12px, 3vw, 56px) 0 auto",
      maxWidth: "14ch",
      textAlign: "right"
    }
  }, "One place.", /*#__PURE__*/React.createElement("br", null), "Every stage."))), /*#__PURE__*/React.createElement("section", {
    id: "audience",
    style: {
      background: "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "clamp(56px, 8vw, 110px) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      marginBottom: "clamp(28px, 4vw, 48px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-eyebrow"
  }, "Start here"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 2,
      background: "var(--border)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--text-subtle)"
    }
  }, "Four doors")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px 40px",
      marginBottom: "clamp(28px, 4vw, 48px)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(32px, 4.5vw, 60px)",
      lineHeight: 0.95,
      margin: 0
    }
  }, "Find your way in."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "clamp(16px, 1.4vw, 19px)",
      lineHeight: 1.5,
      color: "var(--text-muted)",
      margin: 0,
      maxWidth: "42ch"
    }
  }, "Student, faculty, researcher, company, or partner \u2014 whoever you are, there's a door here for you. Pick yours.")), /*#__PURE__*/React.createElement("div", {
    className: "if-aud-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: "2px",
      background: "var(--border)",
      ...audFrame
    }
  }, [{
    t: "Students",
    d: "Learn how to become an entrepreneur.",
    tone: "red",
    span: 6,
    page: "students"
  }, {
    t: "Faculty & Researchers",
    d: "Take your research to market.",
    tone: "black",
    span: 6,
    page: "home"
  }, {
    t: "Companies",
    d: "Tap university firepower.",
    tone: "gold",
    span: 5,
    page: "home"
  }, {
    t: "Partners",
    d: "Mentor, fund, collaborate.",
    tone: "white",
    span: 7,
    page: "home"
  }].map(a => {
    const tn = {
      red: {
        bg: "var(--md-red)",
        fg: "#fff",
        chev: "var(--md-gold)"
      },
      black: {
        bg: "var(--md-black)",
        fg: "#fff",
        chev: "var(--md-gold)"
      },
      gold: {
        bg: "var(--md-gold)",
        fg: "var(--md-black)",
        chev: "var(--md-red)"
      },
      white: {
        bg: "var(--md-white)",
        fg: "var(--md-black)",
        chev: "var(--md-red)"
      }
    }[a.tone];
    return /*#__PURE__*/React.createElement("a", {
      key: a.t,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNav(a.page);
      },
      className: "if-aud-cell",
      style: {
        gridColumn: `span ${a.span}`,
        background: tn.bg,
        color: tn.fg,
        minHeight: 220,
        padding: "clamp(24px,3vw,40px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: 30,
        lineHeight: 1,
        color: tn.chev,
        alignSelf: "flex-end"
      }
    }, "\u203A\u203A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        color: "inherit",
        fontSize: "clamp(34px, 2.4vw, 44px)",
        lineHeight: 0.98,
        margin: 0,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        textWrap: "balance",
        maxWidth: "11ch"
      }
    }, a.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        margin: "12px 0 0",
        color: "inherit",
        opacity: 0.94,
        maxWidth: "34ch"
      }
    }, a.d)));
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--md-red)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      height: "100%",
      margin: "0 auto",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "16px",
      height: "calc(100% - 52px)",
      background: "var(--md-gold)",
      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 2.8px), 0 100%)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "clamp(56px, 8vw, 110px) calc(var(--gutter) + 40px) clamp(56px, 8vw, 110px) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 16,
      marginBottom: "clamp(36px, 5vw, 64px)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(32px, 4.5vw, 56px)",
      lineHeight: 0.95,
      margin: 0,
      color: "#fff"
    }
  }, "The proof"), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#",
    variant: "outline",
    size: "sm",
    style: {
      color: "#fff",
      borderColor: "rgba(255,255,255,0.7)",
      "--btn-hover-fill": "#fff",
      "--btn-hover-ink": "var(--md-red)"
    }
  }, "See our full impact \u203A\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "clamp(24px, 4vw, 48px)"
    }
  }, D.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement(IFStatCount, {
    value: s.value,
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "clamp(40px, 5.6vw, 96px)",
      lineHeight: 0.82,
      letterSpacing: "-0.04em",
      color: "#fff",
      whiteSpace: "nowrap",
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "4px solid rgba(255,255,255,0.35)",
      paddingTop: 18,
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.9)"
    }
  }, s.label)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "clamp(56px, 8vw, 110px) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "clamp(28px, 4vw, 48px)",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(32px, 4.5vw, 56px)",
      lineHeight: 0.95,
      margin: 0
    }
  }, "Latest news"), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#",
    variant: "outline",
    size: "sm",
    style: {
      color: "var(--md-red)",
      borderColor: "var(--md-red)",
      "--btn-hover-fill": "var(--md-red)",
      "--btn-hover-ink": "#fff"
    }
  }, "All news \u203A\u203A")), /*#__PURE__*/React.createElement("div", {
    className: "if-news-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--grid-gap)"
    }
  }, (() => {
    const n = D.news[0];
    return /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "if-news-feat",
      onClick: e => e.preventDefault(),
      style: {
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        border: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("image-slot", {
      id: "news-feat",
      src: n.img,
      fit: "cover",
      radius: "0",
      placeholder: "Lead story image",
      style: {
        display: "block",
        width: "100%",
        height: "auto",
        aspectRatio: "16 / 10"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "if-cardtext",
      style: {
        padding: "clamp(20px, 2.4vw, 32px)",
        borderTop: "4px solid var(--md-red)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "if-eyebrow",
      style: {
        color: "var(--text-subtle)"
      }
    }, n.kicker, " \xB7 ", n.date), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "clamp(24px, 2.6vw, 34px)",
        lineHeight: 1.08,
        margin: "12px 0 0",
        color: "var(--text-strong)",
        fontWeight: 800,
        letterSpacing: "-0.015em",
        textWrap: "wrap"
      }
    }, n.title)));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--md-white)",
      border: "1px solid var(--border)"
    }
  }, D.news.slice(1).map((n, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    className: "if-event-row",
    onClick: e => e.preventDefault(),
    style: {
      display: "flex",
      gap: "clamp(16px, 2vw, 24px)",
      textDecoration: "none",
      padding: "clamp(14px, 1.6vw, 20px)",
      borderTop: i === 0 ? "none" : "1px solid var(--border)",
      flex: 1,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: `news-${i}`,
    src: n.img,
    fit: "cover",
    radius: "4",
    placeholder: "Image",
    style: {
      display: "block",
      width: "clamp(88px, 10vw, 120px)",
      height: "auto",
      aspectRatio: "1 / 1",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "if-cardtext",
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "if-eyebrow",
    style: {
      color: "var(--text-subtle)"
    }
  }, n.kicker, " \xB7 ", n.date), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "clamp(17px, 1.5vw, 20px)",
      lineHeight: 1.18,
      margin: "8px 0 0",
      color: "var(--text-strong)",
      fontWeight: 800,
      letterSpacing: "-0.01em"
    }
  }, n.title)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "if-event-chev",
    style: {
      flexShrink: 0,
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: 18,
      color: "var(--md-red)"
    }
  }, "\u203A\u203A"))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--gray-100)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "clamp(56px, 8vw, 110px) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "clamp(28px, 4vw, 48px)",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(32px, 4.5vw, 56px)",
      lineHeight: 0.95,
      margin: 0
    }
  }, "Upcoming events"), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#",
    variant: "outline",
    size: "sm",
    style: {
      color: "var(--md-red)",
      borderColor: "var(--md-red)",
      "--btn-hover-fill": "var(--md-red)",
      "--btn-hover-ink": "#fff"
    }
  }, "All events \u203A\u203A")), /*#__PURE__*/React.createElement("div", {
    className: "if-events-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--grid-gap)"
    }
  }, (() => {
    const e = D.events[0];
    return /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "if-event-feat",
      onClick: ev => ev.preventDefault(),
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 24,
        background: "var(--md-red)",
        color: "#fff",
        padding: "clamp(24px, 3vw, 40px)",
        textDecoration: "none",
        minHeight: 300
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "if-cardtext",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "if-event-date",
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: "clamp(56px, 7vw, 88px)",
        lineHeight: 0.8,
        letterSpacing: "-0.04em"
      }
    }, e.day), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: 22,
        textTransform: "uppercase",
        letterSpacing: "0.02em"
      }
    }, e.mon)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--md-black)",
        background: "var(--md-gold)",
        padding: "6px 10px"
      }
    }, e.type)), /*#__PURE__*/React.createElement("div", {
      className: "if-cardtext"
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "clamp(24px, 2.6vw, 34px)",
        lineHeight: 1.05,
        margin: 0,
        fontWeight: 800,
        letterSpacing: "-0.015em",
        color: "#fff"
      }
    }, e.title), /*#__PURE__*/React.createElement("p", {
      className: "if-event-feat-blurb",
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.55,
        margin: "12px 0 0",
        color: "rgba(255,255,255,0.92)",
        maxWidth: "40ch"
      }
    }, e.blurb), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginTop: 20,
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.04em",
        textTransform: "uppercase"
      }
    }, /*#__PURE__*/React.createElement("span", null, e.time), /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.5
      }
    }, "\xB7"), /*#__PURE__*/React.createElement("span", null, e.place))));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--md-white)",
      border: "1px solid var(--border)"
    }
  }, D.events.slice(1).map((e, i) => {
    const chip = [{
      bg: "var(--md-black)",
      fg: "#fff"
    }, {
      bg: "var(--md-gold)",
      fg: "var(--md-black)"
    }, {
      bg: "var(--md-red)",
      fg: "#fff"
    }][i % 3];
    return /*#__PURE__*/React.createElement("a", {
      key: i,
      href: "#",
      className: "if-event-row",
      onClick: ev => ev.preventDefault(),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "clamp(16px, 2vw, 28px)",
        padding: "clamp(16px, 2vw, 24px)",
        textDecoration: "none",
        borderTop: i === 0 ? "none" : "1px solid var(--border)",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "if-event-date",
      style: {
        flexShrink: 0,
        width: 64,
        height: 64,
        background: chip.bg,
        color: chip.fg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "if-event-datetext",
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: 26,
        lineHeight: 1.0,
        letterSpacing: "-0.03em"
      }
    }, e.day), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginTop: -2
      }
    }, e.mon))), /*#__PURE__*/React.createElement("div", {
      className: "if-cardtext",
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--md-red)"
      }
    }, e.type), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 18,
        lineHeight: 1.15,
        margin: "4px 0 0",
        color: "var(--text-strong)",
        fontWeight: 700
      }
    }, e.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 14,
        color: "var(--text-muted)",
        margin: "4px 0 0"
      }
    }, e.time, " \xB7 ", e.place)), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      className: "if-event-chev",
      style: {
        flexShrink: 0,
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: 18,
        color: "var(--md-red)"
      }
    }, "\u203A\u203A"));
  }))))));
}
window.IFHomepage = Homepage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Homepage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/LogoInline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// LogoInline.jsx — the Idea Factory color lockup as INLINE SVG (not an <img>),
// so individual pieces can be animated. The root carries the caller's
// className (e.g. "if-logo-mark" for the scale-hover); the large gold
// "window" pane on the right of the mark is tagged .if-logo-window for the
// "window effect" hover.
function IFLogoInline({
  height = 58,
  tone = "color",
  className,
  style,
  ...rest
}) {
  const ink = tone === "white" ? "#fff" : "#e11e34"; // wordmark color; the mark keeps its colors in both tones
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1267.34 494.8",
    role: "img",
    "aria-label": "The Idea Factory",
    style: {
      height,
      width: "auto",
      display: "block",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: "M704.8,302.95h-72.28V47.99h72.28v254.96h0Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M902.65,302.85h-66.07v-13.48c-12.78,10.2-25.19,17.48-45.27,17.48-35.78,0-63.52-28.05-63.52-99.07s24.46-100.16,66.07-100.16c19.35,0,32.12,8.74,42.71,16.75V48.27l66.07-11.77v266.35h.01ZM836.58,243.95v-73.21c-6.57-5.46-13.14-9.11-23.36-9.11-13.51,0-20.81,8.38-20.81,44.07,0,38.24,7.3,47.35,21.17,47.35,9.49,0,16.43-3.64,23-9.1h0Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1090.65,213.35c0,5.46,0,9.47-.37,12.75h-112.44c2.19,21.13,14.6,30.59,32.49,30.59,16.79,0,30.66-3.64,49.65-13.48l25.19,41.89c-23.73,13.84-48.19,21.85-78.12,21.85-57.68,0-89.44-40.79-89.44-99.43,0-65.92,37.24-99.8,87.61-99.8s85.42,34.6,85.42,105.63h.01ZM1032.61,185.31c-3.29-19.3-9.86-29.14-29.2-29.14-14.97,0-23.36,10.2-25.55,29.14h54.76-.01Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1267.34,302.95h-62.06v-12.75c-12.41,9.47-29.2,16.75-46.73,16.75-37.24,0-62.06-22.95-62.06-65.92s28.47-62.28,68.99-62.28c17.52,0,29.2,3.28,39.79,8.01v-9.47c0-16.75-9.13-22.58-27.01-22.58-19.71,0-34.68,3.64-53.3,13.84l-17.16-43.34c23.36-11.29,49.28-17.48,82.5-17.48,53.66,0,77.03,26.59,77.03,71.02v124.2h.01ZM1205.28,251.23v-26.22c-7.3-3.28-15.7-5.46-28.11-5.46-13.51,0-20.44,7.28-20.44,20.4,0,12.02,6.21,20.76,20.44,20.76,10.95,0,21.9-4.37,28.11-9.47h0Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M733.6,344.57h-65.89v17.67h39.97v29.87h-39.97v49.9h-35.23v-127.48h101.12v30.05h0Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M811.54,442h-31.03v-6.37c-6.21,4.74-14.6,8.38-23.36,8.38-18.62,0-31.03-11.47-31.03-32.96s14.24-31.14,34.5-31.14c8.76,0,14.6,1.64,19.9,4.01v-4.73c0-8.38-4.56-11.29-13.51-11.29-9.86,0-17.34,1.82-26.65,6.92l-8.58-21.67c11.68-5.65,24.64-8.74,41.25-8.74,26.83,0,38.51,13.29,38.51,35.51v62.1-.02ZM780.51,416.14v-13.11c-3.65-1.64-7.85-2.73-14.05-2.73-6.75,0-10.22,3.64-10.22,10.2,0,6.01,3.1,10.38,10.22,10.38,5.48,0,10.95-2.19,14.05-4.74h0Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M906.82,421.24c-11.13,16.39-21.54,22.76-38.51,22.76-28.11,0-44.9-17.85-44.9-50.08,0-29.32,14.97-49.54,45.63-49.54,18.07,0,28.47,8.38,36.87,21.85l-22.63,17.12c-4.56-8.38-7.67-12.38-14.78-12.38-8.4,0-12.59,8.38-12.59,23.49s4.56,22.95,13.51,22.95c6.21,0,10.59-3.46,16.61-12.38l20.81,16.21h-.02Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M981.1,411.04l-4.2,27.86c-6.39,3.1-14.42,5.1-23.73,5.1-17.34,0-25.37-8.74-25.37-30.41v-41.52h-14.6v-25.68h14.6v-26.2l31.94-5.67v31.87h20.81v25.68h-20.81v34.6c0,7.28,2.74,9.47,8.21,9.47,4.38,0,8.03-1.64,13.14-5.1h0Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1079.67,394.1c0,32.96-19.17,49.9-45.63,49.9s-45.45-16.94-45.45-49.9,18.98-49.72,45.45-49.72,45.63,16.39,45.63,49.72ZM1047,394.1c0-16.21-4.38-23.13-12.96-23.13s-12.96,6.92-12.96,23.13,4.38,23.31,12.96,23.31,12.96-7.47,12.96-23.31Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1161.07,348.39l-7.67,34.06c-4.2-4.55-8.94-8.01-15.33-8.01-8.03,0-12.96,3.82-12.96,15.48v52.08h-32.85v-95.61h32.85v6.92c5.66-5.46,12.05-8.92,20.44-8.92,6.94,0,11.68,1.64,15.51,4.01h.01Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1266.57,346.39l-46.36,129.3h-31.39l12.05-29.68-36.5-99.62h34.86l9.13,34.05c2.19,8.01,6.21,24.95,7.3,34.06,1.28-9.11,5.29-26.04,7.48-34.42l8.94-33.69h34.5-.01Z",
    fill: ink
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "592.8 494.8 0 494.8 0 0 592.9 0 592.9 123.05 555.3 138.55 555.3 424.19 592.8 443.81 592.8 494.8",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "329.3 412.4 329.3 127.9 283.9 71.6 283.9 431.7 329.3 412.4",
    fill: "#e11e34"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "577 48.3 284.35 48.3 341.24 118.96 547.67 82.39 577 48.3",
    fill: "#231f20"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "555.3 88.85 555.3 127.73 582.9 116.35 582.9 56.78 555.3 88.85",
    fill: "#231f20"
  }), /*#__PURE__*/React.createElement("polygon", {
    className: "if-logo-window",
    points: "344.2 128.59 344.2 414.19 545.2 422.1 545.3 92.96 344.2 128.59",
    fill: "#fdd10c"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "10",
    width: "55.3",
    height: "150.4",
    fill: "#231f20"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "75.3",
    y: "10",
    width: "193.6",
    height: "150.4",
    fill: "#fdd10c"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "170.4",
    width: "128.4",
    height: "153.3",
    fill: "#e11e34"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "333.7",
    width: "90.9",
    height: "108.2",
    fill: "#fdd10c"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "110.9",
    y: "333.7",
    width: "83.5",
    height: "108.2",
    fill: "#e11e34"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "148.4",
    y: "170.4",
    width: "120.2",
    height: "153.3",
    fill: "#231f20"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "204.4",
    y: "333.7",
    width: "64.5",
    height: "108.2",
    fill: "#231f20"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "451.9",
    width: "572.8",
    height: "32.9",
    fill: "#231f20"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "278.9",
    y: "10",
    width: "304",
    height: "28.3",
    fill: "#e11e34"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "567.44 441.9 548.89 432.25 340.13 424.04 298.33 441.9 567.44 441.9",
    fill: "#e11e34"
  }));
}
window.IFLogoInline = IFLogoInline;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/LogoInline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/StageGlyphInline.jsx
try { (() => {
// StageGlyphInline.jsx — inline, recolorable stage glyph (no white tile).
// Renders the SAME regularized geometry as the asset SVGs, but as inline
// SVG so each module can be recolored to contrast with the colored block
// it sits directly on. Used by the homepage four-stage band when the
// "Stage glyphs → on color" tweak is active.
function IFStageGlyphInline({
  stage = 1,
  size = 56,
  palette = {},
  className,
  style
}) {
  const P = {
    red: "#e21833",
    black: "#000000",
    gold: "#ffd200",
    belt: "#7f7f7f",
    check: "#ffffff",
    ...palette
  };
  const bodies = {
    1: [/*#__PURE__*/React.createElement("rect", {
      key: "a",
      x: "26",
      y: "26",
      width: "30",
      height: "30",
      fill: P.red
    }), /*#__PURE__*/React.createElement("rect", {
      key: "b",
      x: "67",
      y: "29",
      width: "24",
      height: "24",
      fill: "none",
      stroke: P.red,
      strokeWidth: "6"
    }), /*#__PURE__*/React.createElement("rect", {
      key: "c",
      x: "29",
      y: "67",
      width: "24",
      height: "24",
      fill: "none",
      stroke: P.red,
      strokeWidth: "6"
    }), /*#__PURE__*/React.createElement("rect", {
      key: "d",
      x: "67",
      y: "67",
      width: "24",
      height: "24",
      fill: "none",
      stroke: P.red,
      strokeWidth: "6"
    })],
    2: [/*#__PURE__*/React.createElement("rect", {
      key: "a",
      x: "26",
      y: "26",
      width: "30",
      height: "30",
      fill: P.black
    }), /*#__PURE__*/React.createElement("rect", {
      key: "b",
      x: "26",
      y: "64",
      width: "30",
      height: "30",
      fill: P.black
    }), /*#__PURE__*/React.createElement("rect", {
      key: "c",
      x: "67",
      y: "29",
      width: "24",
      height: "24",
      fill: "none",
      stroke: P.red,
      strokeWidth: "6"
    }), /*#__PURE__*/React.createElement("rect", {
      key: "d",
      x: "67",
      y: "67",
      width: "24",
      height: "24",
      fill: "none",
      stroke: P.red,
      strokeWidth: "6"
    }), /*#__PURE__*/React.createElement("path", {
      key: "e",
      d: "M32 41.6 L38 47.6 L49.4 34.4",
      fill: "none",
      stroke: P.check,
      strokeWidth: "4.8",
      strokeLinecap: "square",
      strokeLinejoin: "miter"
    }), /*#__PURE__*/React.createElement("path", {
      key: "f",
      d: "M32 79.6 L38 85.6 L49.4 72.4",
      fill: "none",
      stroke: P.check,
      strokeWidth: "4.8",
      strokeLinecap: "square",
      strokeLinejoin: "miter"
    })],
    3: [/*#__PURE__*/React.createElement("rect", {
      key: "a",
      x: "7",
      y: "37.5",
      width: "30",
      height: "30",
      fill: P.red
    }), /*#__PURE__*/React.createElement("rect", {
      key: "b",
      x: "45",
      y: "37.5",
      width: "30",
      height: "30",
      fill: P.black
    }), /*#__PURE__*/React.createElement("rect", {
      key: "c",
      x: "83",
      y: "37.5",
      width: "30",
      height: "30",
      fill: P.gold
    }), /*#__PURE__*/React.createElement("rect", {
      key: "d",
      x: "7",
      y: "75.5",
      width: "106",
      height: "7",
      fill: P.belt
    })],
    4: [/*#__PURE__*/React.createElement("rect", {
      key: "a",
      x: "83",
      y: "7",
      width: "30",
      height: "30",
      fill: P.gold
    }), /*#__PURE__*/React.createElement("rect", {
      key: "b",
      x: "83",
      y: "45",
      width: "30",
      height: "30",
      fill: P.gold
    }), /*#__PURE__*/React.createElement("rect", {
      key: "c",
      x: "45",
      y: "45",
      width: "30",
      height: "30",
      fill: P.black
    }), /*#__PURE__*/React.createElement("rect", {
      key: "d",
      x: "83",
      y: "83",
      width: "30",
      height: "30",
      fill: P.gold
    }), /*#__PURE__*/React.createElement("rect", {
      key: "e",
      x: "45",
      y: "83",
      width: "30",
      height: "30",
      fill: P.black
    }), /*#__PURE__*/React.createElement("rect", {
      key: "f",
      x: "7",
      y: "83",
      width: "30",
      height: "30",
      fill: P.red
    })]
  };
  const stages = window.IdeaFactoryDesignSystem_745a71.StageGlyph.stages;
  const meta = stages[stage] || stages[1];
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    role: "img",
    "aria-label": `Stage ${String(stage).padStart(2, "0")} — ${meta.name}`,
    style: {
      display: "block",
      overflow: "visible",
      ...style
    }
  }, bodies[stage] || bodies[1]);
}
window.IFStageGlyphInline = IFStageGlyphInline;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/StageGlyphInline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/StudentsPage.jsx
try { (() => {
// StudentsPage.jsx — the audience template (program directory + tag filter)
const IFC2 = window.IdeaFactoryDesignSystem_745a71;
function StudentsPage({
  onNav,
  basePath = "../../"
}) {
  const D = window.IF_DATA;
  const {
    ColorBlock,
    ProgramCard,
    Tag,
    Button
  } = IFC2;
  const [filter, setFilter] = React.useState("All");
  const visible = D.programs.filter(p => filter === "All" || p.tags.includes(filter));
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--md-black)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      minHeight: "min(64vh, 540px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "clamp(28px, 5vw, 64px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--md-gold)"
    }
  }, "For Students"), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "var(--md-white)",
      fontSize: "clamp(52px, 7.5vw, 104px)",
      lineHeight: 0.86,
      letterSpacing: "-0.03em",
      margin: "0.2em 0"
    }
  }, "Become a ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--md-red)"
    }
  }, "builder.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "clamp(17px, 1.6vw, 20px)",
      lineHeight: 1.5,
      color: "rgba(255,255,255,0.85)",
      margin: 0,
      maxWidth: "46ch"
    }
  }, "From your first course to your first company \u2014 find the program that fits where you are right now. ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--md-gold)",
      fontFamily: "var(--font-heading)",
      whiteSpace: "nowrap"
    }
  }, "9 ways in."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: 280,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/building-entrance.png",
    alt: "The E. A. Fernandez Idea Factory entrance and glass tower",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "10px",
      background: "var(--md-red)",
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      bottom: 0,
      height: "10px",
      width: "38%",
      background: "var(--md-gold)",
      zIndex: 2
    }
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "var(--space-6) var(--gutter) var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      background: "var(--surface)",
      padding: "var(--space-5) 0",
      zIndex: 10,
      borderBottom: "1px solid var(--border)",
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-subtle)",
      marginBottom: 14
    }
  }, "Filter programs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px"
    }
  }, D.filters.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    interactive: true,
    pressed: filter === f,
    onClick: () => setFilter(f)
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--grid-gap)"
    }
  }, visible.map(p => /*#__PURE__*/React.createElement(ProgramCard, {
    key: p.label,
    label: p.label,
    fullName: p.fullName,
    line: p.line,
    tags: p.tags,
    href: "#"
  }))), visible.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      color: "var(--text-muted)"
    }
  }, "No programs match that filter."))));
}
window.IFStudentsPage = StudentsPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/StudentsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Idea Factory website — sample content (drawn from the brief / mtech.umd.edu)
window.IF_DATA = {
  nav: ["Home", "Students", "Faculty/Researchers", "Companies", "Partners", "News", "About", "Give"],
  submenus: {
    "News": ["News", "Events", "Archives"],
    "About": ["About", "Impact", "Contact", "Directions", "Timeline"]
  },
  audiences: [{
    title: "Students",
    desc: "Become an entrepreneur.",
    tone: "red",
    page: "students"
  }, {
    title: "Faculty / Researchers",
    desc: "Take your research to market.",
    tone: "black",
    page: "home"
  }, {
    title: "Companies",
    desc: "Tap university firepower.",
    tone: "gold",
    page: "home"
  }, {
    title: "Partners",
    desc: "Mentor, fund, collaborate.",
    tone: "white",
    page: "home"
  }],
  stats: [{
    value: "$94.8B",
    label: "Economic impact since 1983",
    tone: "light"
  }, {
    value: "18,992",
    label: "Jobs created",
    tone: "red"
  }, {
    value: "72,000+",
    label: "Students supported",
    tone: "dark"
  }],
  news: [{
    kicker: "News",
    title: "Maryland startup spins out of Mtech Ventures with $12M seed round",
    date: "May 28, 2026",
    img: "img/building-flare.png"
  }, {
    kicker: "News",
    title: "MIPS-supported product sales surpass $52.7 billion milestone",
    date: "May 14, 2026",
    img: "img/building-entrance.png"
  }, {
    kicker: "News",
    title: "Hinman CEOs alumni return to mentor the next cohort",
    date: "Apr 30, 2026",
    img: "img/building-flare.png"
  }, {
    kicker: "News",
    title: "Terps Startup Accelerator opens applications for fall cohort",
    date: "Apr 18, 2026",
    img: "img/building-entrance.png"
  }],
  events: [{
    day: "12",
    mon: "Jun",
    time: "6:00 PM",
    type: "Competition",
    title: "Pitch Dingman Finals",
    place: "Idea Factory · Atrium",
    blurb: "Six student startups pitch a live panel of investors for $25K in prizes. Open to all — come watch the next Maryland company get its start."
  }, {
    day: "18",
    mon: "Jun",
    time: "9:00 AM",
    type: "Workshop",
    title: "I-Corps Customer Discovery Bootcamp",
    place: "Online"
  }, {
    day: "24",
    mon: "Jun",
    time: "5:30 PM",
    type: "Open House",
    title: "Startup Shell Open House",
    place: "Startup Shell"
  }, {
    day: "27",
    mon: "Jun",
    time: "12:00 PM",
    type: "Networking",
    title: "Founders Friday Lunch",
    place: "Idea Factory · Atrium"
  }],
  programs: [{
    label: "Entrepreneurship Courses",
    fullName: "Courses in Entrepreneurship & Innovation",
    line: "Undergraduate classes in entrepreneurship and innovation",
    tags: ["Undergraduate"]
  }, {
    label: "Entrepreneurship Minor",
    fullName: "Minor in Technology Entrepreneurship & Corporate Innovation",
    line: "15-credit minor open to all students",
    tags: ["Undergraduate"]
  }, {
    label: "ASPIRE",
    fullName: "",
    line: "Funding for undergraduates doing research with Clark School faculty",
    tags: ["Undergraduate", "Funding"]
  }, {
    label: "Hinman CEOs",
    fullName: "Hinman CEOs Program",
    line: "Living-learning community for student entrepreneurs",
    tags: ["Undergraduate", "Community & space"]
  }, {
    label: "Tech Entrepreneurship Master's",
    fullName: "MPS in Technology Entrepreneurship & Corporate Innovation",
    line: "Online master's for launching and leading ventures",
    tags: ["Graduate", "Online"]
  }, {
    label: "Product Management Master's",
    fullName: "MPS in Product Management",
    line: "Lead the product life cycle from discovery to delivery",
    tags: ["Graduate"]
  }, {
    label: "xFoundry",
    fullName: "",
    line: "Multidisciplinary teams tackling society's grand challenges",
    tags: ["Undergraduate", "Graduate"]
  }, {
    label: "Impact Seed Fund",
    fullName: "",
    line: "Seed funding for Hinman CEOs students",
    tags: ["Funding"]
  }, {
    label: "Startup Shell",
    fullName: "",
    line: "Student-run co-working space and incubator",
    tags: ["Community & space"]
  }],
  filters: ["All", "Undergraduate", "Graduate", "Online", "Funding", "Community & space"],
  stages: [{
    n: 1,
    name: "Blueprint",
    tagline: "Where you learn to think like a builder."
  }, {
    n: 2,
    name: "Proving Ground",
    tagline: "Where ideas get tested against the real world."
  }, {
    n: 3,
    name: "Assembly Line",
    tagline: "Where companies get built."
  }, {
    n: 4,
    name: "Scale-Up",
    tagline: "Where they grow and take off."
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// webflow-export/idea-factory.js
try { (() => {
/* ============================================================
   Idea Factory — custom motion for Webflow  (vanilla JS, no deps)
   ------------------------------------------------------------
   Host this file (GitHub + jsDelivr) and load it in Webflow
   site/page custom code, BEFORE </body>:
     <script defer src="https://cdn.jsdelivr.net/gh/<user>/<repo>@<ver>/idea-factory.js"></script>

   Every effect selects elements by CLASS (assigned in the Designer).
   No image URL or one-off ID is hardcoded, so swapping content in
   Webflow keeps the behavior. Safe to run on pages missing some
   sections — each init no-ops if its elements aren't found.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function ready(fn) {
    if (document.readyState !== "loading") fn();else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ---- 1. HERO reading highlight ----------------------------------------
     Markup: <h1 class="if-hero-h1"> <span class="if-hero-word">…</span> … </h1>
     On first hover the spotlight sweeps word-by-word, then all rise to full. */
  function initHeroReading() {
    var h1 = document.querySelector(".if-hero-h1");
    if (!h1) return;
    var words = h1.querySelectorAll(".if-hero-word");
    if (!words.length) return;
    var DIM = 0.62;
    function setAll(o) {
      words.forEach(function (w) {
        w.style.opacity = o;
      });
    }
    if (reduce) {
      setAll(1);
      return;
    }
    setAll(1); // load at full power
    var started = false;
    function sweep() {
      if (started) return;
      started = true;
      var D = 180,
        gap = 40,
        ideasExtra = 230; // ideas(index 1) lingers
      var seq = [],
        i;
      for (i = 0; i < words.length; i++) {
        seq.push({
          k: i,
          hold: D + (i === 1 ? ideasExtra : 0)
        });
        if (i < words.length - 1) seq.push({
          k: -1,
          hold: gap
        });
      }
      seq.push({
        k: 999,
        hold: 0
      });
      var s = 0;
      function step() {
        var cur = seq[s];
        words.forEach(function (w, idx) {
          w.style.opacity = cur.k === 999 ? 1 : cur.k === idx ? 1 : DIM;
        });
        if (cur.k === 999) h1.classList.add("is-settling");
        s++;
        if (s < seq.length) setTimeout(step, cur.hold);
      }
      setTimeout(step, 140); // small delay after first hover
    }
    h1.closest("section").addEventListener("mouseenter", sweep);
    h1.closest("section").addEventListener("touchstart", sweep, {
      passive: true
    });
  }

  /* ---- 2. MANIFESTO sentence lift ---------------------------------------
     Markup: <h2 class="if-manifesto"><span class="if-manifesto-line">…</span> …</h2>
     Plays once when scrolled into the lower-middle of the viewport. */
  function initManifesto() {
    var h2 = document.querySelector(".if-manifesto");
    if (!h2) return;
    var lines = h2.querySelectorAll(".if-manifesto-line");
    if (!lines.length || reduce) return;
    var played = false;
    function run() {
      var HOLD = 1700,
        GAP = 620,
        seq = [],
        i;
      for (i = 0; i < lines.length; i++) {
        seq.push({
          k: i,
          hold: HOLD
        });
        if (i < lines.length - 1) seq.push({
          k: -1,
          hold: GAP
        });
      }
      seq.push({
        k: 999,
        hold: 0
      });
      var s = 0;
      function step() {
        var cur = seq[s];
        if (cur.k === 999) {
          h2.classList.remove("is-dimming");
          lines.forEach(function (l) {
            l.classList.remove("is-lift");
          });
        } else {
          h2.classList.add("is-dimming");
          lines.forEach(function (l, idx) {
            l.classList.toggle("is-lift", idx === cur.k);
          });
        }
        s++;
        if (s < seq.length) setTimeout(step, cur.hold);
      }
      step();
    }
    function check() {
      if (played) return;
      var r = h2.getBoundingClientRect(),
        vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top >= 0 && r.bottom <= vh && r.top <= vh * 0.55) {
        played = true;
        window.removeEventListener("scroll", check);
        run();
      }
    }
    window.addEventListener("scroll", check, {
      passive: true
    });
    window.addEventListener("resize", check);
    check();
  }

  /* ---- 3. PROOF count-up ------------------------------------------------
     Markup: <div class="if-countup">$94.8B</div>  (final value as text)
     Rolls 0 → value when scrolled into view, fading in WHILE counting,
     accelerating into the final number. Preserves prefix/suffix/commas. */
  function initCountUp() {
    var els = document.querySelectorAll(".if-countup");
    if (!els.length) return;
    els.forEach(function (el) {
      var value = el.getAttribute("data-value") || el.textContent.trim();
      var m = value.match(/^([^\d]*)([\d.,]+)(.*)$/) || [null, "", "0", ""];
      var numStr = m[2],
        hasComma = numStr.indexOf(",") >= 0,
        plain = numStr.replace(/,/g, "");
      var dot = plain.indexOf("."),
        decimals = dot >= 0 ? plain.length - dot - 1 : 0;
      var prefix = m[1] || "",
        suffix = m[3] || "",
        target = parseFloat(plain) || 0;
      function fmt(n) {
        var s = n.toFixed(decimals);
        if (hasComma) {
          var p = s.split(".");
          p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          s = p.join(".");
        }
        return prefix + s + suffix;
      }
      if (reduce) {
        el.textContent = value;
        el.style.opacity = 1;
        return;
      }
      el.style.opacity = 0;
      el.textContent = fmt(0);
      var started = false,
        raf;
      function run() {
        var dur = 1600,
          fade = 480,
          t0 = performance.now();
        function tick(now) {
          var dt = now - t0,
            p = Math.min(1, dt / dur),
            e = p * p * p; // easeInCubic
          el.textContent = p < 1 ? fmt(target * e) : value;
          el.style.opacity = Math.min(1, dt / fade).toFixed(3);
          if (p < 1) raf = requestAnimationFrame(tick);else el.style.opacity = 1;
        }
        raf = requestAnimationFrame(tick);
      }
      function check() {
        if (started) return;
        var r = el.getBoundingClientRect(),
          vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh * 0.85 && r.bottom > 0) {
          started = true;
          window.removeEventListener("scroll", check);
          run();
        }
      }
      window.addEventListener("scroll", check, {
        passive: true
      });
      window.addEventListener("resize", check);
      check();
    });
  }

  /* ---- 4. STAGE headline parallax + photo zoom --------------------------
     Markup: <section class="if-stage-moment">
               <img class="if-stage-photo"> <div class="if-stage-text">…</div>
             </section>
     Headline drifts down & settles (locks once); photo zooms on scroll-down,
     holds, re-arms when scrolled fully back out of view. */
  function initStage() {
    var sec = document.querySelector(".if-stage-moment");
    if (!sec || reduce) return;
    var txt = sec.querySelector(".if-stage-text");
    var img = sec.querySelector(".if-stage-photo");
    var smooth = function (x) {
      return x * x * x * (x * (x * 6 - 15) + 10);
    };
    var locked = false,
      txtRaf;
    function txtFrame() {
      txtRaf = null;
      if (locked || !txt) return;
      var rect = sec.getBoundingClientRect(),
        vh = window.innerHeight || document.documentElement.clientHeight;
      var amp = 180,
        startTop = vh * 0.88,
        endTop = vh * 0.16;
      var p = Math.max(0, Math.min(1, (startTop - rect.top) / (startTop - endTop)));
      var over = 12,
        tt = 0.72,
        shift;
      if (p < tt) shift = -amp + (amp + over) * smooth(p / tt);else shift = over * (1 - smooth((p - tt) / (1 - tt)));
      txt.style.transform = "translateY(" + shift.toFixed(1) + "px)";
      txt.style.opacity = (p * p).toFixed(3);
      if (p >= 1) {
        locked = true;
        txt.style.transform = "translateY(0px)";
        txt.style.opacity = "1";
      }
    }
    if (txt) {
      var onScroll = function () {
        if (txtRaf == null) txtRaf = requestAnimationFrame(txtFrame);
      };
      txtFrame();
      window.addEventListener("scroll", onScroll, {
        passive: true
      });
      window.addEventListener("resize", onScroll);
    }
    if (img) {
      var MIN = 1.0,
        MAX = 1.16,
        cur = null,
        peak = 0;
      (function zoomFrame() {
        var rect = sec.getBoundingClientRect(),
          vh = window.innerHeight || document.documentElement.clientHeight;
        var p = Math.max(0, Math.min(1, (vh * 0.88 - rect.top) / (vh * 0.88 - vh * 0.16)));
        if (rect.top >= vh) {
          peak = 0;
          cur = MIN;
        } else if (p > peak) peak = p;
        if (cur == null) cur = MIN;
        var eased = 1 - Math.pow(1 - peak, 3),
          tgt = MIN + (MAX - MIN) * eased;
        cur += (tgt - cur) * 0.1;
        if (Math.abs(tgt - cur) < 0.0002) cur = tgt;
        img.style.transform = "translateZ(0) scale(" + cur.toFixed(4) + ")";
        requestAnimationFrame(zoomFrame);
      })();
    }
  }

  /* ---- 5. NAVBAR retract at footer --------------------------------------
     Markup: <nav class="if-navbar"> … </nav> and a footer that contains
     <div class="if-foot-cols"> (the nav-link columns). Navbar slides up once
     those columns are in view; re-emerges on scroll up. */
  function initNavbarRetract() {
    var nav = document.querySelector(".if-navbar");
    var target = document.querySelector(".if-foot-cols");
    if (!nav || !target) return;
    nav.style.transition = "max-height 340ms " + getComputedStyle(document.documentElement).getPropertyValue("--if-ease-glide");
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var hide = target.getBoundingClientRect().top < vh - 160;
      nav.style.maxHeight = hide ? "0px" : nav.scrollHeight + "px";
      nav.style.overflow = "hidden";
    }
    window.addEventListener("scroll", check, {
      passive: true
    });
    window.addEventListener("resize", check);
    check();
  }

  /* ---- 6. HERO font-load gate (no fallback-font flash) ------------------
     Add class `font-pending` to .if-hero-h1 in the Designer; this removes it
     once the heading font is actually painted. */
  function initFontGate() {
    var h1 = document.querySelector(".if-hero-h1.font-pending");
    if (!h1) {
      return;
    }
    function reveal() {
      h1.classList.remove("font-pending");
    }
    if (!(document.fonts && document.fonts.load)) {
      reveal();
      return;
    }
    document.fonts.load('800 1em "Interstate"').then(function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(reveal);
      });
    }).catch(reveal);
    setTimeout(reveal, 3000); // safety
  }
  ready(function () {
    initFontGate();
    initHeroReading();
    initManifesto();
    initCountUp();
    initStage();
    initNavbarRetract();
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "webflow-export/idea-factory.js", error: String((e && e.message) || e) }); }

__ds_ns.ColorBlock = __ds_scope.ColorBlock;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.JourneyBar = __ds_scope.JourneyBar;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.StageGlyph = __ds_scope.StageGlyph;

__ds_ns.AudienceCard = __ds_scope.AudienceCard;

__ds_ns.ProgramCard = __ds_scope.ProgramCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SearchField = __ds_scope.SearchField;

})();
