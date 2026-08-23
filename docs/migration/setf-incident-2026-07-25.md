# Porte D — incident SETF du 25 juillet 2026

**Statut : `[À PROUVER]` — GABARIT, aucune preuve collectée à ce jour.**
Fait établi (`[VÉRIFIÉ]`, plan §1 Porte D) : une requête GET unique a atteint
`/cdw/relance-setf/run` vers **06:18 UTC le 25 juillet 2026** (08:18 heure
serveur), réponse HTTP 200. Ce fichier tranche les trois questions de la
porte. Collecte : `scripts/evidence/collect-setf-evidence.sh` (lecture seule —
la route n'est jamais rappelée).

Date de l'analyse : ………………
Opérateur : ………………

## Question 1 — des e-mails ont-ils été envoyés, et à qui ?

Sources : cPanel Track Delivery (08:00–09:00 heure serveur), table `watchdog`
(fenêtre epoch 1784959200–1784961600).

Réponse : OUI / NON
Nombre de messages : ………
Catégories de destinataires (jamais les adresses en clair) : ………

Extraits de logs horodatés (sanitisés) :

```
………
```

## Question 2 — la route a-t-elle muté un état ?

Sources : lecture du contrôleur du module, relevé `key_value`
(collection `state`, motifs `%setf%`, `%relance%`, `%cdw%`).

Écritures d'état identifiées dans le code (fichier:ligne) : ………
Valeur(s) d'état relevée(s) en base, brutes : ………
Horodatage « dernière relance » cohérent avec 06:18 UTC le 25/07 ? ………

Réponse : OUI / NON — la route écrit : ………

## Question 3 — cet état supprime-t-il une relance légitime future ?

C'est la question du préjudice métier silencieux : si le passage du 25/07 a
avancé l'horodatage, la relance qui aurait dû partir au prochain tick peut
être considérée comme déjà faite.

Logique de sélection des destinataires (fichier:ligne) : ………
La relance sautée concernerait : ………
Correction nécessaire avant cutover ? OUI / NON — laquelle : ………

## Idempotence et chemins de déclenchement (P0-9)

- La logique SETF s'exécute via : contrôleur seul / `hook_cron` seul / les deux.
- Deux exécutions rapprochées produisent : le même résultat / un double envoi.
- Preuve (fichier:ligne) : ………

## Conséquences pour le plan

- [ ] Verdict reporté dans la porte de validation finale (§10).
- [ ] Si état muté : décision écrite — rejouer, corriger l'état, ou accepter,
      avec justification.
- [ ] Le timer VPS (plan §2, « Cron SETF ») configuré en cohérence avec la
      logique d'idempotence constatée ici.

Porte D franchie : OUI / NON — Signature : ……………… Date : ………………
