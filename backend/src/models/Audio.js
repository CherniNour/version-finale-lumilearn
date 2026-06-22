// ─────────────────────────────────────────────────────────────
// COLLECTION : audios
// Chaque document = un livre audio disponible sur la plateforme
// ─────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    // Chemin relatif vers le fichier MP3, ex: "Audio/Earth.mp3"
    // Le backend sert ce fichier statiquement depuis public/
    fichier: {
      type: String,
      required: true
    },
    // 0 = tous niveaux, 1-6 = classe spécifique
    niveau: {
      type: Number,
      default: 0,
      min: 0,
      max: 6
    },
    langue: {
      type: String,
      enum: ['fr', 'ar', 'en'],
      default: 'fr'
    },
    emoji: {
      type: String,
      default: '🎧'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Audio', audioSchema);