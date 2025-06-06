const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/librarynosql', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à MongoDB établie avec succès');
}).catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
  process.exit(1);
});

// Routes API
app.get('/api/books', async (req, res) => {
  const Book = require('./models/Book');
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des livres' });
  }
});

// Route pour récupérer tous les utilisateurs
app.get('/api/users', async (req, res) => {
  const User = require('./models/User');
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

module.exports = app;
