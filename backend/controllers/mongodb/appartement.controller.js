const Appartement = require('../../models/mongodb/appartement.model');

// Récupérer tous les appartements
exports.getAllAppartements = async (req, res) => {
  try {
    const appartements = await Appartement.find();
    res.status(200).json(appartements);
  } catch (error) {
    console.error('Erreur lors de la récupération des appartements:', error);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un appartement par son ID
exports.getAppartementById = async (req, res) => {
  try {
    const appartement = await Appartement.findById(req.params.id);
    if (!appartement) {
      return res.status(404).json({ message: 'Appartement non trouvé' });
    }
    res.status(200).json(appartement);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'appartement:', error);
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouvel appartement
exports.createAppartement = async (req, res) => {
  try {
    const newAppartement = new Appartement(req.body);
    const appartement = await newAppartement.save();
    res.status(201).json(appartement);
  } catch (error) {
    console.error('Erreur lors de la création de l\'appartement:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un appartement
exports.updateAppartement = async (req, res) => {
  try {
    const appartement = await Appartement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!appartement) {
      return res.status(404).json({ message: 'Appartement non trouvé' });
    }
    res.status(200).json(appartement);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'appartement:', error);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un appartement
exports.deleteAppartement = async (req, res) => {
  try {
    const appartement = await Appartement.findByIdAndDelete(req.params.id);
    if (!appartement) {
      return res.status(404).json({ message: 'Appartement non trouvé' });
    }
    res.status(200).json({ message: 'Appartement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'appartement:', error);
    res.status(500).json({ message: error.message });
  }
};

// Rechercher des appartements par critères
exports.searchAppartements = async (req, res) => {
  try {
    const { disponible, nbChambresMin, loyerMax, superficie } = req.query;
    
    const query = {};
    
    if (disponible !== undefined) {
      query.disponible = disponible === 'true';
    }
    
    if (nbChambresMin) {
      query.nbChambres = { $gte: parseInt(nbChambresMin) };
    }
    
    if (loyerMax) {
      query.loyer = { $lte: parseInt(loyerMax) };
    }
    
    if (superficie) {
      query.superficie = { $gte: parseInt(superficie) };
    }
    
    const appartements = await Appartement.find(query);
    res.status(200).json(appartements);
  } catch (error) {
    console.error('Erreur lors de la recherche d\'appartements:', error);
    res.status(500).json({ message: error.message });
  }
};