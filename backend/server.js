const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Sécurité
app.use(cors()); // Gestion des CORS
app.use(express.json()); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL-encoded
app.use(morgan('dev')); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  message: 'Trop de requêtes de cette adresse IP, veuillez réessayer après 15 minutes',
});
app.use(limiter);

// Routes - à importer ultérieurement
// Seule la route immeubles est actuellement implémentée
app.use('/api/immeubles', require('./routes/immeubles'));

// Les autres routes seront implémentées ultérieurement
// app.use('/api/appartements', require('./routes/appartements'));
// app.use('/api/locataires', require('./routes/locataires'));
// app.use('/api/contrats', require('./routes/contrats'));
// app.use('/api/paiements', require('./routes/paiements'));
// app.use('/api/incidents', require('./routes/incidents'));

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de gestion d\'appartements' });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});