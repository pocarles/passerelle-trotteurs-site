# Porte E — relevé du moteur de base de données

**Statut : `[À PROUVER]` — GABARIT, aucune preuve collectée à ce jour.**
Ce fichier devient la preuve de la porte E une fois rempli depuis la
production, daté et signé. Collecte : `scripts/evidence/collect-db-evidence.sql`
(lecture seule).

Date du relevé : ………………
Opérateur : ………………
Méthode : shell o2switch `mysql --batch` / phpMyAdmin (rayer la mention inutile)

## 1. Moteur et version

| Élément | Valeur relevée |
|---|---|
| `VERSION()` | ………………ex. `10.6.22-MariaDB` ou `8.0.42`……………… |
| `@@version_comment` | ……………… |

**Conséquence sur l'image cible** (plan §2, « Corrections de version ») :

- source MySQL → cible **MySQL 8.4 LTS** ;
- source MariaDB → cible **MariaDB 10.11 LTS**.

Image cible retenue : ………………
Écart de version source→cible (contrainte de rollback, plan §8.3) : ………………

## 2. Variables serveur à reprendre à l'identique

| Variable | Valeur source | Reprise sur la cible |
|---|---|---|
| `character_set_server` | ……… | ☐ |
| `collation_server` | ……… | ☐ |
| `sql_mode` | ……… | ☐ |
| `lower_case_table_names` | ……… | ☐ **fixée à l'initialisation, non modifiable ensuite (MySQL 8)** |
| `time_zone` | ……… | ☐ |

## 3. Moteurs par table

| ENGINE | ROW_FORMAT | Nombre |
|---|---|---:|
| ……… | ……… | ……… |

Tables non-InnoDB (chacune invalide `--single-transaction` et se traite à
part, annexe A.1) :

- ……… *(ou : « aucune » — constat positif)*

## 4. Objets SQL

| Objet | Nombre |
|---|---:|
| Triggers | ……… |
| Vues | ……… |
| Routines | ……… |
| Events | ……… |

Si > 0 : confirmer que la commande de dump figée (annexe A.1) les couvre
(`--routines --triggers --events`). GTID actif ? ……… → si oui (MySQL
uniquement), ajouter `--set-gtid-purged=OFF`.

## 5. Volumétrie (sanitisée)

| Élément | Valeur |
|---|---:|
| Nombre de tables | ……… |
| Taille données + index (MiB) | ……… |

## Verdict de porte

- [ ] Couple moteur/version enregistré ; image cible arrêtée.
- [ ] `lower_case_table_names` relevé et reporté dans la configuration cible.
- [ ] Tables non-InnoDB : aucune, ou plan de traitement écrit.
- [ ] Objets SQL couverts par la commande de dump figée.
- [ ] Bac à sable de rollback (§8.3) épinglé à la version source exacte : ………

Porte E franchie : OUI / NON — Signature : ……………… Date : ………………
