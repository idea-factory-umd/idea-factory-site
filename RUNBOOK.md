# Idea Factory — Runbook (ship / roll back / new spin-off)

> Practical procedures for the shared-code suite. Companion to `README.md` (the overview)
> and `CLAUDE.md` (the full decision history + working memory). Jargon is bracket-defined inline.

---

## The setup in one paragraph

Every Idea Factory Webflow site loads **two shared files** — `idea-factory.css` +
`idea-factory.js` — from this repository [a project folder on GitHub], served by
**GitHub Pages** [GitHub's own free static hosting]. Each site references them with **two
lines** in *Project Settings → Custom Code* (a `<link>` in Head, a `<script>` in Footer):

```html
<!-- Head -->
<link rel="stylesheet" href="https://idea-factory-umd.github.io/idea-factory-site/idea-factory.css">
<!-- Footer -->
<script src="https://idea-factory-umd.github.io/idea-factory-site/idea-factory.js"></script>
```

Those lines are site-wide custom code, so they **copy automatically when you Duplicate Site** —
every spin-off is wired with zero per-site code work.

**Two layers:** *Look* = Webflow Designer classes (`if-…`), which travel with copy/paste;
*Behavior* = these shared files, edited only here.

---

## One-time hosting setup (already-described state)

GitHub Pages must be enabled once for the repo:

1. Repo **Settings → Pages**.
2. **Build and deployment → Source: Deploy from a branch.**
3. **Branch: `main`**, folder **`/ (root)`** → **Save.**
4. Wait ~1–2 min for the first build; confirm `https://idea-factory-umd.github.io/idea-factory-site/idea-factory.css` loads.
5. In each existing site, repoint the two Custom-Code lines to the github.io URLs above and Publish. (New spin-offs inherit them automatically.)

`.nojekyll` at the repo root makes Pages serve every file as-is (no build processing). Leave it.

> **Why GitHub Pages** (not jsDelivr `@main`, the previous setup): jsDelivr `@main` needed a
> **manual, rate-limited purge** and separately cached the branch→commit mapping, so it served
> **stale/older copies** — a shipped fix wouldn't reliably appear. Pages refreshes itself on
> every push, no purge, no rate limit. History in `CLAUDE.md` §0.

---

## SHIP — push a change live

1. **Edit** `idea-factory.css` / `idea-factory.js` on a working branch. Add new features as
   **new labeled sections / `try/catch` modules**; don't rewrite working ones. Use unique
   `if-…` class names.
2. **Test** with the offline headless harness in the scratchpad (load the real published HTML
   with the local files via `file://`; confirm every feature fires + 0 JS console errors).
   ⚠️ The Google **CSE search modal** can't be triggered offline — verify it on the live site.
3. **Merge/push to `main`.** GitHub Pages **auto-rebuilds and serves the new files in ~1–2 min**
   — no purge, no rate limit, nothing to click.
4. **Confirm live:** `curl -I https://idea-factory-umd.github.io/idea-factory-site/idea-factory.css`
   → 200, and spot-check the staging site (hard-refresh to see it instantly during dev).
5. When confirmed good, **advance the restore point:** `git push -f origin main:stable`.
6. Update `CLAUDE.md` (and `README.md`/this file if the process changed).

> Editing site-wide Custom Code is a Webflow **UI** step the MCP cannot do — but with the
> github.io ref already set, you don't touch it per change. The repo/commit side is all automatable here.

---

## ROLL BACK — undo a bad change

- **Preferred (no site edits):** `git revert <bad commit>` on `main` (or reset `main` to the
  last good commit) and push → Pages redeploys the good version in ~1–2 min. The **`stable`**
  branch marks the last-known-good commit.
- **Instant emergency (bypass Pages entirely):** repoint a site's two refs to an **immutable
  jsDelivr commit URL** of a known-good version —
  `https://cdn.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@<good-sha>/idea-factory.{css,js}`.
  Immutable URLs are cached forever and never go stale. (Then switch back to the github.io ref
  once `main` is healthy.)

**Blast-radius reminder:** layout/structure/base styling live **in-site** (Designer classes +
the in-site `st0` embed labeled "DO NOT DELETE"). So even total shared-file failure = "animations
stop," not "site breaks."

---

## NEW SPIN-OFF — per-duplicate checklist

1. Webflow **Duplicate Site**.
2. **Add the new domain(s) to the Adobe Fonts (Typekit) allow-list** — the ONE thing
   duplication can't do; without it the Interstate font silently fails. Kit: `https://use.typekit.net/fdu6zpb.css`.
3. Confirm the two github.io reference lines are present (they duplicate automatically).
4. Edit nav + content; set any **site-specific values** (search/CSE id, absolute links, `#anchors`).
5. **Publish.** Spot-check an animation, a hover, and the search modal.
6. (Optional) delete the `/library` staging page from the spin-off if you don't want it there.

---

## Reusing a built element in a spin-off

1. Build/stage the element here (the `/library` page is the staging area).
2. Make sure its **behavior code is in the shared file** (so it's already live in every site).
3. In Webflow, **copy** the element from the master, **paste** into the spin-off, **publish**.
   Look travels with the paste (class name-match); behavior is already linked.

---

## Gotchas (learned the hard way)

- **Don't rely on jsDelivr `@main` (mutable branch).** It caches stale copies and its purge is
  rate-limited — this is exactly what pushed us to GitHub Pages. If you ever must use jsDelivr,
  use an **immutable `@<SHA>`** URL, never `@main`.
- **The original page loaded TWO code sources** (inline embeds **+** an old external file). A
  faithful shared file is the **union** of both. If a feature ever vanishes "for no reason,"
  check whether it lived in a second source.
- **CSE CSS must load after Google's runtime CSS** → it's re-injected into `<body>` by the
  `cse-late-css` JS module. Don't move it back to a plain head `<style>`.
- **`</script>` inside the JS** breaks *inline* `<script>` embedding (fine when loaded as a file).
  Keep the shared JS loaded via `<script src>`, never inlined.
- **Don't run Webflow's "Remove unused styles" blindly.** It deletes runtime-applied state
  classes whose styling is Designer-defined — notably **`is-visible`** (the back-to-top reveal).
  Full analysis: `CLAUDE.md` §11.
- **Keep media out of this repo** (assets live in Webflow). Big binaries are the only thing that
  can eventually cost money on GitHub; code/text is free with room to spare.
