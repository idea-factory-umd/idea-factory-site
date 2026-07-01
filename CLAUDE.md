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
>
> **THIS RULE IS SELF‑PERPETUATING — carry it forward.** Every session must (a) keep this file
> current as it works, and (b) **explicitly instruct the next session, here, to do the same.**
> Consistent documentation across sessions is what keeps this multi‑site product stable — treat it
> as part of the deliverable, not optional. If you (a future session) change how the project works,
> update the OPERATING PROTOCOL below **and** leave this instruction intact for whoever comes next.

---

## OPERATING PROTOCOL — how this project runs (EVERY session must follow + maintain this)

> The standing, user‑approved way this project operates. Follow it, keep it accurate, and pass it on.

**1. Shared‑code delivery — the "one file, set once" model.**
- Every site loads `idea-factory.css` + `idea-factory.js` from **this repo** via **jsDelivr**, referenced by a **mutable branch** so the reference is set **ONCE per site** and **duplicates into every spin‑off** (never re‑pinned again):
  - Head: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@main/idea-factory.css">`
  - Footer: `<script src="https://cdn.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@main/idea-factory.js"></script>`
- **Live branch = `main`.** (This SUPERSEDED the old immutable‑SHA pin, which forced re‑pinning every site on every change — see §0.)

**2. Shipping a change (promote).**
- Develop on a working branch; **verify with the offline headless harness** (every feature fires, **0 JS errors**) — see §3.
- Push the verified change to **`main`**, then **purge jsDelivr** so it goes live fast:
  `curl "https://purge.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@main/idea-factory.css"` (and the `.js`).
- Confirm on the live staging site, then **advance the `stable` branch to match** (`git push -f origin main:stable`).
- **Caching to remember:** new visitors get the purged file immediately; a returning visitor's browser may hold the old file up to ~7 days (hard‑refresh to see it instantly during dev).
- **What still needs the USER:** nothing per‑change anymore. (MCP cannot edit site‑wide Custom Code, but since the ref is `@main`, it's already set.) A brand‑new spin‑off just needs the Typekit domain allow‑list (§6).

**3. Backup & rollback (never lose a version).**
- **git IS the backup** — every commit is permanent/immutable; jsDelivr serves **any** commit by `@<SHA>` forever. No literal duplicate files needed.
- **`stable` branch = named last‑known‑good restore point** (advance it only after a change is verified live).
- **Roll back two ways:** (a) **no‑touch** — `git revert <bad commit>` on `main` + purge → all sites revert; (b) **instant emergency** — repoint a site's ref to `@stable` (or a known‑good `@<SHA>`).

**4. Documentation discipline (mandatory, self‑perpetuating).**
- Record **every** structural decision, convention, element ID, and shipped feature in **this file** and commit it to `main`. The scratchpad is ephemeral — do not rely on it.
- **Each session must also tell the next session (here) to keep doing this.** That continuity is the product's stability.

---

## 0. STATUS — where things stand right now

- **Flagship site** (the homepage) is built and being refined directly in **Webflow via the Webflow MCP** (`data_*` tools), then published to the **staging subdomain**. This is the "master / worksheet" site.
- **Multi‑site architecture is IMPLEMENTED (core consolidation LIVE + verified).** See §4–§7 for the design; see the IMPLEMENTATION STATUS block below for what shipped. Remaining = refinements only (class cleanup, Library page, runbook).
- **Chosen model: "B" — one shared, centrally‑linked behavior file** maintained here, referenced by every site. (The user only edits code here; spin‑offs only get content edits via the Webflow UI and are **never** connected to MCP.)
- **NEW (2026‑07‑01): chrome componentized + multi‑page started.** Footer / UMD Bar / Main Nav are now **Components**; **Students** + **About** pages created as Home duplicates with wired nav links. Full detail, IDs, and the **Library promotion hand‑off** are in **§12**.
- **⚠️ MODEL CHANGE (2026‑07‑01, user‑approved): live sites now pin to the MUTABLE `@main` branch, NOT an immutable SHA.** Reason: SHA pins forced re‑pinning **every site on every change** — untenable across a suite of spin‑offs. New model: the reference is set **ONCE** (`https://cdn.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@main/idea-factory.{css,js}`) and duplicates into every spin‑off. **Promote** = push verified files to `main` + **purge jsDelivr** (`curl https://purge.jsdelivr.net/gh/idea-factory-umd/idea-factory-site@main/idea-factory.{css,js}`). **Rollback** = revert `main` + purge. Dev stays on a branch; only verified work reaches `main`. **Caching:** jsDelivr edge `s‑maxage`≈12h (purge → instant); browser `max‑age`≈7d (hard‑refresh to see immediately during dev; new visitors get fresh after purge, returning visitors within the browser window). **This SUPERSEDES the "pin to immutable SHA" rule in §2/§5/RUNBOOK.**
- **BACKUP & REVERSION (2026‑07‑01):** git **is** the backup — **every commit is a permanent, immutable snapshot**, and jsDelivr serves **any** commit by SHA forever (e.g. `@c1baf6f`, `@1e2e355`), so no version is ever lost (a literal duplicate file is unnecessary/worse — git already keeps every version cleanly). **Named restore point = the `stable` branch** — advanced only after a change is verified good on the live site; **currently `c2b2940`** (= the current live‑good state: hero read‑to‑red + current‑nav marker + mobile hover). **Revert two ways:** (1) **no‑touch** — `git revert <bad commit>` on `main` + purge → all sites revert automatically; (2) **instant emergency** — repoint the affected site's ref from `@main` to **`@stable`** (or a known‑good `@<SHA>`) → immediately serves the last‑good file (immutable, cached). Workflow going forward: dev on a branch → push verified change to `main` + purge → confirm live → **advance `stable` to match**.
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
- **CSE SCROLL FIX → `c1baf6f` (v1.2.1).** After v1.2.0, the search-results modal was styled but couldn't scroll ("stuck"). Cause: the rules neutralizing Google's fixed-height results container (`st3`'s `.gsc-*`) sat in `<head>`; Google injects its own stylesheet into `<head>` at runtime *after* them → overrides → results clipped. Originally those rules were a `<body>` `<style>` (cascade applies body after head → they won). Fix (v1.2.1): a new `cse-late-css` JS module re-injects the CSE CSS as a `<style>` at end of `<body>`. Injection mechanism verified offline (lands in body, 0 errors); live Google-CSE behavior pending user confirmation.
- **CURRENT PIN = `c1baf6f` (v1.2.1) — LIVE & USER-CONFIRMED.** Served at `…/idea-factory-site@c1baf6f/idea-factory.{css,js}`. User repointed the 2 refs to `@c1baf6f`, published, and confirmed the search modal scrolls. **All 6 reported regressions resolved; consolidation fully complete & verified live.** (Version history: c0fd5ed=v1.1.0 broken → c7dc070=v1.2.0 restored hovers/count-up → c1baf6f=v1.2.1 CSE scroll fix.)
- **CSE behavior now confirmed working on the live site** (was the one item not testable in the offline harness).
- **SPLIT:** in‑site KEPT = `st0` (hamburger + hero‑grid/id‑band responsive overrides = LAYOUT‑CRITICAL) + Webflow's own scripts. MOVED to shared file = `st1`+`st2`+`st3` (CSS) and `sc1`+`sc2`+`sc3`+`sc4` (JS).
- **DONE — cut‑over complete, verified live:** user repointed the 2 refs (Project Settings → Custom Code, head CSS + footer JS, each with a `DO NOT DELETE` banner) to `idea-factory-site@c0fd5ed` + published. The 4 redundant inline embeds were removed via MCP (`9f126333` content‑grow, `0f5b57ba` global, `30d80649` CSE, `69c29595` back‑to‑top). Only the in‑site `st0` embed (`afd96462…`, renamed in the Navigator to "DO NOT DELETE — in‑site layout/nav CSS") + Webflow's own scripts remain inline. (`st0` left untouched on purpose — it holds functional non‑ASCII like the `✕` glyph; its sidecar `sc1` also lives in the shared file but is idempotent via `el.__ifm`, so the harmless dup was not worth risking an edit to layout‑critical CSS.) Live page dropped **74.7 KB → 43.8 KB**; offline harness re‑confirmed every feature fires with 0 JS errors.
- **THE MULTI‑SITE SHARED‑CODE ARCHITECTURE IS NOW LIVE.** Duplicating the site carries the refs, so pasted Sections work in spin‑offs. The shared file is the single source of truth (edit in repo → re‑pin → all sites).
- **REMAINING (refinements, not blocking):** (5) clean class system (remove duplicate/orphan classes, e.g. the noted `.if-sub-field` duplicate) — IN PROGRESS.
- **DONE (refinements):** (6) **Library/holding page** created — unlinked staging page for reusable Sections, page id `6a444ec15e773093da8f579e`, slug `/library`, set to **draft** (not published/crawlable). (7) **Promote/rollback runbook** written → `RUNBOOK.md` at repo root (promote, rollback, new‑spin‑off checklist, element‑reuse steps, gotchas). Read it alongside this file.

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

1. ✅ **DONE** — Read‑only **audit** of every code/style piece (see §0 AUDIT).
2. ✅ **DONE** — **Consolidated** behavior into the shared file; published to jsDelivr pinned by SHA.
3. ✅ **DONE** — **Wired the pinned reference** into site head/footer custom code (duplicates with the site).
4. ✅ **DONE (with a deliberate stop)** — **Class‑system audit + safe cleanup.** Removed the one true orphan (`if-old-marker`); the remaining "duplicates" are harmless and **unsafe to bulk‑remove** — full analysis + decision in **§11**.
5. ✅ **DONE** — **Library/holding page** (`/library`, draft, id `6a444ec15e773093da8f579e`) **+ promote/rollback runbook** (`RUNBOOK.md`).
6. **Verify** the live site is behavior‑equivalent before/after each future change (ongoing, via the offline harness).

---

## 11. Class‑system audit (done 2026‑06‑30) — what was cleaned, what was deliberately left

**Goal of the pass:** remove duplicate/orphan Designer classes **without risking the just‑stabilized site.**

**What was removed (safe, verified live):**
- **`if-old-marker`** — a dead leftover from the pre‑reshape flagship markers. **0 elements used it**, the name was **unique** (no same‑name twin), and it appeared in **no** code (CSS/JS). Removed via `remove_style` + published. Live compiled CSS went 82,994 → 82,793 B; the **only** selector that disappeared was `.if-old-marker` (diffed old vs new). Nothing else changed.

**What was found but DELIBERATELY LEFT (and why):**
- The Designer has **systematic same‑name duplicate style objects** — whole families minted twice (almost certainly from section rebuilds/paste passes via the HTML builder). Confirmed families (by ID prefix):
  - Header/nav/UMD‑bar/ID‑band/logo: `dea6a492…` **and** `b6a33b02…`
  - Footer: `64849047…` **and** `f9df5d3a…`
  - Events: `2d4615f7…` **and** `b470175c…`
  - Audience cells + Stage cells: a **global** copy *and* a **combo** copy of the same name (`if-aud-c1`, `if-stage-cell-1`, …).
  - Plus the noted `.if-sub-field` (2 objects, only 1 applied).
- **Why leaving them is correct / harmless:** Webflow **dedupes same‑name globals to a single rule at publish** — verified: `if-footer`, `if-logo-mark`, `if-stage-cell` each emit **one** rule in the compiled CSS despite 2–4 style objects. So the live site is **not** bloated; the duplicates are **Designer‑panel metadata clutter only**, with ~zero functional cost.
- **Why bulk removal is UNSAFE here (both available mechanisms are dangerous):**
  1. **MCP `remove_style` / `rename_style` are BY‑NAME only** (no style‑ID target). With two objects both named `if-footer` (one live, one orphan), a by‑name call **can't be aimed at the orphan copy** — it could take down the live one. There is no low‑stakes same‑name pair to safely test the semantics on (every pair has one live copy).
  2. **Webflow's built‑in "Remove unused styles" (Style Manager → Clean up) is ALSO unsafe here** — it deletes any class not applied to a **static** element, which would purge **runtime‑applied state classes whose styling lives in the Designer**, e.g. **`is-visible`** (added by JS for the back‑to‑top reveal; its `.if-backtotop.is-visible` rule is Designer‑defined, **not** in the shared file — confirmed `is-visible`/`if-backtotop` appear **0×** in `idea-factory.css`). Running Clean Up would break the reveal. (Other JS‑toggled classes to protect similarly: `if-open`, `hero-settling`, `if-hero-word*` — though several of those are styled in the shared file, so check before trusting Clean Up on any of them.)
- **Decision:** keep the harmless duplicates. The cosmetic tidiness is **not worth** the breakage risk on a business‑critical, recently‑regressed site. If we ever want them gone, the only safe route is a **careful, manual, per‑class pass in the Designer** (the Style Manager shows a live element‑count badge per class — delete only copies showing "0 elements", and **never** delete `is-visible` or other JS‑applied state classes), one at a time, publishing + verifying between deletions.

**Spin‑off note:** duplicates **travel with Duplicate Site**, but they're equally harmless there. They do **not** affect copy/paste of Sections (Webflow name‑matches on paste).

---

## 12. Components + multi‑page (done 2026‑07‑01)

**Terminology (user‑facing):** "Symbol" = old name for **Component** (reusable within ONE site; edit main → all instances update). To share a component **across sites** you publish it to a **Library** ("Library component" / linked component). Plain components do **NOT** stay linked on *Duplicate Site* (each copy is independent) — only **Library** components stay centrally editable across the suite.

**MCP capability boundary (important):** `transform_element_to_component` + `create_page(duplicateOf)` + link‑wiring are all doable via MCP. **Creating/publishing a Library is NOT** — it's a Webflow **Designer + Workspace** action and is **plan‑gated**. So Library promotion is always a user UI step.

**Chrome converted to Components (group "Chrome"), verified live:**
| Component | Component ID | Intended role |
|---|---|---|
| **UMD Bar** (top black bar, 2 links `if-umdbar-a1/-a2`) | `012e2a6d-7570-de6c-acbf-1f75f492d6cb` | **Library** (cross‑suite) — *promote in Designer* |
| **Footer** (`if-footer`; **contains the back‑to‑top button** now) | `e10326f9-f27d-d10d-956e-0401f8153fe9` | **Library** (cross‑suite) — *promote in Designer* |
| **Main Nav** (`if-navroot` NavbarWrapper: id‑band/logo/search + `if-navmenu` + dropdowns) | `bffe20a1-a591-82e2-1c75-4864d9f1f0b9` | **Regular / per‑site** (menu differs per site) |

- Conversion preserved **all inner classes + DOM** (published Home diff = only href changes, recompiled‑CSS hash, timestamp, and footer grid `#w-node-…` IDs re‑scoped to the component; **no wrapper elements added**, line count identical 1044/1044). Footer CSS‑grid placement rules were regenerated under the new component IDs (old `#w-node-_64849047…` → new `#w-node-e10326f9…`, verified in compiled CSS).
- The **st0 layout embed** (`afd96462…`) was **left at header level** (sibling of the two component instances) — it duplicates per page, which is correct (it's in‑site layout/hamburger CSS).
- **Offline harness re‑verified 0 JS errors + every feature fires** (hero anim, content‑grow, dropdown open, count‑up, back‑to‑top) after componentization.

**New pages (direct duplicates of Home; user will strip/rebuild content):**
| Page | Page ID | Slug |
|---|---|---|
| **Students** (next top‑level menu item) | `6a4459c7c5e5473127fdb14f` | `/students` |
| **About** (first item in the About dropdown) | `6a4459c75b0e32811729bb1b` | `/about` |

- Duplicates were created **after** componentizing, so they carry **instances** of UMD Bar / Main Nav / Footer (confirmed: Students header shows `ComponentInstance` of UMD Bar + Main Nav). Editing a component definition propagates to all pages.
- **Nav links wired in the Main Nav component definition** (so they resolve on every page): Students link (element `bffe20a1…f0fa`, a `Link`) → Students page via `set_link` (linkType page); About dropdown first item (element `bffe20a1…f114`, a **`DropdownLink`** — `set_link` REJECTS these; use `set_settings` key `link`, `static_link {mode:page,to:<pageId>}`) → About page. Verified live: `href="/students"` and `href="/about"` appear on Home, Students, AND About.
- Other nav links (Faculty/Researchers, Companies, Partners, News dropdown, etc.) remain `href="#"` placeholders.

**"Go home" links wired (2026‑07‑01), all verified live as `href="/"`:**
- **Home** nav link (`bffe20a1…f0f8`, in Main Nav) → Home page (Webflow **page‑link**).
- **Header logo** (`bffe20a1…f0bc`, `if-logo-link`, a real `Link`, in Main Nav) → Home page (**page‑link**). *(NB: a transient `502` on first try — just retry.)*
- **Footer logo** was a **`Span`** (`e10326f9…4008`, `if-foot-logolink`) wrapping the inline "Idea Factory" SVG — **`set_tag` can't turn a Span into `<a>`** ("Element does not support setTag"). Fix: inserted a real anchor **inside** the span (`if-foot-logohome`, `e0dbf2be…`, `href="/"`) via `whtml_builder`, set it **`display:contents`** (zero layout box — footer logo still measures 116×44, unchanged), then `move_element`‑moved the SVG into it. Structure: `span.if-foot-logolink › a.if-foot-logohome[href="/"] › svg`.
- **Link‑type choice by component role (IMPORTANT):** Main Nav = *per‑site* component → **page‑links** (Webflow remaps them to each duplicated site's own pages). Footer = *Library* component → links are **shared across every site**, so page‑links don't travel; use a **relative `/`** ("each site's own home") or an **absolute URL** ("one canonical home"). Footer logo currently uses relative `/`; user may switch it to an absolute URL later — trivial, it's isolated in the `if-foot-logohome` anchor.

**How to edit inside a component via MCP:** address the element with `{component:<componentId>, element:<id>}` **and** pass `scope_component_id:<componentId>`. Element IDs inside a component are re‑scoped under the component ID (the footer/nav/umdbar element IDs from §9 are now stale — they live under the component IDs above).

**➡️ HAND‑OFF — promote Footer + UMD Bar to a Library (user, in Designer; needs a Workspace plan with Libraries):**
1. Webflow Designer → **Libraries** panel → create/choose a Workspace Library.
2. Add the **Footer** and **UMD Bar** components to that Library; **publish the Library**.
3. In each site (this master + every spin‑off): **install** the Library and swap the local Footer/UMD Bar instances for the Library components (or build spin‑offs from a duplicate that already uses them).
4. Result: edit the Footer/UMD Bar **once in the Library → updates across the whole suite**. (Main Nav stays a regular per‑site component — do NOT add it to the Library.)
- If the plan doesn't include Libraries: fallback is edit‑here‑then‑re‑paste to each spin‑off (manual propagation), which is weaker but works.

---

## 13. Nav current‑page marker + mobile hover (done 2026‑07‑01) — SHARED CSS, needs re‑pin

The current‑page indicator now rides **Webflow's native `.w--current`** (auto‑applied per page to the nav link whose href matches — verified: `/students`→Students link, `/about`→About sublink both get it). It replaced a **hardcoded `if-nav-active`** on the Home link that made Home look current on every page (that class was removed via `set_style`). All styling is in **`idea-factory.css`** because Webflow will **not** compile a hand‑made `.w--current` combo (unused‑in‑Designer).

- **Top‑level (all widths base):** `.if-nav-link.w--current{background:#a40f23;border-bottom-color:#ffd200}` — dark‑red + gold underline (the old active look). Follows the page automatically.
- **Dropdown section pages (desktop ≥992):** the dropdown **toggle** gets a gold underline when one of its pages is current via `.if-dd-wrap:has(.w--current) .if-ddtoggle{border-bottom-color:#ffd200}`, and that dropdown's gold top‑edge is dropped (`.if-dd-wrap:has(.w--current) .if-dd-list{border-top-color:transparent}`) so the two golds don't collide. No separate sublink marker on desktop — the toggle is the cue. (`:has()` is fine for 2026 browsers.)
- **Hamburger (mobile ≤991):** HOVER = **gold hatch** (same look as desktop dropdown sublinks); CURRENT page = **red left bar** (`box-shadow:inset 4px 0 0 #e21833`) + red label — repurposing the old mobile hover cue.
  - **GOTCHA (important):** the old red‑left‑bar‑on‑hover lived in the **in‑site st0 embed** as `.if-navmenu …:hover{box-shadow:inset 4px 0 0 #e21833!important;background-image:none!important}` — specificity (0,3,0) and, being in `<body>`, it won source‑order ties, so plain shared‑CSS rules lost to it. Fix without touching the non‑ASCII st0 embed: the shared CSS **doubles the class** — `.if-navmenu.if-navmenu …` (specificity (0,4,0) hover / (0,5,0) current) — so it beats st0. Found it via Chrome DevTools `CSS.getMatchedStylesForNode` (grep/`getComputedStyle` couldn't locate it; it's box‑shadow, not border, and the file:// stylesheet wasn't rule‑readable). If st0 is ever cleaned, that old hover rule can go.
- **Neutralized** Webflow's default blue (`#0082f3`) on the current dropdown link: `.if-nav-sublink.w--current{color:#1a1a1a}` (mobile re‑colors it red via the more‑specific rule).
- **Verified offline** (headless + CDP): `/students` Students=red bar+red text, Faculty hover=gold hatch, 0 JS errors; `/about` desktop toggle underline gold, dropdown top transparent, sublink dark (not blue).
- **CSS‑only** → (historical) the live sites once needed the CSS `<link>` re‑pinned; now moot — live rides `@main` (§0/Protocol), so a push + purge ships it.

### 13a. Desktop dropdown current‑marker — FINALIZED (2026‑07‑01, user‑approved iterations)

The desktop dropdown current‑page cue is now an **"either/or"** between the toggle underline and the sub‑item bar (user's words: "when the dropdown is CLOSED you have that YELLOW BAR under the dropdown label; once you hover and it OPENS, you ONLY see the indicator on the actual sub‑item"). Live behavior (desktop ≥992):
- **Dropdown CLOSED**, a child page current → the **toggle** shows the **gold underline** (`.if-dd-wrap:has(.w--current) .if-ddtoggle{border-bottom-color:#ffd200}`); the dropdown's own gold top‑edge is dropped (`border-top-width:0;padding-top:6px`) so the two golds never collide.
- **Dropdown OPEN** (hover **or** JS `.if-open`) → the toggle underline goes **transparent**; the only cue is the **red left bar** on the current sub‑item (`.if-nav-sublink.w--current{box-shadow:inset 4px 0 0 0 #e21833}`). The bar is an **inset box‑shadow → paints IN FRONT of the hover fill**, so hovering the current sub‑item still works *behind/over* the marker (user‑confirmed requirement) and the marker is never obscured.
- **Sub‑item hover = text‑grow only** now (`.if-nav-sublink:hover{transform:scale(1.07)}`). The old **yellow hatch was removed on desktop** — user found it "too fussy." A small white top gap (`padding-top:6px`) is intentionally kept.
- Webflow's default blue on the current sublink stays neutralized (`.if-nav-sublink.w--current{color:#1a1a1a}`).
- Verified offline (`eo.js`/`eo2.js`/`eo3.js` in scratchpad): closed toggle `rgb(255,210,0)`; open toggle `rgba(0,0,0,0)`; current sub‑item `rgb(226,24,51) 4px inset` in both states; 0 JS `pageerror`.

### 13b. ⭐ NAV BEHAVIORS ARE CLASS‑DRIVEN & PORTABLE (2026‑07‑01, user requirement — KEEP THIS TRUE)

User requirement (verbatim intent): *"write it so these behaviors get tied to WEBFLOW CLASSES, so they apply properly whenever I move things around and edit them to create new menus going forward"* (needed because each spin‑off gets its own nav items). **Both the nav CSS and the nav JS already key ONLY off classes + Webflow's native state classes — never off any href, page id, element id, text, or item position.** Audit confirmed: JS uses `querySelectorAll('.if-dd-wrap')`, `.if-nav-link, .if-nav-sublink, .w-dropdown-toggle`, etc.; CSS uses the classes below + `.w--current`. `.if-dd-wrap:has(.w--current)` fires for **any** dropdown holding the current page, not one named dropdown. So reorder / retarget / build‑new‑menu all keep working automatically.

**NAV CLASS CONTRACT (put these classes on a nav item and it "just works" — documented in `idea-factory.css` too):**

| Nav item | Required class |
|---|---|
| top‑level link | `if-nav-link` |
| dropdown wrapper | `if-dd-wrap` |
| dropdown toggle | `if-ddtoggle` (keep `if-nav-link` too) |
| dropdown list | `if-dd-list` |
| dropdown sub‑item | `if-nav-sublink` |

- **Easiest way to stay in contract:** **DUPLICATE an existing classed item** instead of dragging in a raw element (raw elements only get Webflow's `w-…` classes).
- **SAFETY NET (added 2026‑07‑01):** the current‑page marker rules **also** match by **position + Webflow's own nav classes** (`.if-navmenu a.w--current…`, `.w-dropdown:has(.w--current) .w-dropdown-toggle`, `.w-dropdown-list a.w--current`), all **scoped inside `.if-navmenu`** so nothing leaks. Result: **even a raw, un‑`if‑`classed new nav item still gets the correct marker.** Verified in `eo3.js` — injected raw `w-nav-link.w--current` → dark‑red fill `rgb(164,15,35)` + gold underline; raw `w-dropdown-link.w--current` → red inset bar + blue neutralized; raw `w-dropdown-toggle` in a `w-dropdown:has(.w--current)` → gold underline. (Caveat: the self‑sufficient cues — dark‑red **background** on top links, **box‑shadow** red bar on sub‑items — are always visible on raw items; the gold **underlines** need a border‑width, which comes from `.if-nav-link`/`.if-ddtoggle`, so keep those per the contract for full fidelity.)
- **DO for future nav work:** keep every new selector class‑based + scoped to `.if-navmenu`/`.if-navroot`; never hardcode an href/id/position; when adding a marker, provide both the `if-` hook and the `w-` safety‑net form.

**Status:** desktop dropdown set (13a) + portability hardening (13b) are **staged on dev branch `claude/keen-johnson-f9w833`**, verified offline, **awaiting user approval before promote to `@main` + purge + advance `stable`.** **STILL PENDING:** the hamburger/responsive (mobile) form — mobile hover currently still uses the gold hatch, which the user now dislikes "in general," so revisit mobile hover in that next phase (selectors are already class‑generic).

---

## 14. Hero headline "read‑to‑red" (done 2026‑07‑01) — SHARED JS + CSS, needs re‑pin

The hero "Where ideas get built." stays **white**, and **"get" + "built." turn brand red (#e21833) as the reading animation reaches each word, then stay red** (per‑load). "Where ideas" stays white; the "." is part of the "built." span.

- **Marker:** the "get" (`…dcb`) and "built." (`…dce`) spans carry class **`if-hero-word-red`**, whose Designer color was **removed** (via `update_style`) so it's now an inert marker.
- **JS (hero reader, main‑bundle module):** when a word with `if-hero-word-red` is the active read step (or at settle 999), it adds **`if-lit-red`** (never removed → persists). Reduced‑motion: red words get `if-lit-red` immediately (no animation).
- **CSS (shared):** `.if-hero-word{transition:…,color .45s ease}` (fade) + `.if-hero-word-red.if-lit-red{color:#e21833}`.
- **Verified offline:** before hover all white; after reading get/built = rgb(226,24,51), 0 JS errors.
- **Both `idea-factory.js` AND `idea-factory.css` changed → re‑pin BOTH refs** (CSS `<link>` + JS `<script>`) to the new SHA.
