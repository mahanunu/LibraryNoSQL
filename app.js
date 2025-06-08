const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importer les routes
const statsRouter = require('./routes/stats');

const app = express();

// Configuration de base
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connexion à MongoDB établie avec succès');
}).catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
});

// Configuration des routes
app.use('/api/stats', statsRouter);

// Route pour les livres
app.get('/api/books', async (req, res) => {
    const Book = require('./models/Book');
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des livres' });
    }
});

// Route de test principale
app.get('/api/test', (req, res) => {
    res.json({ message: 'Le serveur fonctionne correctement' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/api/stats/test`);
}); 