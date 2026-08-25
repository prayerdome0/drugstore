# SWDL Drugstore 

A multi-page drugstore website for **SWDL Drugstore**, owned and operated by **Seedwel Investment Limited**.

© Seedwel Investment Limited. All rights reserved.

## Pages

| Page           | File           | Highlights |
|----------------|----------------|------------|
| Home           | `index.html`   | Auto-playing hero slider, auto-scrolling image marquee, featured products for sale, auto-rotating testimonials |
| Products       | `products.html`| 14 products for sale with prices, sale badges and category filters |
| Services       | `services.html`| Auto-playing service gallery + 6 pharmacy services |
| About Us       | `about.html`   | Seedwel Investment Limited story, values, team, auto-playing store moments |
| Contact        | `contact.html` | Contact cards + message form |

## Business details (placeholders — replace before going live)

- **Name:** SWDL Drugstore (Seedwel Investment Limited)
- **Email:** `xxxxx`
- **Contact / Phone:** `xxxxx`
- **Address:** `abc`

Search the codebase for `xxxxx` and `abc` to swap in the real details.

## Features

- ✅ Auto-playing image sliders (hero + services gallery) with dots, arrows and pause-on-hover
- ✅ Auto-scrolling photo marquees (pause on hover)
- ✅ Product catalogue with live category filtering, sale badges and a mini cart
- ✅ Fully responsive design with mobile navigation
- ✅ `prefers-reduced-motion` respected

## Run locally

```bash
# any static server works, e.g.:
npx serve .
# or
python3 -m http.server 8080
```

## Deploy to Vercel

The site is a static site with a `vercel.json` (clean URLs + immutable asset caching).

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repo.
3. Framework preset: **Other** (no build step). Output directory: leave as `.` (root).
4. Click **Deploy** — done.

Or via CLI from the repo root:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Credits

Stock photography via public image search (Dreamstime, Getty, iStock, Unsplash previews) for demonstration purposes.
