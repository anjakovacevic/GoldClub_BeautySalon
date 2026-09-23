/*
 * Gold Club — all editable content lives here.
 *
 * To add, remove or reorder a treatment, edit `services` below.
 * Each service needs an `id`, a photo, text in both languages and a price list.
 * A price of `null` shows "Cena na upit" / "Price on request".
 * Prices are in RSD. Write them as plain numbers (1900, not "1.900").
 */
window.GC = {
  contact: {
    phone: "+381 62 596 994",
    phoneRaw: "+38162596994",
    email: "goldclubspraytan@gmail.com",
    instagram: "salongoldclub",
    instagramSprayTan: "spraytangoldclub",
    // Online booking (Sredi me). Set to null to hide the "Zakaži online" button.
    bookingUrl: "https://www.sredime.rs/widget/gold-club",
    address: "Trgovačka 7a",
    area: { sr: "Banovo brdo, Beograd", en: "Banovo Brdo, Belgrade" },
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Trgova%C4%8Dka+7a,+Beograd",
    mapsEmbed:
      "https://www.google.com/maps?q=Trgova%C4%8Dka+7a,+Beograd&z=16&output=embed",
    // Set to e.g. { sr: "Pon–Sub 10–20h", en: "Mon–Sat 10am–8pm" } once known.
    hours: null,
  },

  services: [
    {
      id: "spray-tan",
      image: "assets/img/hero-spraytan.jpg",
      imageAlt: {
        sr: "Nanošenje spray tan preparata pištoljem za raspršivanje",
        en: "Spray tan being applied with a spray gun",
      },
      name: { sr: "Spray tan", en: "Spray tan" },
      intro: {
        sr: "Preplanuli ten već posle jednog tretmana, za svečani i za svakodnevni autfit. Boju biramo zajedno, prema tvom tenu.",
        en: "A sun-kissed tan after a single session, for a big night or an ordinary Tuesday. We choose the shade together, to suit your skin.",
      },
      points: {
        sr: ["Bez rizika za kožu", "Boja koja odgovara tebi", "Najkvalitetnije formule", "Jednostavno održavanje boje"],
        en: ["No sun damage", "A shade matched to you", "Premium formulas", "Easy to maintain"],
      },
      prices: [
        { name: { sr: "Basic", en: "Basic" }, price: 1900 },
        { name: { sr: "Classic", en: "Classic" }, price: 2400 },
        { name: { sr: "Premium", en: "Premium" }, price: 2900 },
        {
          name: { sr: "Spray tan po izboru + dolazak na adresu", en: "Spray tan of your choice, at your address" },
          price: 5400,
        },
      ],
    },
    {
      id: "lash-brow",
      image: "assets/img/lash-brow.jpg",
      imageAlt: {
        sr: "Profil lica sa podignutim trepavicama i oblikovanim obrvama",
        en: "Profile of a face with lifted lashes and shaped brows",
      },
      name: { sr: "Lash & brow lift", en: "Lash & brow lift" },
      intro: {
        sr: "Tvoje prirodne trepavice, podignute i uvijene, i obrve koje stoje tačno kako treba. Bez ekstenzija i bez jutarnjeg oblikovanja.",
        en: "Your own lashes, lifted and curled, and brows that stay exactly where you want them. No extensions, no morning styling.",
      },
      points: {
        sr: ["Prirodan, otvoren pogled", "Bez ekstenzija i lepka", "Efekat traje nedeljama"],
        en: ["A natural, open look", "No extensions or glue", "Lasts for weeks"],
      },
      prices: [
        { name: { sr: "Lash lift", en: "Lash lift" }, price: 2500 },
        { name: { sr: "Brow lift", en: "Brow lift" }, price: 2500 },
        { name: { sr: "Lash & brow lift", en: "Lash & brow lift" }, price: 4500 },
        {
          name: {
            sr: "Lash & brow lift + hidratantna maska i masaža lica",
            en: "Lash & brow lift + hydrating mask and facial massage",
          },
          price: 4900,
        },
      ],
    },
    {
      id: "massage",
      image: "assets/img/massage.jpg",
      imageAlt: { sr: "Masaža leđa", en: "Back massage" },
      name: { sr: "Masaža", en: "Massage" },
      intro: {
        sr: "Sat vremena samo za tebe. Masaža koja opušta mišiće, smiruje glavu i vraća te u dan lakšu nego što si došla.",
        en: "An hour that is only yours. A massage that loosens tight muscles, quiets the mind and sends you back out lighter than you came in.",
      },
      points: {
        sr: ["Smanjuje stres", "Opušta mišiće", "Bolji san", "Poboljšava cirkulaciju"],
        en: ["Eases stress", "Relaxes muscles", "Better sleep", "Improves circulation"],
      },
      prices: [{ name: { sr: "Masaža", en: "Massage" }, price: null }],
    },
  ],

  // "What our clients say" carousel. PLACEHOLDERS: replace with real reviews
  // (with the client's permission). Any number of reviews works; `rating` is 1–5.
  reviews: [
    {
      name: "Jelena M.",
      service: { sr: "Spray tan", en: "Spray tan" },
      rating: 5,
      text: {
        sr: "Najprirodniji spray tan koji sam ikad imala. Boja je bila savršena za moj ten i trajala je duže od nedelju dana.",
        en: "The most natural spray tan I've ever had. The shade was perfect for my skin and it lasted more than a week.",
      },
    },
    {
      name: "Milica P.",
      service: { sr: "Lash & brow lift", en: "Lash & brow lift" },
      rating: 5,
      text: {
        sr: "Više ne koristim maskaru. Trepavice podignute, obrve uredne, a ja svako jutro uštedim dvadeset minuta.",
        en: "I've stopped using mascara. Lashes lifted, brows tidy, and I save twenty minutes every morning.",
      },
    },
    {
      name: "Ana S.",
      service: { sr: "Masaža", en: "Massage" },
      rating: 5,
      text: {
        sr: "Sat vremena potpunog mira. Izašla sam laka kao pero i odmah zakazala sledeći termin.",
        en: "An hour of total calm. I walked out light as a feather and booked my next visit on the spot.",
      },
    },
    {
      name: "Teodora K.",
      service: { sr: "Spray tan na adresi", en: "Spray tan at home" },
      rating: 5,
      text: {
        sr: "Došle su kod mene pred venčanje i sredile nas pet devojaka. Profesionalno, brzo i uz mnogo smeha.",
        en: "They came to my place before my wedding and did all five of us. Professional, quick and full of laughs.",
      },
    },
    {
      name: "Marija D.",
      service: { sr: "Lash & brow lift + maska", en: "Lash & brow lift + mask" },
      rating: 5,
      text: {
        sr: "Salon je predivan, a atmosfera toliko opuštena da sam skoro zaspala na tretmanu. Rezultat je odličan.",
        en: "The salon is gorgeous and so relaxing I nearly fell asleep during the treatment. The result is lovely.",
      },
    },
  ],

  // Shown as a small band near the bottom. Set `show: false` to hide it.
  hiring: {
    show: true,
    roles: {
      sr: ["Manikir", "Profesionalna šminka", "Svilene trepavice", "Depilacija", "Trajna šminka"],
      en: ["Manicure", "Professional make-up", "Silk lashes", "Waxing", "Permanent make-up"],
    },
  },

  // Interface text for both languages.
  ui: {
    "nav.services": { sr: "Usluge", en: "Treatments" },
    "nav.prices": { sr: "Cenovnik", en: "Prices" },
    "nav.salon": { sr: "Salon", en: "Salon" },
    "nav.contact": { sr: "Lokacija", en: "Location" },
    "nav.reviews": { sr: "Utisci", en: "Reviews" },
    "nav.menu": { sr: "Meni", en: "Menu" },
    book: { sr: "Zakaži termin", en: "Book an appointment" },
    "hero.tagline": { sr: "The place where hot girls get even hotter.", en: "The place where hot girls get even hotter." },
    "hero.lede": {
      sr: "Spray tan, lash & brow lift i masaža u salonu na Banovom brdu.",
      en: "Spray tan, lash & brow lifts and massage at our salon on Banovo Brdo, Belgrade.",
    },
    "hero.prices": { sr: "Pogledaj cenovnik", en: "See prices" },
    "services.title": { sr: "Tretmani", en: "Treatments" },
    "services.from": { sr: "od", en: "from" },
    "services.seePrices": { sr: "Cene", en: "Prices" },
    "prices.title": { sr: "Cenovnik", en: "Price list" },
    "prices.note": {
      sr: "Cene su u dinarima. Za pitanja i termine javi nam se telefonom, na Viber ili Instagram.",
      en: "Prices are in Serbian dinars (RSD). Call us, or message us on Viber or Instagram to book or ask anything.",
    },
    "prices.onRequest": { sr: "Cena na upit", en: "Price on request" },
    "salon.title": { sr: "Salon na Banovom brdu", en: "Our salon on Banovo Brdo" },
    "salon.body": {
      sr: "Gold Club je mali salon u kom se sve vrti oko tebe: topla svetla, mirna atmosfera i tretmani koje radimo polako i pažljivo. Dođi na spray tan pred proslavu, ili samo zato što je utorak.",
      en: "Gold Club is a small salon built around you: warm light, a calm room and treatments done slowly and carefully. Come in for a tan before a celebration, or just because it's Tuesday.",
    },
    "salon.alt": {
      sr: "Radni sto u salonu Gold Club sa zlatnim detaljima i policom za lakove u obliku luka",
      en: "A workstation at Gold Club with gold details and an arched polish shelf",
    },
    "reviews.title": { sr: "Šta kažu naše klijentkinje", en: "What our clients say" },
    "reviews.prev": { sr: "Prethodni utisak", en: "Previous review" },
    "reviews.next": { sr: "Sledeći utisak", en: "Next review" },
    "reviews.goTo": { sr: "Utisak", en: "Review" },
    "reviews.rating": { sr: "Ocena {n} od 5", en: "Rated {n} out of 5" },
    "contact.title": { sr: "Dođi kod nas", en: "Visit us" },
    "contact.address": { sr: "Adresa", en: "Address" },
    "contact.phone": { sr: "Telefon", en: "Phone" },
    "contact.hours": { sr: "Radno vreme", en: "Opening hours" },
    "contact.byAppointment": { sr: "Po zakazivanju", en: "By appointment" },
    "contact.directions": { sr: "Otvori u Google mapama", en: "Open in Google Maps" },
    "contact.mapTitle": { sr: "Mapa: Gold Club, Banovo brdo", en: "Map: Gold Club, Banovo Brdo" },
    "hiring.title": { sr: "Tražimo saradnice", en: "We're hiring" },
    "hiring.body": {
      sr: "Ako se baviš nekom od ovih usluga i želiš da radiš u salonskom prostoru, javi nam se.",
      en: "If you offer one of these treatments and want to work from a salon, get in touch.",
    },
    "hiring.cta": { sr: "Pošalji poruku", en: "Send us a message" },
    "book.title": { sr: "Zakaži termin", en: "Book an appointment" },
    "book.body": {
      sr: "Izaberi kako ti je najlakše. Odgovaramo u toku dana.",
      en: "Pick whatever's easiest for you. We reply the same day.",
    },
    "book.online": { sr: "Zakaži online", en: "Book online" },
    "book.call": { sr: "Pozovi", en: "Call" },
    "book.close": { sr: "Zatvori", en: "Close" },
    "footer.rights": { sr: "Sva prava zadržana.", en: "All rights reserved." },
  },
};
