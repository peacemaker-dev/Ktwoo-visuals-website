# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KTwo Visuals is a production photography/videography portfolio and booking website for a South African business. It is a **pure static site** — no build tools, no package manager, no framework. Files are served as-is.

- Live domain: `https://ktwovisuals.co.za`
- Currency: South African Rand (ZAR)
- Business phone: `+27797442467`
- EmailJS service ID: `service_4hv70ko`

## Development

No build or install step. Open any HTML file directly in a browser, or run a local dev server:

```bash
# Python (no install needed)
python -m http.server 8080

# Node (if available)
npx serve .
```

There are no linters, test suites, or CI pipelines configured.

## Architecture

### Data-Driven Rendering Pattern

The site uses a hub-and-spoke pattern where **centralized JS data files drive all service page content**. When editing packages, pricing, or gallery images, always update the data files — never the HTML:

- `js/packages/package-data.js` — all pricing, tiers, deliverables, team sizes for every service
- `js/gallery/gallery-data.js` — all gallery image arrays, keyed by service slug
- `js/bookings/booked-dates.js` — dates to block on the booking calendar (format: `"YYYY-MM-DD": "note"`)

Rendering scripts (`package-render.js`, `gallery.js`) read from these data files and write HTML into placeholder `<div>` elements on page load. The service key is passed via a `data-gallery` or `data-service` attribute on the container element in the HTML.

### Service Page Template

All seven service detail pages (matric-dance, graduation, photoshoot, kids-shoot, music-videos, promo-videos, freelancing) follow an identical HTML structure and share `css/service-page.css`. Their content differs only through which data keys they pass to the rendering scripts.

### Package Types

`package-data.js` defines three package shapes:

- **`dual`** — matric-dance, graduation, photoshoot, kids-shoot: coverage choice (Photo+Video / Photo Only / Video Only) **and** tier (premium/standard/basic). Coverage keys: `pv`, `po`, `vo`.
- **`single`** — music-videos, promo-videos: tier only (premium/standard/basic), no coverage split.
- **`rates`** — freelancing: flat rates table, no tiers.

`booking.js` mirrors this same type distinction when building Step 2 (package selection) of the booking flow.

### 5-Step Booking Flow

`js/bookings/booking.js` (28 KB) manages a single-page multi-step form. State accumulates across steps in a plain JS object. On final submission it posts to EmailJS. The calendar in Step 3 is rendered entirely by `js/bookings/calendar.js` and reads blocked dates from `booked-dates.js` at runtime — past dates and booked dates are non-selectable.

### Global vs Page-Specific JS

`js/main.js` runs on every page: navbar scroll detection, hamburger toggle, active link highlighting, FAQ accordion, and footer year injection. Each page then loads only its own additional scripts (e.g., `hero.js` on index only, `gallery.js` + `lightbox.js` on service pages).

## Key Conventions

### CSS Variables (defined in `style.css`)
```css
--black: #000000
--cream: #F5F0E8
--gold:  #C9A84C
--white: #FFFFFF
--gray:  #666666
--font:  'Montserrat', sans-serif  /* weights: 300, 400, 600, 700, 900 */
```
Use these variables for all new styles — never hardcode color values.

### WhatsApp CTA Links
All WhatsApp links must use the pre-filled message format:
```
https://wa.me/27797442467?text=Hi%20KTwo%20Visuals%2C%20I%27d%20like%20to%20enquire%20about%20a%20booking.
```

### Phone Number Validation
South African numbers are validated in `contact.js` with:
```js
/^(\+27|0)[6-8][0-9]{8}$/
```

### SEO / Meta Pattern
Every page carries: canonical URL, Open Graph tags, Twitter Card tags, and a JSON-LD `LocalBusiness` schema block. When adding a new page, copy this block from an existing page and update `url`, `name`, and description fields. Also add the new URL to `sitemap.xml`.

## External Dependencies

All loaded via `<script>` or `<link>` tags — no npm packages:

- **Google Fonts** — Montserrat (all weights preloaded via `fonts.googleapis.com`)
- **EmailJS** — contact form (`template_pruccy7`) and booking form submissions
