export interface AgendaEvent {
  /** Date au format AAAA-MM-JJ. */
  date: string;
  /** À renseigner uniquement pour un événement sur plusieurs jours. */
  endDate?: string;
  dateLabel: string;
  title: string;
  location?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  linkLabel?: string;
}

/**
 * Prochains rendez-vous affichés dans l'encart Agenda de /actualites.
 * Les événements passés disparaissent automatiquement de la page.
 */
export const agendaEvents: AgendaEvent[] = [
  {
    date: "2026-11-08",
    dateLabel: "Dimanche 8 novembre 2026",
    title: "Journée Race & Care à Vire",
    location: "Hippodrome de Vire Normandie",
    href: "https://hippodrome-vire-normandie.fr/",
    linkLabel: "Voir l’hippodrome",
  },
  {
    date: "2026-11-13",
    endDate: "2026-11-15",
    dateLabel: "Du 13 au 15 novembre 2026",
    title: "Salon du Cheval d’Angers",
    location: "Parc des Expositions d’Angers",
    href: "https://angers.a-p-c-t.net/salon-du-cheval/billetterie/",
    linkLabel: "Accéder à la billetterie",
  },
];
