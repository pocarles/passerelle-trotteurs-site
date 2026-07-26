# Mettre à jour le site Passerelle

Ce guide s'adresse aux personnes de l'association qui ajoutent des chevaux et
des actualités. **Aucune compétence technique n'est nécessaire**, et il n'y a
rien à installer : tout se fait depuis un navigateur.

Il faut simplement un compte GitHub ayant accès au dépôt du site. Demandez-le à
Pierre-Olivier si ce n'est pas encore le cas.

**Comment ça marche.** Vous remplissez une fiche, vous cliquez sur *Commit
changes*, et le site se met à jour tout seul en une minute environ. Il n'y a
pas de bouton « publier » séparé.

---

## Ajouter un cheval

### 1. Envoyer les photos

Cliquez sur ce lien :
**[Ajouter des photos de cheval](https://github.com/pocarles/passerelle-trotteurs-site/upload/main/public/media/chevaux)**

Glissez vos photos dans la zone, puis cliquez sur le bouton vert
**Commit changes** en bas.

Quelques règles pour les photos :

- Donnez-leur des noms simples, en minuscules, sans accents ni espaces :
  `ulysse-1.jpg`, `ulysse-2.jpg`. Pas `Photo Ulysse (1).JPG`.
- La première photo de la liste sera la photo principale. Choisissez-la bien :
  c'est elle qui apparaît sur la page d'ensemble.
- Format paysage de préférence, et une photo qui montre bien le cheval.
- Évitez les fichiers de plus de 3 Mo. Une photo prise au téléphone convient
  très bien.

### 2. Créer la fiche

Cliquez sur ce lien :
**[Créer une fiche cheval](https://github.com/pocarles/passerelle-trotteurs-site/new/main/src/content/chevaux)**

Dans le champ du nom de fichier, tapez le nom du cheval en minuscules, sans
accents ni espaces, suivi de `.md` — par exemple `ulysse-du-vivier.md`. Ce nom
devient l'adresse de la page : `…/adopter/ulysse-du-vivier`.

Puis copiez le modèle ci-dessous dans la grande zone de texte, et remplacez les
valeurs.

```markdown
---
nom: "Ulysse du Vivier"
statut: "vente"
annee: 2018
sexe: "hongre"
robe: "Bai"
taille: "1,62 m"
montable: true
structure: "Écuries de la Brèche"
departement: "Oise"
participation: "Prix sur demande"
resume: "Un hongre sociable, remis au travail depuis un an, qui cherche une cavalière ou un cavalier de niveau galop 5."
photos:
  - src: "/media/chevaux/ulysse-1.jpg"
    alt: "Ulysse au pré"
  - src: "/media/chevaux/ulysse-2.jpg"
    alt: "Ulysse monté en carrière"
updated: 2026-07-26
---

Ici, le texte long de la fiche : son caractère, son travail depuis la réforme,
ce qu'il sait faire, le profil de cavalier ou de famille recherché, les soins
ou ménagements à prévoir.

## Son parcours

Vous pouvez ajouter des sous-titres comme celui-ci en commençant la ligne par
deux dièses.
```

Cliquez ensuite sur **Commit changes** (bouton vert, en haut à droite), puis à
nouveau sur **Commit changes** dans la fenêtre qui s'ouvre.

**C'est fait.** Attendez une minute et rechargez la page `/adopter` du site.

---

## Le détail des champs

| Champ | Obligatoire | À écrire |
| --- | --- | --- |
| `nom` | oui | Le nom du cheval, tel qu'il doit s'afficher |
| `statut` | oui | `"vente"`, `"adoption"` ou `"adoption-directe"` |
| `resume` | oui | Une ou deux phrases. C'est le texte de la vignette |
| `annee` | non | Année de naissance, en chiffres : `2018` |
| `sexe` | non | `"hongre"`, `"jument"` ou `"entier"` |
| `robe` | non | `"Bai"`, `"Alezan"`, `"Gris"`… |
| `taille` | non | `"1,62 m"` |
| `montable` | non | `true` ou `false`, sans guillemets |
| `structure` | non | La structure d'accueil. Laissez vide pour un placement direct |
| `departement` | non | `"Oise"`, `"Calvados"`… |
| `participation` | non | `"1 500 €"`, `"Frais d'adoption"`, `"Prix sur demande"` |
| `photos` | non | La liste des photos, voir le modèle |
| `updated` | non | La date du jour, au format `2026-07-26` |

Les trois statuts correspondent aux trois formules décrites sur la page
« Adopter » :

- **`vente`** — cheval passé par une structure de reconversion accréditée ;
- **`adoption`** — cheval vieillissant ou avec des pathologies, souvent non
  montable, avec des frais d'adoption ;
- **`adoption-directe`** — cheval n'ayant pas suivi de programme de
  reconversion, sous contrat provisoire d'un an.

---

## Modifier, marquer comme placé, retirer

**Modifier une fiche** — ouvrez le fichier dans
[le dossier des chevaux](https://github.com/pocarles/passerelle-trotteurs-site/tree/main/src/content/chevaux),
cliquez sur l'icône crayon en haut à droite, faites vos changements, puis
**Commit changes**.

**Marquer un cheval comme placé** — ajoutez cette ligne dans la fiche, juste
avant les trois tirets de fermeture :

```
placed: true
```

Le cheval reste visible avec la mention « Placé », mais passe en fin de liste.
C'est utile pendant quelques semaines après un placement, pour montrer que ça
fonctionne.

**Retirer un cheval** — ouvrez le fichier, cliquez sur l'icône poubelle en haut
à droite, puis **Commit changes**. Vous pouvez laisser les photos, elles ne
gênent pas.

---

## Ajouter une actualité

Même principe.

**[Envoyer la photo de l'article](https://github.com/pocarles/passerelle-trotteurs-site/upload/main/public/media/actualites)**
puis
**[créer l'article](https://github.com/pocarles/passerelle-trotteurs-site/new/main/src/content/actualites)**.

Le nom du fichier devient l'adresse de l'article, donc écrivez-le en minuscules
sans accents : `village-race-care-a-lisieux.md`.

```markdown
---
title: "Village Race & Care à Lisieux"
date: 2026-06-07
image: "/media/actualites/lisieux.jpg"
source: "24H au Trot"
---

Le texte de l'article. Laissez une ligne vide entre chaque paragraphe.

## Un sous-titre si besoin

Pour mettre un [lien vers un site](https://exemple.fr), utilisez des crochets
puis l'adresse entre parenthèses.
```

`source` est facultatif : à remplir seulement quand l'article reprend un texte
publié ailleurs. La date s'affiche automatiquement en toutes lettres, vous
n'avez pas à l'écrire deux fois.

---

## Les pièges à connaître

**Les guillemets.** Mettez toujours le texte entre guillemets droits `"…"`.
C'est indispensable dès qu'il y a une apostrophe ou un deux-points :

```
resume: "Un cheval d'exception : sociable et volontaire."   ✅
resume: Un cheval d'exception : sociable et volontaire.     ❌
```

**Les trois tirets.** Une fiche commence par `---` et la partie du haut se
ferme par `---`. Ne les supprimez pas.

**Les décalages.** Dans la liste des photos, les deux espaces avant le tiret et
les quatre espaces avant `alt:` comptent. Le plus sûr est de copier le modèle
et de ne remplacer que les valeurs.

**`true` et `false`** s'écrivent sans guillemets et en anglais.

---

## Vérifier que c'est passé

Après chaque *Commit changes*, le site se reconstruit tout seul. Cela prend
environ une minute.

Pour voir où ça en est :
**[la page des mises en ligne](https://github.com/pocarles/passerelle-trotteurs-site/actions)**

- Un rond **jaune** : c'est en cours, patientez.
- Une coche **verte** : c'est en ligne, rechargez le site.
- Une croix **rouge** : quelque chose bloque, en général une virgule ou un
  guillemet oublié. Rien n'est cassé sur le site en ligne — il continue
  d'afficher la version précédente. Cliquez sur la ligne rouge pour voir le
  message, ou prévenez Pierre-Olivier.

Une croix rouge n'abîme jamais le site public. Dans le doute, mieux vaut
essayer que ne rien faire.
