# NAV MENU GUIDE — how to build or fix any nav menu on this project, correctly, the first time

> **Why this file exists:** the MPPM nav dropdown fix (2026-11-03, CLAUDE-HISTORY.md §305) took multiple
> rounds of live-site correction to get right, even though this exact mechanism had already been solved
> once before on UMD I-Corps (§215). That is not acceptable, and it keeps happening because the lessons
> were scattered across old history entries nobody re-reads before starting new nav work. This file is
> the single, consolidated, precise answer — read it **every time** a task touches a nav menu, dropdown,
> hover, or responsive nav behavior on ANY site in this project, before writing or changing anything.
> It is deliberately **not** auto-injected into every session (CLAUDE.md is) — it would bog down context
> on tasks that have nothing to do with nav menus. CLAUDE.md HARD RULE #25 is the one-line pointer that
> sends a session here the moment nav work comes up. Keep that pointer intact.

---

## 1. Always start from a proven-working nav Component — never build one from scratch

Every site's main nav is a genuine Webflow **Component** (Components panel → its own named group), not a
plain element tree copy-pasted onto each page. One component definition, many **instances** — one per
page — so a fix made once to the definition propagates to every page automatically. Confirm this with
`data_component_tool.get_component` (`includeInstanceCount:true`) before assuming otherwise.

When a **new spinoff** needs a nav: **duplicate an already-correct, already-fixed nav component**
(`data_component_tool.duplicate_component`) rather than building one element-by-element. As of 2026-11-03
the cleanest reference components are **UMD I-Corps' "Main Nav"** (its "Program"/"Schedule" dropdowns) and
the now-fixed **"Main Nav — MPPM"**. After duplicating:
- **Re-file it under a group named after the NEW spinoff** (`set_component_metadata`, `group:"<SPINOFF>"`)
  — never leave it sitting in the source spinoff's group. Check this explicitly; it is easy to forget and
  has no functional effect, which is exactly why it goes unnoticed (happened to MPPM — caught only when
  the user spotted it in the Designer's Components panel). See checklist item 9 in §10 below.
- **Fork every class the new nav uses that carries page-specific data or behavior** to the new spinoff's
  own prefix (HARD RULE #10/#11/#17 in CLAUDE.md) — e.g. `mppm-ddtoggle`, not a reused `if-ddtoggle` or
  another spinoff's prefix. Purely cosmetic "look-family" classes with zero page data (e.g. `if-navlink-text`,
  the plain nav-link text color/weight) are fine to keep shared, unforked — that's deliberate and correct.
- **Write the component's own `description` field** stating what it is and where it came from
  (`set_component_metadata`). Update it again, briefly, any time something nontrivial is fixed on it —
  the full story still goes in a dated CLAUDE-HISTORY.md entry; the description is just a short pointer
  plus a one-line summary, not the whole account.

---

## 2. The dropdown widget is Webflow's own native `Dropdown` element — use it as-is, don't reinvent it

Structure (confirmed, this is what every working dropdown on this project looks like):

```
DropdownWrapper   (.w-dropdown)         ← holds data-hover/data-delay, see §3
  DropdownToggle  (.w-dropdown-toggle)  ← MUST have its content wrapped in a populated <div>, see §5
    <div>  (display:inline-flex; align-items:center; gap)
      Link (TextLink)   ← the label itself; give it a REAL href if it must navigate, see §4
      [caret element]   ← see §6, do NOT use a native Icon widget built via API
  DropdownList    (.w-dropdown-list)
    Link (TextLink) × N  ← sub-items. See §2a — do NOT use Webflow's "DropdownLink" element type.
```

**§2a — sub-items must be `type:"TextLink"`, never Webflow's native `DropdownLink` type.** A
`DropdownLink`-typed element (what you get if you insert a dropdown's sub-item a certain way) **rejects
`set_link` outright** — confirmed error: *"This element doesn't support links (only Link elements do)."*
If you find existing dead `DropdownLink` sub-items with no href (a real, already-seen failure mode — see
CLAUDE-HISTORY.md §305), don't fight `set_link` on them: create a replacement `TextLink` positioned
`before` the dead one (style matching the working siblings, attribute `class:"w-dropdown-link"` added
manually so Webflow's own dropdown-link styling still applies), verify it, THEN remove the old one in a
**separate** call (HARD RULE #13 — never batch create/remove or move/remove in one call).

---

## 3. Hover-to-open is a native ATTRIBUTE — not custom JS, and the API does not set it for you

Webflow's "open dropdown on hover" setting compiles to two plain HTML attributes on the
**DropdownWrapper**: `data-hover="true"` and `data-delay="200"` (the close-delay in ms; 200 is this
project's established value — match it for consistency). **When you insert a Dropdown via the Designer's
own UI and pick "Hover" in its settings, these are set automatically. When you build a dropdown element
tree via the MCP/API, they are NOT set automatically** — the dropdown silently defaults to click-only.

**Always explicitly `set_attributes` on the DropdownWrapper:** `data-hover:"true"`, `data-delay:"200"`.
Verify by fetching the live compiled HTML and confirming both attributes are present on the wrapper div —
don't assume from the Designer canvas (see §9).

To verify hover genuinely opens the list, check the **TOGGLE** and **LIST** elements, not the wrapper —
Webflow adds the `w--open` class to `.w-dropdown-toggle` and `.w-dropdown-list` on open, **never to the
outer `.w-dropdown` wrapper itself**. A check that looks for `w--open` on the wrapper will always read
false and is not evidence of a bug.

---

## 4. A real link nested inside the toggle will NOT navigate on click — by default, and this is expected

Webflow's own `.w-dropdown-toggle` click handler runs on every click anywhere inside the toggle (to
open/close the list) and this suppresses a nested real `<a href>`'s native navigation — confirmed
empirically (2026-09-22, UMD I-Corps, CLAUDE-HISTORY.md §215): click the label, the list flickers
open, the URL never changes.

**Fix (already proven, reuse it, don't reinvent it):** a small click-passthrough JS module in the shared
`idea-factory.js`, pattern name `<prefix>-dd-toggle-navlink`. It selects `.<toggle-class> .if-navlink-text[href]`
and on click does `window.location.href = el.getAttribute('href')` — **critically, it never calls
`preventDefault()` or `stopPropagation()`**, so the native open/close behavior for a click on the caret
(away from the label text) is completely undisturbed. Per HARD RULE #17, **each spinoff gets its own
copy of this module**, keyed to its own forked toggle class (e.g. `.mppm-ddtoggle .if-navlink-text[href]`)
— the original shared `dd-toggle-navlink` module (keyed to `.if-ddtoggle`) will not match a forked class,
so a new spinoff needs its own small duplicate, not a change to the shared one.

If the label element already carries a real `linkType:"page"`/`linkType:"url"` link in Webflow's own
Designer data, **that's sufficient** — the passthrough module reads the compiled `href` at click time, it
doesn't care how the href got there.

---

## 5. ⭐ THE SINGLE COSTLIEST GOTCHA — wrap the toggle's content in a populated `<div>`, always, deliberately

A separate, **sitewide, non-spinoff-specific** shared script (`idea-factory.js`, module `nav`) runs on
**every page of every site** and scans everything matching `.if-nav-link, .if-nav-sublink,
.w-dropdown-toggle, .if-give-btn-solid` for a **direct child `<div>`**:

- Direct-child div found, with plain text and no children of its own → tags it `if-mtext` (harmless;
  feeds a separate desktop text-measurement module, §8).
- **No direct-child div found at all → the element's ENTIRE contents are destroyed and replaced with one
  flat `<span class="if-mtext">` holding the concatenated `textContent` of everything that used to be
  there** — silently deleting any real `href`, and silently fusing a label and a separately-styled caret
  into one unstyled, unspaced blob of text.

The traditional toggle shape (`Icon(div) + Link`) survived this only by accident: the Icon happens to
render as an (empty-text) `<div>`, which satisfies "found a div" without satisfying "has text," so neither
branch fires and the real content is left alone. **Nobody had ever written this down before §305** — it
was discovered only after replacing the Icon with a plain `<p>` caret broke both the spacing and the
click-navigation in one shot, which read at first like two unrelated bugs and wasted real time chasing
each separately before the actual single root cause was found.

**THE RULE, absolute, every time, for every dropdown toggle built from here on:** wrap the toggle's
label + caret in a plain `Block` (`<div>`) as the **toggle's sole direct child**, styled
`display:inline-flex; align-items:center; grid-column-gap:<Npx>; grid-row-gap:<Npx>` (the gap property,
written longhand per HARD RULE #4, also solves §7's spacing requirement in the same element — don't
solve spacing with a stray margin on the caret instead). Because this div has **more than zero children**,
neither of the `nav` module's branches ever fires — the toggle is immune **by construction**, not by
accident. Verify by fetching the live `innerHTML` after publish and confirming it still shows the real
nested `<a href>` + caret, not a single collapsed `<span class="if-mtext">`.

This applies **regardless of what the caret itself is** — a native Icon, a styled text character (§6),
anything. The div-wrapping requirement is independent of and comes before that choice.

---

## 6. The caret/arrow glyph — do NOT trust Webflow's native `Icon` widget when built via the API

A native `type:"Icon"` element created through `data_element_builder`/`data_element_tool` carries a
structural class like `w-icon-dropdown-toggle`, but **the CSS rule that gives that class its actual
glyph, size, and content is registered by Webflow's own Designer-side "insert dropdown" action — building
an Icon element headlessly does not perform that registration.** Confirmed directly (2026-11-03): fetched
the live compiled stylesheet and grepped for the exact selector — **zero matches.** The div is there, the
class is there, nothing paints it, in any real browser, with no error anywhere. It can also render as a
malformed overlapping mark rather than cleanly empty space, which looks like a rendering glitch rather
than "nothing," and is easy to misdiagnose as a caching or browser issue (it isn't — verify by grepping
the actual fetched stylesheet, not by trying different browsers).

**The Designer canvas is not a safe check for this specific failure** — it can show the icon rendering
fine there while the published output shows nothing. This is a DIFFERENT and additional caveat beyond the
usual "Designer doesn't load the shared JS/CSS file" warning (CLAUDE.md HARD RULE #2) — here, Webflow's
own internal Designer-only rendering path for a native widget disagrees with its own published output.

**Reliable fix, use this by default instead of a native Icon:** a plain Unicode character ("▼") in its own
small element (a native `Paragraph`, with all four margin longhands explicitly zeroed — a `<p>`'s default
browser margin will otherwise throw off the flex row's vertical centering), styled smaller and slightly
muted relative to the label — **~75-80% of the label's font-size, opacity ~0.85** is the proportion
already established and visually correct on this project's one genuinely-working native-Icon example
(UMD I-Corps' "Program" dropdown: 11px caret against a 14px label). Match that ratio, don't invent a new
one. This element is the caret referenced in §5's wrapping div.

If a native Icon element is ever used anyway (e.g. because the Designer UI itself was used to insert the
dropdown, which DOES register the CSS correctly), the rule is simple: **before trusting it, fetch the
live compiled stylesheet and grep for a real rule matching its class.** Don't infer from the HTML class's
mere presence.

---

## 7. Spacing between label and caret

Solved for free by §5's wrapping div (`grid-column-gap`/`grid-row-gap`, written longhand per HARD RULE
#4). Do not also add a margin on the caret element itself "just in case" — that produces inconsistent,
compounding spacing and makes the actual effective gap harder to reason about. One mechanism, one place.

---

## 8. Responsive / mobile behavior

- **The nav collapses to the mobile hamburger menu at the `medium` breakpoint (≤991px)** — this is the
  established, sitewide convention (see CLAUDE.md §2). A duplicated, proven nav component already carries
  this correctly; just don't break it.
- A separate desktop-only (`>991px`) module, `nav-link-exact-fit`, measures each plain `.if-nav-link`'s
  rendered text width and pins the link's own CSS `width` to match. **It explicitly excludes any element
  whose class contains the literal substring `if-ddtoggle`** (dropdown toggles pair text with a caret, a
  different composition this module isn't meant to size) — but in practice this exclusion is moot for a
  properly-built toggle, because the outer query that feeds this module only selects elements already
  carrying `.if-nav-link` in the first place, and a correctly-forked toggle class (e.g. `mppm-ddtoggle`)
  never carries that class to begin with. Still, if a future nav's toggle is ever combo'd onto a base
  that DOES carry `.if-nav-link`, double-check this module's exclusion still fires for it (i.e. the
  toggle's own class string still contains "ddtoggle" somewhere) — or it will get incorrectly width-pinned.
- Mobile hamburger open/close interaction is handled by existing shared modules (`nav-toggle-js` and
  related) — inherited automatically from a duplicated working component; nothing to rebuild.

---

## 9. Same-page anchor links inside a nav (jump links)

Not specific to dropdowns, but squarely "nav menu, all aspects," so it belongs in this guide:

- **Put the jump target's `id` on the REAL element being jumped to (usually its heading), never on a
  fake invisible placeholder element built just to hold an id** — CLAUDE.md HARD RULE #14 covers this in
  full; it has recurred more than once.
- **Any nav link that jumps to a same-page (or cross-page) section needs `data-smooth-scroll="1"`** (plus
  `data-scroll-gap="<n>"` where a specific header-clearance offset is needed) so it lands below the fixed
  red header bar instead of underneath it, and animates rather than jumping instantly.
- **Test same-page anchor clicks as a SEQUENCE, not once from a fresh page load** (CLAUDE.md HARD RULE
  #21). The CBSCF incident (history §276) — a same-page anchor landing short on the SECOND click in a
  row, specifically because the mobile menu's still-collapsing height was baked into the scroll-target
  calculation — only ever showed up across a sequence of clicks, never on an isolated first click.

---

## 10. Verification checklist — run every item, every time, before calling nav work done

Testing via the Designer canvas alone is **not sufficient** for anything in this checklist except pure
visual layout — the shared JS file, the icon-CSS registration gap, and the click-passthrough mechanism are
all either shared-JS-dependent or compiled-CSS-dependent, and the Designer canvas does not reliably
reproduce any of them (CLAUDE.md HARD RULE #2, plus §6's extra Designer-vs-published caveat above). Fetch
the actual **published** HTML/CSS, or drive a real headless browser against the actual published URL.

1. **Structure immunity (§5):** fetch live `innerHTML` of the toggle — confirm it still shows the real
   nested link + caret, NOT one collapsed `<span class="if-mtext">`.
2. **Hover attributes (§3):** confirm `data-hover="true"` and `data-delay="200"` are present on the
   DropdownWrapper in the live HTML.
3. **Icon/caret CSS (§6):** if a native Icon widget is used anywhere, grep the live compiled stylesheet
   for a real rule matching its class. If using the text-character approach, just confirm the character
   is actually present in the live text content.
4. **Hover-open, measured correctly (§3):** check `w--open` / computed `display` on the **toggle and
   list**, not the wrapper. Test a **sequence**: hover dropdown A, then (without reloading) hover dropdown
   B — A should close, B should open; move the mouse away entirely — both should close after the delay;
   re-hover A again in the same session — it must still open cleanly a second time.
5. **Click-navigate (§4):** click the **label text itself** (not just anywhere in the toggle) and confirm
   the URL actually changes to the real destination. Separately confirm clicking the caret/empty toggle
   area away from the label still only opens/closes the list.
6. **Sub-items (§2a):** confirm every sub-link has a real, correct `href` — a `DropdownLink`-typed element
   with no link silently does nothing when clicked; don't assume "it's in the list, it must work."
7. **Repeat items 1-6 on at least 2-3 different pages that share the same nav component instance** — to
   confirm the fix is genuinely centralized (one component, many instances) and not accidentally scoped
   to a single page.
8. **Don't trust one flaky negative reading as proof of a regression.** A single "hover didn't open" or
   similar result that contradicts otherwise-consistent passes is quite possibly a one-off test-harness
   timing artifact (this happened twice during the MPPM fix, both times ruled out by a clean, isolated
   4x-repeated rerun) — rerun cleanly several times before reporting a regression that isn't there.
9. **Component hygiene:** confirm the component is filed under its own spinoff's group (not a leftover
   source group), and its `description` field is current.

---

## 11. What this guide deliberately does NOT cover

Exact colors, spacing values, fonts, and other taste calls are per-spinoff decisions, not dictated here —
this guide is about the **mechanism** (hover, click, responsive collapse, the div-trap, the icon-CSS gap),
which is universal across every site in this project, not about how any one nav should look.
