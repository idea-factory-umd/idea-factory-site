# UMD Startup Showcase — Website Redesign Brief

**Project:** Redesign of startupshowcase.umd.edu
**Platform:** Webflow (rebuild in the existing project; no CMS collections required)
**Brand:** University of Maryland institutional brand with *Fearlessly Forward* campaign elements. This site does **not** follow the Idea Factory brand.
**Event:** UMD Startup Showcase — November 13, 2026, Samuel Riggs IV Alumni Center, University of Maryland. By invitation only.

---

## 1. Design intent

The site should read unmistakably as University of Maryland: bold, confident, forward-moving. The brand's own words are the tone brief — bold, distinctive, relentlessly optimistic, confident, purpose-driven, ambitious, aspirational. Visually, that translates to strong red/gold/black/white blocking, angled "forward" geometry (chevrons, slanted shadowboxes), generous headline scale, and disciplined whitespace. Avoid anything that reads as a generic conference template — no decorative doodles, pastel accents, or off-palette colors.

The signature visual device for the site is the **Fearlessly Forward headline treatment**: a white slanted parallelogram (shadowbox) behind bold italic all-caps type, with staggered lines and a red forward arrow. Used in the hero and as section headers, it alone carries most of the brand personality. Everything around it stays quiet.

---

## 2. Color tokens

Core palette (from brand.umd.edu/colors and the brand book):

| Token | Name | Hex | Use |
|---|---|---|---|
| `red` | Maryland Red | `#E21833` | Primary accent: arrows, links, buttons, section blocking |
| `gold` | Maryland Gold | `#FFD200` | Secondary accent: section backgrounds, chevron pattern |
| `black` | Black | `#000000` | Headlines, text, dark sections |
| `white` | White | `#FFFFFF` | Page background, shadowboxes, reverse type |
| `gray-dark` | Dark Gray | `#454545` | Secondary text on light backgrounds |
| `gray-medium` | Medium Gray | `#7F7F7F` | Hairlines, muted labels on black only |
| `gray-light` | Light Gray | `#E6E6E6` | Subtle section backgrounds, card borders |

### Accessible pairings (WCAG AA)

Use only these text/background combinations:

**Pass:** black on white, black on gold, black on light gray, white on red, white on black, white on dark gray, gold on black, gold on dark gray, dark gray on white, dark gray on gold.

**Fail — never use for text:** red on gold, red on black, red on light gray, white on gold, gold on red, gold on white, red on anything except white.

Practical rules:
- Buttons: red background + white label, or black background + white/gold label. Never gold background + white label.
- Red text only ever on white.
- Gold sections take black text; black sections take white or gold text.

---

## 3. Typography

The brand's print faces (Druk Heavy Italic for headlines, Interstate for everything else) are licensed fonts. UMD's official digital substitutions are free Google Fonts, which is the right choice for Webflow:

| Role | Typeface | Treatment |
|---|---|---|
| H1 / hero headlines | **Source Sans 3** Black (900), italic, ALL CAPS, tight leading (~1.0), slight positive tracking | Stands in for Druk Heavy Italic inside the shadowbox treatment |
| H2 / section headers | **Source Sans 3** Black or Bold, ALL CAPS, tracking −10 to 0 | Stands in for Interstate Black; black or red (red on white only) |
| Body | **Source Sans 3** Regular, 16–18px, line-height 1.4–1.5 | Black on white/gold/light gray |
| Captions, stats, labels | **Roboto Condensed** | Compact spaces: agenda times, stat labels, eyebrow text |
| URLs / eyebrows | Source Sans 3 Bold, ALL CAPS, tracking +40 | e.g. "UMD.EDU", "BY INVITATION ONLY" |

Notes:
- If the team later licenses Interstate (font files are downloadable via brand.umd.edu for university use — check the web license terms), swap it in for Source Sans 3; the type scale stays the same.
- Crimson Text (the Bembo stand-in) is available but not needed here — it belongs to the formal/logo register, and this site's voice is the campaign register.
- Headline scale: hero ~64–96px desktop / 36–44px mobile; H2 ~28–40px; keep headlines to three lines maximum per the brand book.

---

## 4. Fearlessly Forward graphic language

### 4.1 Headline treatment (the signature element)
- White parallelogram shadowbox behind the type; the slant matches the italic angle of the type; box height ≈ 1.67× the cap height.
- Multi-line headlines stagger each successive line to the right ("forward").
- A red forward arrow (chevron) follows the last word, sized at 58% of the type cap height, separated by one space.
- Use in the hero over photography or a red/gold field, and optionally for major section headers.

### 4.2 Subheadlines
- Red arrow icon leads into the subheadline, standing left of the first word at cap height; subsequent lines align with the first letter, not the arrow.

### 4.3 Chevron pattern (horizontal trim)
- The red/gold/black forward-arrow pattern is used as a horizontal trim on the **bottom** of compositions — footer trim, section dividers, hero base. Don't scatter it as background wallpaper.
- Large single chevrons (gold, red, black) can anchor section corners, as in the brand book's ad examples and presentation templates.

### 4.4 Logo lockup rules
- Use the standard University of Maryland + *Fearlessly Forward* lockup: **black tag is primary**; reversed version over color or imagery; red tag as the alternate.
- Clear space: the height of the "M" in the wordmark on all sides. Minimum size on web: 70px height.
- Never: recolor, add effects/shadows, alter proportions, reposition the tag, or alter the tagline.
- The *Fearlessly Forward* word mark may appear standalone over a solid background or image (no stretching/distortion), but must **not** be locked up with unit logos (Mtech, UM Ventures, etc.) and cannot replace the required UMD logo.
- If *Fearlessly Forward* appears in a headline, don't repeat it with the word mark on the same composition.

### 4.5 Editorial rules
- In copy, the tagline is capitalized and italicized: *Fearlessly Forward*. Adding a verb strengthens it ("Here, we lead *Fearlessly Forward*.").
- Campaign hashtag, if used socially: #FearlesslyUMD.

---

## 5. Page structure

Three pages, all static — no CMS collections: the main landing page, the **Updates registration page** (containing an embedded HubSpot form), and the **2025 Showcase archive page**. Keep real content from the current site; drop all template remnants.

1. **Header/nav** — UMD global bar link to umd.edu; site logo (reversed lockup on red or black); Home / 2025 / Updates links. No cart.
2. **Hero** — Event name in the shadowbox headline treatment over campus/event photography or red field. Eyebrow: date, venue, "BY INVITATION ONLY." Primary CTA: Register for updates. Chevron accent.
3. **About** — "UMD's most comprehensive showcase of startups and resources." Audience description (faculty, students, staff, USM institutions, VCs, angels, economic development orgs). Sponsorship invitation with link to the sponsorship PDF.
4. **Stats band** — ~40 startups · exhibit hall · 60 minutes of rapid-fire pitches. Black or gold band, Roboto Condensed labels, big Source Sans numerals.
5. **Agenda** — Timeline of the day (registration/coffee, welcome, panel, quick pitches, lunch/networking/exhibit hall) with real speaker names and titles. Time labels in Roboto Condensed; red arrow bullets.
6. **Speakers/Panelists** — Real panelists and moderators only (e.g., Dean Chang, Rob Cohen, Kaija Gisolfi-McCready, Mehdi Kalantari Khandani, Rajesh Rai, Josh Doying). Simple photo cards, black/white with red hover accent.
7. **Startups** — Logo grid on white or light gray, uniform tiles, grayscale-to-color hover optional.
8. **Sponsors** — Logo grid + sponsorship CTA.
9. **Hosted by** — UM Ventures, Mtech Ventures, QSF, Institute for Health Computing logos. Per the lockup rules, keep unit logos visually separate from the *Fearlessly Forward* mark.
10. **Closing CTA** — Gold or red band, shadowbox headline, Register for updates button.
11. **Footer** — Chevron horizontal trim, UMD lockup (reversed), Clark School attribution, College Park address, © University of Maryland.

### 2025 Showcase archive page

The page for last year's showcase (currently at `/2025-umd-startup-showcase`) is kept as a permanent archive within the site, linked from the main nav.

- **Keep the URL.** Rebuild at the same slug so existing links, emails, and bookmarks keep working; if the slug must change, add a 301 redirect in Webflow's project settings.
- **Restyle, don't rewrite.** Apply the same UMD design system, but preserve the 2025 content. The page's actual sections to carry over:
  - **Header** — "2025 UMD Startup Showcase," October 10, 2025 | Samuel Riggs IV Alumni Center.
  - **Photo gallery** — the embedded Adobe Lightroom slideshow, plus the "View more photos" link and the "Read more" link to the Mtech news recap. Keep the embed; frame it in a black or white section consistent with the new design.
  - **2025 agenda** — the real program: welcome by Dean Chang and Rob Cohen; the "Navigating the Funding Landscape" panel (Kaija Gisolfi-McCready, Mehdi Kalantari Khandani, Rajesh Rai); quick pitches moderated by Josh Doying; lunch/networking/exhibit hall.
  - **2025 Startups Showcased** — the full logo grid (~35 companies).
  - **2025 Sponsors** and **Hosted By** logo grids.
  - Optional enhancement: a recap stats band from the published Mtech recap (179 attendees, 34 startups, 38 investors) to give the archive a strong factual opening.
- **Strip the same template remnants** present on this page: fake speaker cards, lorem ipsum agenda cards, tickets/Zoom/testimonials/blog/FAQ sections, and cart elements.
- **Mark it clearly as past.** An eyebrow or banner ("2025 SHOWCASE — PAST EVENT") and a prominent link to the current year's page, so invitees don't confuse the archive with the upcoming event.
- **Reusable by design.** Build the archive layout as a component-based template so each future year (2026, 2027…) can be archived the same way after its event.

### Updates registration page

The page at `/umd-startup-showcase-updates`, where visitors register for event updates via an **embedded HubSpot form**.

- **Keep the URL and the form.** The HubSpot embed carries over as-is (Webflow embed element with the HubSpot script); don't rebuild it as a native Webflow form, since submissions need to keep flowing into HubSpot.
- **Style the form to the brand.** Two options: use HubSpot's raw/unstyled embed mode and style the fields with site CSS (preferred — full control over fonts, colors, button), or restyle within HubSpot's form editor to approximate the brand. Target: Source Sans 3 labels/inputs, Maryland Red button with white label, red focus states.
- **Page framing:** shadowbox headline ("STAY IN THE LOOP" or similar), one short paragraph of context (date, venue, invitation-only), the form, and the chevron footer trim. Keep it minimal — this page has one job.
- **Test the embed after rebuild.** Confirm submissions arrive in HubSpot and any tracking script is present on the new pages if the team uses HubSpot analytics.

### Remove from the current site

Two categories:

1. **Hidden template sections** (in the markup of the main and 2025 pages): fake speakers ("Riana Grande," "Howard Jones, SEO expert," etc.), lorem ipsum agenda cards, ticket tiers/cart, the Zoom section, testimonials, blog/"latest thoughts," template FAQs, and all leftover "Digital Marketing Conference/DMC" copy and purple/lavender graphics. Delete at the project level (symbols/components), not per page.
2. **Stray published template pages** that are live and indexed by search engines even though they're not in the nav: `/tickets`, `/venue`, `/speakers`, `/why-attend`, `/checkout`, individual speaker pages (`/speakers/*`), agenda detail pages (`/agenda/*`), and blog pages (`/blog/*`, `/blog-category/*`). These show template content (paid ticket prices, fake speakers) under the umd.edu domain — a real brand and confusion risk for an invitation-only event. Delete or unpublish them all, add 301 redirects to the homepage for any with inbound links, and disable/remove the Webflow ecommerce components entirely.

---

## 6. Webflow implementation notes

- **Variables:** Define the seven color tokens as Webflow variables; define the type scale as variables/text styles so components inherit.
- **Fonts:** Add Source Sans 3 and Roboto Condensed via Webflow's Google Fonts integration.
- **Style guide page:** Build a hidden /style-guide page first — headings, body, buttons, links, the shadowbox headline component, arrow subhead component, chevron trim — then compose sections from it.
- **Shadowbox headline:** Build as a reusable component — skewed white div (CSS `transform: skewX(-12deg)` or so, matching the italic angle) with counter-skewed text inside; arrow as an inline SVG in Maryland Red. Avoid baking headlines into images (accessibility + editability).
- **Chevron trim:** Single SVG asset, tiled horizontally; provide 16:9-ish and mobile crops per the brand book layout examples.
- **Assets:** Official *Fearlessly Forward* assets in hand: (1) arrow/chevron in black, gold, red, white (4167px transparent PNGs — convert to SVG for the build: inline SVG for headline/subhead arrows with color via CSS `fill`, background asset for large section-corner chevrons); (2) horizontal trim pattern as an official SVG (7700×100, ~14KB) — use directly in Webflow, full-width at the bottom of compositions; the print-strip JPG is for print only. Still needed from the OMC communicator toolkit: official lockup files (black, red, reversed).
- **Clean rebuild:** Start pages fresh rather than restyling template classes; delete unused template classes, ecommerce elements, and hidden template pages/collections before launch.
- **Accessibility:** Enforce the pairing rules above; visible focus states (red 2px outline works on white); alt text on all logos; heading hierarchy H1→H2→H3.

---

## 7. Approvals

Per the brand book toolkit guidance, first-time applications of *Fearlessly Forward* campaign assets should be reviewed with the **Office of Marketing and Communications** (omc@umd.edu, Turner Hall) to ensure consistency and integrity of design. Recommend sharing the approved design prototype with OMC before the Webflow build begins.
