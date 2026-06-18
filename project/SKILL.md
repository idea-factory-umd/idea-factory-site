---
name: idea-factory-design
description: Use this skill to generate well-branded interfaces and assets for The Idea Factory (University of Maryland's innovation & entrepreneurship institute), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets (logo, four-stage glyphs), and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill — it is the full design guide (context, content/voice fundamentals, visual foundations, the four-stage glyph system, iconography, and a manifest). Then explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and create static HTML files for the user to view, linking `styles.css` for tokens. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Brand:** The Idea Factory @ University of Maryland (A. James Clark School of Engineering). Tagline *"Where Ideas Go to Work."* Positioning *"One Place. Every Stage."* A rebrand of Mtech — use **no** legacy "Mtech" branding.
- **Colors:** Maryland Red `#e21833`, Gold `#ffd200` (emphasis only, never text on white), Black, White; soft tints + UMD neutrals. Tokens in `tokens/colors.css`.
- **Type:** Interstate headings (self-hosted, Font Bureau OTF in `/fonts`), Georgia body (≥16px). Tokens in `tokens/typography.css`.
- **Core device:** Mondrian color blocks (`ColorBlock`) derived from the logo mark.
- **Signature system:** the four stage glyphs — Blueprint → Proving Ground → Assembly Line → Scale-Up — with the meaningful **red → black → gold** color story. Assets in `assets/glyphs/`; components `StageGlyph` + `JourneyBar`.
- **Voice:** confident, declarative, second-person, evidence-forward, maker/factory language. No emoji. No hype without a number.

## Components
React primitives under `components/` export to `window.IdeaFactoryDesignSystem_745a71`: `Button`, `Tag`, `Logo`, `StageGlyph`, `JourneyBar`, `ColorBlock`, `StatBlock`, `AudienceCard`, `ProgramCard`, `Input`, `SearchField`. Each has a `.prompt.md` with usage. The flagship website recreation lives in `ui_kits/website/`.

> **Font note:** Interstate is self-hosted from `/fonts` (Font Bureau OTF — Light/Regular/Bold/Black + italics). Headings render in real Interstate; no CDN fallback needed.
