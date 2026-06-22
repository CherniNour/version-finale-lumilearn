// ═════════════════════════════════════════════════════════════
// api.js — À inclure dans TOUTES les pages HTML avant auth.js
//
// Ce fichier centralise tous les appels fetch() vers le backend.
// Les pages HTML n'ont jamais besoin d'écrire fetch() elles-mêmes.
// ═════════════════════════════════════════════════════════════

const API = 'http://localhost:5001/api';

// ── Authentification ─────────────────────────────────────────

async function apiInscription(nom, email, motDePasse, confirmer, classe, langue) {
  const r = await fetch(`${API}/auth/inscription`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',   // envoie le cookie de session
    body: JSON.stringify({ nom, email, motDePasse, confirmer, classe, langue })
  });
  return r.json();
}

async function apiConnexion(email, motDePasse) {
  const r = await fetch(`${API}/auth/connexion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, motDePasse })
  });
  return r.json();
}

async function apiDeconnexion() {
  const r = await fetch(`${API}/auth/deconnexion`, {
    method: 'POST',
    credentials: 'include'
  });
  return r.json();
}

async function apiSession() {
  // Vérifie si une session est active — appelé au chargement de chaque page
  const r = await fetch(`${API}/auth/session`, { credentials: 'include' });
  return r.json();
}

async function apiProfil() {
  const r = await fetch(`${API}/auth/profil`, { credentials: 'include' });
  return r.json();
}

// ── Audio ────────────────────────────────────────────────────

async function apiAudios() {
  const r = await fetch(`${API}/audio`, { credentials: 'include' });
  return r.json();
}

async function apiAudiosParClasse(classe) {
  const r = await fetch(`${API}/audio/classe/${classe}`, { credentials: 'include' });
  return r.json();
}

async function apiAudiosParLangue(langue) {
  const r = await fetch(`${API}/audio/langue/${langue}`, { credentials: 'include' });
  return r.json();
}

// ── Quiz ─────────────────────────────────────────────────────

async function apiSauvegarderQuiz(matiere, classe, difficulte, score, total) {
  const r = await fetch(`${API}/quiz/resultat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ matiere, classe, difficulte, score, total })
  });
  return r.json();
}

async function apiMesResultats() {
  const r = await fetch(`${API}/quiz/mes-resultats`, { credentials: 'include' });
  return r.json();
}

// ── Contact ──────────────────────────────────────────────────

async function apiContact(nom, email, sujet, message) {
  const r = await fetch(`${API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ nom, email, sujet, message })
  });
  return r.json();
}

