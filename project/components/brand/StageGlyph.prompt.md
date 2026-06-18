One of the four stage glyphs (Blueprint, Proving Ground, Assembly Line, Scale-Up) — the brand's core ecosystem device.

```jsx
<StageGlyph stage={1} basePath="../../" size={100} />            /* transparent — inside a color block */
<StageGlyph stage={3} variant="tiled" basePath="../../" />       /* white-tiled — on a dark/colored ground */
```

Use the **transparent** set inside light color blocks; use the **tiled** set on dark or saturated grounds (the white tile keeps red/black/gold reading correctly — no recoloring needed). The red→black→gold color story is meaningful (in the red → in the black → struck gold); never recolor it. Don't place glyphs on the Students program cards — they live on the homepage intro, About, and program detail pages. `StageGlyph.stages` exposes names + taglines.
