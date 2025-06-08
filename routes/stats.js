const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Importer les modèles
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const User = require('../models/User');

// Route de test
router.get('/test', (req, res) => {
    console.log('Route /api/stats/test appelée');
    res.json({ message: 'Le routeur des statistiques fonctionne correctement' });
});

// Moyenne d'emprunts par client
router.get('/average-loans', async (req, res) => {
    console.log('Route /api/stats/average-loans appelée');
    try {
        const result = await Loan.aggregate([
            {
                $group: {
                    _id: '$user',
                    totalLoans: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: null,
                    averageLoans: { $avg: '$totalLoans' },
                    totalUsers: { $sum: 1 }
                }
            }
        ]);

        console.log('Résultat de l\'agrégation:', result);

        // Si aucun résultat, retourner 0
        if (!result || result.length === 0) {
            console.log('Aucun résultat trouvé');
            return res.json({
                averageLoans: 0,
                totalUsers: 0
            });
        }

        const response = {
            averageLoans: result[0].averageLoans || 0,
            totalUsers: result[0].totalUsers || 0
        };
        console.log('Réponse envoyée:', response);
        res.json(response);
    } catch (error) {
        console.error('Erreur dans /average-loans:', error);
        res.status(500).json({ message: error.message });
    }
});

// Nombre de livres empruntés par genre
router.get('/loans-by-genre', async (req, res) => {
    console.log('Route /api/stats/loans-by-genre appelée');
    try {
        const result = await Loan.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            { $unwind: '$bookDetails' },
            {
                $group: {
                    _id: '$bookDetails.genre',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        console.log('Résultat de l\'agrégation par genre:', result);

        if (!result || result.length === 0) {
            console.log('Aucun résultat trouvé pour les genres');
            return res.json([]);
        }

        console.log('Réponse envoyée pour les genres:', result);
        res.json(result);
    } catch (error) {
        console.error('Erreur dans /loans-by-genre:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 