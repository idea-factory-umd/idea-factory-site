# UI Kit — The Idea Factory Flagship Website

High-fidelity recreation of the flagship site, built entirely from the design-system components. Two surfaces: the **Homepage** and the **Students** audience page (the repeating audience template).

## Run it
Open `index.html`. It loads `styles.css`, the component bundle (`_ds_bundle.js`), then the JSX files. A tiny in-page router toggles between Home and Students — click **Students** in the navbar (or the Students audience box) to switch; the navbar **Give** link is gold per brand.

## Files
- `index.html` — entry + router (Home ↔ Students)
- `data.js` — sample content (nav, audiences, stats, news, events, programs, filters, stages)
- `Header.jsx` — family chrome: thin UMD bar → identity band (logo + search, Mondrian block language) → red navbar
- `Footer.jsx` — UMD lockup, repeated nav, address, social, Get Updates
- `Homepage.jsx` — Hero **Direction A** (type-led Mondrian color blocks with a photo module) → intro → four-stage ecosystem → audience boxes → impact band → news → events
- `StudentsPage.jsx` — per-audience hero → sticky **tag filter** (All · Undergraduate · Graduate · Online · Funding · Community & space) → program directory grid

## Components used
`Logo`, `SearchField`, `Button`, `ColorBlock`, `StageGlyph`, `AudienceCard`, `ProgramCard`, `StatBlock`, `Tag`. All from `window.IdeaFactoryDesignSystem_745a71`.

## Notes & fidelity
- This is the chosen **Hero Direction A**. Directions B (journey-as-hero) and C (split hero) from the brief are not built here.
- Photography is shown as labelled hatched placeholders — real shots come from in-house libraries.
- Search is a visual element only (the family-wide search carries over).
- The other three audience pages (Faculty, Companies, Partners) reuse the Students template and are not built out.
- Reference breakpoints: desktop 1440, mobile 390. Hero blocks and grids collapse to one column under 920px.
