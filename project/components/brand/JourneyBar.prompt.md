The ecosystem "you are here" journey bar for program detail pages — all four stages in sequence with the current one lit.

```jsx
<JourneyBar active={2} basePath="../../" />
```

Built as one component; set `active` (1–4) per page. Inactive stages render greyed; the active stage is full color. Pass `onSelect` to make stages clickable. Not used on the homepage or audience directory — it's a program-page wayfinding element.
