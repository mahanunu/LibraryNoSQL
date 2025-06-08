const mongoose = require('mongoose');
const Book = require('../models/Book');

mongoose.connect('mongodb://localhost:27017/library')
  .then(() => console.log('Connecté à MongoDB pour le seeding'))
  .catch(err => console.error('Erreur de connexion:', err));

const books = [
  {
    title: "BIONICLE CHRONICLES #2: Beware the Bohrok",
    slogan: "Wake one, you wake them all...",
    auteur: "C.A. Hapka",
    editeur: "Scholastic",
    collection: "BIONICLE CHRONICLES",
    numero_de_collection: 2,
    univers: "BIONICLE",
    langue: "Anglais",
    genre: "Science-fiction jeunesse",
    resume: "Une aventure dans l'univers des BIONICLE, où le réveil d'un Bohrok peut déclencher une réaction en chaîne...",
    couverture: "https://example.com/bionicle.jpg",
    copyright: "© LEGO Group",
    prix: 15.99,
    isbn: 9780439501835
  },
  {
    title: "L'Essentiel du vocabulaire allemand",
    slogan: "Un volume à utiliser sans aucune modération",
    auteur: "Albert Findling",
    editeur: "Ellipses",
    collection: "LOGOS",
    univers: "Apprentissage des langues",
    langue: "Français",
    genre: "Manuel scolaire",
    resume: "Ouvrage destiné à apporter à un bon élève de terminale l'essentiel du vocabulaire allemand nécessaire pour le baccalauréat et les études supérieures.",
    couverture: "https://example.com/vocab-allemand.jpg",
    copyright: "© Ellipses",
    site_editeur: "www.editions-ellipses.fr",
    prix: 13.00,
    isbn: 9782729849214
  },
  {
    title: "Le Donjon de Naheulbeuk : La Geste de Gurdil",
    slogan: "Un livre-aventure à jouer avec des dés !",
    auteur: "John Lang & Gabriel Féraud",
    editeur: "Le Grimoire",
    collection: "Le Donjon de Naheulbeuk",
    univers: "Fantasy humoristique",
    langue: "Français",
    genre: "Livre-jeu",
    resume: "L'histoire d'un Nain capable de courir vite et de voyager loin dans son épopée formidable. Un livre-jeu où vous incarnez Gurdil et créez votre propre histoire.",
    couverture: "https://example.com/gurdil.jpg",
    illustration: "Illustrée par Guillaume Albin",
    copyright: "© Le Grimoire",
    site_editeur: "LEGRIMOIRE.net",
    prix: 21.00,
    isbn: 9791092700114
  }
];

async function seedBooks() {
    try {
        // Supprime tous les livres existants
        await Book.deleteMany({});
        console.log('Base de données nettoyée');

        // Ajoute les nouveaux livres
        await Book.insertMany(books);
        console.log('Livres ajoutés avec succès');

        // Ferme la connexion
        mongoose.connection.close();
    } catch (error) {
        console.error('Erreur lors du seeding:', error);
        mongoose.connection.close();
    }
}

seedBooks(); 