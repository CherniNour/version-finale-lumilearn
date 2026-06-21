/* ===================================================
   أنيسي - Arabic Educational Game
   Main Game Script
   =================================================== */

'use strict';

// ===== GAME DATA =====
const GAME_DATA = {
  worlds: [
    {
      id: 1,
      name: 'أنيسي في مدرستي',
      subtitle: 'تعلّم حروف المدرسة',
      icon: '🏫',
      color: 'world-1',
      letters: ['ب', 'ل', 'م', 'ر'],
      levels: [
        {
          id: '1-1', type: 'letter_intro', name: 'حرف الباء', xp: 30,
          data: {
            letter: 'ب', color: '#E74C3C',
            forms: [
              { form: 'بـ', label: 'في البداية' },
              { form: 'ـبـ', label: 'في الوسط' },
              { form: 'ـب', label: 'في النهاية' },
              { form: 'ب', label: 'منفردة' }
            ],
            words: [
              { word: 'بَاب', emoji: '🚪' },
              { word: 'كِتَاب', emoji: '📖' },
              { word: 'مَكْتَب', emoji: '🪑' },
              { word: 'سَبُّورَة', emoji: '🖊️' },
            ],
            sentence: 'وَقَفَت رِحَاب قُرْبَ البَاب.'
          }
        },
        {
          id: '1-2', type: 'mcq', name: 'اختار الصحيح', xp: 40, timed: true,
          data: {
            questions: [
              { q: 'أيّ كلمة تبدأ بحرف الباء؟', choices: ['بَاب', 'مَدْرَسَة', 'قَلَم', 'سَاحَة'], answer: 0, emoji: '🚪' },
              { q: 'أيّ كلمة تنتهي بحرف الباء؟', choices: ['طَبَاشِير', 'كِتَاب', 'مَكْتَب', 'لَوْح'], answer: 1, emoji: '📖' },
              { q: 'ما معنى "مَكْتَب"؟', choices: ['طاولة للكتابة', 'لعبة', 'طعام', 'ثوب'], answer: 0, emoji: '🪑' },
              { q: 'مَن يُعَلِّم التلاميذ؟', choices: ['الطبيب', 'المُعَلِّمة', 'البائع', 'المدير'], answer: 1, emoji: '👩‍🏫' },
              { q: '"رِبِيع يَلْعَب في السَّاحَة." مَن يَلْعَب؟', choices: ['مَالِك', 'رِبِيع', 'دَلَال', 'رَحَاب'], answer: 1, emoji: '⚽' },
            ]
          }
        },
        {
          id: '1-3', type: 'memory', name: 'لعبة الذاكرة', xp: 50,
          data: {
            pairs: [
              { a: 'بَاب', b: '🚪' },
              { a: 'كِتَاب', b: '📖' },
              { a: 'مَكْتَب', b: '🖥️' },
              { a: 'مِبْرَاة', b: '✏️' },
              { a: 'مِمْحَاة', b: '🩹' },
              { a: 'مَدْرَسَة', b: '🏫' },
            ]
          }
        },
        {
          id: '1-4', type: 'letter_intro', name: 'حرف اللام', xp: 30,
          data: {
            letter: 'ل', color: '#E74C3C',
            forms: [
              { form: 'لـ', label: 'في البداية' },
              { form: 'ـلـ', label: 'في الوسط' },
              { form: 'ـل', label: 'في النهاية' },
              { form: 'ل', label: 'منفردة' }
            ],
            words: [
              { word: 'عَلَم', emoji: '🚩' },
              { word: 'قَلَم', emoji: '✏️' },
              { word: 'طِفْل', emoji: '👦' },
              { word: 'مِقْلَمَة', emoji: '🖊️' },
            ],
            sentence: 'أَقْلَام دَلَال فِي المِقْلَمَة.'
          }
        },
        {
          id: '1-5', type: 'fill_blank', name: 'أكمل الجملة', xp: 50,
          data: {
            questions: [
              { sentence: 'حَيَّى التَّلَامِيذُ ___ الوَطَن.', blank: 'عَلَم', options: ['عَلَم', 'كِتَاب', 'بَاب', 'قَلَم'], emoji: '🚩' },
              { sentence: 'دَخَلَ التَّلَامِيذُ ___ بنِظَام.', blank: 'القِسْم', options: ['الحَدِيقَة', 'القِسْم', 'البَاب', 'السَّاحَة'], emoji: '🏫' },
              { sentence: 'كَتَبَ رِبِيع بـ___ أَحْمَر.', blank: 'قَلَم', options: ['كِتَاب', 'قَلَم', 'مِمْحَاة', 'مِقَص'], emoji: '✏️' },
              { sentence: 'وَقَفَت رِحَاب قُرْبَ الـ___.', blank: 'بَاب', options: ['بَاب', 'مَدْرَسَة', 'سَاحَة', 'طَاوِلَة'], emoji: '🚪' },
            ]
          }
        },
        {
          id: '1-6', type: 'mcq', name: 'حرف الميم', xp: 40, timed: true,
          data: {
            questions: [
              { q: 'أيّ كلمة تبدأ بحرف الميم؟', choices: ['مُدِير', 'بَاب', 'قَلَم', 'طِفْل'], answer: 0, emoji: '👨‍💼' },
              { q: 'ما هو "المُدِير"؟', choices: ['مَسؤول المدرسة', 'التلميذ', 'الطعام', 'اللعبة'], answer: 0, emoji: '🏫' },
              { q: '"مِحْفَظَة" هي...', choices: ['حقيبة المدرسة', 'لوح الكتابة', 'قلم', 'كتاب'], answer: 0, emoji: '🎒' },
              { q: 'ما عكس "كَبِير"؟', choices: ['صَغِير', 'جَمِيل', 'جَدِيد', 'قَدِيم'], answer: 0, emoji: '🔍' },
              { q: '"اصْطَفَّ التَّلَامِيذُ" يعني...', choices: ['لعبوا', 'وقفوا في صف', 'أكلوا', 'نادوا'], answer: 1, emoji: '🧍' },
            ]
          }
        },
        {
          id: '1-7', type: 'matching', name: 'وصّل المتشابهات', xp: 60,
          data: {
            pairs: [
              { right: 'مُعَلِّمَة', left: '👩‍🏫' },
              { right: 'مُدِير', left: '👨‍💼' },
              { right: 'تَلَامِيذ', left: '👧👦' },
              { right: 'قِسْم', left: '🏫' },
              { right: 'مِحْفَظَة', left: '🎒' },
            ]
          }
        },
        {
          id: '1-8', type: 'sentence_build', name: 'رتّب الجملة', xp: 70,
          data: {
            sentences: [
              { words: ['يَلْعَب', 'رِبِيع', 'في', 'السَّاحَة'], correct: 'رِبِيع يَلْعَب في السَّاحَة' },
              { words: ['التَّلَامِيذ', 'حَيَّوا', 'العَلَم'], correct: 'حَيَّوا التَّلَامِيذ العَلَم' },
              { words: ['المُعَلِّمَة', 'ابْتَسَمَت', 'لِلتَّلَامِيذ'], correct: 'ابْتَسَمَت المُعَلِّمَة لِلتَّلَامِيذ' },
            ]
          }
        },
      ]
    },

    {
      id: 2,
      name: 'أنيسي في أهلي',
      subtitle: 'حروف البيت والعائلة',
      icon: '🏠',
      color: 'world-2',
      letters: ['د', 'س', 'ك', 'ن'],
      levels: [
        {
          id: '2-1', type: 'letter_intro', name: 'حرف الدال', xp: 30,
          data: {
            letter: 'د', color: '#2980B9',
            forms: [
              { form: 'دَ', label: 'فتحة' },
              { form: 'دُ', label: 'ضمة' },
              { form: 'دِ', label: 'كسرة' },
              { form: 'دْ', label: 'ساكنة' }
            ],
            words: [
              { word: 'دَار', emoji: '🏠' },
              { word: 'وَلَد', emoji: '👦' },
              { word: 'وَرْدَة', emoji: '🌹' },
              { word: 'دُوَّامَة', emoji: '🌀' },
            ],
            sentence: 'وَقَفَ أَحْمَد فِي مَدْخَل دَار صَدِيقِه.'
          }
        },
        {
          id: '2-2', type: 'mcq', name: 'عائلة مُرَاد', xp: 40, timed: true,
          data: {
            questions: [
              { q: 'أيّ كلمة تبدأ بحرف الدال؟', choices: ['دَار', 'بَاب', 'مَنْزِل', 'قَلَم'], answer: 0, emoji: '🏠' },
              { q: '"مَدْخَل" يعني...', choices: ['مكان الدخول', 'مكان الخروج', 'غرفة كبيرة', 'حديقة'], answer: 0, emoji: '🚪' },
              { q: 'ما هو جمع "وَلَد"؟', choices: ['أَوْلَاد', 'وَلَدَان', 'وِلْدَان', 'وُلُود'], answer: 0, emoji: '👦' },
              { q: '"دِيك رُومِي" هو نوع من...', choices: ['الطيور', 'الأسماك', 'الزهور', 'الأشجار'], answer: 0, emoji: '🦃' },
              { q: 'من يتكلم مع أحمد في المدخل؟', choices: ['أم مُرَاد', 'المعلمة', 'المدير', 'رِبِيع'], answer: 0, emoji: '👩' },
            ]
          }
        },
        {
          id: '2-3', type: 'memory', name: 'ذاكرة البيت', xp: 50,
          data: {
            pairs: [
              { a: 'دَار', b: '🏠' },
              { a: 'وَرْدَة', b: '🌹' },
              { a: 'دِيك', b: '🐓' },
              { a: 'كَلْب', b: '🐕' },
              { a: 'حَاسُوب', b: '💻' },
              { a: 'سِتَار', b: '🪟' },
            ]
          }
        },
        {
          id: '2-4', type: 'letter_intro', name: 'حرف السين', xp: 30,
          data: {
            letter: 'س', color: '#2980B9',
            forms: [
              { form: 'سـ', label: 'في البداية' },
              { form: 'ـسـ', label: 'في الوسط' },
              { form: 'ـس', label: 'في النهاية' },
              { form: 'س', label: 'منفردة' }
            ],
            words: [
              { word: 'سَمَك', emoji: '🐟' },
              { word: 'بِسَاط', emoji: '🟫' },
              { word: 'سِتَار', emoji: '🪟' },
              { word: 'حَاسُوب', emoji: '💻' },
            ],
            sentence: 'جَلَسَ أَحْمَد وَرَسَمَ بُسْتَانًا فِي الحَاسُوب.'
          }
        },
        {
          id: '2-5', type: 'fill_blank', name: 'أكمل مع السين', xp: 50,
          data: {
            questions: [
              { sentence: 'رَسَمَ سَامِي ___ فِي الحَاسُوب.', blank: 'بُسْتَانًا', options: ['بُسْتَانًا', 'كِتَابًا', 'بَيْتًا', 'طَرِيقًا'], emoji: '🌳' },
              { sentence: 'جَلَسَت أُم مُرَاد عَلَى ___ قُرْبَ الشُّبَّاك.', blank: 'أَرِيكَة', options: ['طَاوِلَة', 'أَرِيكَة', 'كُرْسِي', 'سَجَّادَة'], emoji: '🛋️' },
              { sentence: 'فِي البُسْتَان شَجَرَة ___.', blank: 'لَيْمُون', options: ['لَيْمُون', 'تُفَّاح', 'رُمَّان', 'مِشْمِش'], emoji: '🍋' },
              { sentence: 'تَسَابَقَ سَامِي وَسَمَر فِي ___.', blank: 'الرَّسْم', options: ['الرَّسْم', 'القِرَاءَة', 'الغِنَاء', 'السِّبَاحَة'], emoji: '🎨' },
            ]
          }
        },
        {
          id: '2-6', type: 'mcq', name: 'حرف الكاف والنون', xp: 40, timed: true,
          data: {
            questions: [
              { q: 'أيّ كلمة تبدأ بحرف الكاف؟', choices: ['كَلْب', 'دَار', 'بَاب', 'وَلَد'], answer: 0, emoji: '🐕' },
              { q: '"كُرَّاس" هو...', choices: ['دفتر المدرسة', 'لعبة', 'طعام', 'زهرة'], answer: 0, emoji: '📓' },
              { q: 'أيّ كلمة تبدأ بحرف النون؟', choices: ['نَافُورَة', 'دَار', 'كَلْب', 'سِتَار'], answer: 0, emoji: '⛲' },
              { q: '"مَنْزِل عَتِيق" يعني...', choices: ['بيت قديم', 'بيت جديد', 'بيت كبير', 'بيت صغير'], answer: 0, emoji: '🏚️' },
              { q: 'ما جمع "حِكَايَة"؟', choices: ['حِكَايَات', 'حِكَايَتَان', 'حَكِيم', 'حِكَى'], answer: 0, emoji: '📖' },
            ]
          }
        },
        {
          id: '2-7', type: 'matching', name: 'غرف البيت', xp: 60,
          data: {
            pairs: [
              { right: 'حَاسُوب', left: '💻' },
              { right: 'نَافُورَة', left: '⛲' },
              { right: 'أَرِيكَة', left: '🛋️' },
              { right: 'قِنْدِيل', left: '🪔' },
              { right: 'سَمَك', left: '🐟' },
            ]
          }
        },
        {
          id: '2-8', type: 'sentence_build', name: 'رتّب الجملة', xp: 70,
          data: {
            sentences: [
              { words: ['أَحْمَد', 'رَسَمَ', 'بُسْتَانًا', 'فِي', 'الحَاسُوب'], correct: 'رَسَمَ أَحْمَد بُسْتَانًا فِي الحَاسُوب' },
              { words: ['تَقْرَأ', 'أُم', 'مُرَاد', 'حِكَايَات', 'عَجِيبَة'], correct: 'تَقْرَأ أُم مُرَاد حِكَايَات عَجِيبَة' },
              { words: ['نَظَرَ', 'أَحْمَد', 'إِلَى', 'فِنَاء', 'مَنْزِل'], correct: 'نَظَرَ أَحْمَد إِلَى فِنَاء مَنْزِل' },
            ]
          }
        },
      ]
    },

    {
      id: 3,
      name: 'أنيسي والنظافة',
      subtitle: 'حروف الصحة والنظافة',
      icon: '🧼',
      color: 'world-3',
      letters: ['ف', 'ه', 'ج', 'ط'],
      levels: [
        {
          id: '3-1', type: 'letter_intro', name: 'حرف الفاء', xp: 30,
          data: {
            letter: 'ف', color: '#E91E8E',
            forms: [
              { form: 'فـ', label: 'في البداية' },
              { form: 'ـفـ', label: 'في الوسط' },
              { form: 'ـف', label: 'في النهاية' },
              { form: 'ف', label: 'منفردة' }
            ],
            words: [
              { word: 'فُطُور', emoji: '🍳' },
              { word: 'فُرْشَاة', emoji: '🪥' },
              { word: 'مِنْشَفَة', emoji: '🧻' },
              { word: 'فَنْجَان', emoji: '☕' },
            ],
            sentence: 'نَظَّفَ فَارِس أَسْنَانَه بالفُرْشَاة والمَعْجُون.'
          }
        },
        {
          id: '3-2', type: 'mcq', name: 'الطفل والمِرْآة', xp: 40, timed: true,
          data: {
            questions: [
              { q: 'أيّ كلمة تبدأ بحرف الفاء؟', choices: ['فُرْشَاة', 'نَظِيف', 'صَابُون', 'حَنَفِيَّة'], answer: 0, emoji: '🪥' },
              { q: 'ماذا يستخدم الطفل لتنظيف أسنانه؟', choices: ['الفُرْشَاة والمَعْجُون', 'الصَّابُون', 'المِنْشَفَة', 'الماء فقط'], answer: 0, emoji: '😁' },
              { q: '"نَظِيف" عكسه...', choices: ['وَسِخ', 'جَمِيل', 'كَبِير', 'قَوِي'], answer: 0, emoji: '🧼' },
              { q: '"فُطُور صِحِّي" يعني...', choices: ['أكل صباحي مفيد', 'عشاء', 'حلوى', 'مشروب'], answer: 0, emoji: '🥗' },
              { q: '"الطَّهَارَة مِن الإِيمَان" تعني النظافة من...', choices: ['الدِّين', 'اللُّعْبَة', 'المَدْرَسَة', 'الطَّعَام'], answer: 0, emoji: '☪️' },
            ]
          }
        },
        {
          id: '3-3', type: 'memory', name: 'ذاكرة النظافة', xp: 50,
          data: {
            pairs: [
              { a: 'فُرْشَاة', b: '🪥' },
              { a: 'صَابُون', b: '🧼' },
              { a: 'مِنْشَفَة', b: '🧻' },
              { a: 'حَنَفِيَّة', b: '🚿' },
              { a: 'فَنْجَان', b: '☕' },
              { a: 'مِرْآة', b: '🪞' },
            ]
          }
        },
        {
          id: '3-4', type: 'letter_intro', name: 'حرف الهاء والجيم', xp: 30,
          data: {
            letter: 'ج', color: '#E91E8E',
            forms: [
              { form: 'جـ', label: 'في البداية' },
              { form: 'ـجـ', label: 'في الوسط' },
              { form: 'ـج', label: 'في النهاية' },
              { form: 'ج', label: 'منفردة' }
            ],
            words: [
              { word: 'جَسَد', emoji: '🧍' },
              { word: 'جَارَة', emoji: '👩' },
              { word: 'هَوَاء', emoji: '💨' },
              { word: 'هِلَال', emoji: '🌙' },
            ],
            sentence: 'تَعَاهَدَ هَانِي وَجَارُه عَلَى النَّظَافَة.'
          }
        },
        {
          id: '3-5', type: 'fill_blank', name: 'أكمل مع الطاء', xp: 50,
          data: {
            questions: [
              { sentence: 'تَوَضَّأَ هَانِي وَنَظَّفَ ___.', blank: 'أَسْنَانَه', options: ['أَسْنَانَه', 'كِتَابَه', 'حَقِيبَتَه', 'قَلَمَه'], emoji: '😁' },
              { sentence: 'غَسَلَ طَاهِر يَدَيْه بالمَاء وَالـ___.', blank: 'صَابُون', options: ['صَابُون', 'مَعْجُون', 'زَيْت', 'عَصِير'], emoji: '🧼' },
              { sentence: 'الـ___ الصِّحِّي مُهِم كُلَّ صَبَاح.', blank: 'فُطُور', options: ['فُطُور', 'غَدَاء', 'عَشَاء', 'حَلْوَى'], emoji: '🍳' },
              { sentence: 'تَنَشَّفَت هُدَى بـ___ نَظِيفَة.', blank: 'مِنْشَفَة', options: ['مِنْشَفَة', 'مَلَابِس', 'قِطْعَة', 'ورقة'], emoji: '🧻' },
            ]
          }
        },
        {
          id: '3-6', type: 'mcq', name: 'الصحة والجسد', xp: 40, timed: true,
          data: {
            questions: [
              { q: 'كم مرة نغسل أيدينا يوميًا؟', choices: ['كثيراً وبانتظام', 'مرة واحدة', 'في الصباح فقط', 'لا نغسلها'], answer: 0, emoji: '🙌' },
              { q: 'ما هو حرف الطاء؟', choices: ['ط', 'ت', 'د', 'ظ'], answer: 0, emoji: '🔤' },
              { q: '"طَاهِر" من الكلمات التي تبدأ بـ...', choices: ['الطاء', 'التاء', 'الدال', 'الزاي'], answer: 0, emoji: '✨' },
              { q: 'ماذا نستخدم لتجفيف اليدين؟', choices: ['المِنْشَفَة', 'الكِتَاب', 'الفُرْشَاة', 'القَلَم'], answer: 0, emoji: '🧻' },
              { q: '"جَسَدٌ سَلِيم" يعني...', choices: ['جسم صحيح ونظيف', 'جسم كبير', 'جسم قوي فقط', 'جسم جميل'], answer: 0, emoji: '💪' },
            ]
          }
        },
        {
          id: '3-7', type: 'matching', name: 'وصّل بالمعنى', xp: 60,
          data: {
            pairs: [
              { right: 'نَظَّفَ', left: 'مَسَحَ الوَسَخ' },
              { right: 'تَوَضَّأَ', left: 'غَسَلَ للصَّلَاة' },
              { right: 'اسْتَحَمَّ', left: 'غَسَلَ الجَسَد' },
              { right: 'تَنَشَّفَ', left: 'جَفَّفَ جِسْمَه' },
            ]
          }
        },
        {
          id: '3-8', type: 'sentence_build', name: 'رتّب الجملة', xp: 70,
          data: {
            sentences: [
              { words: ['فَارِس', 'نَظَّفَ', 'أَسْنَانَه', 'بِالفُرْشَاة'], correct: 'نَظَّفَ فَارِس أَسْنَانَه بِالفُرْشَاة' },
              { words: ['الجِسْم', 'النَّظِيف', 'صَحِيح', 'وَجَمِيل'], correct: 'الجِسْم النَّظِيف صَحِيح وَجَمِيل' },
              { words: ['الهَوَاء', 'النَّظِيف', 'مُفِيد', 'لِلصِّحَّة'], correct: 'الهَوَاء النَّظِيف مُفِيد لِلصِّحَّة' },
            ]
          }
        },
      ]
    },

    {
      id: 4,
      name: 'أنيسي في الريف',
      subtitle: 'حروف الطبيعة والريف',
      icon: '🌿',
      color: 'world-4',
      letters: ['ز', 'ع', 'غ', 'ق'],
      levels: [
        {
          id: '4-1', type: 'letter_intro', name: 'حرف الزاي', xp: 30,
          data: {
            letter: 'ز', color: '#27AE60',
            forms: [
              { form: 'زَ', label: 'فتحة' },
              { form: 'زِ', label: 'كسرة' },
              { form: 'زُ', label: 'ضمة' },
              { form: 'زْ', label: 'ساكنة' }
            ],
            words: [
              { word: 'زَيْتُون', emoji: '🫒' },
              { word: 'زَهْرَة', emoji: '🌸' },
              { word: 'مَاعِز', emoji: '🐐' },
              { word: 'زَرْع', emoji: '🌾' },
            ],
            sentence: 'زَارَ حَازِم وَزَيْنَب ضَيْعَة العَمّ حَمْزَة.'
          }
        },
        {
          id: '4-2', type: 'mcq', name: 'في الضيعة', xp: 40, timed: true,
          data: {
            questions: [
              { q: '"ضَيْعَة" تعني...', choices: ['مزرعة في الريف', 'مدرسة', 'متجر', 'مستشفى'], answer: 0, emoji: '🌾' },
              { q: 'أيّ كلمة تبدأ بحرف الزاي؟', choices: ['زَيْتُون', 'عِنَب', 'تِين', 'رُمَّان'], answer: 0, emoji: '🫒' },
              { q: '"فَرَّ حَازِم الأَوْرَاق" يعني...', choices: ['رتّب الأوراق', 'قرأ الأوراق', 'رسم الأوراق', 'ألقى الأوراق'], answer: 0, emoji: '🍃' },
              { q: '"مَاعَز" هو نوع من...', choices: ['الحيوانات', 'الأشجار', 'الأدوات', 'الألعاب'], answer: 0, emoji: '🐐' },
              { q: '"أَيْنَ الخُبْز؟" هذه...', choices: ['جملة استفهام', 'جملة خبر', 'جملة أمر', 'جملة نداء'], answer: 0, emoji: '❓' },
            ]
          }
        },
        {
          id: '4-3', type: 'memory', name: 'ذاكرة الريف', xp: 50,
          data: {
            pairs: [
              { a: 'زَيْتُون', b: '🫒' },
              { a: 'مَاعِز', b: '🐐' },
              { a: 'زَهْرَة', b: '🌸' },
              { a: 'قَمْح', b: '🌾' },
              { a: 'عِنَب', b: '🍇' },
              { a: 'تِين', b: '🫐' },
            ]
          }
        },
        {
          id: '4-4', type: 'letter_intro', name: 'حرف العين', xp: 30,
          data: {
            letter: 'ع', color: '#27AE60',
            forms: [
              { form: 'عـ', label: 'في البداية' },
              { form: 'ـعـ', label: 'في الوسط' },
              { form: 'ـع', label: 'في النهاية' },
              { form: 'ع', label: 'منفردة' }
            ],
            words: [
              { word: 'عِنَب', emoji: '🍇' },
              { word: 'عُصْفُور', emoji: '🐦' },
              { word: 'عَمّ', emoji: '👴' },
              { word: 'عَيْن', emoji: '👁️' },
            ],
            sentence: 'قَطَفَ عُمَر عِنَبًا وَتَفَاحًا من الضَّيْعَة.'
          }
        },
        {
          id: '4-5', type: 'fill_blank', name: 'أكمل مع الغين', xp: 50,
          data: {
            questions: [
              { sentence: 'غَرَسَ المُزَارِع ___ في البُسْتَان.', blank: 'شَجَرَة', options: ['شَجَرَة', 'حَجَرًا', 'كُرْسِيًّا', 'بَابًا'], emoji: '🌳' },
              { sentence: 'نَظَرَ عُمَر إِلَى ___ يُغَرِّد.', blank: 'عُصْفُور', options: ['عُصْفُور', 'كَلْب', 'قِطَّة', 'سَمَكَة'], emoji: '🐦' },
              { sentence: 'فِي الضَّيْعَة أَشْجَار ___ كَثِيرَة.', blank: 'زَيْتُون', options: ['زَيْتُون', 'نَخِيل', 'تُفَّاح', 'لَيْمُون'], emoji: '🫒' },
              { sentence: 'قَالَت العَنْزَة ___ لِلأَطْفَال.', blank: 'مَأْمَأَت', options: ['مَأْمَأَت', 'غَرَّدَت', 'صَاحَت', 'نَبَحَت'], emoji: '🐐' },
            ]
          }
        },
        {
          id: '4-6', type: 'mcq', name: 'حرف القاف', xp: 40, timed: true,
          data: {
            questions: [
              { q: 'أيّ كلمة تبدأ بحرف القاف؟', choices: ['قَمْح', 'زَيْتُون', 'عِنَب', 'مَاعِز'], answer: 0, emoji: '🌾' },
              { q: '"قَمْح" يصنع منه...', choices: ['الخُبْز', 'العَصِير', 'الزَّيْت', 'السُّكَّر'], answer: 0, emoji: '🍞' },
              { q: '"غَابَة" تعني...', choices: ['أرض كثيرة الأشجار', 'نهر كبير', 'جبل عالٍ', 'بحيرة'], answer: 0, emoji: '🌲' },
              { q: '"عِنَب" من أيّ نوع؟', choices: ['فاكهة', 'خضروات', 'حبوب', 'لحوم'], answer: 0, emoji: '🍇' },
              { q: 'ما عكس "بَعِيد"؟', choices: ['قَرِيب', 'صَغِير', 'جَمِيل', 'نَظِيف'], answer: 0, emoji: '📏' },
            ]
          }
        },
        {
          id: '4-7', type: 'matching', name: 'حيوانات الريف', xp: 60,
          data: {
            pairs: [
              { right: 'عُصْفُور', left: '🐦' },
              { right: 'مَاعِز', left: '🐐' },
              { right: 'دِيك', left: '🐓' },
              { right: 'أَرْنَب', left: '🐇' },
              { right: 'فَرَس', left: '🐴' },
            ]
          }
        },
        {
          id: '4-8', type: 'sentence_build', name: 'رتّب الجملة', xp: 70,
          data: {
            sentences: [
              { words: ['زَارَ', 'حَازِم', 'ضَيْعَة', 'العَمّ'], correct: 'زَارَ حَازِم ضَيْعَة العَمّ' },
              { words: ['قَطَفَ', 'عُمَر', 'عِنَبًا', 'مِن', 'الضَّيْعَة'], correct: 'قَطَفَ عُمَر عِنَبًا مِن الضَّيْعَة' },
              { words: ['الهَوَاء', 'فِي', 'الرِّيف', 'نَقِيٌّ', 'وَطَازَج'], correct: 'الهَوَاء فِي الرِّيف نَقِيٌّ وَطَازَج' },
            ]
          }
        },
      ]
    },

    {
      id: 5,
      name: 'أنيسي في السوق',
      subtitle: 'حروف التجارة والحرف',
      icon: '🛍️',
      color: 'world-5',
      letters: ['ش', 'ح', 'خ', 'ض'],
      levels: [
        {
          id: '5-1', type: 'letter_intro', name: 'حرف الشين', xp: 30,
          data: {
            letter: 'ش', color: '#8E44AD',
            forms: [
              { form: 'شـ', label: 'في البداية' },
              { form: 'ـشـ', label: 'في الوسط' },
              { form: 'ـش', label: 'في النهاية' },
              { form: 'ش', label: 'منفردة' }
            ],
            words: [
              { word: 'شُكْرِي', emoji: '👦' },
              { word: 'نُحَاس', emoji: '🥣' },
              { word: 'شَارِع', emoji: '🛣️' },
              { word: 'نَقَّاش', emoji: '🎨' },
            ],
            sentence: 'وَصَلَ شُكْرِي إِلَى دُكَّان عَلَى بَابِه أَطْبَاق مَنْقُوشَة.'
          }
        },
        {
          id: '5-2', type: 'mcq', name: 'في السوق', xp: 40, timed: true,
          data: {
            questions: [
              { q: '"نَقَّاش" هو شخص يعمل في...', choices: ['النَّقْش والزخرفة', 'الطهي', 'التعليم', 'الزراعة'], answer: 0, emoji: '🎨' },
              { q: 'أيّ كلمة تبدأ بحرف الشين؟', choices: ['شَارِع', 'نُحَاس', 'حَدَّاد', 'بَائِع'], answer: 0, emoji: '🛣️' },
              { q: '"مَنْقُوشَة" تعني...', choices: ['عليها نقوش وزخارف', 'جديدة', 'كبيرة', 'ملوّنة'], answer: 0, emoji: '🏺' },
              { q: '"خَزَّاف" هو حِرْفِي يعمل مع...', choices: ['الطِّين', 'الخشب', 'الحديد', 'القماش'], answer: 0, emoji: '🏺' },
              { q: 'ما هو "السُّوق"؟', choices: ['مكان البيع والشراء', 'مكان الراحة', 'مكان الدراسة', 'مكان اللعب'], answer: 0, emoji: '🏪' },
            ]
          }
        },
        {
          id: '5-3', type: 'memory', name: 'ذاكرة الحِرَف', xp: 50,
          data: {
            pairs: [
              { a: 'نَقَّاش', b: '🖼️' },
              { a: 'خَزَّاف', b: '🏺' },
              { a: 'حَدَّاد', b: '⚒️' },
              { a: 'خَيَّاط', b: '🧵' },
              { a: 'نَجَّار', b: '🪵' },
              { a: 'صَيَّاد', b: '🎣' },
            ]
          }
        },
        {
          id: '5-4', type: 'letter_intro', name: 'حرف الحاء', xp: 30,
          data: {
            letter: 'ح', color: '#8E44AD',
            forms: [
              { form: 'حـ', label: 'في البداية' },
              { form: 'ـحـ', label: 'في الوسط' },
              { form: 'ـح', label: 'في النهاية' },
              { form: 'ح', label: 'منفردة' }
            ],
            words: [
              { word: 'حَرِيرَة', emoji: '🧶' },
              { word: 'حَدَّاد', emoji: '⚒️' },
              { word: 'خُبْز', emoji: '🍞' },
              { word: 'خَيَّاط', emoji: '🧵' },
            ],
            sentence: 'زَارَ حَسَن وَخَالِد سُوقَ الحَرَفِيِّين.'
          }
        },
        {
          id: '5-5', type: 'fill_blank', name: 'أكمل مع الخاء', xp: 50,
          data: {
            questions: [
              { sentence: 'اشْتَرَت أُمُّ شُكْرِي ___ مِن السُّوق.', blank: 'خُبْزًا', options: ['خُبْزًا', 'قَلَمًا', 'كِتَابًا', 'فُسْتَانًا'], emoji: '🍞' },
              { sentence: 'يَعْمَل الخَيَّاط بـ___ وإِبْرَة.', blank: 'خَيْط', options: ['خَيْط', 'مِطْرَقَة', 'مِنْشَار', 'قَلَم'], emoji: '🧵' },
              { sentence: 'صَنَعَ الخَزَّاف ___ مِن الطِّين.', blank: 'إِنَاء', options: ['إِنَاء', 'كِتَاب', 'خُبْز', 'فُسْتَان'], emoji: '🏺' },
              { sentence: 'فِي السُّوق بَائِعُون كَثِيرُو الـ___.', blank: 'حِرَف', options: ['حِرَف', 'كُتُب', 'أَلْعَاب', 'ثِيَاب'], emoji: '🏪' },
            ]
          }
        },
        {
          id: '5-6', type: 'mcq', name: 'الحرف اليدوية', xp: 40, timed: true,
          data: {
            questions: [
              { q: 'أيّ كلمة تبدأ بحرف الخاء؟', choices: ['خَيَّاط', 'حَدَّاد', 'نَجَّار', 'صَيَّاد'], answer: 0, emoji: '🧵' },
              { q: 'ما هو "الضَّيَّاف"؟', choices: ['من يستقبل الضيوف', 'من يبيع الأطعمة', 'من يعمل بالنسيج', 'من يصنع الفخار'], answer: 0, emoji: '🏠' },
              { q: 'أيّ كلمة تبدأ بحرف الضاد؟', choices: ['ضَيْف', 'خَيَّاط', 'حَدَّاد', 'نَجَّار'], answer: 0, emoji: '👋' },
              { q: '"نُحَاس" هو نوع من...', choices: ['المعادن', 'الأشجار', 'الأقمشة', 'الأطعمة'], answer: 0, emoji: '🔶' },
              { q: 'ما مفرد "أَسْوَاق"؟', choices: ['سُوق', 'سُوقَان', 'سَائِق', 'سَوْق'], answer: 0, emoji: '🏪' },
            ]
          }
        },
        {
          id: '5-7', type: 'matching', name: 'الحرفي وعمله', xp: 60,
          data: {
            pairs: [
              { right: 'نَجَّار', left: 'يَصْنَع الخَشَب' },
              { right: 'خَيَّاط', left: 'يَخِيط الثِّيَاب' },
              { right: 'حَدَّاد', left: 'يَصْنَع الحَدِيد' },
              { right: 'خَزَّاف', left: 'يَصْنَع الفَخَّار' },
            ]
          }
        },
        {
          id: '5-8', type: 'sentence_build', name: 'رتّب الجملة', xp: 70,
          data: {
            sentences: [
              { words: ['وَصَلَ', 'شُكْرِي', 'إِلَى', 'دُكَّان', 'النَّقَّاش'], correct: 'وَصَلَ شُكْرِي إِلَى دُكَّان النَّقَّاش' },
              { words: ['السُّوق', 'مَكَان', 'البَيْع', 'وَالشِّرَاء'], correct: 'السُّوق مَكَان البَيْع وَالشِّرَاء' },
              { words: ['الحِرَف', 'اليَدَوِيَّة', 'تُرَاثٌ', 'جَمِيل'], correct: 'الحِرَف اليَدَوِيَّة تُرَاثٌ جَمِيل' },
            ]
          }
        },
      ]
    }
  ]
};

const ACHIEVEMENTS = [
  { id: 'first_star', icon: '⭐', text: 'أول نجمة! رائع!', condition: s => s.totalStars >= 1 },
  { id: 'ten_stars', icon: '🌟', text: '10 نجوم! أنت نجم!', condition: s => s.totalStars >= 10 },
  { id: 'world1_done', icon: '🏫', text: 'أتقنت وحدة المدرسة!', condition: s => s.completedWorlds.includes(1) },
  { id: 'world2_done', icon: '🏠', text: 'أتقنت وحدة الأهل!', condition: s => s.completedWorlds.includes(2) },
  { id: 'world3_done', icon: '🧼', text: 'أتقنت وحدة النظافة!', condition: s => s.completedWorlds.includes(3) },
  { id: 'world4_done', icon: '🌿', text: 'أتقنت وحدة الريف!', condition: s => s.completedWorlds.includes(4) },
  { id: 'all_done', icon: '🏆', text: 'أتممت جميع الوحدات! بطل!', condition: s => s.completedWorlds.length >= 5 },
  { id: 'speedster', icon: '⚡', text: 'المسرع! أجبت بسرعة!', condition: s => s.fastAnswers >= 5 },
];

// ===== STATE =====
let state = {
  xp: 0,
  totalStars: 0,
  levels: {},       // { levelId: { stars, score } }
  unlockedWorlds: [1],
  completedWorlds: [],
  achievements: [],
  fastAnswers: 0,
};

let currentWorld = null;
let currentLevel = null;
let gameSession = {
  score: 0,
  correctCount: 0,
  questionIndex: 0,
  questions: [],
  timer: null,
  timeLeft: 0,
};

// ===== SAVE / LOAD =====
function saveState() {
  localStorage.setItem('anisi_state', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('anisi_state');
  if (saved) {
    try { state = { ...state, ...JSON.parse(saved) }; } catch(e) {}
  }
}

// ===== SCREEN NAVIGATION =====
function showScreen(id, direction = 'in') {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active', 'slide-in', 'slide-out');
    s.style.display = 'none';
  });
  const el = document.getElementById(id);
  el.style.display = 'flex';
  el.classList.add('active');
  if (direction === 'in') el.classList.add('slide-in');
}

// ===== PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.4 + 0.1,
    alpha: Math.random() * 0.5 + 0.1,
    color: ['#6C3CE1','#FF6B6B','#FFD700','#4CAF50','#2980B9'][Math.floor(Math.random()*5)]
  }));

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

// ===== CONFETTI =====
function spawnConfetti() {
  const colors = ['#FFD700','#FF6B6B','#6C3CE1','#4CAF50','#FF9F43','#2980B9','#E91E8E'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      transform: rotate(${Math.random() * 360}deg);
      --duration: ${Math.random() * 2 + 1.5}s;
      --delay: ${Math.random() * 1.5}s;
      width: ${Math.random() * 10 + 6}px;
      height: ${Math.random() * 10 + 6}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ===== FIREWORKS =====
function spawnFireworks() {
  const container = document.getElementById('fireworks');
  container.innerHTML = '';
  const colors = ['#FFD700','#FF6B6B','#6C3CE1','#4CAF50','#E91E8E'];
  for (let b = 0; b < 5; b++) {
    const cx = Math.random() * window.innerWidth;
    const cy = Math.random() * (window.innerHeight * 0.5);
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div');
      el.className = 'firework-particle';
      const angle = (i / 20) * Math.PI * 2;
      const dist = Math.random() * 120 + 60;
      el.style.cssText = `
        left: ${cx}px; top: ${cy}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        --dx: ${Math.cos(angle) * dist}px;
        --dy: ${Math.sin(angle) * dist}px;
        animation-delay: ${b * 0.3}s;
        animation-duration: ${Math.random() * 0.5 + 0.8}s;
      `;
      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  }
}

// ===== SOUND EFFECTS (Web Audio) =====
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === 'correct') {
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.1);
      osc.frequency.setValueAtTime(784, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now); osc.stop(now + 0.5);
    } else if (type === 'wrong') {
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.setValueAtTime(200, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now); osc.stop(now + 0.4);
    } else if (type === 'complete') {
      [523,659,784,1047].forEach((f, i) => {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.connect(g2); g2.connect(ctx.destination);
        o2.frequency.setValueAtTime(f, now + i * 0.12);
        g2.gain.setValueAtTime(0.15, now + i * 0.12);
        g2.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);
        o2.start(now + i * 0.12); o2.stop(now + i * 0.12 + 0.5);
      });
    } else if (type === 'click') {
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now); osc.stop(now + 0.1);
    }
  } catch(e) {}
}

// ===== ACHIEVEMENT SYSTEM =====
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.condition(state)) {
      state.achievements.push(ach.id);
      saveState();
      showAchievementToast(ach.icon, ach.text);
    }
  });
}

function showAchievementToast(icon, text) {
  const toast = document.getElementById('achievement-toast');
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-text').textContent = text;
  toast.style.display = 'flex';
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.style.display = 'none', 500);
  }, 3500);
}

// ===== XP SYSTEM =====
function addXP(amount) {
  state.xp += amount;
  updateXPBar();
  saveState();
}

function updateXPBar() {
  const levelThreshold = 100;
  const xpInLevel = state.xp % levelThreshold;
  const pct = (xpInLevel / levelThreshold) * 100;
  const bar = document.getElementById('xp-bar');
  const label = document.getElementById('xp-label');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = `${xpInLevel} / ${levelThreshold} XP`;
}

// ===== MAP SCREEN =====
function buildMapScreen() {
  const container = document.getElementById('worlds-container');
  container.innerHTML = '';

  GAME_DATA.worlds.forEach(world => {
    const unlocked = state.unlockedWorlds.includes(world.id);
    const totalLevels = world.levels.length;
    const completedLevels = world.levels.filter(l => state.levels[l.id]?.stars > 0).length;
    const worldStars = world.levels.reduce((acc, l) => acc + (state.levels[l.id]?.stars || 0), 0);
    const maxStars = totalLevels * 3;
    const progress = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;

    const card = document.createElement('div');
    card.className = `world-card ${world.color} ${unlocked ? '' : 'locked'}`;
    card.innerHTML = `
      ${!unlocked ? '<div class="world-lock">🔒</div>' : ''}
      <div class="world-card-inner">
        <div class="world-icon">${world.icon}</div>
        <div class="world-info">
          <div class="world-name">${world.name}</div>
          <div class="world-subtitle">${world.subtitle}</div>
          <div class="world-letters">
            ${world.letters.map(l => `<span class="letter-badge">${l}</span>`).join('')}
          </div>
        </div>
        <div class="world-progress-wrap">
          <div class="world-stars">⭐ ${worldStars}/${maxStars}</div>
          <div class="world-progress-bar-wrap">
            <div class="world-progress-bar" style="width:${progress}%"></div>
          </div>
          <div style="font-size:12px;color:rgba(255,255,255,0.7);font-weight:600">${completedLevels}/${totalLevels}</div>
        </div>
      </div>
    `;

    if (unlocked) {
      card.addEventListener('click', () => {
        playSound('click');
        openWorldLevels(world);
      });
    } else {
      card.addEventListener('click', () => {
        showFeedback('🔒', 'أكمل الوحدة السابقة لفتح هذه الوحدة!');
      });
    }

    container.appendChild(card);

    // Animate in
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    requestAnimationFrame(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.transitionDelay = `${world.id * 0.08}s`;
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });

  // Update header stats
  document.getElementById('total-stars').textContent = state.totalStars;
  updateXPBar();
}

// ===== LEVEL SELECT SCREEN =====
function openWorldLevels(world) {
  currentWorld = world;
  document.getElementById('lvl-world-icon').textContent = world.icon;
  document.getElementById('lvl-world-name').textContent = world.name;

  const grid = document.getElementById('levels-grid');
  grid.innerHTML = '';

  world.levels.forEach((level, idx) => {
    const unlocked = idx === 0 || state.levels[world.levels[idx - 1].id]?.stars > 0;
    const levelData = state.levels[level.id] || { stars: 0, score: 0 };
    const isNew = unlocked && levelData.stars === 0;

    const typeIcons = {
      letter_intro: '📖', mcq: '❓', memory: '🧠',
      fill_blank: '✏️', sentence_build: '🧩', matching: '🔗'
    };
    const typeNames = {
      letter_intro: 'استكشاف', mcq: 'اختيارات', memory: 'ذاكرة',
      fill_blank: 'تكميل', sentence_build: 'ترتيب', matching: 'توصيل'
    };

    const card = document.createElement('div');
    card.className = `level-card lvl-color-${world.id} ${unlocked ? '' : 'locked'} ${levelData.stars > 0 ? 'completed' : ''} ${isNew ? 'pulse-new' : ''}`;
    card.innerHTML = `
      <div class="level-number">${idx + 1}</div>
      <div class="level-type-icon">${typeIcons[level.type] || '🎮'}</div>
      <div class="level-type-name">${typeNames[level.type] || level.type}</div>
      <div class="level-stars">
        ${[1,2,3].map(s => `<span class="star-sm ${levelData.stars >= s ? 'earned' : ''}">⭐</span>`).join('')}
      </div>
      ${!unlocked ? '<div class="level-lock-icon">🔒</div>' : ''}
    `;

    if (unlocked) {
      card.addEventListener('click', () => {
        playSound('click');
        startLevel(level);
      });
    }

    grid.appendChild(card);
  });

  showScreen('screen-levels');
}

// ===== GAME ENGINE =====
function startLevel(level) {
  currentLevel = level;
  gameSession = {
    score: 0,
    correctCount: 0,
    questionIndex: 0,
    questions: [],
    timer: null,
    timeLeft: 0,
  };

  document.getElementById('game-level-name').textContent = level.name;
  document.getElementById('game-score').textContent = '0';
  document.getElementById('game-progress-bar').style.width = '0%';
  document.getElementById('game-feedback').style.display = 'none';

  showScreen('screen-game');

  const timerWrap = document.getElementById('timer-wrap');
  timerWrap.style.display = level.timed ? 'block' : 'none';

  renderLevel(level);
}

function renderLevel(level) {
  const container = document.getElementById('game-container');
  container.innerHTML = '';

  switch (level.type) {
    case 'letter_intro': renderLetterIntro(level, container); break;
    case 'mcq':          renderMCQ(level, container); break;
    case 'memory':       renderMemory(level, container); break;
    case 'fill_blank':   renderFillBlank(level, container); break;
    case 'sentence_build': renderSentenceBuild(level, container); break;
    case 'matching':     renderMatching(level, container); break;
    default:             renderMCQ(level, container);
  }
}

// ===== LETTER INTRO =====
function renderLetterIntro(level, container) {
  const d = level.data;
  let step = 0;

  function renderStep() {
    container.innerHTML = '';
    if (step === 0) {
      // Show letter with forms
      const el = document.createElement('div');
      el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:24px;width:100%;max-width:500px';
      el.innerHTML = `
        <div class="question-text">تعرَّف على حرف: <span style="color:${d.color}">${d.letter}</span></div>
        <div class="letter-display" style="color:${d.color};border-color:${d.color}40">${d.letter}</div>
        <div class="letter-forms">
          ${d.forms.map(f => `
            <div class="letter-form-card">
              <div class="letter-form-big" style="color:${d.color}">${f.form}</div>
              <div class="letter-form-label">${f.label}</div>
            </div>
          `).join('')}
        </div>
        <button class="btn-next" id="btn-letter-next">التالي ←</button>
      `;
      container.appendChild(el);
      document.getElementById('btn-letter-next').addEventListener('click', () => { step = 1; renderStep(); playSound('click'); });
    } else if (step === 1) {
      // Show words
      const el = document.createElement('div');
      el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:500px';
      el.innerHTML = `
        <div class="question-text">كلمات بحرف <span style="color:${d.color}">${d.letter}</span></div>
        <div class="word-cards">
          ${d.words.map(w => {
            const highlighted = w.word.replace(new RegExp(d.letter, 'g'), `<span style="color:${d.color};text-decoration:underline">${d.letter}</span>`);
            return `<div class="word-card"><span class="word-emoji">${w.emoji}</span><span>${highlighted}</span></div>`;
          }).join('')}
        </div>
        <button class="btn-next" id="btn-words-next">التالي ←</button>
      `;
      container.appendChild(el);
      document.getElementById('btn-words-next').addEventListener('click', () => { step = 2; renderStep(); playSound('click'); });
    } else {
      // Show sentence
      const highlighted = d.sentence.replace(new RegExp(d.letter, 'g'), `<span class="reading-highlight">${d.letter}</span>`);
      const el = document.createElement('div');
      el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:540px';
      el.innerHTML = `
        <div class="question-text">اقرأ الجملة</div>
        <div class="reading-card">
          <div class="reading-text">${highlighted}</div>
        </div>
        <button class="btn-next" id="btn-sentence-done">أتممت الدرس! 🎉</button>
      `;
      container.appendChild(el);
      document.getElementById('btn-sentence-done').addEventListener('click', () => {
        playSound('complete');
        finishLevel(3, 100); // Letter intro always gives 3 stars
      });
    }
    updateProgressBar(step / 3);
  }

  renderStep();
}

// ===== MCQ =====
function renderMCQ(level, container) {
  const questions = level.data.questions;
  gameSession.questions = [...questions];
  gameSession.questionIndex = 0;

  if (level.timed) startTimer(30);

  function showQuestion() {
    const q = gameSession.questions[gameSession.questionIndex];
    if (!q) { endMCQ(); return; }

    container.innerHTML = '';
    const el = document.createElement('div');
    el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:500px';

    const progress = `${gameSession.questionIndex + 1} / ${questions.length}`;
    el.innerHTML = `
      <div style="font-size:48px;text-align:center">${q.emoji || '❓'}</div>
      <div class="question-text">${q.q}</div>
      <div class="question-sub">${progress}</div>
      <div class="choices-grid" id="choices-grid"></div>
    `;
    container.appendChild(el);
    updateProgressBar(gameSession.questionIndex / questions.length);

    const grid = document.getElementById('choices-grid');
    q.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => handleMCQAnswer(idx, q.answer, btn, grid, level));
      grid.appendChild(btn);
    });

    if (level.timed) resetTimer(30);
  }

  showQuestion();

  function endMCQ() {
    clearTimer();
    const pct = gameSession.correctCount / questions.length;
    const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
    finishLevel(stars, gameSession.score);
  }

  // Store for timer access
  gameSession._showQuestion = showQuestion;
  gameSession._endMCQ = endMCQ;
}

function handleMCQAnswer(chosen, correct, btn, grid, level) {
  const allBtns = grid.querySelectorAll('.choice-btn');
  allBtns.forEach(b => b.disabled = true);

  if (chosen === correct) {
    btn.classList.add('correct');
    gameSession.score += 20;
    gameSession.correctCount++;
    if (level.timed && gameSession.timeLeft > 15) {
      gameSession.score += 10;
      state.fastAnswers++;
    }
    playSound('correct');
    document.getElementById('game-score').textContent = gameSession.score;
    showFeedback('✅', 'إجابة صحيحة! رائع!');
  } else {
    btn.classList.add('wrong');
    allBtns[correct].classList.add('correct');
    playSound('wrong');
    const explanation = level.data.questions[gameSession.questionIndex].choices[correct];
    showFeedback('❌', `الإجابة الصحيحة: ${explanation}`);
  }

  gameSession.questionIndex++;
  setTimeout(() => {
    document.getElementById('game-feedback').style.display = 'none';
    if (gameSession.questionIndex < gameSession.questions.length) {
      gameSession._showQuestion();
    } else {
      gameSession._endMCQ();
    }
  }, 1800);
}

// ===== MEMORY GAME =====
function renderMemory(level, container) {
  const pairs = [...level.data.pairs];
  const allCards = [];
  pairs.forEach(p => {
    allCards.push({ id: p.a, display: p.a, pairKey: p.a });
    allCards.push({ id: p.b, display: p.b, pairKey: p.a });
  });

  // Shuffle
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }

  const el = document.createElement('div');
  el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:16px;width:100%;max-width:500px';
  el.innerHTML = `
    <div class="question-text">اعثر على الأزواج المتطابقة 🧠</div>
    <div class="memory-grid" id="memory-grid" style="grid-template-columns: repeat(${Math.ceil(Math.sqrt(allCards.length))}, 1fr)"></div>
    <div style="font-size:14px;color:var(--clr-muted)" id="pairs-left">الأزواج المتبقية: ${pairs.length}</div>
  `;
  container.appendChild(el);

  const grid = document.getElementById('memory-grid');
  let flipped = [], matched = 0, locked = false;

  allCards.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card';
    cardEl.dataset.idx = idx;
    cardEl.dataset.pairKey = card.pairKey;
    cardEl.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-front">⭐</div>
        <div class="memory-back">${card.display}</div>
      </div>
    `;
    cardEl.addEventListener('click', () => {
      if (locked || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
      playSound('click');
      cardEl.classList.add('flipped');
      flipped.push(cardEl);

      if (flipped.length === 2) {
        locked = true;
        const [a, b] = flipped;
        if (a.dataset.pairKey === b.dataset.pairKey && a !== b) {
          // Match
          playSound('correct');
          a.classList.add('matched'); b.classList.add('matched');
          matched++;
          gameSession.score += 30;
          document.getElementById('game-score').textContent = gameSession.score;
          const left = pairs.length - matched;
          document.getElementById('pairs-left').textContent = `الأزواج المتبقية: ${left}`;
          flipped = []; locked = false;
          if (matched === pairs.length) {
            setTimeout(() => finishLevel(3, gameSession.score), 600);
          }
        } else {
          playSound('wrong');
          setTimeout(() => {
            a.classList.remove('flipped'); b.classList.remove('flipped');
            flipped = []; locked = false;
          }, 1000);
        }
      }
    });
    grid.appendChild(cardEl);
  });

  updateProgressBar(0);
}

// ===== FILL IN BLANK =====
function renderFillBlank(level, container) {
  const questions = level.data.questions;
  gameSession.questionIndex = 0;

  function showQ() {
    const q = questions[gameSession.questionIndex];
    if (!q) {
      const pct = gameSession.correctCount / questions.length;
      const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
      finishLevel(stars, gameSession.score);
      return;
    }

    container.innerHTML = '';
    updateProgressBar(gameSession.questionIndex / questions.length);

    const el = document.createElement('div');
    el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:24px;width:100%;max-width:500px';

    const sentenceHtml = q.sentence.replace('___', `<span class="blank-input-field" id="blank-answer">___</span>`);

    el.innerHTML = `
      <div style="font-size:48px">${q.emoji || '📝'}</div>
      <div class="question-text">أكمل الجملة بالكلمة المناسبة</div>
      <div class="blank-sentence">${sentenceHtml}</div>
      <div class="blank-options" id="blank-options"></div>
    `;
    container.appendChild(el);

    const opts = [...q.options].sort(() => Math.random() - 0.5);
    const optContainer = document.getElementById('blank-options');
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'blank-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (btn.classList.contains('used')) return;
        const blankEl = document.getElementById('blank-answer');
        const isCorrect = opt === q.blank;

        blankEl.textContent = opt;
        blankEl.style.color = isCorrect ? 'var(--clr-success)' : 'var(--clr-error)';
        blankEl.style.borderBottomColor = isCorrect ? 'var(--clr-success)' : 'var(--clr-error)';
        btn.classList.add('used');
        optContainer.querySelectorAll('.blank-option').forEach(b => b.disabled = true);

        if (isCorrect) {
          gameSession.score += 25;
          gameSession.correctCount++;
          playSound('correct');
          showFeedback('✅', 'إجابة صحيحة! 🎉');
        } else {
          playSound('wrong');
          showFeedback('❌', `الإجابة الصحيحة: ${q.blank}`);
          // Show correct
          optContainer.querySelectorAll('.blank-option').forEach(b => {
            if (b.textContent === q.blank) b.style.color = 'var(--clr-success)';
          });
        }
        document.getElementById('game-score').textContent = gameSession.score;
        gameSession.questionIndex++;
        setTimeout(() => {
          document.getElementById('game-feedback').style.display = 'none';
          showQ();
        }, 2000);
      });
      optContainer.appendChild(btn);
    });
  }

  showQ();
}

// ===== SENTENCE BUILD (Drag & Drop) =====
function renderSentenceBuild(level, container) {
  const sentences = level.data.sentences;
  gameSession.questionIndex = 0;

  function showSentence() {
    const sent = sentences[gameSession.questionIndex];
    if (!sent) {
      const pct = gameSession.correctCount / sentences.length;
      const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
      finishLevel(stars, gameSession.score);
      return;
    }

    container.innerHTML = '';
    updateProgressBar(gameSession.questionIndex / sentences.length);

    const shuffled = [...sent.words].sort(() => Math.random() - 0.5);
    let dropOrder = [];

    const el = document.createElement('div');
    el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:560px';
    el.innerHTML = `
      <div class="question-text">رتّب الكلمات لتكوين جملة صحيحة</div>
      <div class="sentence-builder">
        <div class="drop-zone" id="drop-zone"></div>
        <div class="word-bank" id="word-bank"></div>
      </div>
      <div style="display:flex;gap:12px">
        <button class="btn-next" id="btn-check-sentence">تحقق ✓</button>
        <button class="btn-secondary" id="btn-clear-sentence">مسح 🔄</button>
      </div>
    `;
    container.appendChild(el);

    const dropZone = document.getElementById('drop-zone');
    const wordBank = document.getElementById('word-bank');

    function createToken(word, source) {
      const t = document.createElement('div');
      t.className = 'word-token';
      t.textContent = word;
      t.draggable = true;
      t.dataset.word = word;

      t.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', word);
        e.dataTransfer.setData('source', source);
        t.style.opacity = '0.5';
      });
      t.addEventListener('dragend', () => { t.style.opacity = '1'; });

      // Touch support
      t.addEventListener('click', () => {
        if (source === 'bank') {
          dropZone.appendChild(createToken(word, 'drop'));
          dropOrder.push(word);
          t.remove();
        } else {
          wordBank.appendChild(createToken(word, 'bank'));
          dropOrder = dropOrder.filter(w => w !== word);
          t.remove();
        }
      });

      return t;
    }

    shuffled.forEach(word => wordBank.appendChild(createToken(word, 'bank')));

    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      const word = e.dataTransfer.getData('text/plain');
      const src = e.dataTransfer.getData('source');
      if (src === 'bank') {
        const token = [...wordBank.children].find(t => t.dataset.word === word);
        if (token) {
          dropZone.appendChild(createToken(word, 'drop'));
          dropOrder.push(word);
          token.remove();
        }
      }
    });

    document.getElementById('btn-clear-sentence').addEventListener('click', () => {
      [...dropZone.children].forEach(t => wordBank.appendChild(createToken(t.dataset.word, 'bank')));
      dropZone.innerHTML = '';
      dropOrder = [];
    });

    document.getElementById('btn-check-sentence').addEventListener('click', () => {
      const builtWords = [...dropZone.children].map(t => t.dataset.word);
      const built = builtWords.join(' ');
      const correct = sent.correct.split(' ');
      const isCorrect = JSON.stringify(builtWords) === JSON.stringify(correct)
        || JSON.stringify(builtWords.reverse()) === JSON.stringify([...correct].reverse())
        || built === sent.correct
        || builtWords.every((w, i) => correct.includes(w));

      // Strict check
      const strictCorrect = builtWords.join(' ') === sent.correct || builtWords.every((w, i) => w === correct[i]);

      if (builtWords.length < sent.words.length) {
        showFeedback('⚠️', 'ضع كل الكلمات في المنطقة!');
        return;
      }

      if (strictCorrect || built === sent.correct) {
        gameSession.score += 40;
        gameSession.correctCount++;
        playSound('correct');
        showFeedback('✅', 'جملة صحيحة! 🎉');
      } else {
        playSound('wrong');
        showFeedback('❌', `الجملة الصحيحة: ${sent.correct}`);
      }
      document.getElementById('game-score').textContent = gameSession.score;
      gameSession.questionIndex++;
      setTimeout(() => {
        document.getElementById('game-feedback').style.display = 'none';
        showSentence();
      }, 2200);
    });
  }

  showSentence();
}

// ===== MATCHING GAME =====
function renderMatching(level, container) {
  const pairs = [...level.data.pairs].sort(() => Math.random() - 0.5);
  const rightItems = pairs.map(p => p.right).sort(() => Math.random() - 0.5);
  const leftItems = pairs.map(p => p.left).sort(() => Math.random() - 0.5);

  let selectedRight = null, matched = 0;
  const correctMap = {};
  pairs.forEach(p => { correctMap[p.right] = p.left; });

  const el = document.createElement('div');
  el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:500px';
  el.innerHTML = `
    <div class="question-text">وصّل كل كلمة بما يناسبها</div>
    <div class="matching-wrap" id="match-wrap">
      <div class="match-col" id="col-right"></div>
      <div class="match-col" id="col-left"></div>
    </div>
  `;
  container.appendChild(el);

  const colRight = document.getElementById('col-right');
  const colLeft = document.getElementById('col-left');

  rightItems.forEach(word => {
    const item = document.createElement('div');
    item.className = 'match-item';
    item.style.background = 'rgba(108,60,225,0.1)';
    item.style.border = '2px solid rgba(108,60,225,0.3)';
    item.textContent = word;
    item.dataset.word = word;
    item.addEventListener('click', () => {
      if (item.classList.contains('correct-match')) return;
      document.querySelectorAll('#col-right .match-item.selected').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedRight = word;
      playSound('click');
    });
    colRight.appendChild(item);
  });

  leftItems.forEach(word => {
    const item = document.createElement('div');
    item.className = 'match-item';
    item.style.background = 'rgba(255,107,107,0.08)';
    item.style.border = '2px solid rgba(255,107,107,0.2)';
    item.textContent = word;
    item.dataset.word = word;
    item.addEventListener('click', () => {
      if (!selectedRight || item.classList.contains('correct-match')) return;
      const expectedLeft = correctMap[selectedRight];

      if (word === expectedLeft) {
        playSound('correct');
        // Mark both correct
        document.querySelector(`#col-right .match-item[data-word="${selectedRight}"]`).classList.add('correct-match');
        item.classList.add('correct-match');
        matched++;
        gameSession.score += 25;
        document.getElementById('game-score').textContent = gameSession.score;
        if (matched === pairs.length) {
          setTimeout(() => finishLevel(3, gameSession.score), 600);
        }
      } else {
        playSound('wrong');
        document.querySelector(`#col-right .match-item[data-word="${selectedRight}"]`).classList.add('wrong-match');
        item.classList.add('wrong-match');
        setTimeout(() => {
          document.querySelector(`#col-right .match-item[data-word="${selectedRight}"]`)?.classList.remove('wrong-match', 'selected');
          item.classList.remove('wrong-match');
        }, 700);
      }
      selectedRight = null;
    });
    colLeft.appendChild(item);
  });

  updateProgressBar(0);
}

// ===== TIMER =====
function startTimer(seconds) {
  gameSession.timeLeft = seconds;
  document.getElementById('timer-text').textContent = seconds;
  document.getElementById('timer-circle').classList.remove('urgent');

  if (gameSession.timer) clearInterval(gameSession.timer);
  gameSession.timer = setInterval(() => {
    gameSession.timeLeft--;
    document.getElementById('timer-text').textContent = gameSession.timeLeft;
    if (gameSession.timeLeft <= 10) document.getElementById('timer-circle').classList.add('urgent');
    if (gameSession.timeLeft <= 0) {
      clearInterval(gameSession.timer);
      if (gameSession._showQuestion) gameSession._showQuestion();
    }
  }, 1000);
}

function resetTimer(seconds) {
  if (gameSession.timer) clearInterval(gameSession.timer);
  startTimer(seconds);
}

function clearTimer() {
  if (gameSession.timer) clearInterval(gameSession.timer);
  document.getElementById('timer-wrap').style.display = 'none';
}

// ===== PROGRESS BAR =====
function updateProgressBar(pct) {
  document.getElementById('game-progress-bar').style.width = (pct * 100) + '%';
}

// ===== FEEDBACK =====
function showFeedback(icon, text) {
  const fb = document.getElementById('game-feedback');
  document.getElementById('feedback-icon').textContent = icon;
  document.getElementById('feedback-text').textContent = text;
  fb.style.display = 'flex';
  fb.style.animation = 'none';
  fb.offsetHeight;
  fb.style.animation = 'feedbackIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards';
}

// ===== FINISH LEVEL =====
function finishLevel(stars, score) {
  clearTimer();
  const levelId = currentLevel.id;
  const prevStars = state.levels[levelId]?.stars || 0;
  const earnedStars = Math.max(stars, prevStars);
  const starDiff = earnedStars - prevStars;

  state.levels[levelId] = { stars: earnedStars, score };
  state.totalStars += Math.max(0, starDiff);

  // Unlock next levels/worlds
  unlockNextLevel();

  addXP(currentLevel.xp || 50);
  saveState();
  checkAchievements();

  // Show complete screen
  showCompleteScreen(stars, score);
}

function unlockNextLevel() {
  const worldIdx = GAME_DATA.worlds.findIndex(w => w.id === currentWorld.id);
  const levelIdx = currentWorld.levels.findIndex(l => l.id === currentLevel.id);

  // Check if all levels in world are done
  const allDone = currentWorld.levels.every(l => state.levels[l.id]?.stars > 0);
  if (allDone && !state.completedWorlds.includes(currentWorld.id)) {
    state.completedWorlds.push(currentWorld.id);
    // Unlock next world
    if (worldIdx + 1 < GAME_DATA.worlds.length) {
      const nextWorldId = GAME_DATA.worlds[worldIdx + 1].id;
      if (!state.unlockedWorlds.includes(nextWorldId)) {
        state.unlockedWorlds.push(nextWorldId);
      }
    }
  }
}

function showCompleteScreen(stars, score) {
  playSound('complete');
  spawnConfetti();
  spawnFireworks();

  const icons = ['😊', '🥳', '🎉', '🏆'];
  document.getElementById('complete-icon').textContent = stars >= 3 ? '🏆' : stars === 2 ? '🎉' : '😊';
  document.getElementById('complete-title').textContent = stars >= 3 ? 'ممتاز!' : stars === 2 ? 'أحسنت!' : 'جيد!';
  document.getElementById('complete-sub').textContent = `حصلت على ${score} نقطة`;
  document.getElementById('complete-xp').textContent = `+${currentLevel.xp || 50} XP`;

  const starsEl = document.getElementById('stars-earned');
  starsEl.innerHTML = [1,2,3].map(s => `
    <span class="star-earned ${stars >= s ? '' : 'empty'}">⭐</span>
  `).join('');

  // Next level button
  const worldIdx = GAME_DATA.worlds.findIndex(w => w.id === currentWorld.id);
  const levelIdx = currentWorld.levels.findIndex(l => l.id === currentLevel.id);
  const nextBtn = document.getElementById('btn-next-level');

  if (levelIdx + 1 < currentWorld.levels.length) {
    nextBtn.style.display = 'flex';
    nextBtn.onclick = () => {
      const nextLevel = currentWorld.levels[levelIdx + 1];
      const isUnlocked = state.levels[currentWorld.levels[levelIdx].id]?.stars > 0;
      if (isUnlocked) startLevel(nextLevel);
    };
  } else if (worldIdx + 1 < GAME_DATA.worlds.length) {
    nextBtn.textContent = 'الوحدة التالية 🌟';
    nextBtn.style.display = 'flex';
    nextBtn.onclick = () => {
      buildMapScreen();
      showScreen('screen-map');
    };
  } else {
    nextBtn.textContent = '🏆 أتممت الكتاب!';
    nextBtn.style.display = 'flex';
    nextBtn.onclick = () => { buildMapScreen(); showScreen('screen-map'); };
  }

  showScreen('screen-complete');
}

// ===== BUTTON HANDLERS =====
function initButtons() {
  document.getElementById('btn-start').addEventListener('click', () => {
    playSound('click');
    buildMapScreen();
    showScreen('screen-map');
  });

  document.getElementById('btn-reset-all').addEventListener('click', () => {
    if (confirm('هل تريد إعادة تعيين كل التقدم؟')) {
      localStorage.removeItem('anisi_state');
      state = {
        xp: 0, totalStars: 0, levels: {},
        unlockedWorlds: [1], completedWorlds: [],
        achievements: [], fastAnswers: 0,
      };
      saveState();
      buildMapScreen();
      showScreen('screen-map');
    }
  });

  document.getElementById('btn-back-map').addEventListener('click', () => {
    playSound('click');
    buildMapScreen();
    showScreen('screen-map');
  });

  document.getElementById('btn-back-levels').addEventListener('click', () => {
    playSound('click');
    clearTimer();
    openWorldLevels(currentWorld);
  });

  document.getElementById('btn-back-to-map').addEventListener('click', () => {
    playSound('click');
    buildMapScreen();
    showScreen('screen-map');
  });

  document.getElementById('btn-replay').addEventListener('click', () => {
    playSound('click');
    startLevel(currentLevel);
  });
}

// ===== INIT =====
function init() {
  loadState();
  initParticles();
  initButtons();
  showScreen('screen-splash');
}

document.addEventListener('DOMContentLoaded', init);
