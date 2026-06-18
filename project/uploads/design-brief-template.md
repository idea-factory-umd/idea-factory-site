# Design Brief — The Idea Factory Website

> A design document for use with Claude Design. Fill in each section, delete the bracketed prompts, and remove anything that doesn't apply. The more specific you are, the closer the first draft will land. Attach your logo files and any reference images alongside this doc when you start.

---

## 1. The ask (read this first)

**What we're making:** The website for **The Idea Factory** at the University of Maryland — an innovation and entrepreneurship institute within the A. James Clark School of Engineering. This is a **complete rebrand** of the Maryland Technology Enterprise Institute (Mtech) → Idea Factory; the new site should carry no legacy "Mtech" branding. The site uses **audience-based navigation** (Students, Faculty/Researchers, Companies, Partners) and organizes programs around a four-stage ecosystem narrative: Blueprint → Proving Ground → Assembly Line → Scale-Up. Program details are drawn from the current site at https://www.mtech.umd.edu/.

**The bigger picture:** This site is the **flagship of a family**. Mtech/Idea Factory also runs the individual program sites (aspire.umd.edu, mips.umd.edu, hinmanceos.umd.edu, etc.), which currently all inherit the Mtech look and feel — and will be restyled to the new Idea Factory design after the flagship. The homepage + Students page therefore aren't just two pages: they seed a **design system** (header/footer patterns, color blocks, type, cards, glyphs) that must scale across the whole site family. Design components as a reusable kit, not a one-off layout.

**Primary goal:** Two things at once — (1) make programs far easier to find by audience, and (2) tell a fun, simple-to-understand ecosystem narrative (the four stages) that ties together current and future initiatives. The brand should feel **alive and exciting** — a 21st-century identity, not an institutional one.

**Why now:** This is a full rebrand from Mtech to the Idea Factory, modernizing the institute's identity. The new brand will be **revealed at a major donor event in October**, so the homepage and Students page need to be polished enough to debut to that audience.

**Done looks like:** A brand that feels alive and modern; clear audience-based wayfinding; the four-stage story told visually and simply; on-brand (UMD red/gold/black/white + Interstate); credible and evidence-forward; mobile-first; ready to show donors in October.

---

## 2. Audience

**Who it's for:** Four primary audiences, each with its own navigation path:
- **Students** — undergrads and grads exploring entrepreneurship and innovation. Programs: Entrepreneurship & Innovation courses, Minor in Technology Entrepreneurship & Corporate Innovation, ASPIRE, Hinman CEOs Program, MPS in Technology Entrepreneurship & Corporate Innovation, MPS in Product Management, xFoundry, Impact Seed Fund, Startup Shell.
- **Faculty / Researchers** — turning research into market impact. Programs: UMD I-Corps, NSF I-Corps Mid-Atlantic Hub, MIPS, Mtech Ventures, Chesapeake Bay Seed Capital Fund, xFoundry.
- **Companies** — accessing university research talent and resources. Programs: MIPS, NSF I-Corps Mid-Atlantic Hub, UMD I-Corps, Mtech Ventures, xFoundry.
- **Partners** — mentors, alumni, and collaborators. Paths: Partner With Us, Mentors, Alumni.

**What they should feel:** Capable, ambitious, in the right place — that this is where serious work gets done, not just talked about. Confident, credible, energized, grounded.

**What they should do:** Self-identify their audience, quickly find the program that fits their goals and situation, and take the next step (apply, enroll, partner, or inquire).

---

## 3. Deliverables & specs

Two pages for this first round — enough to prove the system before any full build-out:

| Deliverable | Format | Dimensions / breakpoints | Notes |
|---|---|---|---|
| Homepage | Responsive HTML | Desktop 1440, mobile 390 | Audience entry points + the four-stage story + headline proof points |
| Interior page — **Students** audience landing | Responsive HTML | Desktop 1440, mobile 390 | The repeating audience template; chosen because it carries the most programs and stress-tests content density |

**Must include:** Logo (full lockup), audience-based navigation, the four-stage framework, key proof stats, clear next-step CTAs.

**Out of scope (for now):** The other three audience pages (Faculty, Companies, Partners), program detail pages, and full content population. These follow once the homepage + Students template are approved.

### Site structure (all pages)

*Family-of-sites note:* the architecture is **consistent chrome, expressive hero**. The chrome stack below is identical in structure on every family site, flagship included; only nav links and hero content change per site.
1. **Thin UMD bar** — "University of Maryland | A. James Clark School of Engineering," both linked. One color family-wide for instant recognition (recommended: black with white text; red can fight the color blocks below, gold has text-contrast problems). Same height, type, and treatment everywhere.
2. **Identity band** — the **Idea Factory logo on the left, search on the right**, present on *every* family site; the logo links home to the flagship, answering "where am I?" immediately and providing a consistent path back. Treat this band with the **Mondrian block language** — the logo's own white field is one of the blocks, so the band can extend that geometry rather than being a plain white strip. (In mockups, search is a visual element only — the function is build-phase; the existing family-wide search, which already spans all Mtech/Idea Factory sites, carries over.)
3. **Navbar** — navigation only, structurally identical family-wide; the flagship carries the main nav, each program site its own.
4. **Hero** — per-site: the flagship uses the hero directions in this brief; each program site presents its **own identity** here (new design, same role as today) plus the **journey bar** with its stage lit for ecosystem wayfinding.

*Mobile:* the three chrome layers must compact deliberately — search collapses to an icon, the band tightens, and only the navbar stays sticky on scroll, so chrome doesn't eat the viewport before content appears.

*xFoundry is the sanctioned exception:* it retains its own look and feel; the Students page links out to it, and the family pattern does not apply there.

Because program sites will share the new look, the Students page links **directly out** to them — no interstitial program pages are needed, except for programs without their own sites (Impact Seed Fund, courses, minor).

**Header (the family chrome):** The thin UMD bar at the very top — "University of Maryland | A. James Clark School of Engineering," linking to UMD and the Clark School respectively; one color used family-wide (recommended: black with white text — final color open, but identical on every family site). Below it, the **identity band**: Idea Factory logo on the left (linked home), search on the right, treated with the Mondrian block language. Below that, the **navbar**: navigation only.

**Primary navigation:** Home · Students · Faculty/Researchers · Companies · Partners · News *(News, Events, Archives)* · About *(About, Impact, Contact, Directions, Timeline)* · Give

**Footer:** UMD logo (left); the nav repeated as text; "A. James Clark School of Engineering, University of Maryland, College Park, MD 20742"; "© 2026 University of Maryland"; social icons (X, LinkedIn, Facebook, Instagram); a "Get Updates" button; and an "Idea Factory/REFI Staff and Students" link.

### Home page (section order)

1. **Hero** — see the three hero directions below. The building photo should be *integrated* into the design, not used as full-bleed wallpaper.
2. **Intro** — the approved short description ("The Idea Factory is where the University of Maryland's ideas go to work…"), with a "More ››" link to About.
3. **The four stages** — the four glyphs, clickable (each links to its section on the About page), each with a one-line label:
   - Blueprint — *Where you learn to think like a builder.*
   - Proving Ground — *Where ideas get tested against the real world.*
   - Assembly Line — *Where companies get built.*
   - Scale-Up — *Where they grow and take off.*
4. **Audience boxes** — Students · Faculty/Researchers · Companies · Partners. Kept high for findability; the impact band sits *below* this, so audience nav never gets pushed down.
5. **Impact band** — three numbers: **$94.8B** total economic impact since 1983 · **18,992** jobs created · **72,000+** students — with a "See our full impact ››" link to the Impact page (which holds the deep breakdown: $52.7B from MIPS-supported products, $3.6B from Mtech Ventures companies, etc.).
6. **News** — one CMS-driven row.
7. **Events** — one CMS-driven row of upcoming events.
8. **Footer.**

**Hero — mock up all three directions so they can be compared:**
- **A · Type-led color blocks** — an oversized Interstate headline set within a Mondrian arrangement of red/black/gold blocks; the building photo lives inside one block as a module, not behind everything.
- **B · Journey as hero** — the tagline plus the four stages introduced immediately as a horizontal sequence, so the ecosystem is the first thing a visitor sees.
- **C · Split hero** — bold type and a primary CTA on a solid color panel on one side, building photo on the other; leaves room for one proof number.

### Students page (the audience template)

A directory of program boxes — and the model for findability across all four audience pages.
- **Each box is fully visible, no hover:** image · short plain-language **label** (full official name in smaller type where needed) · one factual line · **tag(s)**.
- **Filter control at the top:** Undergraduate · Graduate · Online · Funding · Community & space · All. Selecting one narrows the visible boxes — this is the primary findability mechanism and the main fix for the current site's "I can't find what's for me" problem.
- **No stage glyphs on the boxes** — kept off to avoid clutter; the stage system lives on About and on program detail pages.

| Label | Full name | Tags | Line (always visible) |
|---|---|---|---|
| Entrepreneurship Courses | Courses in Entrepreneurship & Innovation | Undergraduate | Undergraduate classes in entrepreneurship and innovation |
| Entrepreneurship Minor | Minor in Technology Entrepreneurship & Corporate Innovation | Undergraduate | 15-credit minor open to all students |
| ASPIRE | — | Undergraduate · Funding | Funding for undergraduates doing research with Clark School faculty |
| Hinman CEOs | Hinman CEOs Program | Undergraduate · Community & space | Living-learning community for student entrepreneurs |
| Tech Entrepreneurship Master's | MPS in Technology Entrepreneurship & Corporate Innovation | Graduate · Online | Online master's for launching and leading ventures |
| Product Management Master's | MPS in Product Management | Graduate | Lead the product life cycle from discovery to delivery |
| xFoundry | — | Undergraduate · Graduate | Multidisciplinary teams tackling society's grand challenges |
| Impact Seed Fund | — | Funding | Seed funding for Hinman CEOs students |
| Startup Shell | — | Community & space | Student-run co-working space and incubator |

---

## 4. Brand assets

### Logo
- **File attached:** `if-logo.svg` — **final version** ("adjusted angles"). Vector SVG, full horizontal lockup (graphic mark on the left + "Idea Factory" wordmark on the right, set in Interstate Black and converted to outlined paths, so it renders correctly everywhere without the font installed). Wide aspect ratio (~2.5:1). Single consolidated red `#e11e34` and gold `#fdd10c`; the dark color in the artwork is `#231f20` (rich black) — confirm with the designer whether brand black is `#231f20` or pure `#000000` (the UMD palette and the stage glyphs currently use `#000000`).
- **Colors in mark:** Brand red, gold, black, and white (matches the core palette below).
- **Mark-only version:** `if-mark.svg` — the graphic mark with the wordmark removed, squared up for use as a favicon, app icon, or small placements where the full lockup would be illegible.
- **Usage rules:** Never recolor, distort, or stretch. Maintain clear space around the lockup. Use the SVG directly so it stays crisp at any size. Use the full lockup wherever space allows; switch to the mark-only version only at small sizes (favicon, avatar, app icon).
- **Placement preference:** [e.g. "Top-left of header. Use on white or light backgrounds; provide/request a reversed version for dark backgrounds."]

### Color palette
Source: University of Maryland Brand — Core palette is red, white, black, and gold (inspired by the Maryland state flag). We primarily use the core palette; neutrals are for supporting UI only.

**Core palette**
| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Maryland Red | `#e21833` | Headlines, primary buttons, brand accents |
| Accent | Maryland Gold | `#ffd200` | Highlights and emphasis — use sparingly; **not for text on white** (fails contrast) |
| Background | White | `#ffffff` | Default background |
| Text / contrast | Black | `#000000` | Body text, high-contrast backgrounds |

**Neutrals (supporting UI — surfaces, borders, muted text)**
| Name | Hex | Usage |
|---|---|---|
| Dark Gray | `#454545` | Secondary text, dark surfaces |
| Medium Gray | `#7f7f7f` | Muted text, dividers |
| Light Gray | `#e6e6e6` | Borders, card backgrounds |
| Bronze Testudo | `#ad7231` | Occasional warm accent |

**Rules:**
- **Use the full range as a system, not a single mode.** We want both *bright/saturated* versions of the brand colors and *softer/tinted* versions, plus the UMD neutrals. Suggested logic so it stays coherent rather than chaotic:
  - **Bright/saturated blocks** (full red, gold, black) for high-impact moments: hero, stat call-outs, stage headers, primary CTAs.
  - **Soft/tinted blocks** (e.g. red or gold at ~10–20% over white, light gray) for content-dense or calmer areas: body sections, cards, interior pages.
  - **Neutrals** (grays, Bronze Testudo) for supporting UI, dividers, and secondary text.
- Color blocks should evoke the **Mondrian-style modular blocks in the logo mark** — this is a core design device (see Design Direction).
- Gold is for emphasis, never for body text on a white background.
- Safe text/background combos: Maryland Red on white (passes AA), white on Maryland Red (passes AA), black on white, white or gold on black. Avoid red-on-gold, red-on-gray, and gold-on-white for text.
- Maintain WCAG AA contrast (4.5:1 normal text, 3:1 large text) on all type — check tinted backgrounds carefully, since soft tints can quietly fail contrast.

### Typography
- **Headings:** Interstate — all headlines and subheads. The logo wordmark uses **Interstate Black (800)**; pair Black for display headlines and Bold (700) for smaller heads.
- **Body:** Georgia — all running text, intros, and captions. A classic serif against the bold Interstate heads gives an editorial, credible feel that suits the evidence-forward tone. Use Regular for body, Bold and Italic for emphasis.
- **Minimum body size:** Body text is **never smaller than 16px**, anywhere on the site, *except the footer*, where smaller sizes are allowed for secondary/legal text.
- **Web fallbacks:**
  - Interstate (headings) is a licensed typeface and isn't free on Google Fonts, so it may be unavailable in generated web output. Closest open-source substitute: **Overpass** (Google Fonts), same highway-signage lineage. Heading stack: `Interstate, Overpass, "Helvetica Neue", Arial, sans-serif`.
  - Georgia (body) is a web-safe system font available almost everywhere, so no special loading is needed. Body stack: `Georgia, "Times New Roman", serif`.
- **Type scale / hierarchy:** A modular scale that steps up by roughly 1.3–1.5× at each level. Sizes are `font-size / line-height` in px:

  | Level | Font | Size / line-height | Weight | Use |
  |---|---|---|---|---|
  | Display (H1) | Interstate | 48 / 52 | Black 800 | Hero headline, one per page |
  | H2 | Interstate | 32 / 40 | Bold 700 | Major section headers |
  | H3 | Interstate | 24 / 32 | Bold 700 | Subsection headers |
  | Body large | Georgia | 18 / 30 | Regular 400 | Intros, lead paragraphs |
  | Body | Georgia | 16 / 27 | Regular 400 | Default paragraph text (minimum size) |
  | Footer / fine print | Georgia | 13–14 / 20 | Regular 400 | Footer and legal text only — the one place below 16px |

  On mobile, scale the Display and H2 down (e.g. H1 → 32–36, H2 → 24–28) so headlines don't overflow. Body stays at 16px.
- **Rules:** Tight letter-spacing on Display/H1 to echo the logo wordmark (e.g. −0.02em). Serif body gets a little more line-height than a sans would (≈1.65–1.7×) for comfortable reading. Keep body at 16px minimum everywhere except the footer.

---

## 5. Brand narrative & voice

**Tagline:** Where Ideas Go to Work

**Narrative in one line:** The Idea Factory is where the University of Maryland's ideas go to work — where students become entrepreneurs, faculty research reaches the market, innovators test and validate, startups get built, and Maryland companies tap university firepower to grow.

**The core metaphor (use this everywhere):** A factory where ideas are *built* through four sequential stages. The design and copy should lean into this industrial / maker language consistently:
1. **Blueprint** — Learn to think like a builder. (Education, courses, foundational programs.)
2. **Proving Ground** — Where your idea meets the real world. (Customer discovery, I-Corps, validation.)
3. **Assembly Line** — Where companies get built. (Mtech Ventures incubator, seed capital.)
4. **Scale-Up** — Where it takes off. (MIPS, growth, industry partnership.)
Positioning line: "One Place. Every Stage." The stages are a connected system, not a one-way street.

**Voice & tone:** Confident and declarative. Short, punchy sentences mixed with longer rhythmic ones. Plain-spoken — no academic jargon, no empty hype. Evidence-forward (real numbers, real dates). Direct second-person address ("you"). Uses rhetorical contrast ("We are not a think tank. We are not a lecture hall. We are a place where ideas go to work.") and parallel structure. Aspirational but grounded in proof.

**Proof points to feature prominently:** Since 1983; ~19,000 jobs created; 72,000+ students supported; $94.8 billion in economic impact; 40 years of work. (MIPS specifically: $52.7 billion in product sales, 14,000+ jobs; recognized by the U.S. SBA as a model for tech transfer.)

**Words/phrases we use:** "Ideas go to work" / "where ideas go to work"; builder, build, make, real, work; the four stage names (Blueprint, Proving Ground, Assembly Line, Scale-Up); evidence, customer discovery, validate; "One Place. Every Stage." Refer to the institute as **the Idea Factory** (part of the A. James Clark School of Engineering, UMD College Park).

**Words/phrases we avoid:** "Think tank," "lecture hall," and theory-for-its-own-sake framing (explicitly positioned against). Avoid passive, abstract, ivory-tower academic language; vague innovation buzzwords without evidence; hype that isn't backed by a number or a real outcome.

**Sample copy (real, approved):**
- *Tagline:* Where Ideas Go to Work
- *Short description:* The Idea Factory is where the University of Maryland's ideas go to work. It's where students become entrepreneurs, where faculty research finds its way to market, where innovators across Maryland test and validate their ideas, where startups get built, and where Maryland companies access the intellectual firepower they need to grow.
- *Stage taglines:* "Learn to think like a builder." / "Where your idea meets the real world." / "This is where companies get built." / "Where it takes off."

---

## 6. Design direction

**Aesthetic keywords:** Bold, big-type, color-blocked, modular, industrial, high-contrast, evidence-forward. The "factory" metaphor can show up visually — grids, modular blocks (echoing the logo mark itself), blueprint/schematic motifs, strong horizontal rules, a sense of things being *built* — without becoming literal or kitschy.

**Visual ideas drawn from the brand:**
- **Mondrian-style color blocks (confirmed direction — the team loves this).** Echo the modular blocks in the logo mark as a primary layout device: rectangular blocks of brand color (bright and soft) used to structure content, frame stats, and lead into the audience navigation. This is the through-line that connects logo, layout, and the "things get built here" narrative.
- A modular, grid-based layout echoes the "assembly" theme and suits four parallel stages and four audiences.
- **Per-stage visual identifiers (finalized — see "Stage glyph system" below).** Each of the four stages has a simple geometric glyph, all built from the logo's block language, with a red→black→gold color story running through them.
- The four stages (Blueprint → Proving Ground → Assembly Line → Scale-Up) are a natural progression to visualize — a stepped sequence, a path, or numbered stations.
- Lead with proof: the big stats (40 years, $94.8B, 19,000 jobs) deserve bold display treatment.
- Maryland Red as the primary action/accent color, gold for emphasis, generous white space, black for strong type and contrast blocks.

**Stage glyph system (finalized):** Each stage has a simple geometric glyph, all built from the same blocks as the logo mark, paired with an 01–04 numeral. The block is the constant unit; what changes is what's happening to it, so the four glyphs read left-to-right as one continuous story. Files are listed in the asset list at the end of this brief.

- **01 Blueprint** — a 2×2 grid, one block filled and three drawn as outlines: the plan, with the first piece placed.
- **02 Proving Ground** — the same grid as a checklist: two assumptions validated (filled + checked), two still open (outline).
- **03 Assembly Line** — three blocks in a row on a line: one unit travelling the production line.
- **04 Scale-Up** — ascending stacks (one block, then two, then three): the same unit multiplying and climbing.

**Color logic — red → black → gold (do not treat as decorative).** Each color carries a fixed meaning drawn from how people talk about companies:
- **Red = unproven / "in the red."** Blueprint is all red; open assumptions in Proving Ground are red.
- **Black = solid / "in the black."** Validated assumptions turn black; the middle of the journey is black.
- **Gold = success / "struck gold."** Gold appears *only* at the end of the journey — the last block on the Assembly Line and the peak of Scale-Up.

Assembly Line and Scale-Up both run red → black → gold left to right, so the progression is reinforced twice in the back half of the story. Keep this meaning intact in any application; it's also a talking point for the October donor reveal.

*Where the glyphs are used:* on the home page (the four-glyph intro to the ecosystem, each with its one-line label); on the About page (the four-stage narrative sections); and on individual program detail pages — where the four appear together as a **journey bar** with the current stage in full colour and the other three greyed (see `journey-bar-states.svg`). They are **not** placed on the audience directory boxes (e.g. the Students program boxes), to keep those clean for findability.

*Two versions of each glyph are provided* — a **transparent** set for placing directly inside color blocks, and a **white-tiled** set for dark or colored backgrounds (the tile keeps black/red/gold reading correctly, so no recolored "reversed" set is needed). Glyphs pair with Interstate numerals (01–04) in layout.

**References we like — patterns from the team's reference set (44 sites):**
- **Big, confident typography** — the single most repeated note (Techstars, RISD, MICA, VCU, Essex, Sequoia, Minnesota Carlson). Oversized headlines and large menu type. Plays directly to Interstate Black.
- **Color-blocking** to structure the page (MICA, VCU, UT Austin, Sequoia, Figma). **Decision made:** use *both* bright/saturated and soft/tinted versions of the brand colors (plus neutrals) — bold blocks for impact, soft tints for calmer/denser content. See the color rules in Section 4.
- **Outlined boxes with colored edges** (Notion's color lines, Cornell Tech's yellow rules) — could be done in red/gold.
- **Light, bright canvases** as a counter to dark-mode defaults (Berklee, RISD, Tennessee) — "makes the content pop."
- **Restrained, purposeful motion** — parallax, scroll-triggered video, depth — but explicitly "just enough, not overdone" (Glyphic, OCAD, UT Austin). Two specific likes:
  - **Very short video moments** as on Pratt (https://www.pratt.edu) — brief, subtle clips that draw the eye without dominating. A strong fit for showing "work happening."
  - **Scroll-driven color blocks** like the "Urban Jungle" reference on https://motionsites.ai — loved the idea (it pairs perfectly with the Mondrian-block device), but **dial it back**; the reference is a bit too wild for us. Aim for tasteful block motion on scroll, not a spectacle.
- **Angles / non-rectangular section shapes** (Stanford d.school, USF, Missouri, OrbiMed arcs).
- **Spot color on neutral grounds** (Iowa State's red splotch, OCAD's color bursts, ASU's highlighted text).
- **Distinctive navigation, especially one level down** (Balderton's dot menus, Essex's left nav, Sequoia's menu effects) — directly relevant to our two-page focus.
- **Text-forward minimalism** from the VC cluster (Khosla, Tiger Global, Spark Capital) — type and whitespace over imagery.
- **Boxes as audience entry points** (Minnesota Carlson) — a direct model for our Students/Faculty/Companies/Partners nav.

**The synthesis (our opportunity):** The set splits into two camps — expressive art-school energy (huge type, bold color blocks, motion) and restrained VC seriousness (type, whitespace, evidence). The Idea Factory sits between academia and entrepreneurship, so the sweet spot is the *confidence and scale* of the first paired with the *credibility and restraint* of the second. Critically, the logo mark is itself built from modular geometric blocks — so a bold, blocky, color-blocked system isn't just on-trend, it's derived from our own identity. The factory/assembly metaphor + the mark's geometry + the big-type/color-block trend all converge on one coherent direction.

**References to avoid:** The generic convergence the team already flagged — the identical big-hero + three-column card row + gradient blobs + stock "people around a laptop" photos that make academic and startup sites blur together.

**Layout / structure notes:** Audience-based entry points near the top, ideally using the color blocks as the way in. Generous whitespace. Strong typographic hierarchy using the type scale in Section 4 (Interstate headings, Georgia body). **Imagery:** we have large in-house photo libraries and will supply final shots, so **generic/placeholder photos are fine in proposed designs** — just indicate where real photography goes. Aim for imagery that feels real and active (people building, labs, work happening) rather than staged stock.

**Do:** Lean into the maker/factory language visually; use the grid; make the four stages legible at a glance; put numbers front and center.

**Don't:** No literal cartoon factory imagery, gears, or conveyor-belt clichés. No generic "innovation" stock photos. No gold text on white. Don't bury the audience navigation.

---

## 7. Constraints

- **Timeline:** New brand is revealed at a **major donor event in October** — the homepage and Students page must be polished enough to debut to donors by then.
- **Accessibility:** WCAG AA minimum (4.5:1 normal text, 3:1 large text), keyboard-navigable, alt text on imagery. Take extra care with soft color-tint backgrounds and any gold.
- **Platform:** Built and managed in **Webflow** (as the current site is). The design can reach Webflow two ways: (1) a developer rebuilds it natively, or (2) via **Webflow's official MCP server** — an agentic Claude surface (Claude Code or Claude Desktop) connected to the MCP can create layouts, styles, and CMS collections directly in the Webflow project from natural-language prompts, using these mockups and this brief as the spec. Caveats: it's an agent *building* the site through Webflow's APIs (not a pixel-perfect import), Designer/canvas changes require Webflow's MCP Bridge App to be open, and the MCP doesn't yet cover every endpoint — expect a guided build with some hand-finishing. Either way, the Claude Design mockups are the **design source of truth**; favor clean, well-sectioned, component-minded structure. What maps well to Webflow: news, events, and the program directory as **CMS Collections**; the Students-page tag filter on a Collection field; **Interstate** as a custom web font (Georgia is a system default); glyphs as **SVG**; motion via **Webflow Interactions**. Reference breakpoints: desktop 1440, mobile 390.
- **Brand guardrails:** UMD core palette + Interstate; no legacy "Mtech" branding; logo never recolored or distorted. Motion stays tasteful, never a spectacle.
- **Content:** Real copy exists (narrative, taglines, stats). [Add any required UMD/Clark School footer or legal text.]

---

## 8. How to iterate

Work in this order so we can course-correct cheaply:
1. **Direction first.** Before building full pages, give us 2–3 distinct homepage *hero + nav* directions to react to — different takes on type scale, color-blocking, and how the four stages are introduced. We'll pick one.
2. **Homepage next.** Build out the chosen direction as the full homepage. Prioritize structure and the four-stage story over polish in the first pass.
3. **Then the Students interior page**, reusing the homepage's components — this is the real test of whether the system holds up one level down.
4. **Check in at each stage** rather than building everything at once. We are deliberately stopping at two pages; if we like them, the rest of the site follows the same system.

---

### Asset list (attach these alongside this brief)

**Brand**
- `design-brief-template.md` — this brief
- `if-logo.svg` — full horizontal logo lockup (mark + "Idea Factory" wordmark)
- `if-mark.svg` — mark-only version, squared for favicon / app icon / small placements

**Stage glyph system** (see Section 6 for usage and the red→black→gold color logic)

*Transparent set* — use when a glyph sits directly inside a color block:
- `stage-glyphs-overview.svg` — all four glyphs shown together with the color legend (reference sheet)
- `stage-01-blueprint.svg`
- `stage-02-proving-ground.svg`
- `stage-03-assembly-line.svg`
- `stage-04-scale-up.svg`

*White-tiled set* — use everywhere else, especially on dark or colored backgrounds; the white tile keeps black/red/gold all reading correctly, no recoloring needed:
- `stage-glyphs-tiled-overview.svg` — the tiled glyphs shown on a dark background (reference sheet)
- `stage-01-blueprint-tile.svg`
- `stage-02-proving-ground-tile.svg`
- `stage-03-assembly-line-tile.svg`
- `stage-04-scale-up-tile.svg`

*Wayfinding:*
- `journey-bar-states.svg` — the four glyphs shown as a "you are here" journey bar, in all four active states (reference for program detail pages; built as one component, active stage set per page)

**Still to supply**
- [ ] Interstate font files (or confirm the Overpass web fallback is acceptable)
- [ ] Photography from in-house libraries (placeholders are fine for first drafts)

*Optional:* reference screenshots from the team's ~44-site list — not required, since the patterns are already summarized in Section 6, but they'd let Claude Design see the exact visual references.

**Open decisions (flagged, not blocking)**
- [ ] Hero direction — three options are speced in Section 3; pick after Claude Design mocks them up.
