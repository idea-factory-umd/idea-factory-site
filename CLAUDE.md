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

**0. ⭐ NATIVE WEBFLOW FIRST — the PRIMARY, NON‑NEGOTIABLE build rule (user's #1 requirement, restated forcefully 2026‑07‑01).**
- **Build EVERYTHING as native Webflow elements + Designer styles, inside the Webflow UI, so the user can SEE, EDIT, ADD, and DELETE it visually in the Designer.** Native editability is the ENTIRE POINT of Webflow — it is not optional, and it applies to *everything* going forward.
- **DO NOT construct markup externally and "shove it in," and DO NOT put base look/structure/typography in the shared code files.** The shared `idea-factory.css`/`.js` are ONLY for what Webflow genuinely cannot do natively (parent‑hover‑child, keyframes, JS behaviors like the program filter) — added ON TOP of a working native build, never as the primary means. Build visually first; add code only if absolutely necessary.
- **Fonts, colors, spacing, layout, grids, cards, pills, element‑self hovers, responsive breakpoints = ALL native Designer styles.** e.g. set the header tagline font in the Designer (`update_style` on `.if-tag-p`), NOT via a CSS rule in the shared file.
- **⚠️ LESSON — `data_whtml_builder` (HTML‑fragment import) is BANNED for building UI.** On the Students directory it produced native‑looking elements but left their classes as raw class *names* that were NOT linked as applied Designer styles → the Designer canvas showed an unstyled "wall of text," while published looked fine only because the shared CSS matched the class names (the exact "disconnected/shoved‑in" anti‑pattern the user forbids). **FIX applied:** `data_element_tool set_style` on every element (all 110) to APPLY each class as a real Webflow style; `data_style_tool update_style` to populate the Designer style properties. Designer changes need a **Designer reload** to repaint the open canvas. **Going forward:** build with native element creation + `set_style`/Designer styling; never HTML import. **RESULT: verified via `element_snapshot_tool` — the directory now renders as proper native 3‑column cards (real Link/Block/Heading elements, editable in the Designer: select a card → its class shows in the Style panel → edit text / duplicate to add / delete). The `set_style` sweep was the correct native fix, not a code trick.**
- **⭐ VERIFY IN THE DESIGNER BEFORE CLAIMING DONE — the standing workflow (user's explicit standard, they said "work this way on everything going forward"):** build/fix natively → **`element_snapshot_tool` the element and LOOK at it** → self‑correct until it renders right → only THEN report, ideally with the image as proof. NEVER claim "done" from compiled CSS or a stored data value — confirm it actually *renders* in the Designer. Backtracking is what the user cannot afford.
- **`element_snapshot_tool` DOES reflect Designer styles** (verified 2026‑07‑01: it showed the gold hero eyebrow, and confirmed the rebuilt directory as styled 3‑column cards). *Any earlier note here calling it a "raw render" was WRONG.* Caveats: **calibrate on a known‑styled element first** (white text reads as blank on the white snapshot bg); it **errors on component‑internal elements and tiny/empty spans** — snapshot a larger page‑level ancestor instead. It shows Designer styles only (not the shared `idea-factory.css`), so e.g. the card photo boxes look plain gray in the snapshot but striped when published — that's expected/correct.

**1. Shared‑code delivery — served from GitHub Pages ("set once per site").**
- Every site loads `idea-factory.css` + `idea-factory.js` from **this repo** via **GitHub Pages** (GitHub's own free static hosting, served from `main`), referenced ONCE per site and **duplicated into every spin‑off**:
  - Head: `<link rel="stylesheet" href="https://idea-factory-umd.github.io/idea-factory-site/idea-factory.css">`
  - Footer: `<script src="https://idea-factory-umd.github.io/idea-factory-site/idea-factory.js"></script>`
- **Served branch = `main`, files at repo root.** Keep `.nojekyll` at root (serve files as‑is).
- **⚠️ SUPERSEDES the old jsDelivr `@main` delivery (see §0).** jsDelivr `@main` proved unreliable: it needed a **manual, rate‑limited purge** and independently cached the branch→commit mapping, so it kept serving **stale/older copies** across POPs (cost a full dev session). GitHub Pages refreshes itself on every push — no purge, no rate limit — so that failure mode is gone. (jsDelivr **immutable** `@<SHA>` URLs are still 100% reliable as an emergency pin, e.g. `…/idea-factory-site@<sha>/idea-factory.css` — never stale — but require re‑pinning per change, so they're a fallback, not the model.)

**2. Shipping a change (promote).**
- Develop on a working branch; **verify with the offline headless harness** (every feature fires, **0 JS errors**) — see §3.
- Push the verified change to **`main`** → **GitHub Pages auto‑rebuilds and serves it in ~1–2 min. No purge step, no rate limit.**
- Confirm on the live staging site, then **advance the `stable` branch to match** (`git push -f origin main:stable`).
- **Caching to remember:** GitHub Pages sets a short (~10 min) browser hold, and clears its own edge on each deploy — so new content propagates in minutes with no manual action (hard‑refresh only if you want it instantly during dev).
- **What needs the USER:** nothing per‑change. (MCP cannot edit site‑wide Custom Code, but the github.io ref is already set and copies with the site.) A brand‑new spin‑off just needs the Typekit domain allow‑list (§6).
- **ONE‑TIME setup (done once for the repo):** GitHub Pages must be **enabled** (repo **Settings → Pages → Deploy from branch → `main` / root**), and each existing site's two refs repointed from the old jsDelivr URL to the github.io URL above. New spin‑offs inherit the github.io ref automatically.

**3. Backup & rollback (never lose a version).**
- **git IS the backup** — every commit is permanent/immutable; jsDelivr serves **any** commit by `@<SHA>` forever. No literal duplicate files needed.
- **`stable` branch = named last‑known‑good restore point** (advance it only after a change is verified live).
- **Roll back two ways:** (a) **no‑touch** — `git revert <bad commit>` on `main` + purge → all sites revert; (b) **instant emergency** — repoint a site's ref to `@stable` (or a known‑good `@<SHA>`).

**4. Documentation discipline (mandatory, self‑perpetuating).**
- Record **every** structural decision, convention, element ID, and shipped feature in **this file** and commit it to `main`. The scratchpad is ephemeral — do not rely on it.
- **Each session must also tell the next session (here) to keep doing this.** That continuity is the product's stability.

---

## 0. STATUS — where things stand right now

- **⚠️ HOSTING MIGRATION (2026‑07‑01): serving moved from jsDelivr `@main` → GitHub Pages.** Reason: jsDelivr `@main` was **unreliable** — it needs a **manual, rate‑limited cache purge**, and independently caches the branch→commit mapping, so it repeatedly served **stale/older copies** from different edge nodes (this burned an entire dev session: a shipped, verified fix would not appear on the live site). **GitHub Pages** serves the two files straight from this repo, **auto‑refreshes on every push (~1–2 min), with no purge and no rate limit** → that failure mode is eliminated. New refs (set once per site, copy to spin‑offs): `https://idea-factory-umd.github.io/idea-factory-site/idea-factory.{css,js}`. **One‑time steps:** enable Pages (Settings → Pages → Deploy from branch → `main` /root) + repoint each existing site's two Custom‑Code refs to the github.io URL. Added `.nojekyll` at root so Pages serves files as‑is. Emergency fallback = immutable jsDelivr `@<SHA>` (never stale, but re‑pin per change). See OPERATING PROTOCOL §1–2 and `README.md`/`RUNBOOK.md`. **This SUPERSEDES all prior `@main`/jsDelivr delivery notes below in this section.**
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
- **Hamburger (mobile ≤991) — FINALIZED 2026‑07‑01 (see §13c):** HOVER (any item) = **brand‑red text + grow** (`color:#e21833;transform:scale(1.07)`), **no gold hatch**. CURRENT page = **red left bar via `::before`** (not box‑shadow) with **normal, non‑red text** (top‑level black, sub‑item gray `#7f7f7f`) — red is a **hover‑only** color here (hovering the current item reddens it too). ⚠️ This SUPERSEDES the old "gold hatch hover + red label" mobile treatment.
  - **GOTCHA (important):** the old red‑left‑bar‑on‑hover lived in the **in‑site st0 embed** as `.if-navmenu …:hover{box-shadow:inset 4px 0 0 #e21833!important;background-image:none!important}` — specificity (0,3,0) and, being in `<body>`, it won source‑order ties, so plain shared‑CSS rules lost to it. Fix without touching the non‑ASCII st0 embed: the shared CSS **doubles the class** — `.if-navmenu.if-navmenu …` (specificity (0,4,0) hover / (0,5,0) current) — so it beats st0. Found it via Chrome DevTools `CSS.getMatchedStylesForNode` (grep/`getComputedStyle` couldn't locate it; it's box‑shadow, not border, and the file:// stylesheet wasn't rule‑readable). If st0 is ever cleaned, that old hover rule can go.
- **Neutralized** Webflow's default blue (`#0082f3`) on the current dropdown link: `.if-nav-sublink.w--current{color:#1a1a1a}` (mobile re‑colors it red via the more‑specific rule).
- **Verified offline** (headless + CDP): `/students` Students=red bar+red text, Faculty hover=gold hatch, 0 JS errors; `/about` desktop toggle underline gold, dropdown top transparent, sublink dark (not blue).
- **CSS‑only** → (historical) the live sites once needed the CSS `<link>` re‑pinned; now moot — live rides `@main` (§0/Protocol), so a push + purge ships it.

### 13a. Desktop dropdown current‑marker — FINALIZED (2026‑07‑01, user‑approved iterations)

The desktop dropdown current‑page cue is now an **"either/or"** between the toggle underline and the sub‑item bar (user's words: "when the dropdown is CLOSED you have that YELLOW BAR under the dropdown label; once you hover and it OPENS, you ONLY see the indicator on the actual sub‑item"). Live behavior (desktop ≥992):
- **Dropdown CLOSED**, a child page current → the **toggle** shows the **gold underline** (`.if-dd-wrap:has(.w--current) .if-ddtoggle{border-bottom-color:#ffd200}`); the dropdown's own gold top‑edge is dropped (`border-top-width:0;padding-top:6px`) so the two golds never collide.
- **Dropdown OPEN** (hover **or** JS `.if-open`) → the toggle underline goes **transparent**; the only cue is the **red left bar** on the current sub‑item.
- **⚠️ The red left bar is a SOLID `::before` element, NOT an inset box‑shadow** (changed 2026‑07‑01 after a user bug report). `.if-nav-sublink.w--current::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#e21833}` (the item is `position:relative`). **Why:** an inset box‑shadow on the sub‑item rendered a **faint red fringe around the WHOLE row on hover** — a GPU‑compositing artifact that appears when the row **scales** (`transform:scale(1.07)`) on real/Retina hardware (it did NOT reproduce in headless at DPR 1 **or** 2 — real‑GPU only; diagnosed by elimination: no CSS/st0/Designer rule defines a 4‑sided red border, and sublinks carry no IX2 `data-w-id`). A solid pseudo‑element bar can't fringe. We also `box-shadow:none !important` the current sub‑item on hover (doubled `.if-navmenu.if-navmenu …:hover`) to kill the in‑site **st0** `!important` red‑bar‑on‑hover so nothing re‑introduces a shadow on the scaling row. **Do NOT revert the bar to a box‑shadow.** (The bar still sits at the far‑left 4px where there's no text, so hover/text‑grow operate fine over it and it's never obscured.)
- **Sub‑item hover = text‑grow only** now (`.if-nav-sublink:hover{transform:scale(1.07)}`). The old **yellow hatch was removed on desktop** — user found it "too fussy." A small white top gap (`padding-top:6px`) is intentionally kept.
- Webflow's default blue on the current sublink stays neutralized (`.if-nav-sublink.w--current{color:#1a1a1a}`).
- Verified offline (`eo.js`/`eo2.js`/`eo3.js`/`verifybar.js` in scratchpad): closed toggle `rgb(255,210,0)`; open toggle `rgba(0,0,0,0)`; current sub‑item `::before` = 4px `rgb(226,24,51)` bar with `box-shadow:none` on hover; text still scales 1.07; 0 JS `pageerror`.

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

**Status:** desktop dropdown set (13a) + portability hardening (13b) are **LIVE via GitHub Pages.** The hamburger/responsive (mobile) form is now DONE too — see §13c.

### 13c. Hamburger / responsive nav — FINALIZED (2026‑07‑01, user‑approved requirements)

User asks (evolved): "get rid of the yellow hatch"; first "make red the hover color … along with the 'grow'", then **FINAL: "No, just get rid of the red text. Just the grow on hover."** So the mobile hover is **grow ONLY** (no color change at all). Implemented in the `@media (max-width:991px)` block of `idea-factory.css`:
- **HOVER (any item — top link, toggle, or sub‑item):** the grow is **`transform:scale(1.07)` on the INNER text element (`.if-mtext`), NOT the anchor/row.** ⚠️ Scaling the full‑width anchor fought st0's own `.if-nav-sublink:hover .if-mtext` scale (a **double transform**) and "snapped back wildly" — the original smooth mobile grow is the `.if-mtext` text‑scale, so we grow that and leave the anchor un‑scaled (st0 pins the anchor `transform:none`). **Do NOT scale the anchor on mobile.** Also **no gold hatch, no background, no box‑shadow, and NO color change** — per‑type color rules (`.if-nav-link/.w-dropdown-toggle:hover{color:#000}`, `.if-nav-sublink:hover{color:#7f7f7f}`) only cancel st0's hover‑darkening so nothing shifts but the text size.
- **CURRENT page:** red left bar via **`::before`** (`.if-navmenu.if-navmenu a.w--current::before` = 4px `#e21833`), with resting text matched to siblings — top‑level `#000`, sub‑item `#7f7f7f`. **No red text anywhere on mobile** (the bar is the only current cue; hover just grows).
- **st0 interaction:** doubled `.if-navmenu.if-navmenu …:hover` `(0,4,0)` out‑specifies the in‑site st0 `!important` hover rule `(0,3,0)` (red bar + `transform:none` + `color:#1a1a1a`), so grow applies, no bar/hatch/darkening on hover. Marker is `::before` (not box‑shadow) so it survives the hover `box-shadow:none` and can't fringe when the row scales. (Keep the sub‑item current‑color selector at `(0,4,0)` — `.if-nav-sublink.w--current` — not `.if-dd-list a.w--current` `(0,4,1)`, so the hover rule isn't out‑ranked.)
- **Verified offline** (mobile 480px, menu force‑opened, CDP forced‑hover, transitions settled): non‑current resting = gray no‑bar; non‑current hover = **gray + `scale(1.07)` (grow only, no red)**, no hatch; current resting = gray + red `::before` bar; current hover = **gray + grow + bar (no red)**; 0 JS `pageerror`. Screenshots `MOB_contrast.png` in scratchpad.
- **Status:** staged on dev `claude/keen-johnson-f9w833`, verified offline, **awaiting user approval before promote** (push to `main` → GitHub Pages auto‑deploys, per §0/Protocol — no purge).

---

## 14. Hero headline "read‑to‑red" (done 2026‑07‑01) — SHARED JS + CSS, needs re‑pin

The hero "Where ideas get built." stays **white**, and **"get" + "built." turn brand red (#e21833) as the reading animation reaches each word, then stay red** (per‑load). "Where ideas" stays white; the "." is part of the "built." span.

- **Marker:** the "get" (`…dcb`) and "built." (`…dce`) spans carry class **`if-hero-word-red`**, whose Designer color was **removed** (via `update_style`) so it's now an inert marker.
- **JS (hero reader, main‑bundle module):** when a word with `if-hero-word-red` is the active read step (or at settle 999), it adds **`if-lit-red`** (never removed → persists). Reduced‑motion: red words get `if-lit-red` immediately (no animation).
- **CSS (shared):** `.if-hero-word{transition:…,color .45s ease}` (fade) + `.if-hero-word-red.if-lit-red{color:#e21833}`.
- **Verified offline:** before hover all white; after reading get/built = rgb(226,24,51), 0 JS errors.
- **Both `idea-factory.js` AND `idea-factory.css` changed → re‑pin BOTH refs** (CSS `<link>` + JS `<script>`) to the new SHA.

---

## 15. STUDENTS page (built 2026‑07‑01) — hero + filterable program directory

Second real content page (a Home duplicate; page id `6a4459c7c5e5473127fdb14f`, slug `/students`). **Only the hero's black‑left‑panel content changed** vs Home; the 7 Home body Sections were removed and replaced with a program directory. Global nav/footer/UMD‑bar (components) untouched. **Hero height is content‑driven** (needn't match Home — user‑approved).

- **Hero (kept the Home hero Section `if-hero-sec` = `9636f821‑…‑b1`; only content swapped):** gold eyebrow "For Students" (`if-hero-eyebrow`, Interstate) → headline "Become a builder." (`if-hero-h1`, reuses the read animation + `if-hero-word-red` machinery) → lead `if-hero-lead` "From your first course to your first company — find the program that fits where you are right now. **11 ways in.**" where "11 ways in." is `if-hero-lead-strong` (gold). Hero‑right image left as‑is.
- **Directory Section** (id `28cbbdb2‑be61‑b25e‑2f04‑f1c54d94e48c`). New Designer classes (base visuals, travel via Duplicate Site): `if-prog-sec, if-prog-wrap, if-filter-row, if-filter-label, if-filter-pills, if-filter-pill, if-prog-grid, if-prog-card, if-prog-photo, if-prog-photo-label, if-prog-body, if-prog-title, if-prog-sub, if-prog-desc, if-prog-tags, if-prog-tag`.
- **11 cards**, each `<a class="if-prog-card" href="#" data-tags="…">` (tags drive filtering). **Card links are `href="#"` placeholders** pending real URLs — convention: **internal = same tab; external entity links (UMD, A. James Clark School, program sites) = new tab** (`target=_blank rel=noopener`). Card #5 (Tech Ent Master's) had a real photo in the design ref; all cards currently use the **striped placeholder** (`if-prog-photo`) until images are uploaded.
- **FILTER (class‑driven, in shared `idea-factory.js`, module `program-filter`):** keys ONLY off `.if-filter-pill[data-filter]` + `.if-prog-card[data-tags]` (portable — new pills/cards just work). Pills: All · Undergraduate · Graduate · Online · Funding · Community & Space. **No current pill on load;** after the first click one is ALWAYS current (incl. "All"). **Current + hover state = text+border black→red** (`.if-filter-pill.is-active` / `:hover` → `#e21833`; base `#1a1a1a`). "All" shows everything; others match the tag.
- **CARD behavior (shared `idea-factory.css`):** equal‑height per row (CSS grid), **News‑card‑style lift on hover** (`translateY(-4px) scale(1.01)` + shadow, photo image `scale(1.04)`), responsive **3→2→1 columns** (≤991 → 2, ≤640 → 1). `.if-prog-hidden{display:none!important}` toggled by the filter JS.
- **Verified offline:** initial 11 cards visible / no active pill; click Graduate → 3 cards (Tech Ent Master's, Product Mgmt Master's, xFoundry) + active pill; active pill computes red after transition; 3‑col grid; 0 JS errors. Committed to `main` (c8212a1) + published; live on staging.

---

## 16. TYPOGRAPHY — Interstate/Georgia enforcement (done 2026‑07‑01) — SHARED CSS, LIVE

**Rule (user‑stated):** the design uses **exactly two faces — Interstate (every sans‑serif) + Georgia (every serif); Arial must NEVER render.** Webflow ships `body{font-family:Arial}`, which leaked Arial into any element without an explicit face (e.g. the header tagline). Fix = a small **`§0 TYPOGRAPHY` block at the TOP of `idea-factory.css`** (loads AFTER Webflow's compiled CSS, so it wins on equal specificity — ONE edit covers the whole suite AND overrides any stale compiled font):
- `body{font-family:Interstate,"Helvetica Neue",Arial,sans-serif}` → the sans **default** is Interstate; nothing renders as Arial. (Arial stays only as an unreachable tertiary fallback, matching every other Interstate stack in the build.)
- `.if-tag-p{font-family:Georgia,"Times New Roman",serif}` → the **header tagline beside the logo** (non‑red part "The University of Maryland's home…") is Georgia. The red `.if-tag-strong` ("One place, every stage.") already pins Interstate, so it stays Interstate. *(Design docs: body copy = Georgia; `.if-tag-p` had NO font‑family and was the one body‑copy class the build missed — every other, e.g. `.if-mani-p/.if-aud-intro/.if-prog-desc`, already had `Georgia, Times New Roman, serif`.)*
- `.if-hero-lead{font-family:Interstate,"Helvetica Neue",Arial,sans-serif}` → the **whole hero lead** (incl. "11 ways in.") is Interstate. On BLACK, Georgia's thin strokes are hard to read — deliberate deviation from body=Georgia. The gold `.if-hero-lead-strong` inherits it. *(Home uses `.if-tag-p` but not `.if-hero-lead`, so the hero rule is Students‑only today; any future hero using the class inherits the fix.)*
- **Verified offline** (computed `font-family`): tag‑p=Georgia; tag‑strong, hero‑lead, hero‑lead‑strong=Interstate; no Arial; 0 JS errors. DOM order confirmed compiled `<style>` → then `idea-factory.css` `<link>`, so the shared rules win. **Shipped to `main` (f2db128) → GitHub Pages served (31243→32579 B).** Live suite‑wide.

---

## 17. Search‑box magnifier — Webflow DESIGNER canvas fix (done 2026‑07‑01) — Designer‑only, PUBLISHED UNTOUCHED

**Symptom (user):** in the Webflow **Designer canvas** the search magnifier sits **top‑left**; the **published** site shows it correctly (right side, vertically centered). **Cause:** the magnifier is a `background-image` on `.if-search-input`; its **`background-position` lives ONLY in the shared `idea-factory.css`** (`background-position:right 14px center !important` + repeat/size), and **the Webflow Designer canvas does NOT load site‑wide custom‑code `<link>`s** — so in the Designer the position falls back to the CSS default `0% 0%` (top‑left). Published loads the shared file → correct. **(General lesson: any styling that lives only in the shared file looks "wrong" in the Designer canvas but right when published.)**
- **Fix:** added `background-position` to the **Designer style** `.if-search-input` (style id `dea6a492‑531d‑4fca‑5a7c‑9a6c7bd76d13` = the ACTIVE copy that carries the magnifier `background-image`; a same‑name duplicate `b6a33b02‑…` has no image — the documented dup family, §11).
- **Webflow only stores NATIVE 2‑value background‑position.** `right 14px center` (4‑value offset) and `calc(100% - 14px) 50%` were **silently dropped on commit** (update echoed them back but a re‑query showed them gone). `**100% 50%**` (right, centered) **persisted**. So the Designer now shows the glass **flush‑right + vertically centered** vs **14px‑inset** live (Webflow can't store a fixed px‑from‑right offset — acceptable; it fixes the top‑left complaint).
- **PUBLISHED IS UNCHANGED and safe:** the shared `right 14px center !important` still wins on the live site (Designer canvas doesn't load it). **No publish was done and none is needed** — the Designer canvas reflects the saved Designer style on refresh. Even if the site is later published, the shared `!important` keeps live at 14px inset. To SEE the fix: reload the Webflow Designer.

---

## 18. Hero-animation refinements + Students card hover (2026-07-01) — SHARED JS+CSS, ON DEV, awaiting coordinated publish

Two behavior tweaks this session. **Both are shared-file behavior → they only appear on the PUBLISHED/PREVIEW site, never the Designer canvas** (the canvas doesn't load the shared file — same lesson as §17). Committed to **dev `claude/keen-johnson-f9w833`** (JS `631cb3e`, CSS `94fd53e`); **NOT yet on `main`** — see the coordination note at the end before promoting.

**A. Hero reader — pause is now CLASS-DRIVEN + red words stay lit (`idea-factory.js`, main-bundle hero module).**
- **Mid-read pause marker = `if-hero-word-delay`** (empty Designer style id `7ee9ee04-1751-7407-f594-dfafee90aa5b`, inert hook). The reader adds the extra hold + pause to whichever word carries this class, instead of the old hardcoded word-index 1. Portable: apply the class to any word in any headline/spin-off.
  - Applied natively (Designer `set_style`) to: **Home "ideas"** span (`aabcb7bd-…-dc8`) — preserves Home's existing beat; **Students "Become"** span (`01cbe865-…-5b34`) — user moved the beat here (was wrongly landing on "a").
  - JS shape: `hold = D + (x.classList.contains('if-hero-word-delay')?ideasExtra:0) + (last?lastExtra:0)`; the gap after a delayed word gets `+ideasPause`. The last-word settle beat (`lastExtra`) is unchanged (always the final word).
- **Red words hold full opacity after being read.** `setStep` opacity is now `step===idx?1:(w.classList.contains('if-lit-red')?1:0.62)` — once a red (`if-hero-word-red`) word is lit it never dims back with the white words (user: the dim/re-brighten looked wrong on red, fine on white). White words still dim to 0.62 and rise at settle.
- Verified offline (0 JS errors): Students "Become" holds ~625ms (beat), "a" never held (glides past), "builder." ~875ms (end settle) and stays red at full opacity.

**B. Students card hover — news-style (`idea-factory.css` + one native prop).**
- **Photo zoom 1.04 → 1.07** on card hover (closer to the news-card feel, still subtle). Now clipped to the frame by **native `overflow:hidden` on `.if-prog-photo`** (added via Designer `update_style` — base structural containment, matches `.if-news-photo`).
- **Whole `.if-prog-body` text group scales 1.03 as ONE unit** on card hover (`.if-prog-body{transition:transform 240ms …}` + `.if-prog-card:hover .if-prog-body{transform:scale(1.03)}`), so every line stays aligned; kept subtle to clear the 24px body padding.
- Both photo-zoom and body-grow are **parent-hover-child → shared CSS** (Webflow can't store "parent hover scales child" natively — same reason the news hover is CSS). The cards + contents themselves remain fully native/editable. **This supersedes the "photo image `scale(1.04)`" detail in §15.**
- Verified offline (0 JS errors + screenshot): on hover card→1.01, photo→1.07 (contained, no bleed), body→1.03 (text stays clear of edges, alignment preserved).
- **Dials the user can nudge:** photo `scale(1.07)` and body `scale(1.03)` in `idea-factory.css`.

**⚠️ COORDINATION — these two commits must promote together with a Webflow PUBLISH (do NOT push to `main` alone):**
- The hero JS keys off `if-hero-word-delay`, applied in the **Designer** (unpublished). Pushing the JS to `main` before publishing would drop Home's "ideas" pause on the live site (the live DOM lacks the class).
- The card photo-zoom relies on the **native `overflow:hidden`** (unpublished); pushing the CSS before publishing would let the 1.07 zoom bleed past the frame on the live site.
- **Correct promote = push `idea-factory.{css,js}` to `main` (GitHub Pages) AND publish the Webflow site together.** That publish also ships this session's other Designer work (3 card photos, MOOCs cards rebuilt as Blocks with inner text links, letter-spacing −0.4px, hero break + `min-width:0` on `if-hero-left`, `if-tag-p` Georgia, search-input bg-position, etc.).

---

## 19. Footer / card / filter / manifesto animation polish (2026-07-01) — SHARED JS+CSS, LIVE

All promoted (pushed to `main` + Webflow published; `stable` advanced to `4bcb588`). Each is class-driven/portable and shared-file behavior (shows on published/preview only, NOT the Designer canvas).

**A. Footer CTA "Have an idea? Let's build it." — gold stays lit + footer-wide trigger.**
- Gold phrase ("Let's build it.", `.if-foot-cta-gold`) now mirrors the hero red: starts white, turns gold word-by-word on the read, HOLDS full gold (no dim-back). `initCta` propagates `if-foot-cta-gold` onto the split `.if-foot-cta-word`s and adds `if-lit-gold` once a gold word is read; `setStep` keeps lit words at opacity 1. Reduced-motion lights them immediately. Shared CSS: `.if-foot-cta-word{color:#fff;transition:opacity …,color .45s}` + `.if-foot-cta-gold.if-lit-gold{color:#ffd200}`. Native gold on `if-foot-cta-gold` removed → inert marker. ⚠️ §11 DUP: by-name update cleared only the canonical `f9df5d3a`; orphan `64849047` still gold — harmless, the shared `.if-foot-cta-word{color:#fff}` (loaded after compiled) wins at rest.
- **Trigger widened:** the reading animation now fires on mouseenter of the whole footer (`head.closest('.if-footer')||closest('footer')||head`), not just the heading — far more reliable to trigger.

**B. Students card hover — ONE uniform center-pinned zoom + text-grow wrapper** (iterated per user: "no directional movement, everything zooms, center-pin all grows").
- Card zooms as a single unit: `.if-prog-card:hover{transform:scale(1.03)}` — removed the old `translateY(-4px)` lift AND the separate body scale (that layering made the text appear to grow up into the photo). Photo image keeps a contained extra zoom `scale(1.04)` inside its `overflow:hidden` frame.
- Text grows WITHIN the body via a JS wrapper: module `program-card-inner` wraps `.if-prog-body`'s content in `.if-prog-bodyinner`; `.if-prog-card:hover .if-prog-bodyinner{transform:scale(1.03)}` (center-pinned, default origin) grows the content inside the body without moving the body's perimeter. Content stays natively editable (the wrapper only groups it — same pattern as `if-grow-inner`/CTA word-spans). An earlier `if-prog-body` `flex-grow:0` experiment was reverted to `1` — the wrapper is the correct mechanism.
- Net: card + photo + text all grow center-pinned in all directions; gaps preserved; nothing creeps directionally.

**C. Filter-switch entrance.** Matching cards fade + rise 10px, staggered 35ms/card (cap 260ms), .45s ease-out, ONLY on a pill click (never initial load). `@keyframes if-prog-in` + `.if-prog-card.if-prog-appear` with `animation-fill-mode:backwards` (from-state shows during the stagger delay = no flash; doesn't retain after = card hover-lift still works). `program-filter` collects shown cards and re-triggers the class with a per-card `animation-delay`; reduced-motion skips.

**D. Home manifesto red.** "We are not a think tank. / We are not a lecture hall. / We are **where ideas get built.**" — the phrase "where ideas get built." (`.if-mani-red`, nested in line-3 span `…d857`) starts BLACK and turns red only when its line is highlighted by the grow, then HOLDS red. `initManifesto` adds `if-lit-red` to the lifted line's `.if-mani-red` child (never removed; reduced-motion lights immediately). Native red on `if-mani-red` removed → inert; shared CSS `.if-mani-red{color:inherit;transition:color .45s}` + `.if-mani-red.if-lit-red{color:#e21833}`. Verified end-to-end on the live Home DOM (black→red→stays, 0 JS errors).

**⚠️ PROPAGATION LESSON (bit us this session):** after pushing shared JS+CSS to `main`, GitHub Pages has a ~1–2 min window where a browser can load the NEW css with the OLD cached js (or vice-versa) → a transient mismatch (e.g., manifesto shows black with no red-on-highlight because new CSS + stale JS). It self-resolves; hard-refresh after ~2 min to confirm. Always verify with the offline harness against the freshly-served files before assuming a real bug.

---

## 20. Link weight (Interstate) — PENDING Adobe Fonts kit change (2026-07-01)

The red inline-link style **`if-inline-link`** (Interstate; on the MOOCs card text links, `color:#e21833`, `letter-spacing:-0.4px`) looks spindly at weight **400** beside Georgia. The Adobe Fonts kit **`fdu6zpb`** only loads Interstate **400 / 700 / 800** (confirmed by curling `use.typekit.net/fdu6zpb.css`). Per CSS font-matching, `font-weight:500` falls back to **400** (no change) and `600` jumps to **700** — so the only real heavier face is 700, a big jump. Rendered a real comparison with the actual faces (scratchpad `linkweight.png`): 400 spindly, 700 bold, `-webkit-text-stroke` 0.2–0.45px = a faux-medium.
- **User rejected the faux** `text-stroke` (only renders on published, not a real face). **Decision: add weights to the kit.**
- **HAND-OFF (user, Adobe Fonts UI):** fonts.adobe.com → avatar → **Web Projects** (`fonts.adobe.com/my_fonts#web_projects-section`) → project **`fdu6zpb`** → **Edit Project** → under **Interstate** tick extra weights (need **Medium = 500**; user may add all upright weights) → **Save**. Auto-republishes (~1–2 min); domains already allow-listed; carries to spin-offs on this kit. No small per-project cap on current plans — limit is performance (each weight = another file); italics + Condensed/Compressed are extra families, add only if used.
- **THEN (Claude):** verify the new face by re-curling `use.typekit.net/fdu6zpb.css` for `font-weight:500`, then set `if-inline-link` → `font-weight:500` **natively** in the Designer (real medium; shows in the Designer canvas too — no faux, no shared-CSS override). Publish.

---

## 21. Font Polish/CE glyphs (Interstate) — RESOLVED: the Adobe cut lacks them (2026-07-01)

**Interstate on Adobe Fonts CANNOT render full Polish, and no kit setting fixes it.** Verified with fonttools on the served woff2 (all weights): the kit serves a **233-glyph set ≈ Adobe Latin-1 (AL-1)** — confirmed 3 ways (referer / cache-busted / no-referer, byte-consistent) so it is NOT a cache or referer artifact. Per Adobe's own charset lists, **AL-1 HAS `Ł ł Ó ó` but NOT the Polish ogonek/accents `Ą ą Ę ę Ć ć Ń ń Ś ś Ź ź Ż ż`** — those first appear in **AL-3** (AL-1=229 cps, AL-3=332). So "Ł but not Ą" is a defined AL-1 boundary, not a bug.
- **NOT a settings problem.** User set the kit character set to **"All Characters"** — that IS applied; it serves everything the font *has* (AL-1). The real cause: **Adobe only ships the "standard" cut of Interstate (~AL-1)**, even though Interstate-the-typeface has an extended CE/EE + Cyrillic/Greek version, and Adobe's description misleadingly implies that coverage (known issue — Adobe UserVoice *"Misleading information on Interstate language support"*). The Polish glyphs are simply not in the file at any setting.
- **CONSEQUENCE:** Ą Ę Ż etc. fall back to a system sans (mismatched) anywhere in Interstate text. **Georgia** (serif body, a system font) covers Polish fine — the gap is Interstate-only. Applies to ALL spin-offs on this kit.
- **OPTIONS if Polish is needed:** (a) accept the fallback for those letters; (b) swap the sans role to an Adobe font with real AL-3 coverage (Interstate-alike grotesque) — change `Interstate` in the font stacks (shared CSS `body`, plus Designer `.if-tag-strong/.if-hero-lead/.if-inline-link/...`), everything else stays; (c) hybrid: Interstate for English, alt for Polish. Re-verify any candidate the same way: curl kit CSS → download woff2 (needs `Referer:` licensed domain) → fonttools `TTFont(f).getBestCmap()`, check U+0104/0118/017B. (fonttools+brotli pip-install fine in this env.)
- **➡️ IMPLEMENTED in §22** — chose a hybrid of (a/c) as the default + a switch to (b): **self-hosted Overpass** fills Polish as a weight-matched fallback, and a **global class switch** flips the whole suite to all-Overpass on command.

---

## 22. FONT SWITCH — self-hosted Overpass + Interstate⇄Overpass toggle (2026-07-01) — SHARED CSS + 8 woff2, LIVE on `main`

**What/why:** Adobe's Interstate cut lacks Polish/CE glyphs (§21). Fix = **self-host Overpass** (OFL, open-source, same Highway-Gothic DNA as Interstate; full Polish 18/18) directly in this repo and wire a **global switch** so the user can run the site as **"Interstate + Overpass fallback"** (default) OR **"all Overpass"** (flip a class), to dry-run replacing Interstate. Purely a shared-CSS change — **no Adobe kit change and NO new custom-code line needed** (the site already loads `idea-factory.css`, which now carries the `@font-face`s; the woff2 sit beside it on GitHub Pages).

**Files added (repo root, served by GitHub Pages):**
| File | What | Bytes |
|---|---|---|
| `overpass.woff2` | Overpass **variable** upright, `wght 100 900` | 129,476 |
| `overpass-italic.woff2` | Overpass **variable** italic, `wght 100 900` | 128,272 |
| `overpass-pl-400.woff2` | static instance @ **wght 340** → face `OverpassFB` weight 400 | 63,364 |
| `overpass-pl-500.woff2` | static instance @ **wght 480** → `OverpassFB` weight 500 | 64,100 |
| `overpass-pl-700.woff2` | static instance @ **wght 740** → `OverpassFB` weight 700 | 64,368 |
| `overpass-pl-800.woff2` | static instance @ **wght 900** → `OverpassFB` weight 800 | 62,780 |
| `overpass-hv-700.woff2` | static instance @ **wght 780** → flip-mode `'Overpass'` weight **700** | 64,060 |
| `overpass-hv-800.woff2` | static instance @ **wght 900** → flip-mode `'Overpass'` weight **800** | 62,616 |
- The `-pl-*` files are **full-glyph** Overpass (not subset) instanced to a fixed weight; named "pl" because their JOB is the Polish fallback. Weights are **deliberately lighter than the nominal** (340 for 400, etc.) because untuned Overpass is heavier than Interstate at the same number and the fallback "stuck out" (user's words). Tuned by stem/width match. ⚠️ **Interstate 800 is heavier than Overpass can reach (max wght 900), so 800→Overpass 900 is best-effort and renders slightly light** — acceptable; an 800-weight sans in Polish would be rare.
- **⭐ FLIP-MODE HEAVY-WEIGHT TUNING (`-hv-*` files, added 2026-07-02 after user feedback "it looks LIGHTER now"):** in flip mode, raw Overpass at nominal weights renders lighter than Interstate at the top end (measured ink-mass: Overpass 800 = **0.80×** Interstate 800). Interstate's character lives in its heavy weights, so flip mode remaps the two heavy slots to heavier instances: **700 → wght 780** (matches Interstate 700 — measured **1.02×**), **800 → wght 900** (Overpass's max — **0.92×** Interstate 800, up from 0.80). Mechanism: the flip-mode `'Overpass'` `@font-face` variable is **capped `font-weight:100 600`** and two static `@font-face`s (`font-weight:700`/`800`) point at the `-hv-` files, so the weight ranges don't overlap. **400/500 stay true variable Overpass** (already ≥ Interstate — no lightening anywhere). ⚠️ **900 is Overpass's ceiling** — flip 800 stays ~8% under Interstate 800 (a hard font limit; can't be closed without a different/blacker face). Dial to nudge: re-instance the two `-hv-` files at different `wght`. Default mode is **untouched** (never uses the `'Overpass'` family).
- Made with fonttools `instantiateVariableFont` from the upstream Overpass variable TTF → woff2 (brotli). `size-adjust:102.7%` on every face matches Overpass's x-height to Interstate.

**The CSS (idea-factory.css, top "FONT SWITCH" block, replaced the old single `body{font-family:Interstate…}` line):**
```
@font-face Overpass  upright variable, wght 100 600, size-adjust:102.7%   (flip 400/500)
@font-face Overpass  static wght780 labeled font-weight:700  (overpass-hv-700) (flip 700)
@font-face Overpass  static wght900 labeled font-weight:800  (overpass-hv-800) (flip 800)
@font-face Overpass  italic variable, wght 100 900, size-adjust:102.7%
@font-face OverpassFB (4 static weights 400/500/700/800, size-adjust:102.7%) (default-mode PL fallback)
:root{ --if-sans: Interstate,'OverpassFB',"Helvetica Neue",Arial,sans-serif; }   /* DEFAULT */
body.if-font-overpass{ --if-sans:'Overpass',"Helvetica Neue",Arial,sans-serif; } /* FLIPPED */
body, <71 sans classes>{ font-family: var(--if-sans) !important; }
```
- **DEFAULT (no class):** English/Latin renders in **Interstate** (unchanged — it's first in the stack); only glyphs Interstate lacks (Ą Ę Ż Ć Ń Ś Ź …) fall through **per-character** to weight-matched **OverpassFB** instead of Arial. Georgia (serif body copy) is untouched — those classes are **not** in the list.
- **FLIPPED (`body.if-font-overpass`):** `--if-sans` becomes all-**Overpass** → every sans instance (all 72) switches to Overpass, English included.

**⭐ HOW THE USER FLIPS IT — ⚠️ CORRECTED 2026-07-02.** A class added to Body in the **Designer applies only to THAT page's body** (Webflow "Body (All Pages)" is a *tag* selector; class *application* is per-page), so it does **NOT** flip the whole site in one action. The true one-toggle-for-the-whole-suite is a **site-wide footer custom-code line** that adds the class via JS:
- **Recommended (whole site, one place):** Webflow → **≡ menu → Project Settings → Custom Code → Footer Code**, paste `<script>document.body.classList.add('if-font-overpass')</script>`, **Save Changes → Publish**. This runs on every page (site-wide footer), so all pages flip. **Revert = delete the line + Publish.** (This line is site-wide custom code, so it also **duplicates into spin-offs** with the site.)
- **No-code alternative (per page):** Designer → Navigator → select **Body** → Style panel selector field → add class **`if-font-overpass`** → Publish. Must repeat on **each** page.
- The pasted `<script>` is not loading anything (it has no URL): `document.body` = the current page's `<body>`; the script just adds the class, which switches on the dormant `body.if-font-overpass{…}` rule that already lives in the site-wide `idea-factory.css`.
- ⚠️ The switch/fallback are **shared-file** styling → they show on the **published/preview** site, **NOT the Designer canvas** (the canvas doesn't load `idea-factory.css` — same lesson as §17/§18). Verify by publishing/previewing, not in the canvas.

**Why no new custom-code line:** the fonts are **self-hosted** and declared **inside `idea-factory.css`** (already loaded site-wide). The woff2 resolve via **relative** `url('overpass*.woff2')` → same GitHub Pages dir as the CSS. Cross-origin OK: GitHub Pages sends **`access-control-allow-origin: *`** on every response (verified this session — `@font-face` needs CORS; `<link>` CSS does not). Lazy-loaded: an all-English page fetches **none** of the Overpass files; a Polish page fetches only the OverpassFB weight(s) it uses; flip mode fetches the variable `overpass.woff2`.

**Scope / limitation (documented on purpose):** the **72-selector list** was verified against the live compiled Webflow CSS to be **sans-only** (every one resolves `Interstate,Helvetica Neue,Arial,sans-serif` — zero Georgia), so the `!important` never clobbers serif body copy. The **Google-CSE results modal** (`.if-cse-*`, `.gs-title` etc. in the CSE CSS block) still hardcodes Interstate and is **NOT** part of the switch — left alone to protect that previously-fragile surface; its result text stays Interstate (Polish there would still fall to Arial). Acceptable for a temporary tool; revisit only if search results need Polish/flip.

**This also gives §20 a real answer:** in flip mode the inline link is Overpass (has a true medium 500); even in default mode a heavier weight can be dialed on `OverpassFB`. (The Adobe-kit route in §20 is now optional.)

**Verified offline (headless Chromium, `fontswitch*.js` + `wtv.js` in scratchpad):** DEFAULT → English pixel-identical to Interstate + Polish width-exact to OverpassFB (146.59px, vs Arial 146.75), no tofu; FLIPPED → English & Polish both width-exact to Overpass, `--if-sans` computed = `Overpass,…`; heavy-weight tuning → flip 800 = 0.92× Interstate 800 (was 0.80), flip 700 = 1.02× Interstate 700; **0 JS errors**; screenshots `fontswitch_default.png` / `fontswitch_overpass.png` / `weight_compare.png`. **Promoted:** commit `09ac98a` (switch) + **`32c552e`** (heavy-weight tuning) on `main` (+ dev `claude/keen-johnson-f9w833`); GitHub Pages serving. `stable` NOT advanced yet — do so after the user confirms live.
- **Lazy-load note:** default English pages fetch **none** of the Overpass files; a Polish page fetches only the OverpassFB weight(s) used; flip mode fetches `overpass.woff2` (≤600) + the `-hv-` file(s) for whatever 700/800 text is on the page.
- **To fully strip later:** remove the flip line/class, delete the **8** woff2 + the FONT SWITCH block from the CSS, and (if desired) restore the plain `body{font-family:Interstate,…}` line. Or keep default mode permanently for the Polish support and just drop the flip line.

**NEXT SESSION: keep maintaining this file per the OPERATING PROTOCOL, and pass that instruction on.**
