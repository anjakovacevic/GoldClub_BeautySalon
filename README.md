# Gold Club — beauty salon website

Static site for Salon Gold Club, Banovo brdo, Beograd. Plain HTML, CSS and JavaScript:
no framework, no database, no build step.

## Project structure

```
GoldClub_BeautySalon/
├── index.html        home: hero, treatments, salon, location, reviews
├── spray-tan.html    Spray tan vodič: tan planner + FAQ
├── cenovnik.html     price list + gift voucher
├── css/styles.css    all styles (shared by every page)
├── js/content.js     all editable content (services, prices, reviews, contact, texts)
├── js/main.js        rendering, language toggle, menu, booking dialog, reviews carousel
└── assets/           favicon and photos (assets/img/)
```

The header, footer and booking dialog are written out in each of the three HTML files.
If you change one of them (e.g. add a nav link), make the same change in all three pages.

## Setup

### 1. Requirements
- Any modern browser (Chrome, Edge, Firefox, Safari).
- [Git](https://git-scm.com/downloads), to clone the project.
- *Optional:* [Node.js](https://nodejs.org/) 18 or newer (for a local web server), **or** Python 3.

### 2. Get the code
```
git clone https://github.com/anjakovacevic/GoldClub_BeautySalon.git
cd GoldClub_BeautySalon
```
There are no dependencies to install: no `npm install` needed.

### 3. Run locally
**Quickest:** double-click `index.html` to open it in your browser.

**Recommended:** serve the folder over HTTP, so it behaves exactly like the live site
(the Google map embed and some browser features work more reliably this way).
Run one of these from the project folder:

```
npx http-server -p 8765          # Node.js
python -m http.server 8765       # Python 3
```
then open http://localhost:8765. Stop the server with `Ctrl+C`.

After editing a file, just refresh the browser (`Ctrl+F5` / `Cmd+Shift+R` if it shows an old version).

## Compiling / building

**Nothing needs to be compiled.** The files in this folder are the finished website: the browser
runs the `.html` pages, `css/styles.css` and `js/*.js` directly. There is no bundler, transpiler or
`build` script, and no output folder.

To "build" a release, take the project folder as it is (you can leave out `.git`, `README.md`
and `PLAN.md`) and upload it.

## Deploy
Upload the folder as-is to Netlify, Cloudflare Pages, GitHub Pages or any static host,
then point the domain at it.

- **Netlify / Cloudflare Pages:** connect the GitHub repo. Leave the build command empty and
  set the publish/output directory to `/` (the repo root).
- **GitHub Pages:** repo *Settings → Pages → Deploy from a branch*, choose `main` and `/ (root)`.

## Edit services, prices, reviews, contact
Everything editable is in **`js/content.js`**:
- `services`: add, remove or reorder treatments. Each has a photo, text in SR/EN, and a price list.
  `price: null` shows "Cena na upit / Price on request".
- `reviews`: the "Šta kažu naše klijentkinje / What our clients say" carousel.
  **The current five are placeholders**; replace them with real client reviews. Each has a
  `name`, a `service`, a `rating` (1–5) and the text in both languages. Any number of reviews works,
  and the carousel loops in both directions. Remove every review to hide the section.
- `contact`: phone, email, Instagram, address, map, opening hours (`hours: null` shows "Po zakazivanju"),
  and `bookingUrl`, the Sredi me online booking page behind "Zakaži online" (`null` hides that button).
- `tanPlanner`: skin tones, shades and occasions for the spray tan guide (`spray-tan.html`). `closedDays` lists the
  days the salon is closed (currently Sunday, **to be confirmed**) so the planner never suggests them.
- `voucher.show`: set to `false` to hide the gift voucher builder. Its treatments and prices come from `services`.
- `faq`: questions and answers, in both languages.
- `hiring.show`: set to `false` to hide the "Tražimo saradnice" band.
- `ui`: all other interface text, in both languages.

Photos live in `assets/img/`. The current ones are cropped from Instagram screenshots;
replace them with the original high-resolution files (same names) when available.

See `PLAN.md` for the design decisions.
