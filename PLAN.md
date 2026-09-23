# Gold Club — website plan

## What we know (from the Instagram material)
- Salon Gold Club, Trgovačka 7a, Banovo brdo, Beograd
- +381 62 596 994 · @salongoldclub · @spraytangoldclub · goldclubspraytan@gmail.com
- Tagline in their own material: "The place where hot girls get even hotter"
- Current services: Spray tan, Lash & Brow lift, Massage (prices in RSD from the "Cenovnik" post)
- Visual language: thin high-contrast serif, arched / circular frames (nail-bar arch shelf,
  circle crops in posts), mocha brown, sand, blush.

## Stack
Plain static site: `index.html` + `css/` + `js/`. No build step, no database, no framework.
Runs locally by opening `index.html` or `npx serve`, and deploys as-is to Netlify /
Cloudflare Pages / any host once the domain is bought.

## Services are data, not markup
All services, prices and contact details live in **`js/content.js`**. Adding, removing or
re-pricing a treatment means editing that one file. The page renders the service sections
and the price menu from it. A price of `null` shows "Cena na upit / Price on request".

## Language
Serbian (Latin) by default, English via a toggle in the header. Choice is remembered.

## Booking (no backend)
"Zakaži termin" opens: call, Viber, WhatsApp, Instagram DM. No forms to maintain.

## Design tokens
| Token     | Hex       | Use |
|-----------|-----------|-----|
| Sateen    | `#F5ECE2` | page background (cream) |
| Sand      | `#E7D5BF` | alternate surfaces, business-card tone |
| Blush     | `#E4C3B8` | dusty rose, price menu + booking band |
| Gold      | `#B38B4D` | hairlines, arch outline, small accents only |
| Gold deep | `#86652F` | gold text that must pass contrast |
| Mocha     | `#3B281D` | ink / text (their brown, not black) |

Type: **Bodoni Moda** (display, fashion-editorial, has č ć š ž đ) + **Jost** (body, geometric).

## Layout
```
[ Gold Club          Usluge  Cenovnik  Salon  Lokacija  SR/EN  (Zakaži) ]

  GOLD                      ╭────────╮
  CLUB  (huge Bodoni)       │ arch   │
  The place where hot       │ photo  │
  girls get even hotter.    │        │
  (Zakaži termin)           ╰────────╯
------------------------------------------------------------------
  Service rows, alternating arch photo left/right, benefits list
------------------------------------------------------------------
  Cenovnik — a printed-menu card on blush, dotted leaders to prices
------------------------------------------------------------------
  Salon — nail-bar photo + Banovo brdo copy
------------------------------------------------------------------
  Lokacija — address, online booking (Sredi me), phone, Viber/WhatsApp/IG, embedded map
```
Left-aligned text; the arch is the one bold, repeated motif (it's their own shelf shape).

## Principles
- One signature element: the arch frame. Everything else stays quiet.
- Gold is a metal, not a paint: thin lines and small details, never large fills.
- One page-load moment (wordmark + arch reveal); no scroll-triggered fades everywhere.
- Real content only; photos cropped from the posts until the salon supplies originals.

## Steps
1. Crop usable photos from the screenshots → `assets/img/`
2. `content.js` (services, prices, contact, both languages)
3. `index.html` + `css/styles.css` + `js/main.js`
4. Check at desktop and mobile widths, fix
5. Later: buy domain → deploy, swap in high-res photos, add opening hours
