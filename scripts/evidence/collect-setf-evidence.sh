#!/usr/bin/env bash
# Porte D — incident SETF du 25 juillet 2026, ~06:18 UTC (plan v2 §1, Porte D).
# Lecture seule : grep sur le code et les journaux. N'appelle JAMAIS la route.
#
# Usage :
#   ./collect-setf-evidence.sh /chemin/vers/docroot [repertoire-access-logs]
#     docroot : …/intranet/www/web
#     logs    : par defaut ~/access-logs (domlogs cPanel)
#
# Reporter la sortie, sanitisee (destinataires masques), dans
# docs/migration/setf-incident-2026-07-25.md.
set -euo pipefail

DOCROOT="${1:?Usage: $0 /chemin/vers/docroot [repertoire-access-logs]}"
LOGDIR="${2:-$HOME/access-logs}"
CUSTOM="$DOCROOT/modules/custom"
[ -d "$CUSTOM" ] || { echo "Introuvable : $CUSTOM" >&2; exit 1; }

echo "== 1. Module(s) declarant la route relance-setf =="
SETF_DIRS=$(grep -rl --include='*.routing.yml' "relance-setf" "$CUSTOM" | xargs -rn1 dirname | sort -u)
if [ -z "$SETF_DIRS" ]; then
  echo "AUCUN module ne declare relance-setf sous $CUSTOM — verifier le chemin." >&2
  exit 1
fi
echo "$SETF_DIRS"

echo
echo "== 2. Chemins de declenchement : controleur, hook_cron, ou les deux ? =="
for d in $SETF_DIRS; do
  echo "-- $d"
  grep -rn -E "function [a-z0-9_]+_cron\(" "$d" || echo "   (pas de hook_cron)"
  grep -rn -E "_controller:" "$d"/*.routing.yml || true
done

echo
echo "== 3. Ecritures d'etat (la question de l'idempotence) =="
echo "   Un horodatage « derniere relance » avance par le GET du 25/07 peut"
echo "   supprimer silencieusement une relance legitime future."
for d in $SETF_DIRS; do
  echo "-- $d"
  grep -rn -E "state\(\)->set|keyValue|key_value|->save\(|->update\(|->insert\(|->merge\(" "$d" \
    || echo "   (aucune ecriture d'etat evidente — a confirmer par lecture du controleur)"
done

echo
echo "== 4. Envois d'e-mail dans le module =="
for d in $SETF_DIRS; do
  echo "-- $d"
  grep -rn -E "MailManager|->mail\(|hook_mail|sendMail|mail\(" "$d" \
    || echo "   (aucun envoi direct)"
done

echo
echo "== 5. Journal Apache — toutes les requetes du 25 juillet 2026 sur la route =="
echo "   NB : logs cPanel en heure serveur (Europe/Paris, UTC+2 en juillet) ;"
echo "   06:18 UTC = 08:18 heure serveur."
grep -h "relance-setf" "$LOGDIR"/* 2>/dev/null | grep "25/Jul/2026" \
  || echo "(rien dans $LOGDIR — verifier le repertoire et les archives .gz ci-dessous)"
echo "-- contenu de $LOGDIR :"
ls -la "$LOGDIR" 2>/dev/null || echo "(repertoire absent : passer le chemin des domlogs en 2e argument)"

echo
echo "== 6. Requetes SQL a executer a part (lecture seule, via mysql/phpMyAdmin) =="
cat <<'SQL'
-- Le module dblog est-il actif ?
SHOW TABLES LIKE 'watchdog';

-- Fenetre 06:00-06:40 UTC du 25 juillet 2026 (epoch 1784959200-1784961600).
-- FROM_UNIXTIME rend l'heure dans le fuseau du serveur SQL.
SELECT wid, type, severity, message, timestamp, FROM_UNIXTIME(timestamp) AS ts_serveur
FROM watchdog
WHERE timestamp BETWEEN 1784959200 AND 1784961600
ORDER BY timestamp;

-- Etat « derniere relance » et dernier cron (plan §4.3).
-- `value` est du PHP serialise : relever la valeur brute telle quelle.
SELECT collection, name, value
FROM key_value
WHERE collection = 'state'
  AND (name LIKE '%setf%' OR name LIKE '%relance%' OR name LIKE '%cdw%'
       OR name = 'system.cron_last');
SQL

echo
echo "== 7. Traces mail =="
echo "Les journaux Exim ne sont pas accessibles en shell sur mutualise."
echo "Utiliser cPanel -> Track Delivery, filtre sur le 25/07/2026 entre 08:00 et"
echo "09:00 heure serveur, et archiver une capture SANITISEE (destinataires masques)."
