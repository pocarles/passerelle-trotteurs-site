// Chevaux à parrainer : cartes sur /participer/parrainer et une fiche par
// cheval sur /participer/parrainer/<slug>.
// Photos : public/media/parrainages/ (paysage, < 3 Mo, nom en minuscules
// sans accent). Les données de course viennent de la fiche LeTrot.

export type Sponsored = {
  slug: string;
  name: string;
  /** Prénom court utilisé dans les boutons. */
  shortName: string;
  identity: string;
  origins: string;
  /** Pastille affichée sur la photo. */
  status: string;
  photo: string;
  photoAlt: string;
  /** Phrase d’accroche sous le nom, en tête de fiche. */
  lead: string;
  careerFacts: { label: string; value: string }[];
  career: string[];
  arrival: string[];
  need: string[];
  follower: string;
  letrot: string;
};

export const sponsored: Sponsored[] = [
  {
    slug: "kaporal-gold",
    name: "Kaporal Gold",
    shortName: "Kaporal",
    identity: "Hongre bai · 6 ans",
    origins: "Par Lilium Madrik et Carte Gold",
    status: "En convalescence",
    photo: "/media/parrainages/kaporal-gold.jpg",
    photoAlt: "Kaporal Gold, hongre bai avec une liste blanche, regarde l’objectif par-dessus une clôture",
    lead: "Un départ difficile, une reconversion réussie, puis une maladie qui l’a beaucoup affaibli. Kaporal se bat pour retrouver la forme.",
    careerFacts: [
      { label: "Qualification", value: "Février 2023, Bordeaux" },
      { label: "Courses", value: "14, en 2023 et 2024" },
      { label: "Meilleur résultat", value: "3e à Agen-La Garenne" },
      { label: "Record", value: "1’16”9" },
      { label: "Gains", value: "3 560 €" },
    ],
    career: [
      "Encore poulain, au pied de sa mère, Kaporal a reçu un coup au grasset. Son entourage l’a fait soigner et a fait retirer les fragments qui le gênaient.",
      "Malgré ce départ difficile, il s’est qualifié en février 2023 à Bordeaux et a couru quatorze courses dans le Sud-Ouest, jusqu’à l’été 2024. En janvier 2024, il a pris une belle troisième place à Agen-La Garenne.",
    ],
    arrival: [
      "Après les courses, Kaporal a été reconverti à la selle et a trouvé un adoptant. Celui-ci l’a ensuite rendu à Passerelle, avec Regalada, qui lui tenait compagnie.",
    ],
    need: [
      "Kaporal a perdu énormément d’état. Le diagnostic est tombé cet été : maladie de Lyme et une forme de piroplasmose. Après ce premier traitement, on lui a découvert des ulcères gastriques de grade 2 à 3 sur 4.",
      "Il est aujourd’hui en pension de convalescence. Son traitement contre les ulcères se termine mi-novembre et sera suivi d’une gastroscopie de contrôle. Il lui faudra ensuite du temps et de la patience pour se remuscler, avant de pouvoir être proposé à l’adoption.",
      "Votre parrainage finance sa pension, ses traitements et son suivi vétérinaire pendant toute cette convalescence.",
    ],
    follower:
      "L’un de ses éleveurs ne l’a jamais perdu de vue et prend régulièrement de ses nouvelles.",
    letrot: "https://www.letrot.com/stats/chevaux/kaporal-gold/ZmJbYwcACwEW/courses",
  },
  {
    slug: "regalada",
    name: "Regalada",
    shortName: "Regalada",
    identity: "Jument baie · 21 ans",
    origins: "Par Hermes de Pericard et Candie du Lys",
    status: "Bientôt à l’adoption",
    photo: "/media/parrainages/regalada.jpg",
    photoAlt: "Regalada, jument baie, passe la tête par la porte d’un van",
    lead: "Gagnante sur les hippodromes, puis poulinière, Regalada veille aujourd’hui sur Kaporal. À 21 ans, elle mérite une vie douce.",
    careerFacts: [
      { label: "Courses", value: "26, de 2008 à 2010" },
      { label: "Victoires", value: "2, à Cluny et Divonne-les-Bains" },
      { label: "Record", value: "1’21”3" },
      { label: "Gains", value: "11 800 €" },
      { label: "Ensuite", value: "Poulinière" },
    ],
    career: [
      "Regalada a débuté en course en 2008. Sa plus belle saison, c’est 2009 : elle gagne à Cluny au printemps, puis à Divonne-les-Bains en août, où elle établit son record.",
      "Après vingt-six courses, elle quitte les pistes en 2010 pour devenir poulinière.",
    ],
    arrival: [
      "Retraitée de la reproduction, Regalada s’est trouvé un autre rôle : tenir compagnie à Kaporal. Quand l’adoptant de Kaporal l’a rendu à Passerelle, elle est revenue avec lui.",
    ],
    need: [
      "Regalada n’a pas de souci de santé particulier, mais elle a besoin d’être remusclée. Elle verra prochainement l’ostéopathe pour des douleurs au postérieur.",
      "Elle sera bientôt disponible à l’adoption, pour de la petite balade occasionnelle et de la compagnie. D’ici là, votre parrainage finance sa pension et ses soins.",
    ],
    follower:
      "Son ancienne propriétaire est toujours impliquée et prend régulièrement de ses nouvelles.",
    letrot: "https://www.letrot.com/stats/chevaux/regalada/ZGdaZwUCAQAD/courses",
  },
];
