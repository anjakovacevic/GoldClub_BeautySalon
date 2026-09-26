# Gold Club — website plan

## What we know (from the Instagram material)
- Salon Gold Club, Trgovačka 7a, Banovo brdo, Beograd
- +381 62 596 994 · @salongoldclub · goldclubspraytan@gmail.com
- Tagline in their own material: "The place where hot girls get even hotter"
- Current services: Spray tan, Lash & Brow lift, Massage (prices in RSD from the "Cenovnik" post)
- Visual language: thin high-contrast serif, arched / circular frames (nail-bar arch shelf,
  circle crops in posts), mocha brown, sand, latte beige.

## Stack
Plain static site: a handful of pages (home, one per treatment, `cenovnik.html`, `kontakt.html`) sharing
`css/` + `js/`. No build step, no database, no framework.
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
| Latte     | `#E0CEB6` | deeper beige: price menu, voucher, booking band |
| Latte soft| `#EDE1D0` | light beige: map placeholder, link cards, hints |
| Gold      | `#B38B4D` | hairlines, arch outline, small accents only |
| Gold deep | `#86652F` | gold text that must pass contrast |
| Mocha     | `#3B281D` | ink / text (their brown, not black) |

Type: **Bodoni Moda** (display, fashion-editorial, has č ć š ž đ) + **Jost** (body, geometric).

## Layout
```
[ Gold Club   Tretmani  Cenovnik  Lokacija   SR/EN  (Zakaži) ]

index.html (home: what, trust, book; everything else is one click deeper)

  GOLD                      ╭────────╮
  CLUB  (huge Bodoni)       │ arch   │
  The place where hot       │ photo  │
  girls get even hotter.    │        │
  (Zakaži termin)  Pogledaj tretmane
------------------------------------------------------------------ sand
  Tretmani                                      Ceo cenovnik →
  ╭──╮ ╭──╮ ╭──╮   one arch card per service in content.js;
  │  │ │  │ │  │   wraps on desktop, sideways scroll on phones
  name · one line · od X RSD → treatment page
------------------------------------------------------------------ cream
  Salon — nail-bar photo + copy + "Kako do nas →"
------------------------------------------------------------------ latte
  Booking band: foil arch, "Vidimo se u salonu?", address · hours,
  (Zakaži termin) + phone, "Poklanjaš nekome? → vaučer"
------------------------------------------------------------------ cream
  Utisci — reviews carousel, last before the footer (reviews.show)

spray-tan.html   Treatment, prices, tan planner + FAQ
lash-brow-lift.html, masaza.html   Treatment, prices (+ process, FAQ)
cenovnik.html    Cenovnik (printed-menu card on latte beige, dotted leaders) + gift voucher builder
kontakt.html     Address, channels, map on click + "Tražimo saradnice" band
```
Header, footer and booking dialog are repeated in each HTML file; change them in every page.
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
