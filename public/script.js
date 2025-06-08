// Configuration des notifications
toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "3000"
};

// Fonction pour charger tous les livres
async function loadBooks(searchParams = {}) {
    try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        
        // Appliquer les filtres
        let filteredBooks = books;

        // Filtre par ISBN (traitement comme chaîne de caractères)
        if (searchParams.isbn) {
            const searchIsbn = searchParams.isbn.toString().trim().replace(/[-\s]/g, '');
            filteredBooks = filteredBooks.filter(book => {
                if (!book.isbn) return false;
                const bookIsbn = book.isbn.toString().replace(/[-\s]/g, '');
                return bookIsbn.includes(searchIsbn);
            });
        }

        // Filtre par année
        if (searchParams.yearFrom || searchParams.yearTo) {
            filteredBooks = filteredBooks.filter(book => {
                if (!book.createdAt) return true;
                const bookYear = new Date(book.createdAt).getFullYear();
                if (searchParams.yearFrom && bookYear < searchParams.yearFrom) return false;
                if (searchParams.yearTo && bookYear > searchParams.yearTo) return false;
                return true;
            });
        }

        // Recherche textuelle avec pondération
        if (searchParams.searchText) {
            const searchLower = searchParams.searchText.toLowerCase().trim();
            
            // Ajouter un score à chaque livre
            filteredBooks = filteredBooks.map(book => {
                let score = 0;
                const matchTitle = book.title.toLowerCase().includes(searchLower);
                const matchAuteur = book.auteur.toLowerCase().includes(searchLower);
                const matchResume = book.resume && book.resume.toLowerCase().includes(searchLower);
                const matchGenre = book.genre && book.genre.toLowerCase().includes(searchLower);

                // Pondération des correspondances
                if (matchTitle) score += 10;
                if (matchAuteur) score += 5;
                if (matchGenre) score += 3;
                if (matchResume) score += 1;

                return { ...book, score, highlightTitle: matchTitle };
            });

            // Filtrer les livres sans correspondance et trier par score
            filteredBooks = filteredBooks
                .filter(book => book.score > 0)
                .sort((a, b) => b.score - a.score);
        }
            
        displayBooks(filteredBooks);
    } catch (error) {
        console.error('Erreur lors du chargement des livres:', error);
        toastr.error('Erreur lors du chargement des livres. Vérifiez que le serveur est bien démarré.');
    }
}

// Fonction pour afficher les livres
function displayBooks(books) {
    const booksListDiv = document.getElementById('booksList');
    booksListDiv.innerHTML = '';

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card' + (book.highlightTitle ? ' highlight-title' : '');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            ${book.slogan ? `<p class="slogan">${book.slogan}</p>` : ''}
            <div class="book-info">
                <p><strong>Auteur:</strong> ${book.auteur}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                ${book.editeur ? `<p><strong>Éditeur:</strong> ${book.editeur}</p>` : ''}
                ${book.genre ? `<p><strong>Genre:</strong> ${book.genre}</p>` : ''}
                ${book.resume ? `<p class="resume"><strong>Résumé:</strong> ${book.resume}</p>` : ''}
            </div>
            <div class="book-actions">
                <button onclick="openEditModal('${book._id}')" class="edit-btn">Modifier</button>
                <button onclick="deleteBook('${book._id}')" class="delete-btn">Supprimer</button>
            </div>
        `;
        booksListDiv.appendChild(bookCard);
    });
}

// Gestionnaire du formulaire d'ajout
document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookData = {
        title: document.getElementById('title').value.trim(),
        auteur: document.getElementById('author').value.trim(),
        isbn: document.getElementById('isbn').value.trim()
    };

    try {
        const response = await fetch('http://localhost:3000/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de l\'ajout du livre');
        }

        document.getElementById('addBookForm').reset();
        loadBooks();
        toastr.success('Livre ajouté avec succès');
    } catch (error) {
        console.error('Erreur:', error);
        toastr.error(error.message || 'Erreur lors de l\'ajout du livre');
    }
});

// Fonction pour supprimer un livre
async function deleteBook(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/books/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression');
            }

            loadBooks();
            toastr.success('Livre supprimé avec succès');
        } catch (error) {
            console.error('Erreur:', error);
            toastr.error('Erreur lors de la suppression');
        }
    }
}

// Gestion du modal
const modal = document.getElementById('editModal');
const closeBtn = document.getElementsByClassName('close')[0];

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Fonction pour ouvrir le modal de modification
async function openEditModal(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des données du livre');
        }
        const book = await response.json();

        // Champs obligatoires
        document.getElementById('editBookId').value = book._id;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuteur').value = book.auteur;
        document.getElementById('editIsbn').value = book.isbn;

        // Champs optionnels
        document.getElementById('editSlogan').value = book.slogan || '';
        document.getElementById('editEditeur').value = book.editeur || '';
        document.getElementById('editCollection').value = book.collection || '';
        document.getElementById('editNumeroCollection').value = book.numero_de_collection || '';
        document.getElementById('editUnivers').value = book.univers || '';
        document.getElementById('editLangue').value = book.langue || '';
        document.getElementById('editGenre').value = book.genre || '';
        document.getElementById('editPrix').value = book.prix || '';
        document.getElementById('editResume').value = book.resume || '';

        modal.style.display = "block";
    } catch (error) {
        console.error('Erreur:', error);
        toastr.error('Erreur lors du chargement des données du livre');
    }
}

// Gestionnaire du formulaire de modification
document.getElementById('editBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editBookId').value;
    const updatedBook = {
        // Champs obligatoires
        title: document.getElementById('editTitle').value,
        auteur: document.getElementById('editAuteur').value,
        isbn: document.getElementById('editIsbn').value,
        // Champs optionnels
        slogan: document.getElementById('editSlogan').value,
        editeur: document.getElementById('editEditeur').value,
        collection: document.getElementById('editCollection').value,
        numero_de_collection: document.getElementById('editNumeroCollection').value,
        univers: document.getElementById('editUnivers').value,
        langue: document.getElementById('editLangue').value,
        genre: document.getElementById('editGenre').value,
        prix: document.getElementById('editPrix').value,
        resume: document.getElementById('editResume').value
    };

    try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la modification');
        }

        modal.style.display = "none";
        loadBooks();
        toastr.success('Livre modifié avec succès');
    } catch (error) {
        console.error('Erreur:', error);
        toastr.error('Erreur lors de la modification');
    }
});

// Fonction pour charger les statistiques
async function loadStats() {
    try {
        // Charger la moyenne d'emprunts par client
        const averageResponse = await fetch('http://localhost:3000/api/stats/average-loans');
        const averageData = await averageResponse.json();
        document.getElementById('averageLoans').textContent = 
            averageData.averageLoans.toFixed(2) + ' livres par client';

        // Charger les emprunts par genre
        const genreResponse = await fetch('http://localhost:3000/api/stats/loans-by-genre');
        const genreData = await genreResponse.json();

        // Créer le graphique
        const ctx = document.getElementById('genreChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: genreData.map(item => item._id || 'Non catégorisé'),
                datasets: [{
                    label: 'Nombre d\'emprunts',
                    data: genreData.map(item => item.count),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        toastr.error('Erreur lors du chargement des statistiques');
    }
}

// Ajouter l'écouteur d'événements pour la recherche
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    loadStats();
    
    const searchInput = document.getElementById('searchInput');
    const isbnSearch = document.getElementById('isbnSearch');
    const yearFrom = document.getElementById('yearFrom');
    const yearTo = document.getElementById('yearTo');
    const toggleButton = document.getElementById('toggleAdvancedSearch');
    
    let debounceTimer;
    
    function updateSearch() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const searchParams = {
                searchText: searchInput.value.trim(),
                isbn: isbnSearch.value.trim(),
                yearFrom: yearFrom.value ? parseInt(yearFrom.value) : null,
                yearTo: yearTo.value ? parseInt(yearTo.value) : null
            };
            loadBooks(searchParams);
        }, 300);
    }

    // Écouteurs d'événements pour tous les champs de recherche
    [searchInput, isbnSearch, yearFrom, yearTo].forEach(input => {
        input.addEventListener('input', updateSearch);
    });

    // Afficher les filtres avancés par défaut
    const advancedSearch = document.querySelector('.advanced-search');
    advancedSearch.style.display = 'grid';
    toggleButton.classList.add('active');

    // Toggle des filtres avancés
    toggleButton.addEventListener('click', () => {
        advancedSearch.style.display = advancedSearch.style.display === 'none' ? 'grid' : 'none';
        toggleButton.classList.toggle('active');
    });
}); 