// ─────────────────────────────────────────────────────────────
// MIDDLEWARE : vérification de session
// Utilisé pour protéger les routes qui nécessitent d'être connecté
// ─────────────────────────────────────────────────────────────
/**
 * Vérifie que l'utilisateur est connecté (session active)
 */
function estConnecte(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ success: false, message: 'Connexion requise.' });
}

/**
 * Vérifie que l'utilisateur est admin
 */
function estAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ success: false, message: 'Accès réservé aux administrateurs.' });
}

/**
 * Vérifie que l'utilisateur est admin OU professeur
 */
function estAdminOuProf(req, res, next) {
  if (req.session && req.session.user) {
    const role = req.session.user.role;
    if (role === 'admin' || role === 'prof') {
      return next();
    }
  }
  res.status(403).json({ success: false, message: 'Accès réservé aux enseignants et administrateurs.' });
}

module.exports = { estConnecte, estAdmin, estAdminOuProf };