# SPEC-03 — Pages

Every section of every page, in order, with exact geometry, exact copy and exact links.

Component references (`B1`, `T9`, `M1`, pattern strip, knockout headline, logo tile) point at
SPEC-02 and SPEC-01. Copy in blockquotes is **verbatim** — do not rewrite it.

Every section's outer container is `max-width: 1240px; margin: 0 auto` with the stated padding,
unless it says full-bleed.

---

# HOME — `/`

## H-1 · Hero

Ground: `#000000`, full-bleed.
Inner: `max-width:1240px; margin:0 auto; display:grid;
grid-template-columns:repeat(auto-fit,minmax(430px,1fr)); align-items:stretch`

### Left column
`padding: 76px 48px 84px 32px; display:flex; flex-direction:column; justify-content:center; gap:32px`

**1. Knockout headline (h1)** — clamp `54px / 7.8vw / 108px`
Line 1: `UMD Startup` · Line 2: `Showcase` + inline red chevron

**2. Date block** — `display:flex; flex-direction:column; gap:6px`

| Line | Style | Copy |
|---|---|---|
| 1 | T15 (Roboto Cond 700, **24px**, 0.1em, `#FFFFFF`) | `November 13, 2026` |
| 2 | T16 (17px, 0.14em, `#FFFFFF`) | `Samuel Riggs IV Alumni Center` |
| 3 | T16 (17px, 0.14em, **`#FFD200`**) | `By invitation only` |

Three separate lines. "By invitation only" is on its own line, in gold — explicitly requested.
The date is 24px so the headline still dominates; an earlier version had it at 44px, which
fought the h1.

**3. Lead block** — `display:flex; align-items:flex-start; gap:14px; max-width:540px`
19px red chevron (`flex:none; margin-top:7px`), then a div containing:

T10 (Interstate **700** 19px, `#FFFFFF`, `margin-bottom:14px`):
> Discover the exciting world of innovation and entrepreneurship at the University of Maryland.

T12 (Interstate 400 17px, `#FFFFFF`):
> A day-long exhibition, forum and networking event for technology-based startups affiliated with the university — featuring rapid-fire elevator pitches, an investor panel, and an exhibition hall of startups and support organizations.

**4. Button B1** — `Register for updates ››` → `/updates`

### Right column
`position:relative; min-height:470px; background:#E6E6E6`

Photo `hero-welcome-dean-chang.jpg`, absolutely positioned to fill:
`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block`
Alt: `Dean Chang delivering the welcome at the UMD Startup Showcase`

### Then
**Pattern strip — dark variant, full-bleed.**

---

## H-2 · About

Ground: white. Container `padding: 96px 32px 88px`. Inner wrapper `max-width: 840px`.

- **Eyebrow** T17, `#E21833`, `margin-bottom:22px` — `About the showcase`
- **Heading** T5, `margin-bottom:28px`
  > UMD's most comprehensive showcase of startups and resources
- **Rule** `height:4px; background:#000000; width:120px; margin-bottom:28px`
- **Paragraph 1** T11 (18px, `#454545`), `margin-bottom:20px`
  > Connect with entrepreneurs, investors, faculty, students, and many of the startup resource partners that make up the University of Maryland startup ecosystem.
- **Paragraph 2** T11
  > The event welcomes faculty, current students and staff from the University of Maryland and other USM institutions, as well as venture capital investors, active angel investors, and representatives from state and county economic development organizations and government agencies.

---

## H-3 · Sponsorship band

Ground: `#E21833`, full-bleed.
Inner: `max-width:1240px; margin:0 auto; display:grid;
grid-template-columns:repeat(auto-fit,minmax(400px,1fr)); align-items:stretch`

### Left column — photo
`position:relative; min-height:440px; background:#7F7F7F`
Photo `networking-attendees.jpg`, `object-fit:cover; object-position:40% center`
Alt: `Attendees networking at the UMD Startup Showcase`

### Right column — copy
`padding:72px 32px 72px 56px; display:flex; flex-direction:column; justify-content:center;
align-items:flex-start; gap:24px`

- **Eyebrow** T17, `#FFFFFF` — `Sponsorship`
- **Heading** T6 (`clamp(26px,2.8vw,36px)`, `#FFFFFF`)
  > Put your firm in front of the room
- **Rule** `height:4px; background:#FFD200; width:96px`
- **Body** T12, `#FFFFFF`
  > If you represent a law firm, accounting firm, startup consultancy or other professional service provider, we invite you to connect with one of the organizers about sponsoring the showcase. Sponsorships include event tickets and are an excellent way to participate while supporting the event.
- **Bottom row** `display:flex; align-items:center; justify-content:space-between; gap:24px;
  width:100%; margin-top:4px` containing:
  - **Button B2** — `Sponsorship opportunities ››`
  - **64px black chevron** (`flex:none`)

**B2's link:**
`https://cdn.prod.website-files.com/6899f1a81d12706ef336b639/68a49db130a9b99be192deba_Startup%20Showcase%202025%20Sponsorship%20Website.pdf`
`target="_blank" rel="noopener"`

⚠️ **This is the 2025 prospectus.** Swap it when the 2026 file exists.

### Then
**Pattern strip — light variant, full-bleed.**

---

## H-4 · Stats band

Ground: `#000000`, full-bleed.
Inner: `padding:76px 32px; display:grid;
grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:48px`

Three cells. Numeral in T9 **plus the synthetic-weight treatment** (SPEC-02 §9), label in
T17-style Roboto Condensed 700 16px `0.2em` uppercase `#FFFFFF` with `margin-top:14px`.

| Numeral | Label |
|---|---|
| `40` | `Startups expected` |
| `1` | `Exhibit hall` |
| `60` | `Minutes of rapid-fire pitch sessions` |

Note "Startups **expected**" — 2026 is a forecast, not a count.

---

## H-5 · Photo triptych

Ground: white. Container `padding: 88px 32px`.
`display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:2px`
Each cell: `position:relative; aspect-ratio:4/3; background:#E6E6E6`, photo `object-fit:cover`.

**Order matters — do not reorder:**

| # | File | Alt |
|---|---|---|
| 1 | `exhibit-hall-technik-demo.jpg` | The Technik Soccer team at their exhibit hall demo |
| 2 | `exhibit-hall-exhibitor-table.jpg` | Attendees talking at an exhibitor table in the showcase exhibit hall |
| 3 | `quick-pitch-founder.jpg` | A founder delivering a quick pitch at the UMD Startup Showcase |

WHY: #3 is a single presenter facing frame-right. Placed third, his sightline runs into the
page rather than off its edge. `minmax` is `240px` (not 290px) so this holds three columns at
normal desktop widths instead of collapsing to two and orphaning the third.

---

## H-6 · Program / 2025 pointer

Ground: `#E6E6E6`, full-bleed.
Inner: `max-width:1240px; margin:0 auto; display:grid;
grid-template-columns:repeat(auto-fit,minmax(420px,1fr)); align-items:stretch`

### Left column — copy
`padding:72px 48px 72px 32px; display:flex; flex-direction:column; justify-content:center;
align-items:flex-start; gap:22px`

- **Eyebrow** T17, `#000000` — `Program`
- **Heading** T7
  > The 2026 agenda, speakers and exhibitors are still to be announced
- **Body** T12, `#454545`
  > Register for updates and we'll send them as they're confirmed. Last year's full program, photos and exhibitor list are on the 2025 page.
- **Button B3** — `See the 2025 showcase ››` → `/2025`

### Right column — photo
`position:relative; min-height:400px; background:#7F7F7F`
Photo `quick-pitch-presenter.jpg`, `object-fit:cover; object-position:58% center`
Alt: `A founder presenting during the quick pitch session`

WHY text-left / photo-right: the presenter faces frame-left, so with the photo on the right his
sightline points back into the copy.

---

## H-7 · Hosted by

Ground: white. Container `padding: 80px 32px 88px`.

- **Eyebrow** T17, `#454545`, `margin-bottom:26px` — `Hosted by`
- **Host logo tile grid** (SPEC-02 §8), 4 tiles, **with the array shadow**

| Order | Name | Logo | Website |
|---|---|---|---|
| 1 | UM Ventures | `um-ventures.png` | `https://www.umventures.org` |
| 2 | Mtech Ventures | `mtech-ventures.png` | `https://www.mtech.umd.edu` |
| 3 | Quantum Startup Foundry | `quantum-startup-foundry.png` | `https://qsf.umd.edu` |
| 4 | Institute for Health Computing | `institute-for-health-computing.png` | `https://www.ihc.umd.edu` |

All `target="_blank" rel="noopener"`.

---

## H-8 · Closing band

Ground: `#FFD200`, full-bleed.
Inner: `max-width:1240px; margin:0 auto; display:grid;
grid-template-columns:repeat(auto-fit,minmax(420px,1fr)); align-items:stretch`

### Left column
`padding:88px 48px 88px 32px; display:flex; flex-direction:column; justify-content:center;
align-items:flex-start; gap:32px`

- **Knockout headline (h2)** — clamp `34px / 4.4vw / 64px`
  Line 1: `Join us` · Line 2: `November 13` + inline red chevron
- **Body** T11 (18px, **`#000000`**), `max-width:580px`
  > Discover the exciting world of innovation and entrepreneurship at the University of Maryland. Attendance is by invitation — add your name for updates.
- **Button B4** — `Register for updates ››` → `/updates`

### Right column — photo
`position:relative; min-height:420px; background:#7F7F7F`
Photo `attendees-closing-band.jpg`, `object-fit:cover`
Alt: `Attendees at the UMD Startup Showcase`

---

# 2025 — `/2025`

## A-1 · Past-event banner

Ground: `#FFD200`, full-bleed.
Inner: `max-width:1240px; margin:0 auto; padding:16px 32px; display:flex; flex-wrap:wrap;
align-items:center; justify-content:space-between; gap:16px`

- **Left** T23 (Roboto Cond 700 16px `0.2em` uppercase `#000000`) — `2025 Showcase — past event`
  (em dash)
- **Right** the banner link component (SPEC-02 §7) — `See the 2026 showcase ››` → `/`

---

## A-2 · Hero

Ground `#000000`, full-bleed. Inner `max-width:1240px; margin:0 auto; padding:76px 32px 84px`.

- **Knockout headline (h1)** — clamp `34px / 4.6vw / 70px`, `margin-bottom:32px`
  Line 1: `2025 UMD Startup` · Line 2: `Showcase` + inline red chevron
- **Date line** T21 (Roboto Cond 700 16px `0.18em` uppercase `#FFD200`)
  > October 10, 2025 &nbsp;|&nbsp; Samuel Riggs IV Alumni Center &nbsp;|&nbsp; University of Maryland

  Separators are `&#160;|&#160;` (non-breaking spaces either side of the pipe).

### Then
**Pattern strip — dark variant, full-bleed.**

---

## A-3 · Lightroom gallery

Container `padding: 80px 32px`.

```html
<div style="position:relative; width:100%; aspect-ratio:3/2; background:#FFFFFF">
  <iframe src="https://lightroom.adobe.com/embed/shares/18c726854dbe4905b13ccfa13678c7e9/slideshow?background_color=%23FFFFFF&color=%23999999"
          title="2025 UMD Startup Showcase photo gallery"
          style="position:absolute; inset:0; width:100%; height:100%; border:0; display:block"
          allowfullscreen></iframe>
</div>
```

**No frame, no padding, no border.** WHY: it used to sit inside a black `padding:16px` frame,
in a 16:9 box, with the embed's own `#2D2D2D` background letterboxing the 3:2 photos — three
separate dark edges. `aspect-ratio: 3/2` matches the source photos so they fill the box, and a
white embed background makes any residual band disappear into the page.

Known limitation: portrait shots in the gallery will letterbox against white. A fixed-ratio
embed cannot auto-fit per image.

### Buttons — `margin-top:24px; display:flex; flex-wrap:wrap; gap:16px`

- **B5** `View more photos ››` → `https://adobe.ly/43f9xJY`
- **B6** `Read the recap ››` → `https://mtech.umd.edu/news/university-of-maryland-hosts-campus-wide-startup-showcase`

Both `target="_blank" rel="noopener"`.

---

## A-4 · Photo grid

`margin-top:48px; display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:2px`
Each cell `position:relative; aspect-ratio:3/2; background:#E6E6E6`, photo `object-fit:cover`.

| # | File | Alt |
|---|---|---|
| 1 | `audience-quick-pitch-session.jpg` | Attendees watching the quick pitch session |
| 2 | `founder-pitching-room.jpg` | A founder pitching to the room |
| 3 | `networking-attendees.jpg` | Attendees networking during the showcase |
| 4 | `hight-tech-produce.jpg` | A HighT-Tech founder showing produce grown with their technology |
| 5 | `exhibit-hall-table-attendees.jpg` | Attendees at an exhibitor table in the exhibit hall |
| 6 | `attendees-closing-band.jpg` | Attendees at the 2025 UMD Startup Showcase |

---

## A-5 · Agenda

Container `padding: 0 32px 40px`.

- **Eyebrow** T17, `#E21833`, `margin-bottom:22px` — `2025 Agenda`
- **Heading** T5, `margin-bottom:36px` — `The 2025 program`
- **Rule** `height:4px; background:#000000; margin-bottom:8px` (full container width)

### Each agenda row

```
display:grid; grid-template-columns:190px 22px minmax(0,1fr); gap:24px;
align-items:start; padding:30px 0; border-bottom:1px solid #E6E6E6
```

- **Col 1** — Kind in Roboto Cond 700 16px `0.2em` uppercase `#E21833` (`margin-bottom:6px`),
  then Time in T20 (Roboto Cond 700 18px `0.06em` uppercase `#000000`)
- **Col 2** — 16px red chevron, `margin-top:20px`
- **Col 3** — Title in T13 (`margin-bottom:10px`), then each person on its own line in T14
  (`margin-bottom:4px`)

### The 5 rows — full content

| Kind | Time | Title | People |
|---|---|---|---|
| Registration | 9:30 a.m. | Registration and coffee | — |
| Talk | 9:45–10 a.m. | Welcome and introduction | Dean Chang, Chief Innovation Officer and Associate Vice President for Innovation & Entrepreneurship and Economic Development, University of Maryland<br>Rob Cohen, Program Manager, Mtech Ventures |
| Panel | 10–11 a.m. | Navigating the Funding Landscape: Working With (and Without) Venture Capital | Kaija Gisolfi-McCready, Investment Associate, Lockheed Martin Ventures<br>Mehdi Kalantari Khandani, President and CTO, Resensys<br>Rajesh Rai, Investor, Innovation Invention Partners and Chair, TiE DC |
| Pitches | 11:10 a.m.–Noon | Startup quick pitches (two minutes each) | Moderated by Josh Doying, Startup Success Manager, UM Ventures |
| Networking / Exhibit hall | Noon–2 p.m. | Lunch, networking and exhibit hall | — |

All dashes in the Time column are **en dashes** (`–`). Also in `content/agenda-2025.csv`.

---

## A-6 · Exhibitors

Ground `#E6E6E6`, full-bleed, `margin-top:56px`.
Inner `max-width:1240px; margin:0 auto; padding:80px 32px`.

- **Eyebrow** T17, `#000000`, `margin-bottom:22px` — `Exhibitors`
- **Heading** T5, `margin-bottom:36px` — `2025 startups showcased`
- **Exhibitor logo tile grid** (SPEC-02 §8), 35 tiles, ring `#D8D8D8`, **no array shadow**

Full list with logo files, URLs and per-logo scale factors: `content/exhibitors-2025.csv`.

---

## A-7 · Sponsors + Hosted by

Ground white. Container `padding: 80px 32px`.

- **Eyebrow** T17, `#E21833`, `margin-bottom:26px` — `2025 Sponsors`
- **Sponsor logo tile grid**, 10 tiles, **with array shadow**, `margin-bottom:64px`
- **Eyebrow** T17, `#454545`, `margin-bottom:26px` — `Hosted by`
- **Host logo tile grid**, 4 tiles, **with array shadow** (same 4 rows as H-7)

Sponsors, in display order:

| Order | Name | Website |
|---|---|---|
| 1 | Mtech | `https://www.mtech.umd.edu/` |
| 2 | PTP | `https://ptp.cloud/` |
| 3 | TEDCO | `https://www.tedcomd.com/` |
| 4 | Terrapin Development Company | `https://www.terrapindevelopment.com/` |
| 5 | Wilson Sonsini | `https://www.wsgr.com/en/` |
| 6 | Resensys | `https://resensys.com/` |
| 7 | Cahill | `https://www.cahill.com/` |
| 8 | CSW IP Law | `https://www.rcsc-ip.com/` |
| 9 | Lex Generalis | `https://www.lexgeneralis.com/` |
| 10 | Snyder Cohn | `https://www.snydercohn.com` |

Logo files and scale factors: `content/sponsors-2025.csv`.

---

## A-8 · Next-up band

Ground `#E21833`, full-bleed.
Inner `max-width:1240px; margin:0 auto; padding:72px 32px; display:flex; flex-wrap:wrap;
align-items:center; justify-content:space-between; gap:32px`

- **Left** — eyebrow T17 `#FFFFFF` `margin-bottom:10px` → `Next up`; then T8
  > The 2026 showcase — November 13

  (em dash)
- **Right** — **Button B7** `Go to 2026 ››` → `/`

---

# UPDATES — `/updates`

## U-1 · Hero

Ground `#000000`, full-bleed. Inner `max-width:1240px; margin:0 auto; padding:84px 32px 92px`.

- **Eyebrow** T22 (Roboto Cond 700 16px `0.18em` uppercase `#FFD200`), `margin-bottom:30px`
  > UMD Startup Showcase · November 13, 2026

  Separator is `&#183;` (middle dot).
- **Knockout headline (h1)** — clamp `36px / 4.8vw / 72px`, `margin-bottom:34px`
  Line 1: `Register for` · Line 2: `Updates` + inline red chevron
- **Lead** `display:flex; align-items:flex-start; gap:14px; max-width:620px` —
  19px red chevron (`flex:none; margin-top:6px`) then T11 (18px, `#FFFFFF`):
  > The showcase is held November 13, 2026 at the Samuel Riggs IV Alumni Center, University of Maryland, and is by invitation only. Leave your details and we'll send program news and invitation information as it's confirmed.

### Then
**Pattern strip — dark variant, full-bleed.**

---

## U-2 · HubSpot form

Container `max-width: 720px; margin: 0 auto; padding: 72px 32px 96px`.
Inside it, a single div: `<div id="hubspot-form" style="min-height:320px"></div>`

**This is a legitimate code embed — do not rebuild the form natively.** HubSpot owns the
fields and the submissions.

### Webflow Embed element contents

```html
<div id="hubspot-form"></div>
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    portalId: "47117306",
    formId: "525fc6b9-a85f-4086-9bf5-69e03ee38d77",
    region: "na1",
    target: "#hubspot-form"
  });
</script>
```

### Styling

Paste `content/hubspot-form.css` **verbatim into the page's `<head>` custom code** — not into
the Embed element, because it must load before the form paints. It restyles HubSpot's default
markup to match the site: square corners, `2px solid #454545` input borders, red focus border,
Roboto Condensed uppercase labels at 16px, a red submit button that goes black on hover, and
error text at 16px in red **without** the uppercase/tracking treatment.

The wrapper div's id must be exactly `hubspot-form` — every selector in that CSS is scoped to it.

---

# Every external URL in the build

| Where | URL |
|---|---|
| Header + footer logo image | `https://cdn.prod.website-files.com/6899f1a81d12706ef336b639/689a25ba35aa26cd8b9e1d19_UMD_Primary_Color_W.png` |
| B2 — Sponsorship prospectus (⚠️ 2025 file) | `https://cdn.prod.website-files.com/6899f1a81d12706ef336b639/68a49db130a9b99be192deba_Startup%20Showcase%202025%20Sponsorship%20Website.pdf` |
| A-3 — Lightroom gallery embed | `https://lightroom.adobe.com/embed/shares/18c726854dbe4905b13ccfa13678c7e9/slideshow?background_color=%23FFFFFF&color=%23999999` |
| B5 — View more photos | `https://adobe.ly/43f9xJY` |
| B6 — Read the recap | `https://mtech.umd.edu/news/university-of-maryland-hosts-campus-wide-startup-showcase` |
| U-2 — HubSpot embed script | `//js.hsforms.net/forms/embed/v2.js` (portal `47117306`, form `525fc6b9-a85f-4086-9bf5-69e03ee38d77`, region `na1`) |
| Google Fonts — Roboto Condensed | enable via Webflow's font panel |

All 49 organisation websites are in the three CSVs in `content/`. Every external link opens in
a new tab: `target="_blank" rel="noopener"`.

Internal routes: `/` · `/2025` · `/updates`.

---

# Interaction inventory — the complete list

Build these last. Every hover in the entire site:

| Element | On hover |
|---|---|
| Header nav link | Colour `#FFFFFF` → `#FFD200`; label span scales **1.05** (M1). Active underline does **not** scale — it sits outside the label span. |
| Footer nav link | Colour `#FFFFFF` → `#FFD200`; label span scales **1.05** (M1) |
| 2025 banner link | Colour `#000000` → `#E21833` (M3); label span scales **1.03** (M1) |
| Button B1 | Ground `#FFD200` → `#FFFFFF` (M2); label scales **1.03** (M1) |
| Button B2 | Ground `#FFD200` → `#000000`, text → `#FFFFFF` (M2); label scales **1.05** |
| Button B3 | Ground `#E21833` → `#000000` (M2); label scales **1.03** |
| Button B4 | Ground `#E21833` → `#000000` (M2); label scales **1.03** |
| Button B5 | Ground `#E21833` → `#000000` (M2); label scales **1.03** |
| Button B6 | Ground `#FFFFFF` → `#000000`, text → `#FFFFFF` (M2); label scales **1.03** |
| Button B7 | Ground `#000000` → `#FFFFFF`, text → `#000000` (M2); label scales **1.05** |
| Logo tile (all 3 variants) | Inner span scales **1.069** (M1). **Tile ground and hairline do not change.** |
| Any element, keyboard focus | `outline: 2px solid #E21833; outline-offset: 2px` |

Nothing else has a hover state. Photos, the pattern strips, the stat numerals, the agenda rows
and the gallery are all static.
