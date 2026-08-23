#!/usr/bin/env bash
# Porte C·2 — matrice de statuts HTTP non authentifies (plan v2 §1, Porte C).
#
# NE LANCER QU'APRES collect-route-inventory.sh ET la classification des
# effets de bord dans route-inventory.md. Une route a effet de bord ne doit
# JAMAIS etre sondee : le GET unique du 25 juillet sur relance-setf est
# precisement l'incident de la porte D.
#
# Usage :
#   ./probe-public-routes.sh routes-a-sonder.txt
#     routes-a-sonder.txt : un chemin par ligne (ex. /cdw/exemple), lignes
#     vides et commentaires # ignores. Uniquement des routes classees « sans
#     effet de bord », validees par une seconde personne.
#
# La route relance-setf est refusee en dur, meme si elle figure dans la liste.
set -euo pipefail

LIST="${1:?Usage: $0 routes-a-sonder.txt}"
BASE="https://intranet.passerelle-trotteurs.fr"
BLOCKLIST='relance-setf'

echo "# Sonde non authentifiee — $BASE — $(date -u +%Y-%m-%dT%H:%MZ)"
echo "# statut  chemin"
while IFS= read -r p; do
  [ -z "$p" ] && continue
  case "$p" in \#*) continue ;; esac
  if printf '%s' "$p" | grep -qE "$BLOCKLIST"; then
    echo "REFUS  $p   (route a effet de bord — interdite de sonde, portes C/D)"
    continue
  fi
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$BASE$p" || echo "ERR")
  echo "$code    $p"
  sleep 2
done < "$LIST"
