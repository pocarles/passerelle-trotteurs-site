# Site Association Passerelle

Site public de l'Association Passerelle (loi 1901, reconnue d'intérêt général),
dédiée à la reconversion et à la protection à vie des Trotteurs Français sortant
de la filière courses et élevage, sans discrimination d'âge ni d'état de santé.

Le site remplace l'ancien Yapla. Objectifs : centraliser les parcours de soutien,
publier les fiches chevaux, rester administrable par l'association depuis GitHub,
et conserver le référencement des anciennes URLs.

**Publics** : professionnels confiant un cheval, structures candidates à
l'accréditation, adoptants et acheteurs, donateurs, adhérents, parrains, mécènes,
ambassadeurs, grand public.

**Dépôt** : `pocarles/passerelle-trotteurs-site` — branche de travail `main`.

---

## Stack et contraintes

- **Astro 7** en sortie statique, **TypeScript**, **npm**, **Sharp**
- **Node >= 22.12.0** (voir `.node-version`)
- Hébergement cible : **Cloudflare Pages**, projet `passerelle-trotteurs-site`
- Déploiement par **GitHub Actions** (`.github/workflows/deploy.yml`) à chaque
  push sur `main` ; previews automatiques sur les pull requests
- Secrets CI requis : `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`
- Wrangler CI figé à `4.114.0`
- DNS chez OVH. La bascule de `www` depuis AWS CloudFront vers Pages doit se
  faire **sans toucher aux enregistrements MX**.

---

## Commandes

```bash
npm run dev            # serveur de développement
npm run build          # build statique dans dist/
npm run preview        # prévisualisation du build
npm run verify:launch  # build + contrôles complets — à lancer avant tout push
npm run deploy         # déploiement manuel
```

`scripts/verify-launch.mjs` contrôle le SEO, les canonical, les images sociales,
`robots.txt`, les blocs JSON-LD, le sitemap, les contenus et les redirections.
**C'est le garde-fou avant publication.**

---

## Architecture

```
src/
  layouts/Base.astro      structure HTML commune, SEO, JSON-LD, header/footer
  components/             AlertBanner, CtaBand, Footer, Header, HorseCard,
                          Icon, PageHeader, Prose, ResponsiveImage
  data/
    site.ts               identité, contacts, liens, navigation, mentions,
                          mission, protections, réseau, annuaire, chiffres
    mecenes.ts            partenaires et logos
    agenda.ts             événements à venir (les dates passées se masquent)
    chevaux.ts            helpers de tri et de filtrage
    dates.ts              formatage français des dates
  content/
    chevaux/*.md          fiches chevaux
    actualites/*.md       articles, dont l'archive importée de Yapla
  content.config.ts       schémas des collections
  styles/
    global.css            design system, responsive, couleurs, composants
    race-and-care.css     styles spécifiques Race & Care
  pages/                  voir ci-dessous

public/
  media/                  photos, vidéos, logos, galeries
  media/optimized/        variantes AVIF/WebP responsives
  fonts/                  Inter, Fraunces, Sacramento auto-hébergées
  js/                     nav, filters, horse-gallery, donation-simulator,
                          network-map — scripts externes, compatibles CSP
  data/departements.geojson
  vendor/leaflet/         bibliothèque de carte, servie localement
  _headers, _redirects, robots.txt, favicons
```

### Pages

| Route | Rôle |
|---|---|
| `/` | accueil |
| `/association/`, `/equipe`, `/valeurs` | présentation de l'association |
| `/reseau`, `/reseau/annuaire` | rejoindre le réseau, annuaire et carte |
| `/confier-et-proteger` | profils pris en charge, protections |
| `/adopter`, `/adopter/[slug]` | catalogue et fiches chevaux |
| `/adopter/chevaux-a-la-vente`, `/chevaux-a-l-adoption`, `/adoption-directe` | les trois modes de placement |
| `/actualites`, `/actualites/[slug]` | archive, agenda, article |
| `/participer`, `/adherer`, `/parrainer` | dons, adhésion, parrainage |
| `/mecenes/*` | mécénat, ambassadeurs, Jade Darling |
| `/race-and-care`, `/contact`, `/confidentialite`, `/mentions-legales`, `/404` | spécialisées et légales |

---

## Règles à respecter

**Contenu**
- Les textes partagés vivent dans `src/data/`, jamais dupliqués dans les pages.
- Fiches chevaux et actualités en Markdown, éditables depuis GitHub par
  l'association — voir `docs/GUIDE.md`.
- `draft: true` exclut une fiche de la production. `placed: true` la garde
  visible avec la mention « Placé ».
- `legacyUrl` porte l'ancienne URL Yapla et génère la redirection. Aucun lien du
  site ne doit dépendre de l'ancien site.
- Le chiffre du réseau est dérivé de `networkDirectory.length` — ne jamais le
  coder en dur.

**Sécurité et conformité**
- CSP stricte, **sans `unsafe-inline`** : aucun script ni style inline.
  `astro.config.mjs` force `inlineStylesheets: "never"`.
- Polices auto-hébergées, pas de CDN Google (RGPD).
- Leaflet servi localement, pas de dépendance tierce à l'exécution.
- Aucun analytics, pixel ni cookie — donc aucune bannière de consentement.

**Liens et médias**
- Une URL de partenaire n'est ajoutée qu'après vérification manuelle.
- Photos de chevaux : format paysage de préférence, < 3 Mo, nom de fichier en
  minuscules sans accent ni espace.
- URLs à slash final (sortie Astro par répertoire).

**Conversion**
- Les parcours réels restent externes et officiels : HelloAsso, intranet
  Passerelle, boutique, Facebook. Ne jamais les remplacer par des formulaires
  factices.

---

## Vocabulaire

| Terme | Sens |
|---|---|
| Trotteur Français (TF) | la race concernée par l'action de l'association |
| Reconversion | préparation du cheval à une seconde vie après les courses |
| Structure accréditée | structure du réseau accueillant et reconvertissant selon le cahier des charges |
| Contrat Passerelle | cadre de suivi et six garanties de protection à vie après placement |
| Adoption directe | cheval ne passant pas par un programme de reconversion ; contrat provisoire d'un an |
| Vente | cheval passé par une structure accréditée |
| Adoption | cheval souvent âgé, fragile ou non montable, contre frais d'adoption |
| Race & Care | action de sensibilisation sur les hippodromes (`#RaceAndCare`) |
| Yapla | ancien site, dont actualités et URLs ont été migrées |
| `pages.dev` | préproduction Cloudflare, volontairement en `noindex` |

---

## Points de vigilance

- Le bandeau d'alerte annonçant la suspension des prises en charge est
  **inconditionnel** dans `src/components/AlertBanner.astro`. Vérifier
  régulièrement auprès de l'association s'il doit rester.
- `src/data/agenda.ts` doit être tenu à jour avant chaque échéance.
- `network-structures-presentation.mp4` (~21 Mo) traîne à la racine, non suivi et
  non utilisé. Ne pas l'ajouter au dépôt sans validation.
- `.pnpm-store/` à la racine : cache inutile au projet.
- Le README mentionne un chiffre de structures qui peut diverger de l'annuaire.

## Chantiers ouverts

- Bascule du domaine `www` vers Cloudflare Pages, à confirmer puis vérifier
  (certificat, DNS, redirections, robots, sitemap).
- Photos haute définition, surtout pour les visuels pleine largeur — c'est le
  principal gain qualitatif attendu.
- Version anglaise, non commencée.
- URLs à confirmer : Karisma Consulting, Equi-libre.
