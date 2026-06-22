/* ============================================================
   LumiLearn | Unit Conversion | jeux4_en.js
   ============================================================ */

"use strict";

/* ── Game Levels ── */
const LEVELS = [
    { name: 'Beginner',     count: 4, pts: 10,  time: null },
    { name: 'Easy',         count: 5, pts: 15,  time: null },
    { name: 'Medium',       count: 5, pts: 20,  time: 40   },
    { name: 'Advanced',     count: 6, pts: 25,  time: 30   },
    { name: 'Hard',         count: 6, pts: 35,  time: 25   },
    { name: 'Professional', count: 6, pts: 50,  time: 20   },
    { name: 'Expert',       count: 7, pts: 70,  time: 15   },
    { name: 'Legend',       count: 7, pts: 100, time: 12   },
];

/* ── Conversion Categories ── */
const CATEGORIES = [
    {
        name: 'Distance', emoji: '📏',
        conversions: [
            { from: 'km',  to: 'm',   factor: 1000,      en_from: 'kilometers',  en_to: 'meters'         },
            { from: 'm',   to: 'km',  factor: 0.001,     en_from: 'meters',      en_to: 'kilometers'     },
            { from: 'm',   to: 'cm',  factor: 100,       en_from: 'meters',      en_to: 'centimeters'    },
            { from: 'cm',  to: 'm',   factor: 0.01,      en_from: 'centimeters', en_to: 'meters'         },
            { from: 'm',   to: 'mm',  factor: 1000,      en_from: 'meters',      en_to: 'millimeters'    },
            { from: 'mm',  to: 'cm',  factor: 0.1,       en_from: 'millimeters', en_to: 'centimeters'    },
            { from: 'km',  to: 'cm',  factor: 100000,    en_from: 'kilometers',  en_to: 'centimeters'    },
        ]
    },
    {
        name: 'Weight', emoji: '⚖️',
        conversions: [
            { from: 'kg', to: 'g',   factor: 1000,      en_from: 'kilograms', en_to: 'grams'        },
            { from: 'g',  to: 'kg',  factor: 0.001,     en_from: 'grams',     en_to: 'kilograms'    },
            { from: 't',  to: 'kg',  factor: 1000,      en_from: 'tons',      en_to: 'kilograms'    },
            { from: 'kg', to: 't',   factor: 0.001,     en_from: 'kilograms', en_to: 'tons'         },
            { from: 'g',  to: 'mg',  factor: 1000,      en_from: 'grams',     en_to: 'milligrams'    },
            { from: 'mg', to: 'g',   factor: 0.001,     en_from: 'milligrams', en_to: 'grams'        },
        ]
    },
    {
        name: 'Temperature', emoji: '🌡️',
        conversions: [
            { from: 'C', to: 'K',  isFormula: true, formula: v => v + 273.15,        en_from: 'Celsius', en_to: 'Kelvin'    },
            { from: 'K', to: 'C',  isFormula: true, formula: v => v - 273.15,        en_from: 'Kelvin',    en_to: 'Celsius' },
        ]
    },
    {
        name: 'Volume', emoji: '🥛',
        conversions: [
            { from: 'L',   to: 'mL',  factor: 1000,    en_from: 'liters',       en_to: 'milliliters'      },
            { from: 'mL',  to: 'L',   factor: 0.001,   en_from: 'milliliters',   en_to: 'liters'         },
            { from: 'L',   to: 'cL',  factor: 100,     en_from: 'liters',       en_to: 'centiliters'     },
            { from: 'cL',  to: 'mL',  factor: 10,      en_from: 'centiliters',  en_to: 'milliliters'      },
            { from: 'm³',  to: 'L',   factor: 1000,    en_from: 'cubic meters', en_to: 'liters'         },
            { from: 'L',   to: 'm³',  factor: 0.001,   en_from: 'liters',       en_to: 'cubic meters'    },
        ]
    },
    {
        name: 'Speed', emoji: '🚀',
        conversions: [
            { from: 'm/s',  to: 'km/h', factor: 3.6,         en_from: 'm/s',   en_to: 'km/h'        },
            { from: 'km/h', to: 'm/s',  factor: 1 / 3.6,     en_from: 'km/h',  en_to: 'm/s'         },
            { from: 'km/h', to: 'm/min',factor: 1000 / 60,   en_from: 'km/h',  en_to: 'm/min'     },
            { from: 'm/min',to: 'm/s',  factor: 1 / 60,      en_from: 'm/min', en_to: 'm/s'       },
        ]
    },
    {
        name: 'Area', emoji: '📐',
        conversions: [
            { from: 'km²', to: 'm²',  factor: 1000000,   en_from: 'sq. km',  en_to: 'sq. meters'    },
            { from: 'm²',  to: 'km²', factor: 0.000001,  en_from: 'sq. meters', en_to: 'sq. km'     },
            { from: 'm²',  to: 'cm²', factor: 10000,     en_from: 'sq. meters', en_to: 'sq. centimeters'     },
            { from: 'cm²', to: 'mm²', factor: 100,       en_from: 'sq. centimeters',  en_to: 'sq. millimeters'     },
            { from: 'ha',  to: 'm²',  factor: 10000,     en_from: 'hectares',    en_to: 'sq. meters'    },
            { from: 'm²',  to: 'ha',  factor: 0.0001,    en_from: 'sq. meters', en_to: 'hectares'       },
        ]
    },
];

const HINTS = {
    'km→m':       'Multiply by 1000',
    'm→km':       'Divide by 1000',
    'm→cm':       'Multiply by 100',
    'cm→m':       'Divide by 100',
    'm→mm':       'Multiply by 1000',
    'mm→cm':      'Divide by 10',
    'km→cm':      'Multiply by 100,000',
    'kg→g':       'Multiply by 1000',
    'g→kg':       'Divide by 1000',
    't→kg':       'Multiply by 1000',
    'kg→t':       'Divide by 1000',
    'g→mg':       'Multiply by 1000',
    'mg→g':       'Divide by 1000',
    'C→K':        'Add 273.15',
    'K→C':        'Subtract 273.15',
    'L→mL':       'Multiply by 1000',
    'mL→L':       'Divide by 1000',
    'L→cL':       'Multiply by 100',
    'cL→mL':      'Multiply by 10',
    'm³→L':       'Multiply by 1000',
    'L→m³':       'Divide by 1000',
    'm/s→km/h':   'Multiply by 3.6',
    'km/h→m/s':   'Divide by 3.6',
    'km/h→m/min': 'Multiply by 1000 and divide by 60',
    'm/min→m/s':  'Divide by 60',
    'km²→m²':     'Multiply by 1,000,000',
    'm²→km²':     'Divide by 1,000,000',
    'm²→cm²':     'Multiply by 10,000',
    'cm²→mm²':    'Multiply by 100',
    'ha→m²':      'Multiply by 10,000',
    'm²→ha':      'Divide by 10,000',
    'default':    'Check the reference table on the right',
};

/* ── State ── */
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

/* ── Helpers ── */
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

/* ── Generate Question ── */
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

/* ── DOM: Level Bar ── */
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

/* ── DOM: Star Streak ── */
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

/* ── DOM: Update Stats ── */
function updateStats() {
    document.getElementById('score-disp').textContent  = state.score;
    document.getElementById('st-correct').textContent  = state.correct;
    document.getElementById('st-wrong').textContent    = state.wrong;
    const total = state.correct + state.wrong;
    document.getElementById('st-acc').textContent      = total ? Math.round(state.correct / total * 100) + '%' : '—';
    document.getElementById('st-lvl').textContent      = state.level + 1;

    document.getElementById('lvl-badge').textContent   = `Level ${state.level + 1}: ${LEVELS[state.level].name}`;

    buildStreakBar();

    const pct = (state.qIdx / LEVELS[state.level].count) * 100;
    document.getElementById('prog-fill').style.width = pct + '%';
}

/* ── Timer ── */
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
                showMsg(`Time's up! ⏰ Correct: ${state.currentQ.correct} ${state.currentQ.conv.en_to}`, 'err');
                disableAllChoices();
                state.answered = true;
                state.qIdx++;
                document.getElementById('next-btn').disabled = false;
                updateStats();
            }
        }
    }, 1000);
}

/* ── Render Question ── */
function renderQuestion() {
    if (state.qIdx >= LEVELS[state.level].count) { levelComplete(); return; }

    const q      = generateQuestion(state.level);
    state.currentQ = q;
    state.answered = false;

    /* Question text */
    document.getElementById('q-text').innerHTML =
        `Convert <span class="val">${q.inputVal}</span> <span class="unit">${q.conv.en_from}</span>` +
        ` to <span class="unit-to">${q.conv.en_to}</span>`;

    /* Hint */
    document.getElementById('hint-text').textContent = q.hint;

    /* Choices */
    const cb = document.getElementById('choices');
    cb.innerHTML = '';
    q.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className   = 'choice-btn';
        btn.textContent = `${c} ${q.conv.en_to}`;
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

/* ── Pick Answer ── */
function pick(btn, val, q) {
    if (state.answered) return;
    state.answered = true;
    stopTimer();

    /* Always show correct choice */
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
            ? `Excellent! 🔥 Streak×${state.streak} — +${bonus} pts`
            : `Correct! ✅ +${bonus} pts`;
        showMsg(msg, 'ok');
    } else {
        btn.classList.add('wrong');
        state.wrong++;
        state.streak = 0;
        showMsg(`Incorrect ❌ Correct answer: ${q.correct} ${q.conv.en_to}`, 'err');
    }

    state.qIdx++;
    document.getElementById('next-btn').disabled = false;
    updateStats();
}

/* ── Disable choices ── */
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

/* ── Save Best Score ── */
function saveBestScore() {
    const currentBest = parseInt(localStorage.getItem('units_best_score_en') || '0');
    if (state.score > currentBest) {
        localStorage.setItem('units_best_score_en', state.score);
    }
}

/* ── Level Complete ── */
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
            <h3>Level ${state.level} Completed!</h3>
            <p>Your current score: <strong>${state.score}</strong><br>
               Accuracy so far: <strong>${Math.round(state.correct / (state.correct + state.wrong) * 100)}%</strong></p>
            <button class="next-btn" id="next-level-btn">Next Level: ${LEVELS[state.level].name} ←</button>
        </div>`;

    document.getElementById('next-level-btn').addEventListener('click', startLevel);
    buildLevelBar();
    updateStats();
}

/* ── Game Complete ── */
function gameComplete() {
    saveBestScore();
    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="complete-overlay">
            <div class="big-emoji">🏆</div>
            <h3>You completed all levels!</h3>
            <p>Final score: <strong>${state.score}</strong><br>
               Overall accuracy: <strong>${Math.round(state.correct / (state.correct + state.wrong) * 100)}%</strong></p>
            <button class="next-btn" id="replay-btn">Play Again ↺</button>
        </div>`;

    document.getElementById('replay-btn').addEventListener('click', initGame);
}

/* ── Start Level ── */
function startLevel() {
    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="section-label">Question</div>
        <div class="question-text" id="q-text"></div>
        <div class="choices" id="choices"></div>
        <div class="msg-box" id="msg-box"></div>
        <button class="next-btn" id="next-btn" disabled>Next Question →</button>`;

    document.getElementById('next-btn').addEventListener('click', renderQuestion);
    renderQuestion();
    buildLevelBar();
}

/* ── Initialize Game ── */
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

/* ── Page Events ── */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('restart-btn').addEventListener('click', () => {
        const wasTimerRunning = state.timerInt !== null;
        const pausedTime = state.timerSec;
        if (wasTimerRunning) {
            stopTimer();
        }
        if (confirm('Do you want to restart from Level 1?')) {
            initGame();
        } else {
            if (wasTimerRunning && !state.answered) {
                startTimer(pausedTime);
            }
        }
    });
    initGame();
});
