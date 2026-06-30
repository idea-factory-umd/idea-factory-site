# Idea Factory — Shared‑Code Runbook (promote / rollback / spin‑off)

> Practical procedures for maintaining the multi‑site suite. Companion to `CLAUDE.md`
> (which holds the full architecture + decision history). Jargon is bracket‑defined inline.

---

## The shared file in one paragraph

Every Idea Factory Webflow site loads **one shared code file** — `idea-factory.css` +
`idea-factory.js` — from this repo [a project folder on GitHub], served by **jsDelivr**
[a free CDN that serves files straight out of a GitHub repo]. Each site references it with
**two lines** in *Project Settings → Custom Code* (a `<link>` in Head, a `<script>` in
Footer), pinned to an **immutable commit SHA** [a fixed snapshot id that never changes].
Because those two lines are site‑wide custom code, they **copy automatically when you
Duplicate Site**, so every spin‑off is wired with zero per‑site code work.

**Two layers (internalize this):**
- **Look** = Webflow Designer classes (`if-…`). Travel automatically with copy‑paste; edited per‑site in the UI.
- **Behavior** = this shared file (animations, hovers, JS, non‑native CSS). One source; edited only here.

---

## Version cheat‑sheet (commit SHA → meaning)

Live sites pin by **commit SHA** (tags can't be pushed through this repo's git proxy, but a SHA is equally immutable).

| SHA | Label | Notes |
|---|---|---|
| `c1baf6f` | **v1.2.1 — CURRENT / LIVE** | v1.2.0 + CSE search‑modal scroll fix (re‑inject CSE CSS into `<body>`). |
| `c7dc070` | v1.2.0 | Restored logo/stage/audience hovers + proof count‑up (folded the old `webflow-assets@v1.0.0` base layer back in). |
| `c0fd5ed` | v1.1.0 — **do not use** | First consolidation; INCOMPLETE (dropped the base layer → broke hovers/count‑up). |

**Current live reference lines** (in every site's Project Settings → Custom Code):
```html
<!-- Head -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@c1baf6f/idea-factory.css">
<!-- Footer -->
<script src="https://cdn.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@c1baf6f/idea-factory.js"></script>
```

---

## PROMOTE — ship a change to the shared file

1. **Edit** `idea-factory.css` / `idea-factory.js` in this repo. Add new features as **new
   `try/catch` modules**; don't edit working ones. Use unique `if-…` class names.
2. **Test** with the offline headless harness in the scratchpad (load the real published HTML
   with the new file via `file://`, confirm every feature fires + 0 JS console errors).
   ⚠️ The Google **CSE search modal** can't be triggered offline — verify it on the live site.
3. **Commit + push** to `main`. Note the new short SHA: `git rev-parse --short HEAD`.
4. **Confirm jsDelivr serves it:** `curl -I https://cdn.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@<SHA>/idea-factory.js` → 200.
5. **Canary:** bump the pin on **ONE** site first (Project Settings → Custom Code: change the
   SHA in both lines → Save → Publish). Verify live (incl. search). Then roll out to the rest.
6. Update the cheat‑sheet above + `CLAUDE.md`.

> Note: editing site‑wide Custom Code is a Webflow **UI** step — the MCP cannot do it. The
> repo/commit/CDN side is all that's automatable here.

---

## ROLLBACK — undo a bad release

Instant: re‑pin the affected site(s) to the **previous good SHA** (Project Settings → Custom
Code → change the SHA in both lines → Publish). Old versions are immutable and still CDN‑cached,
so this is a guaranteed‑good restore. (Git also has the full history: `git revert <sha>` etc.)

**Blast‑radius reminder:** layout/structure/base styling live **in‑site** (Designer classes +
the in‑site `st0` embed labeled "DO NOT DELETE"). So even total shared‑file failure = "animations
stop," not "site breaks."

---

## NEW SPIN‑OFF — per‑duplicate checklist

1. Webflow **Duplicate Site**.
2. **Add the new site's domain(s) to the Adobe Fonts (Typekit) kit allow‑list** — the ONE thing
   duplication can't do; without it the Interstate font silently fails on the new domain.
   (Kit: `https://use.typekit.net/fdu6zpb.css`.)
3. Confirm the two shared‑file reference lines are present (they duplicate automatically) and
   pinned to the current SHA.
4. Edit nav + content. Set any **site‑specific values** (search/CSE id, absolute links, `#anchors`).
5. **Publish.** Spot‑check: an animated feature, a hover, and the search modal.
6. (Optional) delete the `/library` staging page from the spin‑off if you don't want it there.

---

## Reusing a built element in a spin‑off

1. Build/stage the element here (the `/library` page is the staging area).
2. Make sure its **behavior code is in the shared file** (so it's already live in every site).
3. In Webflow, **copy** the element from this master, **paste** into the spin‑off, **publish**.
   Look travels with the paste (class name‑match); behavior is already linked.

---

## Gotchas (learned the hard way)

- **The original page loaded TWO code sources** (inline embeds **+** the old external
  `webflow-assets@v1.0.0`). A faithful shared file must be the **union** of both. If a feature
  ever seems to vanish "for no reason," check whether it lived in a second source.
- **CSE CSS must load after Google's runtime CSS** → it's re‑injected into `<body>` by the
  `cse-late-css` JS module. Don't move it back to a plain head `<style>`.
- **`</script>` inside the JS** breaks *inline* `<script>` embedding (fine when loaded as a file).
  Keep the shared JS loaded via `<script src>`, never inlined.
- **`set_settings` on big/non‑ASCII embeds** can throw `InputValidationError` — small ASCII
  embeds set fine; big ones need the file + unicode‑escape workaround (see `CLAUDE.md` §3).
- **Do NOT run Webflow's "Remove unused styles" (Style Manager → Clean up) blindly.** It deletes
  any class not on a *static* element, which would purge **runtime‑applied state classes** whose
  styling is Designer‑defined — notably **`is-visible`** (the back‑to‑top reveal). That would break
  the feature. Same‑name duplicate classes are harmless (Webflow merges them to one rule at publish);
  leave them, or remove copies one‑by‑one in the Designer checking the per‑class element‑count badge.
  Full analysis: `CLAUDE.md` §11.
