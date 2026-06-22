// ─────────────────────────────────────────────────────────────
// ROUTES AUTHENTIFICATION
//
// POST /api/auth/inscription   → créer un compte
// POST /api/auth/connexion     → se connecter
// POST /api/auth/deconnexion   → se déconnecter
// GET  /api/auth/profil        → lire son propre profil
// PUT  /api/auth/profil        → mettre à jour son profil
// ─────────────────────────────────────────────────────────────
const express = require('express');
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
const { estConnecte } = require('../middleware/session');

const router = express.Router();

// ════════════════════════════════════════════════════════════
// POST /api/auth/inscription
// Corps attendu : { nom, email, motDePasse, confirmer, classe, langue }
// ════════════════════════════════════════════════════════════
router.post('/inscription', async (req, res) => {
  const { nom, email, motDePasse, confirmer, classe, langue } = req.body;

  // ── 1. Validation des champs ─────────────────────────────
  if (!nom || !email || !motDePasse || !classe) {
    return res.status(400).json({ success:false, message:'Tous les champs sont obligatoires.' });
  }
  if (motDePasse !== confirmer) {
    return res.status(400).json({ success:false, message:'Les mots de passe ne correspondent pas.' });
  }
  if (motDePasse.length < 6) {
    return res.status(400).json({ success:false, message:'Le mot de passe doit avoir au moins 6 caractères.' });
  }
  const classeNum = Number(classe);
  if (classeNum < 1 || classeNum > 6) {
    return res.status(400).json({ success:false, message:'La classe doit être entre 1 et 6.' });
  }

  try {
    // ── 2. Vérifier si l'email existe déjà ──────────────────
    const existe = await User.findOne({ email: email.toLowerCase() });
    if (existe) {
      return res.status(409).json({ success:false, message:'Un compte avec cet email existe déjà.' });
    }

    // ── 3. Hasher le mot de passe (JAMAIS stocker en clair) ──
    const hash = await bcrypt.hash(motDePasse, 10);

    // ── 4. Créer l'utilisateur en base ───────────────────────
    const user = await User.create({
      nom,
      email: email.toLowerCase(),
      motDePasse: hash,
      classe: classeNum,
      langue: langue || 'fr'
    });

    // ── 5. Ouvrir la session (connexion automatique) ─────────
    req.session.user = {
      id:     user._id,
      nom:    user.nom,
      email:  user.email,
      classe: user.classe,
      langue: user.langue,
      role:   user.role
    };

    return res.status(201).json({
      success: true,
      message: `Bienvenue ${user.nom} ! Compte créé avec succès 🎉`,
      user: req.session.user,
      redirection: _pageAccueil(user.classe, user.langue)
    });

  } catch (err) {
    console.error('[inscription]', err.message);
    return res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// POST /api/auth/connexion
// Corps attendu : { email, motDePasse }
// ════════════════════════════════════════════════════════════
router.post('/connexion', async (req, res) => {
  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    return res.status(400).json({ success:false, message:'Email et mot de passe sont obligatoires.' });
  }

  try {
    // Chercher l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Message volontairement générique → ne pas révéler si l'email existe
      return res.status(401).json({ success:false, message:'Email ou mot de passe incorrect.' });
    }

    // Comparer le mot de passe avec le hash en base
    const correct = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!correct) {
      return res.status(401).json({ success:false, message:'Email ou mot de passe incorrect.' });
    }

    // Ouvrir la session
    req.session.user = {
      id:     user._id,
      nom:    user.nom,
      email:  user.email,
      classe: user.classe,
      langue: user.langue,
      role:   user.role
    };

    return res.json({
      success: true,
      message: `Bon retour ${user.nom} ! 🌟`,
      user: req.session.user,
      // Le frontend utilise cette valeur pour faire window.location.href
      redirection: _pageAccueil(user.classe, user.langue)
    });

  } catch (err) {
    console.error('[connexion]', err.message);
    return res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// POST /api/auth/deconnexion
// ════════════════════════════════════════════════════════════
router.post('/deconnexion', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ success:false, message:'Erreur lors de la déconnexion.' });
    res.json({ success:true, message:'Déconnexion réussie. À bientôt ! 👋' });
  });
});

// ════════════════════════════════════════════════════════════
// GET /api/auth/profil  (protégé)
// Retourne les infos complètes de l'utilisateur connecté
// ════════════════════════════════════════════════════════════
router.get('/profil', estConnecte, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id).select('-motDePasse');
    if (!user) return res.status(404).json({ success:false, message:'Utilisateur introuvable.' });
    res.json({ success:true, user });
  } catch (err) {
    res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// PUT /api/auth/profil  (protégé)
// Met à jour nom, langue ou classe
// ════════════════════════════════════════════════════════════
router.put('/profil', estConnecte, async (req, res) => {
  const { nom, langue, classe } = req.body;
  const updates = {};
  if (nom)    updates.nom    = nom;
  if (langue) updates.langue = langue;
  if (classe) updates.classe = Number(classe);

  try {
    const user = await User.findByIdAndUpdate(
      req.session.user.id,
      { $set: updates },
      { new: true, select: '-motDePasse' }
    );
    // Mettre à jour la session aussi
    Object.assign(req.session.user, updates);
    res.json({ success:true, message:'Profil mis à jour !', user });
  } catch (err) {
    res.status(500).json({ success:false, message:'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// GET /api/auth/session
// Vérifie si une session est active (utile au chargement des pages)
// ════════════════════════════════════════════════════════════
router.get('/session', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ success:true, connecte:true, user: req.session.user });
  }
  res.json({ success:true, connecte:false });
});

// ════════════════════════════════════════════════════════════
// GET /api/auth/users
// Liste tous les utilisateurs (admin ou prof seulement)
// ════════════════════════════════════════════════════════════
router.get('/users', estConnecte, async (req, res) => {
  const role = req.session.user?.role;
  if (role !== 'admin' && role !== 'prof') {
    return res.status(403).json({ success: false, message: 'Accès refusé.' });
  }
  try {
    const users = await User.find({}).select('-motDePasse').sort({ createdAt: -1 });
    return res.json({ success: true, data: users });
  } catch (err) {
    console.error('[users]', err.message);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// DELETE /api/auth/users/:id
// Supprime un utilisateur (admin seulement)
// ════════════════════════════════════════════════════════════
router.delete('/users/:id', estConnecte, async (req, res) => {
  if (req.session.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Accès refusé.' });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Compte supprimé.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// POST /api/auth/users  — Créer un compte avec rôle custom (admin)
// Corps : { nom, email, motDePasse, role, classe, langue }
// ════════════════════════════════════════════════════════════
router.post('/users', estConnecte, async (req, res) => {
  if (req.session.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Accès refusé.' });
  }
  const { nom, email, motDePasse, role, classe, langue } = req.body;
  if (!nom || !email || !motDePasse || !role) {
    return res.status(400).json({ success: false, message: 'Champs obligatoires manquants.' });
  }
  try {
    const existe = await User.findOne({ email: email.toLowerCase() });
    if (existe) return res.status(409).json({ success: false, message: 'Email déjà utilisé.' });
    const hash = await bcrypt.hash(motDePasse, 10);
    const user = await User.create({
      nom,
      email: email.toLowerCase(),
      motDePasse: hash,
      role,
      classe: classe ? Number(classe) : undefined,
      langue: langue || 'fr'
    });
    return res.status(201).json({ success: true, message: 'Compte créé.', user: { id: user._id, nom: user.nom, email: user.email, role: user.role } });
  } catch (err) {
    console.error('[users/create]', err.message);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// ════════════════════════════════════════════════════════════
// POST /api/auth/logout  (alias de /deconnexion pour le navbar)
// ════════════════════════════════════════════════════════════
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ success: false, message: 'Erreur déconnexion.' });
    res.json({ success: true, message: 'Déconnexion réussie. À bientôt ! 👋' });
  });
});

// ── Utilitaire interne ───────────────────────────────────────
// Retourne la page d'accueil selon la classe et la langue de l'étudiant
function _pageAccueil(classe, langue) {
  if (langue === 'ar') return 'indexSIGHT_ar.html';
  if (langue === 'en') return 'indexSIGHT_en.html';
  return 'indexSIGHT_fr.html';
}

module.exports = router;