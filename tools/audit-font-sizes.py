#!/usr/bin/env python3
"""
audit-font-sizes.py — catch any text style on the site with a font-size below 16px.

WHY THIS EXISTS (see CLAUDE.md HARD RULE #12, part (b)):
The site has a standing 16px minimum body-text floor — nothing ships smaller than
16px without the user's explicit, individual sign-off, and "it's a special case" is
never assumed without confirming it. That rule has always depended on each session
remembering to check font-size by hand while building a section, and that has already
failed silently: 7 sub-16px violations (buttons, note text, date pills, deadline text,
cohort notes, and a downloads line, sizes ranging 13-15px) shipped on the
I-Corps-Schedule page and sat live undetected until a manual pass caught them. This
script makes that check mechanical and sitewide instead of relying on memory — the
same fix audit-shorthands.py (HARD RULE #4) already applied to the shorthand-
editability check.

HOW TO RUN (in a session with the Webflow MCP):
  1. Pull every style with properties across breakpoints + pseudos. A style's
     font-size can differ PER BREAKPOINT and PER PSEUDO STATE — something fine at
     desktop can be too small at `small`/`tiny`, or a `:hover`/`:before` variant can
     be undersized even when the base state isn't — so check ALL of them, never just
     the one being actively edited:
       data_style_tool get_styles  query="all"  include_properties=true
         include_breakpoints=["main","medium","small","tiny"]
         include_base_pseudos=[hover,focus,focus-visible,active,before,after,
                               placeholder,first-child,last-child,
                               nth-child(odd),nth-child(even),visited,empty,focus-within]
         include_breakpoints_pseudos=[hover,focus,before,after,last-child,first-child]
     (The result is large; the tool saves it to a file — note that path.)
  2. python3 tools/audit-font-sizes.py <that-file>
  3. EXPECT: "CLEAN — 0 font-size values below 16px." Exit code 0.
     Any hit = a font-size that must be raised to >= 16px, OR (per HARD RULE #12b)
     the user's explicit, individual sign-off obtained BEFORE it ships as-is.

HOW VALUES ARE RESOLVED TO A PIXEL FLOOR (read this before trusting a "CLEAN" run —
the point is never to string-match specific px values like "13px"/"14px"/"15px", but
to actually parse the number and compute what it resolves to):
  - "16px" / "14.5px"             -> parsed directly, no conversion needed.
  - "1rem" / "0.9rem"             -> resolved ASSUMING the site's root <html> is left
                                      at the unmodified browser default of 16px (true
                                      for this site as of this writing — this script
                                      does not itself verify the root size). If that
                                      ever changes sitewide, this conversion is wrong;
                                      re-check by hand.
  - "12pt"                        -> converted at the standard CSS 96dpi reference
                                      (1pt = 96/72 px).
  - a bare number, no unit        -> ASSUMED to mean px. CSS itself requires a unit on
                                      font-size, so a unitless value here most likely
                                      means a raw number came through without its unit
                                      string attached rather than a genuinely unitless
                                      style — treat a hit here with a little extra
                                      suspicion and confirm by hand.
  - "clamp(MIN, PREFERRED, MAX)"  -> per the CSS spec the rendered value can never go
                                      below MIN, so MIN is the true floor this text can
                                      ever shrink to, and that's what gets checked
                                      (PREFERRED is ignored — it's usually a vw term
                                      this script has no viewport to resolve, and MAX
                                      is irrelevant to a floor check). This site uses
                                      clamp() extensively for fluid type per HARD RULE
                                      #2 — a fluid heading is NOT exempt from the 16px
                                      floor, it just needs its floor checked instead of
                                      a single static number.
  - "em" / "%" / "vw" / "vh" / "vmin" / "vmax" / etc. used on their own (not paired
    with a resolvable px/rem/pt number inside a clamp()/calc()) -> relative to
    something (a parent's font-size, the viewport) that isn't visible from a style
    dump alone, so these CANNOT be confidently resolved to a px floor. They are
    listed separately as "needs manual review" — never silently dropped, and never
    silently counted as passing. A "CLEAN" result requires ZERO of these too, not
    just zero confirmed violations (per HARD RULE #3: a check that can be satisfied
    by a partial sweep isn't a real check).
  - A bare calc()/min()/max() directly on font-size (i.e. not the MIN argument of a
    clamp()) is rare and only handled approximately: every px/rem/pt numeric token
    found anywhere in the expression is resolved and the smallest is used as the
    floor, clearly labeled "approx" in the report. Treat any "approx" result with
    extra scrutiny — it is a best-effort fallback, not a confident parse.
  - Anything else unparseable (garbage data, an unrecognized unit, etc.) also falls
    into "needs manual review" rather than crashing the script or being silently
    ignored.

NOTE: like audit-shorthands.py, this must run against the STORED style data
(get_styles), NOT the compiled/published CSS. The stored data is what the Designer
panel and this rule are actually about, and it's the only place a clamp()'s literal
MIN argument or a not-yet-converted rem value is visible as authored — compiled CSS
can fold/reorder values in ways that make them harder to parse reliably.

NOTE: text on buttons is a standing, sitewide exception to the floor (explicit user
sign-off, 2026-09-22 — CLAUDE-HISTORY.md §207/§208). Any style whose name contains
"btn" (case-insensitive) is reported separately as exempt, not as a violation, and
does not block a CLEAN result. Plain body/label/paragraph text is NOT covered by this
exception and must still meet the floor.

NOTE: this only checks the `font-size` property itself. A bundled `font` shorthand
(e.g. "italic bold 12px/1.5 Arial") that embeds a sub-16px size is a SEPARATE problem
covered by audit-shorthands.py (HARD RULE #4 — bundled shorthand must be split into
longhand fields regardless of size). Run that script first; once it's clean, every
font-size lives in its own separate field and this script can see it.
"""
import json, sys, re, collections

# The standing floor (CLAUDE.md HARD RULE #12b): nothing ships below this without the
# user's explicit, individual sign-off.
FLOOR_PX = 16.0

# Text on buttons is a standing, sitewide exception to the floor (user's explicit,
# general sign-off, 2026-09-22 — see CLAUDE-HISTORY.md §207/§208: "TEXT ON BUTTONS IS
# A SPECIAL CASE"). A style name containing "btn" (case-insensitive) is treated as
# button text and reported separately, not as a violation. This is a name heuristic,
# not a tag/role lookup the style dump exposes — if it ever mis-tags something that
# is NOT actually button text, fix the false positive by hand rather than loosening
# this pattern sitewide.
BUTTON_NAME_RE = re.compile(r'btn', re.IGNORECASE)

# ---- value -> px resolution --------------------------------------------------------

# Units this script converts to px with full confidence, and their px-per-unit factor.
# rem assumes the site's (unmodified) 16px root; pt uses the standard CSS 96dpi
# reference (1pt = 96/72 px). See the header NOTE above before trusting these blindly.
FIXED_UNIT_PX = {"px": 1.0, "rem": 16.0, "pt": 96.0 / 72.0}

# Units relative to something this script cannot see from a style dump alone (a
# parent's font-size, the viewport) -> never silently resolved to a number.
RELATIVE_UNITS = {"em", "%", "vw", "vh", "vmin", "vmax", "vi", "vb", "ex", "ch"}

_FULL_VALUE_RE = re.compile(r'(-?\d+(?:\.\d+)?)\s*([a-zA-Z%]+)?')
_FIXED_TOKEN_RE = re.compile(r'(-?\d+(?:\.\d+)?)\s*(px|rem|pt)\b', re.IGNORECASE)


def _split_top_level_commas(s):
    """Split a string on commas that sit at paren-depth 0 (so a calc()'s own commas,
    if any, don't get cut). Used to pull clamp(MIN, PREFERRED, MAX) apart."""
    parts, depth, cur = [], 0, []
    for ch in s:
        if ch == "(":
            depth += 1; cur.append(ch)
        elif ch == ")":
            depth -= 1; cur.append(ch)
        elif ch == "," and depth == 0:
            parts.append("".join(cur)); cur = []
        else:
            cur.append(ch)
    parts.append("".join(cur))
    return [p.strip() for p in parts]


def _scan_min_fixed_token(s):
    """Fallback for a compound/functional value (a bare calc(), a malformed clamp()
    argument, etc.): pull every px/rem/pt numeric token found anywhere in the string
    and resolve the smallest. Approximate by construction, so always labeled as such;
    relative-unit tokens (em/%/vw/...) are deliberately ignored here too, same as
    everywhere else in this script."""
    vals = [float(n) * FIXED_UNIT_PX[u.lower()] for n, u in _FIXED_TOKEN_RE.findall(s)]
    if vals:
        return min(vals), f"approx: min of {len(vals)} fixed-unit token(s) in '{s}'"
    return None, f"unresolved: no resolvable fixed-unit token in '{s}'"


def resolve_floor_px(raw):
    """Resolve a font-size CSS value string to the lowest px it can ever render at.
    Returns (px: float | None, method: str) — px is None when the value genuinely
    can't be pinned down from the style data alone (a bare relative unit, garbage,
    etc.); method always explains how (or why not), for the report."""
    s = raw.strip()
    low = s.lower()

    if low.startswith("clamp(") and s.endswith(")"):
        args = _split_top_level_commas(s[len("clamp("):-1])
        if len(args) == 3:
            px, method = resolve_floor_px(args[0])  # arg 0 = MIN = the true floor
            if px is not None:
                return px, f"clamp floor: {method}"
        return _scan_min_fixed_token(s)

    m = _FULL_VALUE_RE.fullmatch(s)
    if m:
        num = float(m.group(1))
        unit = (m.group(2) or "").lower()
        if unit == "":
            return num, "unitless (assumed px)"
        if unit in FIXED_UNIT_PX:
            label = "px" if unit == "px" else f"{unit}->px"
            return num * FIXED_UNIT_PX[unit], label
        if unit in RELATIVE_UNITS:
            return None, f"unresolved: relative unit '{unit}' depends on context this script can't see"
        return None, f"unresolved: unrecognized unit '{unit}'"

    if "(" in s:  # a bare calc()/min()/max()/etc.
        return _scan_min_fixed_token(s)

    return None, f"unresolved: unparseable value '{s}'"


# ---- style-dump walking (identical shape to audit-shorthands.py) -------------------

def walk(x, out):
    if isinstance(x, dict):
        if isinstance(x.get("name"), str) and isinstance(x.get("properties"), dict) and "id" in x:
            out.append(x)
        for v in x.values(): walk(v, out)
    elif isinstance(x, list):
        for v in x: walk(v, out)


def bags(style):
    """yield (context_label, {prop:val}) for base + every breakpoint + every pseudo."""
    p = style.get("properties", {})
    def emit(ctx, node):
        if isinstance(node, dict):
            if isinstance(node.get("properties"), dict):
                yield (ctx, node["properties"])
            for pn, pv in (node.get("pseudos", {}) or {}).items():
                if isinstance(pv, dict) and isinstance(pv.get("properties"), dict):
                    yield (f"{ctx}:{pn}", pv["properties"])
    if isinstance(p.get("base"), dict):
        yield from emit("base", p["base"])
    for bp, obj in (p.get("breakpoints", {}) or {}).items():
        yield from emit(bp, obj)


def main():
    if len(sys.argv) != 2:
        print("usage: python3 tools/audit-font-sizes.py <get_styles-dump.json>"); sys.exit(2)
    data = json.load(open(sys.argv[1]))
    styles = []; walk(data, styles)

    violations = []      # confirmed: resolved px < FLOOR_PX, NOT button text
    unresolved = []       # couldn't confidently resolve to a px floor at all
    button_exempt = []    # resolved px < FLOOR_PX but name looks like button text -> exempt

    for st in styles:
        for ctx, props in bags(st):
            raw = props.get("font-size")
            if not isinstance(raw, str):
                continue
            px, method = resolve_floor_px(raw)
            if px is None:
                unresolved.append((st["name"], st.get("id", "?"), ctx, raw, method))
            elif px < FLOOR_PX:
                entry = (st["name"], st.get("id", "?"), ctx, raw, px, method)
                if BUTTON_NAME_RE.search(st["name"]):
                    button_exempt.append(entry)
                else:
                    violations.append(entry)

    print(f"styles scanned: {len(styles)}")

    if not violations and not unresolved:
        print(f"CLEAN — 0 font-size values below {FLOOR_PX:g}px outside the button-text "
              f"exception. Every non-button font-size on the site resolves to >= {FLOOR_PX:g}px.")
        if button_exempt:
            print(f"({len(button_exempt)} button-text value(s) under {FLOOR_PX:g}px, "
                  f"exempt per standing user sign-off — see CLAUDE-HISTORY.md §207/§208):")
            for name, sid, ctx, raw, px, method in button_exempt:
                print(f"   {name}  [{ctx}]  font-size: {raw}   -> {px:.2f}px  ({method})   (id {sid})")
        sys.exit(0)

    if violations:
        print(f"!! {len(violations)} FONT-SIZE VIOLATION(S) BELOW {FLOOR_PX:g}PX "
              f"(HARD RULE #12b — raise to >= {FLOOR_PX:g}px, or get the user's "
              f"explicit, individual sign-off before shipping as-is):")
        for name, sid, ctx, raw, px, method in violations:
            print(f"   {name}  [{ctx}]  font-size: {raw}   -> {px:.2f}px  ({method})   (id {sid})")
        byctx = collections.Counter(v[2] for v in violations)
        print("by context:", dict(byctx))

    if unresolved:
        print(f"?? {len(unresolved)} font-size value(s) could NOT be auto-resolved to a "
              f"definite px floor — CHECK THESE BY HAND (a relative unit such as "
              f"em/%/vw on its own, or an unparseable value):")
        for name, sid, ctx, raw, method in unresolved:
            print(f"   {name}  [{ctx}]  font-size: {raw}   ({method})   (id {sid})")

    # Non-zero on EITHER bucket: a run that leaves values unchecked is not a clean
    # bill of health, even with zero confirmed violations (HARD RULE #3 — no partial
    # sweep gets reported as done).
    sys.exit(1)


if __name__ == "__main__":
    main()
