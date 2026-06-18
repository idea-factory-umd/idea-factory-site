# Idea Factory → Webflow: Step-by-Step Hand-off Checklist

This is the companion to `WEBFLOW-HANDOFF-NOTES.md`. It covers what YOU need to
have ready and the order of operations. The consolidated motion files live in
`webflow-export/idea-factory.css` and `webflow-export/idea-factory.js`.

---

## A. What you need BEFORE Claude Code can write to Webflow

1. **A Webflow account + a Site to receive the design.**
   - Create a new (blank) Webflow site, or pick an existing one.
   - **Custom code requires a paid Site plan** (site-wide head/footer code and
     published custom JS only run on a paid plan / published site, not the free
     `.webflow.io` preview in all cases). A page-level Embed works on lower tiers
     but site-wide code needs the plan.

2. **A way for Claude Code to push to Webflow.** There are two common paths —
   Claude Code will tell you which it supports and walk you through auth:
   - **Webflow API / MCP connector** — you generate an **API token** in Webflow
     (Site Settings → Apps & integrations → API access) and authorize it. This
     lets tooling create/update pages, CMS items, etc. Claude Code will prompt
     for this token and the steps to scope it.
   - **Manual Designer build** — Claude Code generates the structure/classes and
     you assemble it in the Designer by hand (most reliable for pixel fidelity).
   Either way: **yes, you grant write access via a Webflow API token** — Claude
   Code will give you the exact clicks. You don't need it until you start.

3. **A GitHub account + one public repo** (for hosting the two motion files).
   - You said you don't have GitHub yet — create a free account at github.com.
   - Make ONE public repo (e.g. `idea-factory-webflow`).
   - Upload `idea-factory.css` and `idea-factory.js` (Claude Code can do this for
     you once GitHub is connected, or you drag-drop them in the GitHub web UI).
   - They're then served free via jsDelivr at:
     `https://cdn.jsdelivr.net/gh/<user>/idea-factory-webflow@main/idea-factory.css`
   - **Alternative if you'd rather skip GitHub for now:** paste the two files
     directly into Webflow's custom-code boxes (head = CSS, footer = JS). Works
     within the 50k-char limit; just less tidy to revise later.

---

## B. Order of operations (what to do with Claude Code)

1. Point Claude Code at this project: *"Read WEBFLOW-HANDOFF-NOTES.md,
   WEBFLOW-HANDOFF-CHECKLIST.md, ui_kits/website/, and webflow-export/."*
2. **Host the motion files** — connect GitHub, push `webflow-export/*`, get the
   two jsDelivr URLs.
3. **Build structure in Webflow** — section by section, assigning the class names
   below. (Manual Designer work, or via the API path Claude Code uses.)
4. **Wire the code** — add the two `<link>`/`<script>` lines (Section C) to
   Webflow custom code.
5. **Assign animation classes** (Section D) to the matching elements.
6. **Publish & test** — custom JS only runs on the published site / Preview.

---

## C. The two lines to paste into Webflow custom code

Head (Site Settings → Custom Code → Head, or Page → Custom Code → head):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/<user>/<repo>@main/idea-factory.css">
```
Footer (… → Footer, before `</body>`):
```html
<script defer src="https://cdn.jsdelivr.net/gh/<user>/<repo>@main/idea-factory.js"></script>
```

---

## D. Class contract — assign these in the Designer

| Element in Webflow | Class to add |
|---|---|
| Hero headline `<h1>` | `if-hero-h1` (+ `font-pending` to gate the font) |
| Each word span in the hero headline | `if-hero-word` |
| Manifesto heading | `if-manifesto` |
| Each manifesto sentence span | `if-manifesto-line` |
| Each "The proof" stat number | `if-countup` (final value as its text, e.g. `$94.8B`) |
| "One place. Every stage." section | `if-stage-moment` |
| …its background photo | `if-stage-photo` |
| …its headline wrapper | `if-stage-text` |
| News card (featured + each row) | `if-news-card` |
| …the image wrapper inside each (overflow hidden) | `if-news-photo` |
| Featured event card | `if-event-feat` |
| …its big day+month group | `if-event-date` |
| Each agenda event row | `if-event-row` |
| …its date number+month text wrapper | `if-event-datetext` |
| Navbar | `if-navbar` |
| Footer nav-link columns wrapper | `if-foot-cols` |

Native hover effects (button/nav grow, logo lift, card shadow, dropdown hatch,
sticky header, gold lines, Mondrian blocks) are rebuilt directly in the Designer
— see WEBFLOW-HANDOFF-NOTES.md §3.

---

## E. Honest expectations
- There is **no one-click HTML→Webflow import**. This is a guided rebuild: the
  layout is reconstructed natively in the Designer; only the custom motion is
  hosted code. The class names above are the glue.
- Custom JS does not preview inside the Webflow Designer — test on the published
  site or Webflow Preview.
- jsDelivr caches hard: bump `@main` to `@v2` (a git tag) or purge the cache to
  see edits to the motion files immediately.
