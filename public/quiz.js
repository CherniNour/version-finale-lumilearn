// ============ Quiz Data Structure ============
const quizData = {
  1: { // Grade 1
    math: {
      facile: [
        { q: "Combien font 2 + 3 ?", a: ["3", "5", "6", "4"], correct: 1, explanation: "2 + 3 = 5" },
        { q: "Quel est le nombre après 7 ?", a: ["6", "9", "8", "10"], correct: 2, explanation: "Après 7 vient 8" },
        { q: "Combien de doigts as-tu sur une main ?", a: ["4", "5", "6", "10"], correct: 1, explanation: "Nous avons 5 doigts sur chaque main" },
        { q: "Combien font 10 - 5 ?", a: ["5", "15", "3", "4"], correct: 0, explanation: "10 - 5 = 5" },
        { q: "Quel nombre est plus grand : 3 ou 7 ?", a: ["3", "7", "Les deux", "Aucun"], correct: 1, explanation: "7 est plus grand que 3" },
        { q: "Combien font 1 + 1 ?", a: ["1", "2", "3", "0"], correct: 1, explanation: "1 + 1 = 2" },
        { q: "Combien de côtés a un triangle ?", a: ["2", "3", "4", "5"], correct: 1, explanation: "Un triangle a 3 côtés" },
        { q: "Quel est le nombre avant 5 ?", a: ["3", "6", "4", "7"], correct: 2, explanation: "Avant 5 vient 4" },
        { q: "Combien font 6 - 2 ?", a: ["8", "3", "4", "5"], correct: 2, explanation: "6 - 2 = 4" },
        { q: "Combien de roues a une voiture ?", a: ["2", "3", "4", "5"], correct: 2, explanation: "Une voiture a 4 roues" }
      ],
      moyen: [
        { q: "Combien font 15 + 10 ?", a: ["20", "25", "30", "15"], correct: 1, explanation: "15 + 10 = 25" },
        { q: "Si tu as 8 bonbons et tu en manges 3, combien t'en reste-t-il ?", a: ["5", "11", "6", "4"], correct: 0, explanation: "8 - 3 = 5 bonbons" },
        { q: "Combien de côtés a un carré ?", a: ["3", "4", "5", "6"], correct: 1, explanation: "Un carré a 4 côtés égaux" },
        { q: "Quel est le double de 5 ?", a: ["5", "10", "15", "20"], correct: 1, explanation: "5 × 2 = 10" },
        { q: "Combien font 20 - 8 ?", a: ["12", "10", "14", "28"], correct: 0, explanation: "20 - 8 = 12" },
        { q: "Combien de jours y a-t-il dans une semaine ?", a: ["5", "6", "7", "8"], correct: 2, explanation: "Une semaine a 7 jours" },
        { q: "Quelle forme a un ballon de football ?", a: ["Carré", "Triangle", "Cercle", "Rectangle"], correct: 2, explanation: "Un ballon est rond (cercle)" },
        { q: "Combien font 4 + 4 + 4 ?", a: ["8", "12", "16", "10"], correct: 1, explanation: "4 + 4 + 4 = 12" },
        { q: "Si tu as 10 doigts et tu en caches 3, combien en vois-tu ?", a: ["7", "13", "10", "3"], correct: 0, explanation: "10 - 3 = 7 doigts" },
        { q: "Combien de pattes a un chat ?", a: ["2", "3", "4", "5"], correct: 2, explanation: "Un chat a 4 pattes" },
        { q: "Quel nombre vient après 19 ?", a: ["18", "20", "21", "19"], correct: 1, explanation: "Après 19 vient 20" },
        { q: "Combien font 30 - 10 ?", a: ["20", "40", "10", "30"], correct: 0, explanation: "30 - 10 = 20" },
        { q: "Combien de mois y a-t-il dans une année ?", a: ["10", "11", "12", "13"], correct: 2, explanation: "Une année a 12 mois" },
        { q: "Si tu as 5 pommes et ton ami te donne 5 pommes, combien en as-tu ?", a: ["5", "10", "15", "0"], correct: 1, explanation: "5 + 5 = 10 pommes" },
        { q: "Combien de roues a un vélo ?", a: ["1", "2", "3", "4"], correct: 1, explanation: "Un vélo a 2 roues" }
      ],
      difficile: [
        { q: "Combien font 25 + 18 ?", a: ["43", "37", "42", "45"], correct: 0, explanation: "25 + 18 = 43" },
        { q: "Si tu as 50 dinars et tu achètes un jouet à 23 dinars, combien te reste-t-il ?", a: ["27", "73", "33", "23"], correct: 0, explanation: "50 - 23 = 27 dinars" },
        { q: "Combien font 3 × 4 ?", a: ["7", "12", "10", "15"], correct: 1, explanation: "3 × 4 = 12" },
        { q: "Quel est le nombre qui vient après 99 ?", a: ["98", "100", "101", "90"], correct: 1, explanation: "Après 99 vient 100" },
        { q: "Combien de minutes y a-t-il dans une heure ?", a: ["50", "60", "100", "24"], correct: 1, explanation: "Une heure = 60 minutes" },
        { q: "Combien font 40 - 15 ?", a: ["25", "55", "20", "30"], correct: 0, explanation: "40 - 15 = 25" },
        { q: "Si un livre coûte 10 dinars, combien coûtent 3 livres ?", a: ["13", "20", "30", "40"], correct: 2, explanation: "10 × 3 = 30 dinars" },
        { q: "Combien de centimètres y a-t-il dans un mètre ?", a: ["10", "50", "100", "1000"], correct: 2, explanation: "1 mètre = 100 centimètres" },
        { q: "Combien font 15 + 15 + 15 ?", a: ["30", "45", "60", "35"], correct: 1, explanation: "15 + 15 + 15 = 45" },
        { q: "Si tu partages 20 bonbons entre 4 amis, combien chacun reçoit-il ?", a: ["4", "5", "6", "10"], correct: 1, explanation: "20 ÷ 4 = 5 bonbons par personne" },
        { q: "Quel est le triple de 10 ?", a: ["20", "30", "40", "13"], correct: 1, explanation: "10 × 3 = 30" },
        { q: "Combien font 80 - 35 ?", a: ["45", "115", "40", "50"], correct: 0, explanation: "80 - 35 = 45" },
        { q: "Combien de secondes y a-t-il dans une minute ?", a: ["50", "60", "100", "30"], correct: 1, explanation: "1 minute = 60 secondes" },
        { q: "Si tu as 7 groupes de 5 élèves, combien d'élèves en total ?", a: ["12", "35", "30", "40"], correct: 1, explanation: "7 × 5 = 35 élèves" },
        { q: "Combien font 100 - 42 ?", a: ["58", "142", "52", "68"], correct: 0, explanation: "100 - 42 = 58" },
        { q: "Quel nombre est entre 48 et 52 ?", a: ["47", "50", "53", "45"], correct: 1, explanation: "50 est entre 48 et 52" },
        { q: "Combien de côtés a un hexagone ?", a: ["5", "6", "7", "8"], correct: 1, explanation: "Un hexagone a 6 côtés" },
        { q: "Si un paquet contient 12 crayons et tu as 4 paquets, combien de crayons as-tu ?", a: ["16", "36", "48", "24"], correct: 2, explanation: "12 × 4 = 48 crayons" },
        { q: "Combien font 65 + 28 ?", a: ["83", "93", "87", "97"], correct: 1, explanation: "65 + 28 = 93" },
        { q: "Quel est la moitié de 50 ?", a: ["20", "25", "30", "15"], correct: 1, explanation: "50 ÷ 2 = 25" }
      ]
    },
    arabic: {
      facile: [
        { q: "كم عدد حروف الأبجدية العربية؟", a: ["26", "28", "30", "25"], correct: 1, explanation: "الأبجدية العربية تحتوي على 28 حرفاً" },
        { q: "ما هو أول حرف في الأبجدية العربية؟", a: ["ب", "أ", "ت", "ج"], correct: 1, explanation: "الألف هو أول حرف" },
        { q: "كم عدد أحرف العلة؟", a: ["2", "3", "4", "5"], correct: 1, explanation: "أحرف العلة هي: ا، و، ي" },
        { q: "ما هو الحرف الأخير في الأبجدية؟", a: ["و", "ه", "ي", "ء"], correct: 2, explanation: "الياء هو آخر حرف" },
        { q: "أي كلمة تبدأ بحرف الباء؟", a: ["تفاح", "بيت", "حليب", "سيارة"], correct: 1, explanation: "بيت تبدأ بحرف الباء" },
        { q: "كم عدد الحركات الأساسية في اللغة العربية؟", a: ["2", "3", "4", "5"], correct: 1, explanation: "الحركات هي: الفتحة، الضمة، الكسرة" },
        { q: "ما هو جمع كلمة 'ولد'؟", a: ["أولاد", "ولدان", "ولدون", "بنات"], correct: 0, explanation: "جمع ولد هو أولاد" },
        { q: "أي من هذه الكلمات اسم؟", a: ["يكتب", "كتاب", "سريع", "جميل"], correct: 1, explanation: "كتاب اسم، والباقي فعل أو صفة" },
        { q: "ما هو عكس كلمة 'كبير'؟", a: ["صغير", "طويل", "قصير", "ضخم"], correct: 0, explanation: "عكس كبير هو صغير" },
        { q: "كم عدد كلمات الجملة: 'الولد يلعب في الحديقة'؟", a: ["3", "4", "5", "6"], correct: 2, explanation: "الجملة تحتوي على 5 كلمات" }
      ],
      moyen: [
        { q: "ما هو المبتدأ في الجملة: 'الطالب مجتهد'؟", a: ["مجتهد", "الطالب", "هو", "لا يوجد"], correct: 1, explanation: "الطالب هو المبتدأ" },
        { q: "ما نوع الفعل 'كتبَ'؟", a: ["مضارع", "ماضي", "أمر", "ناقص"], correct: 1, explanation: "كتبَ فعل ماضي" },
        { q: "ما هو جمع كلمة 'مدرسة'؟", a: ["مدارس", "مدرسون", "مدرستان", "تلاميذ"], correct: 0, explanation: "جمع مدرسة هو مدارس" },
        { q: "ما هو الفاعل في: 'يأكل الولد التفاحة'؟", a: ["يأكل", "الولد", "التفاحة", "لا يوجد"], correct: 1, explanation: "الولد هو الفاعل" },
        { q: "ما هي علامة الجر؟", a: ["الضمة", "الفتحة", "الكسرة", "السكون"], correct: 2, explanation: "الكسرة هي علامة الجر" },
        { q: "ما نوع الجملة: 'هل تذهب إلى المدرسة؟'", a: ["خبرية", "إنشائية", "أمرية", "تعجبية"], correct: 1, explanation: "جملة إنشائية استفهامية" },
        { q: "ما هو مثنى كلمة 'كتاب'؟", a: ["كتابان", "كتب", "كتابين", "أكتبة"], correct: 0, explanation: "مثنى كتاب هو كتابان" },
        { q: "ما هو أسلوب الأمر من 'كتب'؟", a: ["اكتب", "كاتب", "مكتوب", "كتابة"], correct: 0, explanation: "اكتب هو فعل الأمر من كتب" },
        { q: "ما هي أداة الاستفهام في: 'أين ذهبت؟'", a: ["ماذا", "أين", "متى", "كيف"], correct: 1, explanation: "أين هي أداة الاستفهام عن المكان" },
        { q: "ما نوع الهمزة في كلمة 'أحمد'؟", a: ["همزة قطع", "همزة وصل", "همزة متطرفة", "همزة متوسطة"], correct: 0, explanation: "همزة قطع تُنطق في البداية" },
        { q: "ما هو المفعول به في: 'قرأ الطالب الدرس'؟", a: ["قرأ", "الطالب", "الدرس", "لا يوجد"], correct: 2, explanation: "الدرس هو المفعول به" },
        { q: "ما هو جمع كلمة 'معلم'؟", a: ["معلمون", "معلمين", "معلمان", "تلاميذ"], correct: 0, explanation: "جمع معلم هو معلمون" },
        { q: "ما علامة الرفع للمثنى؟", a: ["الضمة", "الألف", "الواو", "الياء"], correct: 1, explanation: "المثنى يُرفع بالألف" },
        { q: "ما هي حروف الجر؟", a: ["من، إلى، في", "أو، ثم، أم", "هل، ما، لا", "لم، لن، لا"], correct: 0, explanation: "من، إلى، في هي حروف جر" },
        { q: "ما نوع الفعل 'يكتب'؟", a: ["ماضي", "مضارع", "أمر", "جامد"], correct: 1, explanation: "يكتب فعل مضارع" }
      ],
      difficile: [
        { q: "ما إعراب كلمة 'محمد' في: 'رأيت محمداً'؟", a: ["فاعل", "مفعول به", "مبتدأ", "خبر"], correct: 1, explanation: "محمداً مفعول به منصوب" },
        { q: "ما هو الممنوع من الصرف؟", a: ["اسم يُنوَّن", "اسم لا يُنوَّن", "فعل", "حرف"], correct: 1, explanation: "الممنوع من الصرف لا يُنوَّن" },
        { q: "ما نوع 'كان' في: 'كان الجو جميلاً'؟", a: ["فعل تام", "فعل ناقص", "حرف ناسخ", "فعل مضارع"], correct: 1, explanation: "كان فعل ناقص ناسخ" },
        { q: "ما إعراب 'أحمد' في: 'يا أحمد'؟", a: ["منادى", "فاعل", "مفعول به", "نعت"], correct: 0, explanation: "أحمد منادى مبني على الضم" },
        { q: "ما هو التمييز في: 'اشتريت كيلو تفاح'؟", a: ["اشتريت", "كيلو", "تفاح", "لا يوجد"], correct: 2, explanation: "تفاح تمييز منصوب" },
        { q: "ما نوع الحال في: 'جاء الطالب مسرعاً'؟", a: ["مفردة", "جملة", "شبه جملة", "مركبة"], correct: 0, explanation: "مسرعاً حال مفردة" },
        { q: "ما هو النعت في: 'الطالب المجتهد ناجح'؟", a: ["الطالب", "المجتهد", "ناجح", "لا يوجد"], correct: 1, explanation: "المجتهد نعت للطالب" },
        { q: "ما علامة نصب جمع المذكر السالم؟", a: ["الفتحة", "الياء", "الواو", "الألف"], correct: 1, explanation: "جمع المذكر السالم يُنصب بالياء" },
        { q: "ما إعراب 'إن' في: 'إن الله غفور'؟", a: ["حرف جر", "حرف ناسخ", "فعل", "اسم"], correct: 1, explanation: "إن حرف ناسخ ينصب المبتدأ ويرفع الخبر" },
        { q: "ما هو البدل في: 'جاء الأستاذ محمد'؟", a: ["جاء", "الأستاذ", "محمد", "لا يوجد"], correct: 2, explanation: "محمد بدل من الأستاذ" },
        { q: "ما نوع الفعل 'نِعمَ'؟", a: ["ماضي", "مضارع", "أمر", "جامد"], correct: 3, explanation: "نِعمَ فعل جامد للمدح" },
        { q: "ما إعراب 'طالباً' في: 'كنت طالباً'؟", a: ["فاعل", "خبر كان", "مفعول به", "حال"], correct: 1, explanation: "طالباً خبر كان منصوب" },
        { q: "ما هو العطف في: 'جاء أحمد وعلي'؟", a: ["أحمد", "و", "علي", "جاء"], correct: 2, explanation: "علي معطوف على أحمد" },
        { q: "ما علامة جزم الفعل المضارع المعتل الآخر؟", a: ["السكون", "حذف حرف العلة", "الفتحة", "الضمة"], correct: 1, explanation: "يُجزم بحذف حرف العلة" },
        { q: "ما نوع 'لا' في: 'لا إله إلا الله'؟", a: ["نافية", "ناهية", "نافية للجنس", "زائدة"], correct: 2, explanation: "لا النافية للجنس" },
        { q: "ما إعراب 'مدرسة' في: 'ذهبت إلى مدرسة'؟", a: ["فاعل", "مجرور", "منصوب", "مرفوع"], correct: 1, explanation: "مدرسة اسم مجرور بحرف الجر إلى" },
        { q: "ما هو التوكيد في: 'جاء الأستاذ نفسه'؟", a: ["جاء", "الأستاذ", "نفسه", "لا يوجد"], correct: 2, explanation: "نفسه توكيد معنوي" },
        { q: "ما علامة رفع الأفعال الخمسة؟", a: ["الضمة", "ثبوت النون", "الواو", "الألف"], correct: 1, explanation: "الأفعال الخمسة تُرفع بثبوت النون" },
        { q: "ما نوع الاستثناء في: 'جاء الطلاب إلا أحمد'؟", a: ["تام مثبت", "ناقص منفي", "تام منفي", "مفرغ"], correct: 0, explanation: "استثناء تام مثبت" },
        { q: "ما إعراب 'سريعاً' في: 'ركض الولد سريعاً'؟", a: ["نعت", "حال", "تمييز", "مفعول به"], correct: 1, explanation: "سريعاً حال منصوب" }
      ]
    },
    french: {
      facile: [
        { q: "Combien y a-t-il de lettres dans l'alphabet français ?", a: ["24", "26", "28", "30"], correct: 1, explanation: "L'alphabet français contient 26 lettres" },
        { q: "Quelle est la première lettre de l'alphabet ?", a: ["B", "A", "C", "D"], correct: 1, explanation: "A est la première lettre" },
        { q: "Quel mot commence par la lettre B ?", a: ["Chat", "Banane", "Pomme", "École"], correct: 1, explanation: "Banane commence par B" },
        { q: "Combien de voyelles y a-t-il en français ?", a: ["5", "6", "7", "8"], correct: 1, explanation: "Les voyelles sont A, E, I, O, U, Y" },
        { q: "Quel est le pluriel de 'chat' ?", a: ["Chat", "Chats", "Chates", "Chattes"], correct: 1, explanation: "On ajoute un 's' au pluriel" },
        { q: "Comment s'écrit le son 'o' dans 'eau' ?", a: ["o", "au", "eau", "ô"], correct: 2, explanation: "Dans 'eau', le son 'o' s'écrit 'eau'" },
        { q: "Quel article va avec 'maison' ?", a: ["Le", "La", "Les", "Un"], correct: 1, explanation: "Maison est féminin, donc 'la maison'" },
        { q: "Quel est le féminin de 'petit' ?", a: ["Petite", "Petits", "Petites", "Petit"], correct: 0, explanation: "On ajoute un 'e' au féminin" },
        { q: "Combien y a-t-il de mots dans 'Le chat mange' ?", a: ["2", "3", "4", "5"], correct: 1, explanation: "Il y a 3 mots dans cette phrase" },
        { q: "Quel est le contraire de 'grand' ?", a: ["Petit", "Gros", "Long", "Haut"], correct: 0, explanation: "Le contraire de grand est petit" }
      ],
      moyen: [
        { q: "Quel est le verbe dans : 'Le chat mange' ?", a: ["Le", "chat", "mange", "le chat"], correct: 2, explanation: "Mange est le verbe d'action" },
        { q: "Comment conjugue-t-on 'avoir' à la 1ère personne du singulier ?", a: ["J'ai", "Tu as", "Il a", "Nous avons"], correct: 0, explanation: "J'ai est la conjugaison correcte" },
        { q: "Quel est le pluriel de 'cheval' ?", a: ["Chevals", "Chevaux", "Chevaus", "Chevales"], correct: 1, explanation: "Cheval fait chevaux au pluriel" },
        { q: "Quel est l'adjectif dans : 'La belle maison' ?", a: ["La", "belle", "maison", "La belle"], correct: 1, explanation: "Belle est l'adjectif qui qualifie maison" },
        { q: "Comment s'écrit le son 'k' dans 'école' ?", a: ["k", "c", "q", "qu"], correct: 1, explanation: "Le son 'k' s'écrit 'c' dans école" },
        { q: "Quel est le participe passé de 'manger' ?", a: ["Mangé", "Mangeant", "Mange", "Mangera"], correct: 0, explanation: "Le participe passé de manger est mangé" },
        { q: "Quelle est la négation de 'Je veux' ?", a: ["Je ne veux", "Je ne veux pas", "Je veux ne pas", "Ne je veux pas"], correct: 1, explanation: "La négation correcte est 'ne...pas'" },
        { q: "Quel est le COD dans : 'Marie lit un livre' ?", a: ["Marie", "lit", "un livre", "un"], correct: 2, explanation: "Un livre est le complément d'objet direct" },
        { q: "Comment conjugue-t-on 'être' au présent avec 'nous' ?", a: ["Nous est", "Nous êtes", "Nous sommes", "Nous sont"], correct: 2, explanation: "Nous sommes est correct" },
        { q: "Quel est le féminin de 'nouveau' ?", a: ["Nouvele", "Nouvelle", "Nouveaue", "Nouvelles"], correct: 1, explanation: "Nouveau devient nouvelle au féminin" },
        { q: "Quelle préposition va avec 'aller' + lieu ?", a: ["à", "de", "pour", "avec"], correct: 0, explanation: "On dit 'aller à' un lieu" },
        { q: "Quel est l'infinitif de 'je finis' ?", a: ["Finir", "Finer", "Finisser", "Finire"], correct: 0, explanation: "L'infinitif est finir" },
        { q: "Comment forme-t-on l'imparfait de 'manger' avec 'je' ?", a: ["Je mangeais", "Je mangerais", "Je mange", "Je mangais"], correct: 0, explanation: "Je mangeais est la forme correcte" },
        { q: "Quel est le synonyme de 'content' ?", a: ["Triste", "Heureux", "Fâché", "Fatigué"], correct: 1, explanation: "Heureux est synonyme de content" },
        { q: "Quelle est la bonne orthographe ?", a: ["Beautée", "Beautè", "Beauté", "Beautéé"], correct: 2, explanation: "Beauté s'écrit avec un é" }
      ],
      difficile: [
        { q: "Quel est le passé simple de 'voir' à la 3ème personne du singulier ?", a: ["Il vit", "Il vût", "Il vut", "Il voyait"], correct: 0, explanation: "Il vit est le passé simple de voir" },
        { q: "Quelle est la bonne concordance : 'Il faut que je...' ?", a: ["vais", "aille", "irais", "viens"], correct: 1, explanation: "Le subjonctif 'aille' est requis après 'il faut que'" },
        { q: "Quel est le COI dans : 'Je parle à Marie' ?", a: ["Je", "parle", "à Marie", "Marie"], correct: 2, explanation: "À Marie est le complément d'objet indirect" },
        { q: "Comment accorde-t-on 'mangé' dans : 'Les pommes que j'ai...' ?", a: ["mangé", "mangée", "mangés", "mangées"], correct: 3, explanation: "Accord avec 'pommes' (féminin pluriel) car COD avant" },
        { q: "Quel est le conditionnel présent de 'pouvoir' avec 'je' ?", a: ["Je peux", "Je pourrais", "Je pourrai", "Je puisse"], correct: 1, explanation: "Je pourrais est le conditionnel présent" },
        { q: "Quelle est la voix passive de 'Le chat mange la souris' ?", a: ["La souris mange le chat", "La souris est mangée par le chat", "Le chat est mangé", "La souris mange"], correct: 1, explanation: "À la voix passive, l'objet devient sujet" },
        { q: "Quel est le pluriel de 'travail' ?", a: ["Travails", "Travauxs", "Travaux", "Travailles"], correct: 2, explanation: "Travail fait travaux au pluriel" },
        { q: "Dans 'Bien qu'il pleuve', quel mode est utilisé ?", a: ["Indicatif", "Subjonctif", "Conditionnel", "Impératif"], correct: 1, explanation: "Bien que demande le subjonctif" },
        { q: "Quel est le participe présent de 'finir' ?", a: ["Fini", "Finant", "Finissant", "Finir"], correct: 2, explanation: "Le participe présent de finir est finissant" },
        { q: "Comment s'écrit le son 'in' dans 'omain' ?", a: ["in", "ain", "ein", "un"], correct: 1, explanation: "Dans 'demain', le son s'écrit 'ain'" },
        { q: "Quel est le futur antérieur de 'partir' avec 'il' ?", a: ["Il partira", "Il sera parti", "Il est parti", "Il partirait"], correct: 1, explanation: "Il sera parti est le futur antérieur" },
        { q: "Quelle est la nature de 'que' dans : 'Je sais qu'il vient' ?", a: ["Pronom relatif", "Conjonction", "Pronom interrogatif", "Adverbe"], correct: 1, explanation: "Que est une conjonction de subordination" },
        { q: "Quel est l'adverbe dérivé de 'lent' ?", a: ["Lentement", "Lentemment", "Lentament", "Lentment"], correct: 0, explanation: "Lentement s'écrit avec -emment" },
        { q: "Dans 'C'est lui qui l'a fait', que remplace 'l'' ?", a: ["lui", "qui", "un COD non mentionné", "fait"], correct: 2, explanation: "L' remplace un COD (l'action) mentionné avant" },
        { q: "Quel temps utilise-t-on après 'si' dans une hypothèse ?", a: ["Futur", "Conditionnel", "Imparfait", "Subjonctif"], correct: 2, explanation: "On utilise l'imparfait après 'si' (hypothèse)" },
        { q: "Comment s'accorde 'demi' dans 'trois heures et demie' ?", a: ["demi", "demis", "demie", "demies"], correct: 2, explanation: "Demi s'accorde après le nom (demie)" },
        { q: "Quel est le plus-que-parfait de 'venir' avec 'nous' ?", a: ["Nous venions", "Nous étions venus", "Nous sommes venus", "Nous viendrions"], correct: 1, explanation: "Nous étions venus est le plus-que-parfait" },
        { q: "Quelle est la fonction de 'rouge' dans : 'Je peins en rouge' ?", a: ["Adjectif", "COD", "CC de manière", "Attribut"], correct: 2, explanation: "En rouge indique la manière (CC)" },
        { q: "Quel est le subjonctif imparfait de 'être' avec 'il' ?", a: ["Il soit", "Il fût", "Il serait", "Il était"], correct: 1, explanation: "Il fût est le subjonctif imparfait" },
        { q: "Dans 'Je me souviens de lui', quelle est la nature de 'me' ?", a: ["COD", "COI", "Pronom réfléchi", "Sujet"], correct: 2, explanation: "Me est un pronom réfléchi du verbe pronominal" }
      ]
    },
    science: {
      facile: [
        { q: "Combien de pattes a une araignée ?", a: ["6", "8", "10", "4"], correct: 1, explanation: "Une araignée a 8 pattes" },
        { q: "Quel animal pond des œufs ?", a: ["Chat", "Chien", "Poule", "Vache"], correct: 2, explanation: "La poule pond des œufs" },
        { q: "De quelle couleur est le ciel par beau temps ?", a: ["Vert", "Rouge", "Bleu", "Jaune"], correct: 2, explanation: "Le ciel est bleu par beau temps" },
        { q: "Combien de saisons y a-t-il dans l'année ?", a: ["2", "3", "4", "5"], correct: 2, explanation: "Il y a 4 saisons : printemps, été, automne, hiver" },
        { q: "Quel organe utilises-tu pour respirer ?", a: ["Cœur", "Poumons", "Estomac", "Cerveau"], correct: 1, explanation: "Les poumons permettent de respirer" },
        { q: "Que devient l'eau quand il fait très froid ?", a: ["Vapeur", "Glace", "Nuage", "Pluie"], correct: 1, explanation: "L'eau devient glace quand elle gèle" },
        { q: "Quel astre brille le jour ?", a: ["La lune", "Une étoile", "Le soleil", "Une planète"], correct: 2, explanation: "Le soleil brille pendant la journée" },
        { q: "Que mange un lapin ?", a: ["Viande", "Poisson", "Carottes", "Os"], correct: 2, explanation: "Le lapin mange des légumes comme les carottes" },
        { q: "Combien de sens as-tu ?", a: ["3", "4", "5", "6"], correct: 2, explanation: "Nous avons 5 sens : vue, ouïe, odorat, goût, toucher" },
        { q: "Quelle partie de la plante est sous la terre ?", a: ["Fleur", "Feuille", "Racine", "Tige"], correct: 2, explanation: "Les racines sont sous la terre" }
      ],
      moyen: [
        { q: "Quel est l'état de l'eau à 100°C ?", a: ["Solide", "Liquide", "Gazeux", "Plasma"], correct: 2, explanation: "À 100°C, l'eau devient vapeur (gazeux)" },
        { q: "Quelle planète est la plus proche du soleil ?", a: ["Vénus", "Terre", "Mercure", "Mars"], correct: 2, explanation: "Mercure est la planète la plus proche du soleil" },
        { q: "Que produit une plante grâce à la lumière ?", a: ["Oxygène", "Azote", "Hydrogène", "Carbone"], correct: 0, explanation: "Les plantes produisent de l'oxygène par photosynthèse" },
        { q: "Combien d'os a un adulte humain environ ?", a: ["100", "150", "206", "300"], correct: 2, explanation: "Un adulte a environ 206 os" },
        { q: "Qu'est-ce qu'un mammifère ?", a: ["Animal qui pond des œufs", "Animal qui allaite ses petits", "Animal qui vole", "Animal aquatique"], correct: 1, explanation: "Les mammifères allaitent leurs petits" },
        { q: "Quel organe pompe le sang ?", a: ["Le cerveau", "Le cœur", "Les poumons", "L'estomac"], correct: 1, explanation: "Le cœur pompe le sang dans tout le corps" },
        { q: "Que se passe-t-il lors d'une éclipse solaire ?", a: ["La Terre cache le soleil", "La lune cache le soleil", "Le soleil disparaît", "Les étoiles brillent"], correct: 1, explanation: "La lune passe devant le soleil" },
        { q: "Quel est le plus grand océan ?", a: ["Atlantique", "Indien", "Arctique", "Pacifique"], correct: 3, explanation: "L'océan Pacifique est le plus grand" },
        { q: "Qu'est-ce que l'évaporation ?", a: ["L'eau qui gèle", "L'eau qui bout", "L'eau qui devient vapeur", "L'eau qui coule"], correct: 2, explanation: "L'évaporation transforme l'eau liquide en vapeur" },
        { q: "Combien de dents a un adulte normalement ?", a: ["20", "28", "32", "36"], correct: 2, explanation: "Un adulte a normalement 32 dents" },
        { q: "Quel animal est un herbivore ?", a: ["Lion", "Loup", "Vache", "Aigle"], correct: 2, explanation: "La vache mange de l'herbe (herbivore)" },
        { q: "Quel gaz respirons-nous ?", a: ["Oxygène", "Azote", "Dioxyde de carbone", "Hydrogène"], correct: 0, explanation: "Nous respirons l'oxygène de l'air" },
        { q: "Combien de temps met la Terre pour tourner autour du soleil ?", a: ["1 jour", "1 mois", "1 an", "10 ans"], correct: 2, explanation: "La Terre fait le tour du soleil en 1 an" },
        { q: "Qu'est-ce qu'un reptile ?", a: ["Animal à sang chaud", "Animal à sang froid avec écailles", "Animal qui vole", "Animal marin"], correct: 1, explanation: "Les reptiles ont le sang froid et des écailles" },
        { q: "Quel est le rôle des feuilles ?", a: ["Absorber l'eau", "Faire la photosynthèse", "Reproduire", "Soutenir la plante"], correct: 1, explanation: "Les feuilles font la photosynthèse" }
      ],
      difficile: [
        { q: "Quelle est la formule chimique de l'eau ?", a: ["H2O", "CO2", "O2", "H2O2"], correct: 0, explanation: "L'eau est composée de H2O (2 hydrogène, 1 oxygène)" },
        { q: "Qu'est-ce que la photosynthèse ?", a: ["Respiration des plantes", "Production de nourriture par les plantes", "Reproduction", "Croissance"], correct: 1, explanation: "La photosynthèse permet aux plantes de produire leur nourriture" },
        { q: "Combien de planètes y a-t-il dans le système solaire ?", a: ["7", "8", "9", "10"], correct: 1, explanation: "Il y a 8 planètes depuis que Pluton n'est plus considérée comme planète" },
        { q: "Qu'est-ce qu'un circuit électrique simple nécessite ?", a: ["Source, conducteur, récepteur", "Seulement une pile", "Seulement une ampoule", "De l'eau"], correct: 0, explanation: "Un circuit nécessite une source d'énergie, des fils et un récepteur" },
        { q: "Quelle partie du corps filtre le sang ?", a: ["Le cœur", "Les poumons", "Les reins", "Le foie"], correct: 2, explanation: "Les reins filtrent le sang et produisent l'urine" },
        { q: "Qu'est-ce que la condensation ?", a: ["Eau qui devient glace", "Vapeur qui devient eau", "Eau qui s'évapore", "Eau qui bout"], correct: 1, explanation: "La condensation transforme la vapeur en eau liquide" },
        { q: "Quel est l'organe principal du système nerveux ?", a: ["Le cœur", "Les poumons", "Le cerveau", "L'estomac"], correct: 2, explanation: "Le cerveau est l'organe principal du système nerveux" },
        { q: "Que signifie biodégradable ?", a: ["Qui pollue", "Qui se décompose naturellement", "Qui est toxique", "Qui est solide"], correct: 1, explanation: "Biodégradable signifie qui peut se décomposer naturellement" },
        { q: "Quel phénomène crée les marées ?", a: ["Le vent", "La lune", "Le soleil", "La pluie"], correct: 1, explanation: "L'attraction de la lune crée les marées" },
        { q: "Qu'est-ce qu'une énergie renouvelable ?", a: ["Pétrole", "Charbon", "Énergie solaire", "Gaz naturel"], correct: 2, explanation: "L'énergie solaire est renouvelable car inépuisable" },
        { q: "Combien de chambres a le cœur humain ?", a: ["2", "3", "4", "5"], correct: 2, explanation: "Le cœur humain a 4 chambres (2 oreillettes, 2 ventricules)" },
        { q: "Qu'est-ce que la gravité ?", a: ["Force qui attire vers le centre de la Terre", "Force qui repousse", "Énergie", "Lumière"], correct: 0, explanation: "La gravité attire les objets vers le centre de la Terre" },
        { q: "Quel est le cycle de vie d'un papillon ?", a: ["Œuf-papillon", "Œuf-larve-adulte", "Œuf-chenille-chrysalide-papillon", "Chenille-papillon"], correct: 2, explanation: "Le papillon passe par 4 stades : œuf, chenille, chrysalide, papillon" },
        { q: "Que mesure un thermomètre ?", a: ["La pression", "La température", "L'humidité", "Le vent"], correct: 1, explanation: "Le thermomètre mesure la température" },
        { q: "Qu'est-ce que la chaîne alimentaire ?", a: ["Liste de courses", "Ordre dans lequel on mange", "Séquence qui mange qui", "Recette de cuisine"], correct: 2, explanation: "La chaîne alimentaire montre qui mange qui dans la nature" },
        { q: "Quelle est la vitesse de la lumière environ ?", a: ["300 km/s", "3000 km/s", "30000 km/s", "300000 km/s"], correct: 3, explanation: "La lumière voyage à environ 300 000 km/s" },
        { q: "Qu'est-ce qu'un conducteur électrique ?", a: ["Matériau qui laisse passer l'électricité", "Personne qui conduit", "Isolant", "Batterie"], correct: 0, explanation: "Un conducteur laisse passer le courant électrique" },
        { q: "Quel gaz est essentiel pour la respiration ?", a: ["Azote", "Oxygène", "Dioxyde de carbone", "Hélium"], correct: 1, explanation: "L'oxygène est essentiel pour respirer" },
        { q: "Qu'est-ce que l'effet de serre ?", a: ["Réchauffement par gaz dans l'atmosphère", "Froid intense", "Pluie acide", "Vent fort"], correct: 0, explanation: "L'effet de serre réchauffe la Terre par certains gaz" },
        { q: "Combien de temps met la lumière du soleil pour atteindre la Terre ?", a: ["1 seconde", "8 minutes", "1 heure", "1 jour"], correct: 1, explanation: "La lumière du soleil met environ 8 minutes pour nous atteindre" }
      ]
    }
  }
};

// Global variables
let selectedGrade = null;
let selectedSubject = null;
let selectedDifficulty = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timerInterval = null;
let startTime = null;

// Subject configurations
const subjectConfig = {
  math: { name: "Mathématiques", icon: "🔢", class: "math" },
  arabic: { name: "Langue Arabe", icon: "📖", class: "language" },
  french: { name: "Français", icon: "🇫🇷", class: "french" },
  science: { name: "Sciences", icon: "🔬", class: "science" },
  history: { name: "Histoire", icon: "🏛️", class: "history" },
  geography: { name: "Géographie", icon: "🗺️", class: "geography" },
  civic: { name: "Éducation Civique", icon: "🤝", class: "civic" },
  islamic: { name: "Éducation Islamique", icon: "📿", class: "islamic" }
};

// ============ Navigation Functions ============
function showSection(sectionId) {
  document.querySelectorAll('.selection-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack(sectionId) {
  showSection(sectionId);
  
  // Reset timer if going back from quiz
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function goToSelection() {
  selectedGrade = null;
  selectedSubject = null;
  selectedDifficulty = null;
  currentQuestions = [];
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  document.querySelectorAll('.grade-card').forEach(card => card.classList.remove('selected'));
  document.querySelectorAll('.subject-card-quiz').forEach(card => card.classList.remove('selected'));
  document.querySelectorAll('.difficulty-card').forEach(card => card.classList.remove('selected'));
  
  showSection('gradeSelection');
}

// ============ Grade Selection ============
document.querySelectorAll('.grade-card').forEach(card => {
  card.addEventListener('click', function() {
    selectedGrade = this.dataset.grade;
    
    document.querySelectorAll('.grade-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    
    setTimeout(() => {
      loadSubjects();
      showSection('subjectSelection');
    }, 300);
  });
});

// ============ Subject Loading ============
function loadSubjects() {
  const subjectGrid = document.getElementById('subjectGrid');
  subjectGrid.innerHTML = '';
  
  const availableSubjects = Object.keys(quizData[selectedGrade] || {});
  
  availableSubjects.forEach(subjectKey => {
    const config = subjectConfig[subjectKey];
    if (!config) return;
    
    const card = document.createElement('div');
    card.className = 'subject-card-quiz';
    card.dataset.subject = subjectKey;
    
    card.innerHTML = `
      <div class="subject-icon-quiz ${config.class}">${config.icon}</div>
      <div class="subject-info">
        <h4>${config.name}</h4>
        <p>Quiz disponibles</p>
      </div>
    `;
    
    card.addEventListener('click', function() {
      selectedSubject = this.dataset.subject;
      
      document.querySelectorAll('.subject-card-quiz').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      
      setTimeout(() => {
        showSection('difficultySelection');
      }, 300);
    });
    
    subjectGrid.appendChild(card);
  });
}

// ============ Difficulty Selection ============
document.querySelectorAll('.difficulty-card').forEach(card => {
  card.addEventListener('click', function() {
    selectedDifficulty = this.dataset.difficulty;
    
    document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    
    setTimeout(() => {
      startQuiz();
    }, 300);
  });
});

// ============ Quiz Functions ============
function startQuiz() {
  // Get questions for selected configuration
  currentQuestions = [...quizData[selectedGrade][selectedSubject][selectedDifficulty]];
  
  // Shuffle questions
  currentQuestions = currentQuestions.sort(() => Math.random() - 0.5);
  
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  
  // Update quiz title
  const subjectName = subjectConfig[selectedSubject].name;
  document.getElementById('quizTitle').textContent = `${subjectName} - ${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}`;
  
  // Start timer
  startTime = Date.now();
  startTimer();
  
  // Load first question
  loadQuestion();
  
  showSection('quizSection');
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    document.getElementById('quizTimer').textContent = 
      `⏱️ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function loadQuestion() {
  const question = currentQuestions[currentQuestionIndex];
  
  // Update progress
  document.getElementById('quizProgress').textContent = 
    `Question ${currentQuestionIndex + 1}/${currentQuestions.length}`;
  
  // Update question text
  document.getElementById('questionText').textContent = question.q;
  
  // Load answers
  const answersGrid = document.getElementById('answersGrid');
  answersGrid.innerHTML = '';
  
  const letters = ['A', 'B', 'C', 'D'];
  question.a.forEach((answer, index) => {
    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer-option';
    answerDiv.dataset.letter = letters[index];
    answerDiv.dataset.index = index;
    answerDiv.textContent = answer;
    
    answerDiv.addEventListener('click', selectAnswer);
    
    answersGrid.appendChild(answerDiv);
  });
  
  // Reset next button
  document.getElementById('nextBtn').disabled = true;
}

function selectAnswer(e) {
  const selectedOption = e.currentTarget;
  const answerIndex = parseInt(selectedOption.dataset.index);
  
  // Remove previous selection
  document.querySelectorAll('.answer-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  // Mark new selection
  selectedOption.classList.add('selected');
  
  // Store answer
  userAnswers[currentQuestionIndex] = answerIndex;
  
  // Enable next button
  document.getElementById('nextBtn').disabled = false;
}

// Next button handler
document.getElementById('nextBtn').addEventListener('click', () => {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz() {
  // Stop timer
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  // Calculate score
  score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === currentQuestions[index].correct) {
      score++;
    }
  });
  
  // Calculate elapsed time
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  
  // ── Sauvegarder le résultat sur le backend (si connecté) ──────────
  sauvegarderResultatQuiz();

  // Show results
  displayResults(minutes, seconds);
  showSection('resultsSection');
}

// ── Sauvegarde du résultat de quiz via l'API backend ──────────────────
async function sauvegarderResultatQuiz() {
  // getCurrentUser() est fourni par auth.js
  if (typeof getCurrentUser !== 'function' || !getCurrentUser()) {
    // Utilisateur non connecté → on ne sauvegarde pas côté serveur
    return;
  }

  if (typeof apiSauvegarderQuiz !== 'function') {
    console.warn('api.js non chargé — impossible de sauvegarder le résultat du quiz.');
    return;
  }

  try {
    const data = await apiSauvegarderQuiz(
      selectedSubject,
      selectedGrade,
      selectedDifficulty,
      score,
      currentQuestions.length
    );

    if (data.success) {
      console.log(`✅ Résultat sauvegardé ! Progression : ${data.progression}`);
    } else {
      console.warn('⚠️ Le résultat du quiz n\'a pas pu être sauvegardé :', data.message);
    }
  } catch (err) {
    console.error('⚠️ Erreur réseau lors de la sauvegarde du résultat du quiz :', err.message);
  }
}

function displayResults(minutes, seconds) {
  const percentage = Math.round((score / currentQuestions.length) * 100);
  
  // Update score display
  document.getElementById('scoreText').textContent = `${score}/${currentQuestions.length}`;
  document.getElementById('scorePercentage').textContent = `${percentage}%`;
  
  // Update icon and message based on performance
  let icon, title, message;
  
  if (percentage >= 90) {
    icon = '🏆';
    title = 'Excellent !';
    message = `Bravo ! Tu es un champion ! Tu as répondu correctement à ${score} questions sur ${currentQuestions.length} en ${minutes}min ${seconds}s. Continue comme ça ! 🌟`;
  } else if (percentage >= 70) {
    icon = '🎉';
    title = 'Très bien !';
    message = `Super travail ! Tu as eu ${score} bonnes réponses sur ${currentQuestions.length}. Tu maîtrises bien le sujet ! 💪`;
  } else if (percentage >= 50) {
    icon = '😊';
    title = 'Bien !';
    message = `Bon effort ! Tu as ${score} bonnes réponses. Avec un peu plus de révision, tu vas devenir excellent ! 📚`;
  } else {
    icon = '💪';
    title = 'Continue !';
    message = `Ne te décourage pas ! Tu as ${score} bonnes réponses. Révise bien et réessaye, tu vas progresser ! 🌈`;
  }
  
  document.getElementById('resultsIcon').textContent = icon;
  document.getElementById('resultsTitle').textContent = title;
  document.getElementById('resultsMessage').textContent = message;
}

function showCorrection() {
  const correctionContent = document.getElementById('correctionContent');
  correctionContent.innerHTML = '';
  
  currentQuestions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === question.correct;
    
    const correctionItem = document.createElement('div');
    correctionItem.className = `correction-item ${isCorrect ? 'correct' : 'incorrect'}`;
    
    const letters = ['A', 'B', 'C', 'D'];
    
    let answersHTML = '';
    if (!isCorrect) {
      answersHTML += `
        <div class="correction-answer your-answer">
          <span class="correction-answer-icon">❌</span>
          <span><strong>Ta réponse :</strong> ${letters[userAnswer]}. ${question.a[userAnswer]}</span>
        </div>
      `;
    }
    answersHTML += `
      <div class="correction-answer correct-answer">
        <span class="correction-answer-icon">✅</span>
        <span><strong>Bonne réponse :</strong> ${letters[question.correct]}. ${question.a[question.correct]}</span>
      </div>
    `;
    
    correctionItem.innerHTML = `
      <div class="correction-question">
        <span class="correction-question-number">${index + 1}</span>
        <span>${question.q}</span>
      </div>
      <div class="correction-answers">
        ${answersHTML}
      </div>
      <div class="correction-explanation">
        💡 <strong>Explication :</strong> ${question.explanation}
      </div>
    `;
    
    correctionContent.appendChild(correctionItem);
  });
  
  showSection('correctionSection');
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  
  startQuiz();
}

// ============ Mobile Menu ============
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('is-open');
});

// ============ Language Selector ============
const langSelect = document.getElementById('langSelect');
const langSelectMobile = document.getElementById('langSelectMobile');

function changeLanguage(lang) {
  console.log('Langue changée:', lang);
  alert(`Langue changée: ${lang}\n\nCette fonctionnalité sera implémentée prochainement ! 🌐`);
}

langSelect.addEventListener('change', (e) => {
  changeLanguage(e.target.value);
  langSelectMobile.value = e.target.value;
});

langSelectMobile.addEventListener('change', (e) => {
  changeLanguage(e.target.value);
  langSelect.value = e.target.value;
});