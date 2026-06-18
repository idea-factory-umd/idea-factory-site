// Footer.jsx — editorial footer: gold Mondrian accent strip, a bold
// "Have an idea?" CTA band, structured link columns, newsletter + social.
// Reads tweak values off window.IF_TWEAKS (set by App) for live exploration.
const { Button: IFButton } = window.IdeaFactoryDesignSystem_745a71;

function IFFooter({ onNav, basePath = "../../", tweaks }) {
  const t = tweaks || {};
  const allInterstate = t.footerFont !== "mixed"; // default: all Interstate
  const bg = t.footerBg === "red" ? "var(--md-red)" : "var(--md-black)";
  const showCta = t.footerCta !== false;
  const accent = t.footerAccent === false ? null : (t.footerAccent === "red" ? "var(--md-red)" : "var(--md-gold)");

  // Body/utility text face — Interstate (tight, uppercase-friendly) by default;
  // Georgia only when the "mixed" option is chosen.
  const bodyFace = allInterstate ? "var(--font-heading)" : "var(--font-body)";

  // Address block ("under the logos"): refined, widely-tracked light caps —
  // softer than heavy uppercase.
  const addrStyle = { fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "12.5px", lineHeight: 1.9, letterSpacing: "0.16em", textTransform: "uppercase", fontStyle: "normal", color: "rgba(255,255,255,0.62)" };

  // Anchor the gold vertical line so it terminates at the "Give" button's baseline
  // (re-measured on any layout-affecting change), rather than running to the footer floor.
  const giveRef = React.useRef(null);
  const barRef = React.useRef(null);
  const footerRef = React.useRef(null);
  const ctaHeadRef = React.useRef(null);
  const colsRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const give = giveRef.current, bar = barRef.current, foot = footerRef.current;
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
      const settleTop = vh * 0.62;            // settles when the headline's top reaches ~62% down the viewport
      const span = Math.max(1, vh - settleTop);
      let p = (vh - rect.top) / span;         // 0 as it enters → 1 at the settle point, then held
      p = Math.max(0, Math.min(1, p));
      const opacity = 1 - (1 - p) * (1 - p);  // easeOutQuad fade-in (no positional movement)
      el.style.opacity = opacity.toFixed(3);
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [showCta]);

  const linkGroups = [
    { head: "Explore", links: ["Students", "Faculty/Researchers", "Companies", "Partners"] },
    { head: "Discover", links: ["News", "Events", "Archives", "Impact"] },
    { head: "Visit", links: ["About", "Directions", "Timeline", "Contact"] },
  ];

  return (
    <footer ref={footerRef} style={{ background: bg, color: "var(--md-white)", position: "relative", "--brand-col": "calc((min(100vw, var(--container)) - 2 * var(--gutter) - var(--grid-gap)) / 2)" }}>
      {/* Gold vertical bar — sits at the same x as the header's gold accent block, so it
          reads as a continuation of that line. It stops at the "Give" button and its
          bottom is bevelled to match the angle of the logo window's top edge (~10°). */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
        <div style={{ maxWidth: "var(--container)", height: "100%", margin: "0 auto", position: "relative" }}>
          <div ref={barRef} style={{ position: "absolute", top: 0, right: 0, width: "16px", height: "70%", background: "var(--md-gold)", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 2.8px), 0 100%)" }}></div>
        </div>
      </div>
      {/* Mondrian accent strip */}
      {accent && (
        <div aria-hidden="true" style={{ display: "flex", height: "8px", position: "relative", zIndex: 5, boxShadow: "0 3px 5px rgba(0,0,0,0.38)" }}>
          <div style={{ flex: 5, background: accent }}></div>
          <div style={{ flex: 2, background: "var(--md-white)" }}></div>
          <div style={{ flex: 3, background: accent === "var(--md-gold)" ? "var(--md-red)" : "var(--md-gold)" }}></div>
        </div>
      )}

      {/* CTA band */}
      {showCta && (
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 calc(var(--gutter) + 40px) 0 var(--gutter)" }}>
          <div className="if-foot-grid" style={{ display: "grid", gridTemplateColumns: "var(--brand-col) minmax(0, 1fr)", gap: "var(--grid-gap)", alignItems: "center", padding: "clamp(40px, 5vw, 72px) 0" }}>
            <h2 ref={ctaHeadRef} className="if-foot-minw if-foot-cta-head" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(34px, 5.65vw, 52px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "var(--md-white)", margin: 0, maxWidth: "max-content", willChange: "opacity" }}>
              <span style={{ whiteSpace: "nowrap" }}>Have an idea?</span><br /><span style={{ color: "var(--md-gold)", whiteSpace: "nowrap" }}>Let's build it.</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "stretch" }}>
              <p style={{ fontFamily: bodyFace, fontSize: allInterstate ? "15px" : "16px", lineHeight: 1.5, color: "rgba(255,255,255,0.78)", margin: 0, letterSpacing: allInterstate ? "0.01em" : 0 }}>
                Get the programs, deadlines, and events that turn ideas into companies — straight to your inbox.
              </p>
              <div className="if-subscribe-row" style={{ display: "flex", gap: "10px", flexWrap: "nowrap" }}>
                <input type="email" placeholder="you@umd.edu" aria-label="Email address"
                  onFocus={(e) => { e.currentTarget.style.outline = "none"; e.currentTarget.style.background = "var(--md-gold)"; e.currentTarget.style.color = "var(--md-black)"; e.currentTarget.style.borderColor = "var(--md-gold)"; }}
                  onBlur={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--md-white)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "15px", padding: "12px 16px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", color: "var(--md-white)", flex: "1 1 0", minWidth: 0, outline: "none" }} />
                <IFButton variant="primary" style={{ flexShrink: 0, whiteSpace: "nowrap", borderRadius: 0 }}><span className="if-btn-text">Get updates</span></IFButton>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(40px, 5vw, 64px) calc(var(--gutter) + 40px) clamp(40px, 5vw, 64px) var(--gutter)" }}>
        <div className="if-foot-grid" style={{ display: "grid", gridTemplateColumns: "var(--brand-col) minmax(0, 1fr)", gap: "var(--grid-gap)" }}>
          {/* Brand column */}
          <div className="if-foot-brand" style={{ maxWidth: "460px", width: "fit-content" }}>
            <div className="if-foot-minw if-foot-logos" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span className="if-logo-link" style={{ display: "inline-flex" }}>
                <window.IFLogoInline className="if-logo-mark" tone="white" height={44} />
              </span>
              <span aria-hidden="true" style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.25)" }}></span>
              <span className="if-logo-link" style={{ display: "inline-flex" }}>
                <img className="if-logo-mark" src={`${basePath}assets/logo/umd-primary-white.svg`} alt="University of Maryland" style={{ height: 30, width: "auto", display: "block" }} />
              </span>
            </div>
            <p style={{ margin: 0, marginTop: "20px", maxWidth: "38ch", ...addrStyle }}>
              <span style={{ whiteSpace: "nowrap" }}>A. James Clark School of Engineering</span><br />University of Maryland<br />College Park, MD 20742
            </p>
            <div className="if-foot-minw" style={{ display: "flex", gap: "12px", marginTop: "24px", alignItems: "center", flexWrap: "wrap", width: "100%" }} aria-label="Social">
              {["X", "in", "f", "IG"].map((s) => (
                <a key={s} href="#" className="if-social" style={{ width: 40, height: 40, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.3)", color: "var(--md-white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}><span className="if-btn-text">{s}</span></a>
              ))}
              <a ref={giveRef} href="#" onClick={(e) => { e.preventDefault(); onNav("home"); }} className="if-give" style={{ flex: "1 1 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: 40, padding: "0 18px", marginLeft: "4px", background: "var(--md-gold)", color: "var(--md-black)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none" }}>
                <span className="if-btn-text">Give <span aria-hidden="true">››</span></span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div ref={colsRef} className="if-foot-cols" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(16px, 2.4vw, 36px)" }}>
            {linkGroups.map((g) => (
              <nav key={g.head}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--md-gold)", marginBottom: "16px" }}>{g.head}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                  {g.links.map((item) => (
                    <a key={item} href="#" onClick={(e) => { e.preventDefault(); onNav(item === "Students" ? "students" : "home"); }} className="if-foot-link" style={{ fontFamily: bodyFace, fontWeight: allInterstate ? 500 : 400, fontSize: "16px", color: "rgba(255,255,255,0.82)", textDecoration: "none", letterSpacing: allInterstate ? "0.01em" : 0, overflowWrap: "normal" }}>
                      {item.split("/").map((part, k, arr) => (
                        <React.Fragment key={k}>{part}{k < arr.length - 1 ? <>/<wbr /></> : null}</React.Fragment>
                      ))}
                    </a>
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", marginTop: "clamp(32px, 4vw, 48px)", paddingTop: "var(--space-5)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", fontFamily: bodyFace, fontSize: "13px", color: "rgba(255,255,255,0.55)", letterSpacing: allInterstate ? "0.02em" : 0 }}>
          <span>© 2026 University of Maryland</span>
          <a href="#" className="if-foot-link" style={{ color: "rgba(255,255,255,0.75)", fontFamily: bodyFace }}>Idea Factory / REFI Staff and Students ››</a>
        </div>
      </div>
    </footer>
  );
}
window.IFFooter = IFFooter;
