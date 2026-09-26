/*
 * Gold Club — all editable content lives here.
 *
 * To add, remove or reorder a treatment, edit `services` below.
 * Each service needs an `id`, a photo, text in both languages and a price list.
 * The home page cards, price list, voucher, footer links and "Ostali tretmani"
 * all follow this list. See README → "Adding a treatment" for the full checklist.
 * A price of `null` shows "Cena na upit" / "Price on request".
 * Prices are in RSD. Write them as plain numbers (1900, not "1.900").
 */
window.GC = {
  // The live address of the site, with a trailing slash. Used for Google: canonical
  // links, sitemap.xml and the business details. Change it when the site moves to its
  // own domain (e.g. "https://www.goldclub.rs/"), then run `node tools/prerender.js`.
  site: { url: "https://vanjakovacevic1.github.io/GoldClub_BeautySalon/" },

  contact: {
    phone: "+381 62 596 994",
    phoneRaw: "+38162596994",
    email: "goldclubspraytan@gmail.com",
    instagram: "salongoldclub",
    // Online booking (Sredi me). Set to null to hide the "Zakaži online" button.
    bookingUrl: "https://www.sredime.rs/widget/gold-club",
    address: "Trgovačka 7a",
    area: { sr: "Banovo brdo, Beograd", en: "Banovo Brdo, Belgrade" },
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Trgova%C4%8Dka+7a,+Beograd",
    mapsEmbed:
      "https://www.google.com/maps?q=Trgova%C4%8Dka+7a,+Beograd&z=16&output=embed",
    // Set to e.g. { sr: "Pon–Sub 10–20h", en: "Mon–Sat 10am–8pm" } once known.
    hours: null,
    // The same hours for Google, in schema.org form, e.g. ["Mo-Sa 10:00-20:00"].
    openingHours: null,
  },

  // Fields per treatment:
  //   id             short unique name, used in links (cenovnik.html#price-<id>)
  //   page           its own page (e.g. "sminka.html"); leave out until the page exists,
  //                  and the home card links to its prices instead
  //   image          photo, shown in an arch frame
  //   imagePosition  optional focus point of the photo, e.g. "30% center"
  //   imageAlt, name, intro, points   text in both languages
  //   process        optional numbered steps (see lash-brow)
  //   prices         list of { name, price }; price: null = "Cena na upit"
  services: [
    {
      id: "spray-tan",
      page: "spray-tan.html",
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
      page: "lash-brow-lift.html",
      image: "assets/img/lash-brow.jpg",
      imagePosition: "30% center",
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
      // "Postupak laminacije": the steps shown on the treatment page, in order.
      process: [
        {
          name: { sr: "Čišćenje", en: "Cleansing" },
          text: {
            sr: "Penom za čišćenje skidamo šminku i masnoću sa trepavica i obrva, da preparati deluju ravnomerno.",
            en: "A foam cleanser removes make-up and oil from lashes and brows, so the products work evenly.",
          },
        },
        {
          name: { sr: "Omekšavanje", en: "Softening" },
          text: {
            sr: "Trepavice podižemo i uvijamo, obrve češljamo u željeni oblik, a lifting losion omekšava dlačice da prime novi oblik.",
            en: "We lift and curl the lashes and brush the brows into shape, while a lifting lotion softens the hairs so they take the new shape.",
          },
        },
        {
          name: { sr: "Neutralizacija", en: "Setting" },
          text: {
            sr: "Drugi preparat učvršćuje novi oblik, pa trepavice ostaju podignute, a obrve uredne nedeljama.",
            en: "A second product sets the new shape, so lashes stay lifted and brows stay neat for weeks.",
          },
        },
        {
          name: { sr: "Farbanje", en: "Tinting" },
          text: {
            sr: "Boja za trepavice i obrve daje dubinu i puniji izgled, kao da nosiš maskaru i olovku.",
            en: "A lash and brow tint adds depth and a fuller look, as if you were wearing mascara and brow pencil.",
          },
        },
        {
          name: { sr: "Nega", en: "Care" },
          text: {
            sr: "Na kraju hranljiva nega vraća dlačicama vlagu i sjaj.",
            en: "Finally, a nourishing treatment gives the hairs back their moisture and shine.",
          },
        },
      ],
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
      page: "masaza.html",
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

  // "What our clients say" carousel at the bottom of the home page. The list below is
  // PLACEHOLDERS: replace it with real reviews (with the client's permission).
  // `show: false` hides the section. Any number of reviews works; `rating` is 1–5.
  reviews: {
    show: true,
    list: [
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
  },

  // "Tražimo saradnice": a band on kontakt.html plus a footer link and an FAQ entry.
  // Set `show: false` to hide all of them.
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

  // `service` ties a question to a treatment page; questions without it show on every
  // page that has questions.
  faq: [
    {
      service: "spray-tan",
      q: { sr: "Koliko traje spray tan?", en: "How long does a spray tan last?" },
      a: {
        sr: "Obično 7 do 10 dana. Najduže traje ako svaki dan hidriraš kožu i izbegavaš piling i duge tople kupke.",
        en: "Usually 7 to 10 days. It lasts longest if you moisturise daily and skip scrubs and long hot baths.",
      },
    },
    {
      service: "spray-tan",
      q: { sr: "Da li će mi ten biti narandžast?", en: "Will I turn orange?" },
      a: {
        sr: "Ne. Nijansu biramo prema tvom tenu i podtonu, a koristimo formule koje daju prirodnu, bronzanu boju.",
        en: "No. We match the shade to your skin tone and undertone, and use formulas that develop a natural bronze colour.",
      },
    },
    {
      service: "spray-tan",
      q: { sr: "Kako da se pripremim?", en: "How should I prepare?" },
      a: {
        sr: "Dan ranije uradi piling i brijanje ili depilaciju. Na tretman dođi bez kreme, dezodoransa i šminke, u širokoj tamnoj odeći.",
        en: "Exfoliate and shave or wax the day before. Come without lotion, deodorant or make-up, in loose dark clothes.",
      },
    },
    {
      service: "spray-tan",
      q: { sr: "Kada smem da se istuširam?", en: "When can I shower?" },
      a: {
        sr: "Prvo tuširanje posle otprilike 8 sati, mlakom vodom i bez gela. Tačno vreme zavisi od formule, pa ti to kažemo na tretmanu.",
        en: "Your first shower is after about 8 hours, lukewarm and without shower gel. The exact time depends on the formula; we'll tell you on the day.",
      },
    },
    {
      service: "lash-brow",
      q: { sr: "Koliko traje lash lift?", en: "How long does a lash lift last?" },
      a: {
        sr: "Efekat traje nekoliko nedelja, dok trepavice prirodno ne izrastu. Prva 24 sata ne kvasi trepavice.",
        en: "The lift lasts several weeks, until your lashes naturally grow out. Keep them dry for the first 24 hours.",
      },
    },
    {
      service: "spray-tan",
      q: { sr: "Dolazite li na adresu?", en: "Do you come to my place?" },
      a: {
        sr: "Da, za spray tan. Idealno za pripreme pred venčanje ili devojačko veče, kada se sređuje više devojaka.",
        en: "Yes, for spray tans. Perfect before a wedding or a hen party, when several of you are getting ready.",
      },
    },
    // `link` adds a link under the answer. `hiring: true` hides this question
    // whenever the hiring band is switched off (hiring.show: false).
    {
      hiring: true,
      q: { sr: "Da li tražite saradnice?", en: "Are you hiring?" },
      a: {
        sr: "Da. Ako se baviš manikirom, šminkom, trepavicama, depilacijom ili trajnom šminkom i želiš da radiš u salonu, javi nam se.",
        en: "Yes. If you do manicures, make-up, lashes, waxing or permanent make-up and want to work from a salon, get in touch.",
      },
      link: { href: "kontakt.html#saradnja", text: { sr: "Tražimo saradnice", en: "We're hiring" } },
    },
  ],

  // Interface text for both languages.
  ui: {
    "planner.eyebrow": { sr: "Spray tan vodič", en: "Spray tan guide" },
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
    "nav.services": { sr: "Tretmani", en: "Treatments" },
    "nav.prices": { sr: "Cenovnik", en: "Prices" },
    "nav.contact": { sr: "Lokacija", en: "Location" },
    "nav.menu": { sr: "Meni", en: "Menu" },
    book: { sr: "Zakaži termin", en: "Book an appointment" },
    "hero.tagline": { sr: "The place where hot girls get even hotter.", en: "The place where hot girls get even hotter." },
    "hero.lede": {
      sr: "Spray tan, lash & brow lift i masaža u salonu na Banovom brdu, Beograd.",
      en: "Spray tan, lash & brow lifts and massage at our salon on Banovo Brdo, Belgrade.",
    },
    "hero.prices": { sr: "Pogledaj cenovnik", en: "See prices" },
    "hero.services": { sr: "Pogledaj tretmane", en: "See treatments" },
    "services.title": { sr: "Tretmani", en: "Treatments" },
    "services.from": { sr: "od", en: "from" },
    "services.seePrices": { sr: "Cene", en: "Prices" },
    "services.more": { sr: "Više o tretmanu", en: "More about it" },
    "services.others": { sr: "Ostali tretmani", en: "Other treatments" },
    "services.allPrices": { sr: "Ceo cenovnik", en: "Full price list" },
    "footer.treatments": { sr: "Tretmani", en: "Treatments" },
    "treatment.eyebrow": { sr: "Banovo brdo · Beograd", en: "Banovo Brdo · Belgrade" },
    "treatment.prices": { sr: "Cene", en: "Prices" },
    "spray.title": { sr: "Spray tan na Banovom brdu", en: "Spray tan on Banovo Brdo" },
    "spray.lede": {
      sr: "Spray tan u salonu Gold Club na Banovom brdu u Beogradu: preplanuo, prirodan ten posle jednog tretmana, bez sunca i solarijuma. Nijansu biramo prema tvom tenu, a pred venčanja i devojačke večeri dolazimo i na adresu.",
      en: "Spray tans at Gold Club on Banovo Brdo, Belgrade: a natural, sun-kissed tan after one session, without sun or sunbeds. We match the shade to your skin, and before weddings and hen parties we come to you.",
    },
    "lash.title": { sr: "Lash & brow lift na Banovom brdu", en: "Lash & brow lift on Banovo Brdo" },
    "lash.lede": {
      sr: "Lash lift podiže i uvija tvoje prirodne trepavice, a brow lift sređuje obrve tako da stoje uredno ceo dan. Radimo ih u salonu Gold Club na Banovom brdu u Beogradu, pojedinačno ili zajedno, a uz paket i hidratantnu masku i masažu lica.",
      en: "A lash lift lifts and curls your own lashes, and a brow lift sets your brows so they stay neat all day. We do them at Gold Club on Banovo Brdo, Belgrade, separately or together, and as a package with a hydrating mask and facial massage.",
    },
    "process.eyebrow": { sr: "Korak po korak", en: "Step by step" },
    "process.title": { sr: "Postupak laminacije", en: "How lamination works" },
    "process.lede": {
      sr: "Laminacija trepavica i obrva radi se u pet koraka, istim redom za trepavice i za obrve.",
      en: "Lash and brow lamination takes five steps, in the same order for lashes and brows.",
    },
    "process.step": { sr: "Korak", en: "Step" },
    "massage.title": { sr: "Masaža na Banovom brdu", en: "Massage on Banovo Brdo" },
    "massage.lede": {
      sr: "Opuštajuća masaža u salonu Gold Club na Banovom brdu u Beogradu. Sat vremena bez žurbe, u toplom i mirnom prostoru, da se mišići opuste i glava odmori. Cenu i termin dogovaramo kada nam se javiš.",
      en: "A relaxing massage at Gold Club on Banovo Brdo, Belgrade. An unhurried hour in a warm, quiet room, so your muscles loosen and your mind rests. Get in touch and we'll agree the price and a time.",
    },
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
    "salon.visit": { sr: "Kako do nas", en: "How to find us" },
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
    "contact.lede": {
      sr: "Nalazimo se na Banovom brdu, u Trgovačkoj 7a. Radimo po zakazivanju, pa nam se javi pre dolaska.",
      en: "You'll find us on Banovo Brdo, at Trgovačka 7a. We work by appointment, so get in touch before you come.",
    },
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
    "footer.hiring": { sr: "Tražimo saradnice", en: "We're hiring" },
    "cta.title": { sr: "Vidimo se u salonu?", en: "See you at the salon?" },
    "cta.gift": { sr: "Poklanjaš nekome? Napravi poklon vaučer", en: "Buying for someone? Make a gift voucher" },
    "book.title": { sr: "Zakaži termin", en: "Book an appointment" },
    "book.body": {
      sr: "Izaberi kako ti je najlakše. Odgovaramo u toku dana.",
      en: "Pick whatever's easiest for you. We reply the same day.",
    },
    "book.online": { sr: "Zakaži online", en: "Book online" },
    "book.call": { sr: "Pozovi", en: "Call" },
    "book.close": { sr: "Zatvori", en: "Close" },
    // Shown on computers and tablets, where a click on the number copies it.
    "copy.phone": { sr: "Broj je kopiran: {n}", en: "Number copied: {n}" },
    "copy.viber": { sr: "Broj je kopiran. Nalepi ga u Viber.", en: "Number copied. Paste it into Viber." },
    "copy.failed": { sr: "Naš broj: {n}", en: "Our number: {n}" },
    "footer.rights": { sr: "Sva prava zadržana.", en: "All rights reserved." },
  },
};
