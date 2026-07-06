# Precision Surfacing — website

A static site built with [Eleventy (11ty)](https://www.11ty.dev/). Hand-written HTML/CSS/JS,
organised into shared components and data-driven service pages.

## Run it

```bash
npm install      # once
npm start        # dev server with live reload → http://localhost:8080
npm run build    # production build → /_site
```

You need [Node.js](https://nodejs.org) (v18+). Open the folder in VS Code and the dev server
will hot-reload as you edit.

## How it's organised

```
src/
  _data/
    site.js          ← phone, email, nav links, areas covered  (edit once, updates everywhere)
    services.js      ← the 5 surfaces. Add/edit a surface here and its page rebuilds automatically
  _includes/
    layouts/
      base.njk       ← the HTML shell: <head>, fonts, nav, menu, footer, scripts
      service.njk    ← ONE template that renders every surface page from services.js
    partials/
      nav.njk        ← top nav bar (shared)
      menu.njk       ← slide-out mobile menu (shared)
      footer.njk     ← footer (shared)
  assets/
    css/
      precision.css  ← global design system + nav/menu/footer + homepage styles
      service.css    ← service-page sections (loaded on surface pages only)
      get-started.css← quote-form styles (loaded on that page only)
    js/
      precision.js   ← shared chrome behaviour: menu, nav, dropdown, scroll reveals
      home.js        ← homepage gallery + lightbox + quote form
      service.js     ← surface-page gallery, swatches + lightbox
      get-started.js ← multi-step quote form logic
  pages/
    index.njk        ← homepage
    services.njk     ← generates /services/resin-bound/, /services/tarmac/, etc. (one per surface)
    get-started.njk  ← multi-step quote form
    articles.njk  contact.njk  gallery.njk
```

## The data-driven bit

The five surface pages (resin, block paving, tarmac, tar & chip, gravel) all share one template.
To change a page, edit its object in `src/_data/services.js` — headline, gallery captions, the
"why" points, build steps, finishes — and the page rebuilds. To add a sixth surface, copy an
existing object, change `slug`/`order`/copy, and a new page appears at `/services/<slug>/`.

Add real project photos by setting an `img` path on a `work` item (e.g. `img: "/assets/img/eaton.jpg"`)
instead of the texture placeholder.

## Where to edit common things

- **Phone / email / areas / nav links** → `src/_data/site.js`
- **A surface page's content** → that surface's object in `src/_data/services.js`
- **Colours, fonts, shared components** → `src/assets/css/precision.css` (the `:root` tokens at the top)
- **Homepage sections** → `src/pages/index.njk`

## ⚠️ Before you go live: the forms

The quote form and contact form are **front-end only** — right now they just show a "thank you"
message; nothing is actually sent or stored. A static site can't process a submission by itself.
Before launch, wire the form up to one of:

- **Netlify Forms** — easiest if you host on Netlify (add `netlify` to the `<form>` tag)
- **Formspree** — point the form `action` at a Formspree endpoint
- a small serverless function (Netlify/Cloudflare Functions)

## Known rough edges (tidy in VS Code)

- `precision.css` and `service.css` both define a few shared classes; on surface pages
  `service.css` loads second, so its versions win. Minor cascade overlaps worth consolidating.
- The surface pages were originally designed mobile-first; their desktop layout is only
  partially treated and could use refinement.
- Nav links point at real permalinks (`/services/<slug>/`, `/gallery/`, `/articles/`,
  `/contact/`, `/get-started/`).
