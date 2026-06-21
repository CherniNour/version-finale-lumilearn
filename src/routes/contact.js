// ─────────────────────────────────────────────────────────────
// ROUTES CONTACT
//
// POST /api/contact        → envoyer un message (public)
// GET  /api/contact        → lire tous les messages (admin seul)
// ─────────────────────────────────────────────────────────────
const express = require('express');
const Contact = require('../models/Contact');
const { estAdmin } = require('../middleware/session');

const router = express.Router();

// ════════════════════════════════════════════════════════════
// POST /api/contact  (public — pas besoin d'être connecté)
// Corps : { nom, email, sujet, message }
// ════════════════════════════════════════════════════════════
router.post('/', async (req, res) => {
  const { nom, email, sujet, message } = req.body;

  // Validations simples
  if (!nom || nom.trim().length < 2) {
    return res.status(400).json({ success:false, message:'Le prénom doit avoir au moins 2 caractères.' });
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success:false, message:'Email invalide.' });
  }
  if (!sujet || sujet.trim().length < 3) {
    return res.status(400).json({ success:false, message:'Le sujet doit avoir au moins 3 caractères.' });
  }
  if (!message || message.trim().length < 10) {
    return res.status(400).json({ success:false, message:'Le message doit avoir au moins 10 caractères.' });
  }

  try {
    const contact = await Contact.create({ nom, email, sujet, message });
    res.status(201).json({
      success: true,
      message: `Merci ${nom} ! Votre message a bien été reçu 💌`,
      id: contact._id
    });
  } catch (err) {
    res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// GET /api/contact  (admin seulement)
// ════════════════════════════════════════════════════════════
router.get('/', estAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success:true, total: messages.length, messages });
  } catch (err) {
    res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

module.exports = router;