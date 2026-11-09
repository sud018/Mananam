// The list of texts shown on the app's home screen.
// To add a new text: create texts/<id>/text.js (copy the format from texts/rudram/text.js),
// then add or update its entry here with  ready: true.
// Owner shown in the footer of the app.
window.MANANAM_OWNER = { te: "సుధీర్", en: "Sudheer", year: 2026 };

window.MANANAM_LIBRARY = [
  {
    id: "rudram",
    title: "శ్రీ రుద్రం",
    titleEn: "Sri Rudram",
    subtitleEn: "Dhyanam, Namakam, Chamakam – 251 mantras with Telugu meaning",
    subtitle: "ధ్యానం, నమకం, చమకం – 251 మంత్రాలు, తెలుగు అర్థంతో",
    icon: "ॐ",
    ready: true
  },
  {
    id: "vishnu-sahasranamam",
    title: "శ్రీ విష్ణు సహస్రనామం",
    titleEn: "Sri Vishnu Sahasranamam",
    subtitle: "",
    icon: "॥",
    ready: false
  },
  {
    id: "shiva-ashtottaram",
    title: "శ్రీ శివ అష్టోత్తర శతనామావళి",
    titleEn: "Sri Shiva Ashtottara Shatanamavali",
    subtitle: "",
    icon: "॥",
    ready: false
  }
];
