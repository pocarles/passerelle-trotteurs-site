/** "7 juin 2026" from a Date, for article listings. */
export function dateLabel(d: Date, explicit?: string): string {
  if (explicit) return explicit;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
