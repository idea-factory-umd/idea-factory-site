# CLASS NAMING GUIDE — how to name page-scoped Designer classes on this project, correctly, the first time

> **Why this file exists:** the MPPM Application Requirements page's classes (2026-11-03) went through
> several rounds of live back-and-forth before landing on a correct, accepted naming scheme — not
> because the underlying rule is complicated, but because nobody had written the actual decision
> procedure down before starting. This file is that procedure. Read it before naming or renaming ANY
> page-scoped class on ANY site in this project. Not auto-injected (CLAUDE.md is) — CLAUDE.md HARD RULE
> #26 is the one-line pointer that sends a session here when class-naming work comes up.

---

## 1. The pattern

```
<site>-<page>-<section>-<descriptor>
```

- **`<site>`** — the spinoff's own name (`mppm`, `icorps`, `aspire`, `cbscf`, …). Never the shared `if-`
  prefix for anything page-specific (CLAUDE.md HARD RULE #10/#11/#17).
- **`<page>`** — a short abbreviation for THIS page, picked once, reused for every class on that page
  (e.g. `apprq` for "Application Requirements"). Once a page's abbreviation is in use and accepted,
  **never change it later just to make it more "readable"** — that's pure churn for no benefit once
  people already know what it means. Only decide it carefully the first time.
- **`<section>`** — a short abbreviation for the page's OWN section (its own heading/name on that page),
  e.g. `hero`, `wyn` ("What You'll Need"), `dline` ("Deadlines"). See §2 for how to choose these well.
- **`<descriptor>`** — what the class actually is: `body`, `leadline`, `row`, `btn-arrow`, etc.

**Every segment is all-lowercase, always** — no capitalized word-boundary markers (not `AppRec`, not
`Hero`). Capitalization was tried once on this exact page and explicitly rejected; lowercase-only is the
standing rule.

---

## 2. Choosing a section abbreviation

- Derive it directly from that section's own on-page heading or name — don't invent an unrelated word.
  `wyn` ← "What You'll Need" (initials). `dline` ← "Deadlines" (truncation). When the section's own name
  is already short, just use it whole: `hero`, `need` are both fine as-is, no further shortening required.
- **Before settling on an abbreviation, say it in your head as a plain word and ask: does this read as
  something else, something alarming or confusing, out of context?** `dead` was rejected specifically
  because it reads as "a dead (unused/deprecated) class" — not because of its length. This check matters
  more than the length-minimizing instinct.
- **Check whether the same short token is already doing something else on this same page before reusing
  it.** `dl` was already in use for the "What You'll Need" section's `<dl>`/definition-list table
  (`-dl`, `-dt`, `-dd`, semantic-tag-derived class stems) — reusing `dl` for the unrelated "Deadlines"
  section too would recreate the exact kind of double-meaning collision this whole naming pass exists to
  eliminate. Pick something else (`dline`) when a short candidate is already spoken for.
- A class genuinely shared across TWO OR MORE sections of the SAME page (e.g. one `h2` heading style
  reused for both "What You'll Need" and "Deadlines") **stays at the page level, with no section
  segment at all** (`<site>-<page>-h2`, not `<site>-<page>-<section>-h2`). Don't force a section token
  onto something that's deliberately shared — verify actual usage first (§3), don't assume from the name.

---

## 3. Before renaming anything on an existing page: audit first, in full, in one pass

1. **Fetch the complete list of that page's existing classes in one query** (`query_styles`,
   `name_path:["<site>-<page>"]`). Don't work from a partial list or from memory.
2. **For every class whose section is ambiguous from its name alone, check its actual usage**
   (`query_elements`, `element_filter:{style:"<name>"}`, `return_parent:"ancestor"`) to see which
   section(s) it actually lives under. Don't guess from the name.
3. **Sort the full list into three buckets, explicitly, before touching anything:**
   - Already correctly section-prefixed (e.g. already `-hero-`, `-need-`) → **leave these alone, even if
     a newer/shorter abbreviation scheme would technically be "more consistent."** Matching an
     already-correct, already-understood class to a brand-new refinement is not required and is exactly
     the kind of unauthorized, unrequested churn that costs trust — only rename it if separately asked.
   - Genuinely orphaned (no section word at all) → these need the section segment added.
   - Genuinely page-level shared across sections (§2's last point) → leave unprefixed-by-section, confirmed
     via actual element usage, not assumption.
4. **Propose the complete rename mapping once, with the reasoning for each section-token choice spelled
   out (why this token, why not a shorter/already-used alternative)** — before executing anything. Getting
   this reviewed once up front is much cheaper than several rounds of live trial-and-error.
5. **Execute the rename only once the mapping is confirmed.** `rename_style` takes the old and new name
   directly and preserves every property — a rename never changes appearance, only the name.
6. **Re-query the full list again afterward** to confirm: every renamed class landed on the expected new
   name, every untouched class is still exactly as it was, and there are no duplicate/orphaned style
   objects (CLAUDE.md HARD RULE #3's "duplicate style objects" risk applies to renames, not just creates).
7. **Publish, then grep the actual live published HTML for the new class name strings** — don't trust the
   rename tool's own success response as proof it's live.

---

## 4. What this guide deliberately does NOT cover

Which classes should exist at all, what their CSS properties should be, and page-level vs. site-level
class scoping in general are covered by CLAUDE.md's own standing conventions (§3 convention #3, HARD
RULES #10/#11/#17) — this file is specifically about the **shape of the name itself** once you already
know a class needs to be page- or section-scoped.
