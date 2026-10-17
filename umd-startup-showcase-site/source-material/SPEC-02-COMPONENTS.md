# SPEC-02 — Components

Every recurring piece, with its exact geometry and its exact hover behaviour.
Build these before building pages.

---

## 1. Header bar

Full-bleed red band; contents constrained to the 1240 grid.

```
outer:  background: #E21833
inner:  max-width: 1240px; margin: 0 auto;
        display: flex; align-items: center; justify-content: space-between;
        gap: 32px; padding: 20px 32px; flex-wrap: wrap
```

**WHY the inner container:** the bar used to run full-width with 32px padding while every
other section sat in a 1240 container. Above a 1304px viewport the two right gutters drift
apart — at 1440 they were 100px out. The nav's right edge must track the page grid, because
the 2025 banner link below it is aligned to the nav (see §7).

Side effect, and desirable: the UMD logo now lines up with the page content below it.

**Left — logo.** An `<a>` to `/`, `display: flex; align-items: center; flex: none`, containing:

```
<img src="UMD_Primary_Color_W.png" alt="University of Maryland"
     style="height: 56px; width: auto; display: block">
```

Asset URL (already hosted in the current Webflow project):
`https://cdn.prod.website-files.com/6899f1a81d12706ef336b639/689a25ba35aa26cd8b9e1d19_UMD_Primary_Color_W.png`

**Right — nav.** `display: flex; gap: 34px`. Three links: **Home** → `/`, **2025** → `/2025`,
**Updates** → `/updates`. Each link is structured as two children:

```
<a href="…">                                   ← T18: Interstate 700 16px 0.14em uppercase #FFFFFF
  <span data-grow>Home</span>                  ← the label; this is what scales
  <span class="nav-underline"></span>          ← display:block; height:4px; margin-top:3px
</a>
```

- Label span: `display: inline-block; transform-origin: center center;` + transition **M1**
- Underline span: `background: #FFD200` when that page is current, `transparent` otherwise.
  Keeping it present-but-transparent on inactive links means nothing shifts when the active
  page changes.
- `margin-top: 3px` — WHY: it was 8px and read as detached from the label.

**There is no UMD.EDU utility bar.** An earlier version had one above the red band; it was
cut deliberately. Do not add one.

---

## 2. Footer

```
outer:  background: #000000
        ├─ pattern strip (dark variant, full-bleed) ← see §3
        ├─ inner: max-width:1240px; margin:0 auto; padding:64px 32px;
        │         display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:56px
        └─ legal bar
```

**Column 1:** the reversed UMD logo at `height: 64px; width: auto; display: block;
margin-bottom: 26px`, then two lines in T24:

> A. James Clark School of Engineering
> University of Maryland, College Park, MD 20742

(as a single paragraph with a `<br>` between them)

**Column 2:** Home / 2025 / Updates stacked — `display: flex; flex-direction: column;
gap: 14px; align-items: flex-start`. Same T18 styling and same `data-grow` label span as the
header nav, but **no underline span**.

**Legal bar:** `border-top: 1px solid #454545`, inner `max-width:1240px; margin:0 auto;
padding:22px 32px`, text `© 2026 University of Maryland` in T25.

---

## 3. Fearlessly Forward pattern strip

The signature brand device: a horizontal band of the official UMD chevron pattern.

```css
height: 26px;
background: url(<svg>) repeat-x left center;
background-size: auto 100%;
```

Two variants in `assets/pattern/`:

| File | Colours | Use on |
|---|---|---|
| `ff-pattern-dark.svg` | white / red / gold | dark grounds (black, red) |
| `ff-pattern-light.svg` | black / red / gold | white grounds |

`FF Pattern-digital-strip-ORIGINAL.svg` is the untouched source both were derived from.

**It must span the full viewport width — place it outside the 1240 container.**
WHY: it was once inside the container and visibly stopped halfway across the page.

Where it appears (5 places):

| Location | Variant |
|---|---|
| Home — directly below the hero | dark |
| Home — between the sponsorship band and the stats band | light |
| 2025 — directly below the hero | dark |
| Updates — directly below the hero | dark |
| All pages — directly above the footer content | dark |

---

## 4. Skewed knockout headline

The display headline device. White panels skewed −12°, with the text counter-skewed +12° so it
reads upright. Used on 4 headlines (Home hero, Home closing band, Updates hero, 2025 hero).

### Structure — two lines, each its own panel

```html
<h1 style="margin:0; display:flex; flex-direction:column; align-items:flex-start; gap:0">

  <!-- LINE 1 -->
  <span style="display:inline-block; background:#FFFFFF; transform:skewX(-12deg)">
    <span style="display:block;
                 padding:0.16em 0.30em 0.038em;
                 transform:skewX(12deg);
                 font-family:'Druk',...; font-weight:700; font-style:italic;
                 font-size:<CLAMP>; line-height:1; letter-spacing:0.01em;
                 text-transform:uppercase; color:#000000">UMD Startup</span>
  </span>

  <!-- LINE 2 -->
  <span style="display:inline-block; background:#FFFFFF;
               font-size:<CLAMP>;              ← same clamp as the inner span
               transform:skewX(-12deg);
               margin-left:0.42em;
               margin-top:-0.217em">
    <span style="display:block; padding:0.16em 0.30em 0.038em; transform:skewX(12deg);
                 font-family:'Druk',...; font-size:<CLAMP>; …">Showcase<CHEVRON/></span>
  </span>

</h1>
```

### The four numbers, and why each is what it is

**`padding: 0.16em 0.30em 0.038em` on the INNER span (not the outer panel).**
WHY: `em` on the outer panel resolves against the `<h1>`'s font-size (32px by browser
default), not the 72–108px display size — producing ~2.5px of padding instead of ~11px. The
padding must live on the inner span, where `em` resolves against the display size.

**Top `0.16em` vs bottom `0.038em` — deliberately asymmetric.**
WHY: uppercase Druk at `line-height: 1` sits high in its line box. Measured from the font:
ascent 0.81em, cap height 0.753em, so only 0.057em of space sits above the caps, while
0.179em of empty descender space sits below. Symmetric padding therefore looks top-heavy.
`0.16em` top + `0.038em` bottom makes the measured gap above and below the caps equal.

**`margin-top: -0.217em` on line 2 — the panels overlap.**
WHY: `0.217em` is exactly the ink-to-panel-edge margin (`0.16em` padding + `0.057em` font
gap). Overlapping by that amount makes the gap between the two lines of text equal to the
margin above line 1 and below line 2. Verified at 72px: 15.64px / 15.64px / 15.63px.
Because it is in `em` of the display size, the rhythm holds at every viewport.

**`margin-left: 0.42em` on line 2 — the staircase indent.** In `em` of the display size, so
it scales with the type rather than staying a fixed pixel value.

### Clamps per headline

| Headline | font-size |
|---|---|
| Home hero — "UMD Startup" / "Showcase" | `clamp(54px, 7.8vw, 108px)` |
| Home closing — "Join us" / "November 13" | `clamp(34px, 4.4vw, 64px)` |
| Updates hero — "Register for" / "Updates" | `clamp(36px, 4.8vw, 72px)` |
| 2025 hero — "2025 UMD Startup" / "Showcase" | `clamp(34px, 4.6vw, 70px)` |

### Webflow note

Two nested divs per line, with Transform → Skew set in the style panel. Check the counter-skew
at every breakpoint — this is the most fragile part of the design and the most likely thing to
need hand-finishing.

---

## 5. Chevron glyph

One SVG shape, used as a bullet, an accent, and inline in headlines.

```html
<svg viewBox="0 0 1000 1000">
  <polygon points="500,1000 1000,468.7 656.3,0 156.3,0 500,468.7 0,1000" fill="#E21833"/>
</svg>
```

| Instance | Size | Fill | Extra |
|---|---|---|---|
| Inline in a knockout headline, after the last word | `0.44em` square | `#E21833` | `margin-left: 0.12em; display: inline-block; vertical-align: 0.15em` |
| Hero / Updates lead bullet | `19px` square | `#E21833` | `flex: none; margin-top: 7px` (hero) / `6px` (updates) |
| Agenda row marker | `16px` square | `#E21833` | `margin-top: 20px` |
| Sponsorship band accent | `64px` square | `#000000` | — |

**`vertical-align: 0.15em` on the headline chevron.**
WHY: it was on the baseline, which looked orphaned below the caps. Raising it `0.15em` centres
it on the cap height — half the distance from the baseline to the cap midpoint.

**`margin-left: 0.12em`.** WHY: halved from `0.24em` at the client's request.

---

## 6. Buttons

All buttons share this base:

```
display: inline-flex; align-items: center;
font-family: 'Interstate',...; font-weight: 700; font-size: 16px;
letter-spacing: 0.0625em; text-transform: uppercase;
border-radius: 0;                       ← square, always
transition: M2                          ← background-color + color, 260ms
```

### Internal structure — required for the hover to work

```html
<a data-btn style="…base…; background:…; color:…; padding:…">
  <span style="display:inline-flex; align-items:center; gap:<GAP>;
               transform-origin:center center;
               transition: transform 320ms cubic-bezier(0.34,1.4,0.64,1)">Label<span>&#8250;&#8250;</span></span>
</a>
```

- The label **and** the `››` are both inside one wrapper span. That wrapper is what scales.
- `››` is two `&#8250;` characters in their own nested span.
- **There is no literal space between the label text and the `››` span.**
  WHY: the visible gap used to be a space character *plus* the flex gap. The client asked to
  halve it; the space was removed and its width folded into the gap value.

### The 7 buttons

| # | Label | Links to | Ground | Text | Padding | Gap | Hover | Grow |
|---|---|---|---|---|---|---|---|---|
| B1 | Register for updates `››` | `/updates` | `#FFD200` | `#000000` | `18px 30px` | `8px` | ground → `#FFFFFF` | **1.03** |
| B2 | Sponsorship opportunities `››` | sponsorship PDF (SPEC-03) | `#FFD200` | `#000000` | `17px 26px` | `7px` | ground → `#000000`, text → `#FFFFFF` | 1.05 |
| B3 | See the 2025 showcase `››` | `/2025` | `#E21833` | `#FFFFFF` | `18px 30px` + `margin-top:10px` | `8px` | ground → `#000000` | **1.03** |
| B4 | Register for updates `››` | `/updates` | `#E21833` | `#FFFFFF` | `18px 30px` | `8px` | ground → `#000000` | **1.03** |
| B5 | View more photos `››` | `https://adobe.ly/43f9xJY` | `#E21833` | `#FFFFFF` | `15px 24px` | `7px` | ground → `#000000` | **1.03** |
| B6 | Read the recap `››` | Mtech news (SPEC-03) | `#FFFFFF`, `2px solid #000000` | `#000000` | `13px 24px` | `7px` | ground → `#000000`, text → `#FFFFFF` | **1.03** |
| B7 | Go to 2026 `››` | `/` | `#000000` | `#FFFFFF` | `18px 30px` | `8px` | ground → `#FFFFFF`, text → `#000000` | 1.05 |

### Grow factor — 1.05 default, 1.03 on long labels

```css
a[data-btn] > span            { transform-origin: center center; }
a[data-btn]:hover > span      { transform: scale(var(--grow, 1.05)); }
```

Buttons B1, B3, B4, B5, B6 carry `--grow: 1.03` as an inline custom property on the wrapper
span. B2 and B7 have no override and take the 1.05 default.

WHY: a percentage scale moves a long label's edges much further than a short one's, so the
same 5% reads more dramatic on "Register for updates" than on "Go to 2026". The longer labels
were dialled back.

The label grows **from its centre** — the button box itself does not resize.

---

## 7. The 2025 past-event banner link

`See the 2026 showcase ››` — a text link, not a button. Sits in the gold banner on `/2025`.

```
anchor:  T23 (Roboto Condensed 700 16px 0.14em uppercase), colour #000000
         margin-right: 31px
         transition: M3 (color 260ms)
         hover: color → #E21833
label:   <span data-grow style="display:inline-block; --grow:1.03;
                                transform-origin:center center; transition:M1">
```

- **No underline / bottom border.** It had a 3px black border-bottom that turned red on hover;
  both were removed in favour of the whole thing turning red.
- Whole thing (label + `››`) turns `#E21833` on hover, and grows 103%.
- **`margin-right: 31px`.** WHY: this offsets the link so its **left edge aligns with the "H"
  of HOME** in the nav directly above it. 31px is the measured difference between the nav's
  width (266.1px) and the link's width (235.1px). Both are 16px type at fixed tracking, so
  that difference is constant and the alignment survives any viewport — *provided* the header
  bar's inner container is on the 1240 grid (§1). Verified: both left edges at the same x,
  delta 0.

---

## 8. Logo tiles

Three variants — exhibitors, sponsors, hosts. Same construction, different dimensions.

### Structure — background-image on an inner span, never an `<img>`

```html
<a href="<website>" target="_blank" rel="noopener"
   role="img" aria-label="<Organisation name>"
   data-logo-grow
   style="display:block; height:<H>; padding:<PAD>;
          background:#FFFFFF; box-shadow:0 0 0 1px <RING>">
  <span style="display:block; width:100%; height:100%;
               background-image:url('<logo>');
               background-size:contain; background-repeat:no-repeat; background-position:center;
               transform-origin:center center;
               transition: transform 320ms cubic-bezier(0.34,1.4,0.64,1)"></span>
</a>
```

**WHY not an `<img>`:** an earlier build used `<img>` and the images appeared before the
surrounding markup during progressive render, producing a flash of unstyled logos. A
background-image on the inner span also gives a clean element to scale on hover without
touching the tile.

**WHY the inner span at all:** the hover scales the *logo*, not the tile. The tile's white
ground and hairline must stay perfectly still.

### Dimensions

| Variant | Height | Padding | Ring colour | Grid declaration |
|---|---|---|---|---|
| Exhibitor | `124px` | `19.5px 15.6px` | `#D8D8D8` | `repeat(auto-fill, minmax(178px, 1fr))` |
| Sponsor | `150px` | `23.5px 14.06px` | `#E6E6E6` | `repeat(auto-fit, minmax(160px, 1fr))` |
| Host | `140px` | `22px 17.6px` | `#E6E6E6` | `repeat(auto-fit, minmax(180px, 1fr))` |

All three grids: `display: grid; gap: 1px; background: #FFFFFF`.

The 1px separators come from each tile's `box-shadow` ring plus the grid `gap` over a white
grid background. **Not borders** — borders double up at shared edges.

### Padding is proportional, not arbitrary

Measured at desktop: exhibitor and host tiles both render 214.3px wide; sponsor tiles 171.2px.

| Variant | Side padding as % of tile width | Vertical as % of height |
|---|---|---|
| Host | **8.21%** | 15.7% |
| Sponsor | **8.21%** | 15.7% |
| Exhibitor | 7.28% | 15.7% |

Sponsor side padding is `14.06px` specifically because that is 8.21% of 171.2px — matching the
hosts despite the narrower tile. **Exhibitors are the one group still at 7.28%**; bringing them
to `17.6px` would align all three. Flagged, not yet changed — ask the client.

### Hover

```css
a[data-logo-grow]:hover > span { transform: scale(1.069); }
```

Uniform across all three variants, 320ms **M1**.

**The tile ground must not change colour on hover.**
WHY: several supplied logos are white-on-white or carry their own white box, so a ground
colour change looks broken. An earlier build shrank the padding on hover instead; that was
replaced with the transform.

**WHY 1.069 and not 1.05:** the client wanted logo growth more pronounced than the buttons'.
The base size was reduced 10% (host side padding 16px → 17.6px) and the scale raised to 1.069
so the *peak* size lands on exactly the same pixel width as before — more travel, same
maximum, so logos never crowd the tile edge. Resulting side margins: **8.21% at rest, 5.33%
hovered**, identical for hosts and sponsors.

### Logo files — read this before touching any of them

All 49 logos in `assets/logos/` are production-ready. Three kinds of work were done:

**1. Trimmed to ink.** Every logo was cropped to its actual ink bounding box, so uniform tile
padding produces visually equal margins. **Do not re-crop or re-pad.**

**2. Recoloured for white grounds** (9 files). Several supplied logos were white artwork on
dark grounds, invisible on a white tile. Each was keyed off its own background so
antialiased edges stayed smooth. Per-logo notes are in `content/exhibitors-2025.csv`:

| Logo | What was done |
|---|---|
| BeneKinetic | Navy box → transparent; white wordmark → that same navy |
| Diffraqtion | `#040404` ground → transparent; white artwork → black (glyph gradient preserved) |
| Dynamic Dimension Technologies | Ground → transparent; "DDT" → its real brand gradient `#3c8caf` → `#1b232e`; "DYNAMIC DIMENSION TECHNOLOGIES" → flat `#1b232e` |
| gSpin Technologies | Black ground → transparent; **only** the white type → black; the cyan glyph left untouched |
| NeoQuortex | Black ground → transparent; all-white artwork → black |
| QC82 | Ground → transparent; artwork → `#eb9b2e` |
| Inception Robotics | **Replaced** with the client's current logo (navy + gold) |
| Khanjur | **Replaced** with the purple-on-white version. Low res — see README |
| Wenite | **Replaced** with the client-supplied transparent version |

**3. Optically balanced** — 22 files carry a scale factor baked in as transparent padding, so
heavier logos sit smaller in their tile. The factors are in the CSVs' "Scale baked into file"
column. **These are deliberate client decisions made by eye. Do not normalise them, and do
not "fix" a logo that looks small.**

### Array shadow

The **sponsor** and **host** grids each carry, on the grid container (not the tiles):

```css
box-shadow: 0 1px 5px rgba(0, 0, 0, 0.10);
```

So each array lifts off the white as one unit rather than 10 or 4 separate cards. The
exhibitor grid has none — it sits on `#E6E6E6` and needs no separation.

WHY these values: a wider `0 2px 18px rgba(0,0,0,0.07)` was tried and read as "dirty" haze;
the shorter blur hugs the array edge, with slightly more opacity to stay visible.

---

## 9. Stat numerals — synthetic weight

The three numerals on Home's black band (`40`, `1`, `60`) use T9 plus:

```css
-webkit-text-stroke: 0.028em #FFD200;
paint-order: stroke fill;
letter-spacing: -0.012em;
```

WHY: the client wanted heavier numerals, and 700 is the heaviest Interstate cut supplied —
there is no Black/Ultra file. The stroke thickens the real letterform outward rather than
faking weight with a shadow, roughly equivalent to stepping Bold → Black. Tracking was opened
from `-0.03em` to `-0.012em` because the heavier strokes closed the gaps.

**This is a render-time effect, not a real font weight.** If an Interstate Black file turns
up, delete the stroke and switch the weight instead.

---

## 10. CMS Collections

Four lists repeat and will change year to year. Make them Collections rather than static
elements.

| Collection | Fields | Rows now | CSV |
|---|---|---|---|
| Exhibitors | Name (text), Logo (image), Website (link), Year (number), Order (number) | 35 | `content/exhibitors-2025.csv` |
| Sponsors | Name, Logo, Website, Year, Order, Tier (option — unused for now) | 10 | `content/sponsors-2025.csv` |
| Hosts | Name, Logo, Website, Order | 4 | `content/hosts.csv` |
| Agenda items | Kind (text), Time (text), Title (text), People (multi-line), Year, Order | 5 | `content/agenda-2025.csv` |

Bind the logo to the **background-image of the inner span** via the CMS image field — Webflow
supports binding background images — preserving `background-size: contain` and
`background-position: center`.

The `Order` column in each CSV is the display order shown in the design. Keep it.

**Whoosh** (exhibitor #35) has no website. Render it as a non-linked tile, not a dead `#` link.
