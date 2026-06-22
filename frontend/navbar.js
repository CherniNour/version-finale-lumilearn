/**
 * ============================================================
 *  LumiLearn — Navbar Component (navbar.js)
 *  Usage : <script src="navbar.js"></script>
 *           puis appel : initNavbar('fr')   // ou 'en' ou 'ar'
 *
 *  La page DOIT avoir :
 *    - Un <div id="navbar-placeholder"></div> → sera remplacé par le navbar
 *    - Le lien actif est détecté automatiquement via window.location
 *
 *  ⚠️ IMPORTANT — Navigation interne :
 *  Tous les liens du navbar (y compris le lien Admin/Prof) sont gérés
 *  en JavaScript via window.location.href, JAMAIS via target="_blank".
 *  Aucun lien interne du navbar n'ouvre de nouvel onglet.
 * ============================================================
 */

(function () {

  // ============================================================
  //  1. TRADUCTIONS
  // ============================================================
  const TRANSLATIONS = {
    fr: {
      brandText: 'LumiLearn',
      brandLogo: 'Images/Logo Lumilearn.png',
      dir: 'ltr',
      home: 'indexSIGHT_fr.html',
      links: [
        { href: 'indexSIGHT_fr.html',  label: '🏠 Accueil' },
        { href: 'audio.html',           label: '🎧 Livres Audio' },
        { href: 'livres_fr.html',       label: '📖 Livres Scolaires' },
        { href: 'kissas_fr.html',       label: '📖 Kissas' },
        { href: 'articles.html',        label: '📚 Cours' },
        { href: 'curriculum.html',      label: '🎓 Programme' },
        { href: 'wikipedia.html',       label: '🌐 Wikipedia' },
        { href: 'quiz.html',            label: '🧠 Quiz' },
        { href: 'jeux_fr.html',         label: '🎮 Jeux' },
        { href: 'contact.html',         label: '📩 Contact' },
        { href: 'apropos.html',         label: '💡 À Propos' },
      ],
      admin:  { href: 'admin_fr.html', label: '⚙️ Espace Enseignant' },
      loginHref: 'login.html',
      login:  '👤 Connexion',
      logout: '🚪 Déconnexion',
      langOptions: [
        { value: 'fr', label: '🇫🇷 FR' },
        { value: 'en', label: '🇬🇧 EN' },
        { value: 'ar', label: '🇹🇳 AR' },
      ],
    },

    en: {
      brandText: 'LumiLearn',
      brandLogo: 'Images/Logo Lumilearn.png',
      dir: 'ltr',
      home: 'indexSIGHT_en.html',
      links: [
        { href: 'indexSIGHT_en.html',  label: '🏠 Home' },
        { href: 'audio_en.html',        label: '🎧 Audio Books' },
        { href: 'livres_en.html',       label: '📖 School Books' },
        { href: 'kissas_en.html',       label: '📖 Stories' },
        { href: 'articles_en.html',     label: '📚 Courses' },
        { href: 'curriculum_en.html',   label: '🎓 Curriculum' },
        { href: 'wikipedia_en.html',    label: '🌐 Wikipedia' },
        { href: 'quiz_en.html',         label: '🧠 Quiz' },
        { href: 'jeux_en.html',         label: '🎮 Games' },
        { href: 'contact_en.html',      label: '📩 Contact' },
        { href: 'apropos_en.html',      label: '💡 About' },
      ],
      admin:  { href: 'admin_en.html', label: '⚙️ Teacher Space' },
      loginHref: 'login_en.html',
      login:  '👤 Login',
      logout: '🚪 Logout',
      langOptions: [
        { value: 'fr', label: '🇫🇷 FR' },
        { value: 'en', label: '🇬🇧 EN' },
        { value: 'ar', label: '🇹🇳 AR' },
      ],
    },

    ar: {
      brandText: 'LumiLearn',
      brandLogo: 'Images/Logo Lumilearn.png',
      dir: 'rtl',
      home: 'indexSIGHT_ar.html',
      links: [
        { href: 'indexSIGHT_ar.html',  label: '🏠 الرئيسية' },
        { href: 'audio_ar.html',         label: '🎧 كتب صوتية' },
        { href: 'livres_ar.html',       label: '📖 كتب مدرسية' },
        { href: 'kissas_ar.html',       label: '📖 قصص' },
        { href: 'articles_ar.html',        label: '📚 دروس' },
        { href: 'curriculum_ar.html',      label: '🎓 المنهج' },
        { href: 'wikipedia_ar.html',       label: '🌐 ويكيبيديا' },
        { href: 'quiz_ar.html',            label: '🧠 مسابقة' },
        { href: 'jeux_ar.html',         label: '🎮 ألعاب' },
        { href: 'contact_ar.html',         label: '📩 تواصل' },
        { href: 'apropos_ar.html',      label: '💡 من نحن' },
      ],
      admin:  { href: 'admin_ar.html', label: '⚙️ فضاء المعلم' },
      loginHref: 'login_ar.html',
      login:  '👤 تسجيل الدخول',
      logout: '🚪 خروج',
      langOptions: [
        { value: 'ar', label: '🇹🇳 AR' },
        { value: 'fr', label: '🇫🇷 FR' },
        { value: 'en', label: '🇬🇧 EN' },
      ],
    },
  };

  // ============================================================
  //  2. UTILITAIRES
  // ============================================================

  function currentPage() {
    return window.location.pathname.split('/').pop() || 'indexSIGHT_fr.html';
  }

  function switchLang(lang) {
    const page = currentPage();
    if (/_(fr|en|ar)\.html$/.test(page)) {
      navigateTo(page.replace(/_(fr|en|ar)\.html$/, `_${lang}.html`));
      return;
    }
    // Page sans suffixe (ex: audio.html) = version FR implicite.
    // On bascule vers <nom>_en.html / <nom>_ar.html, ou on reste si lang === 'fr'.
    if (lang === 'fr') return;
    const newPage = page.replace(/\.html$/, `_${lang}.html`);
    navigateTo(newPage);
  }

  // Navigation interne centralisée : toujours dans le même onglet,
  // jamais de target="_blank" pour les liens du navbar.
  function navigateTo(href) {
    window.location.href = href;
  }

  async function getSessionUser() {
    try {
      const res = await fetch('http://localhost:5001/api/auth/session', {
        credentials: 'include',
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.connecte ? data.user : null;
    } catch {
      return null;
    }
  }

  async function logoutUser() {
    try {
      await fetch('http://localhost:5001/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    window.location.reload();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function userDisplayName(user) {
    return user.nom || user.firstName || (user.email ? user.email.split('@')[0] : 'Utilisateur');
  }

  // ============================================================
  //  3. GÉNÉRATION HTML
  //  -> Le navbar est TOUJOURS identique pour tous les visiteurs.
  //     La SEULE variation conditionnelle est le lien "Espace Enseignant"
  //     (visible uniquement si user.role === 'admin' ou 'prof').
  //  -> Tous les liens utilisent data-href + un handler JS commun,
  //     pour garantir qu'aucun clic n'ouvre un nouvel onglet.
  // ============================================================

  function buildNavLinks(t) {
    const page = currentPage();
    let html = '';
    for (const link of t.links) {
      const isActive = page === link.href;
      html += `<a href="${link.href}" data-internal-link="1"${isActive ? ' class="active-link" style="background:var(--color-secondary);color:#333"' : ''}>${link.label}</a>`;
    }
    return html;
  }

  function buildAdminLink(t, user) {
    if (!user || (user.role !== 'admin' && user.role !== 'prof')) return '';
    const page = currentPage();
    const isActive = page === t.admin.href;
    return `<a href="${t.admin.href}" data-internal-link="1"${isActive ? ' class="active-link" style="background:var(--color-secondary);color:#333"' : ''} style="background:linear-gradient(135deg,#FF91AF,#6ED3CF);color:white;font-weight:600;">${t.admin.label}</a>`;
  }

  function buildUserBadge(user) {
    const name = escapeHtml(userDisplayName(user));
    return `<span class="navbar-user-badge" title="${name}">👤 ${name}</span>`;
  }

  function buildLangSelect(t, selectId) {
    let html = `<select id="${selectId}" class="lang-select" onchange="window.__navbarSwitchLang(this.value)">`;
    for (const opt of t.langOptions) {
      html += `<option value="${opt.value}"${opt.value === window.__navbarLang ? ' selected' : ''}>${opt.label}</option>`;
    }
    html += `</select>`;
    return html;
  }

  function buildMobileLinks(t, user) {
    let html = buildNavLinks(t);
    html += buildAdminLink(t, user);

    if (user) {
      html += buildUserBadge(user);
      html += `<button type="button" class="navbar-logout-btn" onclick="window.__navbarLogout()" style="cursor:pointer;border:none;background:transparent;font-family:inherit;font-size:inherit;width:100%;text-align:${t.dir === 'rtl' ? 'right' : 'left'};padding:13px 22px;">${t.logout}</button>`;
    } else {
      html += `<a href="${t.loginHref}" data-internal-link="1">${t.login}</a>`;
    }

    html += buildLangSelect(t, 'navLangSelectMobile');
    return html;
  }

  function buildDesktopLinks(t, user) {
    let html = buildNavLinks(t);
    html += buildAdminLink(t, user);

    if (user) {
      html += buildUserBadge(user);
      html += `<button type="button" class="login-btn navbar-logout-btn" onclick="window.__navbarLogout()" style="cursor:pointer;border:none;background:transparent;font-family:inherit;font-size:inherit">${t.logout}</button>`;
    } else {
      html += `<a href="${t.loginHref}" data-internal-link="1" class="login-btn">${t.login}</a>`;
    }

    html += buildLangSelect(t, 'navLangSelect');
    return html;
  }

  function buildBrand(t) {
    // Uniquement le logo, pas de texte "LumiLearn" à côté.
    // animation:none annule le "pulse" hérité de .main-header h1 (CSS global),
    // pour que le logo reste net et stable même agrandi.
    return `
      <a href="${t.home}" data-internal-link="1" class="navbar-brand-link" style="display:flex;align-items:center;text-decoration:none;">
        <img src="${t.brandLogo}" alt="${t.brandText}" class="navbar-brand-logo"
             style="height:88px;width:auto;vertical-align:middle;display:block;">
      </a>
    `;
  }

  // ============================================================
  //  4. INJECTION
  // ============================================================

  function injectNavbar(t, user) {
    const placeholder = document.getElementById('navbar-placeholder');

    const header = document.createElement('header');
    header.className = 'main-header';
    header.innerHTML = `
      <h1 style="margin:0;display:flex;align-items:center;animation:none;">${buildBrand(t)}</h1>
      <nav class="desktop-nav">${buildDesktopLinks(t, user)}</nav>
      <button type="button" class="menu-toggle" aria-label="Menu">☰</button>
    `;

    if (placeholder) {
      placeholder.replaceWith(header);
    } else {
      document.body.prepend(header);
    }

    let mobileNav = document.getElementById('mobile-nav');
    if (!mobileNav) {
      mobileNav = document.createElement('nav');
      mobileNav.id = 'mobile-nav';
      mobileNav.className = 'mobile-nav';
      header.insertAdjacentElement('afterend', mobileNav);
    }
    mobileNav.innerHTML = buildMobileLinks(t, user);

    // --- Toggle menu mobile ---
    header.querySelector('.menu-toggle').addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
    });

    // --- Navigation interne centralisée (même onglet, toujours) ---
    // On intercepte le clic gauche simple sur tous les liens du navbar
    // pour forcer une navigation classique dans le même onglet, et on
    // n'empêche pas Ctrl/Cmd+clic ni clic milieu (comportement natif du
    // navigateur que l'utilisateur attend pour ouvrir dans un onglet à part
    // s'IL le souhaite explicitement).
    [header, mobileNav].forEach((container) => {
      container.querySelectorAll('a[data-internal-link]').forEach((a) => {
        a.removeAttribute('target');
        a.addEventListener('click', (e) => {
          if (e.defaultPrevented) return;
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          navigateTo(a.getAttribute('href'));
        });
      });
    });

    // --- Direction RTL ---
    if (t.dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.removeAttribute('dir');
    }
  }

  // ============================================================
  //  5. POINT D'ENTRÉE PUBLIC
  // ============================================================

  window.initNavbar = async function (lang = 'fr') {
    window.__navbarLang = lang;
    window.__navbarSwitchLang = switchLang;
    window.__navbarLogout = logoutUser;

    const t = TRANSLATIONS[lang] || TRANSLATIONS['fr'];
    const user = await getSessionUser();
    injectNavbar(t, user);
  };

})();