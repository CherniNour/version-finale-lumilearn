// ═════════════════════════════════════════════════════════════
// SERVEUR PRINCIPAL — LumiLearn Backend
// ═════════════════════════════════════════════════════════════
require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const session    = require('express-session');
const path       = require('path');
const multer     = require('multer');
const fs         = require('fs');
const connectDB  = require('./config/database');

const authRoutes    = require('./routes/auth');
const audioRoutes   = require('./routes/audio');
const quizRoutes    = require('./routes/quiz');
const contactRoutes = require('./routes/contact');
const bookRoutes    = require('./routes/books');
const courseRoutes  = require('./routes/courses');

const app  = express();
const PORT = process.env.PORT || 5001;

// ── ÉTAPE 1 : Connexion MongoDB ──────────────────────────────
connectDB();

// ── ÉTAPE 2 : Middlewares de base ────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── ÉTAPE 3 : Configuration des sessions (AVANT CORS !) ──────
app.use(session({
  secret:            process.env.SESSION_SECRET || 'secret123',
  resave:            false,
  saveUninitialized: false,
  cookie: {
    maxAge:   1000 * 60 * 60 * 24,
    httpOnly: true,
    secure:   false,
    sameSite: 'lax'
  }
}));

// ── ÉTAPE 4 : CORS (APRÈS SESSION !) ─────────────────────────
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:5001',
    'http://127.0.0.1:5001'
  ],
  credentials: true
}));

// ── ÉTAPE 5 : Fichiers statiques ─────────────────────────────
app.use(express.static(path.join(__dirname, '../public')));

// ── ÉTAPE 5b : Multer pour uploads ───────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/courses');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/', 'application/pdf', 'video/', 'audio/'];
    if (allowed.some(type => file.mimetype.startsWith(type))) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'), false);
    }
  }
});

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// ── ÉTAPE 6 : Routes ─────────────────────────────────────────
app.use('/api/auth',    authRoutes);
app.use('/api/audio',   audioRoutes);
app.use('/api/quiz',    quizRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/books',   bookRoutes);
app.use('/api/courses', upload.array('files', 10), courseRoutes);

// Raccourci /api/users → délègue à /api/auth/users (GET, DELETE, POST)
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const { estConnecte } = require('./middleware/session');

app.get('/api/users', estConnecte, async (req, res) => {
  const role = req.session.user?.role;
  if (role !== 'admin' && role !== 'prof') return res.status(403).json({ success:false, message:'Accès refusé.' });
  try {
    const users = await User.find({}).select('-motDePasse').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch(e) { res.status(500).json({ success:false, message:'Erreur serveur.' }); }
});

app.delete('/api/users/:id', estConnecte, async (req, res) => {
  if (req.session.user?.role !== 'admin') return res.status(403).json({ success:false, message:'Accès refusé.' });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success:true, message:'Compte supprimé.' });
  } catch(e) { res.status(500).json({ success:false, message:'Erreur serveur.' }); }
});

// Route de test
app.get('/api/ping', (req, res) => {
  res.json({
    success: true,
    message: '🌟 LumiLearn API opérationnelle !',
    heure:   new Date().toLocaleTimeString('fr-FR')
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route "${req.url}" introuvable.` });
});

app.listen(PORT, () => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  🌟  LumiLearn Backend démarré`);
  console.log(`  📡  URL     : http://localhost:${PORT}`);
  console.log(`  🏥  Ping   : http://localhost:${PORT}/api/ping`);
  console.log(`  🔐  Auth   : http://localhost:${PORT}/api/auth`);
  console.log(`  🎧  Audio  : http://localhost:${PORT}/api/audio`);
  console.log(`  📚  Cours  : http://localhost:${PORT}/api/courses`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});