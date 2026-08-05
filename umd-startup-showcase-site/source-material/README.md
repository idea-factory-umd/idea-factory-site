# Handoff: UMD Startup Showcase — 2026 site

**Target platform: Webflow, built via the Webflow MCP server from Claude Code.**

Read this file first, then the three SPEC files in order. Everything in the SPEC files is
literal: exact hex values, exact pixel and em values, exact easing curves, exact copy, exact
URLs. Where a number looks oddly precise (`-0.217em`, `31px`, `1.069`), it was derived from a
measurement and the derivation is stated — do not round it.

---

## What this is

A three-page event site for the **UMD Startup Showcase**, a day-long exhibition, forum and
networking event for technology-based startups affiliated with the University of Maryland.

The 2026 event: **November 13, 2026**, Samuel Riggs IV Alumni Center, **by invitation only**.

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | The 2026 event. Deliberately lean — no 2026 program exists yet. |
| 2025 | `/2025` | Archive of the Oct 10, 2025 showcase: gallery, agenda, 35 exhibitors, 10 sponsors. |
| Updates | `/updates` | A single HubSpot embed for people to register for updates. |

It replaces/refreshes https://startupshowcase.umd.edu/.

---

## The files in this bundle

```
design_handoff_umd_startup_showcase/
├── README.md                     ← you are here
├── CLAUDE_CODE_PROMPT.md         ← paste this into Claude Code to start the build
├── SPEC-01-TOKENS.md             ← colour, type, spacing, motion, focus
├── SPEC-02-COMPONENTS.md         ← nav, footer, buttons, logo tiles, headline device, every hover
├── SPEC-03-PAGES.md              ← every section of every page, top to bottom, with all copy + links
├── content/
│   ├── agenda-2025.csv           ← 5 agenda rows, full speaker names and titles
│   ├── exhibitors-2025.csv       ← 35 rows: name, logo file, URL, scale factor, per-logo notes
│   ├── sponsors-2025.csv         ← 10 rows, same shape
│   ├── hosts.csv                 ← 4 rows, same shape
│   ├── photo-manifest.csv        ← which photo goes where, with object-position and alt text
│   └── hubspot-form.css          ← paste verbatim into the Updates page <head>
├── assets/
│   ├── logos/                    ← 49 PNGs, production-ready (see "Logos" below)
│   ├── photos/                   ← 11 JPEGs at 2400px, plus unused/
│   ├── pattern/                  ← 2 recoloured SVGs + the untouched original
│   └── fonts/                    ← Druk + 6 Interstate cuts, OTF
├── design-reference/             ← the working prototype, self-contained
│   ├── UMD Startup Showcase.dc.html
│   ├── support.js
│   ├── assets/  uploads/
└── reference/
    └── UMD-Startup-Showcase-Design-Brief.md   ← original brand brief
```

**`design-reference/UMD Startup Showcase.dc.html` opens directly in a browser** and is
self-contained — fonts, photos, logos and pattern SVGs are all included at the paths it
expects. Open it and click through Home / 2025 / Updates. This is the visual source of
truth; the SPEC files describe it in words so you never have to guess from pixels.

**It is a design reference, not production code.** Do not paste its markup into a Webflow
Embed. Rebuild it with native Webflow elements, classes and CMS Collections. The one
legitimate embed is the HubSpot form (SPEC-03, Updates page) and the Lightroom gallery
iframe (SPEC-03, 2025 page).

---

## Fidelity

**High fidelity, and reviewed line by line.** Every value in the SPEC files was either
chosen deliberately or measured and corrected during review. A number of them are the result
of fixing a specific defect the client caught — those are flagged `WHY:` in the specs. Read
the `WHY:` notes: they tell you which values will look wrong if you "simplify" them.

---

## Build order

Follow this sequence. Each step depends on the one before.

1. **Fonts.** Upload the 7 OTFs (SPEC-01 → Fonts). Nothing will look right until Druk and
   Interstate resolve.
2. **Colour + type styles.** Create the tokens and text classes in SPEC-01.
3. **Components.** Build the recurring pieces in SPEC-02 as reusable Webflow components/classes:
   pattern strip, skewed knockout headline, chevron glyph, 5 button variants, 3 logo-tile variants.
4. **CMS Collections.** Exhibitors, Sponsors, Hosts, Agenda items (SPEC-02 → CMS).
   Import the CSVs, upload the logos.
5. **Pages.** Home, then 2025, then Updates, section by section per SPEC-03.
6. **Interactions.** All hovers, per SPEC-02 → Interaction inventory. Do these last, once
   the markup structure exists, because each one targets a specific child element.

---

## The five things most likely to go wrong

Listed here because each one was already gotten wrong once during design.

1. **The pattern strip must be full-viewport-width**, not constrained to the 1240px
   container. It sits outside the container. (SPEC-02 → Pattern strip)
2. **Logo tiles use a background-image on an inner `<span>`, never an `<img>`**, and the
   tile's white ground must never change on hover. (SPEC-02 → Logo tiles)
3. **The knockout headline's padding lives on the inner span, not the outer panel** — `em`
   on the outer panel resolves against the `<h1>`'s font-size, not the display size, which
   silently produces ~⅕ of the intended padding. (SPEC-02 → Knockout headline)
4. **Logo sizes are baked into the PNG files as transparent padding.** Do not "fix" a logo
   that looks small — it is deliberate optical balancing. Tile CSS is uniform. (SPEC-02 → Logo tiles)
5. **Designer API style operations can fail on complex styles.** If a call fails, report it
   and say what needs setting by hand. Do not simplify the design to make the call succeed.

---

## Content that does not exist yet

Absent from Home on purpose. The client was explicit that nothing for 2026 is confirmed.
**Do not invent placeholders for any of these:**

- 2026 agenda / schedule
- 2026 speakers and panelists
- 2026 exhibiting startups
- 2026 sponsors
- Registration mechanics beyond the updates form

When they land, Home gains an agenda section and exhibitor/sponsor grids that reuse the 2025
page's components with `Year = 2026`.

---

## Mobile

**Not designed.** Every layout uses `auto-fit`/`minmax` so it degrades to single column
sensibly, but no mobile breakpoint has been reviewed. Reference breakpoints are desktop 1440
and mobile 390.

Build desktop to spec first. Then propose mobile treatments for review — in particular the
hero headline scale, and the nav, which currently just wraps and wants a real mobile menu.

---

## Outstanding items to raise with the client

- **Sponsorship PDF is last year's.** The link points at `Startup Showcase 2025 Sponsorship
  Website.pdf`. Swap when the 2026 prospectus exists.
- **Khanjur logo is low-resolution** (298px wide). Request a larger file or SVG.
- **Font licensing.** Druk (Commercial Type) and Interstate (Font Bureau) are commercial.
  Confirm the university's web licence covers self-hosting on this domain before launch.
- **Five exhibitor logos have colour boxes baked into the artwork** so they read heavier than
  their neighbours. Ask for box-free versions if it bothers them.
