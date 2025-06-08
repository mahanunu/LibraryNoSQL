const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slogan: String,
  auteur: {
    type: String,
    required: true
  },
  editeur: String,
  collection: String,
  numero_de_collection: Number,
  univers: String,
  langue: {
    type: String,
    default: 'Français'
  },
  genre: String,
  resume: {
    type: String,
    maxLength: 2000
  },
  code_barres: Number,
  couverture: String,
  copyright: String,
  illustration: String,
  site_editeur: String,
  prix: {
    type: Number,
    min: 0
  },
  isbn: {
    type: Number,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
