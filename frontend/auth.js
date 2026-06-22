// ═════════════════════════════════════════════════════════════
// auth.js — Gestion de l'authentification côté frontend
//
// Remplace l'ancien auth.js qui utilisait localStorage.
// Dépend de api.js (doit être chargé AVANT ce fichier).
// ═════════════════════════════════════════════════════════════

// ── Handlers de formulaires ───────────────────────────────────

async function handleLogin(event) {
  event.preventDefault();
  const email      = document.getElementById('loginEmail').value;
  const motDePasse = document.getElementById('loginPassword').value;

  // Appel API via api.js
  const data = await apiConnexion(email, motDePasse);

  if (data.success) {
    // Stocker les infos de base pour l'affichage (pas sensibles)
    localStorage.setItem('lumilearn_user', JSON.stringify(data.user));
    showSuccess(data.user.nom);
    // Redirection après 1.5 sec vers la page correspondant à la classe
    setTimeout(() => { window.location.href = data.redirection; }, 1500);
  } else {
    _showError('loginPasswordError', data.message);
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const nom        = document.getElementById('signupName').value;
  const email      = document.getElementById('signupEmail').value;
  const motDePasse = document.getElementById('signupPassword').value;
  const confirmer  = document.getElementById('confirmPassword').value;
  const classe     = document.getElementById('signupClasse')?.value || '1';
  const langue     = document.getElementById('signupLangue')?.value || 'fr';

  const data = await apiInscription(nom, email, motDePasse, confirmer, classe, langue);

  if (data.success) {
    localStorage.setItem('lumilearn_user', JSON.stringify(data.user));
    showSuccess(data.user.nom);
    setTimeout(() => { window.location.href = data.redirection; }, 1500);
  } else {
    _showError('confirmPasswordError', data.message);
  }
}

async function logout() {
  await apiDeconnexion();
  localStorage.removeItem('lumilearn_user');
  window.location.href = 'indexSIGHT_fr.html';
}

// ── Utilitaires de session ────────────────────────────────────

function getCurrentUser() {
  const s = localStorage.getItem('lumilearn_user');
  return s ? JSON.parse(s) : null;
}

function isUserLoggedIn() {
  return getCurrentUser() !== null;
}

// ── Gestion du modal ──────────────────────────────────────────

function openAuthModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('authModal');
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}

function closeModal() {
  const modal = document.getElementById('authModal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

function showLogin() {
  document.getElementById('signupForm')?.classList.remove('active');
  document.getElementById('loginForm')?.classList.add('active');
  document.getElementById('successMessage')?.classList.remove('show');
}

function showSignup() {
  document.getElementById('loginForm')?.classList.remove('active');
  document.getElementById('signupForm')?.classList.add('active');
  document.getElementById('successMessage')?.classList.remove('show');
}

function showSuccess(nom) {
  document.getElementById('loginForm')?.classList.remove('active');
  document.getElementById('signupForm')?.classList.remove('active');
  const msg = document.getElementById('successMessage');
  if (msg) {
    msg.classList.add('show');
    const txt = document.getElementById('successText');
    if (txt) txt.textContent = `Bienvenue ${nom} ! Connexion réussie 🎈`;
  }
}

function redirectAfterLogin() {
  const url = new URLSearchParams(window.location.search).get('return') || 'indexSIGHT_fr.html';
  window.location.href = url;
}

function togglePassword(id) {
  const el = document.getElementById(id);
  if (el) el.type = el.type === 'password' ? 'text' : 'password';
}

// ── Bouton header ─────────────────────────────────────────────

function updateAuthButton() {
  const user = getCurrentUser();
  document.querySelectorAll('.login-btn').forEach(btn => {
    if (user) {
      btn.textContent = `👤 ${user.nom} (Classe ${user.classe})`;
      btn.onclick = (e) => { e.preventDefault(); _toggleUserMenu(user); };
      btn.href = '#';
    } else {
      btn.textContent = '👤 Connexion';
      btn.onclick = openAuthModal;
    }
  });
}

function _toggleUserMenu(user) {
  const old = document.getElementById('userMenuPopup');
  if (old) { old.remove(); return; }

  const div = document.createElement('div');
  div.id = 'userMenuPopup';
  div.style.cssText = `
    position:fixed;top:70px;right:20px;background:white;border-radius:15px;
    padding:20px;box-shadow:0 10px 40px rgba(0,0,0,0.2);z-index:1000;
    min-width:220px;font-family:'Poppins',sans-serif;
  `;
  div.innerHTML = `
    <div style="text-align:center;margin-bottom:15px;">
      <div style="font-size:40px;">👤</div>
      <h4 style="margin:5px 0;color:#FF91AF;">${user.nom}</h4>
      <p style="font-size:0.85em;color:#666;margin:0;">${user.email}</p>
      <span style="display:inline-block;background:#FFE5F1;color:#FF91AF;
        padding:3px 12px;border-radius:20px;font-size:0.8em;margin-top:5px;">
        🏫 Classe ${user.classe}
      </span>
    </div>
    <hr style="border:none;border-top:1px solid #e0e0e0;margin:12px 0;">
    <button onclick="logout()" style="
      width:100%;padding:12px;background:#f44336;color:white;
      border:none;border-radius:10px;cursor:pointer;font-weight:600;
      font-family:'Poppins',sans-serif;">
      🚪 Déconnexion
    </button>`;
  document.body.appendChild(div);
  setTimeout(() => document.addEventListener('click', _closeMenuOutside), 100);
}

function _closeMenuOutside(e) {
  const menu = document.getElementById('userMenuPopup');
  if (menu && !menu.contains(e.target) && !e.target.classList.contains('login-btn')) {
    menu.remove();
    document.removeEventListener('click', _closeMenuOutside);
  }
}

function _showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

// ── Initialisation au chargement ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateAuthButton();

  // Vérifier la session côté serveur au chargement de chaque page
  apiSession().then(data => {
    if (!data.connecte && getCurrentUser()) {
      // La session a expiré — nettoyer le localStorage
      localStorage.removeItem('lumilearn_user');
      updateAuthButton();
    } else if (data.connecte && data.user) {
      localStorage.setItem('lumilearn_user', JSON.stringify(data.user));
      updateAuthButton();
    }
  }).catch(() => {
    // Backend non disponible — ne rien faire (mode hors-ligne)
  });

  // Fermer le modal en cliquant à l'extérieur
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  }
});