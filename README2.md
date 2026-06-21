# 🌟 LumiLearn — Plateforme Éducative Multilingue

Plateforme d'apprentissage en ligne avec backend Node.js + MongoDB, frontend HTML/CSS/JS multilingue (FR / EN / AR).

---

## 📁 Structure du projet
lumilearn/
│
├── backend/                        ← Serveur Node.js + Express
│   ├── .env                        ← Variables d'environnement
│   ├── package.json
│   └── src/
│       ├── server.js               ← Point d'entrée principal
│       ├── config/
│       │   ├── database.js         ← Connexion MongoDB
│       │   └── seed.js             ← Données de simulation
│       ├── models/
│       │   ├── User.js             ← Collection users
│       │   ├── Audio.js            ← Collection audios
│       │   ├── Book.js             ← Collection books
│       │   ├── Course.js           ← Collection courses
│       │   ├── Quiz.js             ← Collection quizzes
│       │   ├── QuizResult.js       ← Collection quizresults
│       │   └── Contact.js          ← Collection contacts
│       ├── middleware/
│       │   └── session.js          ← Vérification de session
│       ├── routes/
│       │   ├── auth.js             ← /api/auth/*
│       │   ├── audio.js            ← /api/audio/*
│       │   ├── book.js             ← /api/book/*
│       │   ├── course.js           ← /api/course/*
│       │   ├── quiz.js             ← /api/quiz/*
│       │   └── contact.js          ← /api/contact/*
│       └── public/
│           ├── Audio/              ← ⬅ Fichiers MP3
│           └── Images/             ← ⬅ Images du site
│
├── public/                         ← Frontend HTML multilingue
│   ├── assets/                     ← Ressources statiques
│   ├── Audio/                      ← Fichiers audio (lecture)
│   ├── Books/                      ← Livres / documents
│   ├── Images/                     ← Images du frontend
│   │
│   ├── api.js                      ← Fonctions fetch() centralisées
│   ├── auth.js                     ← Gestion authentification
│   ├── contact.js                  ← Gestion formulaire contact
│   ├── favorites.js                ← Gestion des favoris
│   ├── navbar.js                   ← Navigation dynamique
│   ├── quiz.js                     ← Logique des quiz
│   ├── search.js                   ← Barre de recherche
│   │
│   ├── admin_fr.html               ← Panel admin FR
│   ├── admin_en.html               ← Panel admin EN
│   ├── admin_ar.html               ← Panel admin AR
│   │
│   ├── apropos.html                ← À propos FR
│   ├── apropos_en.html             ← À propos EN
│   ├── apropos_ar.html             ← À propos AR
│   ├── apropos.css                 ← Styles à propos
│   │
│   ├── articles.html               ← Articles FR
│   ├── articles_en.html            ← Articles EN
│   ├── articles_ar.html            ← Articles AR
│   │
│   ├── audio.html                  ← Lecteur audio FR
│   ├── audio_ar.html               ← Lecteur audio AR
│   │
│   ├── contact.html                ← Contact FR
│   ├── contact_en.html             ← Contact EN
│   ├── contact_ar.html             ← Contact AR
│   ├── contact.css                 ← Styles contact
│   │
│   ├── curriculum.html             ← Curriculum FR
│   ├── curriculum_en.html          ← Curriculum EN
│   ├── curriculum_ar.html          ← Curriculum AR
│   │
│   ├── favoris.html                ← Favoris FR
│   ├── favoris_ar.html             ← Favoris AR
│   │
│   ├── indexSIGHT_fr.html          ← Index SIGHT FR
│   ├── indexSIGHT_en.html          ← Index SIGHT EN
│   ├── indexSIGHT_ar.html          ← Index SIGHT AR
│   ├── styleSIGHT.css              ← Styles SIGHT
│   │
│   ├── jeux_fr.html                ← Jeux FR
│   ├── jeux_en.html                ← Jeux EN
│   ├── jeux_ar.html                ← Jeux AR
│   │
│   ├── jeux1_fr.html / jeux1_fr.js / jeux1.css   ← Jeu 1 FR
│   ├── jeux1_en.html / jeux1_en.js               ← Jeu 1 EN
│   ├── jeux1_ar.html / jeux1_ar.js               ← Jeu 1 AR
│   │
│   ├── jeux2_fr.html / jeux2_fr.js / jeux2.css   ← Jeu 2 FR
│   ├── jeux2_en.html / jeux2_en.js               ← Jeu 2 EN
│   ├── jeux2_ar.html / jeux2_ar.js               ← Jeu 2 AR
│   │
│   ├── jeux3_ar.html / jeux3_ar.js / jeux3.css   ← Jeu 3 AR
│   │
│   ├── jeux4_ar.html / jeux4_fr.html
│   ├── jeux4_en.html / jeux4_en.js
│   ├── jeux4_fr.js / jeux4.css
│   │
│   ├── jeux5_ar.html / jeux5.js / jeux5.css      ← Jeu 5 AR
│   │
│   ├── kissas_fr.html              ← Contes FR
│   ├── kissas_en.html              ← Contes EN
│   ├── kissas_ar.html              ← Contes AR
│   │
│   ├── livres_fr.html              ← Livres FR
│   ├── livres_en.html              ← Livres EN
│   ├── livres_ar.html              ← Livres AR
│   │
│   ├── login.html                  ← Connexion FR
│   ├── login_en.html               ← Connexion EN
│   ├── login_ar.html               ← Connexion AR
│   │
│   ├── quiz.html                   ← Quiz FR
│   ├── quiz_en.html                ← Quiz EN
│   ├── quiz_ar.html                ← Quiz AR
│   ├── quiz.js
│   ├── styleQuiz.css               ← Styles quiz
│   │
│   ├── wikipedia.html              ← Wikipedia FR
│   ├── wikipedia_en.html           ← Wikipedia EN
│   ├── wikipedia_ar.html           ← Wikipedia AR
│   │
│   ├── search-styles.css           ← Styles recherche
│   │
│   └── ... (autres fichiers CSS/JS)
│
├── POSTMAN_GUIDE.md                ← Guide de test des APIs
└── README.md                       ← Ce fichier


---

## 🚀 Démarrage rapide

### Prérequis
- Node.js installé (`node --version`)
- MongoDB installé localement OU compte MongoDB Atlas

### 1. Aller dans le dossier backend
```bash
cd backend
2. Installer les dépendances
bash
npm install
3. Configurer les variables d'environnement
Créer le fichier backend/.env :
env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lumilearn
SESSION_SECRET=ton_secret_ici
4. Copier les fichiers médias
bash
# Copier tes MP3 et images vers le backend
cp public/Audio/*.mp3 backend/src/public/Audio/
cp public/Images/* backend/src/public/Images/
5. Créer la base de données (données de test)
bash
npm run seed
6. Démarrer le serveur
bash
npm run dev
Le serveur tourne sur http://localhost:5000
7. Lancer le frontend
Ouvrir le dossier public/ avec Live Server (VS Code)
URL : http://127.0.0.1:5500 ou directement http://localhost:5000/login.html
🗄️ Collections MongoDB
Table
Collection	Utilisation
users	Comptes étudiants et admins
audios	Livres audio (titre, fichier, niveau, langue)
books	Livres et documents
courses	Cours et leçons
quizzes	Quiz et questions
quizresults	Résultats de quiz par étudiant
contacts	Messages du formulaire contact
🌍 Pages multilingues
Toutes les pages sont disponibles en 3 langues :
Table
Page	FR	EN	AR
Accueil / Login	login.html	login_en.html	login_ar.html
Admin	admin_fr.html	admin_en.html	admin_ar.html
À propos	apropos.html	apropos_en.html	apropos_ar.html
Articles	articles.html	articles_en.html	articles_ar.html
Audio	audio.html	—	audio_ar.html
Contact	contact.html	contact_en.html	contact_ar.html
Curriculum	curriculum.html	curriculum_en.html	curriculum_ar.html
Favoris	favoris.html	—	favoris_ar.html
Jeux	jeux_fr.html	jeux_en.html	jeux_ar.html
Jeu 1	jeux1_fr.html	jeux1_en.html	jeux1_ar.html
Jeu 2	jeux2_fr.html	jeux2_en.html	jeux2_ar.html
Jeu 3	—	—	jeux3_ar.html
Jeu 4	jeux4_fr.html	jeux4_en.html	jeux4_ar.html
Jeu 5	—	—	jeux5_ar.html
Kissas (Contes)	kissas_fr.html	kissas_en.html	kissas_ar.html
Livres	livres_fr.html	livres_en.html	livres_ar.html
Quiz	quiz.html	quiz_en.html	quiz_ar.html
Wikipedia	wikipedia.html	wikipedia_en.html	wikipedia_ar.html
SIGHT	indexSIGHT_fr.html	indexSIGHT_en.html	indexSIGHT_ar.html
🔑 Comptes de test
Table
Rôle	Email	Mot de passe
Classe 1	yasmine@lumilearn.com	123456
Classe 2	lina@lumilearn.com	123456
Classe 3	nour@lumilearn.com	123456
Classe 4	sana@lumilearn.com	123456
Classe 5	ines@lumilearn.com	123456
Classe 6	ahmed@lumilearn.com	123456
Admin	admin@lumilearn.com	admin123
 

 🔧 Connexion au backend
Pour connecter une page HTML au backend, ajouter ces lignes avant tout autre <script> :
HTML
<script src="api.js"></script>
<script src="auth.js"></script>
Et pour le formulaire contact, ajouter aussi :
HTML
<script src="contact.js"></script>
🛠️ Technologies utilisées
Backend : Node.js, Express, MongoDB, Mongoose
Frontend : HTML5, CSS3, JavaScript vanilla
Authentification : Sessions avec express-session
Base de données : MongoDB (local ou Atlas)
📌 Notes importantes
Les fichiers audio doivent être placés dans backend/src/public/Audio/
Les images doivent être placées dans backend/src/public/Images/
Le fichier .env doit être configuré avant le premier lancement
Le serveur backend doit être lancé avant d'ouvrir le frontend
Les liens de navigation AR pointent vers les versions AR (et non FR)
Projet LumiLearn — 2026