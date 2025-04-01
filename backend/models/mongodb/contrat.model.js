const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContratSchema = new Schema({
  appartementId: {
    type: Schema.Types.ObjectId,
    ref: 'Appartement',
    required: true
  },
  locataireId: {
    type: Schema.Types.ObjectId,
    ref: 'Locataire',
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  loyer: {
    type: Number,
    required: true
  },
  charges: {
    type: Number,
    required: true
  },
  depotGarantie: {
    type: Number,
    required: true
  },
  etatLieuxEntree: {
    type: String,
    trim: true
  },
  signatureLocataire: {
    type: Boolean,
    default: false
  },
  signatureBailleur: {
    type: Boolean,
    default: false
  },
  renouvellementAuto: {
    type: Boolean,
    default: false
  },
  actif: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contrat', ContratSchema);