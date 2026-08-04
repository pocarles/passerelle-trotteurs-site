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
      { label: "Missions & valeurs", href: "/association" },
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
  "Ils ne peuvent pas être abattus.",
  "Ils sont exclus définitivement de la filière course.",
  "Ils sont exclus des activités de chasse à courre.",
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
