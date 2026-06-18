# Interstate — Webflow Font Upload Spec

The homepage build uses the font stack **`"Interstate", "Helvetica Neue", Arial, sans-serif`**
for every heading / UI element. Until Interstate is uploaded, Webflow falls back to
Helvetica/Arial (which is why headings currently look like a generic bold sans). Upload the
faces below and the design snaps to the real type.

Body copy uses **Georgia** (a web‑safe system serif) — **nothing to upload for body text.**

---

## Where to upload
Webflow → **Site Settings → Fonts → Custom Fonts → Upload Font.**
Accepted formats: `.woff2`, `.woff`, `.ttf`, `.otf` (the source `.otf` files work fine;
`.woff2` is smaller/faster if you can convert).

> ⚠️ The Family name MUST be exactly **`Interstate`** (capital I, no suffix). The CSS
> references `"Interstate"` literally — `Interstate Black`, `Interstate-Bold`, etc. will NOT match.

When uploading, set each file's **Weight** and **Style** to the values in the table so Webflow
maps `font-weight`/`font-style` correctly.

---

## Faces to upload

### Essential for the homepage (upload these 3 first)
The homepage only renders these three upright weights — with just these, the page is correct.

| # | File (from `project/fonts/`) | Family | Weight | Style |
|---|------------------------------|--------|--------|-------|
| 1 | `Font_Bureau_-_Interstate-Regular.otf` | Interstate | **400** (Regular/Normal) | Normal |
| 2 | `Font_Bureau_-_Interstate-Bold.otf`    | Interstate | **700** (Bold)           | Normal |
| 3 | `Font_Bureau_-_Interstate-Black.otf`   | Interstate | **800** (Extra Bold)     | Normal |

Where each is used on the homepage:
- **800 Black** → the big headlines (hero "Where ideas go to work.", section H2s, stage names,
  stat numbers, audience titles, footer CTA).
- **700 Bold** → eyebrows/kickers, nav links, "GIVE", date chips, tags, footer column heads.
- **400 Regular** → stage taglines, audience descriptions, event blurbs, footer address & links.

### Complete the design system (recommended — full set of 8)
Add these so other pages / italics in the kit also resolve. Not required for the homepage as built.

| # | File (from `project/fonts/`) | Family | Weight | Style |
|---|------------------------------|--------|--------|-------|
| 4 | `Font_Bureau_-_Interstate-Light.otf`        | Interstate | 300 (Light)        | Normal |
| 5 | `Font_Bureau_-_Interstate-LightItalic.otf`  | Interstate | 300 (Light)        | Italic |
| 6 | `Font_Bureau_-_Interstate-RegularItalic.otf`| Interstate | 400 (Regular)      | Italic |
| 7 | `Font_Bureau_-_Interstate-BoldItalic.otf`   | Interstate | 700 (Bold)         | Italic |
| 8 | `Font_Bureau_-_Interstate-BlackItalic.otf`  | Interstate | 800 (Extra Bold)   | Italic |

---

## Reference — exact @font-face contract (from `project/tokens/fonts.css`)

```
Family: "Interstate"   font-display: swap

300 normal  → Font_Bureau_-_Interstate-Light.otf
300 italic  → Font_Bureau_-_Interstate-LightItalic.otf
400 normal  → Font_Bureau_-_Interstate-Regular.otf
400 italic  → Font_Bureau_-_Interstate-RegularItalic.otf
700 normal  → Font_Bureau_-_Interstate-Bold.otf
700 italic  → Font_Bureau_-_Interstate-BoldItalic.otf
800 normal  → Font_Bureau_-_Interstate-Black.otf
800 italic  → Font_Bureau_-_Interstate-BlackItalic.otf
```

After uploading, no class changes are needed — the build already references `"Interstate"`,
so the headings will switch automatically once the faces exist and the site re-renders.
