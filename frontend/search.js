// Base de données de recherche
const searchDatabase = {
  audio: [
    { title: "The Little Seed", type: "audio", url: "audio.html", keywords: ["graine", "plante", "croissance", "nature"] },
    { title: "A Day at the Farm", type: "audio", url: "audio.html", keywords: ["ferme", "animaux", "campagne"] },
    { title: "How to catch a Rainbow", type: "audio", url: "audio.html", keywords: ["arc-en-ciel", "couleurs", "ciel"] },
    { title: "Planet Earth", type: "audio", url: "audio.html", keywords: ["terre", "planète", "monde", "environnement"] },
    { title: "My First Math", type: "audio", url: "audio.html", keywords: ["mathématiques", "calcul", "nombres", "compter"] },
    { title: "The Brave Little Star", type: "audio", url: "audio.html", keywords: ["étoile", "courage", "espace", "amitié"] }
  ],
  articles: [
    { title: "La Lune : Notre satellite naturel", type: "article", url: "articles.html", keywords: ["lune", "espace", "satellite", "astronomie"] },
    { title: "Les océans du monde", type: "article", url: "articles.html", keywords: ["océan", "mer", "eau", "terre"] },
    { title: "L'énergie solaire", type: "article", url: "articles.html", keywords: ["soleil", "énergie", "renouvelable", "écologie"] },
    { title: "Les dinosaures", type: "article", url: "articles.html", keywords: ["dinosaure", "préhistoire", "fossile", "reptile"] },
    { title: "L'intelligence artificielle", type: "article", url: "articles.html", keywords: ["IA", "ordinateur", "technologie", "robot"] },
    { title: "Les volcans actifs", type: "article", url: "articles.html", keywords: ["volcan", "éruption", "lave", "magma"] }
  ],
  curriculum: [
    { title: "Mathématiques 1ère année", type: "curriculum", url: "curriculum.html", keywords: ["math", "nombres", "addition", "1ère"] },
    { title: "Mathématiques 6ème année", type: "curriculum", url: "curriculum.html", keywords: ["math", "algèbre", "géométrie", "6ème"] },
    { title: "Français 1ère année", type: "curriculum", url: "curriculum.html", keywords: ["français", "alphabet", "lecture", "1ère"] },
    { title: "Sciences 3ème année", type: "curriculum", url: "curriculum.html", keywords: ["sciences", "nature", "expérience", "3ème"] },
    { title: "Histoire 5ème année", type: "curriculum", url: "curriculum.html", keywords: ["histoire", "civilisation", "passé", "5ème"] }
  ],
  wikipedia: [
    { title: "Système solaire", type: "wikipedia", url: "wikipedia.html", keywords: ["planète", "soleil", "espace", "astronomie"] },
    { title: "Photosynthèse", type: "wikipedia", url: "wikipedia.html", keywords: ["plante", "lumière", "chlorophylle", "oxygène"] },
    { title: "Volcans", type: "wikipedia", url: "wikipedia.html", keywords: ["volcan", "éruption", "lave", "montagne"] },
    { title: "L'eau", type: "wikipedia", url: "wikipedia.html", keywords: ["eau", "liquide", "h2o", "vie"] }
  ],
  pages: [
    { title: "Accueil", type: "page", url: "indexSIGHT.html", keywords: ["accueil", "home", "bienvenue"] },
    { title: "Quiz", type: "page", url: "quiz.html", keywords: ["quiz", "test", "questions", "exercices"] },
    { title: "À Propos", type: "page", url: "apropos.html", keywords: ["à propos", "about", "équipe", "ieee"] },
    { title: "Contact", type: "page", url: "contact.html", keywords: ["contact", "message", "email", "aide"] }
  ]
};

// Fonction de recherche principale
function performSearch(query) {
  if (!query || query.trim().length < 2) {
    return {
      success: false,
      message: "Veuillez entrer au moins 2 caractères",
      results: []
    };
  }

  const searchTerm = query.toLowerCase().trim();
  const results = [];
  const seen = new Set(); // Éviter les doublons

  // Recherche dans toutes les catégories
  Object.entries(searchDatabase).forEach(([category, items]) => {
    items.forEach(item => {
      // Vérifier titre
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      
      // Vérifier mots-clés
      const keywordMatch = item.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );

      // Si correspondance trouvée
      if ((titleMatch || keywordMatch) && !seen.has(item.title)) {
        seen.add(item.title);
        
        // Calculer score de pertinence
        let relevance = 0;
        if (titleMatch) relevance += 10;
        if (keywordMatch) relevance += 5;
        
        // Bonus si correspondance exacte
        if (item.title.toLowerCase() === searchTerm) relevance += 20;

        results.push({
          ...item,
          relevance,
          category: getCategoryName(category)
        });
      }
    });
  });

  // Trier par pertinence
  results.sort((a, b) => b.relevance - a.relevance);

  return {
    success: true,
    message: `${results.length} résultat(s) trouvé(s)`,
    results: results.slice(0, 10) // Max 10 résultats
  };
}

// Obtenir nom de catégorie en français
function getCategoryName(category) {
  const names = {
    audio: "📚 Livres Audio",
    articles: "📰 Articles",
    curriculum: "🎓 Programme",
    wikipedia: "🌐 Wikipedia",
    pages: "📄 Pages"
  };
  return names[category] || category;
}

// Afficher les résultats de recherche
function displaySearchResults(searchResults) {
  const resultsContainer = document.getElementById('searchResults');
  
  if (!resultsContainer) {
    console.error('Container #searchResults not found');
    return;
  }

  if (!searchResults.success || searchResults.results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Aucun résultat trouvé</h3>
        <p>Essaye avec d'autres mots-clés !</p>
      </div>
    `;
    resultsContainer.style.display = 'block';
    return;
  }

  const resultsHTML = searchResults.results.map(result => `
    <a href="${result.url}" class="search-result-item">
      <div class="result-category">${result.category}</div>
      <div class="result-title">${highlightQuery(result.title, document.getElementById('searchInput').value)}</div>
      <div class="result-keywords">
        ${result.keywords.slice(0, 3).map(k => `<span class="keyword-tag">${k}</span>`).join('')}
      </div>
    </a>
  `).join('');

  resultsContainer.innerHTML = `
    <div class="search-results-header">
      <span>${searchResults.message}</span>
      <button onclick="closeSearchResults()" class="close-search">✕</button>
    </div>
    <div class="search-results-list">
      ${resultsHTML}
    </div>
  `;
  
  resultsContainer.style.display = 'block';
}

// Mettre en surbrillance le terme recherché
function highlightQuery(text, query) {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Fermer les résultats
function closeSearchResults() {
  const resultsContainer = document.getElementById('searchResults');
  if (resultsContainer) {
    resultsContainer.style.display = 'none';
  }
}

// Initialiser la recherche sur une page
function initializeSearch() {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  if (!searchButton || !searchInput) {
    console.warn('Search elements not found on this page');
    return;
  }

  // Recherche au clic
  searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    const results = performSearch(query);
    displaySearchResults(results);
  });

  // Recherche avec Enter
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value;
      const results = performSearch(query);
      displaySearchResults(results);
    }
  });

  // Fermer en cliquant à l'extérieur
  document.addEventListener('click', (e) => {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer && 
        !resultsContainer.contains(e.target) && 
        !searchInput.contains(e.target) && 
        !searchButton.contains(e.target)) {
      closeSearchResults();
    }
  });
}

// Auto-initialisation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
  initializeSearch();
}

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { performSearch, displaySearchResults };
}