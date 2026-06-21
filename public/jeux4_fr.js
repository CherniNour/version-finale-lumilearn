/* ============================================================
   LumiLearn | Conversion d'unités | jeux4_fr.js
   ============================================================ */

"use strict";

/* ── Niveaux de jeu ── */
const LEVELS = [
    { name: 'Débutant',      count: 4, pts: 10,  time: null },
    { name: 'Facile',        count: 5, pts: 15,  time: null },
    { name: 'Moyen',         count: 5, pts: 20,  time: 40   },
    { name: 'Avancé',        count: 6, pts: 25,  time: 30   },
    { name: 'Difficile',     count: 6, pts: 35,  time: 25   },
    { name: 'Professionnel', count: 6, pts: 50,  time: 20   },
    { name: 'Expert',        count: 7, pts: 70,  time: 15   },
    { name: 'Légende',       count: 7, pts: 100, time: 12   },
];

/* ── Catégories de conversion ── */
const CATEGORIES = [
    {
        name: 'Distance', emoji: '📏',
        conversions: [
            { from: 'km',  to: 'm',   factor: 1000,      fr_from: 'kilomètres',  fr_to: 'mètres'         },
            { from: 'm',   to: 'km',  factor: 0.001,     fr_from: 'mètres',      fr_to: 'kilomètres'     },
            { from: 'm',   to: 'cm',  factor: 100,       fr_from: 'mètres',      fr_to: 'centimètres'    },
            { from: 'cm',  to: 'm',   factor: 0.01,      fr_from: 'centimètres', fr_to: 'mètres'         },
            { from: 'm',   to: 'mm',  factor: 1000,      fr_from: 'mètres',      fr_to: 'millimètres'    },
            { from: 'mm',  to: 'cm',  factor: 0.1,       fr_from: 'millimètres', fr_to: 'centimètres'    },
            { from: 'km',  to: 'cm',  factor: 100000,    fr_from: 'kilomètres',  fr_to: 'centimètres'    },
        ]
    },
    {
        name: 'Poids', emoji: '⚖️',
        conversions: [
            { from: 'kg', to: 'g',   factor: 1000,      fr_from: 'kilogrammes', fr_to: 'grammes'        },
            { from: 'g',  to: 'kg',  factor: 0.001,     fr_from: 'grammes',     fr_to: 'kilogrammes'    },
            { from: 't',  to: 'kg',  factor: 1000,      fr_from: 'tonnes',      fr_to: 'kilogrammes'    },
            { from: 'kg', to: 't',   factor: 0.001,     fr_from: 'kilogrammes', fr_to: 'tonnes'         },
            { from: 'g',  to: 'mg',  factor: 1000,      fr_from: 'grammes',     fr_to: 'milligrammes'    },
            { from: 'mg', to: 'g',   factor: 0.001,     fr_from: 'milligrammes', fr_to: 'grammes'        },
        ]
    },
    {
        name: 'Température', emoji: '🌡️',
        conversions: [
            { from: 'C', to: 'K',  isFormula: true, formula: v => v + 273.15,        fr_from: 'Celsius', fr_to: 'Kelvin'    },
            { from: 'K', to: 'C',  isFormula: true, formula: v => v - 273.15,        fr_from: 'Kelvin',    fr_to: 'Celsius' },
        ]
    },
    {
        name: 'Volume', emoji: '🥛',
        conversions: [
            { from: 'L',   to: 'mL',  factor: 1000,    fr_from: 'litres',       fr_to: 'millilitres'      },
            { from: 'mL',  to: 'L',   factor: 0.001,   fr_from: 'millilitres',   fr_to: 'litres'         },
            { from: 'L',   to: 'cL',  factor: 100,     fr_from: 'litres',       fr_to: 'centilitres'     },
            { from: 'cL',  to: 'mL',  factor: 10,      fr_from: 'centilitres',  fr_to: 'millilitres'      },
            { from: 'm³',  to: 'L',   factor: 1000,    fr_from: 'mètres cubes', fr_to: 'litres'         },
            { from: 'L',   to: 'm³',  factor: 0.001,   fr_from: 'litres',       fr_to: 'mètres cubes'    },
        ]
    },
    {
        name: 'Vitesse', emoji: '🚀',
        conversions: [
            { from: 'm/s',  to: 'km/h', factor: 3.6,         fr_from: 'm/s',   fr_to: 'km/h'        },
            { from: 'km/h', to: 'm/s',  factor: 1 / 3.6,     fr_from: 'km/h',  fr_to: 'm/s'         },
            { from: 'km/h', to: 'm/min',factor: 1000 / 60,   fr_from: 'km/h',  fr_to: 'm/min'     },
            { from: 'm/min',to: 'm/s',  factor: 1 / 60,      fr_from: 'm/min', fr_to: 'm/s'       },
        ]
    },
    {
        name: 'Aire', emoji: '📐',
        conversions: [
            { from: 'km²', to: 'm²',  factor: 1000000,   fr_from: 'km carrés',      fr_to: 'mètres carrés'    },
            { from: 'm²',  to: 'km²', factor: 0.000001,  fr_from: 'mètres carrés',  fr_to: 'km carrés'     },
            { from: 'm²',  to: 'cm²', factor: 10000,     fr_from: 'mètres carrés',  fr_to: 'cm carrés'     },
            { from: 'cm²', to: 'mm²', factor: 100,       fr_from: 'cm carrés',      fr_to: 'mm carrés'     },
            { from: 'ha',  to: 'm²',  factor: 10000,     fr_from: 'hectares',       fr_to: 'mètres carrés'    },
            { from: 'm²',  to: 'ha',  factor: 0.0001,    fr_from: 'mètres carrés',  fr_to: 'hectares'       },
        ]
    },
];

const HINTS = {
    'km→m':       'Multiplier par 1000',
    'm→km':       'Diviser par 1000',
    'm→cm':       'Multiplier par 100',
    'cm→m':       'Diviser par 100',
    'm→mm':       'Multiplier par 1000',
    'mm→cm':      'Diviser par 10',
    'km→cm':      'Multiplier par 100 000',
    'kg→g':       'Multiplier par 1000',
    'g→kg':       'Diviser par 1000',
    't→kg':       'Multiplier par 1000',
    'kg→t':       'Diviser par 1000',
    'g→mg':       'Multiplier par 1000',
    'mg→g':       'Diviser par 1000',
    'C→K':        'Ajouter 273.15',
    'K→C':        'Soustraire 273.15',
    'L→mL':       'Multiplier par 1000',
    'mL→L':       'Diviser par 1000',
    'L→cL':       'Multiplier par 100',
    'cL→mL':      'Multiplier par 10',
    'm³→L':       'Multiplier par 1000',
    'L→m³':       'Diviser par 1000',
    'm/s→km/h':   'Multiplier par 3.6',
    'km/h→m/s':   'Diviser par 3.6',
    'km/h→m/min': 'Multiplier par 1000 puis diviser par 60',
    'm/min→m/s':  'Diviser par 60',
    'km²→m²':     'Multiplier par 1 000 000',
    'm²→km²':     'Diviser par 1 000 000',
    'm²→cm²':     'Multiplier par 10 000',
    'cm²→mm²':    'Multiplier par 100',
    'ha→m²':      'Multiplier par 10 000',
    'm²→ha':      'Diviser par 10 000',
    'default':    'Consulte le tableau de référence à droite',
};

/* ── État du jeu ── */
let state = {
    level: 0,
    qIdx: 0,
    score: 0,
    streak: 0,
    correct: 0,
    wrong: 0,
    answered: false,
    timerSec: 0,
    timerInt: null,
    currentQ: null,
};

/* ── Utilitaires ── */
function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

function roundSmart(v) {
    if (Math.abs(v) < 0.1)  return parseFloat(v.toFixed(4));
    if (Math.abs(v) < 1)    return parseFloat(v.toFixed(2));
    if (Math.abs(v) < 100)  return parseFloat(v.toFixed(1));
    return Math.round(v);
}

function getCatsForLevel(lvl) {
    if (lvl < 2) return [CATEGORIES[0], CATEGORIES[1]];
    if (lvl < 4) return [CATEGORIES[0], CATEGORIES[1], CATEGORIES[2], CATEGORIES[3]];
    return CATEGORIES;
}

/* ── Générer Question ── */
function generateQuestion(lvl) {
    const cats  = getCatsForLevel(lvl);
    const cat   = cats[rand(0, cats.length - 1)];
    const conv  = cat.conversions[rand(0, cat.conversions.length - 1)];

    let inputVal;
    if (conv.from === 'K') {
        inputVal = rand(280, 600); // Ensure K -> C results in positive Celsius
    } else {
        if      (lvl === 0) inputVal = rand(1, 20);
        else if (lvl === 1) inputVal = rand(5, 50);
        else if (lvl  <  4) inputVal = rand(10, 200);
        else                inputVal = rand(50, 1000);
    }

    const correct = roundSmart(conv.isFormula ? conv.formula(inputVal) : inputVal * conv.factor);

    const noise  = lvl < 3 ? 0.15 : 0.25;
    const wrongs = new Set();
    let attempts = 0;
    while (wrongs.size < 3 && attempts < 100) {
        attempts++;
        let w = roundSmart(correct * (1 + (Math.random() * noise * 2 - noise)));
        if (w !== correct && w > 0) wrongs.add(w);
    }

    // Failsafe in case we couldn't generate 3 unique wrong answers
    if (wrongs.size < 3) {
        let base = correct > 0 ? correct : 10;
        while (wrongs.size < 3) {
            let w = roundSmart(base * (1.1 + wrongs.size * 0.2));
            if (w !== correct) wrongs.add(w);
        }
    }

    const choices = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    const hintKey = `${conv.from}→${conv.to}`;

    return { inputVal, conv, correct, choices, hint: HINTS[hintKey] || HINTS.default, cat };
}

/* ── DOM: Barre de Niveaux ── */
function buildLevelBar() {
    const bar = document.getElementById('level-bar');
    bar.innerHTML = '';
    LEVELS.forEach((l, i) => {
        const d = document.createElement('div');
        d.className = 'lvl-dot' + (i < state.level ? ' done' : i === state.level ? ' active' : '');
        d.title     = l.name;
        d.textContent = i + 1;
        bar.appendChild(d);
    });
}

/* ── DOM: Série d'Étoiles ── */
function buildStreakBar() {
    const bar = document.getElementById('streak-bar');
    bar.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const s = document.createElement('div');
        s.className   = 'streak-star' + (i < state.streak ? ' lit' : '');
        s.textContent = i < state.streak ? '⭐' : '○';
        bar.appendChild(s);
    }
}

/* ── DOM: Mettre à jour Stats ── */
function updateStats() {
    document.getElementById('score-disp').textContent  = state.score;
    document.getElementById('st-correct').textContent  = state.correct;
    document.getElementById('st-wrong').textContent    = state.wrong;
    const total = state.correct + state.wrong;
    document.getElementById('st-acc').textContent      = total ? Math.round(state.correct / total * 100) + '%' : '—';
    document.getElementById('st-lvl').textContent      = state.level + 1;

    document.getElementById('lvl-badge').textContent   = `Niveau ${state.level + 1} : ${LEVELS[state.level].name}`;

    buildStreakBar();

    const pct = (state.qIdx / LEVELS[state.level].count) * 100;
    document.getElementById('prog-fill').style.width = pct + '%';
}

/* ── Minuteur ── */
function stopTimer() { clearInterval(state.timerInt); state.timerInt = null; }

function startTimer(secs) {
    stopTimer();
    state.timerSec = secs;
    const badge = document.getElementById('timer-badge');
    badge.textContent = '⏱ ' + state.timerSec;

    state.timerInt = setInterval(() => {
        state.timerSec--;
        badge.textContent = '⏱ ' + state.timerSec;

        if (state.timerSec <= 0) {
            stopTimer();
            if (!state.answered) {
                state.wrong++;
                state.streak = 0;
                showMsg(`Temps écoulé ! ⏰ Réponse : ${state.currentQ.correct} ${state.currentQ.conv.fr_to}`, 'err');
                disableAllChoices();
                state.answered = true;
                state.qIdx++;
                document.getElementById('next-btn').disabled = false;
                updateStats();
            }
        }
    }, 1000);
}

/* ── Afficher Question ── */
function renderQuestion() {
    if (state.qIdx >= LEVELS[state.level].count) { levelComplete(); return; }

    const q      = generateQuestion(state.level);
    state.currentQ = q;
    state.answered = false;

    /* Question text */
    document.getElementById('q-text').innerHTML =
        `Convertis <span class="val">${q.inputVal}</span> <span class="unit">${q.conv.fr_from}</span>` +
        ` en <span class="unit-to">${q.conv.fr_to}</span>`;

    /* Hint */
    document.getElementById('hint-text').textContent = q.hint;

    /* Choices */
    const cb = document.getElementById('choices');
    cb.innerHTML = '';
    q.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className   = 'choice-btn';
        btn.textContent = `${c} ${q.conv.fr_to}`;
        btn.addEventListener('click', () => pick(btn, c, q));
        cb.appendChild(btn);
    });

    /* Reset ── */
    const msgBox = document.getElementById('msg-box');
    msgBox.className   = 'msg-box';
    msgBox.textContent = '';
    document.getElementById('next-btn').disabled = true;

    /* Timer */
    const lvl = LEVELS[state.level];
    if (lvl.time) startTimer(lvl.time);
    else { stopTimer(); document.getElementById('timer-badge').textContent = '⏱ ∞'; }

    updateStats();
}

/* ── Choisir Réponse ── */
function pick(btn, val, q) {
    if (state.answered) return;
    state.answered = true;
    stopTimer();

    /* Toujours afficher le bon choix */
    Array.from(document.getElementById('choices').children).forEach(b => {
        b.disabled = true;
        if (parseFloat(b.textContent) === q.correct) b.classList.add('correct');
    });

    if (val === q.correct) {
        btn.classList.add('correct');
        state.correct++;
        state.streak = Math.min(state.streak + 1, 5);
        const bonus = state.streak >= 3
            ? Math.round(LEVELS[state.level].pts * 1.5)
            : LEVELS[state.level].pts;
        state.score += bonus;
        const msg = state.streak >= 3
            ? `Excellent ! 🔥 Série×${state.streak} — +${bonus} pts`
            : `Correct ! ✅ +${bonus} pts`;
        showMsg(msg, 'ok');
    } else {
        btn.classList.add('wrong');
        state.wrong++;
        state.streak = 0;
        showMsg(`Faux ❌ La bonne réponse : ${q.correct} ${q.conv.fr_to}`, 'err');
    }

    state.qIdx++;
    document.getElementById('next-btn').disabled = false;
    updateStats();
}

/* ── Désactiver choix ── */
function disableAllChoices() {
    Array.from(document.getElementById('choices').children).forEach(b => {
        b.disabled = true;
        if (parseFloat(b.textContent.split(' ')[0]) === state.currentQ.correct)
            b.classList.add('correct');
    });
}

/* ── Messages ── */
function showMsg(text, type) {
    const box = document.getElementById('msg-box');
    box.textContent = text;
    box.className   = 'msg-box ' + type;
}

/* ── Enregistrer meilleur score ── */
function saveBestScore() {
    const currentBest = parseInt(localStorage.getItem('units_best_score_fr') || '0');
    if (state.score > currentBest) {
        localStorage.setItem('units_best_score_fr', state.score);
    }
}

/* ── Niveau terminé ── */
function levelComplete() {
    stopTimer();
    saveBestScore();
    if (state.level >= LEVELS.length - 1) { gameComplete(); return; }

    state.level++;
    state.qIdx = 0;

    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="complete-overlay">
            <div class="big-emoji">🎉</div>
            <h3>Niveau ${state.level} Terminé !</h3>
            <p>Ton score actuel : <strong>${state.score}</strong><br>
               Précision actuelle : <strong>${Math.round(state.correct / (state.correct + state.wrong) * 100)}%</strong></p>
            <button class="next-btn" id="next-level-btn">Niveau suivant : ${LEVELS[state.level].name} ←</button>
        </div>`;

    document.getElementById('next-level-btn').addEventListener('click', startLevel);
    buildLevelBar();
    updateStats();
}

/* ── Jeu terminé ── */
function gameComplete() {
    saveBestScore();
    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="complete-overlay">
            <div class="big-emoji">🏆</div>
            <h3>Tu as terminé tous les niveaux !</h3>
            <p>Score final : <strong>${state.score}</strong><br>
               Précision globale : <strong>${Math.round(state.correct / (state.correct + state.wrong) * 100)}%</strong></p>
            <button class="next-btn" id="replay-btn">Rejouer ↺</button>
        </div>`;

    document.getElementById('replay-btn').addEventListener('click', initGame);
}

/* ── Démarrer niveau ── */
function startLevel() {
    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="section-label">Question</div>
        <div class="question-text" id="q-text"></div>
        <div class="choices" id="choices"></div>
        <div class="msg-box" id="msg-box"></div>
        <button class="next-btn" id="next-btn" disabled>Question Suivante →</button>`;

    document.getElementById('next-btn').addEventListener('click', renderQuestion);
    renderQuestion();
    buildLevelBar();
}

/* ── Initialiser Jeu ── */
function initGame() {
    stopTimer();
    state = {
        level: 0, qIdx: 0, score: 0,
        streak: 0, correct: 0, wrong: 0,
        answered: false, timerSec: 0,
        timerInt: null, currentQ: null,
    };
    startLevel();
    updateStats();
    buildLevelBar();
}

/* ── Événements Page ── */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('restart-btn').addEventListener('click', () => {
        const wasTimerRunning = state.timerInt !== null;
        const pausedTime = state.timerSec;
        if (wasTimerRunning) {
            stopTimer();
        }
        if (confirm('Veux-tu recommencer depuis le Niveau 1 ?')) {
            initGame();
        } else {
            if (wasTimerRunning && !state.answered) {
                startTimer(pausedTime);
            }
        }
    });
    initGame();
});
