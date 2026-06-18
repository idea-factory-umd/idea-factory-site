# The Idea Factory — Design System

> **Where Ideas Go to Work.** The brand, foundations, components, and UI kit for The Idea Factory at the University of Maryland (A. James Clark School of Engineering). A full rebrand of the Maryland Technology Enterprise Institute (Mtech) → **Idea Factory** — this system carries **no legacy "Mtech" branding**.

This project is the design source of truth for a **family of sites**: the Idea Factory flagship plus the individual program sites (aspire.umd.edu, mips.umd.edu, hinmanceos.umd.edu, …) that will be restyled to match. Build components as a reusable kit, not one-off layouts.

---

## 1 · Context & sources

**Company.** The Idea Factory is where the University of Maryland's ideas go to work — where students become entrepreneurs, faculty research reaches the market, innovators test and validate, startups get built, and Maryland companies tap university firepower to grow. Part of the A. James Clark School of Engineering, UMD College Park.

**The product.** Audience-based website (Students · Faculty/Researchers · Companies · Partners) organized around a four-stage ecosystem narrative: **Blueprint → Proving Ground → Assembly Line → Scale-Up**. Program facts are drawn from the current Mtech site, https://www.mtech.umd.edu/. The brand debuts at a **major donor event in October**.

**Sources provided** (originals live in `uploads/`, working copies in `assets/`):
- `design-brief-template.md` — the master brief (positioning, audience, voice, color, type, site structure, Home + Students specs). The single richest reference; read it for anything not covered here.
- `if-logo.svg`, `if-logo-white.svg`, `if-mark.svg` — final logo lockup (color + white-wordmark tones) and squared mark.
- Stage glyph system — `stage-01..04` (transparent) and `stage-01..04-tile` (white-tiled), plus overview sheets and `journey-bar-states.svg`.
- Platform: built/managed in **Webflow**. These mockups are the design spec; favor clean, well-sectioned, component-minded structure (CMS-friendly: news, events, the program directory; the Students tag filter on a Collection field).

**Assets — all final, colored, and wired:**
- **Interstate** (headings) is **self-hosted** from `/fonts` (Font Bureau OTF, uploaded by the user): Light 300 · Regular 400 · Bold 700 · Black 800, each with a matching italic. The type tokens render in real Interstate.
- **Logo** comes in **two tones of the full lockup**: `if-logo.svg` (red wordmark — light backgrounds) and `if-logo-white.svg` (white wordmark — **required on dark backgrounds**: black/red footers, dark bands). The squared mark is one artwork that works on both. `<Logo tone="white">` selects the dark-ground version.
- **Georgia** (body) is a web-safe system serif — no loading needed.

---

## 2 · Content fundamentals (voice & copy)

**Tagline:** *Where Ideas Go to Work.* **Positioning line:** *One Place. Every Stage.*

**Voice — confident, declarative, plain-spoken, evidence-forward.**
- **Second person.** Address the reader directly: "where **you** learn to think like a builder." Speak to the audience, not about the institute.
- **Short punchy sentences mixed with longer rhythmic ones.** "We are not a think tank. We are not a lecture hall. We are a place where ideas go to work." Uses **rhetorical contrast** and **parallel structure**.
- **Evidence over hype.** Every claim is backed by a real number or outcome. Lead with proof: *Since 1983 · ~19,000 jobs · 72,000+ students · $94.8B economic impact · 40 years.*
- **Maker / factory language**, used consistently but never literally: builder, build, make, real, work; the four stage names; "customer discovery," "validate."

**Casing.** Headlines and labels in **UPPERCASE Interstate** for eyebrows, tags, buttons, and stat labels. Headline display text is set in title/sentence case (the weight does the work). Program labels are plain-language ("Hinman CEOs"), with the full official name in smaller type beneath.

**Emoji:** none. The brand is bold and industrial, not playful-emoji. **Iconography is geometric** (see §5).

**Words we use:** "ideas go to work," builder/build/make/real/work, the four stage names, "customer discovery," "validate," "One Place. Every Stage."
**Words we avoid:** "think tank," "lecture hall," theory-for-its-own-sake, passive ivory-tower academic language, vague innovation buzzwords, hype without a number.

**Stage taglines (approved, verbatim):**
1. Blueprint — *Learn to think like a builder.*
2. Proving Ground — *Where your idea meets the real world.*
3. Assembly Line — *This is where companies get built.*
4. Scale-Up — *Where it takes off.*

---

## 3 · Visual foundations

**Aesthetic keywords:** bold, big-type, color-blocked, modular, industrial, high-contrast, evidence-forward. Confidence + scale of art-school energy, paired with the credibility + restraint of serious VC sites.

**Color.** UMD core palette as a *system*, not a single mode (full token set in `tokens/colors.css`):
- **Maryland Red `#e21833`** — primary action & accent (headlines, CTAs, stage headers).
- **Maryland Gold `#ffd200`** — emphasis only, used sparingly. **Never gold text on white** (fails contrast). Gold blocks use black text.
- **Black `#000000`** / **White `#ffffff`** — type, high-contrast blocks, default ground.
- **Soft tints** (`--red-tint`, `--gold-tint`, light gray) for calmer, content-dense areas.
- **Neutrals** (`#454545`, `#7f7f7f`, `#e6e6e6`) + **Bronze Testudo `#ad7231`** for supporting UI.
- Safe text combos: red-on-white, white-on-red, black-on-white, white/gold-on-black. Avoid red-on-gold, red-on-gray, gold-on-white. Maintain **WCAG AA** (4.5:1 / 3:1 large).

**The Mondrian color-block** is the core device — rectangular blocks of brand color (bright **and** soft) butted edge-to-edge to structure content, derived from the modular blocks in the logo mark itself. Corners stay **squared** on blocks; buttons/inputs/cards use a small `4px` radius; chips are pills. See `ColorBlock`.

**Type.** Headings = **Interstate** (self-hosted), Black 800 for display, Bold 700 for smaller heads; tight tracking (−0.02em) on display to echo the wordmark. Body = **Georgia**, ~1.7 linee-height for comfortable reading, **never below 16px** except footer/legal. Full scale in `tokens/typography.css`.

**Backgrounds.** Light, bright canvases as the default (a deliberate counter to dark-mode); bold color blocks for impact moments; soft tints for dense areas. No gradient blobs, no full-bleed photo wallpaper — **photography is integrated into a block as a module**, not placed behind everything. Placeholder photos are hatched and labelled "Photo."

**Imagery vibe.** Real and active — people building, labs, work happening — not staged "people around a laptop" stock. Warm, candid, documentary. Final shots come from in-house libraries; placeholders are fine in mockups.

**Borders, rules, shadows.** Heavy horizontal **rules** (`4px` black/red) are a signature — strong, structural, not decorative. Outlined boxes with colored edges (red/gold) for emphasis. Shadows are used **sparingly** — the brand leans on blocks and rules, not floating cards; reserve elevation (`--shadow-md/lg`) for overlays and the gentle program-card hover lift.

**Cards.** Program cards: white, hairline `#e6e6e6` border, `4px` radius, image on top (16:9), no heavy shadow; subtle `translateY(-4px)` + soft shadow on hover. Audience boxes: full color blocks, squared, big Interstate label, `››` chevron, no shadow.

**Motion.** Restrained and purposeful — "just enough, not overdone." Short, subtle video moments; **tasteful block motion on scroll** (dialed back, never a spectacle). Easing `cubic-bezier(0.22,1,0.36,1)` for entrances; `140–420ms` durations (`tokens/spacing.css`). Respect `prefers-reduced-motion`.

**States.** Hover = darker red on primary actions, black-fill on outline buttons, `translateY` lift on cards. Press = darker still + `translateY(1px)`. Focus = **3px gold ring** (`--focus-ring`), offset 2px. Defined in `tokens/component-states.css`.

**Layout.** Modular, grid-based (echoes "assembly"). Max content width `1240px`; reference breakpoints **desktop 1440 / mobile 390**. Audience entry points kept high for findability; the impact band sits below them. Consistent chrome (thin UMD bar → identity band → navbar), expressive per-page hero. On mobile, chrome compacts: search → icon, only the navbar stays sticky.

---

## 4 · The four-stage glyph system (core brand device)

Four glyphs, all built from the logo's block language, paired with 01–04 numerals, reading left-to-right as one continuous story. The block is the constant unit; what changes is what's happening to it.

- **01 Blueprint** — 2×2 grid, one block filled, three outlined: the plan, first piece placed.
- **02 Proving Ground** — same grid as a checklist: two assumptions validated (filled + checked), two still open (outline).
- **03 Assembly Line** — three blocks in a row on a line: a unit travelling the production line.
- **04 Scale-Up** — ascending stacks (1 → 2 → 3): the unit multiplying and climbing.

**Color logic — red → black → gold (meaningful, never decorative):**
- **Red = unproven / "in the red."** Blueprint is all red; open assumptions are red.
- **Black = solid / "in the black."** Validated assumptions turn black; the middle of the journey.
- **Gold = success / "struck gold."** Gold appears *only* at the end — the last Assembly-Line block and the peak of Scale-Up.

**Two sets:** *transparent* (place inside light color blocks) and *white-tiled* (on dark/colored grounds — the tile keeps red/black/gold reading correctly, no recolor needed). **Not** placed on the Students program cards — kept clean for findability. They live on the homepage intro, About, and program detail pages (as the `JourneyBar`). See the `StageGlyph` and `JourneyBar` components.

---

## 5 · Iconography

- **System glyphs** (Blueprint/Proving Ground/Assembly Line/Scale-Up) and the **logo mark** are the brand's signature marks — **SVG**, used directly, never recolored. All copied into `assets/`.
- **UI icons** (search, chevrons, social) are minimal line icons at ~2.4px stroke, matching the geometric, squared feel. The `››` double-chevron is the brand's "next step / more" affordance (used on audience boxes and ghost links). Where a UI icon set is needed beyond what's bundled, substitute **Lucide** (same clean line style) and flag it.
- **No emoji.** No literal factory imagery, gears, or conveyor-belt clichés.
- Social icons (X, LinkedIn, Facebook, Instagram) appear only in the footer.

---

## 6 · Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this). Imports → fonts, colors, typography, spacing, base, component-states.
- `readme.md` — this guide. `SKILL.md` — Agent-Skills wrapper for download/Claude Code.

**`tokens/`** — `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `base.css` · `component-states.css`

**`assets/`** — `logo/` (color + white-wordmark lockups + mark; white tone is mandatory on dark grounds) · `glyphs/` (4 stages × transparent + tiled, overview sheets, journey bar)

**`components/`** (React primitives — `window.IdeaFactoryDesignSystem_745a71`)
- `core/` — **Button**, **Tag** (static label + interactive filter chip)
- `brand/` — **Logo**, **StageGlyph**, **JourneyBar**
- `blocks/` — **ColorBlock** (Mondrian device), **StatBlock** (proof points)
- `cards/` — **AudienceCard** (entry boxes), **ProgramCard** (program directory)
- `forms/` — **Input**, **SearchField**

**`ui_kits/website/`** — high-fidelity flagship recreation: Homepage + Students audience page, composing the components above.

**`guidelines/`** — foundation specimen cards (Type, Colors, Spacing, Brand) shown in the Design System tab.

---

## 7 · Usage

Consumers link one file:
```html
<link rel="stylesheet" href="styles.css" />
```
Components are bundled to `window.IdeaFactoryDesignSystem_745a71`. In a card/page, load the bundle (relative path to project root) and destructure:
```html
<script src="../../_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, ColorBlock, StageGlyph } = window.IdeaFactoryDesignSystem_745a71;
</script>
```
Pass `basePath` to asset-backed components (`Logo`, `StageGlyph`, `JourneyBar`) so their SVGs resolve to the project root.
