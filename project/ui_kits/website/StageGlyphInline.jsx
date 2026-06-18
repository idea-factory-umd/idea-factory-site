// StageGlyphInline.jsx — inline, recolorable stage glyph (no white tile).
// Renders the SAME regularized geometry as the asset SVGs, but as inline
// SVG so each module can be recolored to contrast with the colored block
// it sits directly on. Used by the homepage four-stage band when the
// "Stage glyphs → on color" tweak is active.
function IFStageGlyphInline({ stage = 1, size = 56, palette = {}, className, style }) {
  const P = { red: "#e21833", black: "#000000", gold: "#ffd200", belt: "#7f7f7f", check: "#ffffff", ...palette };
  const bodies = {
    1: [
      <rect key="a" x="26" y="26" width="30" height="30" fill={P.red} />,
      <rect key="b" x="67" y="29" width="24" height="24" fill="none" stroke={P.red} strokeWidth="6" />,
      <rect key="c" x="29" y="67" width="24" height="24" fill="none" stroke={P.red} strokeWidth="6" />,
      <rect key="d" x="67" y="67" width="24" height="24" fill="none" stroke={P.red} strokeWidth="6" />,
    ],
    2: [
      <rect key="a" x="26" y="26" width="30" height="30" fill={P.black} />,
      <rect key="b" x="26" y="64" width="30" height="30" fill={P.black} />,
      <rect key="c" x="67" y="29" width="24" height="24" fill="none" stroke={P.red} strokeWidth="6" />,
      <rect key="d" x="67" y="67" width="24" height="24" fill="none" stroke={P.red} strokeWidth="6" />,
      <path key="e" d="M32 41.6 L38 47.6 L49.4 34.4" fill="none" stroke={P.check} strokeWidth="4.8" strokeLinecap="square" strokeLinejoin="miter" />,
      <path key="f" d="M32 79.6 L38 85.6 L49.4 72.4" fill="none" stroke={P.check} strokeWidth="4.8" strokeLinecap="square" strokeLinejoin="miter" />,
    ],
    3: [
      <rect key="a" x="7" y="37.5" width="30" height="30" fill={P.red} />,
      <rect key="b" x="45" y="37.5" width="30" height="30" fill={P.black} />,
      <rect key="c" x="83" y="37.5" width="30" height="30" fill={P.gold} />,
      <rect key="d" x="7" y="75.5" width="106" height="7" fill={P.belt} />,
    ],
    4: [
      <rect key="a" x="83" y="7" width="30" height="30" fill={P.gold} />,
      <rect key="b" x="83" y="45" width="30" height="30" fill={P.gold} />,
      <rect key="c" x="45" y="45" width="30" height="30" fill={P.black} />,
      <rect key="d" x="83" y="83" width="30" height="30" fill={P.gold} />,
      <rect key="e" x="45" y="83" width="30" height="30" fill={P.black} />,
      <rect key="f" x="7" y="83" width="30" height="30" fill={P.red} />,
    ],
  };
  const stages = window.IdeaFactoryDesignSystem_745a71.StageGlyph.stages;
  const meta = stages[stage] || stages[1];
  return (
    <svg className={className} viewBox="0 0 120 120" width={size} height={size} role="img"
         aria-label={`Stage ${String(stage).padStart(2, "0")} — ${meta.name}`}
         style={{ display: "block", overflow: "visible", ...style }}>
      {bodies[stage] || bodies[1]}
    </svg>
  );
}
window.IFStageGlyphInline = IFStageGlyphInline;
