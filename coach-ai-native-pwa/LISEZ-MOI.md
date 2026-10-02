# Coach AI-Native, version application (PWA)

Ce dossier contient une application web installable sur iPhone et iPad. Elle fonctionne hors ligne et enregistre vos données sur l'appareil.

## Contenu

- index.html : l'application
- manifest.webmanifest : nom, icône et affichage plein écran
- sw.js : mode hors ligne
- icons/ : icônes de l'application

## 1. Mettre le dossier en ligne

Une PWA doit être servie en HTTPS. Deux solutions gratuites, au choix.

### Netlify Drop (le plus rapide)

1. Dézippez l'archive sur votre ordinateur.
2. Ouvrez app.netlify.com/drop dans un navigateur.
3. Glissez le dossier coach-ai-native-pwa dans la zone indiquée.
4. Netlify vous donne une adresse en netlify.app. Créez un compte gratuit pour conserver le site.

### GitHub Pages

1. Créez un dépôt GitHub public et déposez-y tous les fichiers du dossier, icons compris.
2. Dans Settings, puis Pages, choisissez la branche main et le dossier racine.
3. Après quelques minutes, l'adresse apparaît en haut de la page Pages.

## 2. Installer sur iPhone ou iPad

1. Ouvrez l'adresse dans Safari.
2. Touchez le bouton Partager, puis « Sur l'écran d'accueil », puis Ajouter.
3. Lancez toujours l'application depuis son icône, jamais depuis Safari.

## 3. Vos données

- Elles sont stockées sur l'appareil, dans l'application installée. Rien n'est envoyé sur un serveur.
- L'application installée a un espace de stockage séparé de celui de Safari. Saisissez donc vos données après l'installation, depuis l'icône.
- Chaque appareil a ses propres données. Pour passer de l'iPhone à l'iPad : Exporter sur l'un (onglet Cap, section Sauvegarde), envoyez le fichier par AirDrop ou Fichiers, puis Importer sur l'autre.
- Exportez au moins une fois toutes les deux semaines. Un message « à refaire » vous le rappelle.
- Changer l'adresse du site change aussi l'espace de stockage. Exportez avant tout déménagement, puis importez à la nouvelle adresse.

## 4. Mettre à jour l'application

Remplacez les fichiers sur l'hébergeur. Pour forcer la mise à jour des icônes et du manifeste, changez la version dans sw.js (coach-ai-native-v1 devient coach-ai-native-v2).

## 5. Confidentialité

L'adresse du site est publique, mais elle ne contient que le plan général (sans aucune donnée personnelle). Vos coches, niveaux et entrées de journal restent sur votre appareil.

## 6. Ajouter plus tard la synchronisation entre appareils

Toutes les données tiennent dans un seul objet JSON, enregistré à une seule clé. On peut donc brancher un service comme Supabase ou Firebase sans modifier le reste de l'application.
