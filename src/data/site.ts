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
      { label: "Notre mission", href: "/association" },
      { label: "Nos valeurs", href: "/association/valeurs" },
      { label: "L’équipe", href: "/association/equipe" },
      { label: "#RaceAndCare", href: "/race-and-care" },
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
    dateLabel: "07 juin 2026",
    title: "Village Race & Care à Lisieux",
    slug: "village-race-care-a-lisieux",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/village-race-care-a-lisieux",
  },
  {
    date: "2026-04-18",
    dateLabel: "18 avril 2026",
    title: "La reconversion au Prix de l’Atlantique avec Passerelle",
    slug: "la-reconversion-au-prix-de-latlantique-avec-passerelle",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/la-reconversion-au-prix-de-latlantique-avec-passerelle",
  },
  {
    date: "2026-02-19",
    dateLabel: "19 février 2026",
    title: "Les chevaux en force au Salon de l’Agriculture",
    slug: "les-chevaux-en-force-au-salon-de-lagriculture",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/les-chevaux-en-force-au-salon-de-lagriculture",
  },
  {
    date: "2026-01-24",
    dateLabel: "24 janvier 2026",
    title: "Vente de saillie 2026 — Remerciements",
    slug: "vente-de-saillie-2026-remerciements",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/vente-de-saillie-2026-remerciements",
  },
  {
    date: "2025-11-08",
    dateLabel: "08 novembre 2025",
    title: "Toute la filière courses réunie au Salon du Cheval d’Angers",
    slug: "toute-la-filiere-courses-reunie-sur-un-pole-dedie-au-salon-du-cheval-dangers",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/toute-la-filiere-courses-reunie-sur-un-pole-dedie-au-salon-du-cheval-dangers",
  },
  {
    date: "2025-11-04",
    dateLabel: "04 novembre 2025",
    title: "ATAM — Retour sur le Salon du Cheval d’Angers",
    slug: "atam---retour-sur-le-salon-du-cheval-dangers",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/atam---retour-sur-le-salon-du-cheval-dangers",
  },
  {
    date: "2025-09-13",
    dateLabel: "13 septembre 2025",
    title: "Fête du Cheval sur l’Hippodrome de Vincennes",
    slug: "fete-du-cheval-sur-lhippodrome-de-vincennes-journee-des-criteriums",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/fete-du-cheval-sur-lhippodrome-de-vincennes-journee-des-criteriums",
  },
  {
    date: "2025-08-24",
    dateLabel: "24 août 2025",
    title: "L’hippodrome de Beaumont de Lomagne renouvelle son engagement",
    slug: "lhippodrome-de-beaumont-de-lomagne-renouvelle-son-engagement-pour-la-reconversion",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/lhippodrome-de-beaumont-de-lomagne-renouvelle-son-engagement-pour-la-reconversion",
  },
  {
    date: "2025-07-07",
    dateLabel: "07 juillet 2025",
    title: "Les Estivales et la reconversion à Cabourg",
    slug: "race-care-sur-lhippodrome-de-cabourg-avec-les-crins-de-la-baie",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/race-care-sur-lhippodrome-de-cabourg-avec-les-crins-de-la-baie",
  },
  {
    date: "2025-06-01",
    dateLabel: "01 juin 2025",
    title: "Terra Aquae soutient la reconversion",
    slug: "terra-aqua-soutient-la-reconversion",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/terra-aqua-soutient-la-reconversion",
  },
  {
    date: "2025-05-26",
    dateLabel: "26 mai 2025",
    title: "Rapport d’AG 2024/2025",
    slug: "rapport-dag-2024-2025",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/rapport-dag-2024-2025",
  },
  {
    date: "2025-05-18",
    dateLabel: "18 mai 2025",
    title: "CSO réservé aux chevaux réformés des courses",
    slug: "cso-reservees-aux-chevaux-reformes-des-courses-de-galop-et-de-trot---ecurie-du-waldhof",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/cso-reservees-aux-chevaux-reformes-des-courses-de-galop-et-de-trot---ecurie-du-waldhof",
  },
  {
    date: "2025-04-27",
    dateLabel: "27 avril 2025",
    title: "Journée Race & Care à Strasbourg Hoerdt",
    slug: "journee-race-care-sur-lhippodrome-de-strasbourg-hoerdt",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/journee-race-care-sur-lhippodrome-de-strasbourg-hoerdt",
  },
  {
    date: "2025-04-19",
    dateLabel: "19 avril 2025",
    title: "Journée Fête du Cheval à Enghien-les-Bains",
    slug: "journee-fete-du-cheval-sur-lhippodrome-denghien-les-bains",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/journee-fete-du-cheval-sur-lhippodrome-denghien-les-bains",
  },
  {
    date: "2025-04-13",
    dateLabel: "13 avril 2025",
    title: "Opération Carottes — Race & Care à Agen",
    slug: "operation-carottes---race-care-sur-lhippodrome-dagen",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/operation-carottes---race-care-sur-lhippodrome-dagen",
  },
  {
    date: "2025-03-30",
    dateLabel: "30 mars 2025",
    title: "Passerelle au Salon du Cheval d’Albi",
    slug: "passerelle-au-salon-du-cheval-dalbi-avec-le-conseil-des-equides-doccitanie",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/passerelle-au-salon-du-cheval-dalbi-avec-le-conseil-des-equides-doccitanie",
  },
  {
    date: "2025-02-09",
    dateLabel: "09 février 2025",
    title: "Jumping international de Bordeaux",
    slug: "jumping-international-de-bordeaux---addp-passerelle-representent-la-reconversion-des-chevaux-de-courses",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/jumping-international-de-bordeaux---addp-passerelle-representent-la-reconversion-des-chevaux-de-courses",
  },
  {
    date: "2025-01-21",
    dateLabel: "21 janvier 2025",
    title: "La semaine américaine d’Arqana Trot",
    slug: "la-semaine-americaine-darqana-trot",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/la-semaine-americaine-darqana-trot",
  },
  {
    date: "2024-09-13",
    dateLabel: "13 septembre 2024",
    title: "Quand les trotteurs se reconvertissent au complet",
    slug: "quand-les-trotteurs-se-reconvertissent-au-complet",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/quand-les-trotteurs-se-reconvertissent-au-complet",
  },
  {
    date: "2024-09-11",
    dateLabel: "11 septembre 2024",
    title: "Avec Laëtitia Zaugg, les trotteurs font le spectacle",
    slug: "avec-laetitia-zaugg-les-trotteurs-font-le-spectacle",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/avec-laetitia-zaugg-les-trotteurs-font-le-spectacle",
  },
  {
    date: "2024-09-10",
    dateLabel: "10 septembre 2024",
    title: "Le trotteur, parfait partenaire du loisir d’attelage",
    slug: "le-trotteur-parfait-partenaire-du-loisir-dattelage",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/le-trotteur-parfait-partenaire-du-loisir-dattelage",
  },
  {
    date: "2024-06-14",
    dateLabel: "14 juin 2024",
    title: "Communiqué — Suspension temporaire des prises en charge",
    slug: "communique-suspension-temporaire-des-prises-en-charge",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/communique-suspension-temporaire-des-prises-en-charge",
  },
  {
    date: "2024-06-07",
    dateLabel: "07 juin 2024",
    title: "À Amiens, une opération bien-être équin",
    slug: "a-amiens-les-trotteurs-en-piste-ce-samedi-avec-une-operation-bien-etre-equin",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/a-amiens-les-trotteurs-en-piste-ce-samedi-avec-une-operation-bien-etre-equin",
  },
  {
    date: "2024-02-23",
    dateLabel: "23 février 2024",
    title: "Cheval de Bataille",
    slug: "cheval-de-bataille",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/cheval-de-bataille",
  },
  {
    date: "2023-10-20",
    dateLabel: "20 octobre 2023",
    title: "Salon du Cheval d’Angers — Trophée des réformés",
    slug: "salon-du-cheval-dangers---trophee-des-reformes-de-courses",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/salon-du-cheval-dangers---trophee-des-reformes-de-courses",
  },
  {
    date: "2023-10-19",
    dateLabel: "19 octobre 2023",
    title: "La reconversion au Salon du Cheval d’Angers",
    slug: "la-reconversion-au-salon-du-cheval-dangers",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/la-reconversion-au-salon-du-cheval-dangers",
  },
  {
    date: "2023-10-03",
    dateLabel: "03 octobre 2023",
    title: "Communiqué Passerelle : victime de son succès",
    slug: "communique-passerelle-victime-de-son-succes",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/communique-passerelle-victime-de-son-succes",
  },
  {
    date: "2023-09-10",
    dateLabel: "10 septembre 2023",
    title: "Compte rendu de l’Assemblée Générale Ordinaire",
    slug: "compte-rendu-de-lassemblee-generale-ordinaire-de-passerelle-en-date-du-6-septembre-2023",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/compte-rendu-de-lassemblee-generale-ordinaire-de-passerelle-en-date-du-6-septembre-2023",
  },
  {
    date: "2023-09-10",
    dateLabel: "10 septembre 2023",
    title: "Une cagnotte en ligne pour soutenir la reconversion",
    slug: "une-cagnotte-en-ligne-pour-soutenir-la-reconversion",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/une-cagnotte-en-ligne-pour-soutenir-la-reconversion",
  },
  {
    date: "2023-08-08",
    dateLabel: "08 août 2023",
    title: "Passerelle lance une cagnotte pour le transport",
    slug: "passerelle-lance-une-cagnotte-pour-le-transport",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/passerelle-lance-une-cagnotte-pour-le-transport",
  },
  {
    date: "2023-08-01",
    dateLabel: "01 août 2023",
    title: "L’association Passerelle mène les chevaux vers leur deuxième vie",
    slug: "lassociation-passerelle-mene-les-chevaux-vers-leur-deuxieme-vie",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/lassociation-passerelle-mene-les-chevaux-vers-leur-deuxieme-vie",
  },
  {
    date: "2023-07-21",
    dateLabel: "21 juillet 2023",
    title: "Et si les gagnants du PMU soutenaient la retraite des chevaux ?",
    slug: "et-si-on-proposait-aux-gagnants-du-pmu-de-soutenir-la-retraite-des-chevaux",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/et-si-on-proposait-aux-gagnants-du-pmu-de-soutenir-la-retraite-des-chevaux",
  },
  {
    date: "2023-07-19",
    dateLabel: "19 juillet 2023",
    title: "Passerelle ou la reconversion réussie des trotteurs",
    slug: "passerelle-ou-la-reconversion-reussie-des-trotteurs",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/passerelle-ou-la-reconversion-reussie-des-trotteurs",
  },
  {
    date: "2023-07-19",
    dateLabel: "19 juillet 2023",
    title: "Le bilan de la journée #RaceAndCare",
    slug: "le-bilan-de-la-journee-du-1er-juillet-raceandcare",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/le-bilan-de-la-journee-du-1er-juillet-raceandcare",
  },
  {
    date: "2022-11-15",
    dateLabel: "15 novembre 2022",
    title: "Le mot de la fin : Ensemble",
    slug: "le-mot-de-la-fin-ensemble",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/le-mot-de-la-fin-ensemble",
  },
  {
    date: "2022-05-01",
    dateLabel: "01 mai 2022",
    title: "L’hippodrome du mois — Amiens",
    slug: "lhippodrome-du-mois---amiens",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/lhippodrome-du-mois---amiens",
  },
  {
    date: "2021-09-26",
    dateLabel: "26 septembre 2021",
    title: "Signature d’un accord historique pour la reconversion",
    slug: "signature-dun-accord-de-partenariat-pour-la-reconversion-des-trotteurs-en-france",
    href: "https://www.passerelle-trotteurs.fr/fr/actualites/signature-dun-accord-de-partenariat-pour-la-reconversion-des-trotteurs-en-france",
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
