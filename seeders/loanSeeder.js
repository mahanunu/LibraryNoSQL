const mongoose = require('mongoose');
const Loan = require('../models/Loan');
const User = require('../models/User');
const Book = require('../models/Book');

mongoose.connect('mongodb://localhost:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB pour le seeding des emprunts'))
.catch(err => console.error('Erreur de connexion:', err));

const seedLoans = async () => {
    try {
        // Récupérer tous les utilisateurs et livres
        const users = await User.find();
        const books = await Book.find();

        if (users.length === 0) {
            throw new Error('Aucun utilisateur trouvé. Veuillez d\'abord exécuter userSeeder.js');
        }

        if (books.length === 0) {
            throw new Error('Aucun livre trouvé. Veuillez d\'abord exécuter bookSeeder.js');
        }

        // Créer des emprunts aléatoires
        const loans = [];
        
        // Pour chaque utilisateur, créer entre 1 et 5 emprunts
        for (const user of users) {
            const numberOfLoans = Math.floor(Math.random() * 5) + 1;
            
            for (let i = 0; i < numberOfLoans; i++) {
                // Sélectionner un livre aléatoire
                const randomBook = books[Math.floor(Math.random() * books.length)];
                
                // Créer un emprunt
                loans.push({
                    user: user._id,
                    book: randomBook._id,
                    loanDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Date aléatoire dans les 30 derniers jours
                    returned: Math.random() > 0.5 // 50% de chance d'être retourné
                });
            }
        }

        // Nettoyer la collection avant le seeding
        await Loan.deleteMany({});
        
        // Insérer les nouveaux emprunts
        const createdLoans = await Loan.insertMany(loans);
        console.log(`${createdLoans.length} emprunts créés avec succès`);
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Erreur lors de la création des emprunts:', error);
        mongoose.connection.close();
    }
};

seedLoans(); 