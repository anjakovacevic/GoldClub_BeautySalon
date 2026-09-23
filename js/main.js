(function () {
  "use strict";

  var GC = window.GC;
  var LANGS = ["sr", "en"];
  var lang = "sr";

  try {
    var saved = localStorage.getItem("gc-lang");
    if (LANGS.indexOf(saved) !== -1) lang = saved;
  } catch (e) {}

  function t(key) {
    var entry = GC.ui[key];
    return entry ? entry[lang] : key;
  }

  function tr(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value[lang] : value;
  }

  function formatPrice(n) {
    var sep = lang === "sr" ? "." : ",";
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) + " RSD";
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c) node.appendChild(c);
    });
    return node;
  }

  var ICONS = {
    phone:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"/></svg>',
    chat:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5Z"/></svg>',
    insta:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    calendar:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  };

  function channelLinks() {
    var c = GC.contact;
    var num = c.phoneRaw.replace("+", "");
    return [
      { icon: "calendar", label: t("book.online"), href: c.bookingUrl, external: true, primary: true },
      { icon: "phone", label: t("book.call") + " " + c.phone, href: "tel:" + c.phoneRaw },
      { icon: "chat", label: "Viber", href: "viber://chat?number=%2B" + num },
      { icon: "chat", label: "WhatsApp", href: "https://wa.me/" + num, external: true },
      { icon: "insta", label: "@" + c.instagram, href: "https://instagram.com/" + c.instagram, external: true },
    ];
  }

  /* ---------- Reviews carousel ----------
     The track holds three copies of the reviews: [clones | real | clones].
     We always show the middle copy; after sliding into a clone we jump,
     without animation, to the matching real slide, so it loops endlessly. */

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reviews = { pos: null, n: 0, track: null, dots: null, perView: 1 };

  function reviewCard(r, isClone) {
    var n = Math.max(0, Math.min(5, r.rating || 5));
    var stars = el("p", { class: "stars", role: "img", "aria-label": t("reviews.rating").replace("{n}", n) });
    stars.textContent = "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);

    var card = el("article", { class: "review" }, [
      stars,
      el("blockquote", null, [el("p", { text: tr(r.text) })]),
      el("footer", null, [
        el("span", { class: "review-name", text: r.name }),
        el("span", { class: "review-service", text: tr(r.service) }),
      ]),
    ]);
    if (isClone) {
      card.setAttribute("aria-hidden", "true");
      card.inert = true;
    }
    return card;
  }

  function reviewStep() {
    var first = reviews.track.children[0];
    var gap = parseFloat(getComputedStyle(reviews.track).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }

  function placeReviews(animate, dragPx) {
    var r = reviews;
    r.perView = parseInt(getComputedStyle(r.track).getPropertyValue("--per-view"), 10) || 1;
    r.track.classList.toggle("is-animating", !!animate);
    r.track.style.transform = "translate3d(" + (-r.pos * reviewStep() + (dragPx || 0)) + "px,0,0)";

    var active = ((r.pos % r.n) + r.n) % r.n;
    Array.prototype.forEach.call(r.dots.children, function (d, i) {
      d.setAttribute("aria-current", String(i === active));
    });
  }

  // Jump from a clone back to the same review in the real (middle) copy.
  function normalizeReviews() {
    var r = reviews;
    if (r.pos < r.n) r.pos += r.n;
    else if (r.pos >= 2 * r.n) r.pos -= r.n;
    placeReviews(false);
  }

  function moveReviews(delta) {
    var r = reviews;
    if (!r.track || !delta) return;
    var target = r.pos + delta;
    if (target < 0 || target > 3 * r.n - r.perView) {
      normalizeReviews();
      void r.track.offsetWidth; // commit the jump before animating again
    }
    r.pos += delta;
    placeReviews(!reduceMotion);
    if (reduceMotion) normalizeReviews();
  }

  function bindReviewGestures(viewport) {
    var startX = null, dx = 0, wheelSum = 0, wheelLock = false;

    viewport.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      normalizeReviews();
      startX = e.clientX;
      dx = 0;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add("is-dragging");
    });
    viewport.addEventListener("pointermove", function (e) {
      if (startX === null) return;
      var step = reviewStep();
      dx = Math.max(-step, Math.min(step, e.clientX - startX));
      placeReviews(false, dx);
    });
    function end() {
      if (startX === null) return;
      startX = null;
      viewport.classList.remove("is-dragging");
      if (Math.abs(dx) > Math.min(60, reviewStep() * 0.2)) moveReviews(dx < 0 ? 1 : -1);
      else placeReviews(!reduceMotion);
    }
    viewport.addEventListener("pointerup", end);
    viewport.addEventListener("pointercancel", end);

    // Horizontal trackpad / shift+wheel scrolling
    viewport.addEventListener("wheel", function (e) {
      var x = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!x) return;
      e.preventDefault();
      if (wheelLock) return;
      wheelSum += x;
      if (Math.abs(wheelSum) > 40) {
        moveReviews(wheelSum > 0 ? 1 : -1);
        wheelSum = 0;
        wheelLock = true;
        setTimeout(function () { wheelLock = false; }, 450);
      }
    }, { passive: false });

    viewport.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); moveReviews(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); moveReviews(1); }
    });
  }

  var renderers = {
    reviews: function (root) {
      var list = GC.reviews || [];
      var section = root.closest("section");
      section.hidden = !list.length;
      if (!list.length) return;

      var track = el("div", { class: "carousel-track" });
      [0, 1, 2].forEach(function (copy) {
        list.forEach(function (r) { track.appendChild(reviewCard(r, copy !== 1)); });
      });
      track.addEventListener("transitionend", function (e) {
        if (e.target === track) normalizeReviews();
      });

      var dots = el("div", { class: "carousel-dots" }, list.map(function (r, i) {
        var d = el("button", { type: "button", "aria-label": t("reviews.goTo") + " " + (i + 1) });
        d.addEventListener("click", function () {
          var n = list.length;
          var delta = i - (((reviews.pos % n) + n) % n);
          if (delta > n / 2) delta -= n;
          if (delta < -n / 2) delta += n;
          moveReviews(delta);
        });
        return d;
      }));

      var viewport = el("div", { class: "carousel-viewport", tabindex: "0" }, [track]);
      root.appendChild(viewport);
      root.appendChild(dots);
      bindReviewGestures(viewport);

      reviews.n = list.length;
      reviews.track = track;
      reviews.dots = dots;
      if (reviews.pos === null) reviews.pos = list.length;
      normalizeReviews();
    },


    services: function (root) {
      GC.services.forEach(function (s, i) {
        var prices = s.prices.map(function (p) { return p.price; }).filter(function (p) { return p != null; });
        var from = prices.length
          ? t("services.from") + " " + formatPrice(Math.min.apply(null, prices))
          : t("prices.onRequest");

        var img = el("img", { src: s.image, alt: tr(s.imageAlt), loading: "lazy" });
        var points = el("ul", { class: "points" }, tr(s.points).map(function (p) {
          return el("li", { text: p });
        }));

        root.appendChild(
          el("article", { class: "service" + (i % 2 ? " service-flip" : ""), id: s.id }, [
            el("figure", { class: "service-photo" }, [el("div", { class: "arch" }, [img])]),
            el("div", { class: "service-copy" }, [
              el("h3", { class: "service-name", text: tr(s.name) }),
              el("p", { class: "service-intro", text: tr(s.intro) }),
              points,
              el("p", { class: "service-price" }, [
                el("span", { text: from }),
                el("a", { class: "link", href: "cenovnik.html#price-" + s.id, text: t("services.seePrices") }),
              ]),
            ]),
          ])
        );
      });
    },

    prices: function (root) {
      GC.services.forEach(function (s) {
        var list = el("ul", { class: "menu-items" }, s.prices.map(function (p) {
          return el("li", null, [
            el("span", { class: "item-name", text: tr(p.name) }),
            el("span", { class: "item-leader", "aria-hidden": "true" }),
            el("span", { class: "item-price", text: p.price == null ? t("prices.onRequest") : formatPrice(p.price) }),
          ]);
        }));
        root.appendChild(
          el("section", { class: "menu-group", id: "price-" + s.id }, [
            el("h3", { text: tr(s.name) }),
            list,
          ])
        );
      });
    },

    contact: function (root) {
      var c = GC.contact;
      var rows = [
        [t("contact.address"), el("span", null, [
          document.createTextNode(c.address),
          el("br"),
          document.createTextNode(tr(c.area)),
          el("br"),
          el("a", { class: "link", href: c.mapsLink, target: "_blank", rel: "noopener", text: t("contact.directions") }),
        ])],
        [t("contact.phone"), el("a", { href: "tel:" + c.phoneRaw, text: c.phone })],
        ["Email", el("a", { href: "mailto:" + c.email, text: c.email })],
        [t("contact.hours"), el("span", { text: c.hours ? tr(c.hours) : t("contact.byAppointment") })],
      ];
      rows.forEach(function (r) {
        root.appendChild(el("div", null, [el("dt", { text: r[0] }), el("dd", null, [r[1]])]));
      });
    },

    channels: function (root) {
      channelLinks().forEach(function (ch) {
        if (!ch.href) return;
        var a = el("a", { class: "channel" + (ch.primary ? " channel-primary" : ""), href: ch.href });
        if (ch.external) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener");
        }
        a.innerHTML = ICONS[ch.icon];
        a.appendChild(el("span", { text: ch.label }));
        root.appendChild(a);
      });
    },

    tones: function (root) {
      GC.tanPlanner.tones.forEach(function (tone) {
        var input = el("input", { type: "radio", name: "tone", id: "tone-" + tone.id, value: tone.id });
        input.checked = tone.id === planner.tone;
        input.addEventListener("change", function () { planner.tone = tone.id; updatePlanner(); });
        var swatch = el("span", { class: "tone-dot", "aria-hidden": "true" });
        swatch.style.background = tone.hex;
        root.appendChild(el("label", { class: "tone", for: "tone-" + tone.id }, [
          input, swatch, el("span", { class: "tone-name", text: tr(tone.name) }),
        ]));
      });
    },

    levels: function (root) {
      GC.tanPlanner.levels.forEach(function (lv) {
        var input = el("input", { type: "radio", name: "level", id: "level-" + lv.id, value: lv.id });
        input.checked = lv.id === planner.level;
        input.addEventListener("change", function () { planner.level = lv.id; updatePlanner(); });
        root.appendChild(el("label", { class: "level", for: "level-" + lv.id }, [
          input,
          el("span", { class: "level-name", text: tr(lv.name) }),
          el("span", { class: "level-desc", text: tr(lv.desc) }),
        ]));
      });
    },

    occasions: function (select) {
      GC.tanPlanner.occasions.forEach(function (o) {
        var opt = el("option", { value: o.id, text: tr(o.name) });
        opt.selected = o.id === planner.occasion;
        select.appendChild(opt);
      });
    },

    "voucher-section": function (section) {
      section.hidden = !(GC.voucher && GC.voucher.show);
    },

    "voucher-items": function (select) {
      voucherItems().forEach(function (it) {
        var opt = el("option", { value: it.key, text: it.label + " · " + formatPrice(it.price) });
        opt.selected = it.key === voucher.item;
        select.appendChild(opt);
      });
    },

    faq: function (root) {
      (GC.faq || []).forEach(function (f) {
        root.appendChild(el("details", null, [
          el("summary", { text: tr(f.q) }),
          el("p", { text: tr(f.a) }),
        ]));
      });
    },

    hiring: function (section) {
      section.hidden = !GC.hiring.show;
    },

    roles: function (root) {
      tr(GC.hiring.roles).forEach(function (r) {
        root.appendChild(el("li", { text: r }));
      });
    },

    "hiring-link": function (a) {
      a.href = "https://instagram.com/" + GC.contact.instagram;
      a.target = "_blank";
      a.rel = "noopener";
    },
  };

  function render() {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (node) {
      node.alt = t(node.getAttribute("data-i18n-alt"));
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (node) {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-label")));
    });

    document.querySelectorAll("[data-render]").forEach(function (node) {
      var fn = renderers[node.getAttribute("data-render")];
      if (!fn) return;
      // Containers get rebuilt; single elements (iframe, link, section) are updated in place.
      if (["hiring", "hiring-link", "voucher-section"].indexOf(node.getAttribute("data-render")) === -1) {
        node.textContent = "";
      }
      fn(node);
    });

    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });

    fillVoucherDemo();
    updatePlanner();
    updateVoucher();
  }

  // Language toggle
  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.getAttribute("data-lang");
      try { localStorage.setItem("gc-lang", lang); } catch (e) {}
      render();
    });
  });

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  // Booking dialog
  var dialog = document.getElementById("booking");
  document.querySelectorAll("[data-open-booking]").forEach(function (b) {
    b.addEventListener("click", function () {
      setMenu(false);
      if (typeof dialog.showModal === "function") dialog.showModal();
      else location.href = document.getElementById("lokacija") ? "#lokacija" : "index.html#lokacija";
    });
  });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  // Reviews arrows (outside the re-rendered carousel, so bound once)
  document.querySelectorAll("[data-review-step]").forEach(function (b) {
    b.addEventListener("click", function () {
      moveReviews(parseInt(b.getAttribute("data-review-step"), 10));
    });
  });
  window.addEventListener("resize", function () {
    if (reviews.track) placeReviews(false);
  });

  /* ---------- Shared helpers for the planner and the voucher ---------- */

  function fill(template, values) {
    return template.replace(/\{(\w+)\}/g, function (m, k) { return values[k] != null ? values[k] : m; });
  }

  function whatsappHref(text) {
    return "https://wa.me/" + GC.contact.phoneRaw.replace("+", "") + "?text=" + encodeURIComponent(text);
  }

  // Copy must run inside the click handler. If the clipboard is refused,
  // show the message so it can be selected by hand.
  function bindCopy(buttonId, statusId, getText) {
    var button = document.getElementById(buttonId);
    var status = document.getElementById(statusId);
    if (!button) return;
    button.addEventListener("click", function () {
      var text = getText();
      function manual() { status.textContent = text; status.classList.add("is-manual"); }
      if (!navigator.clipboard) return manual();
      navigator.clipboard.writeText(text).then(function () {
        status.classList.remove("is-manual");
        status.textContent = t("planner.copied");
      }, manual);
    });
  }

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }

  /* ---------- Tan planner ---------- */

  var DAY = 864e5;
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function toISO(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function fromISO(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function fmtDate(d, long) {
    var locale = lang === "sr" ? "sr-Latn-RS" : "en-GB";
    var opts = long ? { weekday: "long", day: "numeric", month: "long" } : { weekday: "short", day: "numeric", month: "short" };
    return d.toLocaleDateString(locale, opts);
  }

  var planner = { tone: "medium", level: "bronze", occasion: "wedding", date: toISO(addDays(today(), 5)), message: "" };

  function hexToRgb(h) {
    var n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(a, b, w) {
    return a.map(function (v, i) { return Math.round(v + (b[i] - v) * w); });
  }
  function rgb(c) { return "rgb(" + c.join(",") + ")"; }
  function skinGradient(c) {
    return "radial-gradient(120% 90% at 32% 22%, " + rgb(mix(c, [255, 244, 232], 0.28)) + " 0%, " +
      rgb(c) + " 48%, " + rgb(mix(c, [40, 22, 12], 0.22)) + " 100%)";
  }

  var BRONZE = [110, 62, 34];

  function updatePlanner() {
    var skin = document.getElementById("planner-skin");
    if (!skin || !GC.tanPlanner) return;
    var tp = GC.tanPlanner;
    var tone = byId(tp.tones, planner.tone);
    var level = byId(tp.levels, planner.level);
    var occasion = byId(tp.occasions, planner.occasion);

    var base = hexToRgb(tone.hex);
    skin.querySelector(".skin-before").style.background = skinGradient(base);
    skin.querySelector(".skin-after").style.background = skinGradient(mix(base, BRONZE, level.depth));

    var dateInput = document.getElementById("planner-date");
    if (dateInput.value !== planner.date) dateInput.value = planner.date;
    dateInput.min = toISO(today());

    var event = fromISO(planner.date) || addDays(today(), 5);
    var lead = Math.round((event - today()) / DAY);
    var asap = lead < 2;
    var appt = asap ? today() : addDays(event, -1);
    // Move back past closed days (e.g. Sunday), but never before today.
    var closed = tp.closedDays || [];
    while (!asap && closed.indexOf(appt.getDay()) !== -1 && appt > today()) appt = addDays(appt, -1);

    document.getElementById("plan-book").innerHTML = "";
    document.getElementById("plan-book").appendChild(
      asap
        ? el("span", { text: t("planner.asap") })
        : el("span", null, [
            document.createTextNode(t("planner.book") + " "),
            el("strong", { text: fmtDate(appt, true) }),
          ])
    );

    var steps = [];
    if (!asap) steps.push([fmtDate(addDays(appt, -1)), t("planner.step.prep")]);
    steps.push([fmtDate(appt), t("planner.step.tan")]);
    steps.push([fmtDate(appt), t("planner.step.shower")]);
    if (!asap || lead >= 1) steps.push([fmtDate(event), t("planner.step.event"), true]);
    steps.push([fmtDate(addDays(appt, 7)) + " – " + fmtDate(addDays(appt, 10)), t("planner.step.care")]);

    var list = document.getElementById("plan-steps");
    list.textContent = "";
    steps.forEach(function (s) {
      list.appendChild(el("li", { class: s[2] ? "is-event" : "" }, [
        el("span", { class: "step-date", text: s[0] }),
        el("span", { class: "step-text", text: s[1] }),
      ]));
    });

    var hint = document.getElementById("plan-hint");
    var fair = planner.tone === "porcelain" || planner.tone === "light";
    hint.hidden = !(fair && planner.level === "deep-glow");
    hint.textContent = t("planner.soft");

    planner.message = fill(t("planner.msg"), {
      level: tr(level.name),
      tone: tr(tone.name).toLowerCase(),
      occasion: tr(occasion.name).toLowerCase(),
      event: fmtDate(event),
      date: fmtDate(appt),
    });
    document.getElementById("plan-whatsapp").href = whatsappHref(planner.message);
    document.getElementById("plan-status").textContent = "";
  }

  (function bindPlanner() {
    var date = document.getElementById("planner-date");
    if (!date) return;
    date.addEventListener("change", function () {
      if (fromISO(date.value)) planner.date = date.value;
      updatePlanner();
    });
    document.getElementById("planner-occasion").addEventListener("change", function (e) {
      planner.occasion = e.target.value;
      updatePlanner();
    });
    var split = document.getElementById("planner-split");
    var skin = document.getElementById("planner-skin");
    function setSplit() { skin.style.setProperty("--split", split.value + "%"); }
    split.addEventListener("input", setSplit);
    setSplit();
    bindCopy("plan-copy", "plan-status", function () { return planner.message; });
    document.getElementById("planner-form").addEventListener("submit", function (e) { e.preventDefault(); });
  })();

  /* ---------- Gift voucher ---------- */

  function voucherItems() {
    var out = [];
    GC.services.forEach(function (s) {
      s.prices.forEach(function (p, i) {
        if (p.price == null) return;
        var name = tr(p.name), service = tr(s.name);
        out.push({ key: s.id + ":" + i, label: name === service ? name : service + ": " + name, short: name, price: p.price });
      });
    });
    return out;
  }

  var voucher = { item: "lash-brow:2", edited: false, message: "" };
  var voucherFields = ["voucher-to", "voucher-from", "voucher-note"];

  // Until the visitor types, the card shows an example in the current language.
  function fillVoucherDemo() {
    if (voucher.edited || !document.getElementById("voucher-to")) return;
    document.getElementById("voucher-to").value = t("voucher.demoTo");
    document.getElementById("voucher-from").value = t("voucher.demoFrom");
    document.getElementById("voucher-note").value = t("voucher.demoNote");
  }

  function updateVoucher() {
    var card = document.getElementById("voucher-card");
    if (!card) return;
    var items = voucherItems();
    var item = items.filter(function (i) { return i.key === voucher.item; })[0] || items[0];
    var to = document.getElementById("voucher-to").value.trim();
    var from = document.getElementById("voucher-from").value.trim();
    var note = document.getElementById("voucher-note").value.trim();

    document.getElementById("vc-item").textContent = item.short;
    document.getElementById("vc-price").textContent = formatPrice(item.price);
    document.getElementById("vc-names").textContent =
      [to && t("voucher.forLabel") + " " + to, from && t("voucher.fromLabel") + " " + from].filter(Boolean).join("  ·  ");
    var vcNote = document.getElementById("vc-note");
    vcNote.textContent = note;
    vcNote.hidden = !note;

    voucher.message = fill(t("voucher.msg"), {
      item: item.label,
      price: formatPrice(item.price),
      to: to || "…",
      from: from || "…",
      note: note ? (lang === "sr" ? " Poruka: „" + note + "“." : " Message: “" + note + "”.") : "",
    });
    document.getElementById("voucher-whatsapp").href = whatsappHref(voucher.message);
    document.getElementById("voucher-status").textContent = "";
  }

  (function bindVoucher() {
    if (!document.getElementById("voucher-form")) return;
    voucherFields.forEach(function (id) {
      document.getElementById(id).addEventListener("input", function () {
        voucher.edited = true;
        updateVoucher();
      });
    });
    document.getElementById("voucher-item").addEventListener("change", function (e) {
      voucher.item = e.target.value;
      updateVoucher();
    });
    document.getElementById("voucher-form").addEventListener("submit", function (e) { e.preventDefault(); });
    bindCopy("voucher-copy", "voucher-status", function () { return voucher.message; });
  })();

  /* ---------- Map: load Google only on request ---------- */

  (function bindMap() {
    var button = document.getElementById("map-load");
    if (!button) return;
    button.addEventListener("click", function () {
      var frame = el("iframe", {
        src: GC.contact.mapsEmbed,
        title: t("contact.mapTitle"),
        loading: "lazy",
        referrerpolicy: "no-referrer-when-downgrade",
      });
      var map = document.getElementById("map");
      map.textContent = "";
      map.appendChild(frame);
      map.classList.add("is-loaded");
    });
  })();

  document.querySelectorAll("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  render();
  document.documentElement.classList.add("is-ready");
})();
