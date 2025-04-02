# Application de Gestion d'Appartements

Application web data-driven pour la gestion d'appartements, de locataires, de contrats et de paiements.

## Fonctionnalités

- Gestion des immeubles et appartements
- Suivi des locataires et des contrats
- Gestion des paiements et rappels automatiques
- Suivi des incidents et des réparations
- Reporting et tableaux de bord analytiques
- Export des données (PDF, Excel)

## Technologies

### Backend
- Node.js avec Express
- PostgreSQL
- JSON Web Tokens (JWT) pour l'authentification

### Frontend
- React
- Material-UI
- Charts.js pour les graphiques

## Installation et démarrage

### Prérequis
- Node.js (v14+)
- PostgreSQL
- npm ou yarn

### Installation manuelle

```bash
# Cloner le repository
git clone https://github.com/somisongo/appartement-gestion-app.git
cd appartement-gestion-app

# Installer les dépendances globales
npm install

# Installer les dépendances du backend
cd backend
npm install

# Installer les dépendances du frontend
cd ../frontend
npm install
```

### Configuration

Les fichiers `.env` sont déjà configurés avec les paramètres suivants :

- Backend (port 3002) : `backend/.env`
- Frontend (port 3001) : `frontend/.env`

Si vous avez besoin de modifier ces ports, mettez à jour les fichiers `.env` correspondants.

### Démarrage rapide

Pour démarrer l'application en une seule commande :

**Windows** :
```bash
# À la racine du projet
start-app.bat
```

**Linux/Mac** :
```bash
# À la racine du projet
chmod +x start-app.sh
./start-app.sh
```

### Démarrage manuel

```bash
# Démarrer le backend (depuis la racine du projet)
cd backend
npm run dev

# Démarrer le frontend (dans un autre terminal)
cd frontend
npm start
```

## Accès à l'application

- Backend : http://localhost:3002
- Frontend : http://localhost:3001

Pour la démo, vous pouvez utiliser n'importe quel email et mot de passe pour vous connecter.
Note : Utilisez "erreur@test.com" pour tester l'erreur de connexion.

## Développement

Cette application est en phase de développement. Consultez les [issues GitHub](https://github.com/somisongo/appartement-gestion-app/issues) pour voir les fonctionnalités à venir.