import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * News archive, ported off the association's Yapla site before it is retired.
 * Bodies are the original HTML, sanitised to an allowlist of tags at import.
 */
const actualites = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/actualites" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    dateLabel: z.string(),
    source: z.string().optional(),
    image: z.string().optional(),
    /** Where this article lived on the old site, kept for redirects. */
    legacyUrl: z.string().url().optional(),
  }),
});

/**
 * Horses currently offered by the association.
 *
 * `statut` mirrors the three routes described on /adopter:
 *  - vente            passed through an accredited reconversion structure
 *  - adoption         older or unsound, usually not ridden, adoption fee
 *  - adoption-directe no reconversion programme, one-year provisional contract
 *
 * Entries are removed once a horse is placed; `placed: true` keeps a horse
 * visible but marked, which is useful right after a placement.
 */
const chevaux = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/chevaux" }),
  schema: z.object({
    nom: z.string(),
    statut: z.enum(["vente", "adoption", "adoption-directe"]),
    /** Year of birth. French trotter naming ties the initial to the year. */
    annee: z.number().int().min(1990).max(2100).optional(),
    sexe: z.enum(["hongre", "jument", "entier"]).optional(),
    robe: z.string().optional(),
    taille: z.string().optional(),
    montable: z.boolean().default(false),
    /** Accredited structure currently holding the horse. */
    structure: z.string().optional(),
    departement: z.string().optional(),
    /** Free text ("1 500 €", "frais d'adoption") — never a bare number. */
    participation: z.string().optional(),
    resume: z.string(),
    photos: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    placed: z.boolean().default(false),
    draft: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { actualites, chevaux };
