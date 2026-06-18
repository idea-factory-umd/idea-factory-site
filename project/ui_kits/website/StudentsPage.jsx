// StudentsPage.jsx — the audience template (program directory + tag filter)
const IFC2 = window.IdeaFactoryDesignSystem_745a71;

function StudentsPage({ onNav, basePath = "../../" }) {
  const D = window.IF_DATA;
  const { ColorBlock, ProgramCard, Tag, Button } = IFC2;
  const [filter, setFilter] = React.useState("All");

  const visible = D.programs.filter((p) => filter === "All" || p.tags.includes(filter));

  return (
    <main>
      {/* ---- HERO (per-audience) ---- */}
      <section style={{ background: "var(--md-black)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", minHeight: "min(64vh, 540px)" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(28px, 5vw, 64px)" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--md-gold)" }}>For Students</span>
            <h1 style={{ color: "var(--md-white)", fontSize: "clamp(52px, 7.5vw, 104px)", lineHeight: 0.86, letterSpacing: "-0.03em", margin: "0.2em 0" }}>Become a <span style={{ color: "var(--md-red)" }}>builder.</span></h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.5, color: "rgba(255,255,255,0.85)", margin: 0, maxWidth: "46ch" }}>From your first course to your first company — find the program that fits where you are right now. <strong style={{ color: "var(--md-gold)", fontFamily: "var(--font-heading)", whiteSpace: "nowrap" }}>9 ways in.</strong></p>
          </div>
          <div style={{ position: "relative", minHeight: 280, overflow: "hidden" }}>
            <img src="img/building-entrance.png" alt="The E. A. Fernandez Idea Factory entrance and glass tower" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "10px", background: "var(--md-red)", zIndex: 2 }} />
            <div style={{ position: "absolute", right: 0, bottom: 0, height: "10px", width: "38%", background: "var(--md-gold)", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ---- FILTER + DIRECTORY ---- */}
      <section style={{ background: "var(--surface)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "var(--space-6) var(--gutter) var(--section-y)" }}>
          {/* Filter control */}
          <div style={{ position: "sticky", top: 0, background: "var(--surface)", padding: "var(--space-5) 0", zIndex: 10, borderBottom: "1px solid var(--border)", marginBottom: "var(--space-7)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 14 }}>Filter programs</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {D.filters.map((f) => (
                <Tag key={f} interactive pressed={filter === f} onClick={() => setFilter(f)}>{f}</Tag>
              ))}
            </div>
          </div>

          {/* Directory */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--grid-gap)" }}>
            {visible.map((p) => (
              <ProgramCard key={p.label} label={p.label} fullName={p.fullName} line={p.line} tags={p.tags} href="#" />
            ))}
          </div>

          {visible.length === 0 && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-muted)" }}>No programs match that filter.</p>
          )}
        </div>
      </section>
    </main>
  );
}
window.IFStudentsPage = StudentsPage;
