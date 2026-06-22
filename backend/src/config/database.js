// ─────────────────────────────────────────────────────────────
// ÉTAPE 1 : Connexion à MongoDB
// Ce fichier est appelé une seule fois au démarrage du serveur
// ─────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅  MongoDB connecté  →', process.env.MONGODB_URI);
  } catch (err) {
    console.error('❌  Connexion MongoDB échouée :', err.message);
    console.error('👉  Vérifie que mongod est en cours d\'exécution');
    process.exit(1);
  }
};

module.exports = connectDB;