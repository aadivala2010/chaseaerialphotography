# Chase Property Media — site

Static site. No build step, no dependencies. Open `index.html` locally, or host it:

- **GitHub Pages** (already where this repo lives) — Settings → Pages → Source:
  Deploy from a branch → `main` / `/ (root)` → Save. Live at
  `aadivala2010.github.io/chaseaerialphotography` in a minute. Custom domain
  goes in the same panel.
- **Netlify** — drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
  Worth it if you want the contact form handled without Formspree: add
  `netlify` and `name="contact"` to the `<form>` tag and Netlify captures
  submissions itself.

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
| 3 | **$175 / $225** — invented, anchored to the real $100 package | `index.html`, "$100 photo package" comment |
| 4 | **Headshot** — drop a real photo at `assets/img/chase-portrait.jpg` and swap the `src` | `index.html`, "HEADSHOT SLOT" |
| 5 | **Testimonials** — a whole section is commented out; uncomment once two real quotes exist | `index.html`, "TESTIMONIALS" |


Until the Formspree ID is in, the form falls back to opening the visitor's mail
app. It is never a dead end.

## Things I did not invent

No insurance claim, no fake reviews, no stock photos passed off as his. The
$100 photo package is Chase's real price; $175 and $225 are placeholders I set
so the card grid reads as a finished price list — change them freely.

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
