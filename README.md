# librarynosql

Système de gestion de bibliothèque avec MongoDB.

## Auteurs

Ce projet a été réalisé par le **Groupe K** :
- Kaoutar ARARE
- Mahalia PIRES
- Omar AISSI

## Description

Ce projet est une application backend pour un système de gestion de bibliothèque. Il fournit des API pour gérer les livres, les utilisateurs et les prêts. L'application est construite avec Node.js, Express, et utilise MongoDB comme base de données.

## Prérequis

- Node.js
- npm
- MongoDB

## Installation

**Branche :** Assurez-vous de travailler sur la branche `master`.

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Assurez-vous que votre instance MongoDB est en cours d'exécution sur `mongodb://127.0.0.1:27017`.

## Remplissage de la base de données (Seeding)

Pour remplir la base de données avec des données initiales, vous pouvez utiliser les scripts de "seeding".

Exécutez la commande suivante pour remplir toutes les collections :
```bash
npm run seed:all
```

Vous pouvez aussi exécuter les scripts individuellement :
```bash
npm run seed:users
npm run seed:books
npm run seed:loans
```

## Lancement de l'application

Pour démarrer le serveur, exécutez la commande suivante :
```bash
npm start
```

Pour démarrer le serveur en mode développement avec `nodemon` :
```bash
npm run dev
```

Le serveur sera lancé sur le port 3000 par défaut.

## Scripts disponibles

- `npm start`: Démarre l'application.
- `npm run dev`: Démarre l'application en mode développement.
- `npm run seed:all`: Remplit la base de données avec les utilisateurs, les livres et les prêts.
- `npm run seed:books`: Remplit la collection de livres.
- `npm run seed:users`: Remplit la collection d'utilisateurs.
- `npm run seed:loans`: Remplit la collection de prêts.

## Points de terminaison de l'API (API Endpoints)

- `GET /api/test`: Route de test pour vérifier si le serveur fonctionne.
- `GET /api/books`: Récupère la liste de tous les livres.
- `GET /api/stats/...`: Routes liées aux statistiques (voir `routes/stats.js` pour plus de détails).

Le front-end de l'application est servi depuis le dossier `public`. Vous pouvez y accéder via `http://localhost:3000`. 