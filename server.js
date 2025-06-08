const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Options de connexion MongoDB
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library', mongoOptions)
    .then(() => {
        console.log('Connecté à MongoDB');
        // Ne démarrer le serveur que si la connexion à MongoDB est réussie
        app.listen(PORT, () => {
            console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB:', err);
        process.exit(1);
    });

// Gestion des erreurs MongoDB
mongoose.connection.on('error', err => {
    console.error('Erreur MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB déconnecté');
});

// Routes
const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

// Route de base - sert index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
}); 