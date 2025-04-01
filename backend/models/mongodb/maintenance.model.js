const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaintenanceSchema = new Schema({
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
  dateSignalement: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  priorite: {
    type: String,
    enum: ['basse', 'moyenne', 'haute', 'urgente'],
    default: 'moyenne'
  },
  statut: {
    type: String,
    enum: ['signalé', 'en cours', 'résolu', 'annulé'],
    default: 'signalé'
  },
  dateIntervention: {
    type: Date
  },
  coutReparation: {
    type: Number
  },
  technicien: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
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

module.exports = mongoose.model('Maintenance', MaintenanceSchema);