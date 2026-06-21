// ─────────────────────────────────────────────────────────────
// COLLECTION : users
// Représente un étudiant inscrit sur LumiLearn
// ─────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'L\'email est obligatoire'],
      unique: true,       // pas deux comptes avec le même email
      lowercase: true,
      trim: true
    },
    motDePasse: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire']
      // IMPORTANT : toujours stocker le hash bcrypt, jamais le mot de passe en clair
    },
    classe: {
      type: Number,
      required: [true, 'La classe est obligatoire'],
      min: 1,
      max: 6
    },
    langue: {
      type: String,
      enum: ['fr', 'ar', 'en'],
      default: 'fr'
    },
    role: {
      type: String,
      enum: ['etudiant', 'admin'],
      default: 'etudiant'
    },
    // Score cumulé — augmente à chaque quiz réussi
    progression: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true  // ajoute createdAt + updatedAt automatiquement
  }
);

module.exports = mongoose.model('User', userSchema);