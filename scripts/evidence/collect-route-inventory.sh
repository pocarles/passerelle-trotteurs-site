#!/usr/bin/env bash
# Porte C·1 — inventaire statique des routes custom (plan v2 §1, Porte C).
# Lecture seule : uniquement find/grep/sed sur les sources.
#
# Usage :
#   ./collect-route-inventory.sh /chemin/vers/docroot   (…/intranet/www/web)
#
# Fonctionne sur le shell o2switch ou sur une copie rsync locale du projet.
# Reporter la sortie, classée et sanitisée, dans docs/migration/route-inventory.md.
set -euo pipefail

DOCROOT="${1:?Usage: $0 /chemin/vers/docroot (…/intranet/www/web)}"
CUSTOM="$DOCROOT/modules/custom"
[ -d "$CUSTOM" ] || { echo "Introuvable : $CUSTOM" >&2; exit 1; }

echo "== 1. Modules custom présents (l'audit en recense 15) =="
ls -1 "$CUSTOM"

echo
echo "== 2. Fichiers *.routing.yml =="
find "$CUSTOM" -name '*.routing.yml' | sort

echo
echo "== 3. Contenu intégral des routing.yml =="
echo "   (chaque route est à classer dans route-inventory.md)"
find "$CUSTOM" -name '*.routing.yml' -print -exec sed 's/^/    /' {} \;

echo
echo "== 4. Routes en acces anonyme inconditionnel (_access: TRUE) =="
grep -rn --include='*.routing.yml' -iE "_access:[[:space:]]*['\"]?TRUE" "$CUSTOM" \
  || echo "(aucune)"

echo
echo "== 5. Autres mecanismes d'acces (a examiner route par route) =="
grep -rn --include='*.routing.yml' -E "_permission|_role|_custom_access|_entity_access|_user_is_logged_in|_csrf" "$CUSTOM" \
  || echo "(aucun)"

echo
echo "== 6. Controleurs references (pour la lecture des effets de bord) =="
grep -rn --include='*.routing.yml' -E "_controller|_form" "$CUSTOM" || echo "(aucun)"

echo
echo "== 7. hook_cron dans les modules custom (recoupement porte D / P0-9) =="
grep -rn --include='*.module' -E "function [a-z0-9_]+_cron\(" "$CUSTOM" \
  || echo "(aucun hook_cron custom)"
