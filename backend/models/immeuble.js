const knex = require('knex');
const dbConfig = require('../config/database');

// Initialiser la connexion à la base de données
const db = knex(dbConfig[process.env.NODE_ENV || 'development']);

/**
 * Modèle pour les immeubles
 */
class Immeuble {
  /**
   * Récupère tous les immeubles
   * @returns {Promise<Array>} Liste des immeubles
   */
  static async findAll() {
    return db('immeubles').select('*');
  }

  /**
   * Récupère un immeuble par son ID
   * @param {number} id - ID de l'immeuble
   * @returns {Promise<Object>} Immeuble trouvé
   */
  static async findById(id) {
    return db('immeubles').where({ id }).first();
  }

  /**
   * Récupère les appartements d'un immeuble
   * @param {number} id - ID de l'immeuble
   * @returns {Promise<Array>} Liste des appartements de l'immeuble
   */
  static async getAppartements(id) {
    return db('appartements').where({ immeuble_id: id });
  }

  /**
   * Crée un nouvel immeuble
   * @param {Object} immeuble - Données de l'immeuble
   * @returns {Promise<Array>} Immeuble créé
   */
  static async create(immeuble) {
    return db('immeubles').insert(immeuble).returning('*');
  }

  /**
   * Met à jour un immeuble
   * @param {number} id - ID de l'immeuble
   * @param {Object} updates - Données à mettre à jour
   * @returns {Promise<Array>} Immeuble mis à jour
   */
  static async update(id, updates) {
    return db('immeubles')
      .where({ id })
      .update({ 
        ...updates,
        updated_at: db.fn.now()
      })
      .returning('*');
  }

  /**
   * Supprime un immeuble
   * @param {number} id - ID de l'immeuble
   * @returns {Promise<number>} Nombre de lignes supprimées
   */
  static async delete(id) {
    return db('immeubles').where({ id }).del();
  }

  /**
   * Statistiques sur un immeuble
   * @param {number} id - ID de l'immeuble
   * @returns {Promise<Object>} Statistiques de l'immeuble
   */
  static async getStats(id) {
    // Récupérer le nombre total d'appartements
    const totalAppartements = await db('appartements')
      .where({ immeuble_id: id })
      .count('id as count')
      .first();

    // Récupérer le nombre d'appartements par statut
    const statutAppartements = await db('appartements')
      .where({ immeuble_id: id })
      .select('statut')
      .count('id as count')
      .groupBy('statut');

    // Calculer le loyer total potentiel
    const loyerTotal = await db('appartements')
      .where({ immeuble_id: id })
      .sum('loyer as total')
      .first();

    return {
      totalAppartements: totalAppartements.count,
      statutAppartements,
      loyerTotal: loyerTotal.total || 0
    };
  }
}

module.exports = Immeuble;