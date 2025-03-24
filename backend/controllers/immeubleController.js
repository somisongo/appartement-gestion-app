const Immeuble = require('../models/immeuble');

/**
 * Contrôleur pour les immeubles
 */
const immeubleController = {
  /**
   * Récupère tous les immeubles
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async getAllImmeubles(req, res) {
    try {
      const immeubles = await Immeuble.findAll();
      res.status(200).json({ success: true, data: immeubles });
    } catch (error) {
      console.error('Erreur lors de la récupération des immeubles:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des immeubles',
        error: error.message,
      });
    }
  },

  /**
   * Récupère un immeuble par son ID
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async getImmeubleById(req, res) {
    try {
      const immeuble = await Immeuble.findById(req.params.id);
      
      if (!immeuble) {
        return res.status(404).json({
          success: false,
          message: 'Immeuble non trouvé',
        });
      }
      
      res.status(200).json({ success: true, data: immeuble });
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'immeuble ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'immeuble',
        error: error.message,
      });
    }
  },

  /**
   * Récupère les appartements d'un immeuble
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async getImmeubleAppartements(req, res) {
    try {
      const immeuble = await Immeuble.findById(req.params.id);
      
      if (!immeuble) {
        return res.status(404).json({
          success: false,
          message: 'Immeuble non trouvé',
        });
      }
      
      const appartements = await Immeuble.getAppartements(req.params.id);
      res.status(200).json({ success: true, data: appartements });
    } catch (error) {
      console.error(`Erreur lors de la récupération des appartements de l'immeuble ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des appartements',
        error: error.message,
      });
    }
  },

  /**
   * Crée un nouvel immeuble
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async createImmeuble(req, res) {
    try {
      // Validation des données
      const { nom, adresse, ville, code_postal, pays } = req.body;
      
      if (!nom || !adresse || !ville || !code_postal || !pays) {
        return res.status(400).json({
          success: false,
          message: 'Veuillez fournir toutes les informations requises',
        });
      }
      
      const newImmeuble = await Immeuble.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Immeuble créé avec succès',
        data: newImmeuble[0],
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'immeuble:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de l\'immeuble',
        error: error.message,
      });
    }
  },

  /**
   * Met à jour un immeuble
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async updateImmeuble(req, res) {
    try {
      const immeuble = await Immeuble.findById(req.params.id);
      
      if (!immeuble) {
        return res.status(404).json({
          success: false,
          message: 'Immeuble non trouvé',
        });
      }
      
      const updatedImmeuble = await Immeuble.update(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Immeuble mis à jour avec succès',
        data: updatedImmeuble[0],
      });
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'immeuble ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de l\'immeuble',
        error: error.message,
      });
    }
  },

  /**
   * Supprime un immeuble
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async deleteImmeuble(req, res) {
    try {
      const immeuble = await Immeuble.findById(req.params.id);
      
      if (!immeuble) {
        return res.status(404).json({
          success: false,
          message: 'Immeuble non trouvé',
        });
      }
      
      await Immeuble.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Immeuble supprimé avec succès',
      });
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'immeuble ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de l\'immeuble',
        error: error.message,
      });
    }
  },

  /**
   * Récupère les statistiques d'un immeuble
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async getImmeubleStats(req, res) {
    try {
      const immeuble = await Immeuble.findById(req.params.id);
      
      if (!immeuble) {
        return res.status(404).json({
          success: false,
          message: 'Immeuble non trouvé',
        });
      }
      
      const stats = await Immeuble.getStats(req.params.id);
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      console.error(`Erreur lors de la récupération des statistiques de l'immeuble ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des statistiques',
        error: error.message,
      });
    }
  }
};

module.exports = immeubleController;