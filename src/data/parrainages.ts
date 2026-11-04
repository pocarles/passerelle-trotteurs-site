// Chevaux à parrainer, affichés sur /participer/parrainer.
// Pour ajouter une photo : déposer le fichier dans public/media/parrainages/
// (paysage, < 3 Mo, nom en minuscules sans accent) et renseigner `photo`.

export type Sponsored = {
  name: string;
  identity: string;
  origins: string;
  status: string;
  photo?: string;
  photoAlt?: string;
  story: string[];
  follower: string;
  letrot: string;
};

export const sponsored: Sponsored[] = [
  {
    name: "Kaporal Gold",
    identity: "Hongre bai · 6 ans",
    origins: "Par Lilium Madrik et Carte Gold",
    status: "En convalescence",
    story: [
      "Kaporal n’a pas eu un départ facile. Encore poulain, au pied de sa mère, il a reçu un coup au grasset. Son entourage l’a fait soigner et a fait retirer les fragments qui le gênaient. Il a couru un peu, puis a été reconverti à la selle.",
      "La vie l’a ensuite ramené vers nous : son adoptant l’a rendu à Passerelle, avec Regalada, sa compagne de pré. Kaporal a perdu énormément d’état. Le diagnostic est tombé cet été : maladie de Lyme et une forme de piroplasmose. Après ce premier traitement, on lui a découvert des ulcères gastriques de grade 2 à 3 sur 4.",
      "Aujourd’hui en pension de convalescence, il termine son traitement mi-novembre, avant une gastroscopie de contrôle. Il lui faudra ensuite du temps et de la patience pour se remuscler, avant de pouvoir chercher une nouvelle famille.",
    ],
    follower:
      "L’un de ses éleveurs ne l’a jamais perdu de vue et prend régulièrement de ses nouvelles.",
    letrot: "https://www.letrot.com/stats/chevaux/kaporal-gold/ZmJbYwcACwEW/courses",
  },
  {
    name: "Regalada",
    identity: "Jument baie · 21 ans",
    origins: "Par Hermes de Pericard et Candie du Lys",
    status: "À remuscler",
    story: [
      "Regalada a couru vingt-six fois et remporté deux victoires, avant de devenir poulinière. Aujourd’hui retraitée de la reproduction, elle s’est trouvé un autre rôle : tenir compagnie à Kaporal. C’est avec lui qu’elle est revenue à Passerelle.",
      "Elle n’a pas de souci de santé particulier, mais elle a besoin d’être remusclée et verra prochainement l’ostéopathe pour des douleurs au postérieur. À 21 ans, elle mérite des soins attentifs et une vie douce.",
    ],
    follower:
      "Son ancienne propriétaire est toujours impliquée et prend régulièrement de ses nouvelles.",
    letrot: "https://www.letrot.com/stats/chevaux/regalada/ZGdaZwUCAQAD/courses",
  },
];
