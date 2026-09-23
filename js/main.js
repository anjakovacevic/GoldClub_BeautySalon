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
                el("a", { class: "link", href: "#price-" + s.id, text: t("services.seePrices") }),
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

    map: function (frame) {
      if (!frame.src) frame.src = GC.contact.mapsEmbed;
      frame.title = t("contact.mapTitle");
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
      if (["map", "hiring", "hiring-link"].indexOf(node.getAttribute("data-render")) === -1) {
        node.textContent = "";
      }
      fn(node);
    });

    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
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
      else location.hash = "#lokacija";
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

  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  render();
  document.documentElement.classList.add("is-ready");
})();
