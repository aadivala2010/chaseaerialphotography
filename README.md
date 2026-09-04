# Chase Property Media — site

Static site. No build step, no dependencies. Open `index.html` or drag the whole
folder onto [app.netlify.com/drop](https://app.netlify.com/drop) — it's live in
about ten seconds, then point the domain at it in Site settings → Domain.

```
index.html
assets/styles.css
assets/main.js
assets/img/aerial-01..04.jpg   Chase's real drone photos
assets/img/chase.jpg           the old car selfie — not used, see below
```

## Swap the placeholders

Everything fake is marked `PLACEHOLDER` in the HTML. In order of how much each
one costs him in bookings:

| # | What | Where |
|---|------|-------|
| 1 | **Email, phone, Instagram** — appears 4× (mobile menu, contact block, JSON-LD, sticky dock) | search `chasepropertymedia.com`, `7175550142`, `@chasepropertymedia` |
| 2 | **Contact form endpoint** — sign up at [formspree.io](https://formspree.io) (free), paste the ID into `form action=` | `index.html`, `#form` |
| 3 | **Video pricing** — two cards say "Ask" on purpose; swap in numbers when he sets them | `index.html`, `.card__ask` |
| 4 | **Headshot** — drop a real photo at `assets/img/chase-portrait.jpg` and swap the `src` | `index.html`, "HEADSHOT SLOT" |
| 5 | **Testimonials** — a whole section is commented out; uncomment once two real quotes exist | `index.html`, "TESTIMONIALS" |


Until the Formspree ID is in, the form falls back to opening the visitor's mail
app. It is never a dead end.

## Things I did not invent

No insurance claim, no fake reviews, no stock photos passed off as his, and no
invented prices — the $100 package is real, the two video cards say "Ask"
because he hasn't set those numbers yet.

The Part 107 licence is now stated in four places: hero eyebrow, the marquee,
the meta description, and the About paragraph. It is the strongest trust signal
on the page for agents, so keep it above the fold if you rearrange anything.

## Notes

- One page. Every nav link is an anchor — fewer taps to the form.
- **No turnaround time is promised anywhere.** Once he knows his real number,
  adding it back is the strongest thing on the page after the Part 107 badge —
  agents shop on turnaround. Hero lede and process step 03 are the places.
- Photos are 1500px (the largest Pixieset served). Re-export from the originals
  at ~2400px if he still has the DJI files; the hero will look noticeably better
  on a retina laptop.
- Reduced-motion, keyboard nav, and 44px touch targets are all handled.
