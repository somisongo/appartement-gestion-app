const express = require('express');
const immeubleController = require('../controllers/immeubleController');
const router = express.Router();

/**
 * @route   GET /api/immeubles
 * @desc    Récupérer tous les immeubles
 * @access  Public
 */
router.get('/', immeubleController.getAllImmeubles);

/**
 * @route   GET /api/immeubles/:id
 * @desc    Récupérer un immeuble par son ID
 * @access  Public
 */
router.get('/:id', immeubleController.getImmeubleById);

/**
 * @route   GET /api/immeubles/:id/appartements
 * @desc    Récupérer les appartements d'un immeuble
 * @access  Public
 */
router.get('/:id/appartements', immeubleController.getImmeubleAppartements);

/**
 * @route   GET /api/immeubles/:id/stats
 * @desc    Récupérer les statistiques d'un immeuble
 * @access  Public
 */
router.get('/:id/stats', immeubleController.getImmeubleStats);

/**
 * @route   POST /api/immeubles
 * @desc    Créer un nouvel immeuble
 * @access  Private
 */
router.post('/', immeubleController.createImmeuble);

/**
 * @route   PUT /api/immeubles/:id
 * @desc    Mettre à jour un immeuble
 * @access  Private
 */
router.put('/:id', immeubleController.updateImmeuble);

/**
 * @route   DELETE /api/immeubles/:id
 * @desc    Supprimer un immeuble
 * @access  Private
 */
router.delete('/:id', immeubleController.deleteImmeuble);

module.exports = router;