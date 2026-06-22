const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subject: { type: String, required: true },
  gradeLevel: { type: Number, required: true, min: 1, max: 6 },
  description: { type: String, default: '' },
  pdfUrl: { type: String, required: true },
  coverImage: { type: String, default: '/Images/default-book.png' },
  pageCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

bookSchema.index({ gradeLevel: 1, subject: 1 });

module.exports = mongoose.model('Book', bookSchema);