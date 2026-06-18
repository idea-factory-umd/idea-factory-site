The Mondrian color-block — the brand's primary layout device, derived from the logo mark. Compose several edge-to-edge to build heroes, stat bands, and stage headers.

```jsx
<div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:0}}>
  <ColorBlock tone="red" minHeight={320}>
    <h1 style={{color:'inherit'}}>Where ideas go to work</h1>
  </ColorBlock>
  <ColorBlock tone="black" number={1}>
    <StageGlyph stage={1} variant="tiled" basePath="../../" />
  </ColorBlock>
</div>
```

Tones: bright (`red`/`black`/`gold`) for impact; soft (`redTint`/`goldTint`/`gray`) for calmer, content-dense areas; `white` to let the logo's own field read as a block. Blocks butt edge-to-edge (gap:0) — keep corners squared. Gold blocks use black text only.
