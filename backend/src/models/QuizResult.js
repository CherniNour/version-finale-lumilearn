// ─────────────────────────────────────────────────────────────
// COLLECTION : quiz_results
// Un document par tentative de quiz — lié à un utilisateur
// ─────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema(
  {
    // Référence vers la collection users
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    matiere: {
      type: String,
      required: true  // ex: 'math', 'arabic', 'science'
    },
    classe: {
      type: Number,
      required: true
    },
    difficulte: {
      type: String,
      enum: ['facile', 'moyen', 'difficile'],
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizResult', quizResultSchema);