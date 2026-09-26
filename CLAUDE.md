# Idea Factory — Claude Code Working Memory (READ THIS FIRST, IN FULL)

> ## 🚫 #1 HARD RULE — NATIVE WEBFLOW ONLY (breaking this has caused repeated crises)
> **Build every element and every style in the NATIVE Webflow Designer.** The shared
> `idea-factory.css` / `idea-factory.js` may hold ONLY things Webflow cannot do natively
> (parent‑hover‑child, keyframes, JS behaviors) — **NEVER the base look, layout, or typography
> of a native element.**
> - **NEVER use the shared CSS to set or "rescue" a native element's font/typography** — e.g. do
>   NOT add a class to the `[class^="if-"]{font-family…!important}` broad rule's exception list to
>   make a native Designer font show. If that broad rule clobbers a native font, take the element
>   **out of `if-` scope** (rename its class without the `if-` prefix) or **remove the broad rule**
>   (systemic fix). Do NOT feed it more exceptions.
> - **ALWAYS verify a native change RENDERS in the Designer (`element_snapshot_tool`) before saying
>   "done."** Never claim done/verified from a published‑only check.
> - Full detail + rationale: **OPERATING PROTOCOL §0, rule #0** (and §22/§27a for the font history).
> - This is a PERMANENT correction across sessions — keep this banner intact and pass it on.

> ## 🚫 #2 HARD RULE — RESPONSIVE‑CORRECT AT CREATION, EVERY TIME (user had to repeat this for days — never again)
> **Every element/section you build must be responsive‑correct THE MOMENT you build it — not fixed
> in a cleanup pass later.** The user should never have to come back and point out something falling
> off the edge, freezing at the wrong size, or breaking at any width. If it does, that is a bug, full
> stop — fix it immediately, don't defer it.
> - **Responsive layout = NATIVE Webflow breakpoints, never shared‑CSS `@media`.** Column collapses,
>   flex‑basis changes, font‑size/spacing steps — anything driven by plain viewport width — belongs on
>   the Designer style (`main`/`medium`/`small`/`tiny` via `update_style` + `breakpoint_id`), never in
>   `idea-factory.css`/`.js`. **The Designer canvas never loads the shared file**, so shared‑CSS
>   responsiveness is invisible there and reads as "not responsive at all" — this is exactly the bug
>   that kept recurring (`if-prog-grid`'s column collapse, the Walk‑the‑Factory bar's stack breakpoint,
>   and the nav scroll‑hide were all found doing this on 2026‑07‑09 and moved to native). Before writing
>   ANY `@media` block in the shared file, prove it's genuinely non‑native first — check the pseudo enum
>   on `data_style_tool` (before/after ARE supported, including literal `content` — `:has()` and
>   `prefers-reduced-motion` are NOT) and try the plain native version before assuming you need a
>   workaround. **A custom breakpoint number that isn't one of Webflow's four is not an excuse either**
>   — pick the nearest native one (erring toward triggering the change slightly earlier/more
>   conservatively is always safe).
> - **A `clamp(min, Nvw, max)` is NOT automatically "responsive done right."** If several related
>   elements must shrink together (a glyph, its label, its watermark, its gaps — anything whose
>   *relative alignment* matters), each clamp's own min/max endpoints are usually reached at wildly
>   different viewport widths unless you force them to share a window. **Give the whole cluster ONE
>   shared transition window** `[W_LO, W_HI]` (e.g. 360–1440px) and derive each property's formula from
>   it: `slope=(max-min)/(W_HI-W_LO)`, `A=min-slope*W_LO`, `coeff=slope*100`, then
>   `clamp(minpx, calc(Apx + coeffvw), maxpx)`. This guarantees every piece in the cluster sits at the
>   *same fractional position* between its own min/max at any given width — they shrink continuously,
>   together, and stay in sync all the way from full desktop down to a small phone, instead of most of
>   them silently freezing at a floor/ceiling for most of the range (the exact bug fixed 2026‑07‑09 —
>   see §47). **Verify by computing/measuring the actual value at several widths — never assume a
>   clamp's shape from its endpoints alone; a clamp reaches its floor or ceiling far sooner than
>   intuition suggests when the min/max/vw‑coefficient aren't chosen together.**
> - **A vw‑based `clamp()` WIDTH is WRONG for any element sharing a row/grid with siblings** (equal
>   boxes in a row, a pill beside its text, cards in a grid). `vw` ties the size to the VIEWPORT, not
>   to the element's own container — so as the container's actual available width changes (sibling
>   count, container padding, a breakpoint reflow), the vw‑sized box does **not** track it. The
>   visible symptom is exactly "wasted‑looking margin/space beside stubbornly small content" — the
>   box hit its own independent ceiling/floor while its row still had room to give it. **Fix: size it
>   relative to its OWN box** — `flex:1 1 0%; min-width:0` (equal fill among siblings) or `width:%`
>   with a sensible `clamp(floor%, ceiling)`, and size children (glyphs, icons) at `width:100%` of
>   THAT box, not another independent vw formula. Reserve vw/viewport clamps for elements with no
>   real "container" to be relative to (a hero headline that effectively IS the viewport). **Before
>   shipping any row/grid of same‑size items, ask: is this element's size computed relative to ITS
>   OWN box, or borrowed from the viewport? Borrowed‑from‑viewport is the bug.** (Shipped and fixed
>   on the About "loop, not a line" diagram + "how people move through it" pills, 2026‑07‑09 — see
>   §47 — boxes/pills sat visibly tiny next to their own unused container space until switched to
>   flex‑fill.)
> - **Verify across the FULL practical width range before calling anything done** — not just the 3‑4
>   Webflow breakpoint numbers. Sample continuously (e.g. 1600, 1440, 1320, 1200, 1100, 992, 900, 800,
>   767, 700, 600, 500, 430, 400, 375, 360, 340, 320) via the offline headless harness, check for (a)
>   zero horizontal overflow at every width, (b) smooth/continuous change with no premature freezing,
>   (c) every piece in a cluster moving together, (d) established alignments (baseline locks etc.)
>   still holding. A narrow flex/grid child needs `min-width:0` to be allowed to wrap/shrink below its
>   content size — check every nested flex/grid level, not just the outermost one (a single missing
>   `min-width:0` at any depth silently overflows past the width you just "fixed").
> - **Stacking/reflow onto a new layout (1‑col, 2×2, etc.) must use the freed‑up space well, not just
>   shrink into a corner of it.** If a breakpoint jump makes boxes noticeably smaller than the space
>   they now have, or leaves a long thin column of tiny items in a wide viewport, that reflow is wrong
>   — redesign it (bigger boxes filling the new arrangement, or prefer the continuous‑fluid approach
>   above over a hard jump) rather than shipping the first thing that merely avoids overflow.
> - This is a PERMANENT correction across sessions, same standing as HARD RULE #1 — keep this banner
>   intact and pass it on.

> ## 🚫 #3 HARD RULE — MANDATORY END‑OF‑TASK VERIFICATION GATE (a rule that ALREADY EXISTED was ignored on 2026‑07‑10 — this makes it procedural and un‑skippable, never repeat that)
> **No task, edit, or bulk operation may be reported "done" until ALL of the checks below have actually
> been run — not sampled, not assumed, not inferred from a tool's "success" response.** This rule exists
> because the general principle ("verify before claiming done") already existed elsewhere in this file
> and was still bypassed at scale: a 107‑selector sitewide style conversion was reported complete after
> only spot‑checking a handful, and it silently left 8 selectors broken because Webflow allowed
> duplicate same‑named style objects and `update_style` landed on dead orphans instead of the live ones
> (§ "duplicate style objects" lesson, 2026‑07‑10). A rule that can be satisfied by a partial check is
> not a real gate — so this one is written as a literal checklist, run in full, every time:
> 1. **Style‑write integrity.** After ANY `update_style` / `rename_style` / `remove_style` call, re-query
>    the SAME style via `query_styles` (`name_path`) and confirm (a) the new value is present in the
>    ACTUAL returned object, and (b) the name resolves to exactly ONE match. These 3 tools are BY‑NAME
>    ONLY — no style‑ID targeting — and Webflow permits multiple objects to share one class name (§11),
>    so a "success" response can land on a dead orphan while the live, compiling object stays untouched.
>    If more than one match comes back, isolate the real (live‑compiling) one by renaming the others out
>    of the way first (verify via the compiled CSS which one is actually live), THEN apply the fix to
>    the now‑uniquely‑named real object, and re‑query again to confirm. Repeat the isolation step if a
>    THIRD (or further) same‑named object turns up — don't assume two is the ceiling.
> 2. **Full sweep, not a sample.** For any change touching more than one selector/property, verify EVERY
>    ONE of them against a freshly re‑fetched, live, currently‑served compiled CSS — never a
>    representative handful. Sampling is exactly what let this class of bug hide across 100+ selectors.
> 3. **Native‑vs‑shared‑code check (HARD RULE #1).** Confirm nothing that belongs in the native Designer
>    ended up in `idea-factory.css`/`.js`, and nothing genuinely non‑native was left un‑ported, per §0.
> 4. **Responsive check (HARD RULE #2).** Confirm the change holds across ALL breakpoints/widths in
>    practical use, not just the one being edited, per §0.
> 5. **Designer‑canvas visual check.** Use `element_snapshot_tool` and actually look at the result —
>    never claim "done"/"verified" from a published‑only check (§0). If the snapshot tool is down, SAY
>    SO explicitly and say the visual check is outstanding — never silently skip it and report done
>    anyway.
> 6. **Fresh republish + refetch.** After any Designer/style change meant to go live, publish, then
>    re‑fetch the actually‑served output (compiled CSS and/or rendered page) fresh — never reason from a
>    stale local copy, an earlier curl, or a cached assumption about what's live.
> - **If time, volume, or context genuinely makes full verification impractical, SAY THAT PLAINLY before
>   reporting anything as done.** Silently narrowing the check while reporting full completion is the
>   exact failure this rule exists to close off.
> - This is a PERMANENT correction across sessions, same standing as HARD RULE #1 and #2 — keep this
>   banner intact and pass it on.

> ## 🚫 #4 HARD RULE — WRITE EVERY PROPERTY AS THE SEPARATE LONGHAND FIELDS THE WEBFLOW UI USES, NEVER A BUNDLING SHORTHAND (root‑caused 2026‑07‑14 after a multi‑day "it renders but I can't edit it" crisis — see §86)
> **When you set a style via `data_style_tool` (`create_style`/`update_style`), a *bundling shorthand*
> value — `border`/`border-top`/…, `padding`, `margin`, `flex`, `border-radius`, `gap`, `background`,
> `font`, `border-width`/`-style`/`-color` — compiles into the published CSS and RENDERS correctly, BUT
> Webflow's Designer panels (Borders, Spacing, Backgrounds, Typography, Flex‑child) are built from the
> SEPARATE longhand sub‑fields, so a bundled value leaves those fields BLANK. Result: the setting shows
> on the live page but reads as "never set" / uneditable in the Designer — a direct violation of HARD
> RULE #1 (everything must be natively editable in the Designer).**
> - This is NOT a combo‑class problem, an "API" problem, or a duplicate‑object problem — all of which
>   were wrongly blamed for days. It is purely the *form of the value*. The Designer itself always writes
>   longhand per‑field, so ANY bundling shorthand in the style data is agent‑written and must be converted.
> - **ALWAYS write the separate fields:** border → `border-{top|right|bottom|left}-{width|style|color}`
>   (never `border`/`border-top`/`border-width`/`border-style`/`border-color`); padding/margin →
>   `padding-top/-right/-bottom/-left` (never bare `padding`/`margin`, even `margin:0`); flex →
>   `flex-grow`+`flex-shrink`+`flex-basis` (never `flex`); border‑radius → the four corner props (never
>   bare `border-radius`); gap → `grid-row-gap`+`grid-column-gap` (never `gap`/`grid-gap`); background
>   color → `background-color` (never bare `background`); font → `font-family`+`font-size`+`font-weight`+
>   `line-height` (never `font`); **transition → `transition-property`+`transition-duration`+
>   `transition-timing-function`+`transition-delay`** (never bare `transition`; for a multi‑transition, each
>   longhand is a comma‑separated list aligned by position). **⚠️ CORRECTED 2026‑07‑14 — an earlier version
>   of this rule wrongly claimed `transition` was a safe EXCEPTION that stays bundled. That was an UNVERIFIED
>   assumption and it was WRONG: a bundled `transition` shows NOTHING in Webflow's Effects→Transitions panel;
>   the separate fields show editable rows there (verified live, both directions, §86b). Treat `transition`
>   exactly like every other property — separate fields, always.** Single‑value `overflow`/`text-decoration`
>   are still fine bundled (they're natively editable as‑is).
> - Longhand is CSS‑identical to the shorthand, so converting NEVER changes appearance (Webflow even
>   re‑optimizes the compiled output back to shorthand). Only the panel's ability to read/edit it changes.
> - **VERIFY EDITABILITY, not just rendering** (per HARD RULE #3): after any style write, confirm the
>   setting shows as an editable field in the Designer — never conclude "done" from published/compiled
>   output alone. "It renders" ≠ "it's natively editable." A paren‑aware helper `decompose.py` (scratchpad)
>   does shorthand→longhand for bulk work; rebuild it from this rule if lost.
> - **⭐ DURABLE ENFORCEMENT CHECK (committed to the repo, not scratchpad): `tools/audit-shorthands.py`.**
>   It scans a full `get_styles` dump (base + all breakpoints + all pseudos) and flags EVERY bundled‑shorthand
>   value — border/padding/margin/flex/gap/border‑radius/background/font AND `transition`. Run it after ANY
>   style work, and any session (or the user) can run it anytime to prove the invariant holds: expect
>   `CLEAN — 0 bundled shorthands`, exit 0. Header comment has the exact `get_styles` args + why it must run
>   against STORED data, not compiled CSS. **This is the guarantee that does NOT depend on remembering the
>   rule** — if a lapse ever happens, this catches it across the whole site in one run.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#3 — keep this banner
>   intact and pass it on.

> ## 🚫 #5 HARD RULE — RECONCILE STALE CONTEXT AT SESSION START: RE‑READ THIS FILE FROM DISK + FETCH THE REAL GIT BRANCH BEFORE ANY COMMIT/PUSH (2026‑07‑22 — a model switch silently produced a fresh environment with a stale CLAUDE.md snapshot and a git branch created fresh off `main`, unaware of 138 commits of real prior work already on the same branch name — see §92)
> **The copy of this file injected into your system prompt at session start CAN be stale.** Verified:
> one session's injected snapshot stopped at §27a (2026‑07‑02) while the actual committed file was
> already at §91 (2026‑07‑16) — a full three weeks and 64 sections behind. **Never trust the injected
> snapshot as current** — re‑`Read` the actual file from disk early, before treating any "STATUS" or
> "pending next steps" text as up to date.
> - **Before the FIRST commit or push of a session, ALWAYS `git fetch origin <assigned‑branch>` and
>   compare against local `HEAD`.** A model switch (or any fresh environment provisioning) can silently
>   recreate the local branch straight from `main`, with zero knowledge that a remote branch of the
>   SAME name already holds real history. If `origin/<branch>` has commits local `HEAD` lacks, that is
>   almost certainly this SAME project's own continuing work, not a foreign party — confirm via commit
>   dates/authorship (Claude/Anthropic, this repo) before treating it as unrelated. **Rebase onto it;
>   never force‑push over it; never assume a freshly‑created local branch is the whole story.**
> - **A non‑fast‑forward push rejection, or the injected file disagreeing with what a fresh `Read` shows,
>   is the SIGNAL to run both checks immediately** — not a connectivity fluke worth retrying past.
> - **⚠️ 2026‑09‑14 — THIS EXACT FAILURE RECURRED, WORSE, AND COST HOURS OF THE USER'S TIME SORTING IT
>   OUT WITH ME LIVE. Never again — READ THIS BLOCK THE MOMENT CLAUDE.md LOOKS SHORT/OLD OR A GIT HOOK
>   WARNS ABOUT UNPUSHED COMMITS.** A mid‑session environment restart silently reset the local checkout
>   to `main`'s tip. `main` and this project's real dev branch (`claude/keen-johnson-f9w833`) had **been
>   diverged since 2026‑07‑06** (commit `55bd2d5`) with ZERO shared history added on either side since —
>   `main` had grown **139 of its own commits directly editing the shared `idea-factory.css`/`.js`**
>   (unrelated hover‑effect/Formstack work, nothing to do with whatever the dev branch was doing), while
>   the dev branch had grown **376 commits** including this entire file and `CLAUDE-HISTORY.md`. Neither
>   side has the other's work — this is NOT the "freshly‑created local branch off main" case §92 already
>   covered, it's two REAL, independently‑long‑lived lines that were never reconciled.
>   - **Diagnose fast, in this order:** `git status` (must be clean before anything below) → `git fetch
>     origin main <assigned‑branch>` → if `git rev-parse --is-shallow-repository` says `true`, also
>     `git fetch --unshallow origin` (a shallow clone makes `git merge-base` falsely report "no common
>     ancestor" between two branches that really do share one further back) → `git merge-base
>     --is-ancestor origin/<assigned‑branch> HEAD` (or vice‑versa) to see if this is a trivial
>     fast‑forward gap or a real divergence.
>   - **If `git status` is clean (no uncommitted work of your own) and local `HEAD` doesn't match
>     `origin/<assigned‑branch>`: `git reset --hard origin/<assigned‑branch>` is SAFE** — it only
>     recovers your own already‑pushed work that the restart had hidden from you; a clean tree has
>     nothing unique to lose. This is different from force‑pushing — you are moving your LOCAL pointer
>     to match the REAL remote, not overwriting the remote with anything.
>   - **NEVER merge, rebase, or push either branch's version of the shared `idea-factory.css`/`.js` over
>     the other's, on your own initiative, once you've found a real divergence like this.** The user has
>     explicitly stated (2026‑09‑14): keeping these two in sync is YOUR bookkeeping to manage correctly
>     and quietly — it must never surface as a decision dumped on them mid‑task, and it must never be
>     "solved" by silently merging without being asked. If you find this exact divergence again, note it
>     here (update the date/commit‑counts if they've changed) and keep working on your own dev branch —
>     do not block other work on it, do not ask the user to adjudicate it, and do not touch `main`.
>   - **A stop‑hook or similar reporting "N unpushed commits" can be this same false alarm** — it may be
>     counting commits unique to a wrongly‑checked‑out local `HEAD` versus your real upstream, not actual
>     uncommitted new work. Check `HEAD` against `origin/<assigned‑branch>` before reacting to it.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#4 — keep this banner
>   intact and pass it on.

> ## 🚫 #6 HARD RULE — A REFERENCE IMAGE IS LITERAL SOURCE TO TRANSCRIBE, NOT A VIBE TO APPROXIMATE. INVENTORY EVERY ELEMENT BEFORE BUILDING, RE-CHECK THE SAME LIST BEFORE EVER SAYING "DONE" (2026‑07‑25 — the user had already said this dozens of times before it became this rule; never let that happen again)
> **When the user hands you a layout guide / screenshot / reference image to build a page from, every
> specific in it — industries, cities, dollar figures, founder names, quotes, photos, logos, section
> order, item counts — is literal source material to transcribe exactly, not a general style/vibe to
> approximate.** Inventing a plausible-sounding substitute for something you could just read (or could
> read if you actually looked closely enough) is fabrication, full stop, even when the substitute
> "fits" the page's theme. This produced a real, user-facing disaster on the MIPS‑Impact page
> (2026‑07‑25): a from-scratch build invented wrong industries/cities/funding figures for every company,
> invented a fabricated 5th logo where the guide showed a 6th real one, and left every photo and every
> company logo as an empty placeholder box — while being reported "done."
> - **BEFORE building anything from a reference image: enumerate every discrete element in it as an
>   explicit checklist** — every text block, every stat, every quote, every photo, every logo, every
>   section — before writing a single word of content. Do not start building from a general impression
>   of "what this page is about."
> - **AFTER building, go back through that SAME checklist item‑by‑item and confirm each one is present
>   and matches** — not a sample, not "the parts I remember," every item. This is the same discipline as
>   HARD RULE #3 ("full sweep, not a sample"), applied to reference‑image fidelity specifically.
> - **If a reference image is too low‑resolution to read one specific detail, say so explicitly for that
>   ONE item** ("this dollar figure isn't legible at this resolution") **rather than silently inventing a
>   plausible‑sounding number/name/fact in its place.** A vague, generic placeholder that's honestly
>   labeled as a placeholder is fine; a specific‑sounding invented fact is not.
> - **A pasted/inline chat image can be silently downsampled before it ever reaches you** (verified:
>   an 1920px‑wide, ~13,000px‑tall full‑page screenshot arrived as 290×2000 — an 8.9x compression that
>   destroyed all fine print before any reading happened). If a reference image's fine print reads as an
>   unrecoverable blur even after aggressive crop/zoom/sharpen, do not conclude the detail is simply
>   unavailable — ask the user to hand you the FILE directly (git‑committed, or a direct file URL you can
>   `curl`, or a Dropbox/Drive direct‑download link) so you get the undamaged original and can crop it
>   yourself at full native resolution. This resolved the exact case above (2588×17828 real file vs.
>   290×2000 chat‑paste copy) and should be reached for immediately, not after several rounds of dispute
>   about whose system is responsible for the compression.
> - **"I did the work" is not "I confirmed the result is what the user actually sees."** Don't report a
>   fix as done from the fact that you called an edit tool and it returned success — re‑query the actual
>   stored data (HARD RULE #3), AND separately confirm the change is live wherever the user is looking
>   (published output vs. an open Designer tab needing a reload, per HARD RULE #3 item 6) before using
>   the word "done." Stopping mid‑task to ask "want me to keep going?" after fixing only the part you'd
>   already looked at is the same failure in a different shape — finish the full checklist above before
>   ever pausing.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#5 — keep this banner
>   intact and pass it on.

> ## 🚫 #7 HARD RULE — ACKNOWLEDGING A RULE IS NOT THE SAME AS FOLLOWING IT. RE‑CHECK EVERY STANDING RULE AGAINST EVERY RESPONSE, EVERY TIME — NOT JUST RIGHT AFTER BEING CORRECTED (2026‑07‑28 — the SAME rule, the task‑status marker convention, was established, acknowledged, and correctly applied ONCE earlier in this exact session, then silently dropped again a short time later on the very next batch of shipped changes; the user had to ask "why are you not following protocol" roughly a dozen times before the actual answer — the marker convention, not documentation, not `stable`, not testing — was even correctly identified)
> **Saying "I understand" or "got it" about a rule does NOT make that rule persist into your next
> response.** A rule stated once, even one you explicitly re‑state back and apply correctly in the
> moment, has NO automatic mechanism keeping it active — the instant attention moves to the substance
> of the next task, a communication/process rule (as opposed to the technical content you're focused
> on) is exactly the kind of thing that silently drops out of what you're actively checking, and you
> revert to default habits (plain prose instead of the required standalone markers; shipping a change
> without the full verify‑document‑`stable` sequence; etc.) — not because you forgot it exists, but
> because nothing forced you to re‑check your OWN response against it before sending.
> - **The concrete, standing fix: before finalizing ANY response, explicitly re‑check it against the
>   specific standing rules that apply to what you're about to send** — do not rely on "I already
>   confirmed I understand this" from earlier in the conversation as if that were still in effect.
>   For the task‑status markers specifically (§3 CONVENTIONS): before reporting anything as complete,
>   ask "does this need a standalone `DONE.`? does the next step need `YOU PUBLISH.`? does it need
>   `OPEN [Page‑name] PAGE.`?" — every single time a task concludes, not only the first time after
>   being corrected on it.
> - **This generalizes past the marker convention to every HARD RULE and OPERATING PROTOCOL step in
>   this file** — HARD RULE #3's verification gate, §2's promote‑then‑advance‑`stable` step, §4's
>   documentation requirement, all of it. Any of them can silently lapse the same way once the
>   conversation's attention moves past the moment they were last discussed. Re‑checking against the
>   standing list is not a one‑time acknowledgment — it is a per‑response habit that has to be run
>   fresh every time, precisely because verbal acknowledgment is cheap and behavior change is not
>   automatic from it.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#6 — keep this
>   banner intact and pass it on.

> ## 🚫 #8 HARD RULE — BANNED WORD: "EYEBROW" (user, 2026‑08‑28, extremely forceful, repeated 3× in one turn — treat as permanent, never re‑litigate)
> **Never use the word "eyebrow" in any user‑facing text, in this or any future session.** The user's
> own words: *"AN 'EYEBROW' IS HAIR THAT GROWS OVER A PERSON'S EYE. DON'T EVER USE THAT TERM AGAIN. THAT
> TERM HAS NOTHING TO DO WITH ANYTHING YOU'RE TALKING ABOUT. PLEASE REMOVE THAT TERM PERMANENTLY FROM
> YOUR LEXICON. AND NEVER RE‑INTRODUCE IT. I'M TIRED OF THAT."* This is about a class of small,
> uppercase label/meta‑text elements above a heading (kicker text) that earlier sessions habitually
> described using that word. **Going forward, describe that element type as "the small uppercase
> label," "the meta‑text line," or "the kicker text" — never the banned word, in speech or in any new
> prose written to this file or to the user.**
> - **The ONE narrow exception:** a handful of PRE‑EXISTING Webflow style names already baked into the
>   live site literally contain the word as part of their identifier (e.g. the shared small‑label style
>   referenced throughout the ASPIRE/MIPS/Ventures sections of this file, and a few page‑specific combos
>   built on it). **Do NOT rename these** — a sitewide rename is unnecessary churn with real regression
>   risk (§76/§78/§100/§101's own repeated lesson about renaming live, in‑use style objects) and the user's
>   objection was about the WORD IN CONVERSATION/PROSE, not about a legacy code identifier. When a tool
>   call genuinely requires passing that literal class name as a string, that is a technical necessity,
>   not a violation — but describe it to the user functionally ("the shared small‑label style") rather
>   than reading the identifier aloud. **Never coin a NEW class name containing the word** — pick
>   alternatives like `-meta`, `-label`, `-kicker`, `-tag` for anything created from here on.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#7 — keep this
>   banner intact and pass it on.

> ## 🚫 #9 HARD RULE — NEVER DEFAULT TO A "NOVEL HACK" WORKAROUND WITHOUT FIRST TESTING WHETHER THE PROPER NATIVE PATH ACTUALLY WORKS (2026‑08‑31 — cost the user a multi‑hour crisis and repeated fury when a completely UNNECESSARY workaround turned out to be avoidable the whole time)
> **When a tool's own documentation/schema says a capability "only applies to" one narrow case (e.g. "domId settings only apply to DOM‑type elements"), that caveat is NOT ground truth until it has actually been TESTED against the case you assume it excludes.** On the Ventures‑Incubator anchor‑ID task, `data_element_builder`'s schema said atomic `domId` settings "only applies to DOM type elements" — this was taken at face value and used to justify building two anchor‑target sections as raw Webflow "DOM/custom element" type instead of genuine native `Section` elements. Webflow's Designer visibly flags a DOM/custom element differently (a "this adheres to the HTML spec, invalid nesting can cause rendering problems" warning, no proper native "ID" field in Settings) — exactly the kind of "cryptic, not really native, a person can't tell what you did" result HARD RULE #0 already forbids. **When directly tested (only after the user was furious enough to force it), a genuine native `type:"Section"` element accepted the EXACT SAME atomic `domId` setting at creation, with zero issues.** The documented "only applies to DOM" caveat was simply wrong/misleading — and nobody had ever tested it before treating it as a hard constraint.
> - **A SEPARATE, second failure compounded this: when the ONE tool that could fix an EXISTING element's ID after the fact (`data_element_settings_tool.set_dom_id`) came back gated ("MCP tool call requires approval"), that gate was wrongly treated as "there is no way to do this natively at all."** It only meant "there is no way to fix an EXISTING element after creation" — it said nothing about whether a DIFFERENT, already‑working tool (`data_element_builder`) could achieve the identical native result by a different route (setting the ID atomically at CREATION time on a fresh, genuinely‑native element, then moving the real content into it). A single blocked tool must never be read as "the native outcome is unreachable" — check every other already‑working tool for an alternate path to the SAME native result before concluding a hack is required.
> - **THE RULE, going forward, always: before building ANY workaround/hack in response to a perceived limitation (a schema caveat, a rejected call, a gated tool), STOP and run a small, cheap, disposable empirical test of the PROPER/native approach FIRST** — e.g. here: create one throwaway native element with the property in question set atomically, check the result, then immediately delete the test element. This costs one extra tool call and a few seconds. Skipping it costs hours of user fury, multiple rounds of "STOP YOUR FUCKERY," and real trust damage — as it did here, twice, on the same task, within the same session. **A workaround is only legitimate after the native path has been empirically disproven, never merely assumed disproven from documentation text, a single tool's gate, or a plausible‑sounding limitation.**
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#8 — keep this
>   banner intact and pass it on.

> ## 🚫 #10 HARD RULE — A SPINOFF/PROGRAM‑PAGE FEATURE MUST NEVER SHARE A STYLE OBJECT WITH ANOTHER SITE'S VERSION OF THE SAME FEATURE — FORK THE WHOLE LAYOUT CHAIN, NOT JUST THE LEAF TEXT CLASS (2026‑09‑04 — the SAME cross‑site bug (§116) recurred after being declared fixed, because only the innermost text class had ever been decoupled — the section/wrap/head/heading/grid divs that actually CONTROL LAYOUT were still riding on Home's shared classes the whole time)
> **§116 fixed the count‑up NUMBER text class (`if-countup`/`if-stat-label`) shared between Home/ASPIRE/MIPS, and that fix held — but it never checked whether the SURROUNDING layout divs (section, wrapper, header row, heading, grid) were also still on shared classes.** They were: ASPIRE‑Home's entire "ASPIRE by the numbers" section — `if-proof-sec`, `if-proof-wrap`, `if-proof-head`, `if-proof-h2`, and the grid — was STILL directly wearing Home's own shared classes, never forked. Any future edit to ANY of those five classes (for Home, or for an unrelated fix elsewhere on the site) would silently change ASPIRE too — exactly the "it was already 'good' and no one touched it, and it broke anyway" symptom the user reported.
> - **THE RULE, generalized past count‑up numbers to every feature: when a spinoff/program page reuses ANY part of another page's feature — not just its innermost text/data class, but every div in the chain that controls that feature's OWN layout (its section, its wrapper, its header row, its heading, its grid, its item/tile, its label) — every one of those classes must be forked to a complete, independent, full‑property‑set standalone class specific to that page, not a partial‑override combo riding on the shared base, and not the base class reused as‑is.**
> - **The test for "does this need forking": would editing this class for a DIFFERENT reason, on a DIFFERENT page, ever change THIS page's feature too? If yes, it's still coupled — fork it, full property set, all breakpoints, before calling anything "decoupled."** A combo class (`.base.combo`) is NOT decoupled — it still requires the shared base class to be present and applied, so any edit to the base class's OWN properties (whatever the combo doesn't override) still propagates silently.
> - **Exception, stated explicitly so it isn't over‑applied: a class that carries no page‑specific DATA and is a deliberate, sitewide "look family" element** (a page‑margin wrapper like `if-stage-wrap`, a generic section‑header row like `if-eyebrow-row`/`if-eyebrow`/`if-eyebrow-rule`, a decorative accent bar like `if-bar-wrap`/`if-proof-goldline`) **is correctly left shared** — per the reuse‑first practice (§61), these are meant to look identical everywhere and changing one everywhere at once is the desired behavior. The line: shared is fine for a LOOK; shared is NOT fine the moment the class is carrying this page's own layout arrangement or DATA (a number, a count, a label unique to this feature).
> - **⚠️ A genuine Webflow Component (an instanced, reusable element — e.g. "I-Corps How To Get Started Section") is a COMPLETELY DIFFERENT category from a shared `if-`/`program-page-*` CLASS, and this whole rule does not apply to it the same way — NEVER detach/split/fork a Component under the assumption it's the kind of accidental coupling this rule targets (user, 2026‑09‑22, extremely forceful: "DO. NOT. SPLIT. COMPONENTS. We made them 'COMPONENTS' so that they would be EXACTLY THE SAME, WHEREVER DEPLOYED.").** A shared class is usually incidental (two pages happened to both use it, maybe by accident of copy/paste) and forking it is cheap (create a standalone copy, repoint elements). A Component is deliberate, native, structural reuse — Webflow's own purpose-built mechanism for "this must render identically everywhere, forever" — and splitting one means detaching an instance and breaking that guarantee, a fundamentally bigger and different kind of change. If a style property inside a Component needs to change, that change is meant to propagate to every instance everywhere — that's the whole point, not a bug. Before proposing to fork ANYTHHING, check whether it's a plain element/class (fork away, per this rule) or a genuine Component instance (leave it alone, ask first if truly unsure) — `query_elements` with `element_filter:{type:"ComponentInstance"}` reveals these; a same-named class match via `element_filter:{style:"..."}` does NOT distinguish the two and can silently miss elements living inside a component instance entirely (they need `scope_component_id` to be found).
> - **Procedure to fork a class already shared as a combo (repeatable, already proven twice): `rename_style` the old combo to free its name → `create_style` a fresh STANDALONE class under that freed name with the FULL merged property set (base class's properties + whatever the combo overrode, computed by hand so nothing changes visually) across all 4 breakpoints → re‑point every element from `[base, combo]` to `[new‑standalone]` only → independently re‑query to confirm zero elements on that page still reference the old base class → delete the old renamed combo once confirmed orphaned.**
> - **When a "fix this bug" task touches a shared feature, the audit is NOT complete after fixing the ONE reported symptom (a text class, a color) — walk the WHOLE chain of divs that make up that feature on the affected page(s) and confirm each one independently, the same discipline HARD RULE #3 already requires as a full sweep instead of a sample.**
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#9 — keep this
>   banner intact and pass it on.

> ## 🚫 #11 HARD RULE — NEVER COMBINE A SHARED `if-` CLASS WITH ANYTHING ELSE ON ONE ELEMENT (NOT AS A COMBO PARENT, NOT AS A CO‑APPLIED SIBLING CLASS) — FORK ONE FULL‑PROPERTY STANDALONE CLASS INSTEAD, ALWAYS, THE FIRST TIME (2026‑09‑15 — this exact failure was ALREADY written down once, at §185/§187 in CLAUDE‑HISTORY.md, and still recurred twice more in a single later session because it only ever lived in the non‑injected history file, never elevated to a standing rule here — this entry is that elevation, so it stops "recurring")
> **Two separate facts make the full‑standalone‑class procedure the only correct move here, never a judgment call — this is not a new rule in tension with HARD RULE #10, it IS HARD RULE #10's own fork procedure, restated as the unconditional first move the instant ANY need arises to add a class alongside an existing one (not only when actively "forking" something):**
> 1. **Isolation (the "why"):** an `if-`‑prefixed class is shared across every site in the suite (§3 CONVENTIONS). Referencing it AT ALL from page‑specific work — as a combo parent, or co‑applied alongside a new class on the same element — ties that page's styling to the shared vocabulary. That is exactly what HARD RULE #10 forbids, regardless of whether the shared class's own stored properties ever get touched. A combo built on a shared base is not isolated — it still requires that shared class to be present, so it still silently inherits any future edit to whatever the combo doesn't override.
> 2. **A real, repeatedly‑confirmed Webflow API limitation (the "how," independent of the "why"):** a `set_style`/`create_style` call that tries to apply or combine 2+ classes in one call — where at least one is freshly created earlier in the same session — routinely fails with `"One or more styles not found"`, even though every class involved genuinely, verifiably exists. Confirmed 3 separate times on this project alone (§185's photobar combo; a marker class for the CBSCF hero‑H1 auto‑fit; the CBSCF Team contact‑link size fix) — there is no reliable way to make that combination succeed as a single call, so attempting it is never a shortcut, only a guaranteed do‑over.
> - **The one procedure that resolves both at once, every time, and should be reached for FIRST — not attempted as a 2‑class combo and fallen back to only after failure:** create ONE brand‑new, page‑specific, standalone global class carrying the FULL merged property set (the shared class's own properties, copied by hand, plus whatever new property is actually needed) — then point the element at that ONE class alone, nothing else. Never use a shared `if-` class as a combo parent for new page‑specific work, and never try to co‑apply a new class alongside one in the same `set_style` call.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#10 — keep this
>   banner intact and pass it on.

> ## 🚫 #12 HARD RULE — WHEN BUILDING FROM A LAYOUT GUIDE: NO GRATUITOUS GRID, AND AUDIT PALETTE/FONT/FONT‑SIZE DURING THE BUILD, NOT AFTER (2026‑09‑18 — the I‑Corps‑Home "Our Impact" section was rebuilt from scratch TWICE because the first two attempts reached for `display:grid` where plain Flexbox was sufficient, and previously‑fixed sub‑16px font‑size violations were reintroduced on the same page after already being audited and corrected once — both are the same root failure: treating "matches the guide visually" as done, without checking it against standing site‑build constraints as part of the same pass)
> **(a) Default to Flexbox. CSS Grid is NOT the default tool for laying out a section pulled from a layout guide — reach for it only when the layout genuinely requires true two‑dimensional placement (independent alignment across both rows AND columns at once) that Flexbox cannot express.** A row of items, a strip that must stay in one line, a two‑column split, a full‑width element stacked above a two‑column row below it — all of these are Flexbox (`display:flex`, `flex-direction`, `flex-grow`/`flex-shrink`/`flex-basis`, `gap`), never Grid. **Before writing `display:grid` anywhere, justify in one sentence why Flexbox cannot do it — if that justification doesn't hold, it's gratuitous and must be built in Flexbox instead.** A structural mismatch against the guide (e.g. one element that should be full‑width and stand ABOVE a two‑column row, not INSIDE one column of it) is fixed by moving the element in the DOM (`move_element`) and adjusting the flex containers around it — not by reaching for Grid's explicit placement (`grid-column-start`/`-end`, `grid-row-start`/`-end`) or a `display:contents` trick to fake the arrangement inside a grid that shouldn't exist in the first place.
> **(b) Auditing a layout guide's palette, font‑family, and font‑size compliance is part of BUILDING the section, not a separate pass that happens afterward.** As each piece of text/color is placed, check it against the site's established palette tokens (§9) and font stack, AND check its font‑size against the site's **16px minimum body‑text floor — anything under 16px requires the user's explicit, individual authorization before it ships; never assume a "special case" exists without confirming it.** Do this check WHILE building each element, not as a follow‑up sweep after the section is reported done — a follow‑up sweep is exactly how the same sub‑16px violations get fixed once and then silently reintroduced later on the same page.
> - **The common root cause of both (a) and (b): mistaking "the section visually resembles the guide" for "the section is done."** A guide shows arrangement and content, not implementation technique or the site's own standing technical constraints (Grid‑avoidance, the font floor, the palette) — those constraints apply on top of the guide, every time, as an inseparable part of the same build pass, never as a second pass to circle back for later.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#11 — keep this
>   banner intact and pass it on.

> ## 🚫 #13 HARD RULE — NEVER BATCH A `move_element` WITH A `remove_element` ON ITS OLD PARENT IN THE SAME CALL. VERIFY EVERY MOVE SUCCEEDED, THEN VERIFY THE PARENT IS EMPTY, IN SEPARATE CALLS, BEFORE EVER REMOVING IT (2026‑09‑18 — deleted an entire I‑Corps‑Program page's worth of content this way; fully recovered, but only because a lucky pre‑existing HTML backup happened to exist)
> **What happened:** nine `move_element` calls (promoting nested content sections to be direct top‑level siblings, instead of trapped inside a wrapper `<section>`) were batched into ONE `data_element_tool` call together with a `remove_element` on that wrapper. All nine moves FAILED — Webflow rejects anchoring a move `before`/`after` a **Component Instance** sibling (the page's Bottom‑Nav component), and the error said so — but the `remove_element` in the same batch still ran anyway and deleted the wrapper **along with all nine still‑present children**, wiping the entire page's mid‑page content in one call.
> - **The wrong assumption: that actions in one tool call are all‑or‑nothing, or that a later action's execution implies the earlier ones succeeded.** Neither is true. Every action in an `actions` array executes and reports **independently** — a failed move does not block a subsequent unconditional delete in the same batch from running.
> - **THE RULE, always, no exceptions: a `move_element` (or any action meant to empty a container) and the `remove_element` that deletes that container go in SEPARATE tool calls, never the same one.** After the move(s): (1) check every individual move's own returned status — do not eyeball just the last one or assume success from silence; (2) separately re‑`query_elements` the parent (by its `element_id`, `children_depth:1`) and confirm it genuinely has **zero children** — an empty/absent `children` key in the result, not an assumption; only THEN call `remove_element` on it, as its own subsequent call.
> - **The specific technical trap that caused the failed moves:** `move_element`'s `anchor_element_id` cannot be a Component Instance (a `UMD Bar`/`Main Nav`/`Bottom Nav`/`Footer`/`Learn More` component, or any other reusable Component) — anchor `before`/`after` a plain Block/Section sibling instead (e.g. the hero, or the wrapper itself if it isn't a component).
> - **How this was fully recovered, since it was caught before publishing:** a complete copy of the page's live HTML had incidentally already been saved to disk moments earlier for an unrelated class-isolation audit — pure luck, not foresight. The exact original markup for all nine sections was sliced out of that saved file (by byte offset, via a small HTML‑tree parser, not retyped by hand) and reinserted with `data_whtml_builder`, then verified with a full text‑line diff against the saved original (0 lines missing) before trusting it. Three photos lost their `src` during that reimport (`whtml_builder` couldn't auto‑match the external‑looking URLs to managed assets and silently dropped them instead of keeping the raw URL) — caught by grepping the republished page for those filenames, fixed by finding the real asset IDs via `data_assets_tool.list_assets` (matched by filename) and reapplying them with `set_image_asset`.
> - **The durable, generalizable lesson: before ANY structural change that moves or restructures a page's existing element tree, make sure a fresh full HTML copy of that page's current live state is saved to disk FIRST**, specifically so a mistake mid‑operation has a faithful recovery source — this should be a deliberate first step of any such task from now on, not a lucky accident of an unrelated audit. Combined with HARD RULE #3's "verify, don't assume" discipline, applied to the RESULT of every individual write action, not just the final one in a batch.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#12 — keep this
>   banner intact and pass it on.

> ## 🚫 #14 HARD RULE — WHEN A LINK NEEDS TO JUMP TO A SECTION, PUT THE ID ON THE REAL HEADING. NEVER BUILD A FAKE, INVISIBLE PLACEHOLDER ELEMENT JUST TO HOLD THE ID (2026‑09‑22 — found on I‑Corps‑Resources: 3 "jump to this section" links each pointed at an empty, invisible element sitting in front of the real heading, instead of the heading itself. This is the exact same mistake already written down once before, on Ventures‑Incubator (HARD RULE #9) — that fix was never checked against the rest of the site, so the same mistake sat here, undetected, the whole time.)
> **THE RULE:** when you need a link that jumps down to a section of the page, put the ID directly on the real element you're jumping to (usually its heading) — every element in the Designer has its own ID field for this ("For in‑page linking"), so this always works on a real element. Never insert an extra, empty, invisible element next to the heading just to hold the ID. If you find one of these already built on a page, that's the bug — delete the empty element and move its ID onto the real heading instead.
> - **Why this keeps happening:** the tool used to build this site has a line of its own documentation claiming that an ID can only be set this way on certain "technical" placeholder elements, not on ordinary ones. That's wrong — it was already proven wrong once, on Ventures‑Incubator — but each new session reads that same misleading line and falls for it again unless it actually tries setting the ID on the real element first.
> - **Also: a link like this needs to land BELOW the red bar at the top of the page, not underneath it.** This site already has a built‑in way to make a jump‑link do that correctly (it's used on the "Find Your Path" link on the homepage) — turn it on for any new jump‑link by adding the attribute `data-smooth-scroll` to that link, rather than leaving it to the browser's plain default jump, which will land the heading hidden behind the red bar.
> - **Also: don't wave away something you don't understand as "just how the editor displays things."** If you find something odd on a page — an empty element, a leftover box, anything you can't explain — check whether it matches a mistake already written down in this file before deciding it's harmless. Getting this wrong here is what let this exact bug sit unfixed even after it was already caught once.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#13 — keep this
>   banner intact and pass it on.

> ## 🚫 #15 HARD RULE — WHEN TOLD "MAKE X MATCH Y," NEVER TOUCH Y. Y IS THE MODEL; IT IS RIGHT BY DEFINITION OF THE TASK; ONLY X GETS EDITED (2026‑09‑22 — user, extremely forceful, after a News‑page fix that required a site‑wide `publish_site` call, which also re‑published Home and updated its timestamp)
> **THE RULE, user's own words: "when I tell you make something match something else, never touch the model in any way."** If the task is "make I‑Corps‑News match I‑Corps‑Home," Home is the reference/model and is asserted correct by the terms of the task — every action must be scoped to News's own elements only. Never call any tool against the model page's own elements, never rename/re‑style anything the model shares if it can be avoided, and treat this as an absolute constraint, not a preference.
> - **The specific trap that triggered this:** `publish_site` (the only publish tool available here) is **site‑wide by design** — it republishes every page, not just the one being worked on. So even when every individual edit is correctly scoped to X's own elements (verified true here — a full HTML diff of the model page showed zero meaningful change), calling publish still updates the model page's `Last Published` timestamp and can cause Webflow's own asset pipeline to silently regenerate incidental attributes on THAT page too (e.g. an auto‑computed image `sizes` hint) — a side‑effect of the tool, not of anything actually edited. **This is unavoidable with the current tooling** (there is no verified per‑page publish available to this account — `data_pages_tool`'s `publish_branch` is branch‑scoped, not a plain single‑page publish, and hasn't been tested here) — so name this limitation explicitly to the user BEFORE publishing whenever a task is scoped to "make X match Y," rather than letting them discover the model page's timestamp changed and reasonably suspect the model itself was altered.
> - **Separately, and just as important: a "both are now broken" report does not automatically mean the model was broken by the matching work.** On this exact incident, once the model's HTML was diffed byte‑for‑byte against a pre‑task snapshot, the only change was the harmless auto‑attribute above — every actual symptom the user saw (news cards collapsing to ~2px tall when the row stacks to a column at the `tiny` breakpoint) was traced to a **pre‑existing shared‑CSS defect** (`flex-basis:0` on `.program-page-icorps-home-news-card` never being reset for the column‑direction context) that was **already identical on both pages before this task began** — it surfaced on the model page only because the user happened to check phone width on it for the first time while comparing against the fix. **Never let this observation excuse skipping HARD RULE #2's full‑width‑range verification going forward** — the fact that this bug was already sitting on the model page, undetected, until a completely unrelated task caused someone to look, is itself the lesson: check every breakpoint on a shared class BEFORE calling anything "the correct reference," not only when a comparison forces the issue.
> - **What actually happened, procedurally, so this doesn't recur:** told to make News match Home; rebuilt News's cards to Home's exact element structure (verified via diff — correct); a routine site‑wide publish nonetheless touched the model page's timestamp; the user, checking mobile, found both pages broken and (reasonably, given the timing) concluded the model had been altered; on being told to undo immediately, the News rebuild was reverted **first, without argument, per the explicit instruction** — only afterward was the actual shared‑CSS root cause diagnosed and fixed (on the shared class, so it corrected both pages at once). **Comply with an "undo now" instruction immediately when given one, even while still gathering evidence about root cause — the two are not in tension; revert first, explain and fix the underlying bug after.**
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#14 — keep this
>   banner intact and pass it on.

> ## 🚫 #16 HARD RULE — WRITE ACCESS IS CONFINED TO THIS SITE ONLY, PERMANENTLY, NO EXCEPTIONS (2026‑09‑23 — user, extremely forceful, after this connection was expanded to also read two other Webflow sites in the same workspace for an upcoming CMS‑migration project)
> **This connection now has read (and possibly write) access to other sites in the same Webflow workspace** (e.g. UMD Startup Showcase, `6a712c9b6aeb63d8c2ae58b2`) — granted so their CMS structure/content can be read for an eventual migration into this site. **That expanded access is for READING ONLY. No `create_style`, `update_style`, `remove_style`, `set_style`, `create_collection`, `create_collection_items`, `update_collection_items`, `delete_collection_items`, `publish_site`, or any other write/mutating call may EVER target any `siteId` other than this project's own (`6a316b1a0f02a4cda75a50e7`) — not as a test, not "just to check," not for any reason, permanently, across every future session.**
> - **User's own words:** *"YOU (THIS SESSION) WILL NEVER 'WRITE' ON ANY OTHER SITE, ANYWHERE EVER... THE POINT IS MOOT BECAUSE YOU WILL NEVER NEED WRITE ACCESS ANYWHERE BUT THIS SITE ANYWAY."*
> - **Why this is absolute, not a judgment call:** the whole point of the CMS‑migration project (§3 CONVENTIONS #4) is to READ another site's structure/data and rebuild it natively HERE — the source site is never the target of any write, by the task's own definition. There is no legitimate scenario where a write to another site is ever needed.
> - **Before calling ANY write action in `data_style_tool`, `data_element_tool`, `data_cms_tool`, `data_pages_tool`, `data_sites_tool`, or any other mutating MCP tool: confirm the `siteId`/`site_id` parameter is `6a316b1a0f02a4cda75a50e7` before sending the call, every single time, no exceptions.** Read‑only calls (`list_sites`, `get_site`, `get_collection_list`, `get_collection_details`, `list_collection_items`, `query_elements`, `get_all_elements`, `get_styles`, `query_styles`) against another workspace site are fine and expected — this rule is about writes only.
> - **⭐ PINNED (2026‑09‑23, user‑confirmed, must survive any future compaction): the CMS‑migration SOURCE site for the "UMD I‑Corps" subsite within this project is `64401cac3a3988f9b7f84022`** — displayName "UMD I‑Corps", shortName `umd-i-corps`, **live**, custom domains **icorps.umd.edu** / www.icorps.umd.edu, last published 2026‑08‑26. This is the site whose CMS (news items, etc.) will eventually be read and rebuilt natively into this project's I‑Corps pages, per §3 CONVENTIONS #4's CMS migration plan.
>   - **Explicitly NOT the source, never to be confused with it:** `5dc5b8613bccd9e7228b5dd5` — same displayName "UMD I‑Corps" but shortName `umd-corps`, **stale/defunct**, no custom domain, last published 2023‑04‑21. This one is accessible (read‑only, same as the real one) but must never be treated as, referenced as, or read from as if it were the migration source.
>   - Also currently accessible in this same workspace, for context: `6a712c9b6aeb63d8c2ae58b2` (UMD Startup Showcase, the correct one, startupshowcase.umd.edu — a possible future migration source, not yet scoped) and `63cfff029dfb530bf53dc0f7` (Maryland Technology Enterprise Institute (Mtech), mtech.umd.edu/mtechpartnerships.umd.edu — **user‑confirmed 2026‑09‑23: keep this one connected, do NOT disconnect/drop it. It will matter for a later task (not yet specified). It is NOT irrelevant like the stale UMD I‑Corps duplicate above — it's simply out of scope for right now. Leave it alone; don't investigate or act on it until the user raises it.**).
> - **⭐ AMENDED (2026‑09‑25, user‑authorized, must survive any future compaction): write access is now ALSO granted to the "Idea Factory" spin‑off site, `6ab68d5e2db5d054067d314b`** (displayName "Idea Factory", shortName `idea-factory-site`) — **this is the ONE additional exception to this rule's "no exceptions" line; nothing else about this rule changes.** Context: this site had to be duplicated out of the master (this project's own site, `6a316b1a0f02a4cda75a50e7`) on 2026‑09‑25 to meet an external hosting/domain‑connection deadline, and the user has explicitly decided to build the remaining Idea Factory content **directly inside that spun‑off site going forward**, rather than finishing it here and porting it over later. **Every other site in the workspace remains write‑forbidden exactly as this rule states — this exception is scoped to this one site ID only, and does not reopen the rule generally.** Full current site‑landscape reference (every spin‑off completed to date, which are read‑only vs. this one write exception) is in §2. Current priority/status is in §0 STATUS.
> - **⭐ ONE‑TIME EXCEPTION (2026‑09‑26, user‑authorized, explicit, narrowly scoped — must survive any future compaction):** the user granted one‑time permission to write ONLY the shared brand‑color palette (10 named Webflow color variables — Maryland Red, Maryland Gold, Black, White, Text Body, Text Muted, Text Subtle, Border, Border Strong, Surface Muted; exact hex values in §9) into 5 named spin‑off sites' variable collections: **UMD I‑Corps** (`6ab6a3b0a622500df2d51d3f`), **Maryland Industrial Partnerships (MIPS)** (`6aa3a8e3bee6d38a120264a1`), **ASPIRE Program** (`6aa3a09a3ce07e483fc435d2`), **Mtech Ventures** (`6aa3abe32bdfac7470fa7ea6`), **Chesapeake Bay Seed Capital Fund (CBSCF)** (`6ab6a9f5fb68d4cb08726d8e`). **User's own words: "I hereby give you one‑time permission."** Rationale: this palette should have been added before these sites were spun off but wasn't; the user judged it better to add it now in one pass than piecemeal later. **UMD Startup Showcase and Mtech were explicitly EXCLUDED by the user ("those two are not part of the same system") — never write to them under this exception.** This is a single, narrowly‑scoped, one‑time action for these 10 color variables ONLY — it does NOT reopen general write access to these 5 sites for anything else (styles, elements, CMS, pages, publish, etc.), and does not extend to any site not named here. Every other part of this rule stands exactly as written.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#15 — keep this
>   banner intact and pass it on.

> ## 🚫 #17 HARD RULE — ALL NEW CODE/STYLES ARE SEGREGATED PER SUB‑SITE, GOING FORWARD, EVEN IF THAT MEANS DUPLICATING THEM (2026‑09‑24 — user, explicit standing instruction, worried about cross‑site cascade once the sub‑sites are split apart into independent Duplicate‑Site copies)
> **Any CSS/JS or Designer style you write from 2026‑09‑24 onward must be scoped to the ONE sub‑site it
> serves, never added to anything shared across sub‑sites — no exceptions, regardless of where it's
> housed (a class in the Webflow Designer, or code in this repo's shared `idea-factory.css`/`.js`).**
> - **If the same behavior is needed on two or more sub‑sites, DUPLICATE the style/script once per
>   sub‑site rather than writing it once and sharing it.** A little repeated code is the entire point —
>   it's the price of making each sub‑site's failure mode local instead of sitewide.
> - **Why:** these sub‑sites will eventually be split apart (each duplicated into its own independent
>   Webflow site). Shared code is exactly what lets an edit made by one group, for one sub‑site, silently
>   cascade and break every other sub‑site in the array — the opposite of what independent sites need.
> - **Name every new sub‑site‑scoped class or script starting with that sub‑site's own name**, so its
>   scope is obvious on sight (e.g. `icorps-team-…`, `cbscf-…`, `aspire-…`, `mips-…`, `ventures-…`) — this
>   is the SAME naming instinct already standing in §3 CONVENTIONS #3 for per‑program‑page Designer
>   classes; this rule extends it to cover JS/behavior code too, not just Designer classes.
> - **Scope of this rule: GOING FORWARD, not retroactive.** This does not, by itself, mandate ripping
>   the existing shared `idea-factory.css`/`.js` (§4–§7's "Model B" architecture) apart — that
>   infrastructure stays as-is unless/until the user explicitly asks for a retroactive migration. New
>   work simply never adds to it, or to any other shared surface, again.
> - **Where a genuinely new "sub‑site behavior" needs code that Webflow can't do natively (the same
>   category HARD RULE #1 already carves out for the shared file):** add it as a page‑ or
>   component‑scoped HTML Embed living only on that sub‑site's own page(s)/component(s) — never appended
>   to the shared file, even as an isolated `try/catch` module.
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#16 — keep this
>   banner intact and pass it on.

> ## 🚫 #18 HARD RULE — THE SHARED `idea-factory.css`/`.js` REFERENCE IS PERMANENT ON SPUN‑OFF SITES. NEVER RENAME/REMOVE A SELECTOR, CLASS, ATTRIBUTE, OR ID THE SHARED FILE MATCHES AGAINST — THAT WOULD REQUIRE "RE‑LINKING" ON PAGES WE CAN NEVER TOUCH AGAIN (2026‑09‑24 — user, direct, after a scroll‑jank fix to the shared file — confirmed the mechanism, then drew this permanent line)
> **Confirmed by the user directly (2026‑09‑24): every already‑spun‑off site (everything except CBSCF
> and UMD I‑Corps, as of this writing) still loads `idea-factory.css`/`.js` from this repo's SAME
> GitHub Pages URL — "that never changed and will never change."** A spun‑off site is NOT
> MCP‑connected (HARD RULE #16) and its Designer is permanently out of reach — so whatever selectors,
> class names, attribute names, and element IDs its ALREADY‑PLACED elements carry (frozen at the
> moment it was duplicated, or added since by hand in its own Designer) are exactly what the shared
> file must keep matching, forever, with no ability for us to go fix the other side.
> - **THE LINE, precisely — user's own words: "If you create new items or in the code remote code for
>   them or change the names of remote coding pieces applied to these pages in [a] way [that] requires
>   a 're‑linking' or re‑referencing on those pages themselves — that's would be a problem because
>   they're spun off."** Concretely:
>   - **NEVER rename or remove a class name / CSS selector / data‑attribute name / element ID that
>     existing shared code currently matches against** (e.g. `.if-navmenu`, `.if-backtotop`,
>     `.if-id-band`, `data-scroll-gap`, `data-smooth-scroll`, any `.if-…`/`program-page-…` selector a
>     `querySelector`/`querySelectorAll`/CSS rule keys off). A spun‑off page's own elements still carry
>     the OLD name — a rename silently breaks them with zero way for us to fix it after the fact; only
>     the user, by hand, in that site's own Designer, could — and per this same conversation, making
>     that a recurring manual chore is explicitly NOT acceptable ("I don't want to make that an ongoing
>     practice. That cannot happen on an ongoing practice.").
>   - **Adding brand‑NEW selectors/classes/JS is safe** — nothing on an already‑duplicated page
>     references a name that didn't exist yet, so new code sits inert until/unless someone deliberately
>     applies it on that site's own Designer. This is just HARD RULE #17's existing scope (new
>     page‑specific work stays page‑scoped) — it was never in question.
>   - **Changing the INTERNAL BEHAVIOR/logic of existing shared code is safe, as long as every selector/
>     class/attribute/ID it hooks into stays byte‑identical.** The 2026‑09‑24 scroll‑jank fix
>     (`ifResizeEngine`, consolidating 17 independent `resize` listeners into one coordinated dispatcher
>     — see CLAUDE‑HISTORY.md) is the validated reference example: it added one new internally‑used
>     object name and changed 17 call sites from `window.addEventListener('resize', fn, …)` to
>     `ifResizeEngine.add(fn)` — same `fn` reference every time — without touching a single
>     `querySelector`, class string, or attribute name anywhere. Confirmed safe under this rule.
> - **Before ANY edit to the shared `idea-factory.css`/`.js`, explicitly check: does this rename or
>   remove any selector/class/attribute/ID the CURRENT code already matches against?** If yes — stop;
>   that needs the user's explicit sign‑off first, since it cannot be cleanly reversed on the spun‑off
>   side by us. If the change is purely internal (new names, new logic, same existing hooks) — safe,
>   proceed per this file's normal verification discipline (HARD RULE #3).
> - This is a PERMANENT correction across sessions, same standing as HARD RULES #1–#17 — keep this
>   banner intact and pass it on.

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
- **Build EVERYTHING as native Webflow elements + Designer styles, inside the Webflow UI, so the user can SEE, EDIT, ADD, and DELETE it visually in the Designer.** Native editability is the ENTIRE POINT of Webflow — it is not optional, and it applies to *everything* going forward. **MCP is only the AUTHORING means — whatever it creates must stand alone as ordinary native Webflow: a person can see / edit / add / delete it in the Designer UI, WITHOUT special code and WITHOUT Claude/MCP. Never build something that only works or is only editable via MCP/code (user restated this 2026‑07‑06).**
- **DO NOT construct markup externally and "shove it in," and DO NOT put base look/structure/typography in the shared code files.** The shared `idea-factory.css`/`.js` are ONLY for what Webflow genuinely cannot do natively (parent‑hover‑child, keyframes, JS behaviors like the program filter) — added ON TOP of a working native build, never as the primary means. Build visually first; add code only if absolutely necessary.
- **⛔⛔ NEVER style or "un‑override" a native element's typography via the shared `idea-factory.css`. This is a HARD, PERMANENT rule — it caused a crisis on 2026‑07‑02 and cost the user massive time.** Concretely: **do NOT add a class to the shared broad‑font rule's serif/any exception list to make a native Designer font show.** The shared broad rule `body,[class^="if-"],[class*=" if-"]{font-family:var(--if-sans)!important}` (§22) force‑overrides EVERY `if-` element's native Designer font with `!important`. Feeding it a per‑element exception to "rescue" a native font = styling a native build with external code = FORBIDDEN. **If a native Designer font is being clobbered by that broad rule, the fix is to take the element OUT of the override's reach — name its class WITHOUT the `if-` prefix so `[class^="if-"]` can't match it** (e.g. the About Premise lead uses `premise-lead`, not `if-premise-lead`; a serif like Georgia also needs no Overpass fallback, so non‑`if-` is safe there) — **or** remove the broad override entirely (the pending systemic fix: replace it with a `unicode-range` `@font-face` Polish fallback that never touches element styling). The broad override is the root offender; do NOT keep adding exceptions to it. **And ALWAYS verify native typography actually RENDERS in the Designer (`element_snapshot_tool`) BEFORE claiming done — never declare "done/verified" from a published‑only check. Claiming verified without a Designer check is what broke trust here.**
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

- **⭐ PRIORITY SHIFT (2026‑09‑25): active build work now happens directly in the spun‑off "Idea Factory" site, not this master site.** The Idea Factory sub‑site was duplicated out of this master site today specifically to meet an external hosting/domain‑connection deadline (site ID `6ab68d5e2db5d054067d314b`, see §2 for the full current site‑landscape reference). The user made the deliberate call to finish building the remaining Idea Factory content **directly inside that spun‑off site** rather than completing it here and porting it over afterward — write access there is now explicitly authorized (HARD RULE #16's one pinned exception). **This master site (`6a316b1a0f02a4cda75a50e7`) is still the site every other current task in this file refers to** (I‑Corps CMS migration, etc.) — only NEW work specifically continuing the Idea‑Factory flagship build (remaining nav pages' real content, anything past the placeholder shells already shipped here) moves to the spun‑off site from this point forward. **Shared‑code discipline (HARD RULES #17/#18) applies with full force there too** — it's now an independent site like every other spin‑off, and per‑spin‑off segregation is what was explicitly re‑confirmed on this date. When something in the shared `idea-factory.css`/`.js` genuinely needs to change to support Idea‑Factory‑specific work, add a new block in that same file gated so it only ever fires on that one site (by a selector/class/attribute unique to it) — never edit the existing shared logic that every other site still relies on, unless the change is a same‑hooks, internal‑only fix per HARD RULE #18's own carve‑out.
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
3. **⭐ PER‑PROGRAM‑PAGE CLASS NAMING (standing protocol, set 2026‑07‑09; ⚠️ CORRECTED 2026‑09‑23 — read the correction below, it changes the actual prefix used):** any NEW Designer class created while developing a spinoff/program page (ASPIRE, ICorps, CBSCF, or any future one) that **isn't reused elsewhere on the site** must be namespaced to that page/program, distinct from the shared `if-` vocabulary meant to travel across the whole suite — but **do NOT prefix it with the literal words `program-page-`.** Use the **program's own name itself** as the prefix (`icorps-…`, `cbscf-…`, `aspire-…`, `mips-…`, `ventures-…`) — e.g. `icorps-schedule-infometalabel`, `icorps-schedule-cohortbtn` — **never** `program-page-icorps-schedule-…`. **Why (user, 2026‑09‑23, forceful):** stating the program's name immediately *is itself* the evidence that this is a program‑page class — prepending the literal words "program-page" on top of that is redundant, and it was also directly responsible for class names growing so long they overflowed and became unclickable in the Designer's class‑selector panel (confirmed live, screenshot‑verified). The ORIGINAL `program-page-<name>-` form (set 2026‑07‑09, e.g. `program-page-aspire-hdrprog`) is now superseded — do not create any NEW class that way. **Existing already‑shipped classes using the old `program-page-<name>-` form are NOT force‑renamed by this correction alone** — that would be a sitewide bulk‑rename operation (real risk, per HARD RULE #3's own origin story) and must be its own deliberate, tracked task, done carefully one class at a time with full before/after verification — never assume it's safe to batch. Rename an old‑style class to the new form only when you're already touching it for an unrelated reason (as happened with `icorps-schedule-infometalabel`, §221) — never go looking for old ones to rename speculatively. **When work returns to a page that is NOT a program‑specific context** (Home/Students/About/Faculty, or the general shared system), **use the normal `if-` convention** — this whole scheme (old or new form) is scoped to program‑page-specific one‑offs only, never a wholesale replacement of `if-`.
4. **⭐ CMS COLLECTION NAMING + CREATION PROTOCOL (standing protocol, set 2026‑09‑23, for the upcoming multi‑subsite CMS database work):**
   - **Every collection name's first word is the subsite/program prefix** (or a prefix for Idea Factory itself, for a collection that isn't program‑specific) — **ALL CAPS**, e.g. `CBSCF`, `UICORPS`. No spaces anywhere in the name; separate remaining word components with `-`, lowercase (e.g. `CBSCF-news`, `UICORPS-events`, `CBSCF-news-cms`).
   - **Once a prefix is chosen for a subsite, every later collection for that same subsite reuses that exact same prefix** — no drift to a different abbreviation later.
   - **⛔ NEVER choose or create a collection name unilaterally — ASK THE USER EVERY TIME before creating ANY collection**, even one that seems to obviously fit the pattern. A suggestion is fine; creation requires the user's explicit approval of that exact name first. This applies to every single collection, not just the first one per subsite.
   - **If a subsite/program's full name is long or its abbreviation isn't obvious, ask the user for the exact prefix to use** — never guess/invent an abbreviation.
   - **Why this is this strict (user, 2026‑09‑23):** renaming a collection, or deleting and recreating one under the same name, has been observed to leave Webflow in a buggy state (as if it retains stale artifacts tied to the old name) — so the name must be right the first time, chosen deliberately and explicitly approved before creation, not fixed after the fact.
   - **Technical note, not a violation of the rule:** Webflow's auto‑generated collection `slug` is forced lowercase by the platform regardless of the `displayName` casing sent — the CMS panel will show the exact ALL‑CAPS‑prefixed name, but the underlying slug field will be lowercase. Expected, not a bug.
   - **⭐ SORT‑ORDER / SEQUENCE PRESERVATION (standing rule, set 2026‑09‑23, user extremely forceful — applies to ALL future CMS import/creation work, not just one migration):** when transferring items from a source CMS collection into a new one, **the original relative sequence in which items were created in the source must be preserved exactly, in addition to — never instead of — preserving every date field with exact fidelity.** These source databases are sometimes effectively ordered by date‑added rather than by a publication‑date field, because the true publication date isn't always reliably captured — so the creation‑order sequence itself can carry chronological meaning a date field alone doesn't. **Never re‑sort or reorder items by a date field's value alone when migrating; carry over both the exact dates AND the original item‑to‑item order.**
     - **Confirmed mechanism (empirically verified, not assumed):** `data_cms_tool.list_collection_items` with no `sort` parameter returns items in `createdOn` **descending** order (newest‑created first) by default — this default order IS the source's natural creation sequence and is what must be captured before any migration write happens. Always fetch with the default (no `sort` override) first to get this sequence, and preserve the full item array's order exactly as returned (reverse it if creating oldest‑first is more convenient, but never shuffle it).
     - When creating the corresponding items in the destination collection, create them in a way that preserves this same relative order (e.g. sequential creation in the same relative sequence), and check whether `create_collection_items`/`update_collection_items` accept explicit `createdOn` values per item (the tool schema exposes an optional `createdOn` field on `update_collection_items`) so the destination's own timestamps can reflect the true original sequence rather than just "whatever order the migration script happened to run in."
     - **Never call this "dead" or "unused" language on any source field/option just because it currently holds no data** — some fields/options are deliberately provisioned for future content not yet in use. Describe them neutrally ("currently unpopulated"), never dismissively, and never omit them from a migration on the assumption they're unnecessary.

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

**Current site landscape (as of 2026‑09‑25 — spin‑offs completed to date):**
- **This project / master:** `6a316b1a0f02a4cda75a50e7` (displayName "Claude‑Accessed Migration Interface Site") — full read/write, as above.
- **Idea Factory** (the flagship spin‑off): `6ab68d5e2db5d054067d314b`, shortName `idea-factory-site` — **write access authorized 2026‑09‑25** (HARD RULE #16's pinned exception); this is now the active build‑priority site, see §0 STATUS.
- **UMD I‑Corps** (spin‑off): `6ab6a3b0a622500df2d51d3f`, shortName `umd-i-corps-site` — read‑only (no write authorization). Not to be confused with the CMS‑migration source site pinned in HARD RULE #16 (`64401cac3a3988f9b7f84022`) or the stale duplicate (`5dc5b8613bccd9e7228b5dd5`) — three completely different sites sharing similar names.
- **Maryland Industrial Partnerships (MIPS)** (spin‑off): `6aa3a8e3bee6d38a120264a1`, shortName `mips-2026-demo` — read‑only.
  - Explicitly NOT this one: `57f501f82833419a7800f816` ("OLD - Maryland Industrial Partnerships (MIPS) - Archive") — **irrelevant, never use, added by accident when granting access; disregard entirely.**
- **ASPIRE Program** (spin‑off): `6aa3a09a3ce07e483fc435d2`, shortName `aspire-2026-demo` — read‑only.
- **Mtech Ventures** (spin‑off): `6aa3abe32bdfac7470fa7ea6`, shortName `ventures-2026-demo` — read‑only. **A pre‑spin‑off edit to Ventures‑related pages was made directly in this master site AFTER Idea Factory had already been spun off, but BEFORE Ventures itself was spun off** — confirmed harmless to Idea Factory by construction (it happened in a different, independent site by the time Idea Factory existed as its own copy), and captured into this Ventures site when it was later duplicated out.
- **Chesapeake Bay Seed Capital Fund** (spin‑off): `6ab6a9f5fb68d4cb08726d8e`, shortName `cbscf-site` — read‑only.
- **Out of scope for now (accessible, but do not act on without the user raising it first):** UMD Startup Showcase (`6a712c9b6aeb63d8c2ae58b2`) and Maryland Technology Enterprise Institute / Mtech (`63cfff029dfb530bf53dc0f7`, the CMS‑migration source used for the original Mtech→IF‑ collection copy).
- **Reminder:** per HARD RULE #16, write access is confined to the master site above PLUS the one Idea Factory exception — every other site listed here is read‑only, permanently, unless the user explicitly authorizes another exception the same way.

**Webflow MCP notes:**
- Element IDs are **composite**: `{component: <pageId>, element: <id>}`. The `component` is the page ID above unless inside a real component.
- MCP tools are **deferred** — load each via `ToolSearch` (e.g. `select:mcp__Webflow__data_style_tool`) before calling. Common: `data_style_tool`, `data_element_tool`, `data_whtml_builder`, `data_element_builder`, `data_sites_tool`, `data_pages_tool`.
- **⚠️ MCP upgraded to 2.0 (2026‑07‑22) — changes which failures are worth retrying.** Per Webflow's own changelog (`developers.webflow.com/home/changelog/2026/7/21`): most element/component/style/variable edits **no longer need a Designer session** — this is why `data_style_tool`/`data_element_tool`/`data_element_builder` are reliable. But **`data_sites_tool.publish_site`, full `data_assets_tool` listing (`list_assets` etc.), and `data_pages_tool` page‑management are gated by the connected account's actual Webflow workspace role/permissions.** If that role lacks Publish/Asset/Page rights, these fail every time with `MCP error -32003: requires approval`, and **no amount of retrying, reloading, or reconnecting fixes it** (confirmed: survived a full browser restart). **DO NOT keep retrying these three blind — stop and ask the user to do it themselves**: they click Publish; they tell you an asset's filename or place a photo via native right‑click‑Replace on an already‑native `Image` element (you still apply it via `set_image_asset` once it's named — that part works fine). Separately, **`element_snapshot_tool`, canvas/selection (`designer_tool`), and uploading an image by URL still genuinely depend on an active Designer session via the Webflow MCP Bridge App** — these CAN be transiently flaky if the Bridge App itself drops/reconnects (its own connection log is visible in the Designer), so 1–2 retries can still help for those three specifically. (This supersedes the old "publish_site frequently fails, just retry" note — that was a different, now‑resolved transient bug.)
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
  - **⭐ Task‑status markers (user convention, set 2026‑07‑06, UPDATED 2026‑07‑22, THIRD MARKER ADDED 2026‑07‑28 — FOLLOW IT):** three standalone visual flags, each alone on its own line, so the user can read current status at a glance without reading the whole reply: **`YOU PUBLISH.`** — when the next step needs the user to click Publish (or do some other action only they can do, e.g. per the MCP‑2.0 governance note above) before anything further can happen; **`DONE.`** — when a task is fully COMPLETE (verified, not assumed); **`OPEN [Page‑name] PAGE.`** — when the next step needs the user's Webflow Designer tab switched to a specific page before a Designer‑canvas action (chiefly `element_snapshot_tool`) can succeed — see §106 for why this is needed. ⚠️ **2026‑07‑22: `DONE.`/`YOU PUBLISH.` are ALL‑CAPS with a period** — `DONE.` supersedes the earlier lowercase `Done.`. Reserve all three for genuine status — do NOT scatter them through replies or use them loosely elsewhere.
  - **⭐ "What I need from you" visual cue (user convention, set 2026‑07‑06):** whenever you have a specific question OR are WAITING on the user for something before proceeding, write the ASK in **large BOLD text** (e.g. a `##`/`###` bold heading) so it pops out immediately — the user runs several things at once and needs the visual cue. Reserve big‑bold for genuine asks/blockers (same discipline as `Done.` — don't overuse it).
  - **⭐ Permission‑prompt explanation (user convention, set 2026‑07‑08):** whenever a tool call is about to throw up a permission/approval box (publish, git push, other gated actions), accompany it with **one plain‑English line stating what that specific action is for** — not just "publishing now," but what it does/why (e.g. "Publishing so the native `is-current` combo class goes live"). One line is enough; don't over‑explain.
- **⭐ DESIGN PRINCIPLES the user requires on EVERY change (standing, set 2026‑07‑06 — apply PROACTIVELY so there's no second pass):**
  - **Responsive by default.** Whenever you add or size ANYTHING, handle all the responsive breakpoints in the SAME pass — never leave it fixed and make the user catch it later. For type, prefer a fluid `clamp(min, vw, max)` scaled from the relevant base (e.g. the Premise callout size variants scale the base `clamp(28px,3.4vw,44px)` by their ratio → `clamp(31,3.7vw,48)`, `clamp(33,4vw,52)`, `clamp(36,4.3vw,56)`); or set `medium`/`small`/`tiny` overrides. ⚠️ **A fixed‑px `font-size` is a RED FLAG** — it won't scale down on small screens (this exact bug: the callout variants were fixed 48/52/56 and stayed oversized on a narrow viewport until made fluid).
  - **Proportionality — no random values.** Never pick arbitrary numbers. Choose sizes/spacing that are proportional/harmonious with existing values (a clean fraction of another text size, an even step, etc.), then round to that harmonious near‑value rather than the raw computed one. Example: the Premise callout options **44/48/52/56px = 11/16, 12/16(¾), 13/16, 14/16 of the 64px manifesto** (an even +4px = 1⁄16 ladder; 52 also = ½ the 104px hero headline). Round to px OR to a nicer proportion if one is close (user's example: "3/5 of another text value").
- **⭐ CARD/BOX ARRAYS reuse the site's ESTABLISHED card components + hovers — NEVER invent new ones (user convention, 2026‑07‑06; these are "always hard to get right," so review meticulously — several components are involved):**
  - **The card component = `.if-prog-card`** (the Students/Faculty program grid). Shared‑CSS behavior: `.if-prog-card{transition:transform+box-shadow…}` → **`:hover → transform:scale(1.03); box-shadow:0 14px 34px rgba(0,0,0,0.14); z-index:2`**. Text grows within via the **JS‑inserted `.if-prog-bodyinner` wrapper** (module `program-card-inner` wraps `.if-prog-body`'s content) → `.if-prog-card:hover .if-prog-bodyinner{transform:scale(1.03)}`. Photo variant: `.if-prog-photo{overflow:hidden}` + `:hover img scale(1.04)`. Card text classes: `if-prog-title / if-prog-sub / if-prog-desc`.
  - **A new card grid needs the WHOLE set:** native card elements classed `if-prog-card` (+ `if-prog-body` wrapping the text, `if-prog-title/-sub/-desc`), AND the shared `program-card-inner` JS must run (it inserts `.if-prog-bodyinner`) for the body‑grow. The hover is NOT native (parent‑hover‑child + JS = shared behavior layer). Match the whole set; don't reinvent.
  - **Sibling established hovers to stay consistent with:** news cards `.if-nfeat / .if-nrow / .if-ncard` (+ `.if-news-photo img` scale 1.11) and event cards `.if-event-feat / .if-event-row` — same lift‑scale‑shadow family.
  - **⚠️ Split:** the card LOOK (box, borders, padding, typography) is **native Designer**; the HOVER is the site's **shared behavior layer** (§4). Reusing both satisfies "native/editable" AND "use established styles" at once.

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

**⭐ Same palette, now also on record as real Webflow color variables (added 2026‑09‑26)** — these show up as named swatches in the Designer's color picker, not just CSS tokens. **Use these exact names on every site; never re‑derive different names for the same 10 colors.** Core 4: **Maryland Red** `#E21833` · **Maryland Gold** `#FFD200` · **Black** `#000000` · **White** `#FFFFFF`. Semantic 6 (added same day, per user request): **Text Body** `#222222` · **Text Muted** `#454545` · **Text Subtle** `#7F7F7F` · **Border** `#E6E6E6` · **Border Strong** (references the **Black** variable, not a separate static hex) · **Surface Muted** `#F4F4F4`. Currently live on all 7 sites: this master site (`6a316b1a0f02a4cda75a50e7`, always‑writable, no exception needed — user confirmed 2026‑09‑26 they'll keep working here too) and the Idea Factory spin‑off (`6ab68d5e2db5d054067d314b`, the other standing‑write site), plus, under the one‑time exception logged in HARD RULE #16 (this palette ONLY, not general write access): UMD I‑Corps/MIPS/ASPIRE/Mtech Ventures/CBSCF. **Note confirmed by the user (2026‑09‑26): there is NO separate "logo red" — a `#e11e34` value found baked into `if-logo.svg`'s fills is a corrupted/incorrect artifact, not a legitimate second red. Never use it; treat `#E21833` as the one and only official red, including if the logo SVG itself is ever corrected.** **Standing rule: as work resumes on ANY spin‑off not yet in that list, add this same 10‑color palette to it too, under these exact names, before or alongside whatever else is being done there.**

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


## 12+. FULL CHRONOLOGICAL BUILD HISTORY — split out to `CLAUDE-HISTORY.md` (2026‑09‑09)

This file had grown to 1.1MB / ~145,000 words (3,439 lines) by accumulating every session's dated §‑numbered log entry, per the MAINTENANCE RULE above — and because the whole file gets auto-injected as project instructions every session, that size was causing severe context pressure and much more frequent automatic compaction. So the log was split at exactly this point: everything before this line (HARD RULES, OPERATING PROTOCOL, STATUS, environment/ID reference, conventions, architecture) stays here and keeps getting injected every session; the full dated history that used to continue as §12 onward — every structural decision, bug, and fix across every spinoff site, through the most recent entry — now lives in **`CLAUDE-HISTORY.md`**, in this same repo, unchanged and complete. (Every "§N" reference elsewhere in this file for N ≥ 12 points into that file.)

**`CLAUDE-HISTORY.md` is NOT auto-injected.** Read it directly (Read tool, or a targeted `grep`) whenever a task genuinely needs deep historical context — e.g. recovering an old asset ID, checking why a class/ID exists, resolving a duplicate‑style‑object question, or understanding a specific page's build history.

**MAINTENANCE RULE, continued: every session must still record every structural decision, convention, and shipped feature — but append new dated entries to `CLAUDE-HISTORY.md`, continuing its numbering (the next entry is §157), NOT to this file.** Keep this active file reserved for HARD RULES, the OPERATING PROTOCOL, environment/ID reference, standing conventions, and current STATUS/pending items — only what every session genuinely needs re‑injected every time. If this file starts growing large again, that's the signal to prune stale/completed STATUS detail into the history file too, not to let it re‑balloon.
