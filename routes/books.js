const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Créer un livre
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtenir tous les livres
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtenir un livre spécifique
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un livre
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un livre
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.json({ message: 'Livre supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 