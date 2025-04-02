const express = require('express');
const router = express.Router();

// Comme nous n'avons pas encore implémenté les contrôleurs, créons des routes temporaires

/**
 * @route   GET /api/immeubles
 * @desc    Récupérer tous les immeubles
 * @access  Public
 */
router.get('/', (req, res) => {
  // Données de démo
  const immeubles = [
    {
      id: 1,
      nom: 'Résidence Les Oliviers',
      adresse: '12 Rue des Lilas',
      ville: 'Paris',
      code_postal: '75001',
      pays: 'France',
      date_construction: '2005-06-15',
      superficie_totale: 2500,
      nb_appartements: 18,
    },
    {
      id: 2,
      nom: 'Domaine des Chênes',
      adresse: '45 Avenue Victor Hugo',
      ville: 'Lyon',
      code_postal: '69001',
      pays: 'France',
      date_construction: '2010-03-22',
      superficie_totale: 3200,
      nb_appartements: 24,
    },
    {
      id: 3,
      nom: 'Le Clos Fleuri',
      adresse: '8 Rue de la Paix',
      ville: 'Marseille',
      code_postal: '13001',
      pays: 'France',
      date_construction: '2008-09-10',
      superficie_totale: 1800,
      nb_appartements: 12,
    },
    {
      id: 4,
      nom: 'Villa Belvédère',
      adresse: '120 Boulevard du Littoral',
      ville: 'Nice',
      code_postal: '06000',
      pays: 'France',
      date_construction: '2015-05-18',
      superficie_totale: 4500,
      nb_appartements: 30,
    },
    {
      id: 5,
      nom: 'Les Jardins de Bacchus',
      adresse: '25 Rue du Vignoble',
      ville: 'Bordeaux',
      code_postal: '33000',
      pays: 'France',
      date_construction: '2012-11-30',
      superficie_totale: 2800,
      nb_appartements:-20,
    },
  ];

  res.status(200).json({ success: true, data: immeubles });
});

/**
 * @route   GET /api/immeubles/:id
 * @desc    Récupérer un immeuble par son ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  // Données de démo
  const immeuble = {
    id: parseInt(req.params.id),
    nom: 'Résidence Les Oliviers',
    adresse: '12 Rue des Lilas',
    ville: 'Paris',
    code_postal: '75001',
    pays: 'France',
    date_construction: '2005-06-15',
    superficie_totale: 2500,
    notes: 'Immeuble de standing dans un quartier calme.',
    nb_appartements: 18,
    nb_appartements_occupes: 15,
    nb_appartements_disponibles: 2,
    nb_appartements_travaux: 1,
    loyer_potentiel_mensuel: 22000,
    loyer_reel_mensuel: 18500,
  };

  res.status(200).json({ success: true, data: immeuble });
});

/**
 * @route   GET /api/immeubles/:id/appartements
 * @desc    Récupérer les appartements d'un immeuble
 * @access  Public
 */
router.get('/:id/appartements', (req, res) => {
  // Données de démo
  const appartements = [
    {
      id: 101,
      numero: 'A101',
      etage: 'RDC',
      superficie: 65,
      nombre_pieces: 3,
      loyer: 900,
      charges: 150,
      statut: 'occupé',
      locataire: 'Martin Dupont',
      contrat_id: 201,
    },
    {
      id: 102,
      numero: 'A102',
      etage: 'RDC',
      superficie: 45,
      nombre_pieces: 2,
      loyer: 750,
      charges: 120,
      statut: 'occupé',
      locataire: 'Sophie Moreau',
      contrat_id: 202,
    },
    {
      id: 103,
      numero: 'A103',
      etage: 'RDC',
      superficie: 80,
      nombre_pieces: 4,
      loyer: 1200,
      charges: 200,
      statut: 'disponible',
      locataire: null,
      contrat_id: null,
    },
    {
      id: 201,
      numero: 'A201',
      etage: '1',
      superficie: 70,
      nombre_pieces: 3,
      loyer: 950,
      charges: 160,
      statut: 'occupé',
      locataire: 'Jean Martin',
      contrat_id: 203,
    },
    {
      id: 202,
      numero: 'A202',
      etage: '1',
      superficie: 50,
      nombre_pieces: 2,
      loyer: 800,
      charges: 130,
      statut: 'en travaux',
      locataire: null,
      contrat_id: null,
    },
  ];

  res.status(200).json({ success: true, data: appartements });
});

/**
 * @route   POST /api/immeubles
 * @desc    Créer un nouvel immeuble
 * @access  Private
 */
router.post('/', (req, res) => {
  // Simuler la création d'un immeuble
  const newImmeuble = {
    id: 6,
    ...req.body,
  };

  res.status(201).json({
    success: true,
    message: 'Immeuble créé avec succès',
    data: newImmeuble,
  });
});

/**
 * @route   PUT /api/immeubles/:id
 * @desc    Mettre à jour un immeuble
 * @access  Private
 */
router.put('/:id', (req, res) => {
  // Simuler la mise à jour d'un immeuble
  const updatedImmeuble = {
    id: parseInt(req.params.id),
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: 'Immeuble mis à jour avec succès',
    data: updatedImmeuble,
  });
});

/**
 * @route   DELETE /api/immeubles/:id
 * @desc    Supprimer un immeuble
 * @access  Private
 */
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Immeuble supprimé avec succès',
  });
});

module.exports = router;