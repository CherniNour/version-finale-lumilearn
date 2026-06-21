// ─────────────────────────────────────────────
// SEED DATABASE LUMILEARN (CLEAN VERSION)
// npm run seed
// ─────────────────────────────────────────────

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');
const Audio = require('../models/Audio');
const QuizResult = require('../models/QuizResult');
const Contact = require('../models/Contact');
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');


// ─────────────────────────────
// CONNECTION
// ─────────────────────────────
async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lumilearn');
  console.log('✅ MongoDB connecté');
}

// ─────────────────────────────
// USERS
// ─────────────────────────────
const users = [
  { nom:'Yasmine Ben Salem', email:'yasmine@lumilearn.com', motDePasse:'123456', classe:1, langue:'fr' },
  { nom:'Omar Trabelsi', email:'omar@lumilearn.com', motDePasse:'123456', classe:1, langue:'ar' },

  { nom:'Lina Chaabane', email:'lina@lumilearn.com', motDePasse:'123456', classe:2, langue:'fr' },
  { nom:'Karim Mansouri', email:'karim@lumilearn.com', motDePasse:'123456', classe:2, langue:'fr' },

  { nom:'Nour Bouazizi', email:'nour@lumilearn.com', motDePasse:'123456', classe:3, langue:'fr' },
  { nom:'Amine Ferchichi', email:'amine@lumilearn.com', motDePasse:'123456', classe:3, langue:'ar' },

  { nom:'Sana Jebali', email:'sana@lumilearn.com', motDePasse:'123456', classe:4, langue:'fr' },
  { nom:'Youssef Khelil', email:'youssef@lumilearn.com', motDePasse:'123456', classe:4, langue:'fr' },

  { nom:'Ines Hammami', email:'ines@lumilearn.com', motDePasse:'123456', classe:5, langue:'fr' },
  { nom:'Mehdi Gharbi', email:'mehdi@lumilearn.com', motDePasse:'123456', classe:5, langue:'ar' },

  { nom:'Ahmed Ben Ali', email:'ahmed@lumilearn.com', motDePasse:'123456', classe:6, langue:'fr' },
  { nom:'Mariem Slimani', email:'mariem@lumilearn.com', motDePasse:'123456', classe:6, langue:'ar' },

  { nom:'Admin LumiLearn', email:'admin@lumilearn.com', motDePasse:'admin123', classe:6, langue:'fr', role:'admin' }
];

// ─────────────────────────────
// AUDIOS
// ─────────────────────────────
const audios = [
  { titre:'The Little Seed', fichier:'Audio/THETINYSEED.mp3', niveau:0, langue:'fr', emoji:'🌱' },
  { titre:'A Day at the Farm', fichier:'Audio/Farm.mp3', niveau:1, langue:'fr', emoji:'🐄' },
  { titre:'How to Catch a Rainbow', fichier:'Audio/RAINBOW.mp3', niveau:1, langue:'fr', emoji:'🌈' },
  { titre:'Planet Earth', fichier:'Audio/Earth.mp3', niveau:3, langue:'fr', emoji:'🌍' },
  { titre:'My First Math', fichier:'Audio/Math.mp3', niveau:1, langue:'fr', emoji:'🔢' }
];

// ─────────────────────────────
// QUIZ DEMO RESULTS
// ─────────────────────────────
const quizResults = [
  { userIndex:0, matiere:'math', classe:1, difficulte:'facile', score:8, total:10 },
  { userIndex:2, matiere:'science', classe:2, difficulte:'moyen', score:12, total:15 },
  { userIndex:4, matiere:'math', classe:3, difficulte:'moyen', score:11, total:15 },
  { userIndex:6, matiere:'history', classe:4, difficulte:'difficile', score:15, total:20 },
  { userIndex:8, matiere:'math', classe:5, difficulte:'difficile', score:17, total:20 },
  { userIndex:10, matiere:'science', classe:6, difficulte:'difficile', score:19, total:20 }
];

// ─────────────────────────────
// QUIZ QUESTIONS
// ─────────────────────────────
const quizData = [{ question: "سؤال فرنسي متقدم 5", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "french", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال فرنسي متقدم 6", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "french", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال فرنسي متقدم 7", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 2, matiere: "french", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال فرنسي متقدم 8", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 3, matiere: "french", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال فرنسي متقدم 9", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "french", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال فرنسي متقدم 10", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "french", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },

  // ===== ISLAMIC =====
  // Classe 1,3,5 - Facile
  { question: "كم ركناً للإسلام ؟", answers: ["3", "4", "5", "6"], correctAnswer: 2, matiere: "islamic", classe: 1, difficulte: "facile", langue: "ar", explication: "5 أركان: شهادة، صلاة، صيام، زكاة، حج" },
  { question: "كم مرة في اليوم يصلي المسلم ؟", answers: ["3", "4", "5", "6"], correctAnswer: 2, matiere: "islamic", classe: 1, difficulte: "facile", langue: "ar", explication: "5 صلوات: فجر، ظهر، عصر، مغرب، عشاء" },
  { question: "ما الكتاب المقدس للمسلمين ؟", answers: ["الإنجيل", "التوراة", "القرآن الكريم", "الزبور"], correctAnswer: 2, matiere: "islamic", classe: 1, difficulte: "facile", langue: "ar", explication: "القرآن الكريم = كتاب المسلمين" },
  { question: "ما اسم شهر الصيام في الإسلام ؟", answers: ["شعبان", "رمضان", "رجب", "محرم"], correctAnswer: 1, matiere: "islamic", classe: 1, difficulte: "facile", langue: "ar", explication: "رمضان = شهر الصيام" },
  { question: "في أي مدينة ولد النبي محمد ﷺ ؟", answers: ["المدينة المنورة", "مكة المكرمة", "الطائف", "القدس"], correctAnswer: 1, matiere: "islamic", classe: 1, difficulte: "facile", langue: "ar", explication: "ولد ﷺ في مكة المكرمة" },

  // Classe 1,3,5 - Moyen
  { question: "ما أول سورة في القرآن الكريم ؟", answers: ["البقرة", "الفاتحة", "الإخلاص", "الناس"], correctAnswer: 1, matiere: "islamic", classe: 3, difficulte: "moyen", langue: "ar", explication: "الفاتحة = أول سورة" },
  { question: "كم عدد آيات سورة الفاتحة ؟", answers: ["5", "6", "7", "8"], correctAnswer: 2, matiere: "islamic", classe: 3, difficulte: "moyen", langue: "ar", explication: "7 آيات" },
  { question: "ما اسم زوجة النبي إبراهيم أم إسماعيل ؟", answers: ["سارة", "هاجر", "مريم", "آسية"], correctAnswer: 1, matiere: "islamic", classe: 3, difficulte: "moyen", langue: "ar", explication: "هاجر = أم إسماعيل" },
  { question: "ما مدة صيام رمضان تقريباً ؟", answers: ["20 يوماً", "25 يوماً", "28-30 يوماً", "35 يوماً"], correctAnswer: 2, matiere: "islamic", classe: 5, difficulte: "moyen", langue: "ar", explication: "28-30 يوماً حسب الهلال" },
  { question: "من هو أول خليفة في الإسلام ؟", answers: ["عمر بن الخطاب", "أبو بكر الصديق", "عثمان بن عفان", "علي بن أبي طالب"], correctAnswer: 1, matiere: "islamic", classe: 5, difficulte: "moyen", langue: "ar", explication: "أبو بكر = أول خليفة" },

  // Classe 1,3,5 - Difficile (générées)
  { question: "سؤال إسلامي متقدم 1", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 2", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 3", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 2, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 4", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 3, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 5", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 6", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 7", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 2, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 8", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 3, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 9", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال إسلامي متقدم 10", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "islamic", classe: 5, difficulte: "difficile", langue: "ar", explication: "" },

  // ===== GEOGRAPHY =====
  // Classe 4 - Facile
  { question: "كم قارة في العالم ؟", answers: ["5", "6", "7", "8"], correctAnswer: 2, matiere: "geography", classe: 4, difficulte: "facile", langue: "ar", explication: "7 قارات" },
  { question: "ما أطول نهر في العالم ؟", answers: ["نهر الأمازون", "نهر النيل", "نهر المسيسيبي", "نهر الدانوب"], correctAnswer: 1, matiere: "geography", classe: 4, difficulte: "facile", langue: "ar", explication: "نهر النيل = أطول نهر" },
  { question: "ما أكبر قارة في العالم ؟", answers: ["إفريقيا", "أمريكا", "آسيا", "أوروبا"], correctAnswer: 2, matiere: "geography", classe: 4, difficulte: "facile", langue: "ar", explication: "آسيا = أكبر قارة" },
  { question: "ما اسم أكبر محيطات العالم ؟", answers: ["المحيط الأطلسي", "المحيط الهندي", "المحيط المتجمد الشمالي", "المحيط الهادئ"], correctAnswer: 3, matiere: "geography", classe: 4, difficulte: "facile", langue: "ar", explication: "المحيط الهادئ = أكبر محيط" },
  { question: "ما عاصمة المملكة العربية السعودية ؟", answers: ["جدة", "الرياض", "مكة المكرمة", "الدمام"], correctAnswer: 1, matiere: "geography", classe: 4, difficulte: "facile", langue: "ar", explication: "الرياض = العاصمة" },

  // Classe 4 - Moyen
  { question: "أين يقع جبل إيفرست ؟", answers: ["الهند", "الصين", "نيبال وتيبت", "باكستان"], correctAnswer: 2, matiere: "geography", classe: 4, difficulte: "moyen", langue: "ar", explication: "إيفرست في نيبال/تيبت" },
  { question: "ما أصغر دولة في العالم ؟", answers: ["موناكو", "سان مارينو", "الفاتيكان", "ليشتنشتاين"], correctAnswer: 2, matiere: "geography", classe: 4, difficulte: "moyen", langue: "ar", explication: "الفاتيكان = أصغر دولة" },
  { question: "في أي قارة تقع البرازيل ؟", answers: ["إفريقيا", "آسيا", "أمريكا الشمالية", "أمريكا الجنوبية"], correctAnswer: 3, matiere: "geography", classe: 4, difficulte: "moyen", langue: "ar", explication: "البرازيل في أمريكا الجنوبية" },
  { question: "ما اسم الصحراء الأكبر في العالم ؟", answers: ["صحراء العرب", "صحراء غوبي", "صحراء الصحراء الكبرى", "صحراء أستراليا"], correctAnswer: 2, matiere: "geography", classe: 4, difficulte: "moyen", langue: "ar", explication: "الصحراء الكبرى = أكبر صحراء" },
  { question: "كم عدد ولايات تونس ؟", answers: ["20", "24", "28", "32"], correctAnswer: 1, matiere: "geography", classe: 4, difficulte: "moyen", langue: "ar", explication: "24 ولاية" },

  // Classe 4 - Difficile (générées)
  { question: "سؤال جغرافي متقدم 1", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 2", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 3", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 2, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 4", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 3, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 5", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 6", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 7", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 2, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 8", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 3, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 9", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال جغرافي متقدم 10", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "geography", classe: 4, difficulte: "difficile", langue: "ar", explication: "" },

  // ===== CIVIC =====
  // Classe 6 - Facile
  { question: "ما عاصمة تونس ؟", answers: ["صفاقس", "سوسة", "تونس", "قابس"], correctAnswer: 2, matiere: "civic", classe: 6, difficulte: "facile", langue: "ar", explication: "تونس = العاصمة" },
  { question: "ما رمز تونس الوطني ؟", answers: ["النخلة", "السهم", "النسر", "الهلال والنجمة"], correctAnswer: 3, matiere: "civic", classe: 6, difficulte: "facile", langue: "ar", explication: "الهلال والنجمة = رمز تونس" },
  { question: "ما ألوان العلم التونسي ؟", answers: ["أبيض وأخضر", "أحمر وأبيض", "أزرق وأبيض", "أحمر وأسود"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "facile", langue: "ar", explication: "أحمر وأبيض" },
  { question: "ما الواجب الوطني للمواطن ؟", answers: ["لا يوجد", "دفع الضرائب والتصويت", "فقط دفع الضرائب", "فقط التصويت"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "facile", langue: "ar", explication: "دفع الضرائب + التصويت" },
  { question: "ما سن التصويت في تونس ؟", answers: ["16 سنة", "18 سنة", "20 سنة", "21 سنة"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "facile", langue: "ar", explication: "18 سنة" },

  // Classe 6 - Moyen
  { question: "ما الفرق بين الحقوق والواجبات ؟", answers: ["لا فرق", "الحقوق ما للمواطن والواجبات ما عليه", "الواجبات فقط للدولة", "الحقوق اختيارية والواجبات إلزامية فقط"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "moyen", langue: "ar", explication: "الحقوق = للمواطن، الواجبات = عليه" },
  { question: "من يمثل رأس الدولة في تونس ؟", answers: ["رئيس الحكومة", "رئيس الجمهورية", "رئيس البرلمان", "الوزير الأول"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "moyen", langue: "ar", explication: "رئيس الجمهورية = رأس الدولة" },
  { question: "ما دور البرلمان ؟", answers: ["تطبيق القوانين", "سن القوانين", "القضاء والحكم", "إدارة المدارس"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "moyen", langue: "ar", explication: "البرلمان = يشرّع القوانين" },
  { question: "ما مبدأ المساواة أمام القانون ؟", answers: ["المواطنون الأغنياء لهم حقوق أكثر", "جميع المواطنين متساوون في الحقوق والواجبات", "فقط المواطنون البالغون متساوون", "المساواة مستحيلة"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "moyen", langue: "ar", explication: "جميع المواطنين متساوون" },
  { question: "ما هي منظمة الأمم المتحدة ؟", answers: ["مجموعة اقتصادية", "منظمة دولية للسلام والتعاون", "حلف عسكري", "منظمة دينية"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "moyen", langue: "ar", explication: "UN = منظمة دولية للسلام" },

  // Classe 6 - Difficile (générées)
  { question: "سؤال مدني متقدم 1", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 2", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 3", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 2, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 4", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 3, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 5", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 6", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 7", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 2, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 8", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 3, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 9", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 0, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" },
  { question: "سؤال مدني متقدم 10", answers: ["الإجابة أ", "الإجابة ب", "الإجابة ج", "الإجابة د"], correctAnswer: 1, matiere: "civic", classe: 6, difficulte: "difficile", langue: "ar", explication: "" }
];
const Book = require('../models/Book');

const seedBooks = async () => {
  await Book.deleteMany({});

  const booksData = [
    // ═══════════════════════════════════════════════════
    // السنة الأولى — 1ère Année (3 livres)
    // ═══════════════════════════════════════════════════
    {
      title: 'كتاب القراءة أبيسي',
      subject: 'Arabe',
      gradeLevel: 1,
      description: 'Manuel de lecture arabe — 1ère année',
      pdfUrl: '/Books/Grade1/kitab_alqira_abisi.pdf',
      coverImage: '/Images/covers/grade1_qira.jpg',
      pageCount: 120
    },
    {
      title: 'كتاب التمارين أبيسي',
      subject: 'Arabe',
      gradeLevel: 1,
      description: 'Cahier d\'exercices arabe — 1ère année',
      pdfUrl: '/Books/Grade1/kitab_altamrin_abisi.pdf',
      coverImage: '/Images/covers/grade1_tamrin.jpg',
      pageCount: 100
    },
    {
      title: 'رياضيات',
      subject: 'Mathématiques',
      gradeLevel: 1,
      description: 'Mathématiques — 1ère année',
      pdfUrl: '/Books/Grade1/riyadiyat1.pdf',
      coverImage: '/Images/covers/grade1_math.jpg',
      pageCount: 110
    },

    // ═══════════════════════════════════════════════════
    // السنة الثانية — 2ème Année (4 livres)
    // ═══════════════════════════════════════════════════
    {
      title: 'كتاب القراءة، مساراتي',
      subject: 'Arabe',
      gradeLevel: 2,
      description: 'Manuel de lecture arabe — 2ème année',
      pdfUrl: '/Books/Grade2/kitab_alqira_masaraty.pdf',
      coverImage: '/Images/covers/grade2_qira.jpg',
      pageCount: 130
    },
    {
      title: 'كتاب التمارين، مساراتي',
      subject: 'Arabe',
      gradeLevel: 2,
      description: 'Cahier d\'exercices arabe — 2ème année',
      pdfUrl: '/Books/Grade2/kitab_altamrin_masaraty.pdf',
      coverImage: '/Images/covers/grade2_tamrin.jpg',
      pageCount: 120
    },
    {
      title: 'رياضيات',
      subject: 'Mathématiques',
      gradeLevel: 2,
      description: 'Mathématiques — 2ème année',
      pdfUrl: '/Books/Grade2/riyadiyat2.pdf',
      coverImage: '/Images/covers/grade2_math.jpg',
      pageCount: 140
    },
    {
      title: 'Mon cahier d\'activités',
      subject: 'Français',
      gradeLevel: 2,
      description: 'Cahier d\'activités français — 2ème année',
      pdfUrl: '/Books/Grade2/mon_cahier_activites2.pdf',
      coverImage: '/Images/covers/grade2_francais.jpg',
      pageCount: 90
    },

    // ═══════════════════════════════════════════════════
    // السنة الثالثة — 3ème Année (8 livres)
    // ═══════════════════════════════════════════════════
    {
      title: 'القرآن الكريم – جزء عم',
      subject: 'Étude Islamique',
      gradeLevel: 3,
      description: 'Juz\' Amma — 3ème année',
      pdfUrl: '/Books/Grade3/quran_juz_amma.pdf',
      coverImage: '/Images/covers/grade3_quran.jpg',
      pageCount: 80
    },
    {
      title: 'ينابيع القراءة',
      subject: 'Arabe',
      gradeLevel: 3,
      description: 'Manuel de lecture arabe — 3ème année',
      pdfUrl: '/Books/Grade3/yanabie_alqira.pdf',
      coverImage: '/Images/covers/grade3_qira.jpg',
      pageCount: 150
    },
    {
      title: 'وقائع الأمة والإنتاج الكتابي',
      subject: 'Arabe',
      gradeLevel: 3,
      description: 'Production écrite arabe — 3ème année',
      pdfUrl: '/Books/Grade3/waqai_alumma.pdf',
      coverImage: '/Images/covers/grade3_waqai.jpg',
      pageCount: 100
    },
    {
      title: 'رياضيات',
      subject: 'Mathématiques',
      gradeLevel: 3,
      description: 'Mathématiques — 3ème année',
      pdfUrl: '/Books/Grade3/riyadiyat3.pdf',
      coverImage: '/Images/covers/grade3_math.jpg',
      pageCount: 160
    },
    {
      title: 'الإيقاظ العلمي',
      subject: 'Sciences',
      gradeLevel: 3,
      description: 'Sciences — 3ème année',
      pdfUrl: '/Books/Grade3/iiqaz_ilmi3.pdf',
      coverImage: '/Images/covers/grade3_sciences.jpg',
      pageCount: 120
    },
    {
      title: 'J\'apprends le français',
      subject: 'Français',
      gradeLevel: 3,
      description: 'Manuel de français — 3ème année',
      pdfUrl: '/Books/Grade3/japprends_francais3.pdf',
      coverImage: '/Images/covers/grade3_francais.jpg',
      pageCount: 140
    },
    {
      title: 'Je joue et je me projette : Manuel de lecture',
      subject: 'Français',
      gradeLevel: 3,
      description: 'Manuel de lecture français — 3ème année',
      pdfUrl: '/Books/Grade3/je_joue_manuel3.pdf',
      coverImage: '/Images/covers/grade3_francais_manuel.jpg',
      pageCount: 100
    },
    {
      title: 'Je joue et je me projette : Cahier d\'activités',
      subject: 'Français',
      gradeLevel: 3,
      description: 'Cahier d\'activités français — 3ème année',
      pdfUrl: '/Books/Grade3/je_joue_cahier3.pdf',
      coverImage: '/Images/covers/grade3_francais_cahier.jpg',
      pageCount: 80
    },

    // ═══════════════════════════════════════════════════
    // السنة الرابعة — 4ème Année (8 livres)
    // ═══════════════════════════════════════════════════
    {
      title: 'ذوات الحوار: كتاب القراءة',
      subject: 'Arabe',
      gradeLevel: 4,
      description: 'Manuel de lecture arabe — 4ème année',
      pdfUrl: '/Books/Grade4/dhawat_alhiwar.pdf',
      coverImage: '/Images/covers/grade4_qira.jpg',
      pageCount: 160
    },
    {
      title: 'أضواء التواصل: كتاب التمارين',
      subject: 'Arabe',
      gradeLevel: 4,
      description: 'Cahier d\'exercices arabe — 4ème année',
      pdfUrl: '/Books/Grade4/adwaa_altawassul.pdf',
      coverImage: '/Images/covers/grade4_tamrin.jpg',
      pageCount: 140
    },
    {
      title: 'رياضيات',
      subject: 'Mathématiques',
      gradeLevel: 4,
      description: 'Mathématiques — 4ème année',
      pdfUrl: '/Books/Grade4/riyadiyat4.pdf',
      coverImage: '/Images/covers/grade4_math.jpg',
      pageCount: 170
    },
    {
      title: 'كراس الزاميات',
      subject: 'Arabe',
      gradeLevel: 4,
      description: 'Cahier obligatoire arabe — 4ème année',
      pdfUrl: '/Books/Grade4/karaz_alzamiyat4.pdf',
      coverImage: '/Images/covers/grade4_karaz.jpg',
      pageCount: 90
    },
    {
      title: 'الإيقاظ العلمي',
      subject: 'Sciences',
      gradeLevel: 4,
      description: 'Sciences — 4ème année',
      pdfUrl: '/Books/Grade4/iiqaz_ilmi4.pdf',
      coverImage: '/Images/covers/grade4_sciences.jpg',
      pageCount: 130
    },
    {
      title: 'Au rythme des projets : Manuel de lecture',
      subject: 'Français',
      gradeLevel: 4,
      description: 'Manuel de lecture français — 4ème année',
      pdfUrl: '/Books/Grade4/au_rythme_manuel4.pdf',
      coverImage: '/Images/covers/grade4_francais_manuel.jpg',
      pageCount: 120
    },
    {
      title: 'Au rythme des projets : Cahier d\'activités',
      subject: 'Français',
      gradeLevel: 4,
      description: 'Cahier d\'activités français — 4ème année',
      pdfUrl: '/Books/Grade4/au_rythme_cahier4.pdf',
      coverImage: '/Images/covers/grade4_francais_cahier.jpg',
      pageCount: 100
    },
    {
      title: 'Have fun learn English',
      subject: 'Anglais',
      gradeLevel: 4,
      description: 'Anglais — 4ème année',
      pdfUrl: '/Books/Grade4/have_fun_english4.pdf',
      coverImage: '/Images/covers/grade4_english.jpg',
      pageCount: 110
    },

    // ═══════════════════════════════════════════════════
    // السنة الخامسة — 5ème Année (7 livres)
    // ═══════════════════════════════════════════════════
    {
      title: 'مسارات القراءة: كتاب النصوص',
      subject: 'Arabe',
      gradeLevel: 5,
      description: 'Manuel de textes arabe — 5ème année',
      pdfUrl: '/Books/Grade5/masarat_alqira_nusus.pdf',
      coverImage: '/Images/covers/grade5_qira.jpg',
      pageCount: 170
    },
    {
      title: 'مسارات الكتابة: كتاب التمارين',
      subject: 'Arabe',
      gradeLevel: 5,
      description: 'Cahier d\'écriture arabe — 5ème année',
      pdfUrl: '/Books/Grade5/masarat_alkitaba_tamrin.pdf',
      coverImage: '/Images/covers/grade5_kitaba.jpg',
      pageCount: 150
    },
    {
      title: 'رياضيات',
      subject: 'Mathématiques',
      gradeLevel: 5,
      description: 'Mathématiques — 5ème année',
      pdfUrl: '/Books/Grade5/riyadiyat5.pdf',
      coverImage: '/Images/covers/grade5_math.jpg',
      pageCount: 180
    },
    {
      title: 'كراس الزاميات',
      subject: 'Arabe',
      gradeLevel: 5,
      description: 'Cahier obligatoire arabe — 5ème année',
      pdfUrl: '/Books/Grade5/karaz_alzamiyat5.pdf',
      coverImage: '/Images/covers/grade5_karaz.jpg',
      pageCount: 100
    },
    {
      title: 'الإيقاظ العلمي',
      subject: 'Sciences',
      gradeLevel: 5,
      description: 'Sciences — 5ème année',
      pdfUrl: '/Books/Grade5/iiqaz_ilmi5.pdf',
      coverImage: '/Images/covers/grade5_sciences.jpg',
      pageCount: 140
    },
        {
      title: 'تاريخ وجغرافيا',
      subject: 'Histoire-Géographie',
      gradeLevel: 5,
      description: 'Histoire et géographie — 5ème année',
      pdfUrl: '/Books/Grade5/terikh_geo5.pdf',
      coverImage: '/Images/covers/grade5_histgeo.jpg',
      pageCount: 130
    },
    {
      title: 'Le français... un pas de plus : Manuel de lecture',
      subject: 'Français',
      gradeLevel: 5,
      description: 'Manuel de lecture français — 5ème année',
      pdfUrl: '/Books/Grade5/francais_pas_plus_manuel5.pdf',
      coverImage: '/Images/covers/grade5_francais_manuel.jpg',
      pageCount: 130
    },
    {
      title: 'Le français... un pas de plus : Cahier d\'activités',
      subject: 'Français',
      gradeLevel: 5,
      description: 'Cahier d\'activités français — 5ème année',
      pdfUrl: '/Books/Grade5/francais_pas_plus_cahier5.pdf',
      coverImage: '/Images/covers/grade5_francais_cahier.jpg',
      pageCount: 110
    },
    {
      title: 'Activity book 5th year Basic book',
      subject: 'Anglais',
      gradeLevel: 5,
      description: 'Anglais — 5ème année',
      pdfUrl: '/Books/Grade5/activity_book_english5.pdf',
      coverImage: '/Images/covers/grade5_english.jpg',
      pageCount: 120
    },

    // ═══════════════════════════════════════════════════
    // السنة السادسة — 6ème Année (7 livres)
    // ═══════════════════════════════════════════════════
    {
      title: 'عالم القراءة: كتاب النصوص',
      subject: 'Arabe',
      gradeLevel: 6,
      description: 'Manuel de textes arabe — 6ème année',
      pdfUrl: '/Books/Grade6/alem_alqira_nusus.pdf',
      coverImage: '/Images/covers/grade6_qira.jpg',
      pageCount: 190
    },
        {
      title: 'عالم القراءة: كتاب التمارين',
      subject: 'Arabe',
      gradeLevel: 6,
      description: 'Cahier d\'exercices arabe — 6ème année',
      pdfUrl: '/Books/Grade6/alem_alqira_tamarin.pdf',
      coverImage: '/Images/covers/grade6_qira_tamarin.jpg',
      pageCount: 100
    },
    {
      title: 'رياضيات',
      subject: 'Mathématiques',
      gradeLevel: 6,
      description: 'Mathématiques — 6ème année',
      pdfUrl: '/Books/Grade6/riyadiyat6.pdf',
      coverImage: '/Images/covers/grade6_math.jpg',
      pageCount: 200
    },
    {
      title: 'كراس الزاميات',
      subject: 'Arabe',
      gradeLevel: 6,
      description: 'Cahier obligatoire arabe — 6ème année',
      pdfUrl: '/Books/Grade6/karaz_alzamiyat6.pdf',
      coverImage: '/Images/covers/grade6_karaz.jpg',
      pageCount: 110
    },
    {
      title: 'الإيقاظ العلمي',
      subject: 'Sciences',
      gradeLevel: 6,
      description: 'Sciences — 6ème année',
      pdfUrl: '/Books/Grade6/iiqaz_ilmi6.pdf',
      coverImage: '/Images/covers/grade6_sciences.jpg',
      pageCount: 150
    },
        {
      title: 'تاريخ وجغرافيا',
      subject: 'Histoire-Géographie',
      gradeLevel: 6,
      description: 'Histoire et géographie — 6ème année',
      pdfUrl: '/Books/Grade6/terikh_geo6.pdf',
      coverImage: '/Images/covers/grade6_histgeo.jpg',
      pageCount: 140
    },
    {
      title: 'Un pas de plus vers le collège : Manuel de lecture',
      subject: 'Français',
      gradeLevel: 6,
      description: 'Manuel de lecture français — 6ème année',
      pdfUrl: '/Books/Grade6/un_pas_plus_manuel6.pdf',
      coverImage: '/Images/covers/grade6_francais_manuel.jpg',
      pageCount: 140
    },
    {
      title: 'Un pas de plus vers le collège : Cahier d\'activités',
      subject: 'Français',
      gradeLevel: 6,
      description: 'Cahier d\'activités français — 6ème année',
      pdfUrl: '/Books/Grade6/un_pas_plus_cahier6.pdf',
      coverImage: '/Images/covers/grade6_francais_cahier.jpg',
      pageCount: 120
    },
    {
      title: 'Learn and Grow : Student\'s Book',
      subject: 'Anglais',
      gradeLevel: 6,
      description: 'Anglais — 6ème année',
      pdfUrl: '/Books/Grade6/learn_grow_english6.pdf',
      coverImage: '/Images/covers/grade6_english.jpg',
      pageCount: 160
    }
  ];

  await Book.insertMany(booksData);
  console.log(`📚 ${booksData.length} livres scolaires officiels créés`);
  console.log(`   • 1ère année : 3 livres`);
  console.log(`   • 2ème année : 4 livres`);
  console.log(`   • 3ème année : 8 livres`);
  console.log(`   • 4ème année : 8 livres`);
  console.log(`   • 5ème année : 8 livres`);
  console.log(`   • 6ème année : 7 livres`);
};
// Dans la fonction seed, après les autres seeds :
const seedCourses = async (createdUsers) => {
  await Course.deleteMany({});
  
  // Trouver un prof/admin pour les cours
  const teacher = createdUsers.find(u => u.role === 'admin') || createdUsers[0];
  
  const coursesData = [
    {
      title: 'Introduction aux fractions',
      description: 'Cours complet sur les fractions pour les 3ème année. Nous apprendrons à additionner, soustraire et multiplier les fractions.',
      subject: 'Mathématiques',
      gradeLevel: 3,
      teacherId: teacher._id,
      teacherName: teacher.nom,
      files: []
    },
    {
      title: 'La révolution tunisienne',
      description: 'Histoire de la révolution du Jasmin et ses conséquences sur la Tunisie moderne.',
      subject: 'Histoire-Géographie',
      gradeLevel: 6,
      teacherId: teacher._id,
      teacherName: teacher.nom,
      files: []
    }
  ];

  await Course.insertMany(coursesData);
  console.log(`📚 ${coursesData.length} cours créés`);
};


// N'oublie pas d'appeler : await seedBooks(); dans ta fonction seed principale
// ─────────────────────────────
// MAIN SEED
// ─────────────────────────────
async function seed() {
  try {
    await connectDB();

    // CLEAN DB
    await Promise.all([
      User.deleteMany({}),
      Audio.deleteMany({}),
      QuizResult.deleteMany({}),
      Contact.deleteMany({}),
      Quiz.deleteMany({}),
      Book.deleteMany({})  // ← AJOUTE CELA AUSSI pour nettoyer les livres
    ]);

    console.log('🗑️ DB nettoyée');

    // USERS
    const createdUsers = [];

    for (const u of users) {
      const hash = await bcrypt.hash(u.motDePasse, 10);
      const created = await User.create({ ...u, motDePasse: hash });
      createdUsers.push(created);
    }

    console.log(`👥 ${createdUsers.length} users créés`);

    // AUDIOS
    await Audio.insertMany(audios);
    console.log(`🎧 ${audios.length} audios créés`);

    // QUIZ QUESTIONS
    await Quiz.insertMany(quizData);
    console.log(`🧠 ${quizData.length} questions créées`);

    // RESULTS DEMO
    const results = quizResults.map(r => ({
      userId: createdUsers[r.userIndex]._id,
      matiere: r.matiere,
      classe: r.classe,
      difficulte: r.difficulte,
      score: r.score,
      total: r.total
    }));

    await QuizResult.insertMany(results);
    console.log(`📝 ${results.length} résultats créés`);

    // CONTACT DEMO
    await Contact.create({
      nom: 'Test User',
      email: 'test@lumilearn.com',
      sujet: 'Quiz',
      message: 'Seed data test message'
    });

    console.log('📩 contact créé');

    // ═══════════════════════════════════════════════════
    // 📚 LIVRES SCOLAIRES — AJOUTE CECI
    // ═══════════════════════════════════════════════════
    await seedBooks();
    // ═══════════════════════════════════════════════════

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ SEED TERMINÉ AVEC SUCCÈS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin: admin@lumilearn.com / admin123');
    console.log('Users: password = 123456');

    process.exit(0);

  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();