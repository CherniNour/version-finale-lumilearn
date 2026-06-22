const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answers: { type: [String], required: true, validate: { validator: v => v.length === 4, message: 'Il faut 4 réponses' }},
  correctAnswer: { type: Number, required: true, min: 0, max: 3 },
  matiere: { type: String, required: true, enum: ['math','arabic','science','history','french','islamic','geography','civic'] },
  classe: { type: Number, required: true, min: 1, max: 6 },
  difficulte: { type: String, required: true, enum: ['facile','moyen','difficile'] },
  langue: { type: String, required: true, enum: ['fr','ar','en'], default: 'fr' },
  explication: { type: String, default: '' }
}, { timestamps: true });

QuizSchema.index({ classe: 1, matiere: 1, difficulte: 1, langue: 1 });
module.exports = mongoose.model('Quiz', QuizSchema);