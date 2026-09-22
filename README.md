# Gold Club — beauty salon website

Static site for Salon Gold Club, Banovo brdo, Beograd. No build step, no database.

## Run locally
Open `index.html` in a browser, or serve the folder:

```
npx http-server -p 8765
```
then go to http://localhost:8765

## Edit services, prices, contact
Everything editable is in **`js/content.js`**:
- `services`: add, remove or reorder treatments. Each has a photo, text in SR/EN, and a price list.
  `price: null` shows "Cena na upit / Price on request".
- `contact`: phone, email, Instagram, address, map, opening hours (`hours: null` shows "Po zakazivanju").
- `hiring.show`: set to `false` to hide the "Tražimo saradnice" band.
- `ui`: all other interface text, in both languages.

Photos live in `assets/img/`. The current ones are cropped from Instagram screenshots;
replace them with the original high-resolution files (same names) when available.

## Deploy
Upload the folder as-is to Netlify, Cloudflare Pages, GitHub Pages or any static host,
then point the domain at it.

See `PLAN.md` for the design decisions.
