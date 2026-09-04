#!/usr/bin/env python3
"""
audit-shorthands.py — catch any NON-natively-editable (bundled shorthand) style value sitewide.

WHY THIS EXISTS (see CLAUDE.md HARD RULE #4 + §86/§86a/§86b):
Webflow's Designer panels (Borders, Spacing, Backgrounds, Typography, Flex-child,
Transitions) are built from the SEPARATE longhand sub-fields. A property written as a
*bundled shorthand* (border / padding / margin / flex / gap / border-radius / background /
font / transition) RENDERS fine on the published page but shows BLANK / uneditable in the
panel. Everything on this site must be stored as separate longhand fields so it stays
hand-editable in Webflow. This script flags any regression to bundled values.

HOW TO RUN (in a session with the Webflow MCP):
  1. Pull every style with properties across breakpoints + pseudos:
       data_style_tool get_styles  query="all"  include_properties=true
         include_breakpoints=["main","medium","small","tiny"]
         include_base_pseudos=[hover,focus,focus-visible,active,before,after,
                               placeholder,first-child,last-child,
                               nth-child(odd),nth-child(even),visited,empty,focus-within]
         include_breakpoints_pseudos=[hover,focus,before,after,last-child,first-child]
     (The result is large; the tool saves it to a file — note that path.)
  2. python3 tools/audit-shorthands.py <that-file>
  3. EXPECT: "CLEAN — 0 bundled shorthands." Exit code 0.
     Any hit = a property that must be rewritten as its separate longhand fields
     (use the four-field forms in HARD RULE #4; for multi-value transition, each
     longhand is a comma-separated list aligned by position).

NOTE: this must run against the STORED style data (get_styles), NOT the compiled CSS —
Webflow re-optimizes compiled output back to shorthand, so the compiled CSS can't tell you
whether the stored value is editable. Only the stored data can.
"""
import json, sys, collections

# Bundled shorthands that a per-field Designer panel reads as longhand -> must be split.
BUNDLED = {
    "border","border-top","border-right","border-bottom","border-left",
    "border-width","border-style","border-color","border-radius",
    "padding","margin","flex","gap","grid-gap","background","font",
    "transition",           # corrected 2026-07-14 (§86b): transition is NOT an exception
}
# Genuinely fine bundled (single-token, no per-field panel): overflow, text-decoration, inset, etc.

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
        print("usage: python3 tools/audit-shorthands.py <get_styles-dump.json>"); sys.exit(2)
    data = json.load(open(sys.argv[1]))
    styles = []; walk(data, styles)
    hits = []
    for st in styles:
        for ctx, props in bags(st):
            for prop, val in props.items():
                if prop in BUNDLED and isinstance(val, str):
                    hits.append((st["name"], st.get("id","?"), ctx, prop, val))
    print(f"styles scanned: {len(styles)}")
    if not hits:
        print("CLEAN — 0 bundled shorthands. Every style is stored as separate, editable longhand fields.")
        sys.exit(0)
    print(f"!! {len(hits)} BUNDLED-SHORTHAND VALUES FOUND (each must be split into longhand fields):")
    for name, sid, ctx, prop, val in hits:
        print(f"   {name}  [{ctx}]  {prop}: {val}   (id {sid})")
    byp = collections.Counter(h[3] for h in hits)
    print("by property:", dict(byp))
    sys.exit(1)

if __name__ == "__main__":
    main()
