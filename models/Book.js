const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  auteur: {
    type: String,
    required: true
  },
  isbn: {
    type: Number,
    required: true,
    unique: true
  },
  slogan: String,
  editeur: String,
  collection: String,
  numero_de_collection: Number,
  univers: String,
  langue: {
    type: String,
    default: 'Français'
  },
  genre: String,
  resume: String,
  couverture: String,
  illustration: String,
  copyright: String,
  site_editeur: String,
  prix: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema); 