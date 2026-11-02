#!/usr/bin/env python3
"""
audit-clamp-grid.py — catch any clamp() font sizing or unjustified display:grid sitewide.

WHY THIS EXISTS (see CLAUDE.md HARD RULES #2/#12 + CLAUDE-HISTORY.md §223/§224):
This project banned clamp() for font-size (fixed per-breakpoint px only, set via native
Webflow breakpoints) and banned CSS Grid as a default layout tool (Flexbox is the default;
Grid only for genuine 2D placement Flexbox can't express) after the same violations shipped
repeatedly across multiple sessions/pages without being caught until the user found them.
This script is the mechanical backstop so it stops depending on a session remembering the
rule — same shape as HARD RULE #4's tools/audit-shorthands.py.

HOW TO RUN (in a session with the Webflow MCP):
  1. Pull every style with properties across breakpoints + pseudos:
       data_style_tool get_styles  query="all"  include_properties=true
         include_breakpoints=["main","medium","small","tiny"]
         include_base_pseudos=[hover,focus,focus-visible,active,before,after,
                               placeholder,first-child,last-child,
                               nth-child(odd),nth-child(even),visited,empty,focus-within]
         include_breakpoints_pseudos=[hover,focus,before,after,last-child,first-child]
     (The result is large; the tool saves it to a file — note that path.)
  2. python3 tools/audit-clamp-grid.py <that-file>
  3. EXPECT: "CLEAN — 0 unjustified clamp()/grid violations." Exit code 0.
     Any hit = a property that must be converted per HARD RULE #2 (clamp -> fixed
     per-breakpoint px, derived by evaluating the old clamp formula at each breakpoint's
     own boundary width: 1440/991/767/479) or HARD RULE #12(a) (grid -> flex, unless it's
     a genuine documented exception below).

NOTE: run against the STORED style data (get_styles), NOT the compiled CSS — same reasoning
as audit-shorthands.py: only stored data reflects what's actually in the Designer.
"""
import json, sys, collections

# Style names allowed to keep display:grid — each entry here required the user's own,
# explicit, one-at-a-time sign-off (never add one speculatively). Currently:
#   icorps-team-bio-panel — grid-template-rows:0fr->1fr accordion-collapse animation;
#     Flexbox has no equivalent for animating to a true content-driven auto height with
#     pure CSS. User confirmed 2026-09-23 (CLAUDE-HISTORY.md §224 follow-up): "LEAVE THOSE
#     ACORDION PIECES AS THEY ARE."
GRID_EXCEPTIONS = {
    "icorps-team-bio-panel",
}

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
        print("usage: python3 tools/audit-clamp-grid.py <get_styles-dump.json>"); sys.exit(2)
    data = json.load(open(sys.argv[1]))
    styles = []; walk(data, styles)
    hits = []
    for st in styles:
        name = st["name"]
        for ctx, props in bags(st):
            for prop, val in props.items():
                if not isinstance(val, str):
                    continue
                if "clamp(" in val:
                    hits.append((name, st.get("id", "?"), ctx, prop, val, "clamp"))
                elif prop == "display" and val.strip() == "grid" and name not in GRID_EXCEPTIONS:
                    hits.append((name, st.get("id", "?"), ctx, prop, val, "grid"))
    print(f"styles scanned: {len(styles)}")
    if not hits:
        print("CLEAN — 0 unjustified clamp()/grid violations.")
        sys.exit(0)
    print(f"!! {len(hits)} VIOLATIONS FOUND:")
    for name, sid, ctx, prop, val, kind in hits:
        print(f"   [{kind}] {name}  [{ctx}]  {prop}: {val}   (id {sid})")
    byk = collections.Counter(h[5] for h in hits)
    print("by kind:", dict(byk))
    sys.exit(1)

if __name__ == "__main__":
    main()
