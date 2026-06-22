// ─────────────────────────────────────────────────────────────
// ROUTES AUDIO
//
// GET /api/audio              → tous les audios
// GET /api/audio/classe/:n    → audios adaptés à une classe (+ niveau 0)
// GET /api/audio/langue/:l    → audios par langue (fr/ar/en)
// ─────────────────────────────────────────────────────────────
const express = require('express');
const Audio   = require('../models/Audio');

const router = express.Router();

// ════════════════════════════════════════════════════════════
// GET /api/audio
// Retourne TOUS les livres audio, triés par titre
// ════════════════════════════════════════════════════════════
router.get('/', async (req, res) => {
  try {
    const audios = await Audio.find().sort({ titre: 1 });
    res.json({ success:true, total: audios.length, audios });
  } catch (err) {
    res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// GET /api/audio/classe/:n
// Retourne les audios pour une classe donnée ET les niveau=0 (tous niveaux)
// Exemple : /api/audio/classe/3  → audios de niveau 3 + niveau 0
// ════════════════════════════════════════════════════════════
router.get('/classe/:n', async (req, res) => {
  const n = Number(req.params.n);
  if (!n || n < 1 || n > 6) {
    return res.status(400).json({ success:false, message:'Classe invalide (1 à 6).' });
  }
  try {
    const audios = await Audio.find({
      $or: [{ niveau: n }, { niveau: 0 }]
    }).sort({ titre: 1 });
    res.json({ success:true, classe: n, total: audios.length, audios });
  } catch (err) {
    res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// GET /api/audio/langue/:l
// Filtre par langue — utile pour audio_ar.html
// ════════════════════════════════════════════════════════════
router.get('/langue/:l', async (req, res) => {
  const l = req.params.l;
  if (!['fr','ar','en'].includes(l)) {
    return res.status(400).json({ success:false, message:'Langue invalide (fr, ar, en).' });
  }
  try {
    const audios = await Audio.find({ langue: l }).sort({ titre: 1 });
    res.json({ success:true, langue: l, total: audios.length, audios });
  } catch (err) {
    res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

module.exports = router;