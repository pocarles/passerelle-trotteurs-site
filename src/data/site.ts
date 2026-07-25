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
    label: "L’association",
    href: "/association",
    children: [
      { label: "Notre mission", href: "/association" },
      { label: "Nos valeurs", href: "/association/valeurs" },
      { label: "L’équipe", href: "/association/equipe" },
    ],
  },
  {
    label: "Nos actions",
    href: "/actions",
    children: [
      { label: "Le réseau accrédité", href: "/reseau" },
      { label: "#RaceAndCare", href: "/actions/race-and-care" },
      { label: "La protection Passerelle", href: "/protection" },
    ],
  },
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
    icon: "hand",
    title: "Recueillir",
    body: "Nous prenons en charge les Trotteurs Français sortant de la filière course, sans discrimination d’âge ni d’état de santé.",
  },
  {
    icon: "sprout",
    title: "Reconvertir",
    body: "Nos structures accréditées leur redonnent les codes de l’équitation classique et préparent une seconde carrière adaptée.",
  },
  {
    icon: "shield",
    title: "Protéger à vie",
    body: "Chaque cheval placé l’est sous contrat Passerelle, qui le suit et le protège pour le reste de sa vie.",
  },
];

export const pathways = [
  {
    title: "Confier un trotteur",
    body: "Propriétaires, entraîneurs, éleveurs : nous trouvons une structure d’accueil, prenons en charge les démarches et organisons le transport.",
    href: "/confier",
    image: "/media/stable.jpg",
    alt: "Une bénévole Passerelle avec un trotteur dans son box",
    icon: "hand",
  },
  {
    title: "Adopter un trotteur",
    body: "Acheter ou adopter un Trotteur Français reconverti, sous un contrat qui le protège définitivement de l’abattage et du retour aux courses.",
    href: "/adopter",
    image: "/media/bond.jpg",
    alt: "Une cavalière et un trotteur alezan, face à face",
    icon: "heart",
  },
  {
    title: "Rejoindre le réseau",
    body: "Vous avez l’expérience de la reconversion et partagez nos valeurs : devenez une structure accréditée Passerelle.",
    href: "/reseau",
    image: "/media/attelage.jpg",
    alt: "Un trotteur réformé mené en attelage de loisir",
    icon: "map",
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

export const news = [
  {
    date: "2026-06-07",
    dateLabel: "7 juin 2026",
    title: "Village Race & Care à Lisieux",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/village-race-care-a-lisieux",
  },
  {
    date: "2026-04-18",
    dateLabel: "18 avril 2026",
    title: "La reconversion au Prix de l’Atlantique avec Passerelle",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/la-reconversion-au-prix-de-latlantique-avec-passerelle",
  },
  {
    date: "2026-02-19",
    dateLabel: "19 février 2026",
    title: "Les chevaux en force au Salon de l’Agriculture",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/les-chevaux-en-force-au-salon-de-lagriculture",
  },
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
