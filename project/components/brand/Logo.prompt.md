The Idea Factory logo — full lockup or mark. The full lockup has **two tones**, and picking the right one is a brand rule:

- **`tone="color"`** (default) — red wordmark, for white/light backgrounds.
- **`tone="white"`** — white wordmark, **required on dark backgrounds** (black or red footers, dark bands, photography). Never place the color tone on a dark ground.

The squared mark (`variant="mark"`) is one artwork with its white panel built in and works on light and dark.

```jsx
<Logo basePath="../../" height={44} />                           /* light grounds */
<Logo tone="white" basePath="../../" height={44} />              /* dark grounds (e.g. footer) */
<Logo variant="mark" height={40} basePath="../../" />            /* favicon / small placements */
```

Always pass `basePath` so the SVG resolves to the project root. Use the full lockup wherever space allows; switch to `variant="mark"` only at small sizes. Never recolor or stretch — set `height`, width auto-scales.
