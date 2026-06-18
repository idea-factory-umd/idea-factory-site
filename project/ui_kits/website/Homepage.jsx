// Homepage.jsx — flagship homepage. Art direction: "Editorial Mondrian"
// Massive Interstate type, full-bleed building photography, asymmetric
// color-block composition, red→black→gold progression.
const IFC = window.IdeaFactoryDesignSystem_745a71;

const IMG = {
  flare: "img/building-flare.png",
  entrance: "img/building-entrance.png",
  dusk: "img/building-dusk.jpg",
};

// Animated count-up for the proof stats. Parses the value's prefix/number/suffix
// ($94.8B, 18,992, 72,000+) and rolls the number from 0 to target when scrolled
// into view, preserving decimals + thousands separators. Module scope so Homepage
// re-renders (e.g. the hero sweep) never remount/restart it. Reduced-motion shows final.
const IFStatCount = React.memo(function IFStatCount({ value, style }) {
  const ref = React.useRef(null);
  const parse = React.useMemo(() => {
    const m = String(value).match(/^([^\d]*)([\d.,]+)(.*)$/) || [null, "", "0", ""];
    const numStr = m[2];
    const hasComma = numStr.includes(",");
    const plain = numStr.replace(/,/g, "");
    const dot = plain.indexOf(".");
    const decimals = dot >= 0 ? plain.length - dot - 1 : 0;
    return { prefix: m[1] || "", suffix: m[3] || "", target: parseFloat(plain) || 0, decimals, hasComma };
  }, [value]);
  const fmt = React.useCallback((n) => {
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
    if (reduce) { el.textContent = value; el.style.opacity = "1"; return; }
    el.style.opacity = "0";
    el.textContent = fmt(0);
    let started = false, raf = null;
    const run = () => {
      const dur = 1600, fadeDur = 480, t0 = performance.now();
      const ease = (x) => x * x * x; // easeInCubic — counting accelerates toward the end
      const tick = (now) => {
        const dt = now - t0;
        const p = Math.min(1, dt / dur);
        el.textContent = p < 1 ? fmt(parse.target * ease(p)) : value;
        el.style.opacity = Math.min(1, dt / fadeDur).toFixed(3);
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.style.opacity = "1";
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
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    raf = requestAnimationFrame(onScrollOrResize); // catch the case where it's already in view
    return () => { cleanup(); if (raf) cancelAnimationFrame(raf); };
  }, [value, fmt, parse]);
  // Render once with opacity 0 (never shows a static figure); the effect owns text + opacity thereafter.
  return <div ref={ref} style={{ ...style, opacity: 0 }}>{value}</div>;
}, (a, b) => a.value === b.value); // memoize on value only — parent re-renders (hero sweep, etc.) must NOT reset our DOM-driven text/opacity

function Homepage({ onNav, basePath = "../../" }) {
  const D = window.IF_DATA;
  const { StageGlyph, Button } = IFC;
  const t = window.IF_TWEAKS || {};

  // Hero headline "reading" highlight: on first hover/touch a spotlight sweeps the
  // words one at a time (each brightens, then dims as the next lights), and when the
  // whole phrase has been read, they all rise to full power together and stay on.
  // heroStep: -1 = all dim, 0..4 = that word spotlit, 999 = all full.
  // Loads at FULL power; the dimming/spotlight sweep begins only on the first
  // hover/touch. Reduced-motion users never dim (sweep guard pre-tripped).
  const heroSweepStarted = React.useRef(
    !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  );
  const [heroStep, setHeroStep] = React.useState(999);
  const startHeroSweep = React.useCallback(() => {
    if (heroSweepStarted.current) return;
    heroSweepStarted.current = true;
    // Build a slow "reading" timeline: each word is spotlit, then a brief all-dim
    // pause before the next lights. "ideas" lingers longer (speech cadence).
    const D = 180, gap = 40, ideasExtra = 230;
    const seq = [];
    [0, 1, 2, 3, 4].forEach((w) => {
      seq.push({ step: w, hold: D + (w === 1 ? ideasExtra : 0) });
      if (w < 4) seq.push({ step: -1, hold: gap }); // slight pause between words
    });
    seq.push({ step: 999, hold: 0 }); // all rise to full together
    let k = 0;
    const run = () => {
      const { step, hold } = seq[k];
      setHeroStep(step);
      k += 1;
      if (k < seq.length) setTimeout(run, hold);
    };
    setTimeout(run, 140); // slight delay after the first mouse-over before it begins
  }, []);
  const heroWordOpacity = (idx) => (heroStep === 999 ? 1 : (heroStep === idx ? 1 : 0.62));

  // Hold the hero headline hidden until Interstate Black (800) is actually loaded,
  // so it never flashes the fallback font and then swaps. We do NOT trust
  // document.fonts.check() for the initial value (it reports "available" before the
  // glyphs are committed to a paint, which let the fallback flash through). Instead
  // we start hidden whenever the Font Loading API exists and reveal only after the
  // specific face's load() promise resolves AND a frame has painted.
  const [heroFontReady, setHeroFontReady] = React.useState(
    () => !(typeof document !== "undefined" && document.fonts && document.fonts.load)
  );
  React.useEffect(() => {
    if (heroFontReady) return;
    let done = false;
    const reveal = () => { if (!done) { done = true; setHeroFontReady(true); } };
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
    const sec = stageMomentRef.current, txt = stageTextRef.current;
    if (!sec || !txt) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = null;
    let locked = false; // once settled, hold — don't reverse on scroll up or replay on scroll down
    const update = () => {
      raf = null;
      if (locked) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const amp = 180;                       // headline's starting vertical offset (px ABOVE its resting spot)
      // Tie the progress to where the SECTION sits in the viewport so the motion
      // plays out (and settles) while the picture is high in the frame — not while
      // it's still low. p=0 as the section is well into view from the bottom; p=1
      // once its top has risen near the top of the frame, then held.
      const startTop = vh * 0.88;            // begin
      const endTop = vh * 0.16;              // settle (picture high in frame)
      let p = (startTop - rect.top) / (startTop - endTop);
      p = Math.max(0, Math.min(1, p));
      // Gentle settle with a subtle overbounce. Both phases use smootherstep
      // (velocity → 0 at the ends), so it holds high at the start, eases DOWN and
      // decelerates into a small overshoot, then softly returns to rest — no hard hit.
      const smooth = (x) => x * x * x * (x * (x * 6 - 15) + 10); // smootherstep
      const over = 12;                        // overshoot below resting (px) — subtle
      const tt = 0.72;                        // progress at which it reaches the overshoot point
      let shift;
      if (p < tt) {
        shift = -amp + (amp + over) * smooth(p / tt);  // hold high → ease down, decelerating into +over
      } else {
        shift = over * (1 - smooth((p - tt) / (1 - tt))); // ease gently back up from +over to 0
      }
      const opacity = p * p;                  // fade-in, slightly accelerated (reaches opaque sooner)
      txt.style.transform = `translateY(${shift.toFixed(1)}px)`;
      txt.style.opacity = opacity.toFixed(3);
      if (p >= 1) {                           // fully settled — lock in place, no reverse/replay
        locked = true;
        txt.style.transform = "translateY(0px)";
        txt.style.opacity = "1";
      }
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
  }, []);

  // Subtle scroll-driven "Ken Burns" zoom on the dusk photo. Always-on, every pass.
  // SMOOTHNESS: a continuous rAF loop LERPs the displayed scale toward its scroll
  // target every frame, so motion is decoupled from sparse/aliased scroll events
  // (no choppy jumps). Only `scale` animates, against a FIXED origin — changing
  // transform-origin mid-zoom is itself a source of hitching, so we don't.
  const stageImgRef = React.useRef(null);
  React.useEffect(() => {
    const sec = stageMomentRef.current, img = stageImgRef.current;
    if (!sec || !img) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const MIN = 1.0, MAX = 1.16;
    let cur = null, peak = 0, raf = null, running = true;
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
      return { p, outBelow };
    };
    const frame = () => {
      if (!running) return;
      const { p, outBelow } = progress();
      if (outBelow) { peak = 0; cur = MIN; }   // re-arm (off-screen, so not visible)
      else if (p > peak) peak = p;             // grow only — hold, never undo, while in view
      if (cur == null) cur = MIN;
      const eased = 1 - Math.pow(1 - peak, 3); // easeOutCubic → gentle arrival
      const target = MIN + (MAX - MIN) * eased;
      cur += (target - cur) * 0.1;             // damped catch-up → always smooth
      if (Math.abs(target - cur) < 0.0002) cur = target;
      img.style.transform = `translateZ(0) scale(${cur.toFixed(4)})`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { running = false; if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Recolor so each glyph keeps its INTERNAL contrast (distinct modules stay
  // distinguishable) while contrasting with the block it sits on.
  const glyphOnColor = [
    { red: "#ffffff" },                                       // 01 — red block: all-red → all white
    { black: "#ffd200", red: "#ffffff", check: "#7a0f1d" },   // 02 — dark-red block: black→gold, red→white, checks→block color (read as cut-through)
    { black: "#ffffff", belt: "#b3b3b3" },                    // 03 — black block: black→white (red/gold stay)
    { gold: "#ffffff" },                                      // 04 — gold block: gold→white (black/red stay)
  ];
  // "Find your way in" grid — how the block sits off the white page.
  const audFrame = ({
    shadow:   { boxShadow: "0 14px 38px -22px rgba(0,0,0,0.32)" },
    hairline: { border: "1px solid var(--border)" },
    accent:   { borderTop: "6px solid var(--md-red)", boxShadow: "0 26px 64px -38px rgba(0,0,0,0.4)" },
    line:     { border: "2px solid var(--md-black)" },
    none:     {},
  })[t.audienceFrame || "shadow"];

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
      const HOLD = 1700, GAP = 620; // long enough to read a full sentence; longer pause between
      const seq = [];
      [0, 1, 2].forEach((s) => {
        seq.push({ step: s, hold: HOLD });
        if (s < 2) seq.push({ step: -1, hold: GAP });
      });
      seq.push({ step: 999, hold: 0 }); // all rise to full together (slow fade via CSS)
      let k = 0;
      const run = () => { const { step, hold } = seq[k]; setManiStep(step); k += 1; if (k < seq.length) setTimeout(run, hold); };
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
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);
  const maniActive = (i) => (maniStep !== 999 && maniStep === i);

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* ============ HERO ============ */}
      <section style={{ background: "var(--md-black)", position: "relative" }} onMouseEnter={startHeroSweep} onTouchStart={startHeroSweep}>
        <div className="if-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", minHeight: "min(86vh, 760px)" }}>
          {/* Left: type stack */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(28px, 5vw, 72px)", position: "relative", zIndex: 2 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "18px", letterSpacing: "0.01em", color: "var(--md-gold)", lineHeight: 1.3 }}>
              <span aria-hidden="true" style={{ display: "inline-block", width: "30px", height: "9px", marginRight: "12px", background: "var(--md-gold)", clipPath: "polygon(0 100%, 0 44%, 100% 0, 100% 100%)", verticalAlign: "middle" }}></span>
              <span style={{ whiteSpace: "nowrap" }}>Idea Factory ·</span> <span style={{ whiteSpace: "nowrap" }}>University of Maryland</span>
            </span>
            <h1 className={"if-hero-h1" + (heroStep === 999 && heroSweepStarted.current ? " hero-settling" : "")} style={{ color: "var(--md-white)", fontWeight: 800, fontSize: "clamp(58px, 8.5vw, 132px)", lineHeight: 0.86, letterSpacing: "-0.03em", margin: "0.3em 0", visibility: heroFontReady ? "visible" : "hidden" }}>
              <span className="if-hero-word" style={{ opacity: heroWordOpacity(0) }}>Where</span><br /><span className="if-hero-word" style={{ opacity: heroWordOpacity(1) }}>ideas</span> <span className="if-hero-word" style={{ opacity: heroWordOpacity(2) }}>go</span><br /><span className="if-hero-word" style={{ opacity: heroWordOpacity(3) }}>to</span> <span className="if-hero-word" style={{ opacity: heroWordOpacity(4), color: "var(--md-red)" }}>work.</span>
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "18px 28px" }}>
              <Button variant="primary" size="lg" iconAfter={<span>▾</span>} onClick={() => { const el = document.getElementById("audience"); const header = document.querySelector("header"); const offset = (header ? header.offsetHeight : 0) - 1; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: "smooth" }); }}>Find your path</Button>
            </div>
          </div>
          {/* Right: full-bleed building, with a gold accent block bleeding in */}
          <div style={{ position: "relative", overflow: "hidden", minHeight: 360 }}>
            <img src={IMG.flare} alt="The E. A. Fernandez Idea Factory building, sunlight flaring off its tiled facade and colored-glass window wall" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", left: 0, bottom: 0, width: "38%", height: "10px", background: "var(--md-gold)", zIndex: 2 }} />
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "10px", background: "var(--md-red)", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section style={{ background: "var(--surface)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(56px, 8vw, 120px) var(--gutter)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: "clamp(28px, 4vw, 48px)" }}>
            <span className="if-eyebrow">Who we are</span>
            <div style={{ flex: 1, height: 2, background: "var(--border)" }} />
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Est. 1983 · College Park</span>
          </div>
          <h2 ref={maniRef} className={"if-manifesto" + (maniStep !== 999 && maniStep !== -1 ? " mani-dimming" : "")} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4.6vw, 64px)", lineHeight: 1.03, letterSpacing: "-0.02em", color: "var(--text-strong)", margin: 0, maxWidth: "30ch" }}>
            <span className={"if-manifesto-line" + (maniActive(0) ? " mani-lift" : "")}>We are not a think tank.</span><br /><span className={"if-manifesto-line" + (maniActive(1) ? " mani-lift" : "")}>We are not a lecture hall.</span><br /><span className={"if-manifesto-line" + (maniActive(2) ? " mani-lift" : "")}>We are <span style={{ color: "var(--md-red)" }}>where ideas get built.</span></span>
          </h2>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(24px, 4vw, 64px)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65, color: "var(--text-muted)", margin: 0 }}>
              Students become entrepreneurs. Faculty research finds its way to market. Innovators across Maryland test and validate their ideas, refining them until they're ready for the real world.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65, color: "var(--text-muted)", margin: 0 }}>
              Startups get built. Maryland companies access the intellectual firepower they need to grow. For more than forty years, this is where the state's best ideas have gone to work.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FOUR-STAGE PROGRESSION ============ */}
      <section style={{ background: "var(--md-black)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(48px, 6vw, 88px) var(--gutter) 0" }}>
          <div style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}>
            <h2 style={{ color: "var(--md-white)", fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 0.95, margin: 0 }}>One factory. Four stages.</h2>
          </div>
        </div>
        <div className="if-stage-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "auto minmax(18px, 1fr) auto auto auto", gap: "2px", background: "rgba(255,255,255,0.12)" }}>
          {D.stages.map((s, i) => {
            const tones = [
              { bg: "var(--md-red)", fg: "#fff", num: "rgba(255,255,255,0.55)" },
              { bg: "#7a0f1d", fg: "#fff", num: "rgba(255,255,255,0.5)" },
              { bg: "var(--md-black)", fg: "#fff", num: "rgba(255,255,255,0.4)" },
              t.scaleUpText === "white"
                ? { bg: "var(--md-gold)", fg: "#fff", num: "rgba(255,255,255,0.6)" }
                : { bg: "var(--md-gold)", fg: "var(--md-black)", num: "rgba(0,0,0,0.4)" },
            ][i];
            return (
              <a key={s.n} href="#" onClick={(e) => e.preventDefault()} className="if-stage-cell"
                 style={{ background: tones.bg, color: tones.fg, padding: "clamp(24px,3vw,40px) clamp(18px,2vw,28px)", minHeight: 320, display: "grid", gridRow: "span 5", gridTemplateRows: "subgrid", justifyItems: "center", textAlign: "center", textDecoration: "none" }}>
                <div style={{ gridRow: 1, justifySelf: "start", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--fs-small)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", lineHeight: 1, color: "inherit" }}>
                  {String(s.n).padStart(2, "0")}
                </div>
                {/* row 2 is a 1fr spacer; rows 3-5 are shared across all four cells so the glyphs, names, and taglines each align */}
                {t.stageGlyphs === "on color"
                  ? <window.IFStageGlyphInline className="if-stage-glyph" stage={s.n} size={108} palette={glyphOnColor[i]} style={{ gridRow: 3, marginBottom: 22 }} />
                  : <StageGlyph className="if-stage-glyph" stage={s.n} variant="tiled" basePath={basePath} size={94} style={{ gridRow: 3, marginBottom: 22 }} />}
                <div style={{ gridRow: 4, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 2.4vw, 32px)", lineHeight: 1.02, letterSpacing: "-0.01em", color: "inherit" }}>{s.name}</div>
                <p style={{ gridRow: 5, fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.5, margin: "12px 0 0", color: "inherit", opacity: 0.92 }}>{s.tagline}</p>
              </a>
            );
          })}
        </div>
      </section>

      {/* ============ FULL-BLEED BUILDING MOMENT ============ */}
      <section ref={stageMomentRef} style={{ position: "relative", minHeight: "clamp(360px, 56vh, 620px)", aspectRatio: "3 / 2", display: "flex", alignItems: "flex-start", overflow: "hidden" }}>
        <img ref={stageImgRef} src={IMG.dusk} alt="The E. A. Fernandez Idea Factory at dusk, its colored-glass window wall lit magenta above the entrance stair and signage" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "34% 40%", transformOrigin: "38% 36%", willChange: "transform", backfaceVisibility: "hidden" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(215deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 38%, rgba(0,0,0,0) 62%)" }} />
        <div ref={stageTextRef} style={{ position: "absolute", top: "30%", left: 0, right: 0, maxWidth: "var(--container)", margin: "0 auto", width: "100%", padding: "0 var(--gutter)", willChange: "transform, opacity" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.92, letterSpacing: "-0.02em", margin: "0 clamp(12px, 3vw, 56px) 0 auto", maxWidth: "14ch", textAlign: "right" }}>
            One place.<br />Every stage.
          </h2>
        </div>
      </section>

      {/* ============ AUDIENCE GRID ============ */}
      <section id="audience" style={{ background: "var(--surface)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(56px, 8vw, 110px) var(--gutter)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: "clamp(28px, 4vw, 48px)" }}>
            <span className="if-eyebrow">Start here</span>
            <div style={{ flex: 1, height: 2, background: "var(--border)" }}></div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Four doors</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px 40px", marginBottom: "clamp(28px, 4vw, 48px)" }}>
            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 0.95, margin: 0 }}>Find your way in.</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.5, color: "var(--text-muted)", margin: 0, maxWidth: "42ch" }}>
              Student, faculty, researcher, company, or partner — whoever you are, there's a door here for you. Pick yours.
            </p>
          </div>
          <div className="if-aud-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "2px", background: "var(--border)", ...audFrame }}>
            {[
              { t: "Students", d: "Learn how to become an entrepreneur.", tone: "red", span: 6, page: "students" },
              { t: "Faculty & Researchers", d: "Take your research to market.", tone: "black", span: 6, page: "home" },
              { t: "Companies", d: "Tap university firepower.", tone: "gold", span: 5, page: "home" },
              { t: "Partners", d: "Mentor, fund, collaborate.", tone: "white", span: 7, page: "home" },
            ].map((a) => {
              const tn = {
                red: { bg: "var(--md-red)", fg: "#fff", chev: "var(--md-gold)" },
                black: { bg: "var(--md-black)", fg: "#fff", chev: "var(--md-gold)" },
                gold: { bg: "var(--md-gold)", fg: "var(--md-black)", chev: "var(--md-red)" },
                white: { bg: "var(--md-white)", fg: "var(--md-black)", chev: "var(--md-red)" },
              }[a.tone];
              return (
                <a key={a.t} href="#" onClick={(e) => { e.preventDefault(); onNav(a.page); }} className="if-aud-cell"
                   style={{ gridColumn: `span ${a.span}`, background: tn.bg, color: tn.fg, minHeight: 220, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "space-between", textDecoration: "none" }}>
                  <span aria-hidden="true" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 30, lineHeight: 1, color: tn.chev, alignSelf: "flex-end" }}>››</span>
                  <div>
                    <h3 style={{ color: "inherit", fontSize: "clamp(34px, 2.4vw, 44px)", lineHeight: 0.98, margin: 0, fontWeight: 800, letterSpacing: "-0.02em", textWrap: "balance", maxWidth: "11ch" }}>{a.t}</h3>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: 16, lineHeight: 1.5, margin: "12px 0 0", color: "inherit", opacity: 0.94, maxWidth: "34ch" }}>{a.d}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ IMPACT BAND ============ */}
      <section style={{ background: "var(--md-red)", position: "relative" }}>
        {/* Gold vertical line at the container's right edge — same motif as the header & footer. */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
          <div style={{ maxWidth: "var(--container)", height: "100%", margin: "0 auto", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "16px", height: "calc(100% - 52px)", background: "var(--md-gold)", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 2.8px), 0 100%)" }}></div>
          </div>
        </div>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(56px, 8vw, 110px) calc(var(--gutter) + 40px) clamp(56px, 8vw, 110px) var(--gutter)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: "clamp(36px, 5vw, 64px)" }}>
            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 0.95, margin: 0, color: "#fff" }}>The proof</h2>
            <Button as="a" href="#" variant="outline" size="sm" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.7)", "--btn-hover-fill": "#fff", "--btn-hover-ink": "var(--md-red)" }}>See our full impact ››</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(24px, 4vw, 48px)" }}>
            {D.stats.map((s, i) => (
              <div key={i}>
                <IFStatCount value={s.value} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 5.6vw, 96px)", lineHeight: 0.82, letterSpacing: "-0.04em", color: "#fff", whiteSpace: "nowrap", marginBottom: 18 }} />
                <div style={{ borderTop: "4px solid rgba(255,255,255,0.35)", paddingTop: 18, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWS ============ */}
      <section style={{ background: "var(--surface)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(56px, 8vw, 110px) var(--gutter)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(28px, 4vw, 48px)", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 0.95, margin: 0 }}>Latest news</h2>
            <Button as="a" href="#" variant="outline" size="sm" style={{ color: "var(--md-red)", borderColor: "var(--md-red)", "--btn-hover-fill": "var(--md-red)", "--btn-hover-ink": "#fff" }}>All news ››</Button>
          </div>
          <div className="if-news-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--grid-gap)" }}>
            {/* Featured lead story */}
            {(() => {
              const n = D.news[0];
              return (
                <a href="#" className="if-news-feat" onClick={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", textDecoration: "none", border: "1px solid var(--border)" }}>
                  <image-slot id="news-feat" src={n.img} fit="cover" radius="0" placeholder="Lead story image" style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16 / 10" }}></image-slot>
                  <div className="if-cardtext" style={{ padding: "clamp(20px, 2.4vw, 32px)", borderTop: "4px solid var(--md-red)" }}>
                    <span className="if-eyebrow" style={{ color: "var(--text-subtle)" }}>{n.kicker} · {n.date}</span>
                    <h3 style={{ fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.08, margin: "12px 0 0", color: "var(--text-strong)", fontWeight: 800, letterSpacing: "-0.015em", textWrap: "wrap" }}>{n.title}</h3>
                  </div>
                </a>
              );
            })()}
            {/* Three secondary stories — continuous agenda-style list (matches Upcoming events) */}
            <div style={{ display: "flex", flexDirection: "column", background: "var(--md-white)", border: "1px solid var(--border)" }}>
              {D.news.slice(1).map((n, i) => (
                <a key={i} href="#" className="if-event-row" onClick={(e) => e.preventDefault()} style={{ display: "flex", gap: "clamp(16px, 2vw, 24px)", textDecoration: "none", padding: "clamp(14px, 1.6vw, 20px)", borderTop: i === 0 ? "none" : "1px solid var(--border)", flex: 1, alignItems: "center" }}>
                  <image-slot id={`news-${i}`} src={n.img} fit="cover" radius="4" placeholder="Image" style={{ display: "block", width: "clamp(88px, 10vw, 120px)", height: "auto", aspectRatio: "1 / 1", flexShrink: 0 }}></image-slot>
                  <div className="if-cardtext" style={{ flex: 1, minWidth: 0 }}>
                    <span className="if-eyebrow" style={{ color: "var(--text-subtle)" }}>{n.kicker} · {n.date}</span>
                    <h3 style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.18, margin: "8px 0 0", color: "var(--text-strong)", fontWeight: 800, letterSpacing: "-0.01em" }}>{n.title}</h3>
                  </div>
                  <span aria-hidden="true" className="if-event-chev" style={{ flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, color: "var(--md-red)" }}>››</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EVENTS ============ */}
      <section style={{ background: "var(--gray-100)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(56px, 8vw, 110px) var(--gutter)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(28px, 4vw, 48px)", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 0.95, margin: 0 }}>Upcoming events</h2>
            <Button as="a" href="#" variant="outline" size="sm" style={{ color: "var(--md-red)", borderColor: "var(--md-red)", "--btn-hover-fill": "var(--md-red)", "--btn-hover-ink": "#fff" }}>All events ››</Button>
          </div>
          <div className="if-events-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--grid-gap)" }}>
            {/* Featured event — red Mondrian block */}
            {(() => {
              const e = D.events[0];
              return (
                <a href="#" className="if-event-feat" onClick={(ev) => ev.preventDefault()} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24, background: "var(--md-red)", color: "#fff", padding: "clamp(24px, 3vw, 40px)", textDecoration: "none", minHeight: 300 }}>
                  <div className="if-cardtext" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <div className="if-event-date" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 0.8, letterSpacing: "-0.04em" }}>{e.day}</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, textTransform: "uppercase", letterSpacing: "0.02em" }}>{e.mon}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--md-black)", background: "var(--md-gold)", padding: "6px 10px" }}>{e.type}</span>
                  </div>
                  <div className="if-cardtext">
                    <h3 style={{ fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.05, margin: 0, fontWeight: 800, letterSpacing: "-0.015em", color: "#fff" }}>{e.title}</h3>
                    <p className="if-event-feat-blurb" style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: 16, lineHeight: 1.55, margin: "12px 0 0", color: "rgba(255,255,255,0.92)", maxWidth: "40ch" }}>{e.blurb}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      <span>{e.time}</span><span style={{ opacity: 0.5 }}>·</span><span>{e.place}</span>
                    </div>
                  </div>
                </a>
              );
            })()}
            {/* Agenda list — rotating Mondrian date chips */}
            <div style={{ display: "flex", flexDirection: "column", background: "var(--md-white)", border: "1px solid var(--border)" }}>
              {D.events.slice(1).map((e, i) => {
                const chip = [
                  { bg: "var(--md-black)", fg: "#fff" },
                  { bg: "var(--md-gold)", fg: "var(--md-black)" },
                  { bg: "var(--md-red)", fg: "#fff" },
                ][i % 3];
                return (
                  <a key={i} href="#" className="if-event-row" onClick={(ev) => ev.preventDefault()} style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 2vw, 28px)", padding: "clamp(16px, 2vw, 24px)", textDecoration: "none", borderTop: i === 0 ? "none" : "1px solid var(--border)", flex: 1 }}>
                    <div className="if-event-date" style={{ flexShrink: 0, width: 64, height: 64, background: chip.bg, color: chip.fg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span className="if-event-datetext" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, lineHeight: 1.0, letterSpacing: "-0.03em" }}>{e.day}</span>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: -2 }}>{e.mon}</span>
                      </span>
                    </div>
                    <div className="if-cardtext" style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--md-red)" }}>{e.type}</span>
                      <h3 style={{ fontSize: 18, lineHeight: 1.15, margin: "4px 0 0", color: "var(--text-strong)", fontWeight: 700 }}>{e.title}</h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", margin: "4px 0 0" }}>{e.time} · {e.place}</p>
                    </div>
                    <span aria-hidden="true" className="if-event-chev" style={{ flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, color: "var(--md-red)" }}>››</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
window.IFHomepage = Homepage;
