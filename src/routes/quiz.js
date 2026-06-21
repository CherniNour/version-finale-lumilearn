// ─────────────────────────────────────────────────────────────
// ROUTES QUIZ
//
// POST /api/quiz/resultat       → sauvegarder un résultat (protégé)
// GET  /api/quiz/mes-resultats  → mes résultats (protégé)
// ─────────────────────────────────────────────────────────────

const express = require('express');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const { estConnecte } = require('../middleware/session');

const router = express.Router();


// ════════════════════════════════════════════════════════════
// POST /api/quiz/resultat  (protégé)
// Corps : { matiere, classe, difficulte, score, total }
// ════════════════════════════════════════════════════════════
router.post('/resultat', estConnecte, async (req, res) => {
  try {
    const { matiere, classe, difficulte, score, total } = req.body;

    // ✔ Validation plus stricte
    if (
      !matiere ||
      !classe ||
      !difficulte ||
      score === undefined ||
      total === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'Données incomplètes.'
      });
    }

    const userId = req.session?.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non authentifié.'
      });
    }

    // ✔ Création du résultat
    const result = await QuizResult.create({
      userId,
      matiere,
      classe: Number(classe),
      difficulte,
      score: Number(score),
      total: Number(total),
      date: new Date()
    });

    // ✔ Mise à jour utilisateur (sécurisée)
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { progression: 5 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Résultat sauvegardé !',
      result,
      progression: user.progression
    });

  } catch (err) {
    console.error('Erreur /quiz/resultat:', err);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur.'
    });
  }
});


// ════════════════════════════════════════════════════════════
// GET /api/quiz/mes-resultats  (protégé)
// Retourne les résultats de l'utilisateur connecté
// ════════════════════════════════════════════════════════════
router.get('/mes-resultats', estConnecte, async (req, res) => {
  try {
    const userId = req.session?.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non authentifié.'
      });
    }

    const resultats = await QuizResult
      .find({ userId })
      .sort({ createdAt: -1 }); // plus récent en premier

    return res.json({
      success: true,
      total: resultats.length,
      resultats
    });

  } catch (err) {
    console.error('Erreur /mes-resultats:', err);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur.'
    });
  }
});
router.get('/matieres/:classe', estConnecte, async (req, res) => {
  try {
    const classe = Number(req.params.classe);

    const matieres = await Quiz.aggregate([
      { $match: { classe } },
      {
        $group: {
          _id: "$matiere"
        }
      }
    ]);

    const formatted = matieres.map(m => ({
      id: m._id,
      name: getSubjectName(m._id),
      icon: getSubjectIcon(m._id)
    }));

    res.json({
      success: true,
      matieres: formatted
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;