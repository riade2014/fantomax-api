# fantomax-api

Installation:
1.Installez les dépendances du projet à l'aide de npm :
`npm install`

Configuration:

1. Créez un fichier `.env` à la racine du projet pour configurer les variables d'environnement. Vous pouvez utiliser le fichier .env.example comme modèle.

2. Construisez l'image Docker en tapant dans votre terminal:
      docker build -t fantomax-api-image 

    Exécutez le conteneur Docker 
      docker run -p 3300:3300 fantomax-api-image

npm run dev
L'API sera accessible à l'adresse http://localhost:33300.