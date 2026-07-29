# SK Maison — Luxury Clothing E-Commerce Site

A static, dependency-free e-commerce front end for a fictional premium clothing brand ("SK"). Pure HTML/CSS/JS — no frameworks, no build step.

## Files

| File | Purpose |
|---|---|
| `index.html` | All page markup: navbar, hero, sections, modals, drawers |
| `style.css` | All styling, design tokens, animations, responsive rules |
| `script.js` | All behavior: product data, cart, wishlist, filters, modals, effects |

Open `index.html` directly in a browser, or serve the folder with any static server (e.g. `python3 -m http.server`). No install, no dependencies.

## How the code is organized

### `script.js` (numbered sections, in order)
1. **Product data** — `POOLS` (Unsplash photo IDs per category), `NAMES` (product names per category), `buildProducts()` generates 100 products (10 categories × 10) with deterministic pseudo-random price/rating/discount/stock via `seededRand()`.
2. **State** — `state` object holds cart, wishlist, active filters, search term, sort mode. Cart/wishlist persist to `localStorage` (`sk_cart`, `sk_wishlist`), theme persists to `sk_theme`.
3–6. Card rendering, filter/sort/search pipeline (`getFilteredProducts()`), sidebar filter wiring.
7. Category grid, New Arrivals (horizontal scroll), Best Sellers.
8–10. Cart logic, wishlist logic, Quick View modal.
11–12. Modal open/close helpers, login/signup validation.
13–16. Nav/mobile menu/search panel, cart & wishlist drawers, theme toggle, scroll-to-top.
17–19. Scroll-reveal (`IntersectionObserver`), animated stat counters, hero crossfade + parallax.
20–22. Testimonials slider, newsletter form, toast notifications.
23. **Init** — calls all render functions on load.

### `style.css`
Design tokens live in `:root` (and `[data-theme="dark"]` override) at the top — colors, fonts, radii, shadows, easing. Sections below are organized in the same order as `index.html` (navbar → hero → features → shop → footer → modals → responsive breakpoints at the bottom).

### `index.html`
Semantic sections in page order, plus off-canvas markup at the end: cart drawer, wishlist drawer, login modal, signup modal, quick view modal, toast container.

## Design system

- **Palette**: onyx black (`--black`), warm ivory (`--ivory`), muted heritage gold (`--gold` / `--gold-light` / `--gold-deep`) — deliberately not the generic AI-cream/terracotta default.
- **Type**: Cormorant Garamond (display/serif, headings & logo) + Jost (body/UI sans).
- **Signature element**: rotating "SK" wax-seal medallion in the hero corner; gold underline sweep on nav links; diagonal gold seam texture on the promo banner.
- **Dark mode**: toggled via the sun icon in the navbar; swaps CSS custom properties only (no duplicated markup).

## Known limitation — product & testimonial images

Product photos and testimonial avatars are hard-coded `images.unsplash.com/photo-<id>` URLs, chosen from memory to plausibly match each category (sarees, hoodies, jeans, etc.). They were **not verified against a live network call**, so:

- Most should load fine, but a handful of IDs may 404 or render a mismatched image.
- If you spot a broken/wrong image, open `script.js` and edit the relevant ID:
  - Product photos: the `POOLS` object (one array per category, 10 entries).
  - Category hero tiles: `CAT_HERO_IMG`.
  - Testimonials: the `TESTIMONIALS` array (`img` field).
- Any working Unsplash photo ID follows the pattern `https://images.unsplash.com/photo-XXXXXXXXXXXXX-XXXXXXXXXXXX` — swap in a new one from unsplash.com and keep the `?w=...&q=80&auto=format&fit=crop` query params.

## Customizing

- **Add/remove products**: edit `NAMES`, `POOLS`, and `CAT_HERO_IMG` in `script.js` — keep arrays the same length per category (10) or adjust the loop in `buildProducts()`.
- **Change prices/ratings**: generated deterministically from `seededRand(seed)` — tweak the multipliers in `buildProducts()` if you want a different spread.
- **Tax/shipping rules**: in `renderCartUI()` (`tax = subtotal * 0.08`, free shipping over `$120`).
- **Colors/fonts**: edit the `:root` tokens at the top of `style.css` — everything else derives from them.

## Notes

- All "backend" behavior (login, signup, checkout, newsletter) is client-side only and simulated with toast messages — there's no real server, auth, or payment processing.
- Cart and wishlist survive page reloads (via `localStorage`) but are per-browser, not per-account.
