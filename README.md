# Application Météo Vue
Application web permettant d'afficher les prévisions météo d'une ville renseignée par l'utilisateur.

## Installation

```sh
npm install
```

### Compiler avec rafraîchissement automatique pour le développement

```sh
npm run dev
```

### Compiler et réduire la taille pour la production

```sh
npm run build
```
## Utilisation

Pour utiliser l'application, il vous suffit de rentrer le nom de la ville dans la barre de recherche et de cliquer sur l'icône de loupe. Vous pouvez également utiliser la géolocalisation en cliquant sur le bouton "Me localiser".

L'application affichera alors les prévisions météo pour la journée en cours ainsi que pour les 7 jours suivants avec le bouton _7 jours_.

## Fonctionnement

L'application utilise l'API d'OpenWeatherMap pour récupérer les informations météorologiques de la ville recherchée.\
Le pack [fluent-emoji](https://fluentui-emoji.vercel.app/modern) (importé via un CDN) est utilisé afin d'afficher les illustrations pour la météo.\
Les icônes sont issues de [Font Awesome](https://fontawesome.com/) ainsi que de [Weather Icons](https://github.com/Weatherfonts/weather-font).
