# Passerelle — site public

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

| Réglage | Valeur |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20 ou plus |

Le domaine `www.passerelle-trotteurs.fr` est actuellement servi par AWS
CloudFront et sa zone DNS est gérée chez OVH. Le basculement du domaine
nécessite d'abord la récupération du compte OVH — voir l'audit de propriété
de la plateforme.

## À faire

- [ ] Pages intérieures : association, valeurs, équipe, réseau, confier,
      adopter, protection, actualités, contact
- [ ] Chevaux à l'adoption sur le site (aujourd'hui hébergés dans un groupe
      Facebook)
- [ ] Version anglaise
- [ ] Photographies haute définition
