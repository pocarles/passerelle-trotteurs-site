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
  {
    label: "Réseau",
    href: "/reseau",
    children: [
      { label: "Annuaire des structures", href: "/reseau/annuaire#annuaire" },
      { label: "Carte des structures", href: "/reseau/annuaire#carte" },
    ],
  },
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

/** Département used to position each accredited structure on the network map. */
export const networkMapDepartments = [
  { code: "02", label: "Aisne", structures: ["Écuries de Chigny"] },
  {
    code: "04",
    label: "Alpes-de-Haute-Provence",
    structures: ["Centre équestre Château Laval"],
  },
  {
    code: "14",
    label: "Calvados",
    structures: [
      "Domaine des Dakotines",
      "Les Crins de la Baie",
      "Société Hippique de Vire en Bocage",
    ],
  },
  { code: "25", label: "Doubs", structures: ["L’Élevage de tous temps"] },
  { code: "42", label: "Loire", structures: ["Rehab Ranch"] },
  {
    code: "45",
    label: "Loiret",
    structures: ["Écurie HADAH", "Écurie L’Eau de Fosse"],
  },
  { code: "56", label: "Morbihan", structures: ["AnimOsmose"] },
  { code: "59", label: "Nord", structures: ["Écurie du Saule"] },
  {
    code: "60",
    label: "Oise & Calvados",
    structures: ["Écuries de la Brèche", "L’Écrin du Bonheur"],
  },
  { code: "61", label: "Orne", structures: ["Les Écuries du Moulin d’Aubry"] },
  {
    code: "63",
    label: "Puy-de-Dôme",
    structures: ["Les Crins de Liberté", "SOS Cheval"],
  },
  {
    code: "67",
    label: "Bas-Rhin",
    structures: ["Education LF — Écurie du Hirlenbach"],
  },
  { code: "77", label: "Seine-et-Marne", structures: ["Écurie TDS"] },
  { code: "82", label: "Tarn-et-Garonne", structures: ["Haras des Plaines"] },
  { code: "85", label: "Vendée", structures: ["La Grange de Prétôt"] },
  { code: "87", label: "Haute-Vienne", structures: ["Héliominos"] },
  { code: "89", label: "Yonne", structures: ["Les chevaux d’Elo"] },
] as const;

/** A concise, web-first summary of the network accreditation requirements. */
export const networkConditions = [
  {
    icon: "horse",
    title: "Connaissance du Trotteur Français",
    summary:
      "Une expérience concrète de la reconversion, des soins adaptés et une bonne connaissance de la filière courses.",
    items: [
      "Avoir déjà reconverti des trotteurs et pouvoir présenter des recommandations d'anciens acquéreurs.",
      "Connaître les pathologies courantes, les soins, l'alimentation et les protocoles adaptés aux trotteurs ; une recommandation vétérinaire peut être demandée.",
      "Comprendre le monde des courses et respecter son image dans ses actions et communications.",
    ],
  },
  {
    icon: "house",
    title: "Qualité des infrastructures",
    summary:
      "Des installations propres à accueillir, travailler et assurer les soins et le bien-être des trotteurs accueillis.",
    items: [
      "Disposer d’au moins un box ou d’une stabulation entretenue, disponible en cas de besoin pour assurer les soins.",
      "Veiller à ce que les infrastructures et le mode de vie des équidés soient conformes à la Charte du bien-être équin.",
      "Disposer de sols adaptés pour le travail : carrière ou manège, rond de longe et chemins de balade.",
      "Offrir des paddocks sécurisés, en sable ou en herbe, pour la détente et la liberté.",
    ],
  },
  {
    icon: "sprout",
    title: "Modèle économique viable",
    summary:
      "Vous devez avoir une activité principale à côté de l’activité de reconversion dans votre foyer.",
    items: [
      "Justifier d'une activité annexe : écurie de propriétaires, centre équestre ou activité hors secteur équin.",
    ],
  },
] as const;

export const networkCommitments = [
  {
    title: "Bien-être du cheval",
    summary:
      "Chaque Trotteur bénéficie d’une reconversion progressive, adaptée à son état physique, mental et à son profil.",
    items: [
      "Mettre en place une reconversion adaptée, avec une activité, une ration et des soins ajustés aux besoins de chaque cheval.",
      "Conserver le cheval au minimum un mois afin de consolider les bases de l’équitation classique, à pied comme monté, et de lui faire découvrir le travail en carrière aux trois allures.",
      "Veiller à un placement responsable auprès d’un cavalier au niveau adapté, capable d’assumer le cheval financièrement et de lui offrir des conditions de vie appropriées.",
    ],
    note:
      "Centres équestres : une vigilance particulière est portée à la gestion responsable et éthique de la cavalerie, à la charge de travail quotidienne, à la vie sociale des chevaux et à l’anticipation de leur retraite.",
  },
  {
    title: "Réactivité et rigueur administrative",
    summary:
      "Une gestion rigoureuse garantit la conformité de la structure et le suivi fiable de chaque cheval accueilli.",
    items: [
      "Respecter la réglementation applicable à la détention d’équidés : registre d’élevage, déclaration des lieux de détention, vétérinaire sanitaire et vérification du certificat d’engagement et de connaissance de l’acheteur avant l’acquisition.",
      "Transmettre à Passerelle les sept premières pages du livret signalétique, l’attestation de propriété au nom de la structure de reconversion et l’attestation d’exploitation limitée fournie par l’association.",
      "Placer chaque Trotteur sous le contrat de protection Passerelle, informer l’association des entrées et sorties de chevaux et adhérer à l’association.",
    ],
  },
  {
    title: "Transparence et traçabilité",
    summary:
      "Un lien régulier avec Passerelle permet d’accompagner au mieux les structures et chaque cheval pris en charge.",
    items: [
      "Prendre contact avec Passerelle en cas de difficulté afin d’étudier ensemble les solutions possibles, y compris un accompagnement financier lorsque la situation le justifie.",
      "Donner régulièrement des nouvelles des chevaux pris en charge, de leur arrivée jusqu’à leur reconversion ou leur placement, avec des photos ou vidéos lorsque cela est possible.",
    ],
  },
] as const;
