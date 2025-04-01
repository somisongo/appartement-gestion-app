require('dotenv').config();
const mongoose = require('mongoose');

// URI de connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestion_appartements';

// Options de connexion Mongoose
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Fonction de connexion à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('✅ Connexion à MongoDB établie avec succès');
    
    // Ajouter les listeners pour les événements de connexion
    mongoose.connection.on('error', err => {
      console.error(`❌ Erreur de connexion MongoDB: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Déconnecté de MongoDB');
    });
    
    // Gérer la fermeture propre de la connexion
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 Connexion MongoDB fermée suite à la terminaison de l\'application');
      process.exit(0);
    });
    
    return mongoose.connection;
  } catch (error) {
    console.error(`❌ Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };
