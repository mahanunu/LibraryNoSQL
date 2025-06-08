const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB pour le seeding des utilisateurs'))
.catch(err => console.error('Erreur de connexion:', err));

const users = [
    {
        fullName: "Omar",
        email: "omar@email.com",
        membershipDate: new Date('2023-01-01')
    },
    {
        fullName: "Mahalia",
        email: "mahalia@email.com",
        membershipDate: new Date('2023-02-15')
    },
    {
        fullName: "Kaoutar",
        email: "kaoutar@email.com",
        membershipDate: new Date('2023-03-20')
    }
];

const seedUsers = async () => {
    try {
        await User.deleteMany({}); // Nettoyer la collection avant le seeding
        const createdUsers = await User.insertMany(users);
        console.log('Utilisateurs créés avec succès:', createdUsers);
        mongoose.connection.close();
    } catch (error) {
        console.error('Erreur lors de la création des utilisateurs:', error);
        mongoose.connection.close();
    }
};

seedUsers(); 