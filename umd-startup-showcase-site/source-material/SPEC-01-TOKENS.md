# SPEC-01 — Tokens

Colour, type, spacing, motion, focus. Every value literal.

---

## 1. Colour

These are the only colours in the design. **Do not introduce others.**

| Token name | Hex | Where it is used |
|---|---|---|
| `maryland-red` | `#E21833` | Nav bar ground; primary buttons; eyebrow labels; accent chevrons; sponsorship band; 2025 next-up band; focus ring; hover colour of the 2025 banner link |
| `maryland-gold` | `#FFD200` | Hero CTA button; stat numerals; nav active underline; nav link hover; footer link hover; 2025 past-event banner ground; sponsorship-band accent rule; sponsorship button |
| `black` | `#000000` | Hero field; stats band; footer; body headings; secondary buttons; accent rules |
| `white` | `#FFFFFF` | Default page ground; reversed text; headline knockout panels; logo tile grounds |
| `gray-light` | `#E6E6E6` | Alternating section ground (program band, exhibitors band); sponsor + host tile hairline |
| `gray-hairline` | `#D8D8D8` | Exhibitor tile hairline only |
| `gray-mid` | `#7F7F7F` | Photo backfill behind images while loading; footer legal text |
| `gray-dark` | `#454545` | Body copy on white; footer divider rule; form input borders |
| `ddt-blue-top` | `#3c8caf` | Inside the DDT logo artwork only — top of its gradient |
| `ddt-blue-bottom` | `#1b232e` | Inside the DDT logo artwork only — bottom of its gradient, and its wordmark |
| `qc82-amber` | `#eb9b2e` | Inside the QC82 logo artwork only |

### Approved pairings in use

- white on `#E21833` · gold on `#E21833`
- white on `#000000` · gold on `#000000`
- black on `#FFD200`
- black on `#FFFFFF` · `#454545` on `#FFFFFF`
- black on `#E6E6E6` · `#454545` on `#E6E6E6`

### Forbidden pairings

`#E21833` on `#FFD200` · `#E21833` on any gray · `#FFD200` on `#FFFFFF`. All fail contrast.

### Global link defaults

```css
a        { color: #E21833; text-decoration: none; }
a:hover  { color: #000000; text-decoration: underline; }
```

These are the fallback for any link added later that has no explicit styling. Every link in
the design overrides them.

---

## 2. Type

Three families. Two self-hosted, one from Google Fonts.

| Role | Family | Weights / styles needed |
|---|---|---|
| Display headlines | **Druk** | 700 italic only |
| Headings, body, buttons, nav | **Interstate** | 300, 300 italic, 400, 400 italic, 700, 700 italic |
| Eyebrows, labels, metadata, dates | **Roboto Condensed** | 400, 700 |

### Fonts — Webflow upload

Site settings → Fonts → Upload custom fonts. Upload all 7 files from `assets/fonts/`.
Name the families exactly `Druk` and `Interstate`. Assign each file its weight/style:

| File | Family | Weight | Style |
|---|---|---|---|
| `Druk-BoldItalic.otf` | Druk | 700 | italic |
| `Interstate-Light.otf` | Interstate | 300 | normal |
| `Interstate-LightItalic.otf` | Interstate | 300 | italic |
| `Interstate-Regular.otf` | Interstate | 400 | normal |
| `Interstate-RegularItalic.otf` | Interstate | 400 | italic |
| `Interstate-Bold.otf` | Interstate | 700 | normal |
| `Interstate-BoldItalic.otf` | Interstate | 700 | italic |

If Webflow rejects an OTF, convert that file to WOFF2 and upload that. **Do not substitute a
different typeface.**

Roboto Condensed: enable via Webflow's Google Fonts panel, weights 400 and 700.

Fallback stacks, in case a face fails to load:
- Druk → `'Druk', 'Source Sans 3', sans-serif`
- Interstate → `'Interstate', 'Source Sans 3', system-ui, sans-serif`
- Roboto Condensed → `'Roboto Condensed', 'Interstate', sans-serif`

### Type scale — every text style in the design

| # | Style | Family | Size | Weight | Letter-spacing | Line-height | Transform | Colour |
|---|---|---|---|---|---|---|---|---|
| T1 | Hero display (Home h1) | Druk | `clamp(54px, 7.8vw, 108px)` | 700 italic | `0.01em` | 1 | uppercase | `#000000` |
| T2 | Updates display (h1) | Druk | `clamp(36px, 4.8vw, 72px)` | 700 italic | `0.01em` | 1 | uppercase | `#000000` |
| T3 | 2025 display (h1) | Druk | `clamp(34px, 4.6vw, 70px)` | 700 italic | `0.01em` | 1 | uppercase | `#000000` |
| T4 | Closing display (h2) | Druk | `clamp(34px, 4.4vw, 64px)` | 700 italic | `0.01em` | 1 | uppercase | `#000000` |
| T5 | Section heading (h2) | Interstate | `clamp(28px, 3.2vw, 40px)` | 700 | `-0.01em` | 1.08 | uppercase | `#000000` |
| T6 | Band heading | Interstate | `clamp(26px, 2.8vw, 36px)` | 700 | `-0.01em` | 1.1 | uppercase | `#FFFFFF` |
| T7 | Program band heading | Interstate | `clamp(23px, 2.8vw, 32px)` | 700 | `-0.01em` | 1.14 | uppercase | `#000000` |
| T8 | Next-up heading | Interstate | `clamp(24px, 3vw, 36px)` | 700 | `-0.01em` | 1.1 | uppercase | `#FFFFFF` |
| T9 | Stat numeral | Interstate | `clamp(56px, 7vw, 96px)` | 700 | `-0.012em` | 0.9 | — | `#FFD200` |
| T10 | Hero lead (bold) | Interstate | `19px` | 700 | — | 1.4 | — | `#FFFFFF` |
| T11 | Body large | Interstate | `18px` | 400 | — | 1.5 | — | `#454545` or `#FFFFFF` |
| T12 | Body | Interstate | `17px` | 400 | — | 1.5 | — | `#454545` or `#FFFFFF` |
| T13 | Agenda item title | Interstate | `21px` | 700 | — | 1.25 | — | `#000000` |
| T14 | Agenda person | Interstate | `16px` | 400 | — | 1.45 | — | `#454545` |
| T15 | Hero date | Roboto Condensed | `24px` | 700 | `0.1em` | 1.2 | uppercase | `#FFFFFF` |
| T16 | Hero venue / invite line | Roboto Condensed | `17px` | 700 | `0.14em` | 1.5 | uppercase | `#FFFFFF` / `#FFD200` |
| T17 | Eyebrow label | Roboto Condensed | `16px` | 700 | `0.2em` | — | uppercase | varies |
| T18 | Nav link | Interstate | `16px` | 700 | `0.14em` | — | uppercase | `#FFFFFF` |
| T19 | Button label | Interstate | `16px` | 700 | `0.0625em` | — | uppercase | varies |
| T20 | Agenda time | Roboto Condensed | `18px` | 700 | `0.06em` | — | uppercase | `#000000` |
| T21 | 2025 hero date line | Roboto Condensed | `16px` | 700 | `0.18em` | — | uppercase | `#FFD200` |
| T22 | Updates eyebrow | Roboto Condensed | `16px` | 700 | `0.18em` | — | uppercase | `#FFD200` |
| T23 | 2025 banner text + link | Roboto Condensed | `16px` | 700 | `0.2em` / `0.14em` | — | uppercase | `#000000` |
| T24 | Footer address | Roboto Condensed | `16px` | 400 | `0.04em` | 1.6 | — | `#FFFFFF` |
| T25 | Footer legal | Roboto Condensed | `16px` | 400 | `0.08em` | — | — | `#7F7F7F` |

### Two hard rules on type

**A. Nothing below 16px, anywhere.** This was an explicit client requirement. Watch for
Webflow's default small-text classes creeping in on form errors, captions and legal text.

**B. Button tracking is `0.0625em`, not the `0.14em` used elsewhere.**
WHY: at 16px Interstate Bold, the average glyph advance is ~10px. `0.14em` = 2.24px of added
tracking, which renders the line ~122% of its natural width — the client found that too airy
on buttons specifically. `0.0625em` = 1.0px, ≈110% of natural. Nav links stay at `0.14em`.

### Responsive type — how to handle `clamp()`

Webflow's style panel has no `clamp()` field. Pick **one** approach and use it consistently:

**Preferred:** put the `clamp()` declarations in one site-wide `<style>` block in the page
head, keyed to your global classes. Exact match to spec, single place to maintain.

**Acceptable:** set the max value at Desktop and step down at Tablet / Mobile Landscape /
Mobile Portrait to roughly the clamp floor. More clicks, slightly less smooth scaling.

---

## 3. Spacing and layout

| Value | Use |
|---|---|
| `1240px` | Max content width, centred. Applies to the header bar's inner container too — see SPEC-02 → Header. |
| `32px` | Horizontal page gutter (left/right padding inside the 1240 container) |
| `26px` | Height of the Fearlessly Forward pattern strip |
| `4px` | Heavy accent rule under headings; nav active underline |
| `2px` | Photo-grid gutter |
| `1px` | Logo-tile gutter — produced by `box-shadow: 0 0 0 1px <colour>` plus `gap: 1px`, **not** borders (borders double up at shared edges) |
| `0` | **Border radius, everywhere.** Nothing in this design is rounded — including form inputs and buttons. |

Vertical section padding varies by section; exact values are given per section in SPEC-03.

### Reference breakpoints

Desktop **1440**, mobile **390**. All grids use `auto-fit`/`auto-fill` with `minmax()` so they
reflow without media queries — the exact grid declaration is given per section in SPEC-03.

---

## 4. Motion

Only three transitions exist in the whole design. There are **no scroll animations, no fades,
no parallax, no page transitions.**

| # | Name | Declaration | Applied to |
|---|---|---|---|
| M1 | Grow | `transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1)` | Button labels, nav labels, footer links, the 2025 banner link, logo tiles |
| M2 | Colour | `background-color 260ms cubic-bezier(0.33, 1, 0.68, 1), color 260ms cubic-bezier(0.33, 1, 0.68, 1)` | Buttons |
| M3 | Link colour | `color 260ms cubic-bezier(0.33, 1, 0.68, 1)` | The 2025 banner link only |

**M1's curve overshoots** (the `1.4` control point) and settles back. That is intentional —
at 3–7% growth a plain ease-out reads mechanical. Do not replace it with `ease` or `ease-out`.

**M2 exists because the colour swap used to snap instantly** while the label was still
growing, which read as broken. Colour and grow must run together.

Respect `prefers-reduced-motion`: disable M1 (keep the colour changes).

---

## 5. Focus

```css
:focus-visible { outline: 2px solid #E21833; outline-offset: 2px; }
```

Applies globally. Make sure Webflow's reset does not strip it. Keyboard focus must stay
visible on every link, button and form field.

---

## 6. Accessibility notes

- Logo tiles are anchors with **no text content** — each carries `role="img"` and
  `aria-label="<Organisation name>"`. See SPEC-02 → Logo tiles.
- Every photo has real alt text; the exact strings are in `content/photo-manifest.csv`.
- The Lightroom iframe has `title="2025 UMD Startup Showcase photo gallery"`.
- Contrast: all pairings listed in §1 meet WCAG AA (4.5:1 body, 3:1 large text).
