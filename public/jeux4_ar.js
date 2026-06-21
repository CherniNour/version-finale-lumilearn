/* ============================================================
   LumiLearn | تحويل الوحدات | jeux4_ar.js
   ============================================================ */

"use strict";

/* ── مستويات اللعبة ── */
const LEVELS = [
    { name: 'مبتدئ',   count: 4, pts: 10,  time: null },
    { name: 'سهل',     count: 5, pts: 15,  time: null },
    { name: 'متوسط',   count: 5, pts: 20,  time: 40   },
    { name: 'متقدم',   count: 6, pts: 25,  time: 30   },
    { name: 'صعب',     count: 6, pts: 35,  time: 25   },
    { name: 'محترف',   count: 6, pts: 50,  time: 20   },
    { name: 'خبير',    count: 7, pts: 70,  time: 15   },
    { name: 'أسطورة',  count: 7, pts: 100, time: 12   },
];

/* ── فئات التحويل (وحدات أوروبية/متري فقط) ── */
const CATEGORIES = [
    {
        name: 'مسافة', emoji: '📏',
        conversions: [
            { from: 'km',  to: 'm',   factor: 1000,      ar_from: 'كيلومتر',  ar_to: 'متر'         },
            { from: 'm',   to: 'km',  factor: 0.001,     ar_from: 'متر',      ar_to: 'كيلومتر'     },
            { from: 'm',   to: 'cm',  factor: 100,       ar_from: 'متر',      ar_to: 'سنتيمتر'     },
            { from: 'cm',  to: 'm',   factor: 0.01,      ar_from: 'سنتيمتر', ar_to: 'متر'         },
            { from: 'm',   to: 'mm',  factor: 1000,      ar_from: 'متر',      ar_to: 'مليمتر'      },
            { from: 'mm',  to: 'cm',  factor: 0.1,       ar_from: 'مليمتر',  ar_to: 'سنتيمتر'     },
            { from: 'km',  to: 'cm',  factor: 100000,    ar_from: 'كيلومتر', ar_to: 'سنتيمتر'     },
        ]
    },
    {
        name: 'وزن', emoji: '⚖️',
        conversions: [
            { from: 'kg', to: 'g',   factor: 1000,      ar_from: 'كيلوغرام', ar_to: 'غرام'        },
            { from: 'g',  to: 'kg',  factor: 0.001,     ar_from: 'غرام',     ar_to: 'كيلوغرام'    },
            { from: 't',  to: 'kg',  factor: 1000,      ar_from: 'طن',       ar_to: 'كيلوغرام'    },
            { from: 'kg', to: 't',   factor: 0.001,     ar_from: 'كيلوغرام', ar_to: 'طن'          },
            { from: 'g',  to: 'mg',  factor: 1000,      ar_from: 'غرام',     ar_to: 'ملليغرام'    },
            { from: 'mg', to: 'g',   factor: 0.001,     ar_from: 'ملليغرام', ar_to: 'غرام'        },
        ]
    },
    {
        name: 'حرارة', emoji: '🌡️',
        conversions: [
            { from: 'C', to: 'K',  isFormula: true, formula: v => v + 273.15,        ar_from: 'سيلزيوس', ar_to: 'كلفن'    },
            { from: 'K', to: 'C',  isFormula: true, formula: v => v - 273.15,        ar_from: 'كلفن',    ar_to: 'سيلزيوس' },
        ]
    },
    {
        name: 'حجم', emoji: '🥛',
        conversions: [
            { from: 'L',   to: 'mL',  factor: 1000,    ar_from: 'لتر',       ar_to: 'مليلتر'      },
            { from: 'mL',  to: 'L',   factor: 0.001,   ar_from: 'مليلتر',   ar_to: 'لتر'         },
            { from: 'L',   to: 'cL',  factor: 100,     ar_from: 'لتر',       ar_to: 'سنتيلتر'     },
            { from: 'cL',  to: 'mL',  factor: 10,      ar_from: 'سنتيلتر',  ar_to: 'مليلتر'      },
            { from: 'm³',  to: 'L',   factor: 1000,    ar_from: 'متر مكعب', ar_to: 'لتر'         },
            { from: 'L',   to: 'm³',  factor: 0.001,   ar_from: 'لتر',       ar_to: 'متر مكعب'    },
        ]
    },
    {
        name: 'سرعة', emoji: '🚀',
        conversions: [
            { from: 'm/s',  to: 'km/h', factor: 3.6,         ar_from: 'م/ث',   ar_to: 'كم/س'        },
            { from: 'km/h', to: 'm/s',  factor: 1 / 3.6,     ar_from: 'كم/س',  ar_to: 'م/ث'         },
            { from: 'km/h', to: 'm/min',factor: 1000 / 60,   ar_from: 'كم/س',  ar_to: 'م/دقيقة'     },
            { from: 'm/min',to: 'm/s',  factor: 1 / 60,      ar_from: 'م/دقيقة', ar_to: 'م/ث'       },
        ]
    },
    {
        name: 'مساحة', emoji: '📐',
        conversions: [
            { from: 'km²', to: 'm²',  factor: 1000000,   ar_from: 'كم مربع',  ar_to: 'متر مربع'    },
            { from: 'm²',  to: 'km²', factor: 0.000001,  ar_from: 'متر مربع', ar_to: 'كم مربع'     },
            { from: 'm²',  to: 'cm²', factor: 10000,     ar_from: 'متر مربع', ar_to: 'سم مربع'     },
            { from: 'cm²', to: 'mm²', factor: 100,       ar_from: 'سم مربع',  ar_to: 'مم مربع'     },
            { from: 'ha',  to: 'm²',  factor: 10000,     ar_from: 'هكتار',    ar_to: 'متر مربع'    },
            { from: 'm²',  to: 'ha',  factor: 0.0001,    ar_from: 'متر مربع', ar_to: 'هكتار'       },
        ]
    },
];

const HINTS = {
    'km→m':       'اضرب في 1000',
    'm→km':       'اقسم على 1000',
    'm→cm':       'اضرب في 100',
    'cm→m':       'اقسم على 100',
    'm→mm':       'اضرب في 1000',
    'mm→cm':      'اقسم على 10',
    'km→cm':      'اضرب في 100,000',
    'kg→g':       'اضرب في 1000',
    'g→kg':       'اقسم على 1000',
    't→kg':       'اضرب في 1000',
    'kg→t':       'اقسم على 1000',
    'g→mg':       'اضرب في 1000',
    'mg→g':       'اقسم على 1000',
    'C→K':        'أضف 273.15',
    'K→C':        'اطرح 273.15',
    'L→mL':       'اضرب في 1000',
    'mL→L':       'اقسم على 1000',
    'L→cL':       'اضرب في 100',
    'cL→mL':      'اضرب في 10',
    'm³→L':       'اضرب في 1000',
    'L→m³':       'اقسم على 1000',
    'm/s→km/h':   'اضرب في 3.6',
    'km/h→m/s':   'اقسم على 3.6',
    'km/h→m/min': 'اضرب في 1000 ثم اقسم على 60',
    'm/min→m/s':  'اقسم على 60',
    'km²→m²':     'اضرب في 1,000,000',
    'm²→km²':     'اقسم على 1,000,000',
    'm²→cm²':     'اضرب في 10,000',
    'cm²→mm²':    'اضرب في 100',
    'ha→m²':      'اضرب في 10,000',
    'm²→ha':      'اقسم على 10,000',
    'default':    'راجع الجدول المرجعي على اليمين',
};

/* ── الحالة ── */
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

/* ── مساعدات ── */
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

/* ── توليد سؤال ── */
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

/* ── DOM: شريط المستويات ── */
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

/* ── DOM: سلسلة النجوم ── */
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

/* ── DOM: تحديث الإحصائيات ── */
function updateStats() {
    document.getElementById('score-disp').textContent  = state.score;
    document.getElementById('st-correct').textContent  = state.correct;
    document.getElementById('st-wrong').textContent    = state.wrong;
    const total = state.correct + state.wrong;
    document.getElementById('st-acc').textContent      = total ? Math.round(state.correct / total * 100) + '%' : '—';
    document.getElementById('st-lvl').textContent      = state.level + 1;

    document.getElementById('lvl-badge').textContent   = `المستوى ${state.level + 1}: ${LEVELS[state.level].name}`;

    buildStreakBar();

    const pct = (state.qIdx / LEVELS[state.level].count) * 100;
    document.getElementById('prog-fill').style.width = pct + '%';
}

/* ── المؤقت ── */
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
                showMsg(`انتهى الوقت! ⏰ الإجابة: ${state.currentQ.correct} ${state.currentQ.conv.ar_to}`, 'err');
                disableAllChoices();
                state.answered = true;
                state.qIdx++;
                document.getElementById('next-btn').disabled = false;
                updateStats();
            }
        }
    }, 1000);
}

/* ── عرض السؤال ── */
function renderQuestion() {
    if (state.qIdx >= LEVELS[state.level].count) { levelComplete(); return; }

    const q      = generateQuestion(state.level);
    state.currentQ = q;
    state.answered = false;

    /* نص السؤال */
    document.getElementById('q-text').innerHTML =
        `حوّل <span class="val">${q.inputVal}</span> <span class="unit">${q.conv.ar_from}</span>` +
        ` إلى <span class="unit-to">${q.conv.ar_to}</span>`;

    /* تلميح */
    document.getElementById('hint-text').textContent = q.hint;

    /* خيارات */
    const cb = document.getElementById('choices');
    cb.innerHTML = '';
    q.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className   = 'choice-btn';
        btn.textContent = `${c} ${q.conv.ar_to}`;
        btn.addEventListener('click', () => pick(btn, c, q));
        cb.appendChild(btn);
    });

    /* إعادة ضبط ── */
    const msgBox = document.getElementById('msg-box');
    msgBox.className   = 'msg-box';
    msgBox.textContent = '';
    document.getElementById('next-btn').disabled = true;

    /* مؤقت */
    const lvl = LEVELS[state.level];
    if (lvl.time) startTimer(lvl.time);
    else { stopTimer(); document.getElementById('timer-badge').textContent = '⏱ ∞'; }

    updateStats();
}

/* ── اختيار إجابة ── */
function pick(btn, val, q) {
    if (state.answered) return;
    state.answered = true;
    stopTimer();

    /* إظهار الإجابة الصحيحة دائماً */
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
            ? `ممتاز! 🔥 سلسلة×${state.streak} — +${bonus} نقطة`
            : `صحيح! ✅ +${bonus} نقطة`;
        showMsg(msg, 'ok');
    } else {
        btn.classList.add('wrong');
        state.wrong++;
        state.streak = 0;
        showMsg(`خطأ ❌ الإجابة الصحيحة: ${q.correct} ${q.conv.ar_to}`, 'err');
    }

    state.qIdx++;
    document.getElementById('next-btn').disabled = false;
    updateStats();
}

/* ── تعطيل الخيارات (عند انتهاء الوقت) ── */
function disableAllChoices() {
    Array.from(document.getElementById('choices').children).forEach(b => {
        b.disabled = true;
        if (parseFloat(b.textContent.split(' ')[0]) === state.currentQ.correct)
            b.classList.add('correct');
    });
}

/* ── رسالة ── */
function showMsg(text, type) {
    const box = document.getElementById('msg-box');
    box.textContent = text;
    box.className   = 'msg-box ' + type;
}

/* ── حفظ أفضل نتيجة ── */
function saveBestScore() {
    const currentBest = parseInt(localStorage.getItem('units_best_score') || '0');
    if (state.score > currentBest) {
        localStorage.setItem('units_best_score', state.score);
    }
}

/* ── اكتمال المستوى ── */
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
            <h3>أنهيت المستوى ${state.level}!</h3>
            <p>نقاطك الحالية: <strong>${state.score}</strong><br>
               الدقة حتى الآن: <strong>${Math.round(state.correct / (state.correct + state.wrong) * 100)}%</strong></p>
            <button class="next-btn" id="next-level-btn">المستوى التالي: ${LEVELS[state.level].name} ←</button>
        </div>`;

    document.getElementById('next-level-btn').addEventListener('click', startLevel);
    buildLevelBar();
    updateStats();
}

/* ── اكتمال اللعبة ── */
function gameComplete() {
    saveBestScore();
    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="complete-overlay">
            <div class="big-emoji">🏆</div>
            <h3>أنهيت جميع المستويات!</h3>
            <p>نقاطك النهائية: <strong>${state.score}</strong><br>
               الدقة الإجمالية: <strong>${Math.round(state.correct / (state.correct + state.wrong) * 100)}%</strong></p>
            <button class="next-btn" id="replay-btn">العب مجدداً ↺</button>
        </div>`;

    document.getElementById('replay-btn').addEventListener('click', initGame);
}

/* ── بدء مستوى ── */
function startLevel() {
    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="section-label">السؤال</div>
        <div class="question-text" id="q-text"></div>
        <div class="choices" id="choices"></div>
        <div class="msg-box" id="msg-box"></div>
        <button class="next-btn" id="next-btn" disabled>السؤال التالي ←</button>`;

    document.getElementById('next-btn').addEventListener('click', renderQuestion);
    renderQuestion();
    buildLevelBar();
}

/* ── تهيئة اللعبة ── */
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

/* ── أحداث الصفحة ── */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('restart-btn').addEventListener('click', () => {
        const wasTimerRunning = state.timerInt !== null;
        const pausedTime = state.timerSec;
        if (wasTimerRunning) {
            stopTimer();
        }
        if (confirm('هل تريد إعادة البداية من المستوى 1؟')) {
            initGame();
        } else {
            if (wasTimerRunning && !state.answered) {
                startTimer(pausedTime);
            }
        }
    });
    initGame();
});
