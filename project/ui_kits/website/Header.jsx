// Header.jsx — the family chrome: thin UMD bar → identity band → navbar
const { Logo, SearchField } = window.IdeaFactoryDesignSystem_745a71;

function IFHeader({ active, onNav, basePath = "../../" }) {
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
    if (!navUnstick) { setNavRetract(false); return; }
    const check = () => {
      // Trigger off the footer's NAV COLUMNS (not the footer top) so the navbar
      // only retracts once those bottom nav links are genuinely in view.
      const target = document.querySelector(".if-foot-cols") || document.querySelector("footer");
      if (!target) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      setNavRetract(target.getBoundingClientRect().top < vh - 160);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [navUnstick]);
  // Gold accent line: start it even with the TOP of the logo (not the frame top),
  // with a bevelled top mirroring the footer line's bottom angle.
  const bandRef = React.useRef(null);
  const goldBarRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const band = bandRef.current, bar = goldBarRef.current;
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
    ro.observe(band); ro.observe(logo);
    return () => ro.disconnect();
  }, []);
  const goto = (p) => { setMobileOpen(false); onNav(p); };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }} onMouseLeave={() => setOpenMenu(null)}>
      {/* 1 · Thin UMD bar — affiliation only, centered */}
      <div style={{ background: "var(--md-black)", color: "var(--md-white)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "7px var(--gutter)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-heading)", fontSize: "12px", letterSpacing: "0.02em", textTransform: "uppercase", textAlign: "center" }}>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }}>University of Maryland</a>
          <span style={{ opacity: 0.5 }}>|</span>
          <a href="#" style={{ color: "rgba(255,255,255,0.78)" }}>A. James Clark School of Engineering</a>
        </div>
      </div>

      {/* 2 · Identity band — Mondrian block language; logo's white field is one block */}
      <div style={{ background: "var(--md-white)", borderBottom: "var(--border-width) solid var(--border)" }}>
        <div ref={bandRef} className="if-id-band" style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", alignItems: "stretch" }}>
          <a href="#" className="if-logo-link" onClick={(e) => { e.preventDefault(); onNav("home"); }} style={{ display: "flex", alignItems: "center", padding: "18px var(--gutter)", borderRight: "var(--border-width) solid var(--border)" }}>
            <window.IFLogoInline className="if-logo-mark" height={58} />
          </a>
          {/* tagline fills the band instead of dead space */}
          <div className="if-id-tagline" style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 var(--gutter)", minWidth: 0 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.4, color: "var(--text-muted)", maxWidth: "44ch" }}>
              The University of Maryland's home for turning ideas into companies. <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--md-red)", whiteSpace: "nowrap" }}>One place, every stage.</span>
            </p>
          </div>
          <div className="if-id-search" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 var(--gutter)", borderLeft: "var(--border-width) solid var(--border)" }}>
            <SearchField />
          </div>
          {/* Hamburger — mobile only (CSS-toggled) */}
          <button className="if-burger" aria-label="Menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((o) => !o)} style={{ display: "none", flexDirection: "column", justifyContent: "center", gap: "5px", width: 56, border: "none", borderLeft: "var(--border-width) solid var(--border)", background: "transparent", cursor: "pointer" }}>
            <span style={{ display: "block", width: 24, height: 2.5, background: "var(--md-black)", margin: "0 auto", transform: mobileOpen ? "translateY(7.5px) rotate(45deg)" : "none", transition: "transform var(--dur-base) var(--ease-std)" }}></span>
            <span style={{ display: "block", width: 24, height: 2.5, background: "var(--md-black)", margin: "0 auto", opacity: mobileOpen ? 0 : 1, transition: "opacity var(--dur-fast) var(--ease-std)" }}></span>
            <span style={{ display: "block", width: 24, height: 2.5, background: "var(--md-black)", margin: "0 auto", transform: mobileOpen ? "translateY(-7.5px) rotate(-45deg)" : "none", transition: "transform var(--dur-base) var(--ease-std)" }}></span>
          </button>
          {/* gold accent line — starts even with the top of the logo; bevelled top mirrors the footer line's bottom */}
          <div style={{ width: "16px", position: "relative", alignSelf: "stretch" }} aria-hidden="true">
            <div ref={goldBarRef} style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: "9px", background: "var(--md-gold)", clipPath: "polygon(0 0, 100% 2.8px, 100% 100%, 0 100%)" }}></div>
          </div>
        </div>
      </div>

      {/* 3 · Navbar — navigation with dropdowns (desktop) */}
      <nav className="if-navbar" style={{ background: "var(--md-red)", position: "relative", maxHeight: navRetract ? "0px" : "64px", overflow: navRetract ? "hidden" : "visible", transition: "max-height 340ms var(--ease-out)" }}>
        {t.headerLineToNav && (
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            <div style={{ maxWidth: "var(--container)", height: "100%", margin: "0 auto", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "16px", background: "var(--md-gold)" }}></div>
            </div>
          </div>
        )}
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "flex", flexWrap: "nowrap" }}>
          {nav.map((item) => {
            const isStudents = item === "Students";
            const isHome = item === "Home";
            const on = (active === "students" && isStudents) || (active === "home" && isHome);
            const submenu = submenus[item];
            const linkStyle = {
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              color: item === "Give" ? "var(--md-gold)" : "var(--md-white)",
              lineHeight: 1, /* fixed: Interstate's default line box is ~1.7 and skews vertical centering */
              padding: "15px 16px 13px", /* bottom trimmed 2px: caps-only text leaves the em box's descender zone empty, so equal padding reads as extra space below — this optically centers the letters */
              background: on ? "var(--action-active)" : "transparent",
              textDecoration: "none",
              borderTop: "4px solid transparent",
              borderBottom: on ? "4px solid var(--md-gold)" : "4px solid transparent",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            };
            if (submenu) {
              return (
                <div
                  key={item}
                  className="if-nav-item"
                  style={{ position: "relative" }}
                  onMouseEnter={() => setOpenMenu(item)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <a
                    href="#"
                    className="if-nav-link"
                    aria-haspopup="true"
                    aria-expanded={openMenu === item}
                    onClick={(e) => { e.preventDefault(); setOpenMenu(openMenu === item ? null : item); }}
                    style={linkStyle}
                  >
                    {item}
                    <span aria-hidden="true" style={{ fontSize: 9, opacity: 0.85, transform: openMenu === item ? "rotate(180deg)" : "none", transition: "transform var(--dur-fast) var(--ease-std)" }}>▾</span>
                  </a>
                  {openMenu === item && (
                    <div
                      role="menu"
                      style={{
                        position: "absolute", top: "100%", left: 0, zIndex: 50, minWidth: 220,
                        background: "var(--md-white)",
                        boxShadow: "var(--shadow-lg)",
                        borderTop: "4px solid var(--md-gold)",
                      }}
                    >
                      {submenu.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          role="menuitem"
                          className="if-nav-sublink"
                          onClick={(e) => { e.preventDefault(); setOpenMenu(null); onNav("home"); }}
                          style={{
                            display: "block",
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: "14px",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "var(--text-strong)",
                            padding: "12px 18px",
                            textDecoration: "none",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          <span className="if-nav-sublink-text">{sub}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={item}
                href="#"
                className={item === "Give" ? "if-give-nav" : "if-nav-link"}
                onClick={(e) => { e.preventDefault(); if (isStudents) onNav("students"); else onNav("home"); }}
                style={item === "Give" ? {
                  marginLeft: "auto",       /* right-justify within the navbar */
                  marginRight: "16px",      /* land the right edge on the search box's right edge (884) above */
                  alignSelf: "center",      /* vertically center in the row — does NOT grow the navbar height */
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  lineHeight: 1,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                } : linkStyle}
              >
                {item}
              </a>
            );
          })}
        </div>
      </nav>

      {/* 4 · Mobile menu — shown via CSS at ≤620px when toggled open */}
      {mobileOpen && (
        <div className="if-mobile-menu" style={{ background: "var(--md-white)", borderBottom: "var(--border-width-strong) solid var(--md-black)", maxHeight: "calc(100dvh - 120px)", overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: "36px" }}>
          <div style={{ padding: "16px var(--gutter)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, minWidth: 0 }}><SearchField /></div>
            <a
              href="#"
              className="if-give-mobile"
              onClick={(e) => { e.preventDefault(); goto("home"); }}
              style={{ flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase", padding: "10px 18px", lineHeight: 1, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              <span className="if-btn-text">Give</span>
            </a>
          </div>
          {nav.filter((item) => item !== "Give").map((item) => {
            const submenu = submenus[item];
            const isStudents = item === "Students";
            return (
              <div key={item} style={{ borderBottom: "1px solid var(--border)" }}>
                <a
                  href="#"
                  className="if-mnav-link"
                  onClick={(e) => { e.preventDefault(); goto(isStudents ? "students" : "home"); }}
                  style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "16px", letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--md-black)", padding: "15px var(--gutter)", textDecoration: "none" }}
                >
                  <span className="if-mnav-text">{item}</span>
                </a>
                {submenu && (
                  <div style={{ paddingBottom: "8px" }}>
                    {submenu.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="if-msub-link"
                        onClick={(e) => { e.preventDefault(); goto("home"); }}
                        style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "14px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", padding: "8px var(--gutter) 8px calc(var(--gutter) + 16px)", textDecoration: "none" }}
                      >
                        <span className="if-mnav-text">{sub}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
window.IFHeader = IFHeader;
