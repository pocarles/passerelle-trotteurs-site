# Collecte de preuves — portes C, D et E

Outils de collecte **en lecture seule** pour les trois portes techniques du
[plan v2](../../docs/migration/PLAN-v2.md). Chaque script produit la matière
brute d'un gabarit de preuve sous `docs/migration/`.

## Règles de sécurité

- Tout est en lecture seule : aucun script n'écrit sur le serveur, dans la
  base ou dans la configuration Drupal.
- Les identifiants viennent du gestionnaire de mots de passe approuvé. Rien
  n'est saisi dans un fichier, un script ou ce dépôt.
- **Ne jamais appeler la route `/cdw/relance-setf/run`** — ni à la main, ni
  par script. `probe-public-routes.sh` la refuse explicitement.
- Les sorties sont **sanitisées avant commit** : aucun nom, e-mail, ou donnée
  personnelle ne doit atteindre Git (règle du dépôt, voir `README.md` racine).
- Pendant la collecte, ne modifier aucun utilisateur, rôle, contenu ou cron
  (plan, Étape 2).

## Ordre d'exécution

| # | Porte | Script | Où l'exécuter | Produit → gabarit |
|---|---|---|---|---|
| 1 | E | `collect-db-evidence.sql` | shell o2switch (`mysql`) ou phpMyAdmin | [db-evidence.md](../../docs/migration/db-evidence.md) |
| 2 | C·1 | `collect-route-inventory.sh` | shell o2switch (ou copie rsync locale) | [route-inventory.md](../../docs/migration/route-inventory.md) |
| 3 | D | `collect-setf-evidence.sh` | shell o2switch (logs + code) + SQL | [setf-incident-2026-07-25.md](../../docs/migration/setf-incident-2026-07-25.md) |
| 4 | C·2 | `probe-public-routes.sh` | n'importe où (HTTP externe) | matrice de statuts dans route-inventory.md |

**L'étape 4 ne se lance qu'après l'étape 2 ET la classification des effets de
bord** : seules les routes classées « sans effet de bord » par une relecture du
code, validée par une seconde personne, entrent dans `routes-a-sonder.txt`.

## Exécution type (shell o2switch)

```bash
# Docroot relevé par l'audit du 23 juillet 2026 :
DOCROOT=~/public_html/passerelletrotteur/intranet/www/web

mysql --batch -u <UTILISATEUR> -p <BASE> < collect-db-evidence.sql > db-evidence-brut.txt
./collect-route-inventory.sh "$DOCROOT"          > routes-brut.txt
./collect-setf-evidence.sh   "$DOCROOT"          > setf-brut.txt
```

Rapatrier les `*-brut.txt`, les sanitiser, reporter dans les gabarits, puis
supprimer les bruts du serveur. Les fichiers `*-brut.txt` sont ignorés par
Git ; seuls les gabarits remplis et expurgés se committent.
