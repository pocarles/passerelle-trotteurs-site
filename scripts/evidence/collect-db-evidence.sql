-- Porte E — identité exacte du moteur de base de données (plan v2 §1, §4.4)
-- Lecture seule : uniquement SELECT et SHOW. Aucune donnée personnelle extraite.
--
-- Exécution depuis le shell o2switch :
--   mysql --batch -u <UTILISATEUR> -p <BASE> < collect-db-evidence.sql > db-evidence-brut.txt
-- Ou requête par requête dans phpMyAdmin, onglet SQL.
--
-- Reporter le résultat dans docs/migration/db-evidence.md.

-- 1. Moteur et version : le couple qui détermine l'image cible ET le rollback.
SELECT VERSION(), @@version_comment;

-- 2. Variables serveur à reprendre à l'identique sur la cible.
SHOW VARIABLES LIKE 'character_set_server';
SHOW VARIABLES LIKE 'collation_server';
SHOW VARIABLES LIKE 'sql_mode';
SHOW VARIABLES LIKE 'lower_case_table_names';
SHOW VARIABLES LIKE 'time_zone';

-- 3. Moteurs par table. Toute table non-InnoDB casse la cohérence de
--    --single-transaction et se traite à part (plan, annexe A.1).
SELECT ENGINE, ROW_FORMAT, COUNT(*)
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
GROUP BY ENGINE, ROW_FORMAT;

-- 3b. Nommer les éventuelles tables non-InnoDB.
SELECT TABLE_NAME, ENGINE
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE() AND ENGINE <> 'InnoDB';

-- 4. Objets SQL que le dump doit embarquer (--routines --triggers --events).
SELECT COUNT(*) AS triggers_n FROM information_schema.TRIGGERS  WHERE TRIGGER_SCHEMA = DATABASE();
SELECT COUNT(*) AS views_n    FROM information_schema.VIEWS     WHERE TABLE_SCHEMA   = DATABASE();
SELECT COUNT(*) AS routines_n FROM information_schema.ROUTINES  WHERE ROUTINE_SCHEMA = DATABASE();
SELECT COUNT(*) AS events_n   FROM information_schema.EVENTS    WHERE EVENT_SCHEMA   = DATABASE();

-- 5. Volumétrie sanitisée (plan §4.4) — aucune donnée, uniquement des comptages.
SELECT COUNT(*) AS tables_total
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE();

SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) AS taille_mib
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE();
