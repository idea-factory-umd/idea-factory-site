# Idea Factory — project notes

## Flagship website lives in `ui_kits/website/`
The interactive site is `ui_kits/website/index.html`, which loads `Header.jsx`,
`Footer.jsx`, `Homepage.jsx`, `StudentsPage.jsx`, etc. via `<script type="text/babel">`.
**Never create a root-level `Homepage.jsx`** (or other root-level copies of these
component files) — a duplicate `function Homepage` makes the design-system compiler
collide on `window.<NS>.Homepage`. The canonical files are the ones under
`ui_kits/website/`.

## Hover animations are STRUCTURAL — do not make them depend on className passthrough
The site's hover animations (four-stage glyph spring, header/footer logo lift, logo
"window" twinkle) are defined in the `<style>` block at the top of
`ui_kits/website/index.html`.

They are intentionally anchored to **stable DOM structure**, e.g.:

    .if-stage-cell:hover > img, .if-stage-cell:hover > svg { transform: scale(1.32); }
    .if-logo-link:hover  > img, .if-logo-link:hover  > svg { transform: scale(1.05); }

This is deliberate. The glyph (`StageGlyph` → `<img>`, or `IFStageGlyphInline` → `<svg>`)
and the logos (`Logo` → `<img>`, `IFLogoInline` → `<svg>`) are rendered INSIDE components,
and the only reliable thing about them is that they are the direct `img`/`svg` child of
the wrapper element (`.if-stage-cell`, `.if-logo-link`), whose class IS written inline.

Earlier versions targeted `.if-stage-glyph` / `.if-logo-mark`, which had to be passed as a
`className` prop through those components. Every time that passthrough broke (a component
edit, a visual-editor round-trip, a stale duplicate file) the animations silently vanished.
**Keep the structural selectors.** The legacy `.if-stage-glyph` / `.if-logo-mark` selectors
remain only as a harmless fallback — do not rely on them alone.

The `.if-logo-window` twinkle pane is hardcoded inside the `IFLogoInline` SVG, so it is stable.
