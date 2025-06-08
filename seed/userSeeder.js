const mongoose = require('mongoose');
const User = require('../models/User');
require('../config/database');

const users = [
  {
    fullName: "Omar",
    email: "omar@gmail.com",
    membershipDate:"2025-01-01",
    isActive: true
  },
  {
    fullName: "Maha",
    email: "maha@gmail.com",
    membershipDate:"2025-01-01",
    isActive: true
  },
  {
    fullName: "kaoutar",
    email: "kaoutar@gmail.com",
    membershipDate:"2025-01-01",
    isActive: true
  }
];

const seedDB = async () => {
  try {
    // Suppression des données existantes
    await User.deleteMany({});
    console.log('Base de données nettoyée');

    // Insertion des nouvelles données
    await User.insertMany(users);
    console.log('Données de test insérées avec succès');

    // Fermeture de la connexion
    await mongoose.connection.close();
    console.log('Connexion à la base de données fermée');
  } catch (error) {
    console.error('Erreur lors du seeding :', error);
    process.exit(1);
  }
};

seedDB(); 