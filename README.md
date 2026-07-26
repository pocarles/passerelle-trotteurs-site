# Passerelle — site public

[![Deploy](https://github.com/pocarles/passerelle-trotteurs-site/actions/workflows/deploy.yml/badge.svg)](https://github.com/pocarles/passerelle-trotteurs-site/actions/workflows/deploy.yml)

Refonte du site public de l'[Association Passerelle](https://www.passerelle-trotteurs.fr),
association loi 1901 reconnue d'intérêt général, dédiée à la reconversion et à la
protection à vie des Trotteurs Français.

Site statique **Astro**, déployé sur **Cloudflare Pages**.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview
```

## Structure

```
src/
  data/site.ts        contenu et chiffres — à modifier ici, pas dans le markup
  layouts/Base.astro  <head>, header, footer, SEO
  components/         Header, Footer, Icon
  pages/index.astro   page d'accueil (sections + styles scopés)
  styles/global.css   design system (couleurs, typo, boutons)
public/
  fonts/              Fraunces + Inter auto-hébergées (pas de CDN Google — RGPD)
  media/              photographies de l'association
```

## Design system

Couleurs dérivées du logo de l'association (`#bad688` vert de marque,
`#373736` encre) :

| Token | Valeur | Usage |
| --- | --- | --- |
| `--cream` | `#f7f4ec` | fond de page |
| `--forest` | `#1f3d2b` | bandeau chiffres |
| `--forest-deep` | `#16301f` | section contrat, pied de page |
| `--moss` | `#55702c` | liens, sur-titres (contraste AA sur crème) |
| `--sage` | `#bad688` | accents sur fond sombre uniquement |

Typographie : **Fraunces** (display, sérif variable) + **Inter** (texte).

`--moss-mid` (`#6e8b3d`) n'atteint pas AA en petit corps : réservé aux grands
titres et aux éléments décoratifs.

## Chiffres affichés

Tous sourcés depuis les publications de l'association et centralisés dans
`src/data/site.ts` :

- **2020** — création (décembre 2020)
- **22** — structures accréditées (annuaire du réseau)
- **10–15** — chevaux confiés par semaine
- **6** — protections à vie du contrat Passerelle

## Photographies

Les images de `public/media/` proviennent des publications de l'association
(site actuel et réseaux sociaux). Elles sont en définition limitée pour un usage
plein écran : `hero-jump.jpg` fait 953×953 px et est agrandi dans la bannière.

**Une série photo dédiée en haute définition est le principal levier restant
pour la qualité visuelle du site.**

## Déploiement — Cloudflare Pages

Projet : **passerelle-trotteurs-site**
Préproduction : <https://passerelle-trotteurs-site.pages.dev>

Déploiement manuel depuis la machine :

```bash
npm run deploy
```

### Déploiement automatique

`.github/workflows/deploy.yml` déploie à chaque push sur `main`, et crée un
déploiement de prévisualisation (URL dédiée) pour chaque pull request.

Deux secrets sont nécessaires sur le dépôt GitHub :

| Secret | Valeur |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | déjà renseigné |
| `CLOUDFLARE_API_TOKEN` | déjà renseigné |

Pour renouveler le jeton : le créer sur
<https://dash.cloudflare.com/profile/api-tokens> en jeton personnalisé avec la
seule permission `Account → Cloudflare Pages → Edit`, limitée au compte
concerné, puis :

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo pocarles/passerelle-trotteurs-site
```

**Pourquoi pas l'intégration Git native de Cloudflare ?** Elle ne peut pas être
ajoutée à un projet Pages existant : le tableau de bord ne la propose qu'à la
création du projet. La brancher imposerait de supprimer le projet actuel et
d'en recréer un depuis le dépôt GitHub, en libérant puis en reprenant le
sous-domaine `passerelle-trotteurs-site.pages.dev`. Le workflow GitHub Actions
donne le même résultat sans cette manipulation.

| Réglage | Valeur |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22 (voir `.node-version`) |

### En-têtes HTTP

`public/_headers` applique une Content-Security-Policy stricte
(`script-src 'self'` / `style-src 'self'`, aucune exception `unsafe-inline`).
Elle n'est tenable que parce que le site ne contient ni style ni script en
ligne : `astro.config.mjs` force `inlineStylesheets: "never"` et le script du
menu mobile vit dans `public/js/nav.js`. **Toute feuille de style ou tout
script inséré en ligne sera bloqué par le navigateur.**

### Propriété du compte

Le projet est hébergé sur le compte Cloudflare personnel « Apiruck Account ».
Pour que l'association possède réellement son site, ce projet devra être
recréé sur un compte Cloudflare détenu par Passerelle — même problème que
celui décrit dans l'audit de propriété de la plateforme.

Le domaine `www.passerelle-trotteurs.fr` est actuellement servi par AWS
CloudFront et sa zone DNS est gérée chez OVH. Le basculement du domaine
nécessite d'abord la récupération du compte OVH — voir l'audit de propriété
de la plateforme.

## À faire

- [ ] Publier de vraies fiches chevaux (le système est prêt, les données
      manquent — voir « Ajouter un cheval »)
- [ ] Confirmer les URL manquantes des partenaires (voir « Mécènes »)
- [ ] Version anglaise
- [ ] Photographies haute définition

## Ajouter un cheval

Créer un fichier dans `src/content/chevaux/`, par exemple `ulysse.md` :

```markdown
---
nom: "Ulysse du Vivier"
statut: "vente"          # vente | adoption | adoption-directe
annee: 2018
sexe: "hongre"           # hongre | jument | entier
robe: "Bai"
taille: "1,62 m"
montable: true
structure: "Écuries de la Brèche"
departement: "Oise"
participation: "Prix sur demande"
resume: "Une phrase de présentation, affichée sur la vignette."
photos:
  - src: "/media/chevaux/ulysse-1.jpg"
    alt: "Ulysse au pré"
updated: 2026-07-25
---

Le texte long de la fiche : caractère, travail depuis la réforme, profil de
cavalier recherché, soins à prévoir.
```

Les photos vont dans `public/media/chevaux/`. La fiche apparaît
automatiquement sur `/adopter` et sur `/adopter/ulysse`.

- `placed: true` garde la fiche visible en la marquant « Placé ».
- `draft: true` réserve la fiche au mode développement : elle ne part pas en
  production. Les trois fiches `exemple-*.md` servent uniquement de modèle et
  sont en `draft`.
- Supprimer le fichier retire le cheval du site.

Tant qu'aucun cheval n'est publié, `/adopter` affiche un encart renvoyant vers
le groupe Facebook et vers le formulaire de contact.

## Actualités

Les 37 articles ont été rapatriés depuis l'ancien site Yapla dans
`src/content/actualites/`, images comprises (`public/media/actualites/`). Le
site ne dépend plus de `www.passerelle-trotteurs.fr` : aucun lien ne pointe
vers l'ancien site.

Le champ `legacyUrl` de chaque article conserve son ancienne adresse, pour
mettre en place des redirections le jour de la bascule.

### Non repris de l'ancien site

- la boutique, qui reste un lien externe.

## Mécènes & ambassadeurs

`src/data/mecenes.ts` liste les partenaires par famille, avec leur logo dans
`public/media/mecenes/`. Sur l'ancien site ils n'apparaissaient que sous forme
de logos, sans nom ni lien : les noms ont été relevés sur les logos eux-mêmes.

Le champ `url` n'est renseigné que pour les sites vérifiés — un partenaire sans
URL s'affiche sans lien. **Ne pas ajouter d'URL sans l'avoir ouverte.** Les
adresses des hippodromes de Reims et de La Capelle, du Conseil des Chevaux
Hauts-de-France, de Karisma Consulting, d'Equi-libre, des sociétés de courses
de Strasbourg et de Saint-Galmier restent à confirmer auprès de l'association.

La page Arqana Trot de l'ancien site n'a pas été reprise telle quelle : son
contenu se limitait à une présentation et au calendrier des ventes 2025,
devenu obsolète. Arqana Trot figure parmi les partenaires, avec un lien vers
son site.
