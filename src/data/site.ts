export const site = {
  name: "Passerelle",
  fullName: "Association Passerelle",
  tagline: "Reconversion et protection des Trotteurs Français",
  url: "https://www.passerelle-trotteurs.fr",
  email: "contacts@passerelle-trotteurs.org",
  phone: "+33785985475",
  phoneDisplay: "+33 7 85 98 54 75",
  address: {
    street: "38 rue principale",
    postalCode: "60120",
    city: "Le Crocq",
    country: "France",
  },
};

/**
 * External destinations. These are live, association-owned URLs — they are the
 * real conversion surfaces and must not be replaced with placeholders.
 */
export const links = {
  donate:
    "https://www.helloasso.com/associations/passerelle-trotteurs/formulaires/4",
  join: "https://www.helloasso.com/beta/associations/passerelle-trotteurs/adhesions/adhesion-2026-a-l-association-passerelle",
  sponsor:
    "https://www.helloasso.com/associations/passerelle-trotteurs/formulaires/9",
  intake: "https://intranet.passerelle-trotteurs.fr/user/register",
  shop: "https://blagapro.com/categorie-produit/boutiques-des-clubs/hauts-de-france/oise-60/association-passerelle-60120/",
  accreditation:
    "https://cdn.eu.yapla.com/company/CPYbcCvkD6pajr3uBXPgxYoAE/asset/files/CAHIER%20DES%20CHARGES.pdf",
  facebook: "https://www.facebook.com/PasserelleTrotteurs/",
  instagram: "https://www.instagram.com/passerelle_tf/",
  adoptionGroup: "https://www.facebook.com/groups/passerelleventesadoptions",
};

export const nav = [
  {
    label: "Association",
    href: "/association",
    children: [
      { label: "À propos", href: "/association" },
      { label: "L’équipe", href: "/association/equipe" },
      { label: "#RaceAndCare", href: "/race-and-care" },
      { label: "Mécènes & ambassadeurs", href: "/mecenes" },
    ],
  },
  { label: "Réseau", href: "/reseau" },
  { label: "Protection", href: "/protection" },
  {
    label: "Participer",
    href: "/participer",
    children: [
      { label: "Confier un trotteur", href: "/confier" },
      { label: "Adopter un trotteur", href: "/adopter" },
      { label: "Devenir membre", href: "/participer/adherer" },
      { label: "Parrainer un trotteur", href: "/participer/parrainer" },
    ],
  },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

/** Facts carried over from the association's published mentions légales. */
export const legal = {
  siren: "892068222",
  publisher: "Association Passerelle",
  director: "Association Passerelle",
  host: {
    name: "Cloudflare, Inc.",
    address: "101 Townsend St, San Francisco, CA 94107, États-Unis",
  },
  jurisdiction: "Tribunaux de l’Oise",
};

/**
 * Every figure below is sourced from the association's own published material.
 * Update them here, not in the markup.
 *  - founded: December 2020 (site: "Présentation de l'association")
 *  - structures: count of the accredited network directory (22 entries)
 *  - intake: "Passerelle prend en charge entre 10 et 15 chevaux par semaine"
 *  - protections: the six lifetime guarantees in the Passerelle contract
 */
export const stats = [
  { value: "2020", label: "Année de création", icon: "calendar" },
  { value: "22", label: "Structures accréditées", icon: "map" },
  { value: "10–15", label: "Chevaux confiés par semaine", icon: "horse" },
  { value: "6", label: "Protections à vie", icon: "shield" },
];

export const missionPillars = [
  {
    icon: "house",
    title: "Accueillir",
    body: "Nous prenons en charge les Trotteurs Français sortant de la filière course, sans discrimination d’âge ni d’état de santé.",
  },
  {
    icon: "sprout",
    title: "Reconvertir",
    body: "Nos structures accréditées adaptent la reconversion au profil du cheval et préparent une seconde carrière adaptée.",
  },
  {
    icon: "shield",
    title: "Protéger à vie",
    body: "Chaque cheval placé l’est sous contrat Passerelle, qui le suit et le protège pour le reste de sa vie.",
  },
];

export const pathways = [
  {
    title: "Faire un don",
    body: "Votre soutien finance la prise en charge, le transport et les soins des chevaux les plus vulnérables.",
    href: links.donate,
    external: true,
    image: "/media/pathway-donation.jpg",
    alt: "Gros plan sur l’œil d’un cheval",
    icon: "hands",
  },
  {
    title: "Adhérer à l’association",
    body: "Rejoignez Passerelle et entrez au cœur de nos actions.",
    href: links.join,
    external: true,
    image: "/media/pathway-membership.jpg",
    alt: "Un groupe de personnes réunies lors d’un événement hippique",
    icon: "users",
  },
  {
    title: "Boutique en ligne",
    body: "Découvrez la boutique en ligne et soutenez les actions de l’association grâce à vos achats.",
    href: links.shop,
    external: true,
    image: "/media/expo.jpg",
    alt: "Le stand Passerelle lors d’un événement",
    icon: "shopping",
  },
  {
    title: "Adopter un trotteur",
    body: "Acheter ou adopter un Trotteur Français reconverti auprès de nos structures professionnelles de la reconversion dans un cadre sécurisé.",
    href: "/adopter",
    alt: "Une personne à côté d’un cheval",
    image: "/media/pathway-adoption.jpg",
    icon: "horse",
  },
];

/** The six lifetime guarantees — the association's actual differentiator. */
export const protections = [
  "Ils ne peuvent pas être abattus ou vendus à un marchand d’équidés.",
  "Ils sont exclus définitivement de la filière course.",
  "Ils sont exclus des activités de location pour les saisons de chasse à courre.",
  "Ils sont interdits de reproduction en race Trotteur Français.",
  "Ils sont interdits à l’expérimentation animale.",
  "Les femelles ne peuvent pas devenir mères porteuses.",
];

/** Accredited network — département shown, sorted by name. */
export const network = [
  ["AnimOsmose", "Morbihan"],
  ["Centre équestre Château Laval", "Alpes-de-Haute-Provence"],
  ["Domaine des Dakotines", "Calvados"],
  ["Écurie du Saule", "Nord"],
  ["Écurie HADAH", "Loiret"],
  ["Écurie L’Eau de Fosse", "Loiret"],
  ["Écurie TDS", "Seine-et-Marne"],
  ["Écuries de la Brèche", "Oise"],
  ["Écuries de Chigny", "Aisne"],
  ["Education LF — Écurie du Hirlenbach", "Bas-Rhin"],
  ["Haras des Plaines", "Tarn-et-Garonne"],
  ["Héliominos", "Haute-Vienne"],
  ["L’Écrin du Bonheur", "Oise & Calvados"],
  ["L’Élevage de tous temps", "Doubs"],
  ["La Grange de Prétôt", "Vendée"],
  ["Les chevaux d’Elo", "Yonne"],
  ["Les Crins de la Baie", "Calvados"],
  ["Les Crins de Liberté", "Puy-de-Dôme"],
  ["Les Écuries du Moulin d’Aubry", "Orne"],
  ["Rehab Ranch", "Loire"],
  ["Société Hippique de Vire en Bocage", "Calvados"],
  ["SOS Cheval", "Puy-de-Dôme"],
] as const;

/** Conditions and commitments from the network accreditation brief. */
export const networkConditions = [
  {
    title: "Connaissance du Trotteur Français",
    items: [
      "Justifier d'une expérience de la reconversion : avoir déjà reconverti des trotteurs réformés en chevaux de loisir, de club ou de sport, et pouvoir fournir des lettres de recommandation de cavaliers ayant acheté des chevaux.",
      "Justifier d'une expérience dans les soins apportés aux trotteurs : identifier les pathologies courantes, appliquer un protocole adapté, soigner les pathologies ou blessures bénignes et fournir une alimentation adaptée. Une lettre de recommandation du vétérinaire qui suit la structure peut être demandée.",
      "Avoir une connaissance de la filière courses, du sport hippique et de la vie d'un trotteur pendant sa carrière.",
      "Soutenir le monde des courses hippiques ou, à défaut, ne pas porter préjudice à son image dans ses actions, communications ou supports.",
    ],
  },
  {
    title: "Qualité des infrastructures",
    items: [
      "Disposer de boxes sécurisés et entretenus quotidiennement pour l'accueil des chevaux réformés.",
      "Disposer d'espaces de travail avec des sols adaptés : carrière ou manège, rond de longe et chemins de balade.",
      "Disposer d'espaces de détente et de liberté sécurisés : paddocks en sable ou en herbe.",
    ],
  },
  {
    title: "Modèle économique viable",
    items: [
      "La reconversion des trotteurs est une activité peu lucrative. Justifier d'une activité annexe : écurie de propriétaires, centre équestre ou activité sans lien avec les chevaux.",
    ],
  },
] as const;

export const networkCommitments = [
  {
    title: "Bien-être du cheval : pour une reconversion sérieuse et aboutie",
    items: [
      "Offrir à chaque cheval un cadre de vie sain et sécurisé et une activité adaptée à son état physique et mental, à son énergie et à son caractère.",
      "Fournir chaque jour une ration adaptée, de l'eau potable à volonté et les soins nécessaires : vaccins, vermifuge, parage et/ou ferrure, soins dentaires et traitement de la douleur.",
      "Conserver chaque cheval placé par Passerelle au minimum un mois. Avant de le proposer à la vente, il doit avoir acquis les bases de l'équitation classique et suivi un processus de désensibilisation et de rééducation adapté aux trotteurs réformés. Pour un cheval en convalescence, le délai dépend de sa remise en forme.",
      "Rechercher le meilleur acquéreur pour chaque cheval reconverti, en tenant compte du niveau d'équitation du cavalier, de sa capacité financière et de l'environnement qu'il peut offrir au cheval.",
    ],
  },
  {
    title: "Cas spécifique des centres équestres",
    intro: "Les trotteurs placés par Passerelle peuvent avoir une activité d'enseignement : une fois reconvertis, ils peuvent devenir des maîtres d'école polyvalents.",
    items: [
      "Adopter une gestion responsable et éthique de la cavalerie ; la charge de travail quotidienne doit rester raisonnable (trois heures de cours par jour au maximum les jours de grande affluence).",
      "Préserver la vie sociale des chevaux en organisant quotidiennement des sorties au paddock avec des congénères.",
      "Anticiper la retraite du cheval : le proposer à la vente entre sa treizième et sa quatorzième année à des particuliers afin qu'il finisse sa vie comme cheval de famille.",
      "Organiser la cession et le suivi comme pour tout cheval pris en charge par une structure de reconversion. Passerelle accompagne la structure dans ces étapes, notamment lors du renouvellement de sa cavalerie.",
    ],
  },
  {
    title: "Réactivité et rigueur administrative pour une bonne traçabilité",
    items: [
      "Tenir un registre d'élevage recensant les mouvements d'équidés, les interventions et les soins courants réalisés sur le cheptel.",
      "Déclarer les lieux de détention dont la structure est responsable. À partir de trois équidés, déclarer également un vétérinaire sanitaire.",
      "Veiller à ce que tout acheteur particulier possède le certificat d'engagement et de connaissance avant l'acquisition du cheval.",
      "Soumettre les trotteurs réformés accueillis et placés par Passerelle à la procédure de restriction d'exploitation réalisée en partenariat avec la SETF, qui interdit de recourir dans toute l'UET. À la réception du cheval, transmettre les livrets signalétiques (7 pages), les attestations de propriété et l'attestation d'exploitation limitée.",
      "Soumettre les trotteurs accueillis à la protection sous contrat Passerelle ou contrat équivalent validé par Passerelle : interdiction d'abattage et de consommation humaine, d'expérimentation animale, de location pour les saisons de chasse à courre, de reproduction en race Trotteur Français et de recours aux juments comme mères porteuses.",
      "Vendre chaque trotteur reconverti avec le contrat fourni par Passerelle ou un contrat équivalent validé par l'association, puis transmettre une copie du contrat signé et les coordonnées du nouveau propriétaire.",
      "Transmettre chaque mois à Passerelle la liste des trotteurs accueillis et leur destination après revente, qu'ils aient été placés par Passerelle ou non.",
      "Devenir membre de l'Association Passerelle, moyennant une cotisation annuelle de 20 €.",
    ],
  },
  {
    title: "Transparence : pour une prise en charge et une communication adaptées",
    items: [
      "Informer Passerelle dès que l'entourage d'un cheval contacte la structure au sujet de soins importants afin de définir ensemble le protocole et la répartition de la prise en charge.",
      "Donner des nouvelles de chaque cheval placé par Passerelle à son arrivée puis tout au long de la reconversion ou de la convalescence ; transmettre régulièrement des photos et vidéos partageables avec son ancien entourage et sur les réseaux sociaux.",
    ],
  },
] as const;
