/* ============================================================
   LumiLearn | تصريف الأفعال العربية | jeux3_ar.js
   ============================================================ */
"use strict";

/* ══════════════════════════════════════════════
   1. بيانات الأفعال
   ══════════════════════════════════════════════ */
const VERBS = [
    {
        root: 'كَتَبَ', meaning: 'يكتب',
        past:    { أنا:'كَتَبْتُ', أنتَ:'كَتَبْتَ', أنتِ:'كَتَبْتِ', هو:'كَتَبَ',   هي:'كَتَبَتْ',  نحن:'كَتَبْنَا', أنتم:'كَتَبْتُمْ', هم:'كَتَبُوا'  },
        present: { أنا:'أَكْتُبُ', أنتَ:'تَكْتُبُ', أنتِ:'تَكْتُبِينَ', هو:'يَكْتُبُ', هي:'تَكْتُبُ', نحن:'نَكْتُبُ', أنتم:'تَكْتُبُونَ', هم:'يَكْتُبُونَ' },
        future:  { أنا:'سَأَكْتُبُ', أنتَ:'سَتَكْتُبُ', أنتِ:'سَتَكْتُبِينَ', هو:'سَيَكْتُبُ', هي:'سَتَكْتُبُ', نحن:'سَنَكْتُبُ', أنتم:'سَتَكْتُبُونَ', هم:'سَيَكْتُبُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (ك-ت-ب)'
    },
    {
        root: 'ذَهَبَ', meaning: 'يذهب',
        past:    { أنا:'ذَهَبْتُ', أنتَ:'ذَهَبْتَ', أنتِ:'ذَهَبْتِ', هو:'ذَهَبَ',   هي:'ذَهَبَتْ',  نحن:'ذَهَبْنَا', أنتم:'ذَهَبْتُمْ', هم:'ذَهَبُوا'  },
        present: { أنا:'أَذْهَبُ', أنتَ:'تَذْهَبُ', أنتِ:'تَذْهَبِينَ', هو:'يَذْهَبُ', هي:'تَذْهَبُ', نحن:'نَذْهَبُ', أنتم:'تَذْهَبُونَ', هم:'يَذْهَبُونَ' },
        future:  { أنا:'سَأَذْهَبُ', أنتَ:'سَتَذْهَبُ', أنتِ:'سَتَذْهَبِينَ', هو:'سَيَذْهَبُ', هي:'سَتَذْهَبُ', نحن:'سَنَذْهَبُ', أنتم:'سَتَذْهَبُونَ', هم:'سَيَذْهَبُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (ذ-ه-ب)'
    },
    {
        root: 'أَكَلَ', meaning: 'يأكل',
        past:    { أنا:'أَكَلْتُ', أنتَ:'أَكَلْتَ', أنتِ:'أَكَلْتِ', هو:'أَكَلَ',   هي:'أَكَلَتْ',  نحن:'أَكَلْنَا', أنتم:'أَكَلْتُمْ', هم:'أَكَلُوا'  },
        present: { أنا:'آكُلُ',    أنتَ:'تَأْكُلُ', أنتِ:'تَأْكُلِينَ', هو:'يَأْكُلُ', هي:'تَأْكُلُ', نحن:'نَأْكُلُ', أنتم:'تَأْكُلُونَ', هم:'يَأْكُلُونَ' },
        future:  { أنا:'سَآكُلُ',  أنتَ:'سَتَأْكُلُ', أنتِ:'سَتَأْكُلِينَ', هو:'سَيَأْكُلُ', هي:'سَتَأْكُلُ', نحن:'سَنَأْكُلُ', أنتم:'سَتَأْكُلُونَ', هم:'سَيَأْكُلُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (أ-ك-ل)'
    },
    {
        root: 'شَرِبَ', meaning: 'يشرب',
        past:    { أنا:'شَرِبْتُ', أنتَ:'شَرِبْتَ', أنتِ:'شَرِبْتِ', هو:'شَرِبَ',   هي:'شَرِبَتْ',  نحن:'شَرِبْنَا', أنتم:'شَرِبْتُمْ', هم:'شَرِبُوا'  },
        present: { أنا:'أَشْرَبُ', أنتَ:'تَشْرَبُ', أنتِ:'تَشْرَبِينَ', هو:'يَشْرَبُ', هي:'تَشْرَبُ', نحن:'نَشْرَبُ', أنتم:'تَشْرَبُونَ', هم:'يَشْرَبُونَ' },
        future:  { أنا:'سَأَشْرَبُ', أنتَ:'سَتَشْرَبُ', أنتِ:'سَتَشْرَبِينَ', هو:'سَيَشْرَبُ', هي:'سَتَشْرَبُ', نحن:'سَنَشْرَبُ', أنتم:'سَتَشْرَبُونَ', هم:'سَيَشْرَبُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (ش-ر-ب)'
    },
    {
        root: 'قَرَأَ', meaning: 'يقرأ',
        past:    { أنا:'قَرَأْتُ', أنتَ:'قَرَأْتَ', أنتِ:'قَرَأْتِ', هو:'قَرَأَ',   هي:'قَرَأَتْ',  نحن:'قَرَأْنَا', أنتم:'قَرَأْتُمْ', هم:'قَرَؤُوا'  },
        present: { أنا:'أَقْرَأُ', أنتَ:'تَقْرَأُ', أنتِ:'تَقْرَئِينَ', هو:'يَقْرَأُ', هي:'تَقْرَأُ', نحن:'نَقْرَأُ', أنتم:'تَقْرَؤُونَ', هم:'يَقْرَؤُونَ' },
        future:  { أنا:'سَأَقْرَأُ', أنتَ:'سَتَقْرَأُ', أنتِ:'سَتَقْرَئِينَ', هو:'سَيَقْرَأُ', هي:'سَتَقْرَأُ', نحن:'سَنَقْرَأُ', أنتم:'سَتَقْرَؤُونَ', هم:'سَيَقْرَؤُونَ' },
        hint: 'فعل مهموز اللام من مادة (ق-ر-أ)'
    },
    {
        root: 'جَلَسَ', meaning: 'يجلس',
        past:    { أنا:'جَلَسْتُ', أنتَ:'جَلَسْتَ', أنتِ:'جَلَسْتِ', هو:'جَلَسَ',   هي:'جَلَسَتْ',  نحن:'جَلَسْنَا', أنتم:'جَلَسْتُمْ', هم:'جَلَسُوا'  },
        present: { أنا:'أَجْلِسُ', أنتَ:'تَجْلِسُ', أنتِ:'تَجْلِسِينَ', هو:'يَجْلِسُ', هي:'تَجْلِسُ', نحن:'نَجْلِسُ', أنتم:'تَجْلِسُونَ', هم:'يَجْلِسُونَ' },
        future:  { أنا:'سَأَجْلِسُ', أنتَ:'سَتَجْلِسُ', أنتِ:'سَتَجْلِسِينَ', هو:'سَيَجْلِسُ', هي:'سَتَجْلِسُ', نحن:'سَنَجْلِسُ', أنتم:'سَتَجْلِسُونَ', هم:'سَيَجْلِسُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (ج-ل-س)'
    },
    {
        root: 'عَمِلَ', meaning: 'يعمل',
        past:    { أنا:'عَمِلْتُ', أنتَ:'عَمِلْتَ', أنتِ:'عَمِلْتِ', هو:'عَمِلَ',   هي:'عَمِلَتْ',  نحن:'عَمِلْنَا', أنتم:'عَمِلْتُمْ', هم:'عَمِلُوا'  },
        present: { أنا:'أَعْمَلُ', أنتَ:'تَعْمَلُ', أنتِ:'تَعْمَلِينَ', هو:'يَعْمَلُ', هي:'تَعْمَلُ', نحن:'نَعْمَلُ', أنتم:'تَعْمَلُونَ', هم:'يَعْمَلُونَ' },
        future:  { أنا:'سَأَعْمَلُ', أنتَ:'سَتَعْمَلُ', أنتِ:'سَتَعْمَلِينَ', هو:'سَيَعْمَلُ', هي:'سَتَعْمَلُ', نحن:'سَنَعْمَلُ', أنتم:'سَتَعْمَلُونَ', هم:'سَيَعْمَلُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (ع-م-ل)'
    },
    {
        root: 'فَهِمَ', meaning: 'يفهم',
        past:    { أنا:'فَهِمْتُ', أنتَ:'فَهِمْتَ', أنتِ:'فَهِمْتِ', هو:'فَهِمَ',   هي:'فَهِمَتْ',  نحن:'فَهِمْنَا', أنتم:'فَهِمْتُمْ', هم:'فَهِمُوا'  },
        present: { أنا:'أَفْهَمُ', أنتَ:'تَفْهَمُ', أنتِ:'تَفْهَمِينَ', هو:'يَفْهَمُ', هي:'تَفْهَمُ', نحن:'نَفْهَمُ', أنتم:'تَفْهَمُونَ', هم:'يَفْهَمُونَ' },
        future:  { أنا:'سَأَفْهَمُ', أنتَ:'سَتَفْهَمُ', أنتِ:'سَتَفْهَمِينَ', هو:'سَيَفْهَمُ', هي:'سَتَفْهَمُ', نحن:'سَنَفْهَمُ', أنتم:'سَتَفْهَمُونَ', هم:'سَيَفْهَمُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (ف-ه-م)'
    },
    {
        root: 'سَافَرَ', meaning: 'يسافر',
        past:    { أنا:'سَافَرْتُ', أنتَ:'سَافَرْتَ', أنتِ:'سَافَرْتِ', هو:'سَافَرَ',   هي:'سَافَرَتْ',  نحن:'سَافَرْنَا', أنتم:'سَافَرْتُمْ', هم:'سَافَرُوا'  },
        present: { أنا:'أُسَافِرُ', أنتَ:'تُسَافِرُ', أنتِ:'تُسَافِرِينَ', هو:'يُسَافِرُ', هي:'تُسَافِرُ', نحن:'نُسَافِرُ', أنتم:'تُسَافِرُونَ', هم:'يُسَافِرُونَ' },
        future:  { أنا:'سَأُسَافِرُ', أنتَ:'سَتُسَافِرُ', أنتِ:'سَتُسَافِرِينَ', هو:'سَيُسَافِرُ', هي:'سَتُسَافِرُ', نحن:'سَنُسَافِرُ', أنتم:'سَتُسَافِرُونَ', هم:'سَيُسَافِرُونَ' },
        hint: 'فعل رباعي على وزن فَاعَلَ من مادة (س-ف-ر)'
    },
    {
        root: 'تَعَلَّمَ', meaning: 'يتعلم',
        past:    { أنا:'تَعَلَّمْتُ', أنتَ:'تَعَلَّمْتَ', أنتِ:'تَعَلَّمْتِ', هو:'تَعَلَّمَ',   هي:'تَعَلَّمَتْ',  نحن:'تَعَلَّمْنَا', أنتم:'تَعَلَّمْتُمْ', هم:'تَعَلَّمُوا'  },
        present: { أنا:'أَتَعَلَّمُ', أنتَ:'تَتَعَلَّمُ', أنتِ:'تَتَعَلَّمِينَ', هو:'يَتَعَلَّمُ', هي:'تَتَعَلَّمُ', نحن:'نَتَعَلَّمُ', أنتم:'تَتَعَلَّمُونَ', هم:'يَتَعَلَّمُونَ' },
        future:  { أنا:'سَأَتَعَلَّمُ', أنتَ:'سَتَتَعَلَّمُ', أنتِ:'سَتَتَعَلَّمِينَ', هو:'سَيَتَعَلَّمُ', هي:'سَتَتَعَلَّمُ', نحن:'سَنَتَعَلَّمُ', أنتم:'سَتَتَعَلَّمُونَ', هم:'سَيَتَعَلَّمُونَ' },
        hint: 'فعل خماسي على وزن تَفَعَّلَ من مادة (ع-ل-م)'
    },
    {
        root: 'فَتَحَ', meaning: 'يفتح',
        past:    { أنا:'فَتَحْتُ', أنتَ:'فَتَحْتَ', أنتِ:'فَتَحْتِ', هو:'فَتَحَ',   هي:'فَتَحَتْ',  نحن:'فَتَحْنَا', أنتم:'فَتَحْتُمْ', هم:'فَتَحُوا'  },
        present: { أنا:'أَفْتَحُ', أنتَ:'تَفْتَحُ', أنتِ:'تَفْتَحِينَ', هو:'يَفْتَحُ', هي:'تَفْتَحُ', نحن:'نَفْتَحُ', أنتم:'تَفْتَحُونَ', هم:'يَفْتَحُونَ' },
        future:  { أنا:'سَأَفْتَحُ', أنتَ:'سَتَفْتَحُ', أنتِ:'سَتَفْتَحِينَ', هو:'سَيَفْتَحُ', هي:'سَتَفْتَحُ', نحن:'سَنَفْتَحُ', أنتم:'سَتَفْتَحُونَ', هم:'سَيَفْتَحُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (ف-ت-ح)'
    },
    {
        root: 'رَجَعَ', meaning: 'يرجع',
        past:    { أنا:'رَجَعْتُ', أنتَ:'رَجَعْتَ', أنتِ:'رَجَعْتِ', هو:'رَجَعَ',   هي:'رَجَعَتْ',  نحن:'رَجَعْنَا', أنتم:'رَجَعْتُمْ', هم:'رَجَعُوا'  },
        present: { أنا:'أَرْجِعُ', أنتَ:'تَرْجِعُ', أنتِ:'تَرْجِعِينَ', هو:'يَرْجِعُ', هي:'تَرْجِعُ', نحن:'نَرْجِعُ', أنتم:'تَرْجِعُونَ', هم:'يَرْجِعُونَ' },
        future:  { أنا:'سَأَرْجِعُ', أنتَ:'سَتَرْجِعُ', أنتِ:'سَتَرْجِعِينَ', هو:'سَيَرْجِعُ', هي:'سَتَرْجِعُ', نحن:'سَنَرْجِعُ', أنتم:'سَتَرْجِعُونَ', هم:'سَيَرْجِعُونَ' },
        hint: 'فعل ثلاثي صحيح من مادة (ر-ج-ع)'
    },
];

const PRONOUNS = ['أنا', 'أنتَ', 'أنتِ', 'هو', 'هي', 'نحن', 'أنتم', 'هم'];
const TENSES   = ['past', 'present', 'future'];
const TENSE_AR = { past: 'الماضي', present: 'المضارع', future: 'المستقبل' };
const TENSE_CLASS = { past: '', present: 'present', future: 'future' };

/* ══════════════════════════════════════════════
   2. مستويات اللعبة
   ══════════════════════════════════════════════ */
const LEVELS = [
    { name:'مبتدئ',  count:4, pts:10, time:null,  pronouns:['هو','هي','أنا'],          verbs:VERBS.slice(0,4)  },
    { name:'سهل',    count:5, pts:15, time:null,  pronouns:['هو','هي','أنا','نحن'],    verbs:VERBS.slice(0,6)  },
    { name:'متوسط',  count:5, pts:20, time:35,    pronouns:['أنا','أنتَ','هو','هي','نحن'], verbs:VERBS.slice(0,8) },
    { name:'متقدم',  count:6, pts:30, time:28,    pronouns:PRONOUNS,                   verbs:VERBS.slice(0,10) },
    { name:'صعب',    count:6, pts:40, time:22,    pronouns:PRONOUNS,                   verbs:VERBS             },
    { name:'محترف',  count:7, pts:55, time:18,    pronouns:PRONOUNS,                   verbs:VERBS             },
    { name:'خبير',   count:7, pts:75, time:14,    pronouns:PRONOUNS,                   verbs:VERBS             },
    { name:'أسطورة', count:8, pts:100,time:10,    pronouns:PRONOUNS,                   verbs:VERBS             },
];

/* ══════════════════════════════════════════════
   3. الحالة
   ══════════════════════════════════════════════ */
let state = {
    level:0, qIdx:0, score:0, streak:0,
    correct:0, wrong:0, answered:false,
    timerSec:0, timerInt:null, currentQ:null,
    usedCombos: new Set()
};

/* ══════════════════════════════════════════════
   4. مساعدات
   ══════════════════════════════════════════════ */
function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function randItem(arr) { return arr[rand(0, arr.length - 1)]; }

function getMode() { return document.getElementById('mode-select').value; }
function getTenseFilter() { return document.getElementById('tense-select').value; }

/* ══════════════════════════════════════════════
   5. توليد السؤال
   ══════════════════════════════════════════════ */
function generateQuestion(lvl) {
    const ldata   = LEVELS[lvl];
    const filter  = getTenseFilter();
    const tenses  = filter === 'all' ? TENSES : [filter];

    let verb, pronoun, tense, key;
    let tries = 0;
    do {
        verb    = randItem(ldata.verbs);
        pronoun = randItem(ldata.pronouns);
        tense   = randItem(tenses);
        key     = `${verb.root}|${pronoun}|${tense}`;
        tries++;
        if (tries > 50) { state.usedCombos.clear(); }
    } while (state.usedCombos.has(key));

    state.usedCombos.add(key);

    const correct = verb[tense][pronoun];

    // 3 wrong answers from same verb other pronouns/tenses, or other verbs
    const wrongSet = new Set();
    let wTries = 0;
    while (wrongSet.size < 3 && wTries < 200) {
        wTries++;
        const pool = Math.random() < 0.5
            ? randItem(ldata.verbs)[randItem(tenses)][randItem(PRONOUNS)]
            : verb[randItem(tenses)][randItem(PRONOUNS)];
        if (pool && pool !== correct) wrongSet.add(pool);
    }
    // Fallback: fill with placeholder distractors if needed
    const fallbacks = ['—', '···', '؟'];
    let fi = 0;
    while (wrongSet.size < 3) wrongSet.add(fallbacks[fi++]);

    const choices = [correct, ...wrongSet].sort(() => Math.random() - 0.5);
    return { verb, pronoun, tense, correct, choices };
}

/* ══════════════════════════════════════════════
   6. جدول التصريف
   ══════════════════════════════════════════════ */
function buildConjTable(verb, highlightPronoun, highlightTense) {
    const panel = document.getElementById('conj-table');
    let html = `<table class="conj-table">
        <thead>
            <tr>
                <th>الضمير</th>
                <th class="past-col">الماضي</th>
                <th class="present-col">المضارع</th>
                <th class="future-col">المستقبل</th>
            </tr>
        </thead><tbody>`;

    PRONOUNS.forEach(pr => {
        const isHL = pr === highlightPronoun;
        html += `<tr class="${isHL ? 'highlight-row' : ''}">
            <td>${pr}</td>
            <td class="past-col ${isHL && highlightTense==='past'?'highlight-row':''}">${verb.past[pr]}</td>
            <td class="present-col ${isHL && highlightTense==='present'?'highlight-row':''}">${verb.present[pr]}</td>
            <td class="future-col ${isHL && highlightTense==='future'?'highlight-row':''}">${verb.future[pr]}</td>
        </tr>`;
    });

    html += `</tbody></table>`;
    panel.innerHTML = html;
}

/* ══════════════════════════════════════════════
   7. شريط المستويات + إحصائيات
   ══════════════════════════════════════════════ */
function buildLevelBar() {
    const bar = document.getElementById('level-bar');
    bar.innerHTML = '';
    LEVELS.forEach((l, i) => {
        const d = document.createElement('div');
        d.className = 'lvl-dot' + (i < state.level ? ' done' : i === state.level ? ' active' : '');
        d.title = l.name;
        d.textContent = i + 1;
        bar.appendChild(d);
    });
}

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

function updateStats() {
    document.getElementById('score-disp').textContent = state.score;
    document.getElementById('st-correct').textContent = state.correct;
    document.getElementById('st-wrong').textContent   = state.wrong;
    const total = state.correct + state.wrong;
    document.getElementById('st-acc').textContent     = total ? Math.round(state.correct / total * 100) + '%' : '—';
    document.getElementById('st-lvl').textContent     = state.level + 1;
    buildStreakBar();
    const pct = (state.qIdx / LEVELS[state.level].count) * 100;
    document.getElementById('prog-fill').style.width  = pct + '%';
}

/* ══════════════════════════════════════════════
   8. المؤقت
   ══════════════════════════════════════════════ */
function stopTimer() { clearInterval(state.timerInt); state.timerInt = null; }

function startTimer(secs) {
    stopTimer();
    state.timerSec = secs;
    const badge = document.getElementById('timer-badge');
    if (badge) badge.textContent = '⏱ ' + secs;

    state.timerInt = setInterval(() => {
        state.timerSec--;
        if (badge) badge.textContent = '⏱ ' + state.timerSec;
        if (state.timerSec <= 0) {
            stopTimer();
            if (!state.answered) {
                state.wrong++; state.streak = 0;
                showMsg(`انتهى الوقت! ⏰ الإجابة: ${state.currentQ.correct}`, 'err');
                lockQuestion();
                state.answered = true;
                state.qIdx++;
                document.getElementById('next-btn').disabled = false;
                buildConjTable(state.currentQ.verb, state.currentQ.pronoun, state.currentQ.tense);
                updateStats();
            }
        }
    }, 1000);
}

/* ══════════════════════════════════════════════
   9. عرض السؤال
   ══════════════════════════════════════════════ */
function renderQuestion() {
    if (state.qIdx >= LEVELS[state.level].count) { levelComplete(); return; }

    const q = generateQuestion(state.level);
    state.currentQ = q;
    state.answered  = false;

    // شارة الزمن
    const badge = document.getElementById('tense-badge');
    badge.textContent = TENSE_AR[q.tense];
    badge.className = 'tense-badge ' + TENSE_CLASS[q.tense];

    // عرض الفعل والمعنى
    document.getElementById('verb-display').textContent = q.verb.root + ' (' + q.verb.meaning + ')';

    // جملة مع فراغ
    document.getElementById('sentence-box').innerHTML =
        `${q.pronoun} <span class="blank">___</span>`;

    // الضمير المطلوب
    document.getElementById('pronoun-target').innerHTML =
        `صرّف الفعل مع الضمير: <strong>${q.pronoun}</strong> — زمن: <strong>${TENSE_AR[q.tense]}</strong>`;

    // التلميح
    document.getElementById('hint-text').textContent = q.verb.hint;

    // جدول التصريف (مخفي الإجابة)
    buildConjTable(q.verb, q.pronoun, q.tense);

    // إعادة ضبط
    const msgBox = document.getElementById('msg-box');
    msgBox.className = 'msg-box';
    msgBox.textContent = '';
    document.getElementById('next-btn').disabled = true;

    const mode = getMode();
    if (mode === 'mcq') {
        renderMCQ(q);
    } else {
        renderType(q);
    }

    // مؤقت
    const lvl = LEVELS[state.level];
    const timerBadge = document.getElementById('timer-badge');
    if (lvl.time) {
        startTimer(lvl.time);
    } else {
        stopTimer();
        if (timerBadge) timerBadge.textContent = '⏱ ∞';
    }

    updateStats();
}

/* ── وضع الاختيار من متعدد ── */
function renderMCQ(q) {
    document.getElementById('choices').style.display   = 'grid';
    document.getElementById('type-area').style.display = 'none';

    const cb = document.getElementById('choices');
    cb.innerHTML = '';
    q.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className   = 'choice-btn';
        btn.textContent = c;
        btn.addEventListener('click', () => pickMCQ(btn, c, q));
        cb.appendChild(btn);
    });
}

/* ── وضع الكتابة ── */
function renderType(q) {
    document.getElementById('choices').style.display   = 'none';
    document.getElementById('type-area').style.display = 'flex';

    const inp  = document.getElementById('type-input');
    const btn  = document.getElementById('check-btn');
    inp.value  = '';
    inp.className = 'type-input';
    inp.disabled  = false;
    btn.disabled  = false;

    inp.focus();

    btn.onclick = () => pickType(q);
    inp.onkeydown = (e) => { if (e.key === 'Enter') pickType(q); };
}

/* ══════════════════════════════════════════════
   10. معالجة الإجابات
   ══════════════════════════════════════════════ */
function pickMCQ(btn, val, q) {
    if (state.answered) return;
    state.answered = true;
    stopTimer();

    Array.from(document.getElementById('choices').children).forEach(b => {
        b.disabled = true;
        if (b.textContent === q.correct) b.classList.add('correct');
    });

    if (val === q.correct) {
        btn.classList.add('correct');
        handleCorrect(q);
    } else {
        btn.classList.add('wrong');
        handleWrong(q);
    }

    afterAnswer(q);
}

function pickType(q) {
    if (state.answered) return;
    const inp = document.getElementById('type-input');
    const val = inp.value.trim();
    if (!val) return;

    state.answered = true;
    stopTimer();

    document.getElementById('check-btn').disabled = true;
    inp.disabled = true;

    // مقارنة مرنة (مع وبدون تشكيل)
    const normalize = s => s.replace(/[\u064B-\u065F]/g, '');
    const isCorrect = normalize(val) === normalize(q.correct);

    if (isCorrect) {
        inp.classList.add('correct');
        handleCorrect(q);
    } else {
        inp.classList.add('wrong');
        handleWrong(q);
        showMsg(`❌ خطأ — الإجابة الصحيحة: ${q.correct}`, 'err');
    }

    afterAnswer(q);
}

function handleCorrect(q) {
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
    // أكمل الجملة بالإجابة الصحيحة
    document.getElementById('sentence-box').innerHTML =
        `${q.pronoun} <span class="blank" style="color:var(--accent-mint)">${q.correct}</span>`;
}

function handleWrong(q) {
    state.wrong++;
    state.streak = 0;
    if (getMode() === 'mcq') {
        showMsg(`❌ خطأ — الإجابة الصحيحة: ${q.correct}`, 'err');
    }
    document.getElementById('sentence-box').innerHTML =
        `${q.pronoun} <span class="blank" style="color:#f44336">${q.correct}</span>`;
}

function afterAnswer(q) {
    state.qIdx++;
    document.getElementById('next-btn').disabled = false;
    buildConjTable(q.verb, q.pronoun, q.tense);
    updateStats();
}

function lockQuestion() {
    Array.from(document.getElementById('choices').children).forEach(b => {
        b.disabled = true;
        if (b.textContent === state.currentQ.correct) b.classList.add('correct');
    });
    const inp = document.getElementById('type-input');
    if (inp) inp.disabled = true;
    const btn = document.getElementById('check-btn');
    if (btn) btn.disabled = true;
}

/* ══════════════════════════════════════════════
   11. رسالة
   ══════════════════════════════════════════════ */
function showMsg(text, type) {
    const box = document.getElementById('msg-box');
    box.textContent = text;
    box.className   = 'msg-box ' + type;
}

/* ══════════════════════════════════════════════
   12. اكتمال المستوى / اللعبة
   ══════════════════════════════════════════════ */
function levelComplete() {
    stopTimer();
    if (state.level >= LEVELS.length - 1) { gameComplete(); return; }

    state.level++;
    state.qIdx = 0;
    state.usedCombos.clear();

    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="complete-overlay">
            <div class="big-emoji">🎉</div>
            <h3>أنهيت المستوى ${state.level}!</h3>
            <p>نقاطك الحالية: <strong>${state.score}</strong><br>
               الدقة حتى الآن: <strong>${Math.round(state.correct/(state.correct+state.wrong)*100)}%</strong></p>
            <button class="next-btn" id="next-level-btn">المستوى التالي: ${LEVELS[state.level].name} ←</button>
        </div>`;

    document.getElementById('next-level-btn').addEventListener('click', startLevel);
    buildLevelBar();
    updateStats();
}

function gameComplete() {
    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="complete-overlay">
            <div class="big-emoji">🏆</div>
            <h3>أنهيت جميع المستويات!</h3>
            <p>نقاطك النهائية: <strong>${state.score}</strong><br>
               الدقة الإجمالية: <strong>${Math.round(state.correct/(state.correct+state.wrong)*100)}%</strong></p>
            <button class="next-btn" id="replay-btn">العب مجدداً ↺</button>
        </div>`;
    document.getElementById('replay-btn').addEventListener('click', initGame);
}

/* ══════════════════════════════════════════════
   13. بدء مستوى / اللعبة
   ══════════════════════════════════════════════ */
function startLevel() {
    const ga = document.getElementById('game-area');
    ga.innerHTML = `
        <div class="panel-label">السؤال</div>
        <div class="tense-badge" id="tense-badge">—</div>
        <div class="verb-display" id="verb-display">—</div>
        <div class="sentence-box" id="sentence-box">—</div>
        <div class="pronoun-target" id="pronoun-target"></div>
        <div class="choices" id="choices"></div>
        <div class="type-area" id="type-area" style="display:none">
            <input type="text" id="type-input" class="type-input" placeholder="اكتب التصريف هنا..." autocomplete="off"/>
            <button class="check-btn" id="check-btn">تحقق ✓</button>
        </div>
        <div class="msg-box" id="msg-box"></div>
        <button class="next-btn" id="next-btn" disabled>السؤال التالي ←</button>`;

    document.getElementById('next-btn').addEventListener('click', renderQuestion);
    renderQuestion();
    buildLevelBar();
}

function initGame() {
    state = {
        level:0, qIdx:0, score:0, streak:0,
        correct:0, wrong:0, answered:false,
        timerSec:0, timerInt:null, currentQ:null,
        usedCombos: new Set()
    };
    startLevel();
    updateStats();
    buildLevelBar();
    document.getElementById('conj-table').innerHTML = 'اختر فعلاً لعرض جدوله';
}

/* ══════════════════════════════════════════════
   14. أحداث الصفحة
   ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('restart-btn').addEventListener('click', () => {
        if (confirm('هل تريد إعادة البداية من المستوى 1؟')) initGame();
    });
    document.getElementById('tense-select').addEventListener('change', () => {
        if (confirm('تغيير الزمن سيعيد اللعبة. متأكد؟')) initGame();
    });
    document.getElementById('mode-select').addEventListener('change', () => {
        if (confirm('تغيير الوضع سيعيد اللعبة. متأكد؟')) initGame();
    });
    initGame();
});
