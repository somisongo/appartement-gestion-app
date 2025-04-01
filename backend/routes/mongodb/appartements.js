const express = require('express');
const router = express.Router();
const appartementController = require('../../controllers/mongodb/appartement.controller');

// Route pour récupérer tous les appartements
router.get('/', appartementController.getAllAppartements);

// Route pour rechercher des appartements selon des critères
router.get('/search', appartementController.searchAppartements);

// Route pour récupérer un appartement par son ID
router.get('/:id', appartementController.getAppartementById);

// Route pour créer un nouvel appartement
router.post('/', appartementController.createAppartement);

// Route pour mettre à jour un appartement
router.put('/:id', appartementController.updateAppartement);

// Route pour supprimer un appartement
router.delete('/:id', appartementController.deleteAppartement);

module.exports = router;