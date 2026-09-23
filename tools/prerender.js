#!/usr/bin/env node
/*
 * Bakes the Serbian content into the HTML files, for Google.
 *
 * The site renders its text from js/content.js in the browser. That still works
 * without this script, but search engines index a page more reliably when the
 * text is already in the HTML. Run this after editing content.js or a page:
 *
 *   node tools/prerender.js
 *
 * It opens every page in headless Chrome (so the result is exactly what main.js
 * renders), copies the rendered Serbian text back into the page, and rewrites:
 *   - canonical link, og:url and absolute og:image in each <head>
 *   - the business details for Google (schema.org JSON-LD)
 *   - sitemap.xml and robots.txt
 * The site address comes from `site.url` in js/content.js.
 *
 * Needs Node 18+ and Google Chrome, Chromium or Microsoft Edge. If the browser is
 * somewhere unusual, set CHROME_PATH to its executable.
 */
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");
const { pathToFileURL } = require("url");

const ROOT = path.resolve(__dirname, "..");

// Every public page. `service` links a treatment page to its entry in content.js.
const PAGES = [
  { file: "index.html", priority: "1.0" },
  { file: "spray-tan.html", service: "spray-tan", priority: "0.9" },
  { file: "lash-brow-lift.html", service: "lash-brow", priority: "0.9" },
  { file: "masaza.html", service: "massage", priority: "0.8" },
  { file: "cenovnik.html", priority: "0.8" },
];

// Containers whose rendered content is worth indexing. Interactive parts (the
// reviews carousel, the planner, contact buttons) are left to main.js.
const BAKED = ["services", "prices", "faq", "contact", "roles", "service-detail", "other-services", "service-links", "process"];

const GC = loadContent();
const SITE = GC.site.url.replace(/\/?$/, "/");
const browser = findBrowser();
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "gc-prerender-"));

try {
  PAGES.forEach(bakePage);
} finally {
  fs.rmSync(profile, { recursive: true, force: true });
}
writeSitemap();
console.log("Done. Site address: " + SITE);

/* ---------- Pages ---------- */

function bakePage(page) {
  const file = path.join(ROOT, page.file);
  let html = fs.readFileSync(file, "utf8");
  const dom = renderInBrowser(file);

  // Rendered containers and translated text, matched by order of appearance.
  BAKED.forEach((name) => {
    html = copyInner(html, dom, 'data-render="' + name + '"');
  });
  unique(html.match(/data-i18n="[^"]+"/g) || []).forEach((attr) => {
    html = copyInner(html, dom, attr);
  });
  html = html.replace(/(<img\b[^>]*data-i18n-alt="([^"]+)"[^>]*\balt=")[^"]*"/g, (m, start, key) =>
    start + escapeAttr(GC.ui[key].sr) + '"'
  );

  html = setHead(html, page);
  fs.writeFileSync(file, html);
  console.log("Baked " + page.file);
}

function renderInBrowser(file) {
  return execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
    "--user-data-dir=" + profile, "--virtual-time-budget=3000", "--dump-dom",
    pathToFileURL(file).href,
  ], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
}

// Replace the inner HTML of each element carrying `attr` in `html` with the inner
// HTML of the matching (same position) element in the rendered `dom`.
function copyInner(html, dom, attr) {
  const from = findAll(dom, attr);
  const to = findAll(html, attr);
  if (from.length !== to.length) {
    throw new Error(attr + ": found " + to.length + " in the file but " + from.length + " after rendering");
  }
  for (let i = to.length - 1; i >= 0; i--) {
    const inner = dom.slice(from[i].innerStart, from[i].innerEnd);
    html = html.slice(0, to[i].innerStart) + inner + html.slice(to[i].innerEnd);
  }
  return html;
}

// Locate every element whose opening tag contains `attr`, with its inner range.
function findAll(html, attr) {
  const out = [];
  let at = 0;
  for (;;) {
    const hit = html.indexOf(attr, at);
    if (hit === -1) return out;
    const open = html.lastIndexOf("<", hit);
    const tag = /^<([a-zA-Z0-9-]+)/.exec(html.slice(open))[1];
    const innerStart = html.indexOf(">", hit) + 1;
    const re = new RegExp("<(/?)" + tag + "\\b[^>]*>", "gi");
    re.lastIndex = innerStart;
    let depth = 1, m;
    while ((m = re.exec(html))) {
      depth += m[1] ? -1 : 1;
      if (!depth) break;
    }
    if (!m) throw new Error("No closing </" + tag + "> for " + attr);
    out.push({ innerStart, innerEnd: m.index });
    at = innerStart;
  }
}

/* ---------- <head>: canonical, social preview, business details ---------- */

function setHead(html, page) {
  const url = SITE + (page.file === "index.html" ? "" : page.file);
  const image = /property="og:image" content="([^"]+)"/.exec(html);
  const imageUrl = image ? new URL(image[1], SITE).href : null;

  const nl = html.includes("\r\n") ? "\r\n" : "\n";

  // Drop what an earlier run added, then add it fresh just above og:title.
  html = html.replace(/\s*<(link rel="canonical"|meta property="og:url"|meta property="og:type")[^>]*>/g, "");
  if (imageUrl) html = html.replace(/(property="og:image" content=")[^"]+"/, "$1" + imageUrl + '"');
  html = html.replace(/(\n)([ \t]*)(<meta property="og:title")/, (m, br, indent, tag) =>
    br + indent + '<link rel="canonical" href="' + url + '">' + nl +
    indent + '<meta property="og:url" content="' + url + '">' + nl +
    indent + '<meta property="og:type" content="website">' + nl +
    indent + tag
  );

  const ld = "  <script type=\"application/ld+json\">" + nl +
    JSON.stringify(structuredData(page, url), null, 2).replace(/^/gm, "  ").replace(/\n/g, nl) + nl +
    "  </script>";
  html = html.replace(/\s*(<!--[^>]*Local SEO[\s\S]*?-->\s*)?<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");
  return html.replace(/(\r?\n)<\/head>/, nl + ld + "$1</head>");
}

function structuredData(page, url) {
  const c = GC.contact;
  const salon = {
    "@type": "BeautySalon",
    "@id": SITE + "#salon",
    name: "Gold Club",
    description: GC.ui["hero.lede"].sr,
    url: SITE,
    image: new URL("assets/img/spraytan-legs.jpg", SITE).href,
    telephone: c.phone,
    email: c.email,
    priceRange: priceRange(),
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: "Beograd",
      addressRegion: "Banovo brdo",
      addressCountry: "RS",
    },
    areaServed: "Beograd",
    sameAs: ["https://www.instagram.com/" + c.instagram],
  };
  if (c.openingHours) salon.openingHours = c.openingHours;

  if (!page.service) {
    salon.makesOffer = GC.services.map((s) => offerFor(s, { "@type": "Service", name: s.name.sr }));
    return Object.assign({ "@context": "https://schema.org" }, salon);
  }

  const s = GC.services.find((x) => x.id === page.service);
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name.sr,
    description: s.intro.sr,
    url,
    areaServed: "Beograd",
    provider: salon,
  };
  const offers = s.prices.filter((p) => p.price != null).map((p) => offerFor(s, null, p));
  if (offers.length) service.offers = offers;
  return service;
}

function offerFor(s, item, single) {
  const prices = (single ? [single] : s.prices).map((p) => p.price).filter((p) => p != null);
  const offer = { "@type": "Offer", priceCurrency: "RSD" };
  if (item) offer.itemOffered = item;
  if (single) offer.name = single.name.sr;
  if (prices.length === 1) offer.price = prices[0];
  else if (prices.length) offer.priceSpecification = { "@type": "PriceSpecification", minPrice: Math.min(...prices), priceCurrency: "RSD" };
  return offer;
}

function priceRange() {
  const all = GC.services.flatMap((s) => s.prices.map((p) => p.price)).filter((p) => p != null);
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return fmt(Math.min(...all)) + "–" + fmt(Math.max(...all)) + " RSD";
}

/* ---------- sitemap.xml and robots.txt ---------- */

function writeSitemap() {
  const urls = PAGES.map((p) =>
    "  <url>\n    <loc>" + SITE + (p.file === "index.html" ? "" : p.file) + "</loc>\n" +
    "    <priority>" + p.priority + "</priority>\n  </url>"
  );
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join("\n") + "\n</urlset>\n");
  fs.writeFileSync(path.join(ROOT, "robots.txt"),
    "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "sitemap.xml\n");
  console.log("Wrote sitemap.xml and robots.txt");
}

/* ---------- Helpers ---------- */

function loadContent() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js", "content.js"), "utf8"), sandbox);
  return sandbox.window.GC;
}

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  ];
  const found = candidates.find((p) => p && fs.existsSync(p));
  if (!found) {
    console.error("Could not find Chrome, Chromium or Edge. Set CHROME_PATH to the browser's executable.");
    process.exit(1);
  }
  return found;
}

function unique(list) {
  return list.filter((x, i) => list.indexOf(x) === i);
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
