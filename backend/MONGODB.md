# Migration vers MongoDB pour l'Application de Gestion d'Appartements

Ce document explique comment utiliser l'application de gestion d'appartements avec MongoDB plutôt que PostgreSQL (configuration par défaut).

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- npm

## Configuration

1. Installez les dépendances MongoDB :

```bash
# Depuis le répertoire backend
npm install mongoose
```

2. Créez un fichier `.env` dans le répertoire backend avec les informations de connexion MongoDB :

```
MONGODB_URI=mongodb://localhost:27017/gestion_appartements
```

## Utilisation de MongoDB

Cette version de l'application supporte MongoDB comme alternative à PostgreSQL. Pour l'utiliser :

### 1. Démarrer le serveur avec MongoDB

```bash
# Depuis le répertoire backend
node server.mongodb.js
```

### 2. Importer les données de test

Le script d'importation permet de charger les données de test directement dans MongoDB :

```bash
# Depuis le répertoire backend
node scripts/import-mongodb-data.js
```

## Structure des modèles MongoDB

L'application utilise Mongoose comme ODM (Object Document Mapper) pour MongoDB avec les modèles suivants :

- **Appartement** : Informations sur les appartements (superficie, loyer, etc.)
- **Locataire** : Informations sur les locataires
- **Contrat** : Contrats de location entre locataires et appartements
- **Paiement** : Paiements de loyer
- **Maintenance** : Demandes d'intervention et réparations

## Différences avec la version PostgreSQL

Cette implémentation MongoDB offre les mêmes fonctionnalités que la version PostgreSQL, mais avec quelques différences :

1. **Schéma de données** : MongoDB utilise un schéma flexible bien que nous ayons défini des schémas Mongoose pour garantir la cohérence.
2. **Relations** : Au lieu de clés étrangères, nous utilisons des références d'ObjectId.
3. **Requêtes** : Les requêtes sont écrites en utilisant la syntaxe MongoDB plutôt que SQL.

## API Endpoints

Les endpoints REST restent les mêmes que dans la version PostgreSQL :

- `GET /api/appartements` - Liste tous les appartements
- `GET /api/appartements/:id` - Détails d'un appartement spécifique
- `POST /api/appartements` - Crée un nouvel appartement
- etc.

## Développement

Pour développer de nouvelles fonctionnalités avec MongoDB :

1. Créez de nouveaux modèles dans `models/mongodb/`
2. Implémentez les contrôleurs dans `controllers/mongodb/`
3. Définissez les routes dans `routes/mongodb/`

## Sécurité

Cette implémentation inclut :
- Validation des données via les schémas Mongoose
- Gestion des erreurs
- Sécurisation des requêtes

## Migration entre PostgreSQL et MongoDB

Pour migrer les données de PostgreSQL vers MongoDB, vous pouvez développer un script personnalisé utilisant Knex.js pour extraire les données de PostgreSQL et Mongoose pour les insérer dans MongoDB.
