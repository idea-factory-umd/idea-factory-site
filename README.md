# Idea Factory — shared front-end code

This repository is the **single home and source of truth** for the shared front-end
code used by the University of Maryland **Idea Factory** website and its spin-off sites
(all built in Webflow).

There are exactly **two files that get served to the live sites**, and they live at the
repository root:

| File | What it is |
|---|---|
| **`idea-factory.css`** | All shared styling: nav markers, hovers, animations, the search modal, footer, hero, etc. |
| **`idea-factory.js`** | All shared behavior, as small independent modules (hero reader, dropdowns, count-up, back-to-top, search, …). |

Every Webflow site loads these two files. Content and page layout live in Webflow;
**shared look + behavior live here.** Edit here once → every site updates.

---

## How the files reach the live sites (hosting)

The two files are served over **GitHub Pages** — GitHub's own free static hosting,
straight from this repository. Each Webflow site references them with two lines in
*Project Settings → Custom Code* (a `<link>` in Head, a `<script>` in Footer):

```html
<!-- Head -->
<link rel="stylesheet" href="https://idea-factory-umd.github.io/idea-factory-site/idea-factory.css">
<!-- Footer -->
<script src="https://idea-factory-umd.github.io/idea-factory-site/idea-factory.js"></script>
```

- **Set once per site.** Those two lines copy automatically when you *Duplicate Site* in
  Webflow, so every spin-off is wired with zero extra work.
- **Updates are automatic.** Push a change to the `main` branch → GitHub Pages rebuilds
  and serves it in ~1–2 minutes. **No manual "refresh" step, no rate limits.**
- **Browser hold time is short (~10 min),** so returning visitors pick up changes quickly.

> **Why GitHub Pages and not a third-party CDN:** an earlier setup served these files
> through jsDelivr pinned to the `@main` branch. That relied on a *manual, rate-limited*
> cache purge and proved unreliable (it kept serving stale copies). GitHub Pages refreshes
> itself on every push with no such step, so that failure mode is gone. Full history is in
> `RUNBOOK.md` and `CLAUDE.md`.

---

## The two-layer model (why this works across many sites)

- **Look** = Webflow Designer classes (all prefixed `if-`). These travel automatically when
  you copy/paste an element or duplicate a site (Webflow matches classes by name).
- **Behavior** = this shared file (animations, rollovers, JS, non-native CSS). One source,
  linked by every site, so pasted elements just work.

Build a feature once here + in the Webflow Designer → paste the element into a spin-off →
it looks and behaves correctly with no extra code.

---

## Repository map

| Path | Purpose |
|---|---|
| `idea-factory.css`, `idea-factory.js` | **The served files.** Keep them at the root. Add new work as new labeled sections/modules *inside* them — don't multiply files (each new file would be another line to wire into every site). |
| `CLAUDE.md` | **Working memory / operating protocol.** The durable record of every decision, ID, convention, and shipped feature. Read it first. |
| `RUNBOOK.md` | Practical procedures: shipping a change, rolling back, adding a new spin-off. |
| `.nojekyll` | Tells GitHub Pages to serve every file as-is (no build processing). Leave it. |
| `project/` | The **original design handoff** from Claude Design (HTML/CSS/JS prototypes, brand tokens, fonts, component reference). Kept for reference — see `project/readme.md`. |
| `chats/` | The original design-conversation transcripts (design intent). |

---

## Ground rules (keep it stable, tidy, free)

1. **Code and text only in this repo. Media/assets stay in Webflow.** Large binary assets
   (images, video, fonts) are the one thing that can eventually cost money on GitHub — keep
   them out of here. Pure code/docs are tiny and free with room to spare.
2. **Never commit secrets** (API tokens, passwords, keys). This repo is public so GitHub
   Pages can serve it for free — treat everything in it as world-readable.
3. **Grow the two served files; don't add new served files** unless we deliberately decide to.
4. **Keep the docs current.** Every structural decision goes into `CLAUDE.md` (and this
   README / `RUNBOOK.md` when relevant), so any future session can pick up with full context.

---

## Original design handoff (reference)

The `project/` folder and `chats/` transcripts are the original handoff bundle from
Claude Design — the canonical look/behavior the Webflow build was created to match. The
primary design file is `project/ui_kits/website/index.html`. This material is reference
only; the live product is the two shared files above plus the Webflow sites.
