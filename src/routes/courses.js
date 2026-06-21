const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { estConnecte, estAdminOuProf } = require('../middleware/session');

// GET /api/courses — Tous les cours (filtrables par grade/subject)
router.get('/', async (req, res) => {
  try {
    const { grade, subject, teacher } = req.query;
    const filter = { isPublished: true };
    
    if (grade) filter.gradeLevel = parseInt(grade);
    if (subject) filter.subject = subject;
    if (teacher) filter.teacherId = teacher;

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .populate('teacherId', 'nom email');

    res.json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/courses/my-courses — Cours du prof connecté
router.get('/my-courses', estConnecte, async (req, res) => {
  try {
    const courses = await Course.find({ teacherId: req.session.user.id })
      .sort({ createdAt: -1 });
    res.json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/courses/:id — Un cours spécifique
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacherId', 'nom email');
    if (!course) return res.status(404).json({ success: false, message: 'Cours non trouvé' });
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/courses — Créer un cours (prof/admin uniquement)
router.post('/', estConnecte, estAdminOuProf, async (req, res) => {
  try {
    const { title, description, subject, gradeLevel } = req.body;
    
    const course = new Course({
      title,
      description,
      subject,
      gradeLevel: parseInt(gradeLevel),
      teacherId: req.session.user.id,
      teacherName: req.session.user.nom || req.session.user.email
    });

    await course.save();
    res.status(201).json({ success: true, data: course, message: 'Cours créé avec succès !' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/courses/:id — Modifier un cours
router.put('/:id', estConnecte, estAdminOuProf, async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, teacherId: req.session.user.id },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!course) {
      // Admin peut modifier n'importe quel cours
      if (req.session.user.role === 'admin') {
        const adminCourse = await Course.findByIdAndUpdate(
          req.params.id,
          { ...req.body, updatedAt: Date.now() },
          { new: true, runValidators: true }
        );
        if (!adminCourse) return res.status(404).json({ success: false, message: 'Cours non trouvé' });
        return res.json({ success: true, data: adminCourse, message: 'Cours mis à jour !' });
      }
      return res.status(403).json({ success: false, message: 'Vous ne pouvez modifier que vos propres cours' });
    }
    
    res.json({ success: true, data: course, message: 'Cours mis à jour !' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/courses/:id — Supprimer un cours
router.delete('/:id', estConnecte, estAdminOuProf, async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      teacherId: req.session.user.id
    });
    
    if (!course && req.session.user.role === 'admin') {
      const adminCourse = await Course.findByIdAndDelete(req.params.id);
      if (!adminCourse) return res.status(404).json({ success: false, message: 'Cours non trouvé' });
      return res.json({ success: true, message: 'Cours supprimé !' });
    }
    
    if (!course) return res.status(403).json({ success: false, message: 'Non autorisé' });
    
    res.json({ success: true, message: 'Cours supprimé !' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/courses/:id/files — Ajouter un fichier à un cours
router.post('/:id/files', estConnecte, estAdminOuProf, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Cours non trouvé' });
    
    // Vérifier que c'est bien le prof du cours (ou admin)
    if (course.teacherId.toString() !== req.session.user.id && req.session.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    // Les fichiers sont gérés par multer dans server.js
    // Ici on met juste à jour les métadonnées
    const files = req.files?.map(f => ({
      filename: f.filename,
      originalName: f.originalname,
      mimeType: f.mimetype,
      size: f.size,
      url: `/uploads/courses/${f.filename}`
    })) || [];

    course.files.push(...files);
    course.updatedAt = Date.now();
    await course.save();

    res.json({ success: true, data: course, message: `${files.length} fichier(s) ajouté(s)` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;