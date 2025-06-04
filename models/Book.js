import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  auteur: {
    type: String,
    required: true,
    trim: true
  },
  editeur: String,
  collection: String,
  numero_de_collection: Number,
  univers: String,
  langue: String,
  genre: String,
  resume: {
    type: String,
    maxlength: 2000
  },
  code_barres: {
    type: Number,
    unique: true,
    sparse: true
  },
  couverture: String, // URL image
  copyright: String,
  illustration: String,
  site_editeur: String,
  prix: Number,
  isbn: {
    type: Number,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
