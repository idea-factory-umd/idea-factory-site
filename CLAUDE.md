# Idea Factory — Claude Code Working Memory (READ THIS FIRST, IN FULL)

> **What this file is:** the durable, running record of every structural decision, convention,
> ID, and piece of work for the UMD **Idea Factory** Webflow build. It exists so that a brand‑new
> session can resume with **zero loss of context**. The scratchpad (`/tmp/...`) is ephemeral and is
> NOT a safe place for memory — this file (committed to git) is.
>
> **MAINTENANCE RULE (do this):** whenever a structural decision is made, a convention is set, or a
> feature ships, **update this file and commit it.** Treat it as the single source of truth for
> "how this project works and why." The user has explicitly said they cannot afford to re‑establish
> any of this from scratch.

---

## 0. STATUS — where things stand right now

- **Flagship site** (the homepage) is built and being refined directly in **Webflow via the Webflow MCP** (`data_*` tools), then published to the **staging subdomain**. This is the "master / worksheet" site.
- **Multi‑site architecture is IMPLEMENTED (core consolidation LIVE + verified).** See §4–§7 for the design; see the IMPLEMENTATION STATUS block below for what shipped. Remaining = refinements only (class cleanup, Library page, runbook).
- **Chosen model: "B" — one shared, centrally‑linked behavior file** maintained here, referenced by every site. (The user only edits code here; spin‑offs only get content edits via the Webflow UI and are **never** connected to MCP.)
- Recent shipped work (all live on staging): responsive hero headline, min‑gap above the hero button, flagship marker reshape + bigger arrows, content‑grow hover on buttons. See §8.

**AUDIT (done) — true current state of the code:**
- Site loads (from `webflow-assets@v1.0.0`, jsDelivr): `idea-factory.css` (10 KB, **stale**) in `<head>`; `idea-factory.js` (12.7 KB, **stale**) before `</body>`. Plus Typekit `fdu6zpb.css` in `<head>`.
- Current behavior is **inline body embeds**, ~19 KB CSS + ~20 KB JS, in four `<style>` + four `<script>` blocks:
  - `<style>` 7.1 KB — hero‑grid breakpoint overrides + nav (LAYOUT‑CRITICAL → keep in‑site).
  - `<style>` 0.1 KB — content‑grow hover (`.if-grow-inner`), element `9f126333…`.
  - `<style>` 7.8 KB — hover/animation CSS (`if-hero-word`, footer, nav).
  - `<style>` 3.9 KB — footer CSS.
  - `<script>` 13.7 KB — the global behavior JS (hero anim, footer CTA, nav‑hide, smooth‑scroll, CSE, `__ifhero`), element `0f5b57ba…`.
  - `<script>` 0.7 KB nav‑hide; 4.3 KB; 0.9 KB smooth/IO — additional behavior.

**➡️ IMPLEMENTATION STATUS (consolidation — in progress):**
- **DECISION (user‑confirmed): host the shared file in THIS repo `idea-factory-site`** (public → jsDelivr works; and in scope). `webflow-assets` is abandoned (its `@v1.0.0` was a stale snapshot).
- **DONE:** shared files built at repo root — `idea-factory.css` (12.6 KB) + `idea-factory.js` (21 KB, 4 `try/catch` modules). Verified as an exact drop‑in via the offline headless harness (all features fire, 0 JS errors). Committed to `main`.
- **PINNED VERSION = commit `c7dc070` (v1.2.0).** (Local tags don't push via the git proxy, so live sites pin by **commit SHA** — equally immutable.) Served at `…/idea-factory-site@c7dc070/idea-factory.{css,js}`.
- **⚠️ REGRESSION + FIX (important lesson):** the first cut commit `c0fd5ed` (v1.1.0) was INCOMPLETE. The original page loaded **TWO** code sources — the inline embeds **AND** the old external `webflow-assets@v1.0.0` file — and the latter UNIQUELY held the **logo hover, four‑stages hover (`if-stage`), find‑your‑way‑in hover (`.if-aud-cell:hover h3`), the proof count‑up (`.if-countup`), and manifesto/news/events styling**. v1.1.0 dropped it as "redundant" — wrong; those features broke. **`c7dc070` (v1.2.0) folds `webflow-assets@v1.0.0`'s exact code back in** as a base layer (CSS first so newer inline layers win; JS as an isolated module). Verified via offline harness (file‑loaded, 0 JS errors): count‑up rolls, logo/stage/aud/hero hovers fire. **LESSON: a faithful shared file = the UNION of (inline embeds + webflow-assets@v1.0.0).** The exact source bytes are saved in scratchpad (`ext_v1.css`/`ext_v1.js`) and remain immutable at `webflow-assets@v1.0.0` on jsDelivr.
- **AWAITING USER:** bump the 2 refs in Project Settings from `@c0fd5ed` → `@c7dc070` + publish. **CSE search modal** still to be verified LIVE (its full code — `st2` overlay/scroll + `st3` styling + `sc2` logic + `sc3` placement — is in v1.2.0, but Google's CSE script can't be triggered in the offline harness, so confirm on the live site).
- **SPLIT:** in‑site KEPT = `st0` (hamburger + hero‑grid/id‑band responsive overrides = LAYOUT‑CRITICAL) + Webflow's own scripts. MOVED to shared file = `st1`+`st2`+`st3` (CSS) and `sc1`+`sc2`+`sc3`+`sc4` (JS).
- **DONE — cut‑over complete, verified live:** user repointed the 2 refs (Project Settings → Custom Code, head CSS + footer JS, each with a `DO NOT DELETE` banner) to `idea-factory-site@c0fd5ed` + published. The 4 redundant inline embeds were removed via MCP (`9f126333` content‑grow, `0f5b57ba` global, `30d80649` CSE, `69c29595` back‑to‑top). Only the in‑site `st0` embed (`afd96462…`, renamed in the Navigator to "DO NOT DELETE — in‑site layout/nav CSS") + Webflow's own scripts remain inline. (`st0` left untouched on purpose — it holds functional non‑ASCII like the `✕` glyph; its sidecar `sc1` also lives in the shared file but is idempotent via `el.__ifm`, so the harmless dup was not worth risking an edit to layout‑critical CSS.) Live page dropped **74.7 KB → 43.8 KB**; offline harness re‑confirmed every feature fires with 0 JS errors.
- **THE MULTI‑SITE SHARED‑CODE ARCHITECTURE IS NOW LIVE.** Duplicating the site carries the refs, so pasted Sections work in spin‑offs. The shared file is the single source of truth (edit in repo → re‑pin → all sites).
- **REMAINING (refinements, not blocking):** (5) clean class system (remove duplicate/orphan classes, e.g. the noted `.if-sub-field` duplicate); (6) Library/holding page (unlinked) for staging reusable Sections; (7) promote/rollback runbook in‑repo.

**CONVENTIONS (user‑set this session):**
1. **Bracket‑define jargon inline** the first time it appears, e.g. *repo [a project folder on GitHub]*, ≤~10 words.
2. **Every piece of in‑Webflow custom code carries a `DO NOT DELETE` banner + a concise "what it does."** The shared files already have DO‑NOT‑EDIT headers; the in‑site `st0` embed still needs its banner added (do during embed cleanup).

---

## 1. What this project is

- A flagship marketing site for the **University of Maryland / A. James Clark School — Idea Factory (MTECH)**, "where ideas get built."
- Built in **Webflow**; all edits are made through the **Webflow MCP** and then **published**. There is **no local build step** for the live site — Webflow is the source of truth for the live site; this git repo holds (a) the original Claude Design handoff and (b) **this working memory** (and, going forward, the shared code file — see §4).
- The repo also contains the original design intent: read `README.md`, `chats/chat1.md`, and `project/ui_kits/website/index.html` for the canonical look/behavior the Webflow site was built to match.

---

## 2. Environment & access — CRITICAL IDs AND FACTS

| Thing | Value |
|---|---|
| Webflow **Site ID** | `6a316b1a0f02a4cda75a50e7` |
| Webflow **Page ID** (homepage; also the `component` field in every element ID) | `6a316b1d0f02a4cda75a51fb` |
| **Staging URL** | `https://claude-accessed-migration-interface-sit.webflow.io` |
| **Adobe Fonts / Typekit kit** (Interstate; weights 400/700/800 used) | `https://use.typekit.net/fdu6zpb.css` |
| **Shared code on CDN** | `idea-factory.css` **and** `idea-factory.js` via jsDelivr from repo **`idea-factory-umd/webflow-assets`** at `@v1.0.0`. ⚠️ **This `@v1.0.0` is a stale early snapshot** — the *current* behavior runs from **inline body embeds**, NOT this file (see §0 AUDIT). Consolidation = bring this file current, re‑version, repoint, remove embeds. |
| **GitHub scope this session** | Only `idea-factory-site`. **`webflow-assets` is OUT of scope** (can't write it via MCP/GitHub here; `add_repo` unavailable). |
| **MCP cannot edit** | Project Settings / Page custom code (site‑wide head/footer). Only **embed elements**, Designer styles, and pages are MCP‑editable. Repointing the jsDelivr version is therefore a **user UI step**. |
| **GitHub repo (this one)** | `idea-factory-umd/idea-factory-site`, dev branch `claude/keen-johnson-f9w833` |

**Webflow MCP notes:**
- Element IDs are **composite**: `{component: <pageId>, element: <id>}`. The `component` is the page ID above unless inside a real component.
- MCP tools are **deferred** — load each via `ToolSearch` (e.g. `select:mcp__Webflow__data_style_tool`) before calling. Common: `data_style_tool`, `data_element_tool`, `data_whtml_builder`, `data_element_builder`, `data_sites_tool`, `data_pages_tool`.
- **`publish_site` frequently fails** with `Tool permission stream closed before response received`. This is transient — **just retry** (often 1–3 times), reloading the tool via ToolSearch if needed. The edits themselves usually persisted; only the publish call dropped.
- **Webflow breakpoints:** `main` (base/desktop ≥992), `medium` (≤991), `small` (≤767), `tiny` (≤479).
  - **Hero stacks at ≤767px** (NOT 991) — there's a custom `!important` override that keeps the hero 2‑column down to 767, then single‑column at ≤767. The nav collapses at `medium` (≤991).

---

## 3. How we work — conventions that must be kept

- **Class namespacing:** everything custom is prefixed **`if-`** (Idea Factory). Keep this — it's what makes cross‑site copy/paste safe (Webflow matches classes by name; namespacing prevents collisions). See §4.
- **Verification is done with a real headless browser, OFFLINE** (most reliable given the proxy):
  - Chromium is pre‑installed at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Playwright is global at `/opt/node22/lib/node_modules/playwright`.
  - The live site is **not directly reachable** from headless Chromium (proxy tunnel TLS closes even with `--proxy-server=$HTTPS_PROXY` + SPKI pin `KnP1OnzHv/y42eRQmbGwoYTHcSJF448m6CU5mdngwKk=`). **`curl` DOES work** through `$HTTPS_PROXY` (the port rotates between sessions — re‑read `$HTTPS_PROXY`).
  - **Working pattern:** `curl` the live HTML + compiled CSS → inline the CSS → embed the real Interstate fonts as base64 `@font-face` (download woff2 from the typekit URLs in §9) → load the file via `file://` in headless Chromium → measure / screenshot. Scripts live in the scratchpad (`shoot.js`, `verify_hero.js`, `proto.js`, `verify_hero.js`).
  - When checking CSS in compiled output, remember Webflow writes **multi‑line rules** and **drops leading zeros** (`0.34em`→`.34em`) and may fold longhands into shorthands (`margin: .3em 0 max(.34em,30px)`). Grep accordingly.
- **Editing the big global embed** (`<style>`+`<script>`, ~21 KB, non‑ASCII + `<script>`): direct `set_settings` often throws `InputValidationError`. Proven workaround: file‑based edit + JSON unicode‑escaping (`×`→`×`, `…`→`…`, `"`→`“/”`, every `<`→`<`), back up first, verify all script tokens intact. **Small** embeds (pure ASCII) set fine directly — see the content‑grow embed in §8.
- **Native hover states:** `data_style_tool update_style` with `pseudo:"hover"` makes a compiled `.class:hover` rule — works for **element‑self** hover only. **Parent‑hover‑child** (`.parent:hover .child`) is NOT representable as a Webflow style; it must live in custom code (an embed `<style>`).
- **User interaction preferences (important):**
  - Post brief status between steps; **do not go silent** during long multi‑call sequences.
  - Use Webflow's terminology precisely — e.g. **"section"** means a top‑level full‑width Section element; call ad‑hoc groups "blocks/groups."
  - Leave **taste calls** (exact sizes, gap amounts, scales) to the user; offer the one‑value dials.
  - Verify before claiming done; show before/after evidence.

---

## 4. MULTI‑SITE ARCHITECTURE — the core plan (MOST IMPORTANT)

**Goal:** one flagship "master" site here → spin‑off sites that each work standalone, share the look & behavior, and are maintained centrally **without connecting each one to MCP**.

**Workflow the user will use:**
1. Develop everything **here** (the only MCP‑connected project).
2. Use Webflow **"Duplicate Site"** to create the live home site, and again for each spin‑off.
3. In spin‑offs: edit **only content + nav** in the Webflow Designer UI. Never code, never MCP.
4. New animated features are built **here**; the user **copy/pastes the element** from here into a spin‑off and it works there.

**Why this works — two facts:**
1. **"Duplicate Site" is a full clone** — pages, all Designer classes, site‑wide + page custom code, embeds, interactions, CMS, assets, font links. A duplicate is self‑contained and functional with no MCP.
2. **Webflow matches classes by NAME on paste.** Pasting an element whose class already exists in the target (true for all duplicates, since they descend from this master) makes it **adopt the existing class and keep its styling**; new classes paste in as new. So look travels with the paste.

**The two‑layer split (internalize this):**

| Layer | What it is | How it reaches a spin‑off |
|---|---|---|
| **LOOK** | Visual styling = Webflow **Designer classes** (`if-…`) | **Travels automatically with the paste** (Webflow copies + name‑matches classes). Per‑site copies; editable in each site's UI. |
| **BEHAVIOR** | Animations, rollovers, JS, **non‑native CSS** (parent‑hover‑child, keyframes) | **One shared file** referenced by every site. Already loaded, so pasted elements just work. |

**Chosen model = B (single shared linked file), confirmed by the user.** Rationale: the user only edits code **here**, so a single centrally‑maintained file (edit once → all sites) is strictly better than per‑site copies. (Earlier "Option A / self‑contained copies" was **rejected** for this reason.)

- The **shared behavior file** lives in this repo, served via **jsDelivr** (same mechanism as the existing `idea-factory.css`).
- Each site carries a tiny **reference line** in its head/footer custom code. You set it up **once here**; it **duplicates with the site**. No per‑site code work.
- **End‑to‑end:** build feature here → its behavior code is added to the shared file (so it's instantly live in every site) + its Designer classes exist here → user pastes the element into a spin‑off → look travels with paste, behavior already linked → **publish → it works.**

---

## 5. STABILITY · SECURITY · REVERSION (non‑negotiable for the shared file)

The shared file is a single point of failure, so its safety is engineered:

1. **Reversion exists and beats Webflow backups:** the file is in **git** — every change is a reversible commit with a diff. The in‑site reference line is itself covered by **Webflow's** backups. Both ends are recoverable. Keep archived versions in‑repo too.
2. **Live sites pin to IMMUTABLE versions** — reference a jsDelivr **release tag or commit SHA** (`@v1.2.0` / `@<sha>`), **never** `@main`/`@latest`. Versioned/commit URLs are immutable + permanently cached, so **work‑in‑progress physically cannot reach a live site** until a version is deliberately promoted.
3. **Deliberate promotion + canary:** develop on a branch → test with the headless harness → cut a release → roll out to **one** site first, verify, then the rest. **Rollback = re‑pin to the previous tag** (instant, immutable, still cached).
4. **Progressive‑enhancement boundary (limits blast radius):** **layout, structure, base visual styling, and layout‑critical responsive rules stay IN‑SITE** (Designer classes + small in‑site custom code). The shared file is **additive only** (animation/hover/JS). Worst case if the shared file fails to load = sites lose *animations*, but remain correctly laid out, readable, navigable — **not broken.**
5. **Isolation within the file:** every feature is its **own IIFE module wrapped in `try/catch`** with guards for missing elements. One feature erroring cannot halt the others. **Add new modules; do not edit working ones.** CSS additions use unique `if-…` classes.
6. **Integrity/security:** private repo + branch protection (reviewed changes); immutable releases; **optional Subresource Integrity (SRI)** `integrity="sha384-…"` so a browser refuses a tampered/wrong file (trade‑off: each update also updates the hash — reinforces deliberate promotion).
7. **Test gate:** nothing becomes a release until the headless harness confirms every feature fires with zero console errors against real markup.

---

## 6. Per‑duplicate runbook (do this for each new spin‑off)

1. Webflow **Duplicate Site**.
2. **Add the new site's domain(s) to the Adobe Fonts (Typekit) kit allow‑list** — the ONE thing duplication can't do; without it the Interstate font silently fails on the new domain.
3. Confirm the shared‑file **reference line / pinned version** is present (it duplicates automatically).
4. Edit nav + content; set any **site‑specific values** (search/CSE id, absolute links, `#anchors`).
5. Publish.

---

## 7. Shared‑file design rules (when we build it)

- **Goes in the shared file:** the JS modules (hero reader, footer CTA reader, nav‑hide, smooth‑scroll, hover‑grow / content‑grow, search/CSE) and **non‑native CSS** (parent‑hover‑child transforms, keyframes, transitions).
- **Stays in‑site (Designer / small custom code):** layout, base visual styles, and **layout‑critical responsive overrides** (e.g. the hero‑grid breakpoint override at 767/991).
- **Module pattern:** `(function(){ try { /* guard for elements; bind by class; idempotent via a __flag */ } catch(e){ /* swallow */ } })();` — already how the existing JS is written.
- **Also create:** a **Library/holding page** (unlinked from nav) in the master to stage reusable items; and a **promote/rollback runbook** in‑repo.

---

## 8. Work completed (feature log — all live on staging)

- **Back‑to‑top button** (`.if-backtotop`): 32×32, slanted brand shape `clip-path: polygon(0 100%, 0 13%, 100% 0, 100% 100%)`, red `#e21833`, drop‑shadow, fixed at `right: calc(50vw - min(50vw, 620px))` (aligns to footer gold line on wide screens), hidden until scrolled (`.is-visible`).
- **Upcoming Events** hovers: featured card + 3 rows; text grows *within* the boxes in addition to the boxes growing (matched to reference `component-states.css`).
- **Footer**: all reference hover behaviors (links→gold, social→fill gold+scale, give→scale, get‑updates→darker red+scale); email field turns yellow on **focus (click)** only, not hover (`tabindex=0` + `:focus`); footer CTA "Have an idea? Let's build it." has a word‑by‑word **reading** effect on **mouse‑over**, first time per load.
- **Nav**: red header menu bar (`.if-navmenu`) hides when the footer enters view (desktop only).
- **Hero headline** (current element `aabcb7bd-38b6-f36d-eda9-8058b6018dcf`, class `if-hero-h1`): text **"Where ideas get built."** as ONE `<h1>`, 4 animated word‑spans (Where / ideas / get / built.), with **responsive breaks as one element**:
  - Desktop (≥768): **Where / ideas / get built.** (3 lines)
  - Stacked (≤767): **Where ideas / get built.** (2 lines)
  - Mechanism: two zero‑height block break `<div>`s — `if-h1-brk` (permanent) and `if-h1-brk-d` (desktop‑only, `display:none` at **small ≤767** to coincide with hero stacking). A **non‑breaking space** (U+00A0) sits after "Where" so "Where ideas" reads correctly when the break collapses. (`font-pending` class intentionally omitted — headline renders visible without it.)
- **Hero headline min‑gap above the button:** `.if-hero-h1 { margin-bottom: max(0.34em, 30px) }` — floors the gap only when it would collapse (the hero‑left is a `space-between` flex column, height `min(86vh,760px)`), without inflating roomy layouts.
- **Flagship Programs block** (in hero‑left, under Find Your Path): 4 buttons MIPS / UMD I‑Corps / Mtech Ventures / xFoundry, **same‑tab** links (§9).
  - **Markers** `.if-flag-dot-gold/.if-flag-dot-red`: now the slanted brand shape `clip-path: polygon(0 100%, 0 13%, 100% 0, 100% 100%)`, 11px, colors kept (gold `#ffd200` / red `#e21833`).
  - **Arrow** `.if-flag-arrow`: enlarged to **20px** (was 16), gold, `margin-left:8px`, `line-height:1`.
- **Content‑grow hover** on **Find Your Path** + the 4 flagships: each button's content is wrapped in `.if-grow-inner` (inline‑flex, gap 10px, `transition: transform .22s cubic-bezier(.22,1,.36,1)`, `transform-origin:center`); the box stays fixed while content scales. Rules live in a **small dedicated HTML Embed** (element `9f126333-f5f5-fbde-214e-b34f253afce7`, inside `.if-flagship`, placed OUTSIDE the hero‑left flex so it can't affect spacing):
    `.if-flag-btn:hover .if-grow-inner{transform:scale(1.07)}` and `.if-btn-primary:hover .if-grow-inner{transform:scale(1.06)}`

---

## 9. Quick reference (IDs, classes, tokens, values)

**Key element IDs** (component = page `6a316b1d0f02a4cda75a51fb`):
- Global embed (all shared CSS+JS, ~21 KB): `0f5b57ba-08a4-b91e-1136-12fc304ec3c2`
- Content‑grow hover embed (small): `9f126333-f5f5-fbde-214e-b34f253afce7`
- Hero `<h1>`: `aabcb7bd-38b6-f36d-eda9-8058b6018dcf`
- Hero CTA wrapper `.if-hero-cta`: `9636f821-0bbc-96b0-7317-8726126460a9`; Find Your Path `<a>` `.if-btn-primary`: `9636f821-0bbc-96b0-7317-8726126460a8` (href `#audience`)
- Flagship row `.if-flagship-row`: `c5159dfc-7fe0-36e0-9b7b-0c0e24db0e4d`

**Flagship links (same tab, no new‑tab):** MIPS `https://www.mips.umd.edu/` · UMD I‑Corps `https://www.icorps.umd.edu/` · Mtech Ventures `https://www.mtechventures.umd.edu/` · xFoundry `https://www.xfoundry.org/`

**Brand tokens** (from `project/tokens/`): `--md-red #e21833` · `--md-gold #ffd200` · `--md-black #000000` · `--md-white #ffffff` · `--action-hover #c2142b` · `--action-active #a40f23`. Eases: `--ease-out cubic-bezier(0.22,1,0.36,1)`, `--ease-spring cubic-bezier(0.34,1.55,0.42,1)`.

**Hero reading‑animation JS** (in the global embed): selects words via `h1.querySelectorAll(':scope > span')` (so non‑span break divs are ignored); generalized `words.forEach`; timing `D=180, gap=40, ideasExtra=520, lastExtra=640, ideasPause=110, workPause=150`; word index 1 ("ideas") gets the pause, last word gets the settle; triggers on the hero `<section>` `mouseenter`/`touchstart`; settle adds class `hero-settling`. Guarded by `h1.__ifhero`.

**Interstate woff2 (for offline test font embedding)** — from the typekit CSS `https://use.typekit.net/fdu6zpb.css`, the `interstate` normal faces: w700 and w800 `url(...)format("woff2")` entries (download with a `Referer:` header).

---

## 10. Pending / next steps (in order)

1. **[awaiting GO]** Read‑only **audit**: exact current location + size of every code/style piece (the global embed contents split CSS vs JS, the small content‑grow embed, the hero‑grid breakpoint `<style>`, the jsDelivr `<link>`, the Typekit `<link>`).
2. **Consolidate** behavior code into the shared file in this repo; publish it to jsDelivr as a **pinned version**.
3. **Wire the pinned reference** into this site's head/footer custom code (so it duplicates).
4. **Clean the class system** (remove known duplicates/orphans — e.g. a duplicated `.if-sub-field` was noted).
5. **Library/holding page** + **promote/rollback runbook** in‑repo.
6. **Verify** the live site is byte‑for‑byte equivalent in behavior before/after the cut‑over.
