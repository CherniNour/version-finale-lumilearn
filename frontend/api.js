// ═════════════════════════════════════════════════════════════
// api.js — À inclure dans TOUTES les pages HTML avant auth.js
//
// Ce fichier centralise tous les appels fetch() vers le backend.
// Les pages HTML n'ont jamais besoin d'écrire fetch() elles-mêmes.
// ═════════════════════════════════════════════════════════════

//const API = 'http://localhost:5001/api';


const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5001'
  : 'https://lumilearn-api.onrender.com';
// ── Authentification ─────────────────────────────────────────

async function apiInscription(nom, email, motDePasse, confirmer, classe, langue) {
  const r = await fetch(`${API_BASE}/api/auth/inscription`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',   // envoie le cookie de session
    body: JSON.stringify({ nom, email, motDePasse, confirmer, classe, langue })
  });
  return r.json();
}

async function apiConnexion(email, motDePasse) {
  const r = await fetch(`${API_BASE}/api/auth/connexion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, motDePasse })
  });
  return r.json();
}

async function apiDeconnexion() {
  const r = await fetch(`${API_BASE}/api/auth/deconnexion`, {
    method: 'POST',
    credentials: 'include'
  });
  return r.json();
}

async function apiSession() {
  // Vérifie si une session est active — appelé au chargement de chaque page
  const r = await fetch(`${API_BASE}/api/auth/session`, { credentials: 'include' });
  return r.json();
}

async function apiProfil() {
  const r = await fetch(`${API_BASE}/api/auth/profil`, { credentials: 'include' });
  return r.json();
}

// ── Audio ────────────────────────────────────────────────────

async function apiAudios() {
  const r = await fetch(`${API_BASE}/api/audio`, { credentials: 'include' });
  return r.json();
}

async function apiAudiosParClasse(classe) {
  const r = await fetch(`${API_BASE}/api/audio/classe/${classe}`, { credentials: 'include' });
  return r.json();
}

async function apiAudiosParLangue(langue) {
  const r = await fetch(`${API_BASE}/api/audio/langue/${langue}`, { credentials: 'include' });
  return r.json();
}

// ── Quiz ─────────────────────────────────────────────────────

async function apiSauvegarderQuiz(matiere, classe, difficulte, score, total) {
  const r = await fetch(`${API_BASE}/api/quiz/resultat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ matiere, classe, difficulte, score, total })
  });
  return r.json();
}

async function apiMesResultats() {
  const r = await fetch(`${API_BASE}/api/quiz/mes-resultats`, { credentials: 'include' });
  return r.json();
}

// ── Contact ──────────────────────────────────────────────────

async function apiContact(nom, email, sujet, message) {
  const r = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ nom, email, sujet, message })
  });
  return r.json();
}

