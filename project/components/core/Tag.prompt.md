Pill tag for labelling program cards, or an interactive chip for the Students-page audience filter.

```jsx
<Tag>Undergraduate</Tag>
<Tag tone="red">Funding</Tag>
<Tag interactive pressed={active==='grad'} onClick={()=>setActive('grad')}>Graduate</Tag>
```

Static tags use `tone` (`neutral`/`red`/`gold`/`dark`). Interactive chips ignore tone, render as a white outlined button, and fill black when `pressed`. Keep tag text short and in the brand's filter vocabulary: Undergraduate · Graduate · Online · Funding · Community & space · All.
