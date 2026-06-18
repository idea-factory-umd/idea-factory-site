# Idea Factory — Webflow Handoff Notes

These notes capture decisions made during design so the Webflow build (via Claude
Code) is set up correctly. This is a living reference; the full consolidated
`idea-factory.css` + `idea-factory.js` files will be generated at handoff time.

---

## 1. How the custom motion is delivered (hosting)

The bespoke animations are **plain vanilla CSS + JS** — no framework, no build
step, no third-party animation library. They are delivered as **two hosted files**:

- `idea-factory.css` — keyframes, custom easing, clip-path bevels, gold-hatch
  background, and the animation hook classes.
- `idea-factory.js` — one commented script holding every timed/scroll effect, each
  as its own function that selects elements by class.

**Hosting:** put both files in a **public GitHub repo**, serve via the **jsDelivr
CDN**, and reference them from Webflow with two lines (site-wide custom code, or a
page's head/footer slots):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/<user>/<repo>@<ver>/idea-factory.css">
<script defer src="https://cdn.jsdelivr.net/gh/<user>/<repo>@<ver>/idea-factory.js"></script>
```

- Webflow does **not** host `.js`/`.css` files itself (no asset upload for those
  types) — external hosting is the standard pattern.
- Both files are ordinary text, **fully revisable in Claude Code** later: edit →
  push → bump the `@<ver>` (or purge jsDelivr cache) → live.
- The page elements are built **natively in the Webflow Designer** and given the
  class names below; the JS only hooks onto those classes.

---

## 2. THE CLASS CONTRACT — animations bind to CONTAINERS, not specific images

**Critical for maintainability:** every effect targets a **container + a stable
child class**, never a specific image asset or one-off ID. This means **you can
swap any photo through Webflow's normal "Replace image" and the animation carries
over automatically** — because Webflow keeps the same `<img>` element (and its
classes) and only changes the `src`.

An animation would only be lost if someone *deleted* the element and inserted a
new one with different classes — not from a normal image replace.

### Swappable-image zoom (the "One place. Every stage." photo)
- Section/container class: **`if-stage-moment`**
- Image class (inside it): **`if-stage-photo`**

The zoom script does roughly:
```js
document.querySelectorAll('.if-stage-moment').forEach(section => {
  const img = section.querySelector('.if-stage-photo'); // by class — image-agnostic
  // …scroll-driven, damped zoom loop on `img`…
});
```
So: give the section `if-stage-moment` and the image `if-stage-photo`, and **any
future photo dropped in that slot inherits the zoom with zero code changes.**
These two class names are the contract — keep them on the element through any
image swap.

### News photo hover-zoom (featured card + 3 small rows)
Subtle CSS-only zoom on the photo when its card is hovered. In this prototype the
photos are `image-slot` web components, so the CSS targets the shadow image via
`::part(image)` (clipped by the slot's `overflow:hidden` frame). **In Webflow you'll
use normal Image elements instead**, so the equivalent native pattern is:
```css
/* wrapper of the image has overflow:hidden */
.if-news-card:hover img,
.if-news-row:hover  img { transform: scale(1.08); }
.if-news-card img, .if-news-row img { transition: transform .36s; }
```
Give each news card/row a stable class and put `overflow:hidden` on the image
wrapper — then any swapped-in photo inherits the hover-zoom, image-agnostic.

Behavior of this effect: on scroll **down** into view the photo eases from 1.0→1.16
(easeOutCubic + per-frame damping for smoothness), finishing in sync with the
headline parallax; it **holds** at full size and does not reverse while in view;
it **re-arms** only after being scrolled fully back up out of view, then replays
on the next scroll down.

---

## 3. Effects that live in the hosted JS/CSS (not native Webflow interactions)

These are custom-timed/measured sequences that Webflow's native IX2 can't express;
they run from the hosted files, keyed by class:

| Effect | Hook class(es) |
|---|---|
| Hero word-by-word "reading" highlight | `if-hero-word` (+ `if-hero-h1`) |
| Manifesto sentence-by-sentence lift + dim-on-pull | `if-manifesto`, `if-manifesto-line` |
| Proof stat count-up (fade in while counting) | stat number wrapper class |
| Headline parallax ("One place. Every stage.") | `if-stage-moment` + text wrapper |
| Stage photo zoom (see §2) | `if-stage-moment` + `if-stage-photo` |
| Hero headline font-load gate (no FOUT flash) | `if-hero-h1` |
| Navbar retract at footer | navbar + `if-foot-cols` |

**Native Webflow (IX2 / hover / CSS)** — fine to rebuild in the Designer: button &
nav hover grow/color, logo lift, card shadow-on-hover, dropdown gold-hatch hover,
sticky header, layout/grids, gold lines, Mondrian strips.

---

## 4. Notes
- Reduced-motion: every JS effect checks `prefers-reduced-motion` and shows the
  final/static state instead of animating. Preserve this.
- jsDelivr caches hard — for instant updates reference a commit/branch URL or purge
  the cache; for releases bump the `@<ver>` tag.
