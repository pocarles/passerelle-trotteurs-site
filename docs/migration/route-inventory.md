# Porte C — inventaire des routes custom

**Statut : `[À PROUVER]` — GABARIT, aucune preuve collectée à ce jour.**
Ce fichier devient la preuve de la porte C une fois rempli, sanitisé, daté et
signé. L'audit du 23 juillet 2026 recense **deux** routes custom
volontairement publiques : les deux doivent figurer nommément ici.

Date du relevé : ………………
Opérateur : ………………
Collecte : `scripts/evidence/collect-route-inventory.sh` (statique, lecture
seule), puis `scripts/evidence/probe-public-routes.sh` (matrice HTTP,
**après** classification des effets de bord).

## 1. Inventaire exhaustif des routes custom

Une ligne par route déclarée dans les `*.routing.yml` des 15 modules custom.
Aucune route omise, y compris les routes authentifiées : l'exhaustivité est
la preuve.

| Module | Route (nom machine) | Chemin | Exigence d'accès (`requirements`) | Objet | Données renvoyées | Effets de bord | Anonyme volontaire ? |
|---|---|---|---|---|---|---|---|
| ……… | ……… | ……… | ……… | ……… | ……… | aucun / écriture d'état / e-mail / appel externe | oui / non / à restreindre |

## 2. Routes en accès anonyme (`_access: 'TRUE'` ou équivalent)

| Chemin | Effet de bord | Donnée personnelle exposée ? | Verdict |
|---|---|---|---|
| `/cdw/relance-setf/run` | e-mail + état (à confirmer, porte D) | ……… | conservée mais fermée par Traefik au cutover (plan §7.4) |
| ………*(seconde route de l'audit)*……… | ……… | ……… | ……… |

**Règle bloquante (plan, porte C) :** toute route renvoyant des données
personnelles en anonyme bloque le cutover jusqu'à restriction.

## 3. Matrice de statuts HTTP non authentifiés

Sondée le ……………… depuis ……………… avec `probe-public-routes.sh`.
Routes à effet de bord **exclues de la sonde** (statut attendu documenté
depuis le code, pas depuis une requête réelle).

| Chemin | Statut attendu | Statut observé | Conforme |
|---|---|---|---|
| ……… | ……… | ……… | ☐ |
| `/cdw/relance-setf/run` | 200 (constaté le 25/07, porte D) | **non sondée — interdite** | — |

## 4. Recoupement cron (P0-9)

- `hook_cron` custom détectés : ………
- Entrées cron cPanel recensées (toutes, pas seulement SETF) : ………
- `automated_cron` actif ? ………

## Verdict de porte

- [ ] Les 15 modules balayés ; toutes les routes listées.
- [ ] La seconde route publique de l'audit identifiée et nommée.
- [ ] Chaque route anonyme classée : objet, données, effets de bord, intention.
- [ ] Matrice HTTP produite sans avoir sondé aucune route à effet de bord.
- [ ] Aucune route anonyme n'expose de donnée personnelle — ou restriction
      faite avant cutover.

Porte C franchie : OUI / NON — Signature : ……………… Date : ………………
