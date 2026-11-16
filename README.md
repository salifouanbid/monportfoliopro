# Portfolio — Anbid Salifou

Portfolio personnel statique en HTML, CSS et JavaScript, publié avec GitHub Pages.

La version actuelle privilégie une direction éditoriale sobre et durable : typographie contrastée, grille structurée, couleurs restreintes et animations limitées à l'essentiel. L'emplacement portrait dans le hero est volontairement vide afin de recevoir une future photo professionnelle sans modifier la mise en page.

## Fonctionnalités

- Présentation bilingue français / anglais avec préférence conservée dans le navigateur
- Thème clair / sombre
- Effet machine à écrire discret dans le hero
- Parcours académique, compétences et projets avec liens GitHub vérifiés
- Aperçus visuels des projets sans photo personnelle
- Diaporamas automatiques des projets (rotation toutes les 5 secondes), notamment les 7 captures du Cahier de vacances
- Snake en C présenté avec un visuel dédié
- Téléchargement du CV PDF
- Formulaire de contact qui prépare un e-mail dans le client de messagerie
- Assistant FAQ local, sans API ni collecte de données
- Boutons LinkedIn, GitHub, e-mail, WhatsApp et retour en haut
- Navigation responsive sur mobile

## Structure

```
index.html       structure et contenu de la page
style.css        système visuel, responsive et thèmes
script.js        traductions, thème, frappe, FAQ et interactions
images/          captures d'écran des projets
assets/          CV PDF
```

## Lancer localement

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000>.

## Modifier la photo plus tard

Le bloc `.portrait-slot` dans `index.html` est la zone réservée. Pour ajouter une photo, remplacer son contenu par une balise `<img>` et conserver le conteneur afin de préserver les proportions et les repères graphiques.

## Déploiement

Le dépôt est publié depuis la branche `main` avec GitHub Pages :
<https://salifouanbid.github.io/monportfoliopro/>
