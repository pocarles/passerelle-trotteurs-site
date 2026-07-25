import { getCollection } from "astro:content";

export const statutLabel: Record<string, string> = {
  vente: "À la vente",
  adoption: "À l’adoption",
  "adoption-directe": "Adoption directe",
};

export const statutDescription: Record<string, string> = {
  vente:
    "Passés par une structure de reconversion accréditée, remis au travail et prêts pour une nouvelle discipline. Contrat Passerelle obligatoire.",
  adoption:
    "Chevaux vieillissants ou atteints de pathologies, souvent non montables, destinés au travail à pied ou aux balades en main. Des frais d’adoption s’appliquent.",
  "adoption-directe":
    "Chevaux n’ayant pas suivi de programme de reconversion, sous contrat de placement provisoire d’un an.",
};

/**
 * Age in years from the birth year. French trotters are aged by year of birth,
 * not by birthday, so a plain subtraction is the convention the milieu uses.
 */
export function horseAge(annee?: number): number | null {
  if (!annee) return null;
  return new Date().getFullYear() - annee;
}

/**
 * Published horses, newest update first, placed ones last.
 *
 * Draft entries are the layout examples in src/content/chevaux. They render in
 * `astro dev` so the page can be reviewed with content, and are excluded from
 * the build so nothing fictional is ever published.
 */
export async function getHorses() {
  const all = await getCollection("chevaux");
  return all
    .filter((h) => import.meta.env.DEV || !h.data.draft)
    .sort((a, b) => {
      if (a.data.placed !== b.data.placed) return a.data.placed ? 1 : -1;
      return (
        (b.data.updated?.valueOf() ?? 0) - (a.data.updated?.valueOf() ?? 0)
      );
    });
}
