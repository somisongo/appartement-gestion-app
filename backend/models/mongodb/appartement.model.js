const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppartementSchema = new Schema({
  numero: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  adresse: {
    type: String,
    required: true,
    trim: true
  },
  etage: {
    type: Number,
    required: true
  },
  superficie: {
    type: Number,
    required: true
  },
  nbChambres: {
    type: Number,
    required: true
  },
  nbSallesDeBain: {
    type: Number,
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
  disponible: {
    type: Boolean,
    default: true
  },
  amenagements: [{
    type: String,
    trim: true
  }],
  dateConstruction: {
    type: Date
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

module.exports = mongoose.model('Appartement', AppartementSchema);