const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaiementSchema = new Schema({
  contratId: {
    type: Schema.Types.ObjectId,
    ref: 'Contrat',
    required: true
  },
  montant: {
    type: Number,
    required: true
  },
  datePaiement: {
    type: Date,
    required: true
  },
  methodePaiement: {
    type: String,
    enum: ['virement', 'cheque', 'especes', 'prélèvement', 'carte'],
    required: true
  },
  referenceTransaction: {
    type: String,
    trim: true
  },
  moisConcerne: {
    type: String,
    required: true
  },
  statut: {
    type: String,
    enum: ['en attente', 'payé', 'rejeté'],
    default: 'en attente'
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

module.exports = mongoose.model('Paiement', PaiementSchema);