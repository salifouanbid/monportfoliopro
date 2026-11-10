# Portfolio — Anbid Salifou

Site personnel statique (HTML, CSS, JavaScript), sans framework ni étape de build.
Il présente mon parcours, mes compétences et mes projets, en français et en anglais, avec un thème clair et un thème sombre.

## Structure

```
index.html       contenu de la page
style.css        mise en forme (thèmes clair et sombre via variables CSS)
script.js        navigation, thème, traductions FR/EN, formulaire, diaporamas
images/          captures d'écran des projets
assets/          CV en PDF
```

## Lancer le site en local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```
python -m http.server 8000
```

puis aller sur http://localhost:8000.

## Modifier le contenu

- **Textes** : chaque texte traduisible porte un attribut `data-i18n="clé"` dans `index.html`. Les traductions FR et EN se trouvent dans l'objet `TRADUCTIONS` de `script.js` : modifier les deux langues en même temps.
- **Projets** : copier une carte `project-card` dans `index.html` et ajouter ses clés de titre/description dans `TRADUCTIONS`.
- **Couleurs** : variables au début de `style.css` (`:root` pour le thème sombre, `.light-theme` pour le clair).

## Formulaire de contact

Sans configuration, l'envoi ouvre l'application de messagerie avec le message prérempli.
Pour recevoir les messages directement, créer un formulaire sur [Formspree](https://formspree.io) et renseigner son URL dans l'attribut `data-endpoint` du formulaire (`index.html`).

## Déploiement

Le site est publié depuis la branche `main` avec GitHub Pages (Settings → Pages → Deploy from a branch → `main` / racine).
Les noms de fichiers sont sensibles à la casse sur GitHub Pages : `assets/cv-anbid-salifou.pdf` doit être écrit exactement ainsi dans `index.html`.
