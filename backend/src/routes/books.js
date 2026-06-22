const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books?grade=1&subject=Mathématiques
router.get('/', async (req, res) => {
  try {
    const { grade, subject } = req.query;
    const filter = { isActive: true };
    if (grade) filter.gradeLevel = parseInt(grade);
    if (subject) filter.subject = subject;

    const books = await Book.find(filter).sort({ gradeLevel: 1, subject: 1 });
    res.json({ success: true, count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/books/grade/:level
router.get('/grade/:level', async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    if (level < 1 || level > 6) {
      return res.status(400).json({ success: false, message: 'Niveau entre 1 et 6' });
    }
    const books = await Book.find({ gradeLevel: level, isActive: true }).sort({ subject: 1 });
    res.json({ success: true, grade: level, count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Livre non trouvé' });
    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/books (pour ajouter un livre manuellement)
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;