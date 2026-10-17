# Kickoff prompt for Claude Code

Paste the block below into Claude Code, running in the folder where you unzipped this handoff.
Replace `WORKSPACE_NAME` and `SITE_NAME` first.

---

I'm building the UMD Startup Showcase site in Webflow, and I want you to do the build through
the Webflow MCP server. This folder contains a complete written specification. Work in phases
and stop for my review between each one.

**Phase 0 — connect and confirm. Build nothing yet.**

1. Verify Node.js is 22.3 or higher. If it isn't, stop and tell me.
2. Add the Webflow MCP server scoped to this project folder only:
   `claude mcp add -s project webflow ...` — use the exact current command from
   https://developers.webflow.com/mcp/installing/claude-code. Fetch that page if you are not
   certain of the syntax. Do not invent flags.
3. Run the OAuth flow. A browser window will open; I'll authorize the workspace
   `WORKSPACE_NAME`, the site `SITE_NAME`, and the MCP Bridge App install. Wait for me to
   confirm I'm done before continuing.
4. List the sites you can see, confirm `SITE_NAME` is among them, and report which Data API
   and Designer API tools you have.
5. Tell me when you need the Webflow Designer open with the MCP Bridge App running (Apps
   panel, press `E`). I'll open it and confirm. Do not attempt Designer API calls until I've
   said the Bridge App is connected.

**Phase 1 — read the spec. Still build nothing.**

Read all four documents in this order and treat them as authoritative:

- `README.md` — overview, build order, known pitfalls
- `SPEC-01-TOKENS.md` — colour, type, spacing, motion, focus
- `SPEC-02-COMPONENTS.md` — nav, footer, buttons, logo tiles, the knockout headline device,
  and every hover behaviour
- `SPEC-03-PAGES.md` — every section of every page with exact copy and every URL

Then open `design-reference/UMD Startup Showcase.dc.html` in a browser. It is self-contained
and switches between the three pages via its nav. It is a **design reference**, not production
code — do not paste its markup into a Webflow Embed. Rebuild everything with native Webflow
elements, classes and CMS Collections. The only legitimate embeds are the HubSpot form and the
Lightroom gallery iframe, both specified in SPEC-03.

When you've read all of it, report back with:
- the three pages and the section stack of each
- the full token list you intend to create
- the components you intend to build
- anything in the spec you believe is ambiguous or contradictory

Wait for my sign-off before Phase 2.

**Phase 2 — foundations. Stop after each numbered step.**

1. **Fonts.** Tell me exactly which of the 7 files in `assets/fonts/` to upload and what to
   name each family and weight/style pairing (SPEC-01 §2). Wait while I do it. Enable Roboto
   Condensed 400 + 700 from Google Fonts.
2. **Colour variables**, using the exact hex values in SPEC-01 §1. Do not approximate. Do not
   add colours that aren't listed.
3. **Type classes** for all 25 styles in SPEC-01 §2. Tell me which approach you're taking for
   the `clamp()` values and why.
4. **Global classes** for the 5 button variants, the 3 logo-tile variants, the pattern strip,
   and the knockout headline device.

**Phase 3 — assets and CMS.**

1. Upload the 11 photos from `assets/photos/` and the 2 SVGs from `assets/pattern/`.
2. Upload all 49 logos from `assets/logos/`. **These files are final.** They have been
   trimmed to their ink, several were recoloured for white grounds, and 22 carry a deliberate
   size correction baked in as transparent padding. Do not crop, pad, resize or recolour any
   of them.
3. Create the 4 CMS Collections in SPEC-02 §10 and import the CSVs from `content/`.
   Preserve the `Order` column as the display order.

**Phase 4 — pages, one section at a time.**

Build Home first, top section to bottom, pausing after each section so I can look at the
canvas. Then the 2025 page. Then Updates. Follow SPEC-03 exactly: spacing, sizes, weights,
tracking, and copy. **Never substitute placeholder copy — every string is in the spec.**

**Phase 5 — interactions.**

Build every hover in the interaction inventory at the end of SPEC-03. Note that several of
them target a specific child element rather than the link itself — the label span, or the
logo tile's inner span — because the parent must stay still while the child animates. Get the
structure right before wiring these.

**Ground rules for the whole job.**

- **Ask before deviating.** If a Webflow constraint prevents an exact match, stop and describe
  the tradeoff. Do not silently pick an alternative.
- **Do not round the odd-looking numbers.** `-0.217em`, `0.42em`, `1.069`, `31px`, `14.06px`,
  `0.0625em` and `0.028em` were each derived from a measurement, and the derivation is given
  in the spec under a `WHY:` note. Read those notes.
- **Do not add content.** No 2026 agenda, speakers, exhibitors or sponsors exist. The Home
  page is deliberately lean. Do not invent placeholders.
- **Nothing below 16px**, anywhere, including form errors and legal text.
- **Zero border radius**, everywhere.
- Build the desktop breakpoint to spec first, then propose mobile treatments for review.
  Reference breakpoints 1440 and 390. Mobile has not been designed.
- **Do not publish.** Leave everything in staging until I explicitly ask.
- Designer API style operations sometimes fail on complex styles. If a call fails, tell me
  what failed and what I should set by hand. Do not retry silently, and do not simplify the
  design to make a call succeed.
- Keep a running `BUILD_LOG.md` in this folder: what you created, what failed, and what I need
  to finish manually.

Start with Phase 0.
