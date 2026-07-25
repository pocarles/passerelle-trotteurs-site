/**
 * Mécènes et partenaires, repris de la page « Nos mécènes & ambassadeurs » de
 * l'ancien site, où ils n'apparaissaient que sous forme de logos sans nom ni
 * lien. Les noms ont été relevés sur les logos eux-mêmes.
 *
 * `url` n'est renseignée que pour les sites vérifiés. Un partenaire sans URL
 * s'affiche sans lien — mieux vaut pas de lien qu'un lien mort.
 */
export type Mecene = {
  nom: string;
  logo: string;
  url?: string;
};

export const meceneGroupes: { titre: string; membres: Mecene[] }[] = [
  {
    titre: "La filière et ses institutions",
    membres: [
      {
        nom: "Société du Trotteur Français",
        logo: "/media/mecenes/setf.png",
        url: "https://www.letrot.com",
      },
      {
        nom: "Fédération Nationale des Courses Hippiques",
        logo: "/media/mecenes/fnch.png",
        url: "https://www.fnch.fr",
      },
      {
        nom: "AFASEC — L’École des courses hippiques",
        logo: "/media/mecenes/afasec.png",
        url: "https://www.afasec.fr",
      },
      {
        nom: "Au-Delà des Pistes",
        logo: "/media/mecenes/addp.png",
        url: "https://www.audeladespistes.fr",
      },
      {
        nom: "Conseil des Chevaux Hauts-de-France",
        logo: "/media/mecenes/conseil-chevaux-hdf.png",
      },
      {
        nom: "Région Hauts-de-France",
        logo: "/media/mecenes/region-hauts-de-france.png",
        url: "https://www.hautsdefrance.fr",
      },
    ],
  },
  {
    titre: "Hippodromes et sociétés de courses",
    membres: [
      {
        nom: "Hippodrome d’Amiens",
        logo: "/media/mecenes/hippodrome-amiens.png",
        url: "https://www.hippodrome-amiens.fr",
      },
      {
        nom: "Reims, Hippodrome de la Champagne",
        logo: "/media/mecenes/hippodrome-reims.png",
      },
      {
        nom: "Hippodrome de La Capelle",
        logo: "/media/mecenes/hippodrome-la-capelle.png",
      },
      {
        nom: "Société Hippique de Saint-Galmier — Saint-Étienne",
        logo: "/media/mecenes/societe-hippique-saint-galmier.png",
      },
      {
        nom: "Société des Courses de Strasbourg",
        logo: "/media/mecenes/courses-strasbourg.png",
      },
    ],
  },
  {
    titre: "Entreprises et partenaires",
    membres: [
      {
        nom: "Arqana Trot",
        logo: "/media/mecenes/arqana-trot.png",
        url: "https://www.arqana-trot.com",
      },
      {
        nom: "AUCTAV",
        logo: "/media/mecenes/auctav.png",
        url: "https://www.auctav.com",
      },
      {
        nom: "Crédit Agricole Brie Picardie",
        logo: "/media/mecenes/credit-agricole-brie-picardie.png",
        url: "https://www.credit-agricole.fr/ca-briepicardie",
      },
      {
        nom: "Karisma Consulting",
        logo: "/media/mecenes/karisma-consulting.png",
      },
      {
        nom: "Equi-libre — massage équin et canin",
        logo: "/media/mecenes/equi-libre.png",
      },
    ],
  },
  {
    titre: "Médias",
    membres: [
      { nom: "24H au Trot", logo: "/media/mecenes/24h-au-trot.png" },
    ],
  },
];

export const ambassadeurs = [
  {
    slug: "jade-darling",
    nom: "Jade & Darling des Mares",
    role: "Ambassadrice reconversion",
    resume:
      "Une trotteuse réformée et sa cavalière : la preuve, sur sept ans, que la persévérance et la patience font des merveilles.",
    photo: "/media/ambassadeurs/darling-1.jpg",
    instagram: "https://www.instagram.com/dance_with_darling",
  },
];
