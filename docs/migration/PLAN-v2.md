# Plan de préparation et de migration de l'intranet Drupal — v2

**Version 2 — 25 juillet 2026.** Révision complète après audit indépendant.
Remplace la v1, dont le fichier `PLAN.md` n'a jamais été committé dans ce
dépôt : pour la comparaison, se reporter au journal des corrections de
l'annexe C et à la revue indépendante ([REVIEW-2026-07-25.md](REVIEW-2026-07-25.md)).

---

## 0. Mode d'emploi

### Convention de statut

Chaque affirmation technique porte un marqueur. Aucun marqueur ne peut être
promu sans la preuve indiquée.

- `[VÉRIFIÉ]` — observé lors d'un audit en lecture seule, avec date.
- `[À PROUVER]` — hypothèse raisonnable, non encore démontrée. Bloque tant que
  la preuve n'existe pas.
- `[CHOIX]` — décision de conception. Réversible, mais ne doit pas être
  modifiée en cours d'exécution sans repasser par une répétition.

### Ce qui a changé par rapport à la v1

La v1 avait la bonne architecture et la bonne doctrine (parité d'abord,
deux répétitions, image construite hors VPS, isolation par cgroups). Neuf
défauts bloquants ont été corrigés :

1. le DNS était modifié **avant** que le certificat TLS soit prouvé ;
2. le mode maintenance Drupal était traité comme une barrière d'écriture ;
3. le rollback après écritures reposait sur un « delta » qui n'existe pas ;
4. les plafonds étaient par conteneur, sans plafond global de projet ;
5. Drupal rejoignait le réseau `proxy` partagé ;
6. la seconde route publique custom n'était pas identifiée ;
7. l'accès DNS OVH — requis pour le cutover **et** le rollback — n'était pas
   une porte bloquante ;
8. la continuité de l'accès technique o2switch était supposée ;
9. l'inventaire cron ne couvrait qu'une seule tâche.

Le détail complet figure en **annexe C**.

---

## 1. Portes bloquantes

Aucune répétition, aucun transfert de données et aucun cutover ne commence
avant que ces cinq portes soient franchies. Chacune produit un artefact de
preuve daté et signé.

### Porte A — Accès DNS OVH, par les deux propriétaires

`[À PROUVER]` L'audit du 23 juillet 2026 enregistre OVH comme **« aucun accès
authentifié — bloquant »**. Or le cutover **et** le rollback passent tous deux
par une modification de zone.

- Pierre-Olivier et Méline obtiennent chacun un accès OVH **distinct**, pas un
  identifiant partagé.
- Chacun crée puis supprime un enregistrement TXT de test, seul.
- On mesure et on consigne le délai réel entre décision et propagation.

**Preuve :** journal daté des deux manipulations, avec durée mesurée.
**Sans cette porte, le rollback n'a pas de durée bornée. Le cutover est
interdit.**

### Porte B — Continuité de l'accès technique o2switch

`[À PROUVER]` L'audit relève : 2FA **désactivée**, e-mail de récupération
**absent**, identifiant partagé provenant d'un tiers, et deux identités FTP
déléguées aux racines larges dont les mots de passe sont inconnus.

- Confirmation écrite du titulaire du contrat que l'accès technique reste
  disponible jusqu'à une date ≥ cutover + 14 jours.
- Activation de la 2FA cPanel et d'un contact de récupération contrôlé par
  Passerelle.
- Suspension ou rotation des identités FTP déléguées pendant toute la période
  de gel.
- Empreinte SHA-256 de l'état fichiers + base au T-0, pour détecter toute
  modification par un tiers pendant la fenêtre de rollback.

**Preuve :** confirmation écrite archivée ; page sécurité cPanel montrant 2FA
active et contact de récupération ; liste FTP avant/après ; manifeste T-0.

### Porte C — Inventaire des routes publiques

`[À PROUVER]` L'audit mentionne **deux** routes custom volontairement publiques,
plus la tâche de relance. La v1 n'en traitait qu'une.

- Recenser dans les 15 modules custom toute route déclarée avec
  `_access: 'TRUE'` (ou équivalent) dans les `*.routing.yml`.
- Pour chacune : objet, données renvoyées, effets de bord, accès anonyme
  volontaire ou non.
- Toute route renvoyant des données personnelles en anonyme bloque le cutover
  jusqu'à restriction.

**Preuve :** tableau d'inventaire committé (sanitizé) + matrice de statuts HTTP
obtenus sans authentification.

### Porte D — Incident SETF du 25 juillet 2026

`[VÉRIFIÉ]` Une requête GET unique a atteint `/cdw/relance-setf/run` vers
06:18 UTC le 25 juillet 2026, réponse HTTP 200.

Trois questions, pas une seule :

1. des e-mails ont-ils été envoyés, et à qui ?
2. la route a-t-elle **muté un état** (horodatage « dernière relance »,
   compteur, drapeau) ?
3. si oui, cet état **supprime-t-il une relance légitime future** ?

La v1 ne posait que la première. La troisième est celle qui peut causer un
préjudice métier silencieux.

- Inspecter les logs Drupal (`watchdog`), les logs cPanel et les traces mail
  autour de l'horodatage.
- Lire le code du module pour établir son idempotence et ses écritures d'état.

**Preuve :** note écrite répondant aux trois questions, avec extraits de logs
horodatés.

### Porte E — Identité exacte du moteur de base de données

`[À PROUVER]` Le moteur et la version ne sont pas encore enregistrés. C'est ce
couple qui détermine l'image cible **et** la faisabilité du rollback.

Relever, avant tout choix d'image :

```sql
SELECT VERSION(), @@version_comment;
SHOW VARIABLES LIKE 'character_set_server';
SHOW VARIABLES LIKE 'collation_server';
SHOW VARIABLES LIKE 'sql_mode';
SHOW VARIABLES LIKE 'lower_case_table_names';
SHOW VARIABLES LIKE 'time_zone';

SELECT ENGINE, ROW_FORMAT, COUNT(*)
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
GROUP BY ENGINE, ROW_FORMAT;

SELECT COUNT(*) FROM information_schema.TRIGGERS  WHERE TRIGGER_SCHEMA = DATABASE();
SELECT COUNT(*) FROM information_schema.VIEWS     WHERE TABLE_SCHEMA   = DATABASE();
SELECT COUNT(*) FROM information_schema.ROUTINES  WHERE ROUTINE_SCHEMA = DATABASE();
SELECT COUNT(*) FROM information_schema.EVENTS    WHERE EVENT_SCHEMA   = DATABASE();
```

Deux pièges à vérifier explicitement :

- `lower_case_table_names` **ne peut plus être changé après initialisation**
  sous MySQL 8. Une divergence source/cible casse la résolution des tables.
- toute table MyISAM rend `--single-transaction` incohérent et doit être
  traitée à part.

**Preuve :** relevé committé dans `docs/migration/db-evidence.md`.

---

## 2. Architecture et décisions arrêtées

### Objectif

Migrer l'intranet Drupal d'o2switch vers le VPS `srv951662`, sans toucher au
site public hébergé sur Codex Sites, et sans dégrader les 23 conteneurs déjà
en production sur le VPS.

Au moment du cutover, il ne doit rester que le dernier delta de données, la
validation finale et la bascule DNS.

### État observé du VPS

`[VÉRIFIÉ]` — 25 juillet 2026 :

| Élément | Valeur |
|---|---|
| Hôte | `srv951662.hstgr.cloud`, Ubuntu 24.04, noyau 6.8.0-117 |
| CPU / RAM | 8 vCPU · 31 GiB (≈ 20 GiB disponibles) |
| Disque | ext4 unique, ≈ 196 GiB libres, 50 % d'occupation |
| Swap | 4 GiB, ≈ 2,1 GiB utilisés |
| Docker | 29.6.1, overlay2, cgroups v2 pilote systemd |
| Compose | 5.3.1 |
| Ingress | Traefik 3.7.7, `exposedByDefault=false`, socket proxy restreint |
| Sécurité | AppArmor + seccomp par défaut, UFW actif, SSH via Tailscale |
| Charges | 23 conteneurs applicatifs |
| `live_restore` | **false** — un redémarrage du démon arrête tout |

Historique de pression mémoire : quatre conteneurs sans lien avec Passerelle
concentrent l'essentiel du swap. Leur identité est tenue hors dépôt et relevée
par la capture de baseline. C'est la raison pour laquelle
Passerelle se voit **interdire le swap**, et non simplement en limiter l'usage.

### Décisions

| Décision | Statut |
|---|---|
| VPS cible `srv951662.hstgr.cloud` | `[CHOIX]` confirmé |
| Projet Compose isolé, plafonds cgroup **et tranche systemd globale** | `[CHOIX]` |
| Staging accessible uniquement par Tailscale (`serve`, jamais `funnel`) | `[CHOIX]` |
| Fenêtre de maintenance maximale : 2 h, horloge de décision à T+45 min | `[CHOIX]` |
| Parité fonctionnelle stricte, sauf correctif de sécurité 11.2.14 | `[CHOIX]` |
| RPO 24 h en catastrophe → **resserré à 6 h** ; zéro perte au cutover | `[CHOIX]` |
| Nom de production conservé : `intranet.passerelle-trotteurs.fr` | `[CHOIX]` |
| Aucun port public de base, aucun socket Docker, aucun conteneur privilégié | `[CHOIX]` |
| Image construite hors VPS, publiée sur GHCR, déployée **par digest** | `[CHOIX]` |
| SMTP : Brevo au nom de Passerelle, **sous réserve de la porte volumétrie** | `[CHOIX]` |
| Sauvegarde : Restic chiffré vers OVH Object Storage, région UE | `[CHOIX]` |
| Propriétaires : Pierre-Olivier et Méline, identifiants distincts | `[CHOIX]` |

### Corrections de version imposées par l'audit

| Sujet | v1 | v2 | Raison |
|---|---|---|---|
| Base MySQL | MySQL 8.0 | **MySQL 8.4 LTS** | MySQL 8.0 est en fin de vie depuis le 30 avril 2026 |
| Base MariaDB | MariaDB 10.11 | **MariaDB 10.11 LTS** (inchangé) | Supportée jusqu'en février 2028 ; recommandée pour Drupal 12 |
| PHP | 8.3 | **8.3** (inchangé) | Plancher Drupal 11, supporté en sécurité jusqu'au 31 déc. 2027 |
| Drupal | 11.2.2, aucune mise à jour | **11.2.14 avant cutover** | La branche 11.2 a perdu son support le 29 juin 2026 ; 11.2.14 est la dernière livraison de la branche |

`[VÉRIFIÉ]` Drupal 11.2.2 accuse une douzaine de correctifs de retard. Le
passage à **11.2.14** est un correctif de niveau patch, dans la même version
mineure : c'est la classe de changement la moins risquée, et elle ferme les
CVE connues avant d'exposer l'application sur un hôte mutualisé. Le passage à
**11.4.x** (branche supportée) reste une livraison distincte, sous 60 jours.

À évaluer explicitement : **SA-CORE-2026-005** (CVE-2026-55803, critique) exige
JSON:API en écriture **et** un champ de type référence stockant une propriété
sérialisée. Aucun champ du cœur ne remplit ce critère — mais le projet contient
un module custom « références ». Cela se vérifie, cela ne se suppose pas.

`[VÉRIFIÉ]` SA-CORE-2026-004 (hautement critique) ne concerne que PostgreSQL :
sans objet ici.

### Interfaces conservées ou modifiées

- Aucun changement d'URL ni d'API métier.
- Le `A` de `intranet` passe de `109.234.166.78` à `148.230.94.19`.
- Aucun `AAAA` créé au premier déploiement.
- MX et autres services OVH intouchés. **Gel de zone** de T-48 h à T+72 h.
- Relais e-mail : Mailjet/PHP mail → Brevo SMTP.
- Cron SETF : cPanel → timer dédié sur le VPS, sans recouvrement.
- La route publique SETF est **conservée** pour la parité, mais **fermée à
  l'extérieur** par un middleware Traefik dès le cutover. Son remplacement par
  une commande Drush interne reste une livraison distincte.

---

## 3. Architecture de déploiement

### 3.1 Confinement global : la tranche systemd

C'est la correction la plus importante de la v2. Des plafonds par conteneur ne
bornent pas un projet : ils bornent un conteneur. Trois projets Compose
simultanés (production, staging, test de restauration) demandaient en v1
**8,5 vCPU sur un hôte qui en compte 8**.

`/etc/systemd/system/passerelle.slice` :

```ini
[Unit]
Description=Passerelle Trotteurs containment slice
Before=slices.target

[Slice]
CPUAccounting=yes
MemoryAccounting=yes
IOAccounting=yes
CPUQuota=300%
MemoryMax=6G
MemorySwapMax=0
```

Puis, sur **chaque** service de **chacun** des trois projets Compose :

```yaml
services:
  drupal:
    cgroup_parent: passerelle.slice
```

Effet : quel que soit le nombre de projets démarrés, Passerelle ne peut pas
dépasser **3,0 vCPU et 6 GiB**. Le noyau applique la limite ; ce n'est plus une
promesse de document.

**Règle d'exploitation :** au maximum **deux** projets Passerelle simultanés.
La production est prioritaire. Le test de restauration exige l'arrêt préalable
du staging.

### 3.2 Plafonds par service

| Projet | Service | CPU | RAM | Swap | PIDs |
|---|---|---:|---:|---:|---:|
| prod | Drupal/Apache | 1,5 | 1,5 GiB | interdit | 256 |
| prod | Base de données | 1,0 | 1,5 GiB | interdit | 256 |
| prod | Cron | 0,25 | 384 MiB | interdit | 128 |
| prod | Backup Restic | 0,25 | 512 MiB | interdit | 64 |
| staging | Drupal | 0,75 | 1,0 GiB | interdit | 128 |
| staging | Base de données | 0,5 | 768 MiB | interdit | 128 |
| restore-test | Drupal | 0,5 | 768 MiB | interdit | 128 |
| restore-test | Base de données | 0,5 | 768 MiB | interdit | 128 |

Clés Compose à utiliser (`cpus`, `mem_limit`, `memswap_limit`, `pids_limit`) :
elles sont appliquées par `docker compose up` hors mode swarm. `memswap_limit`
est le plafond **mémoire + swap cumulé** : l'égaler à `mem_limit` interdit
effectivement le swap. La v1 avait raison sur ce point.

`[À PROUVER]` Docker 29.6.1 et Compose 5.3.1 sont postérieurs à toute
documentation consultable avec certitude. **On ne fait pas confiance à la
documentation : on relit les valeurs effectives** après démarrage.

```bash
cat /sys/fs/cgroup/passerelle.slice/cpu.max
cat /sys/fs/cgroup/passerelle.slice/memory.max
cat /sys/fs/cgroup/passerelle.slice/memory.swap.max
systemd-cgls /passerelle.slice
```

### 3.3 Réseau : ne pas rejoindre `proxy`

La v1 attachait le conteneur web au réseau `proxy` partagé. Un réseau bridge
Docker n'applique aucune politique entre ses membres : Drupal aurait joint
tous les autres conteneurs du réseau, bases de données applicatives comprises.
Combiné à un Drupal en
fin de branche, c'est le principal chemin de compromission latérale de l'hôte —
et aucun plafond cgroup ne l'atténue.

```bash
docker network create passerelle-edge
docker network connect passerelle-edge traefik   # à chaud, sans redémarrage
```

Étiquette sur le conteneur web :

```yaml
labels:
  - "traefik.docker.network=passerelle-edge"
```

Drupal n'a alors qu'un seul voisin joignable : Traefik.

**À vérifier avant :** que le socket proxy Docker **n'est pas** membre de
`proxy` (`docker network inspect proxy`). S'il l'est, c'est un problème de
sécurité qui dépasse ce projet et doit être remonté.

### 3.4 Disque : plafond réel, pas seulement une alerte

La v1 constatait l'absence de quota et se rabattait sur des alertes. Une alerte
détecte, elle n'empêche pas. Un fichier image en boucle donne un plafond dur
sans repartitionner ni redémarrer :

```bash
fallocate -l 20G /var/lib/passerelle.img
mkfs.ext4 -m 0 /var/lib/passerelle.img
mkdir -p /srv/passerelle-intranet
mount -o loop,noatime /var/lib/passerelle.img /srv/passerelle-intranet
# /etc/fstab :
# /var/lib/passerelle.img /srv/passerelle-intranet ext4 loop,noatime 0 2
```

Y placer : fichiers publics, fichiers privés, données de base, sauvegardes
locales. Un débordement produit `ENOSPC` **dans l'image**, jamais sur la racine
partagée.

Les logs Docker `json-file` restent sous `/var/lib/docker` : le plafond
`10m × 3` par conteneur reste nécessaire (≈ 120 MiB au total).

### 3.5 E/S : les poids sont probablement inertes

`[À PROUVER]` Un poids `blkio` est proportionnel, pas un plafond, et sous
cgroups v2 il n'a d'effet qu'avec un ordonnanceur qui le gère (BFQ). Sous
`mq-deadline` ou `none`, la mesure de la v1 ne fait probablement **rien**.

```bash
cat /sys/block/<dev>/queue/scheduler   # constater l'ordonnanceur réel
```

Préférer des plafonds durs :

```yaml
blkio_config:
  device_write_bps:
    - path: /dev/sda
      rate: '20mb'
  device_read_bps:
    - path: /dev/sda
      rate: '40mb'
```

et relire `io.max` dans le cgroup pour confirmer. `nice` reste valable pour le
CPU des sauvegardes en toutes circonstances.

### 3.6 Image applicative

```
FROM composer:2 AS build     # étape de dépendances
FROM php:8.3-apache          # étape d'exécution
```

- **Construction `--platform linux/amd64` obligatoire.** Le Mac Apple Silicon
  produit de l'arm64 par défaut ; le VPS est amd64. Le symptôme serait
  `exec format error`, au cutover. Runner GitHub Actions amd64 recommandé.
- installation `--no-dev --prefer-dist`, à partir du `composer.lock` exact ;
- `--classmap-authoritative` autorisé **uniquement** si la suite fonctionnelle
  complète passe. Repli documenté : `--optimize-autoloader` ;
- OPcache activé, `opcache.validate_timestamps=0` (code immuable) ;
- `display_errors` désactivé, logs vers stdout/stderr ;
- aucun secret, aucune donnée de production dans les couches ;
- scan de vulnérabilités + SBOM ;
- publication GHCR, déploiement **par digest**.

**Concurrence Apache/PHP — le défaut le plus concret de la v1.** Un plafond de
1,5 GiB était posé sans que l'application soit configurée pour le respecter.
`php:8.3-apache` utilise mpm_prefork + mod_php, dont le défaut Debian est
`MaxRequestWorkers 150`. À `memory_limit 256M`, cela représente une demande de
~37 GiB contre un plafond de 1,5 GiB : le premier pic de trafic tue le
conteneur.

Dimensionnement au plafond — réserver ~200 MiB pour le parent et 128 MiB
d'OPcache, soit ~1,15 GiB pour les workers :

```apache
<IfModule mpm_prefork_module>
    StartServers            2
    MinSpareServers         2
    MaxSpareServers         4
    ServerLimit             8
    MaxRequestWorkers       8
    MaxConnectionsPerChild  200
</IfModule>
```

```ini
memory_limit = 192M
opcache.memory_consumption = 128
opcache.validate_timestamps = 0
```

Variante préférable : mpm_event + php-fpm avec `pm = static` et
`pm.max_children = 8`. La surcharge est alors mise en file et répond 503 au
lieu de provoquer un OOM.

**Système de fichiers racine en lecture seule** — compatible, à condition
d'énumérer les tmpfs :

```yaml
read_only: true
tmpfs:
  - /tmp:size=128m
  - /run:size=16m
  - /var/run/apache2:size=8m
  - /var/lock/apache2:size=8m
```

### 3.7 Base de données : dimensionner pour 1,5 GiB

MySQL 8.4 démarre avec `performance_schema` actif, ce qui consomme plusieurs
centaines de MiB au repos. Dans un plafond de 1,5 GiB, cela se règle
explicitement :

```ini
[mysqld]
innodb_buffer_pool_size = 512M      # la base fait ~300 MB : elle tient en cache
innodb_log_file_size    = 128M
performance_schema      = OFF       # MySQL 8.4 ; MariaDB l'a déjà off
max_connections         = 20        # 8 workers PHP + marge
table_open_cache        = 400
tmp_table_size          = 32M
max_heap_table_size     = 32M
max_allowed_packet      = 64M
```

`lower_case_table_names` doit **reprendre la valeur de la source** (porte E) et
être fixé à l'initialisation.

### 3.8 Reverse proxy — absent de la v1

Sans ce contrat, les IP clientes sont fausses dans `watchdog`, le contrôle de
flood bloque le proxy au lieu de l'attaquant, et toute règle IP des modules
d'accès custom se comporte mal.

```php
$settings['reverse_proxy'] = TRUE;
// CIDR du réseau, pas une IP de conteneur : elle change à chaque recréation
$settings['reverse_proxy_addresses'] = ['172.x.x.0/16'];
$settings['trusted_host_patterns'] = ['^intranet\.passerelle\-trotteurs\.fr$'];
```

Staging : même contrat, avec le motif `*.ts.net` et le proxy loopback.

### 3.9 Secrets

`/etc/passerelle-intranet/secrets`, propriétaire root, mode `0700`. Les
conteneurs lisent des **fichiers montés**, pas des variables d'environnement :
une valeur en variable réapparaît dans `docker inspect` et dans les logs. Le
jeton GHCR est limité à `read:packages`.

---

## 4. Informations et contenus à collecter

Chaque élément reçoit un statut `collecté` / `vérifié` / `restauré` /
`bloquant`, un propriétaire, une date, un emplacement et une classification de
confidentialité.

### 4.1 Accès et propriété

Identique à la v1, avec ces ajouts issus des portes A et B :

- accès OVH **nominatif** pour les deux propriétaires, testé par chacun ;
- confirmation écrite de continuité d'accès o2switch jusqu'à cutover + 14 j ;
- 2FA cPanel et contact de récupération contrôlé par Passerelle ;
- inventaire et neutralisation des identités FTP déléguées ;
- identifiant GitHub exact de Méline ; accès Tailscale de Méline ;
- accès GHCR en lecture depuis le VPS ;
- compte Brevo Passerelle ; compte OVH Public Cloud et bucket ;
- emplacement approuvé dans le gestionnaire de mots de passe ;
- identité des deux personnes habilitées à déclencher, valider ou annuler.

Le portail commercial o2switch de Thierry n'est pas requis, tant que l'accès
technique reste disponible jusqu'à la fin de la période de rollback.

### 4.2 Code et dépendances

Depuis le projet Composer complet : `composer.json`, `composer.lock`, scripts,
patches, dépôts personnalisés, 15 modules custom, thème `trotteurs`, profils,
bibliothèques, listes exactes des modules et thèmes activés, versions Drupal /
PHP / Composer / Drush / extensions PHP, patches appliqués dans `vendor` ou
`core`, symlinks, propriétaires, permissions, SHA-256 et volumétrie de
l'archive, résultats de `composer validate`, `composer audit` et scan de
secrets.

**Ajouts v2 :**

- **tous les `.htaccess` depuis la racine du compte jusqu'au docroot.** Le
  docroot est `…/intranet/www/web` : le répertoire `www/` intermédiaire et la
  racine du compte portent très probablement des réécritures, redirections ou
  règles d'accès qui font partie du comportement en production. La v1 ne
  collectait que celui de `web/`.
- **surcharges PHP au niveau cPanel** : MultiPHP INI Editor, `.user.ini`. Elles
  modifient le runtime effectif et sont invisibles dans le projet Composer.

`vendor`, le cœur et les modules contrib sont reconstruits depuis
`composer.lock`. Une copie chiffrée complète de secours est néanmoins conservée
hors Git.

### 4.3 Configuration Drupal

`settings.php` (hors Git), hash salt, chemins publics/privés/temporaires,
configuration base de données, reverse proxy et trusted hosts, cache, session,
cookies, erreurs, langue, fuseau, formats de date, configuration e-mail réelle,
configuration du cron, variables d'environnement, configuration active en base,
export `drush config:export` produit **depuis un clone**, valeurs de `state` et
`key_value` non couvertes par l'export YAML, rapport `drush status`.

**Ajouts v2 :**

- **matériel de chiffrement** : les modules `key`, `encrypt`, `real_aes` ou
  équivalents sont-ils actifs ? Où vit la clé (fichier, environnement, service
  externe) ? Comment est-elle transportée ? Si un champ ou un document est
  chiffré, migrer code + base + fichiers **sans la clé** est une perte de
  données définitive et silencieuse, découverte des mois plus tard. Si aucun
  chiffrement n'est utilisé, l'écrire comme un constat positif.
- **invariant hash salt** : la valeur de production doit être reprise
  **à l'octet près**. La régénérer déconnecte tous les utilisateurs et invalide
  les liens de connexion à usage unique. Le staging utilise au contraire un
  salt **différent**, par défense en profondeur.
- `state` à relever nommément : `system.cron_last` et tout état « dernière
  relance » du module SETF.

### 4.4 Base de données

Le relevé de la porte E, plus : nom de base et utilisateur applicatif (secrets
exclus du rapport), taille, nombre de tables et d'enregistrements, tables de
sessions/queues/cache/watchdog, nombre d'enregistrements par table,
utilisateurs par statut et rôle, contenus par type et statut, nombre de
fichiers, médias, structures, chevaux, propriétaires, adoptants, actualités,
ressources et documents, dates min/max de modification métier, dump cohérent
compressé chiffré avec son SHA-256.

**La base est une source de configuration authoritative : un export du code
seul ne permet pas de reconstruire l'application.** C'est l'observation la plus
importante de la v1 et elle est exacte.

### 4.5 Fichiers et documents

`web/sites/default/files`, répertoire privé hors webroot, traductions,
`.htaccess` des répertoires de fichiers, liste chemins/tailles/dates/SHA-256,
volumétrie publique et privée, fichiers référencés mais manquants, fichiers
orphelins, noms accentués ou inhabituels, permissions et propriétaires requis,
taille maximale d'upload et types autorisés.

**Ajout v2 — correspondance uid/gid.** Le conteneur tourne en `www-data`
(uid 33 dans les images Debian PHP). La v1 créait un utilisateur système dédié
sans jamais réconcilier les deux. Sans cela, Drupal ne peut pas écrire les
uploads, ou les fichiers privés deviennent illisibles — constaté en plein
cutover.

```bash
chown -R 33:33 /srv/passerelle-intranet/public-files
chown -R 33:33 /srv/passerelle-intranet/private-files
```

Ne pas migrer les caches, fichiers temporaires ou artefacts reconstructibles.

### 4.6 Modèle fonctionnel et contenu

Inventaire sanitizé : types de contenus et champs, taxonomies, médias, vues,
blocs, menus, routes, rôles et matrice de permissions, workflows, formulaires
d'inscription, propriétaires/adoptants/structures/chevaux, documents privés et
règles d'accès, cartes, géocodage, statistiques, filtres d'âge, rappels SETF,
redirections, e-mails d'inscription, batchs et queues, pages anonymes,
**toutes** les routes custom volontairement publiques (porte C), données
personnelles et catégories de sensibilité.

Le dépôt GitHub ne contient ni noms personnels issus de la base, ni listes
d'e-mails, ni documents privés.

### 4.7 Intégrations et e-mail

Transport actuel, adresses From/Reply-To/Return-Path, volumes habituels **et
maximums** quotidiens, destinataires et règles SETF, SPF/DKIM/DMARC/MX,
géocodage et cartographie, endpoints externes appelés par les modules custom,
clés API et rotations, URLs HelloAsso/Blagapro/Yapla encore utilisées,
webhooks entrants et sortants.

**Ajouts v2 :**

- pour **chaque** intégration, une assertion positive : en staging, elle frappe
  un sink, une clé de test, ou rien du tout. « Comportement de chaque
  intégration en staging » était un intitulé, pas un contrôle. Les webhooks
  sortants en particulier ont des effets réels sans laisser de trace e-mail ;
- les listes de suppression Mailjet **ne sont pas une porte** : le compte
  Mailjet est enregistré comme inaccessible dans l'audit.

Le staging redirige toutes les sorties e-mail vers un sink local. Aucun message
réel ne peut partir pendant les répétitions.

---

## 5. Préparation technique et répétitions

### Étape 1 — Espaces de travail sûrs

- Worktree propre depuis `main`, branche `codex/migration-readiness`.
  *(L'audit, la revue et le plan v2 ont été fusionnés dans `main` par la PR #1
  le 26 juillet 2026 ; la branche `agent/ownership-audit` n'est plus le point
  de départ.)*
- Ne pas travailler dans le répertoire courant contenant `public-site/`.
  *(La v1 mentionnait aussi `passerelle-site/` : ce répertoire n'existe pas.)*
- Exports sensibles hors du dépôt et hors de son arborescence.
- Chiffrement `age` ou Restic avant écriture disque.
- Clés de récupération dans le gestionnaire des deux propriétaires.

**Hygiène du dépôt — corrigée le 26 juillet 2026.** Le `.gitignore` ne couvrait
ni `tmp/` — qui existe déjà sous la forme `tmp/pdfs/` — ni `public-site/`, ni
les extensions d'export chiffré : un PDF privé déposé dans `tmp/pdfs/` était
committable. Corrigé dans `main` (commit `ed3a458`) par l'ajout de `tmp/`,
`public-site/`, des formats chiffrés (`*.age`, `*.gpg`, `*.asc`, `*.enc`), des
formats d'archive et de dump restants, et des documents et exports tabulaires
(`*.pdf`, `*.csv`, `*.xlsx`, `*.ods`, `*.docx`, `*.mbox`) refusés par défaut.

Vérifié par `git check-ignore` sur des fichiers synthétiques et par un
`git add -A` délibéré n'ayant indexé aucun d'entre eux.

Reste à faire :

- ajouter le nom réel du répertoire privé une fois connu — la règle générique
  `private/` peut ne pas le couvrir ;
- installer le hook de pre-commit qui scanne secrets et fichiers volumineux.

### Étape 2 — Capturer la production sans l'arrêter

- Clé SSH temporaire et nominative sur cPanel si nécessaire.
- Inventaire PHP, MySQL, cron, modules, routes, fichiers.
- Premier `rsync` du projet et des fichiers.
- Premier dump cohérent — **commande figée** (annexe A.1).
- Téléchargement d'un backup JetBackup complet indépendant.
- Chiffrement immédiat, manifestes et checksums.
- Révocation de la clé temporaire après validation.
- Ne modifier aucun utilisateur, rôle, contenu ou cron pendant la collecte.

**Ajout v2 — le backup JetBackup doit être ouvert.** 119 points de
restauration existent, aucun n'a jamais été restauré. Un téléchargement n'est
pas une sauvegarde. Extraire l'archive, importer le dump qu'elle contient dans
un bac à sable, comparer les comptages et un échantillon de checksums au
manifeste issu du `rsync`.

### Étape 3 — Construire le projet maintenable

Le dépôt contient : sources custom et fichiers Composer, Dockerfile
multi-stage, configurations Compose production et staging, configuration
PHP/Apache sans secrets, `.env.example` et contrat des secrets, export YAML
Drupal issu du clone, scripts de backup/restore/validation/cutover/rollback,
inventaire sanitizé, runbooks sous `docs/migration/`, manifeste de version et
checksums.

**Ajouts v2 :**

- l'export de configuration est stocké sous
  `docs/reference/config-snapshot/`, **pas** au chemin `config_sync_directory`.
  Placé au chemin de synchronisation, il devient un piège : un futur
  `drush cim` ramènerait la production à cet instantané ;
- il est **scanné et expurgé** avant commit. Les YAML de configuration portent
  couramment des identifiants (`smtp.settings.yml`, `key.*`, clés de géocodage
  ou reCAPTCHA) ;
- le runbook déclare explicitement que `config:import` ne fait partie d'aucune
  procédure de déploiement.

`drush config:export` depuis un clone est sûr : il écrit du YAML sur disque et
ne modifie pas la base. L'état de production n'est jamais touché.

### Étape 4 — Préparer le VPS

Créer : `/opt/passerelle-intranet` (Compose et runbooks),
`/srv/passerelle-intranet/{public-files,private-files}` **dans l'image en
boucle**, stockage dédié de la base, `/var/backups/passerelle-intranet` (deux
snapshots locaux au maximum), `/etc/passerelle-intranet/secrets` (root, 0700),
utilisateur système dédié sans sudo et hors groupe Docker.

Appliquer §3.1 à §3.5 : tranche systemd, plafonds, réseau `passerelle-edge`,
image disque en boucle, plafonds E/S.

Surveillance — la v1 énonçait des seuils sans système ni destinataire :

| Seuil | Alerte | Critique |
|---|---|---|
| Occupation Passerelle | 5 GiB | 10 GiB |
| Occupation filesystem | 70 % | 80 % |
| Arrêt du backup local | — | < 50 GiB libres |
| RAM disponible hôte | 10 GiB | 8 GiB |

**Le système émetteur, le canal et les destinataires doivent être nommés, et
une alerte de test doit parvenir aux deux propriétaires.** Un seuil sans
destinataire n'est pas une alerte.

**Sondes de santé — à définir littéralement :**

- sonde conteneur : `curl -f http://127.0.0.1:8080/healthz.txt` toutes les 30 s
  — fichier statique servi par Apache, sans démarrage PHP ;
- sonde externe : toutes les 5 min, une route Drupal légère effectuant une
  lecture base triviale ;
- **la route SETF est interdite comme sonde de santé.** À inscrire dans le
  fichier, pas seulement dans les intentions.

### Étape 5 — Staging privé

- Projet Compose `passerelle-staging`, volumes distincts, `cgroup_parent`
  identique.
- Port publié **uniquement sur loopback** — ce qui évite au passage le
  contournement d'UFW par Docker, puisqu'aucune règle DNAT externe n'est créée.
- Exposition par `tailscale serve --bg` sur un port dédié.
  **`tailscale funnel` est interdit** : il publierait le clone sur l'Internet
  ouvert. À inscrire comme interdiction dans le runbook.
- **ACL Tailscale** limitant le port de staging aux appareils des deux
  propriétaires. La v1 accordait un accès à Méline sans jamais borner qui
  d'autre est sur le tailnet — alors que le staging contient un clone complet
  de données personnelles réelles et de documents privés.
- Ne pas joindre le staging à Traefik public.
- Restaurer le premier dump et les fichiers.
- Générer l'export de configuration depuis cette base clonée.
- Remplacer l'e-mail par Mailpit ou équivalent.
- Désactiver les vraies clés externes ou utiliser des clés de test.
- Trusted hosts et reverse proxy de staging ; hash salt **différent**.
- Créer uniquement dans la base clonée les comptes de test nécessaires.
- `drush cache:rebuild`.

**Porte de mise à jour de base — la v1 était ambiguë.** « Vérifier les mises à
jour de base sans les appliquer si elles ne sont pas nécessaires » demande à
l'opérateur d'inventer une procédure sous pression. Avec un `composer.lock`
identique, le nombre de mises à jour en attente doit être **zéro** :

```bash
drush updatedb --dry-run
```

Zéro attendu. Une valeur non nulle signifie que la base source était déjà en
retard sur son propre code : c'est une condition préexistante à résoudre **sur
la source** avant de migrer. `drush updatedb` ne s'exécute **jamais** sur le
nouvel hôte pendant la fenêtre — le faire rendrait la base non restaurable en
arrière et tuerait le rollback.

Aucune mise à jour Drupal/contrib pendant la première répétition, **hormis le
passage à 11.2.14**, qui est répété comme les autres étapes.

### Étape 6 — Deux répétitions

**Première répétition :** mesurer transfert, restauration et warm-up ; tester
tous les workflows ; corriger scripts et documentation ; produire un rapport de
différences.

**Deuxième répétition :**

- repartir de volumes vierges ;
- n'utiliser que le runbook et les secrets documentés ;
- faire exécuter ou relire le runbook par une seconde personne ;
- chronométrer chaque étape ;
- simuler le cutover sans modifier le DNS ;
- simuler un rollback complet ;
- **répéter la restauration en sens inverse** (ajout v2, voir §7.3) ;
- prouver que l'ensemble tient largement dans les deux heures.

### Étape 7 — E-mail, DNS et sauvegardes

#### E-mail

**Porte de volumétrie, avant de confirmer Brevo.** `[VÉRIFIÉ]` L'offre gratuite
Brevo plafonne à **300 e-mails par jour, partagés entre transactionnel et
campagnes**. La v1 choisissait Brevo puis collectait les volumes. Si le pic
quotidien observé dépasse **250**, passer à une offre payante et enregistrer le
coût — cela ne se découvre pas au cutover.

- créer le compte Brevo au nom de Passerelle, utilisateur SMTP limité ;
- ajouter le DKIM Brevo ;
- **publier `_dmarc` avec `p=none; rua=…` AVANT le changement de relais.**
  Aucun DMARC n'existe aujourd'hui : sans lui, la transition n'est pas
  observable. Durcir seulement sur preuve ;
- étendre le SPF sans retirer Mailjet avant validation. Le `?all` actuel est
  neutre, donc faible ; le corriger est une livraison distincte ;
- inventorier tous les autres expéditeurs du domaine ;
- confirmer que les bounces vers `@passerelle-trotteurs.fr` arrivent dans une
  boîte OVH **effectivement relevée par quelqu'un de nommé** ;
- tester inscription, reset password, relance et bounce ;
- Pierre-Olivier et Méline comme contacts d'alerte ;
- ne supprimer DKIM/SPF Mailjet qu'après preuve qu'aucun autre service ne les
  utilise.

#### DNS

- exporter toute la zone OVH et **vérifier l'export restaurable**, pas
  seulement pris ;
- confirmer que `intranet` ne possède qu'un `A` ;
- conserver MX, SPF, DKIM et autres sous-domaines ;
- **vérifier les enregistrements CAA** (ajout v2) :

```bash
dig +short CAA passerelle-trotteurs.fr
dig +short CAA intranet.passerelle-trotteurs.fr
```

  Un CAA restrictif fait échouer **les deux** types de défi ACME, silencieusement ;

- réduire le TTL du `A` à 300 s, 48 h avant cutover. Le TTL actuel est de
  ~3 454 s : 48 h le couvre largement ;
- **toute répétition de certificat utilise le répertoire ACME *staging* de
  Let's Encrypt** (ajout v2). Répéter contre la production épuiserait la limite
  de certificats dupliqués et laisserait le projet bloqué au moment précis du
  cutover. La production ACME est utilisée **une seule fois**, au T-7 j ;
- **gel de zone écrit** de T-48 h à T+72 h, convenu avec la personne qui pilote
  la migration du site public vers Codex Sites : c'est la même zone OVH ;
- remettre le TTL à 3600 s après 72 h de stabilité.

#### Sauvegardes

- bucket OVH Object Storage privé, région UE, **créé avec Object Lock activé
  dès la création**. `[VÉRIFIÉ]` L'option `--object-lock-status enabled` ne
  peut **pas** être ajoutée après coup. La formulation « si disponible » de la
  v1 risquait de produire un bucket qu'on ne pourrait jamais rendre immuable.
  Le versioning est un prérequis ;
- **Restic sauvegarde un dump logique + les volumes de fichiers, jamais le
  répertoire de données MySQL vivant** (ajout v2). Un instantané du datadir en
  fonctionnement est incohérent, donc non restaurable — tout en rapportant un
  succès ;
- chiffrement côté client ;
- **le mot de passe du dépôt Restic et les identifiants S3 sont séquestrés
  hors serveur**, chez les deux propriétaires. Sinon, perdre le VPS revient à
  perdre les sauvegardes ;
- identifiants VPS limités pour qu'ils ne puissent pas supprimer d'objets
  verrouillés ;
- **4 dumps par jour → RPO 6 h** (au lieu de 24 h). La base fait ~300 Mo :
  le coût est négligeable et la donnée est saisie quotidiennement par des
  bénévoles ;
- rétention 14 quotidiens, 8 hebdomadaires, 12 mensuels ;
- deux copies locales temporaires ;
- vérification quotidienne de la fraîcheur du dernier snapshot ;
- **une restauration complète effectuée hors du VPS**, avec les seuls
  identifiants séquestrés — c'est la seule preuve que la copie est réellement
  indépendante ;
- puis restauration trimestrielle ; RTO cible 4 h.

---

## 6. Tests obligatoires

### 6.1 Construction et sécurité

`composer validate --strict` ; `composer audit` ; syntaxe PHP de tout le code
custom ; validation Compose ; scan de secrets ; scan d'image ; contrôle SBOM ;
preuve qu'aucun secret n'existe dans Git, les couches Docker ou les logs ;
preuve qu'aucun conteneur n'est privilégié et qu'aucun socket Docker n'est
monté ; **architecture d'image `amd64` vérifiée sur le VPS**.

### 6.2 Intégrité des données

Comparer source et staging : nombre de tables ; lignes par table ; compteurs
métier ; utilisateurs par rôle/statut ; contenus par type/statut ; médias et
fichiers ; manifestes SHA-256 publics et privés ; dates de dernière
modification ; relations chevaux/propriétaires/adoptants/structures ; fichiers
manquants ou orphelins.

Tout écart inexpliqué bloque le cutover.

### 6.3 Fonctionnel

Avec plusieurs rôles : connexion, déconnexion, reset password ; administration
des utilisateurs ; structures, chevaux, propriétaires, adoptants ; ressources,
actualités, documents, statistiques ; filtres, recherche, cartes, géocodage ;
upload et téléchargement ; création/modification sur données de test ; e-mails
capturés dans le sink ; cron Drupal ; rappel SETF uniquement sur staging avec
sink ; absence de double exécution ; pages 403/404 et redirections ; rendu
français, dates et fuseau.

**Ajouts v2 — le cas négatif, absent de la v1 :**

- récupération non authentifiée d'une URL de fichier privé connue → **403
  obligatoire** ;
- un rôle peu privilégié se voit refuser un document appartenant à une autre
  structure ;
- **chaque** route publique custom (porte C) est appelée sans authentification,
  avec le statut attendu consigné ;
- comparaison avant/après de la liste des modules et thèmes activés ;
- comparaison des jeux d'extensions PHP entre o2switch et l'image — une
  extension manquante se manifeste par une panne subtile à l'exécution, pas par
  un échec au démarrage.

### 6.4 Confinement des ressources

La v1 mesurait des agrégats à l'échelle de l'hôte, sans jamais vérifier que les
limites avaient pris effet.

- relire `cpu.max`, `memory.max`, `pids.max`, `io.max` sous `passerelle.slice` ;
- test de concurrence à trois projets : confiné par la tranche ;
- test d'épuisement mémoire délibéré : l'OOM du cgroup se déclenche **dans**
  Passerelle, **zéro** redémarrage voisin ;
- test de remplissage disque : `ENOSPC` reste dans l'image en boucle ;
- test de charge à ≥ 3× la concurrence de pointe, **plafonds appliqués** :
  zéro erreur, p95 < 2 s, compteur de redémarrage à 0, surcharge répondant 503
  et non fermeture de connexion.

### 6.5 Non-interférence VPS

Avant et après chaque déploiement : état, santé et compteur de redémarrage des
autres conteneurs ; CPU, mémoire, swap, PSI, disque ; endpoints des services
critiques recensés lors de la capture de baseline ; ≥ 8 GiB de RAM disponible ; > 100 GiB de
disque ; absence de swap-in/out soutenu.

**Ajouts v2 :**

- **seuils PSI chiffrés** — « mesurer le PSI » n'est pas une porte :
  mémoire `some avg60` < 1 %, io < 5 %, cpu < 10 % ;
- **deltas de swap par conteneur** pour les quatre charges connues comme
  sensibles, tels qu'identifiés par la capture de baseline — et non une
  affirmation globale ;
- **taux d'erreur du service d'automatisation** jugé le plus critique pour
  l'activité, avant/après : c'est le service où une
  interruption brève a le plus d'impact métier.

### 6.6 Sauvegarde et reprise

Restaurer le backup Restic dans un troisième projet Compose jetable ; comparer
données et fichiers ; démarrer Drupal depuis le seul dépôt Git + secrets +
backup ; documenter le temps réel de récupération ; tester la perte du
conteneur app ; tester l'indisponibilité temporaire de la base ; tester le
rollback DNS documenté.

**Ajouts v2 :** restauration **hors VPS** avec les seuls identifiants
séquestrés ; `restic check --read-data` propre ; import réussi du dump contenu
dans l'archive JetBackup.

---

## 7. Cutover

### 7.1 T-7 jours — pré-émission du certificat

**C'est la correction de séquencement la plus importante.** La v1 changeait le
DNS (étape 12) puis attendait le certificat (étape 13) : l'action la moins
réversible était placée avant l'étape la plus susceptible d'échouer, et
l'attente n'était pas bornée. Un défi HTTP-01 ne peut aboutir qu'une fois le
DNS déjà basculé — donc les premiers visiteurs reçoivent le certificat
auto-signé par défaut de Traefik, sur un intranet contenant des données
personnelles. Et si ACME échoue, on est en panne avec le DNS déjà déplacé.

`[VÉRIFIÉ]` Traefik s'appuie sur lego, qui gère le fournisseur `ovh`. Le défi
DNS-01 est une option de configuration **statique** : l'ajouter impose un
redémarrage de Traefik.

```yaml
certificatesResolvers:
  ovh:
    acme:
      email: <contact>
      storage: /acme/acme.json
      dnsChallenge:
        provider: ovh
```

avec `OVH_ENDPOINT`, `OVH_APPLICATION_KEY`, `OVH_APPLICATION_SECRET`,
`OVH_CONSUMER_KEY`.

- Le redémarrage Traefik est **programmé et annoncé au T-7 j** — quelques
  secondes de 502 pour les 23 applications. **Jamais pendant la fenêtre.**
- Le resolver est d'abord répété sur un sous-domaine jetable, en ACME staging.
- Variante sans redémarrage : obtenir le certificat hors bande avec lego ou
  certbot en DNS-01, puis le servir via le *file provider* de Traefik — **à
  condition** qu'un répertoire surveillé existe déjà. `[À PROUVER]`

Preuve avant toute bascule DNS :

```bash
openssl s_client -connect 148.230.94.19:443 \
  -servername intranet.passerelle-trotteurs.fr </dev/null 2>/dev/null \
  | openssl x509 -noout -issuer -subject -dates
```

L'étape 13 du cutover devient une **confirmation**, plus une attente.

### 7.2 T-48 heures

- réduire le TTL à 300 s ;
- confirmer tous les accès (portes A et B) ;
- vérifier le dernier backup o2switch et le dernier backup Restic ;
- rafraîchir le staging avec une copie récente ;
- valider Brevo, DKIM, DMARC ;
- valider le certificat de staging ;
- vérifier les CAA ;
- figer code, image et digest ;
- **pré-télécharger le digest figé sur le VPS et le démarrer une fois** ;
- **conserver un `docker save` du digest exact sur le VPS**, en repli hors ligne
  si GHCR est indisponible au cutover ;
- annoncer la fenêtre de maintenance ;
- enregistrer la baseline des autres applications ;
- confirmer le gel de zone OVH.

### 7.3 T-0 — séquence corrigée

**Horloge de décision : T+45 min.** Si le nouveau site n'est pas entièrement
validé à cet instant, on abandonne et on revient en arrière. Sans nombre
convenu à l'avance, la décision d'abandon se prend émotionnellement à T+90.

1. **Verrou dur o2switch au niveau Apache** — remplace le mode maintenance.
   Le mode maintenance Drupal **ne bloque ni l'utilisateur 1 ni aucun rôle
   disposant de « accéder au site en mode maintenance »** : c'est-à-dire
   exactement les personnes susceptibles de travailler pendant une migration.
   Un Webmaster dont le résolveur pointe encore l'ancienne IP pourrait éditer
   des chevaux ou des documents après le cutover, écritures invisibles pour le
   nouveau site et détruites par tout rollback.

   En tête du `.htaccess` du docroot, **avant** les réécritures Drupal :

   ```apache
   # VERROU CUTOVER — <date/heure>
   RewriteEngine On
   RewriteCond %{REQUEST_URI} !^/maintenance\.html$
   RewriteRule ^ - [R=503,L]
   ErrorDocument 503 /maintenance.html
   ```

   Ce verrou agit au niveau Apache, avant PHP : il s'applique à **tous** les
   utilisateurs, authentifiés compris.

2. **Contrôle de quiescence** — remplace « vérifier qu'aucune modification
   n'est en cours », qui n'était pas vérifiable. Après le verrou : attendre
   60 s, confirmer zéro processus PHP actif et zéro nouvelle ligne dans la
   table métier la plus sollicitée, sur deux échantillons de 30 s.
3. Désactiver **toutes** les entrées cron cPanel recensées, pas seulement SETF ;
   confirmer que `automated_cron` est désactivé.
4. Dernier dump cohérent — commande figée (annexe A.1).
5. Dernier `rsync` delta des fichiers publics et privés.
6. Chiffrer et contrôler les checksums.
7. Restaurer le delta sur le VPS ; appliquer les purges post-restauration
   (annexe A.2).
8. Lancer **uniquement** le projet `passerelle-prod`.
9. `drush cache:rebuild` ; vérifier Drupal et la base ;
   `drush updatedb --dry-run` doit rapporter **zéro**.
10. Comparer compteurs et manifestes.
11. Tester par le vrai nom d'hôte **avant toute bascule DNS** :

    ```bash
    curl -sS --resolve intranet.passerelle-trotteurs.fr:443:148.230.94.19 \
      https://intranet.passerelle-trotteurs.fr/user/login \
      -o /dev/null -w '%{http_code}\n'
    ```

12. **Confirmer** que le certificat de production est déjà présent (§7.1).
13. Modifier le seul enregistrement DNS `A`.
14. Tester par le vrai nom d'hôte, résolution normale.
15. Tester les comptes Pierre-Olivier et Méline.
16. Envoyer un e-mail réel contrôlé.
17. Activer **le cron cœur Drupal** puis **la planification SETF**, chacun une
    seule fois, après confirmation que les entrées de l'ancien hôte sont bien
    désactivées. Vérifier que le middleware `ipAllowList` renvoie 403 sur la
    route SETF depuis l'extérieur.
18. Ouvrir le nouveau Drupal.
19. Vérifier immédiatement toutes les autres applications du VPS.
20. Enregistrer heure, versions, checksums et résultats.

**Condition d'arrêt de propagation** (absente de la v1) : la propagation est
terminée quand le journal d'accès o2switch ne montre plus de réponse autre que
503. C'est un fait observable, pas une conjecture sur le comportement des
résolveurs.

### 7.4 Fermeture de la route SETF

Sur le nouvel hôte, routeur de priorité supérieure sur le chemin SETF, avec une
liste d'autorisation qui n'autorise personne depuis l'extérieur :

```yaml
- "traefik.http.routers.psl-setf.rule=Host(`intranet.passerelle-trotteurs.fr`) && PathPrefix(`/cdw/relance-setf`)"
- "traefik.http.routers.psl-setf.priority=100"
- "traefik.http.routers.psl-setf.middlewares=psl-setf-deny"
- "traefik.http.middlewares.psl-setf-deny.ipallowlist.sourcerange=127.0.0.1/32"
```

Le planificateur appelle la route **par le réseau interne** (nom de conteneur),
en contournant Traefik — ou mieux, exécute directement `drush`. La route reste
donc fonctionnelle pour le système et fermée au monde. Sur l'ancien hôte, le
verrou du point 1 la couvre déjà.

### 7.5 Conditions d'arrêt

Annuler le cutover si : un compteur métier diffère sans explication ; un
fichier privé est absent ou publiquement accessible ; un rôle ne peut plus
travailler ; l'e-mail ne fonctionne pas ; le cron risque de s'exécuter deux
fois ; une autre application VPS redémarre ou devient unhealthy ; la mémoire
disponible descend durablement sous 8 GiB ; aucun backup récent et restaurable
n'est disponible ; OVH, o2switch ou le VPS deviennent inaccessibles ;
**l'horloge atteint T+45 min sans validation complète**.

---

## 8. Rollback

### 8.1 Avant ouverture du nouveau site

1. Remettre le DNS sur `109.234.166.78`.
2. Arrêter uniquement `passerelle-prod`.
3. Réactiver l'ancien cron.
4. **Lever le verrou `.htaccess`** sur o2switch.

Aucune écriture n'a pu atteindre le nouveau site si l'étape 18 n'a pas été
exécutée.

### 8.2 Après ouverture et écritures possibles

**La v1 était ici techniquement indéfinie.** « Exporter son dernier delta DB et
le restaurer sur o2switch » n'est pas une opération qui existe : une base
Drupal ne se fusionne pas — auto-incréments, révisions d'entités et `key_value`
entrent en collision. La procédure correcte est une restauration **complète** :

1. Remettre le nouveau site en maintenance.
2. **Dump complet** de la base du nouveau site (pas un delta).
3. Lever le verrou o2switch.
4. **Supprimer et recréer** le schéma o2switch, puis importer le dump complet.
5. `rsync` complet des fichiers publics et privés, en **excluant
   `settings.php`** (les identifiants de base diffèrent) et le chemin privé s'il
   diffère.
6. Comparer les compteurs.
7. Remettre le DNS vers o2switch.
8. Réactiver l'ancien cron.
9. Lever le mode maintenance.
10. Conserver les deux environnements pour analyse.

**Cette opération n'est sans perte que parce que le verrou du §7.3 garantit zéro
écriture sur o2switch pendant la fenêtre.** Les deux mécanismes sont
indissociables.

### 8.3 Répétition en sens inverse — obligatoire

`[À PROUVER]` Rien ne garantit aujourd'hui qu'un dump produit par le moteur
cible s'importe dans le moteur source. Si o2switch tourne en MariaDB 10.6 (fin
de vie depuis le 6 juillet 2026) et la cible en 10.11, l'écart de version peut
faire échouer la restauration arrière — précisément au moment où c'est vital.

À intégrer à la répétition n° 2 :

- dump depuis le moteur cible ;
- import dans un bac à sable épinglé à la version **exacte** de la source
  (relevé de la porte E) ;
- parité des comptages de lignes et des compteurs métier ;
- Drupal démarre et un utilisateur privilégié se connecte.

### 8.4 Latence de rollback

Le rollback est entièrement conditionné par l'accès en écriture à la zone OVH
(porte A). Si une seule personne le détient et qu'elle est injoignable, la
durée du rollback est **non bornée**, quelle que soit la qualité de la
procédure technique. Les deux propriétaires doivent disposer d'un accès
indépendant et testé.

---

## 9. Après migration

- surveillance renforcée pendant 48 h, avec astreinte nommée, horaires et
  chaîne d'escalade écrits ;
- vérifications quotidiennes pendant sept jours ;
- conservation d'o2switch en rollback pendant 14 jours ;
- backup final o2switch avant fermeture ;
- rotation des anciens identifiants ;
- suppression du clone staging après sept jours, **volumes effacés** et
  snapshots Restic de staging exclus ;
- restauration du TTL à 3600 s après 72 h de stabilité ;
- suppression de Mailjet uniquement après inventaire des autres usages ;
- livraison distincte remplaçant la route publique SETF par une commande
  interne, sous 90 jours ;
- revue des rôles Webmaster/Administrator ;
- comptes nominatifs et 2FA ;
- **montée en 11.4.x sous 60 jours** — la branche 11.3 perd son support en
  décembre 2026 à la sortie de 12.0 ; prévoir PHP 8.4 conjointement ;
- premier test trimestriel de restauration programmé ;
- **note RGPD** : les sauvegardes sont exclues de l'effacement immédiat, bornées
  par la rétention annoncée, et l'effacement est réappliqué à toute
  restauration. Brevo et OVH Object Storage sont inscrits comme sous-traitants,
  avec DPA. Les deux sont européens : pas de transfert hors UE ;
- **réconciliation du scan de secrets** : 97 fichiers scannés pour ~112 fichiers
  custom recensés. Établir la liste des fichiers exclus et pourquoi ;
- **échéance domaine 18 janvier 2027** : rappel calendrier à T+120 j pour la
  reprise du compte OVH et le renouvellement.

---

## 10. Porte de validation finale

Chaque ligne est binaire et prouvable. Ne signer que sur preuve.

### Accès et propriété

- [ ] Les deux propriétaires ont créé puis supprimé un enregistrement de test
      dans la zone OVH, **séparément**, avec durées consignées.
- [ ] Confirmation écrite de continuité d'accès o2switch jusqu'à cutover + 14 j.
- [ ] 2FA cPanel active, contact de récupération contrôlé par Passerelle.
- [ ] Identités FTP déléguées suspendues ou tournées ; liste avant/après.
- [ ] Identifiant GitHub de Méline confirmé ; accès dépôt et Tailscale testés
      par elle.
- [ ] Les deux propriétaires ont exécuté un rollback complet en répétition n° 2.

### Preuves et inventaire

- [ ] Moteur, version exacte, charset, collation, `sql_mode`,
      `lower_case_table_names`, fuseau, moteurs par table et objets SQL relevés.
- [ ] Toutes les routes custom anonymes recensées, **y compris la seconde route
      de l'audit**, avec matrice de statuts non authentifiés.
- [ ] Idempotence et mutation d'état SETF établies depuis le code ; incident du
      25 juillet 06:18 UTC tranché sur les trois questions.
- [ ] Inventaire cron complet : entrées cPanel, `automated_cron`, existence ou
      non d'un cron cœur Drupal séparé.
- [ ] Matériel de chiffrement identifié et transféré, ou absence constatée par
      écrit.
- [ ] Tous les `.htaccess` de la racine au docroot et les surcharges PHP cPanel
      capturés.
- [ ] Volume quotidien de pointe d'e-mails mesuré ; offre Brevo confirmée en
      conséquence.

### Construction et confinement

- [ ] `Architecture: amd64` vérifiée sur le VPS ; digest figé, pré-téléchargé,
      tarball hors ligne checksummé.
- [ ] Drupal 11.2.14 sur staging, suite fonctionnelle complète au vert ;
      applicabilité de SA-CORE-2026-005 tranchée.
- [ ] `passerelle.slice` active ; `cpu.max`, `memory.max`, `pids.max` relus et
      conformes pour **tous** les conteneurs Passerelle.
- [ ] Test de concurrence à trois projets exécuté et confiné.
- [ ] Test d'épuisement mémoire : OOM interne à Passerelle, zéro redémarrage
      voisin.
- [ ] Image disque en boucle montée ; test de remplissage confiné.
- [ ] `passerelle-edge` avec exactement deux membres ; connexions depuis Drupal
      vers deux voisins connus de `proxy` en échec ; socket proxy absent de
      `proxy`.
- [ ] Test de charge ≥ 3× pointe : zéro erreur, p95 < 2 s, zéro redémarrage,
      surcharge en 503.

### Données et restauration

- [ ] Comptages, compteurs métier et manifestes SHA-256 concordants, zéro écart
      inexpliqué.
- [ ] Fichier privé en anonyme → 403 ; document d'une autre structure refusé à
      un rôle peu privilégié.
- [ ] `drush updatedb --dry-run` = zéro.
- [ ] Deux répétitions depuis volumes vierges ; la seconde menée au runbook seul
      par une seconde personne, chronométrée, sous deux heures avec marge.
- [ ] **Restauration en sens inverse répétée** vers la version exacte du moteur
      source ; Drupal démarre, connexion privilégiée réussie.
- [ ] Restauration Restic **hors VPS** avec les seuls identifiants séquestrés ;
      `restic check --read-data` propre.
- [ ] Bucket créé **avec Object Lock** ; versioning actif ; rétention posée.
- [ ] Archive JetBackup extraite et son dump importé avec succès.

### Prêt pour le cutover

- [ ] Certificat de production présent et servi **avant** toute bascule DNS.
- [ ] CAA vérifiés sur les deux noms, permissifs ou corrigés.
- [ ] Toutes les répétitions de certificat en ACME staging ; émissions en
      production = 1.
- [ ] Verrou `.htaccess` 503 testé : un Webmaster authentifié reçoit 503 ;
      levée répétée.
- [ ] GET externe sur la route SETF → 403 ; exactement une exécution par tick
      observée dans le sink.
- [ ] `_dmarc` publié en `p=none; rua=` ; DKIM Brevo validé ; SPF étendu,
      Mailjet conservé.
- [ ] Gel de zone OVH convenu par écrit pour T-48 h → T+72 h.
- [ ] Runbook contenant commandes littérales, valeurs attendues, horloge T+45
      et condition d'arrêt de propagation.
- [ ] Alerte de test reçue par les deux propriétaires ; sondes de santé
      définies dans le fichier Compose ; route SETF documentée comme interdite
      en supervision.
- [ ] Baseline voisine capturée ; seuils PSI chiffrés ; deltas de swap des
      quatre principaux consommateurs identifiés au baseline consignés.
- [ ] Hash salt confirmé identique à l'octet près (valeur jamais imprimée).
- [ ] `.gitignore` étendu et vérifié ; fichier test dans `tmp/pdfs/`
      non indexable ; hook pre-commit bloquant un faux secret.

**Prêt pour le cutover : OUI / NON**

Signatures : ................................  ................................
Date : ........................

---

## Annexe A — Commandes littérales

### A.1 Dump cohérent

La v1 disait « dump cohérent `--single-transaction` ». Sous cPanel,
l'utilisateur applicatif ne dispose généralement pas du privilège `PROCESS`, et
`mysqldump` échoue alors sans `--no-tablespaces` — au T-0, avec un opérateur
qui improvise.

```bash
mysqldump \
  --single-transaction \
  --quick \
  --no-tablespaces \
  --routines \
  --triggers \
  --events \
  --hex-blob \
  --default-character-set=utf8mb4 \
  -h "$DB_HOST" -u "$DB_USER" -p "$DB_NAME" \
  > passerelle-$(date +%Y%m%d-%H%M%S).sql
```

Ajouter `--set-gtid-purged=OFF` **uniquement** sous MySQL avec GTID actif
(option absente de MariaDB). `--single-transaction` n'est cohérent que pour
InnoDB : toute table MyISAM relevée à la porte E se traite séparément.

### A.2 Purges après restauration

```sql
TRUNCATE TABLE semaphore;   -- sinon Drupal croit un verrou détenu
TRUNCATE TABLE batch;       -- lots interrompus
TRUNCATE TABLE flood;       -- n'hérite pas de l'état de blocage de connexion
-- NE PAS toucher à `sessions` : les utilisateurs seraient déconnectés
```

Générer les purges de cache :

```sql
SELECT CONCAT('TRUNCATE TABLE `', TABLE_NAME, '`;')
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME LIKE 'cache%';
```

### A.3 Vérifications de confinement

```bash
cat /sys/fs/cgroup/passerelle.slice/cpu.max
cat /sys/fs/cgroup/passerelle.slice/memory.max
cat /sys/fs/cgroup/passerelle.slice/memory.swap.max
systemd-cgls /passerelle.slice
docker network inspect passerelle-edge
cat /sys/block/sda/queue/scheduler
df -h /srv/passerelle-intranet
```

### A.4 Vérifications DNS et TLS

```bash
dig +short CAA passerelle-trotteurs.fr
dig +short CAA intranet.passerelle-trotteurs.fr
dig +short A   intranet.passerelle-trotteurs.fr
dig +short TXT _dmarc.passerelle-trotteurs.fr

openssl s_client -connect 148.230.94.19:443 \
  -servername intranet.passerelle-trotteurs.fr </dev/null 2>/dev/null \
  | openssl x509 -noout -issuer -subject -dates

curl -sS --resolve intranet.passerelle-trotteurs.fr:443:148.230.94.19 \
  https://intranet.passerelle-trotteurs.fr/user/login \
  -o /dev/null -w '%{http_code}\n'
```

---

## Annexe B — Enveloppe de ressources

### B.1 Ce que demandait la v1

| Scénario | CPU | RAM |
|---|---:|---:|
| Production seule | 3,00 vCPU (37,5 %) | 3,88 GiB (12,5 %) |
| Production + staging *(staging sans limites en v1)* | 6,00 vCPU (75 %) | ≈ 7,75 GiB |
| Production + staging + test de restauration | **8,50 vCPU — 106 % de l'hôte** | ≈ 11,6 GiB |

Deux conséquences que la v1 ne tirait pas. D'abord, le cas à trois projets
demande plus de CPU que l'hôte n'en possède — et il survient pendant la
répétition de sauvegarde, une activité planifiée, pas un cas limite. Ensuite,
avec 20 GiB disponibles, ce cas laisse ≈ 8,4 GiB libres : **la répétition de la
v1 aurait déclenché la condition d'arrêt de la v1** (« au moins 8 GiB
disponibles »).

### B.2 Ce que garantit la v2

Avec `passerelle.slice`, quel que soit le nombre de projets démarrés :

| Ressource | Plafond Passerelle | Part de l'hôte | Nature |
|---|---:|---:|---|
| CPU | **3,0 vCPU** | 37,5 % | garanti (quota noyau) |
| RAM | **6,0 GiB** | 19,4 % | garanti (`memory.max`) |
| Swap | **0** | — | garanti (`memory.swap.max=0`) |
| Disque | **20 GiB** | ~10 % du libre | garanti (image en boucle) |
| PIDs | 704 (prod) | — | garanti (`pids.max`) |

L'hôte conserve **au minimum 5 vCPU et 25 GiB** pour les 23 autres conteneurs,
en toutes circonstances.

### B.3 Ce qui reste non garanti

| Surface | Statut | Pourquoi |
|---|---|---|
| Mémoire, CPU, PIDs, swap | **Garantie** | Appliqués par le noyau ; l'OOM frappe dans Passerelle, jamais les voisins |
| Disque | **Garantie** après image en boucle | L'alerte seule détectait sans empêcher |
| E/S | **Faible** | Les poids sont probablement inertes ; à remplacer par `io.max` et à vérifier |
| Noyau | **Partagé** | AppArmor, seccomp, capacités réduites atténuent sans éliminer |
| Démon Docker | **Partagé**, `live_restore=false` | Un redémarrage arrête les 23 conteneurs. Aucune opération globale autorisée |
| Ingress Traefik | **Partagé** | Le redémarrage du T-7 j coûte quelques secondes de 502 à tous |
| Réseau | **Réduit** par `passerelle-edge` | Rayon d'action ramené de « tout le bus » à « Traefik seul » |

**Arbitrage assumé, à écrire noir sur blanc :** en interdisant le swap à
Passerelle, on décide que Drupal meurt en premier sous pression mémoire plutôt
que de dégrader ses voisins. C'est le comportement recherché.

---

## Annexe C — Journal des corrections v1 → v2

| # | Sujet | v1 | v2 |
|---|---|---|---|
| 1 | Accès OVH | Élément à collecter | **Porte bloquante**, nominative pour les deux propriétaires |
| 2 | Continuité o2switch | Supposée | **Porte bloquante**, confirmation écrite + 2FA + FTP neutralisés |
| 3 | Routes publiques | Une seule (SETF) | Inventaire exhaustif, **la seconde route de l'audit incluse** |
| 4 | Incident SETF | « Des e-mails ont-ils été envoyés ? » | Trois questions, dont la mutation d'état et la suppression d'une relance future |
| 5 | Séquence TLS/DNS | DNS puis attente du certificat | **Certificat pré-émis au T-7 j** ; l'étape devient une confirmation |
| 6 | Barrière d'écriture | Mode maintenance Drupal | **Verrou `.htaccess` 503** au niveau Apache |
| 7 | Rollback après écritures | « Restaurer le delta » | **Restauration complète**, avec répétition en sens inverse |
| 8 | Plafonds | Par conteneur | **Tranche systemd globale** `passerelle.slice` |
| 9 | Réseau | Rejoint `proxy` partagé | **`passerelle-edge`** dédié, Traefik attaché à chaud |
| 10 | Disque | Alertes seules | **Image ext4 en boucle**, plafond dur de 20 GiB |
| 11 | E/S | Poids `blkio` | Plafonds `io.max` + vérification de l'ordonnanceur |
| 12 | Concurrence Apache | Non traitée | `MaxRequestWorkers 8`, `memory_limit 192M` |
| 13 | Base de données | MySQL 8.0 | **MySQL 8.4 LTS** + `my.cnf` dimensionné |
| 14 | Drupal | 11.2.2 figé | **11.2.14 avant cutover**, 11.4.x sous 60 j |
| 15 | Image | Construite sur le Mac | **`--platform linux/amd64`** + pré-téléchargement + tarball de repli |
| 16 | Certificats | Non traité | CAA vérifiés, répétitions en **ACME staging** |
| 17 | Restic | Portée non définie | **Dump logique**, jamais le datadir ; séquestre hors serveur |
| 18 | Object Lock | « si disponible » | **À la création du bucket** — impossible après coup |
| 19 | RPO | 24 h | **6 h** (4 dumps/jour, coût négligeable) |
| 20 | DMARC | Absent | **`p=none; rua=` avant** le changement de relais |
| 21 | Brevo | Choisi puis volumes collectés | **Porte volumétrie avant** confirmation (300/j partagés) |
| 22 | Zone DNS | Non coordonnée | **Gel écrit** T-48 h → T+72 h avec le site public |
| 23 | Staging | Accès Tailscale accordé | **ACL Tailscale** + `serve` obligatoire, `funnel` interdit |
| 24 | Mises à jour de base | « si elles ne sont pas nécessaires » | **`drush updatedb --dry-run` = zéro**, porte dure |
| 25 | Export de configuration | Committé | **Expurgé** + stocké hors du chemin de synchronisation |
| 26 | Reverse proxy | Non traité | Contrat explicite, **CIDR** et non IP de conteneur |
| 27 | uid/gid fichiers | Non traité | `chown 33:33` explicite |
| 28 | `mysqldump` | Générique | Commande figée avec `--no-tablespaces` + purges post-restauration |
| 29 | Sondes de santé | « peu coûteuses » | Définies littéralement ; route SETF **interdite** |
| 30 | Alertes | Seuils sans destinataire | Système, canal, destinataires nommés + alerte de test |
| 31 | PSI | « mesurer » | **Seuils chiffrés** + deltas de swap par conteneur |
| 32 | JetBackup | Téléchargé | **Extrait et importé** dans un bac à sable |
| 33 | Clés de chiffrement | Absentes de l'inventaire | Élément d'inventaire explicite |
| 34 | Hash salt | Collecté | **Invariant écrit** ; salt différent en staging |
| 35 | `.htaccess` | Celui de `web/` | **Tous**, de la racine du compte au docroot |
| 36 | `.gitignore` | Partiel | `tmp/`, `public-site/`, exports chiffrés, hook pre-commit |
| 37 | Horloge de cutover | Absente | **T+45 min**, décision d'abandon |
| 38 | Fin de propagation | Implicite | Journal d'accès o2switch sans réponse hors 503 |
| 39 | Tests négatifs | Absents | 403 sur fichier privé, refus inter-structures, matrice de routes |
| 40 | RGPD | Non traité | Rétention, effacement, sous-traitants, DPA |

---

*Fin du document. Version 2 — 25 juillet 2026.*
