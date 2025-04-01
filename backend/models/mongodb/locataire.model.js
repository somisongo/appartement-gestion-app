const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocataireSchema = new Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Format d\'email invalide']
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  dateNaissance: {
    type: Date,
    required: true
  },
  profession: {
    type: String,
    trim: true
  },
  revenuMensuel: {
    type: Number
  },
  dateInscription: {
    type: Date,
    default: Date.now
  },
  documents: [{
    type: String,
    trim: true
  }],
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

module.exports = mongoose.model('Locataire', LocataireSchema);