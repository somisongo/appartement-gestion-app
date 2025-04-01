/**
 * Script d'importation des données de test dans MongoDB
 * 
 * Usage: node import-mongodb-data.js
 */

require('dotenv').config();
const { connectDB, mongoose } = require('../config/mongodb');
const fs = require('fs');
const path = require('path');

// Modèles
const Appartement = require('../models/mongodb/appartement.model');
const Locataire = require('../models/mongodb/locataire.model');
const Contrat = require('../models/mongodb/contrat.model');
const Paiement = require('../models/mongodb/paiement.model');
const Maintenance = require('../models/mongodb/maintenance.model');

// Données de test
const testData = {
  appartements: [
    {
      numero: "A101",
      adresse: "12 Rue de la Paix, 75002 Paris",
      etage: 1,
      superficie: 65,
      nbChambres: 2,
      nbSallesDeBain: 1,
      loyer: 1200,
      charges: 150,
      disponible: false,
      amenagements: ["cuisine équipée", "balcon", "parking"],
      dateConstruction: "2010-05-15"
    },
    {
      numero: "A102",
      adresse: "12 Rue de la Paix, 75002 Paris",
      etage: 1,
      superficie: 45,
      nbChambres: 1,
      nbSallesDeBain: 1,
      loyer: 900,
      charges: 100,
      disponible: true,
      amenagements: ["cuisine équipée"],
      dateConstruction: "2010-05-15"
    },
    {
      numero: "B201",
      adresse: "24 Avenue Victor Hugo, 75016 Paris",
      etage: 2,
      superficie: 85,
      nbChambres: 3,
      nbSallesDeBain: 2,
      loyer: 1800,
      charges: 200,
      disponible: false,
      amenagements: ["cuisine équipée", "balcon", "parking", "cave"],
      dateConstruction: "2015-11-03"
    },
    {
      numero: "B202",
      adresse: "24 Avenue Victor Hugo, 75016 Paris",
      etage: 2,
      superficie: 70,
      nbChambres: 2,
      nbSallesDeBain: 1,
      loyer: 1500,
      charges: 180,
      disponible: true,
      amenagements: ["cuisine équipée", "parking"],
      dateConstruction: "2015-11-03"
    },
    {
      numero: "C301",
      adresse: "5 Boulevard Haussmann, 75009 Paris",
      etage: 3,
      superficie: 110,
      nbChambres: 4,
      nbSallesDeBain: 2,
      loyer: 2200,
      charges: 250,
      disponible: false,
      amenagements: ["cuisine équipée", "terrasse", "parking", "cave", "gardien"],
      dateConstruction: "2008-07-22"
    }
  ],
  locataires: [
    {
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@email.com",
      telephone: "0612345678",
      dateNaissance: "1980-03-15",
      profession: "Ingénieur",
      revenuMensuel: 3500,
      dateInscription: "2023-01-10",
      documents: ["piece_identite", "justificatif_domicile", "bulletins_salaire"]
    },
    {
      nom: "Martin",
      prenom: "Sophie",
      email: "sophie.martin@email.com",
      telephone: "0687654321",
      dateNaissance: "1985-07-22",
      profession: "Médecin",
      revenuMensuel: 4200,
      dateInscription: "2023-02-05",
      documents: ["piece_identite", "justificatif_domicile", "bulletins_salaire"]
    },
    {
      nom: "Lefebvre",
      prenom: "Pierre",
      email: "pierre.lefebvre@email.com",
      telephone: "0678901234",
      dateNaissance: "1992-11-30",
      profession: "Avocat",
      revenuMensuel: 3800,
      dateInscription: "2023-03-20",
      documents: ["piece_identite", "justificatif_domicile", "bulletins_salaire"]
    },
    {
      nom: "Dubois",
      prenom: "Marie",
      email: "marie.dubois@email.com",
      telephone: "0645678901",
      dateNaissance: "1988-05-11",
      profession: "Architecte",
      revenuMensuel: 3600,
      dateInscription: "2023-04-15",
      documents: ["piece_identite", "justificatif_domicile", "bulletins_salaire"]
    },
    {
      nom: "Bernard",
      prenom: "Thomas",
      email: "thomas.bernard@email.com",
      telephone: "0623456789",
      dateNaissance: "1990-09-25",
      profession: "Consultant",
      revenuMensuel: 3300,
      dateInscription: "2023-05-02",
      documents: ["piece_identite", "justificatif_domicile", "bulletins_salaire"]
    }
  ]
};

// Fonction pour insérer les données
async function importData() {
  try {
    // Connexion à MongoDB
    const db = await connectDB();
    console.log('Connexion à MongoDB établie');

    // Suppression des données existantes
    console.log('Suppression des données existantes...');
    await Promise.all([
      Appartement.deleteMany({}),
      Locataire.deleteMany({}),
      Contrat.deleteMany({}),
      Paiement.deleteMany({}),
      Maintenance.deleteMany({})
    ]);
    console.log('✅ Données supprimées avec succès');

    // Insertion des appartements
    console.log('Insertion des appartements...');
    const appartements = await Appartement.insertMany(testData.appartements);
    console.log(`✅ ${appartements.length} appartements insérés`);

    // Insertion des locataires
    console.log('Insertion des locataires...');
    const locataires = await Locataire.insertMany(testData.locataires);
    console.log(`✅ ${locataires.length} locataires insérés`);

    // Création de contrats
    console.log('Création des contrats...');
    const contrats = await Contrat.insertMany([
      {
        appartementId: appartements[0]._id,
        locataireId: locataires[0]._id,
        dateDebut: "2023-02-01",
        dateFin: "2024-01-31",
        loyer: 1200,
        charges: 150,
        depotGarantie: 2400,
        etatLieuxEntree: "Bon état général, quelques traces d'usure normale",
        signatureLocataire: true,
        signatureBailleur: true,
        renouvellementAuto: true,
        actif: true
      },
      {
        appartementId: appartements[2]._id,
        locataireId: locataires[1]._id,
        dateDebut: "2023-03-15",
        dateFin: "2024-03-14",
        loyer: 1800,
        charges: 200,
        depotGarantie: 3600,
        etatLieuxEntree: "Très bon état, appartement récemment rénové",
        signatureLocataire: true,
        signatureBailleur: true,
        renouvellementAuto: true,
        actif: true
      },
      {
        appartementId: appartements[4]._id,
        locataireId: locataires[2]._id,
        dateDebut: "2023-05-01",
        dateFin: "2024-04-30",
        loyer: 2200,
        charges: 250,
        depotGarantie: 4400,
        etatLieuxEntree: "Parfait état, aucun dommage constaté",
        signatureLocataire: true,
        signatureBailleur: true,
        renouvellementAuto: false,
        actif: true
      }
    ]);
    console.log(`✅ ${contrats.length} contrats créés`);

    // Création de paiements
    console.log('Création des paiements...');
    const paiements = await Paiement.insertMany([
      {
        contratId: contrats[0]._id,
        montant: 1350,
        datePaiement: "2023-02-05",
        methodePaiement: "virement",
        referenceTransaction: "VIR23020501",
        moisConcerne: "2023-02",
        statut: "payé"
      },
      {
        contratId: contrats[0]._id,
        montant: 1350,
        datePaiement: "2023-03-03",
        methodePaiement: "virement",
        referenceTransaction: "VIR23030301",
        moisConcerne: "2023-03",
        statut: "payé"
      },
      {
        contratId: contrats[0]._id,
        montant: 1350,
        datePaiement: "2023-04-04",
        methodePaiement: "virement",
        referenceTransaction: "VIR23040401",
        moisConcerne: "2023-04",
        statut: "payé"
      },
      {
        contratId: contrats[1]._id,
        montant:.2000,
        datePaiement: "2023-03-15",
        methodePaiement: "prélèvement",
        referenceTransaction: "PRE23031501",
        moisConcerne: "2023-03",
        statut: "payé"
      },
      {
        contratId: contrats[1]._id,
        montant: 2000,
        datePaiement: "2023-04-15",
        methodePaiement: "prélèvement",
        referenceTransaction: "PRE23041501",
        moisConcerne: "2023-04",
        statut: "payé"
      },
      {
        contratId: contrats[2]._id,
        montant: 2450,
        datePaiement: "2023-05-02",
        methodePaiement: "virement",
        referenceTransaction: "VIR23050201",
        moisConcerne: "2023-05",
        statut: "payé"
      }
    ]);
    console.log(`✅ ${paiements.length} paiements créés`);

    // Création de demandes de maintenance
    console.log('Création des demandes de maintenance...');
    const maintenances = await Maintenance.insertMany([
      {
        appartementId: appartements[0]._id,
        locataireId: locataires[0]._id,
        dateSignalement: "2023-03-10",
        description: "Fuite d'eau sous l'évier de la cuisine",
        priorite: "moyenne",
        statut: "résolu",
        dateIntervention: "2023-03-12",
        coutReparation: 120,
        technicien: "Martin Plomberie",
        notes: "Remplacement du joint et du siphon"
      },
      {
        appartementId: appartements[2]._id,
        locataireId: locataires[1]._id,
        dateSignalement: "2023-04-05",
        description: "Problème de chauffage dans le salon",
        priorite: "haute",
        statut: "résolu",
        dateIntervention: "2023-04-06",
        coutReparation: 220,
        technicien: "Dupuis Chauffage",
        notes: "Réparation du thermostat défectueux"
      },
      {
        appartementId: appartements[4]._id,
        locataireId: locataires[2]._id,
        dateSignalement: "2023-05-20",
        description: "Volet roulant bloqué dans la chambre principale",
        priorite: "basse",
        statut: "en cours",
        dateIntervention: null,
        coutReparation: null,
        technicien: null,
        notes: "Intervention prévue le 2023-05-25"
      }
    ]);
    console.log(`✅ ${maintenances.length} demandes de maintenance créées`);

    console.log('✅ IMPORTATION TERMINÉE AVEC SUCCÈS');
    
    // Résumé des données importées
    console.log('\n📊 RÉSUMÉ DES DONNÉES IMPORTÉES:');
    console.log(`- ${appartements.length} appartements`);
    console.log(`- ${locataires.length} locataires`);
    console.log(`- ${contrats.length} contrats`);
    console.log(`- ${paiements.length} paiements`);
    console.log(`- ${maintenances.length} demandes de maintenance`);

  } catch (error) {
    console.error('❌ ERREUR LORS DE L\'IMPORTATION:', error);
  } finally {
    // Fermer la connexion à MongoDB
    mongoose.connection.close();
    console.log('🔌 Connexion MongoDB fermée');
    process.exit();
  }
}

// Exécuter la fonction d'importation
importData();