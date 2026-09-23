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

  // "Tan planer": pick a skin tone, a depth and the event date; the page suggests
  // when to book and what to do before and after. General guidance only.
  tanPlanner: {
    // Days the salon doesn't work (0 = Sunday … 6 = Saturday). The planner never
    // suggests booking on these. ASSUMPTION: closed on Sundays; confirm with the salon.
    closedDays: [0],
    tones: [
      { id: "porcelain", hex: "#F2DCCB", name: { sr: "Porcelan", en: "Porcelain" } },
      { id: "light", hex: "#E8C3A5", name: { sr: "Svetla", en: "Light" } },
      { id: "medium", hex: "#D3A07C", name: { sr: "Srednja", en: "Medium" } },
      { id: "olive", hex: "#B88560", name: { sr: "Maslinasta", en: "Olive" } },
      { id: "deep", hex: "#8C5D40", name: { sr: "Tamnija", en: "Deep" } },
    ],
    // depth = how far the preview moves the tone toward bronze (0–1)
    levels: [
      { id: "sunkissed", depth: 0.2, name: { sr: "Sunkissed", en: "Sunkissed" },
        desc: { sr: "Kao posle vikenda na moru.", en: "Like a weekend at the seaside." } },
      { id: "bronze", depth: 0.34, name: { sr: "Bronze", en: "Bronze" },
        desc: { sr: "Kao posle dve nedelje leta.", en: "Like two weeks of summer." } },
      { id: "deep-glow", depth: 0.48, name: { sr: "Deep glow", en: "Deep glow" },
        desc: { sr: "Za scenu, fotke i veliko veče.", en: "For the stage, photos and big nights." } },
    ],
    occasions: [
      { id: "wedding", name: { sr: "Venčanje ili proslava", en: "Wedding or party" } },
      { id: "holiday", name: { sr: "Odmor", en: "Holiday" } },
      { id: "photo", name: { sr: "Fotografisanje", en: "Photo shoot" } },
      { id: "everyday", name: { sr: "Onako, za sebe", en: "Just for me" } },
    ],
  },

  // Gift voucher builder. Services and prices come from `services` above.
  voucher: { show: true },

  faq: [
    {
      q: { sr: "Koliko traje spray tan?", en: "How long does a spray tan last?" },
      a: {
        sr: "Obično 7 do 10 dana. Najduže traje ako svaki dan hidriraš kožu i izbegavaš piling i duge tople kupke.",
        en: "Usually 7 to 10 days. It lasts longest if you moisturise daily and skip scrubs and long hot baths.",
      },
    },
    {
      q: { sr: "Da li će mi ten biti narandžast?", en: "Will I turn orange?" },
      a: {
        sr: "Ne. Nijansu biramo prema tvom tenu i podtonu, a koristimo formule koje daju prirodnu, bronzanu boju.",
        en: "No. We match the shade to your skin tone and undertone, and use formulas that develop a natural bronze colour.",
      },
    },
    {
      q: { sr: "Kako da se pripremim?", en: "How should I prepare?" },
      a: {
        sr: "Dan ranije uradi piling i brijanje ili depilaciju. Na tretman dođi bez kreme, dezodoransa i šminke, u širokoj tamnoj odeći.",
        en: "Exfoliate and shave or wax the day before. Come without lotion, deodorant or make-up, in loose dark clothes.",
      },
    },
    {
      q: { sr: "Kada smem da se istuširam?", en: "When can I shower?" },
      a: {
        sr: "Prvo tuširanje posle otprilike 8 sati, mlakom vodom i bez gela. Tačno vreme zavisi od formule, pa ti to kažemo na tretmanu.",
        en: "Your first shower is after about 8 hours, lukewarm and without shower gel. The exact time depends on the formula; we'll tell you on the day.",
      },
    },
    {
      q: { sr: "Koliko traje lash lift?", en: "How long does a lash lift last?" },
      a: {
        sr: "Efekat traje nekoliko nedelja, dok trepavice prirodno ne izrastu. Prva 24 sata ne kvasi trepavice.",
        en: "The lift lasts several weeks, until your lashes naturally grow out. Keep them dry for the first 24 hours.",
      },
    },
    {
      q: { sr: "Dolazite li na adresu?", en: "Do you come to my place?" },
      a: {
        sr: "Da, za spray tan. Idealno za pripreme pred venčanje ili devojačko veče, kada se sređuje više devojaka.",
        en: "Yes, for spray tans. Perfect before a wedding or a hen party, when several of you are getting ready.",
      },
    },
  ],

  // Interface text for both languages.
  ui: {
    "nav.planner": { sr: "Tan planer", en: "Tan planner" },
    "planner.eyebrow": { sr: "Spray tan", en: "Spray tan" },
    "planner.title": { sr: "Isplaniraj svoj ten", en: "Plan your tan" },
    "planner.lede": {
      sr: "Izaberi ten, nijansu i datum. Reći ćemo ti kada da zakažeš i šta da radiš pre i posle.",
      en: "Pick your skin tone, a shade and the date. We'll tell you when to book and what to do before and after.",
    },
    "planner.tone": { sr: "Tvoj ten", en: "Your skin tone" },
    "planner.level": { sr: "Željena nijansa", en: "Shade" },
    "planner.occasion": { sr: "Povod", en: "Occasion" },
    "planner.date": { sr: "Datum događaja", en: "Event date" },
    "planner.before": { sr: "Sada", en: "Now" },
    "planner.after": { sr: "Posle", en: "After" },
    "planner.approx": { sr: "Približan prikaz. Tačnu nijansu biramo zajedno u salonu.", en: "An approximation. We choose the exact shade together at the salon." },
    "planner.soft": {
      sr: "Za prvi tretman na svetlom tenu predlažemo Bronze: izgleda prirodnije, a sledeći put možeš tamnije.",
      en: "For a first tan on fair skin we suggest Bronze: it looks more natural, and you can go deeper next time.",
    },
    "planner.plan": { sr: "Tvoj plan", en: "Your plan" },
    "planner.book": { sr: "Zakaži za", en: "Book for" },
    "planner.asap": { sr: "Događaj je vrlo blizu, javi nam se odmah pa ćemo naći termin.", en: "Your event is very close. Message us now and we'll find a slot." },
    "planner.step.prep": { sr: "Piling celog tela, brijanje ili depilacija.", en: "Full-body scrub, shave or wax." },
    "planner.step.tan": { sr: "Tretman. Dođi bez kreme, dezodoransa i šminke, u širokoj tamnoj odeći.", en: "Your tan. Come without lotion, deodorant or make-up, in loose dark clothes." },
    "planner.step.shower": { sr: "Uveče prvo tuširanje, mlakom vodom i bez gela.", en: "That evening, your first shower: lukewarm, no shower gel." },
    "planner.step.event": { sr: "Ten je razvijen i ujednačen.", en: "Your tan is fully developed and even." },
    "planner.step.care": { sr: "Hidriraj kožu svako jutro i veče, pa ten traje 7–10 dana.", en: "Moisturise morning and night and it lasts 7–10 days." },
    "planner.whatsapp": { sr: "Pošalji na WhatsApp", en: "Send on WhatsApp" },
    "planner.copy": { sr: "Kopiraj poruku", en: "Copy message" },
    "planner.copied": { sr: "Kopirano. Nalepi u Viber ili Instagram.", en: "Copied. Paste it into Viber or Instagram." },
    "planner.note": { sr: "Opšta pravila. Tačna uputstva za tvoju formulu dobijaš na tretmanu.", en: "General guidance. You'll get exact instructions for your formula on the day." },
    "planner.msg": {
      sr: "Zdravo! Želela bih spray tan, nijansa {level}, ten {tone}. Povod: {occasion}, {event}. Da li imate termin {date}? Hvala!",
      en: "Hi! I'd like a spray tan, {level} shade, {tone} skin. Occasion: {occasion}, {event}. Do you have a slot on {date}? Thank you!",
    },
    "voucher.title": { sr: "Poklon vaučer", en: "Gift voucher" },
    "voucher.lede": {
      sr: "Rođendan, godišnjica ili samo „zaslužila si“. Sastavi vaučer, a mi ga pripremamo za preuzimanje u salonu.",
      en: "A birthday, an anniversary or just “you deserve it”. Put the voucher together and we'll have it ready at the salon.",
    },
    "voucher.to": { sr: "Za koga", en: "For" },
    "voucher.from": { sr: "Od koga", en: "From" },
    "voucher.item": { sr: "Tretman", en: "Treatment" },
    "voucher.note": { sr: "Poruka (nije obavezno)", en: "Message (optional)" },
    "voucher.card": { sr: "Poklon vaučer", en: "Gift voucher" },
    "voucher.forLabel": { sr: "za", en: "for" },
    "voucher.fromLabel": { sr: "od", en: "from" },
    "voucher.order": { sr: "Naruči vaučer", en: "Order the voucher" },
    "voucher.fine": { sr: "Broj vaučera i rok važenja dodeljuje salon.", en: "The salon assigns the voucher number and expiry date." },
    "voucher.msg": {
      sr: "Zdravo! Želela bih poklon vaučer: {item} ({price}), za {to}, od {from}.{note} Kako da ga platim i preuzmem?",
      en: "Hi! I'd like a gift voucher: {item} ({price}), for {to}, from {from}.{note} How do I pay and pick it up?",
    },
    "voucher.demoTo": { sr: "Mila", en: "Mila" },
    "voucher.demoFrom": { sr: "Ana", en: "Ana" },
    "voucher.demoNote": { sr: "Srećan rođendan, zaslužila si!", en: "Happy birthday, you deserve it!" },
    "faq.title": { sr: "Česta pitanja", en: "Questions" },
    "contact.showMap": { sr: "Prikaži mapu", en: "Show map" },
    "contact.mapNote": { sr: "Mapa se učitava sa Google-a tek kada klikneš.", en: "The map loads from Google only when you click." },
    "footer.visit": { sr: "Adresa", en: "Address" },
    "footer.follow": { sr: "Prati nas", en: "Follow us" },
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
