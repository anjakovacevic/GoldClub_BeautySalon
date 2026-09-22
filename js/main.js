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
  };

  function channelLinks() {
    var c = GC.contact;
    var num = c.phoneRaw.replace("+", "");
    return [
      { icon: "phone", label: t("book.call") + " " + c.phone, href: "tel:" + c.phoneRaw },
      { icon: "chat", label: "Viber", href: "viber://chat?number=%2B" + num },
      { icon: "chat", label: "WhatsApp", href: "https://wa.me/" + num, external: true },
      { icon: "insta", label: "@" + c.instagram, href: "https://instagram.com/" + c.instagram, external: true },
    ];
  }

  var renderers = {
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
        var a = el("a", { class: "channel", href: ch.href });
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
      else location.hash = "#kontakt";
    });
  });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  render();
  document.documentElement.classList.add("is-ready");
})();
