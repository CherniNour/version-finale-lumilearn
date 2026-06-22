// ═════════════════════════════════════════════════════════════
// contact.js — Formulaire de contact connecté au backend
// Dépend de api.js (chargé avant dans contact.html)
// ═════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const submitBtn = contactForm.querySelector('.submit-btn');

  // ── Compteur de caractères pour le textarea ───────────────
  const textarea = document.getElementById('message');
  if (textarea) {
    const counter = document.createElement('div');
    counter.style.cssText = 'text-align:right;font-size:12px;color:#868E96;margin-top:5px;';
    textarea.parentElement.appendChild(counter);

    function majCompteur() {
      const n = textarea.value.length;
      counter.textContent = `${n} caractère${n > 1 ? 's' : ''}`;
      counter.style.color = n < 10 ? '#FA5252' : '#74C365';
    }
    textarea.addEventListener('input', majCompteur);
    majCompteur();
  }

  // ── Soumission du formulaire ──────────────────────────────
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nom     = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const sujet   = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation côté client
    if (nom.length < 2)     return _erreur('Le prénom doit avoir au moins 2 caractères.');
    if (!email.includes('@')) return _erreur('Email invalide.');
    if (sujet.length < 3)   return _erreur('Le sujet doit avoir au moins 3 caractères.');
    if (message.length < 10) return _erreur('Le message doit avoir au moins 10 caractères.');

    // Désactiver le bouton pendant l'envoi
    submitBtn.innerHTML   = '⏳ Envoi en cours...';
    submitBtn.disabled    = true;
    submitBtn.style.opacity = '0.7';

    try {
      // ── Appel API (api.js) ──────────────────────────────
      const data = await apiContact(nom, email, sujet, message);

      if (data.success) {
        submitBtn.innerHTML = '✅ Envoyé !';
        submitBtn.style.background = '#74C365';
        _succes(nom);
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = 'Envoyer le message 🚀';
          submitBtn.disabled  = false;
          submitBtn.style.background = '';
          submitBtn.style.opacity    = '1';
        }, 2500);
      } else {
        throw new Error(data.message);
      }

    } catch (err) {
      submitBtn.innerHTML = '❌ Erreur';
      submitBtn.style.background = '#FF6B6B';
      _erreur(err.message || 'Erreur réseau. Vérifie que le backend est démarré.');
      setTimeout(() => {
        submitBtn.innerHTML = 'Envoyer le message 🚀';
        submitBtn.disabled  = false;
        submitBtn.style.background = '';
        submitBtn.style.opacity    = '1';
      }, 2500);
    }
  });

  // ── Utilitaires affichage ─────────────────────────────────
  function _succes(nom) {
    _clearMessages();
    contactForm.insertAdjacentHTML('afterbegin', `
      <div class="form-success" style="
        background:linear-gradient(135deg,#E3F9E5,#C1F2C7);
        border-left:4px solid #74C365;padding:20px;border-radius:12px;
        margin-bottom:20px;text-align:center;">
        <div style="font-size:48px;margin-bottom:10px;">🎉</div>
        <h3 style="color:#2F9E44;margin:10px 0;">Message envoyé !</h3>
        <p style="color:#2B8A3E;">Merci ${nom} ! Nous te répondrons très bientôt 💌</p>
      </div>`);
  }

  function _erreur(msg) {
    _clearMessages();
    contactForm.insertAdjacentHTML('afterbegin', `
      <div class="form-errors" style="
        background:linear-gradient(135deg,#FFE5E5,#FFD1D1);
        border-left:4px solid #FF6B6B;padding:15px 20px;
        border-radius:12px;margin-bottom:20px;">
        <span style="font-size:20px;">⚠️</span>
        <strong style="color:#C92A2A;"> ${msg}</strong>
      </div>`);
  }

  function _clearMessages() {
    contactForm.querySelectorAll('.form-success,.form-errors').forEach(el => el.remove());
  }
});