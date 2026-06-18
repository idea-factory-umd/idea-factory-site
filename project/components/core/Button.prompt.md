Bold uppercase action button in Interstate — use for primary CTAs, secondary actions, and inline text links (ghost).

```jsx
<Button variant="primary" size="lg" iconAfter={<span>››</span>}>Apply now</Button>
<Button variant="outline">See programs</Button>
<Button variant="ghost" as="a" href="#">More ››</Button>
```

Variants: `primary` (Maryland Red), `dark` (black), `outline` (black hairline → fills black on hover), `ghost` (red text link, used for "More ››" affordances). Sizes `sm`/`md`/`lg`. Use `as="a"` + `href` for navigation. Gold is never used as a button fill behind text (contrast).
