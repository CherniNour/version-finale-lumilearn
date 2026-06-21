class FavoritesManager {
  constructor() {
    this.storageKey = 'lumilearn_favorites';
    this.favorites = this.loadFavorites();
    console.log('✅ FavoritesManager initialisé', this.favorites);
  }

  loadFavorites() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {
        audio: [],
        articles: [],
        wikipedia: [],
        quiz: []
      };
    } catch (error) {
      console.error('❌ Erreur chargement favoris:', error);
      return { audio: [], articles: [], wikipedia: [], quiz: [] };
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
      console.log('💾 Favoris sauvegardés', this.favorites);
      return true;
    } catch (error) {
      console.error('❌ Erreur sauvegarde favoris:', error);
      return false;
    }
  }

  addFavorite(type, item) {
    if (!this.favorites[type]) {
      this.favorites[type] = [];
    }

    const exists = this.favorites[type].some(fav => fav.id === item.id);
    
    if (!exists) {
      this.favorites[type].push({
        id: item.id,
        title: item.title,
        url: item.url || window.location.href,
        addedAt: new Date().toISOString()
      });
      
      this.saveFavorites();
      this.showNotification('✨ Ajouté aux favoris !', 'success');
      console.log('➕ Favori ajouté:', item);
      return true;
    } else {
      this.showNotification('ℹ️ Déjà dans les favoris', 'info');
      return false;
    }
  }

  removeFavorite(type, itemId) {
    if (!this.favorites[type]) return false;

    const initialLength = this.favorites[type].length;
    this.favorites[type] = this.favorites[type].filter(fav => fav.id !== itemId);
    
    if (this.favorites[type].length < initialLength) {
      this.saveFavorites();
      this.showNotification('🗑️ Retiré des favoris', 'success');
      console.log('➖ Favori retiré:', itemId);
      return true;
    }
    
    return false;
  }

  isFavorite(type, itemId) {
    return this.favorites[type] && 
           this.favorites[type].some(fav => fav.id === itemId);
  }

  getFavorites(type) {
    return this.favorites[type] || [];
  }

  getAllFavorites() {
    return this.favorites;
  }

  countFavorites(type = null) {
    if (type) {
      return this.favorites[type]?.length || 0;
    }
    
    return Object.values(this.favorites).reduce((sum, arr) => sum + arr.length, 0);
  }

  clearAllFavorites() {
    if (confirm('Êtes-vous sûr de vouloir effacer tous vos favoris ? 🗑️')) {
      this.favorites = { audio: [], articles: [], wikipedia: [], quiz: [] };
      this.saveFavorites();
      this.showNotification('🧹 Tous les favoris ont été effacés', 'success');
      return true;
    }
    return false;
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `favorite-notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 25px',
      borderRadius: '15px',
      background: type === 'success' ? 'linear-gradient(135deg, #A8E6CF, #74C365)' : 
                  type === 'error' ? 'linear-gradient(135deg, #FFB6B9, #FF6B6B)' :
                  'linear-gradient(135deg, #FFD36E, #FFA500)',
      color: 'white',
      fontWeight: '600',
      fontSize: '1em',
      boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
      zIndex: '10000',
      animation: 'slideInRight 0.3s ease',
      fontFamily: "'Poppins', sans-serif"
    });

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  createFavoriteButton(type, item) {
    const button = document.createElement('button');
    button.className = 'favorite-btn';
    button.innerHTML = this.isFavorite(type, item.id) ? '❤️' : '🤍';
    button.title = this.isFavorite(type, item.id) ? 'Retirer des favoris' : 'Ajouter aux favoris';
    
    button.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: white;
      border: 2px solid #FF91AF;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      font-size: 1.5em;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      z-index: 10;
    `;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (this.isFavorite(type, item.id)) {
        this.removeFavorite(type, item.id);
        button.innerHTML = '🤍';
        button.title = 'Ajouter aux favoris';
      } else {
        this.addFavorite(type, item);
        button.innerHTML = '❤️';
        button.title = 'Retirer des favoris';
      }
      
      button.style.transform = 'scale(1.3)';
      setTimeout(() => button.style.transform = 'scale(1)', 200);
    });

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.15)';
      button.style.boxShadow = '0 5px 15px rgba(255, 145, 175, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
    });

    return button;
  }
}

// Créer instance globale
const favoritesManager = new FavoritesManager();
console.log('🌟 favoritesManager créé:', favoritesManager);

// ✅ SOLUTION AU CONFLIT : Utiliser un nom unique pour les styles
if (!document.getElementById('lumilearn-favorites-styles')) {
  const favoritesStyles = document.createElement('style');
  favoritesStyles.id = 'lumilearn-favorites-styles';
  favoritesStyles.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    .favorite-btn:active {
      transform: scale(0.95) !important;
    }

    .resource-card {
      position: relative !important;
    }
    
    .article-card {
      position: relative !important;
    }
  `;
  document.head.appendChild(favoritesStyles);
}

// Fonction principale d'ajout des boutons
function addFavoriteButtonsToCards() {
  console.log('🔍 Recherche des cartes pour ajouter les favoris...');
  
  let buttonsAdded = 0;

  // 1. LIVRES AUDIO
  const audioGrid = document.getElementById('audioGrid');
  if (audioGrid) {
    const audioCards = audioGrid.querySelectorAll('.resource-card');
    console.log(`📚 ${audioCards.length} cartes audio trouvées`);
    
    audioCards.forEach((card, index) => {
      if (card.querySelector('.favorite-btn')) {
        return;
      }
      
      const title = card.querySelector('h3')?.textContent || `Audio ${index + 1}`;
      const item = {
        id: `audio_${index}_${title.replace(/\s+/g, '_')}`,
        title: title,
        url: window.location.href
      };
      
      const button = favoritesManager.createFavoriteButton('audio', item);
      card.appendChild(button);
      buttonsAdded++;
      console.log(`✅ Bouton ajouté sur: ${title}`);
    });
  }

  // 2. ARTICLES
  const articlesGrid = document.getElementById('articlesGrid');
  if (articlesGrid) {
    const articleCards = articlesGrid.querySelectorAll('.article-card');
    console.log(`📰 ${articleCards.length} cartes articles trouvées`);
    
    articleCards.forEach((card, index) => {
      if (card.querySelector('.favorite-btn')) {
        return;
      }
      
      const title = card.querySelector('h3')?.textContent || `Article ${index + 1}`;
      const item = {
        id: `article_${index}_${title.replace(/\s+/g, '_')}`,
        title: title,
        url: card.querySelector('a')?.href || window.location.href
      };
      
      const button = favoritesManager.createFavoriteButton('articles', item);
      card.appendChild(button);
      buttonsAdded++;
      console.log(`✅ Bouton ajouté sur: ${title}`);
    });
  }

  // 3. WIKIPEDIA
  const wikiGrid = document.getElementById('wikiGrid');
  if (wikiGrid) {
    const wikiCards = wikiGrid.querySelectorAll('.resource-card, .wiki-card');
    console.log(`🌐 ${wikiCards.length} cartes wikipedia trouvées`);
    
    wikiCards.forEach((card, index) => {
      if (card.querySelector('.favorite-btn')) return;
      
      const title = card.querySelector('h3')?.textContent || `Wiki ${index + 1}`;
      const item = {
        id: `wiki_${index}_${title.replace(/\s+/g, '_')}`,
        title: title,
        url: card.querySelector('a')?.href || window.location.href
      };
      
      const button = favoritesManager.createFavoriteButton('wikipedia', item);
      card.appendChild(button);
      buttonsAdded++;
      console.log(`✅ Bouton ajouté sur: ${title}`);
    });
  }

  // 4. FALLBACK
  if (buttonsAdded === 0) {
    console.log('🔍 Aucun grid spécifique trouvé, recherche globale...');
    
    const allCards = document.querySelectorAll('.resource-card:not(:has(.favorite-btn)), .article-card:not(:has(.favorite-btn))');
    console.log(`🎯 ${allCards.length} cartes génériques trouvées`);
    
    allCards.forEach((card, index) => {
      const title = card.querySelector('h3')?.textContent || `Item ${index + 1}`;
      const item = {
        id: `item_${index}_${title.replace(/\s+/g, '_')}`,
        title: title,
        url: window.location.href
      };
      
      const button = favoritesManager.createFavoriteButton('audio', item);
      card.appendChild(button);
      buttonsAdded++;
      console.log(`✅ Bouton ajouté (fallback) sur: ${title}`);
    });
  }

  console.log(`🎉 Total: ${buttonsAdded} boutons favoris ajoutés`);
  
  if (buttonsAdded === 0) {
    console.warn('⚠️ Aucun bouton ajouté. Vérifiez la structure HTML.');
  }
}

// Observer les changements du DOM
const domObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      console.log('🔄 Changement détecté dans le DOM');
      setTimeout(addFavoriteButtonsToCards, 100);
    }
  });
});

// Initialisation
function initializeFavorites() {
  console.log('🚀 Initialisation du système de favoris...');
  
  addFavoriteButtonsToCards();
  
  setTimeout(() => {
    console.log('⏰ Tentative 2 après 500ms');
    addFavoriteButtonsToCards();
  }, 500);
  
  setTimeout(() => {
    console.log('⏰ Tentative 3 après 1000ms');
    addFavoriteButtonsToCards();
  }, 1000);
  
  const targetNode = document.body;
  if (targetNode) {
    domObserver.observe(targetNode, {
      childList: true,
      subtree: true
    });
    console.log('👀 Observer activé');
  }
}

// Lancement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFavorites);
} else {
  initializeFavorites();
}

// Fonction manuelle
window.addFavoriteButtons = function() {
  console.log('🔧 Ajout manuel des boutons...');
  addFavoriteButtonsToCards();
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FavoritesManager, favoritesManager };
}

console.log('✅ favorites.js chargé complètement');