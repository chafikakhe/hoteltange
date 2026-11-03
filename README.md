# Dar Alma — hôtel au Maroc (concept local)

React + TypeScript + Vite + GSAP / ScrollTrigger. Une identité originale et provisoire, indépendante de toute autre marque. Aucun déploiement.

## Démarrer

```sh
npm install
npm run dev -- --port 5190
```

Ouvrir http://127.0.0.1:5190. Pour la version de production : `npm run build`, puis `npm run preview`.

## Personnaliser

`src/config.ts` centralise le nom, la destination, l’adresse, l’e-mail, le téléphone, les tarifs, les suites, les étapes de la journée, les légendes et chemins des photographies. Le nom « Dar Alma » est provisoire. Les coordonnées `.example` ne sont pas des coordonnées réelles. Les autres textes éditoriaux et l’interface se trouvent dans `src/main.tsx`, la direction artistique dans `src/style.css`. Modifier aussi le titre et la description dans `index.html` et le favicon dans `public/favicon.svg`.

Les suites, prestations et expériences sont des propositions illustratives et sont identifiées comme telles. Aucun classement officiel, avis, prix ou disponibilité n’est revendiqué. Remplacer les images d’ambiance par les images approuvées de votre hôtel, puis adapter les descriptions aux prestations effectivement proposées.

## Photographies et polices

Tous les fichiers utilisés sont locaux : `public/images` et `public/fonts`.

- `entrance.jpg` : la photographie exacte fournie, retrouvée dans l’onglet de recherche de l’utilisateur ; source originale : https://www.ahstatic.com/photos/b6a9_ho_02_p_1024x768.jpg. Photographie conservée, aucune conversion vectorielle ni illustration. Il s’agit d’une référence photographique ; elle n’établit pas l’identité du concept.
- Les neuf nouvelles photographies WebP ont un rôle précis : salon du palais, chambre, résidence, piscine de jour, petit-déjeuner marocain, hammam, soin, restaurant du soir et table de tajines. Leurs chemins, descriptions et points de cadrage sont centralisés dans `src/config.ts`.
- Architecture, chambre, salon, piscine et soins : photographies de référence provenant de la galerie officielle de Fairmont Tazi Palace, le bâtiment de la photographie fournie. Elles restent des références illustratives pour cette identité provisoire indépendante.
- Petit-déjeuner : photographie de terrasse du site officiel du Riad L’Aziza ; table marocaine : photographie du restaurant Argan publiée sur 974qa.net. Les légendes décrivent les scènes montrées, sans attribuer ces lieux au concept.
- Sources exactes de chaque image : `public/images/sources.json`. Les images sont servies localement et optimisées en WebP ; l’original d’entrée reste intact.
- Polices locales : Cormorant Garamond et Manrope, distribuées via Google Fonts (SIL Open Font License).

Les droits de réutilisation de la photographie fournie doivent être établis avant une éventuelle publication.

## Film au défilement et musique

L’ancienne introduction automatique, son zoom photographique et sa mémorisation de session ont été supprimés. Le fichier fourni par l’utilisateur est conservé dans `public/vedio/Hostess_welcoming_at_hotel_entrance_08afd95f.mp4`. Sa version optimisée pour le défilement est `public/video/welcome-scroll.mp4` (H.264, 24 images/s, image clé toutes les 6 images, faststart, sans piste audio originale). Le poster est extrait de sa première image.

`src/ScrollFilm.tsx` affiche le film de 8 secondes dans une section CSS sticky. La position de défilement est convertie directement en `video.currentTime`, sans lecture automatique ni interpolation temporelle : arrêt du scroll = arrêt du film ; remontée = retour dans le film. La séquence occupe 3,5 hauteurs d’écran, avec un minimum de 2 400 pixels, réglable avec `hotel.film.scrollScreens` dans `src/config.ts`. Après la dernière image, la section se libère naturellement et le site continue dans le document. « Aller à la maison » permet de passer directement au site, et « Revoir le film » de revenir au début. Aucun blocage global du scroll.

Sur les écrans portrait, le cadrage suit progressivement le passage de la porte à l’hôtesse. En mode mouvements réduits, le film est proposé en lecture manuelle avec les contrôles natifs et sans section longue épinglée.

Le jazz démarre à la fin du film avec un fondu de volume de 1,6 seconde vers 22 %. Le titre « Airport Lounge » de Kevin MacLeod est servi localement en AAC/M4A. Les crédits et la licence CC BY 4.0 sont dans le pied de page et `public/audio/CREDITS.md`. Le navigateur peut interdire le démarrage sonore après un simple geste de molette : dans ce cas, « Activer le jazz » permet de le lancer. Un clic sur « Jazz à l’arrivée » pendant le film prépare cette autorisation sans jouer de musique audible avant l’arrivée. Le bouton permet aussi de couper le son. La musique se met en pause en revenant dans le film ou en masquant l’onglet.

La section « Une journée ici » conserve son horloge, sa photographie changeante et sa frise inspirées de https://large-independence-620217.framer.app/. Sur mobile ou avec mouvements réduits, la frise reste directement interactive.

## Réservation et galerie

Le formulaire valide les dates et le nombre de voyageurs et affiche un récapitulatif local. Il ne transmet aucune donnée, ne vérifie aucune disponibilité, ne confirme aucune réservation et ne prend aucun paiement. Aucun backend ou service tiers n’est configuré. Les fenêtres utilisent des dialogues natifs avec fermeture Échap et gestion du focus. La galerie dispose de filtres, boutons précédent/suivant et navigation au clavier.

## Vérifications réalisées

- Compilation TypeScript et build Vite réussis.
- Revue visuelle Chrome à 1470 × 745 et 390 × 844 ; pas de débordement horizontal.
- Photographie originale conservée dans le site ; le film fourni remplace le zoom d’entrée.
- Défilement naturel et progression de la section épinglée vérifiés sur ordinateur.
- Menu mobile, filtre galerie, agrandissement et photo suivante vérifiés.
- Film : progression au défilement, image figée à l’arrêt, retour en arrière et passage au site vérifiés dans Chrome. Ancienne introduction supprimée.
- Mouvement réduit : film en lecture manuelle et absence de long épinglage. Jazz : activation après refus d’autoplay, lecture et coupure testées.
- Réservation démo testée avec arrivée le 10/12/2026, départ le 14/12/2026 et 3 voyageurs : 4 nuits, aucun envoi.

## Révision de la sélection photographique

Les anciennes images génériques ont été remplacées. Les quatre moments de la journée ont chacun une photographie distincte et un texte correspondant à la scène. La galerie propose huit vues thématiques ; les liens des deux hébergements ouvrent leur image respective. Cadrages vérifiés en desktop et à 390 px ; chargement local et build TypeScript/Vite validés.
# hoteltange
