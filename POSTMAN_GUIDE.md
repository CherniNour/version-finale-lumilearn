# 🧪 Guide de test avec Postman — LumiLearn API

> Base URL : `http://localhost:5000/api`
> Toujours cocher **"Send cookies"** dans Postman (onglet Settings)

---

## ✅ Étape 0 — Vérifier que le serveur tourne

**GET** `http://localhost:5000/api/ping`

Réponse attendue :
```json
{
  "success": true,
  "message": "🌟 LumiLearn API opérationnelle !",
  "heure": "14:32:10"
}
```

---

## 🔐 Authentification

### 1. Inscription d'un nouvel étudiant

**POST** `/api/auth/inscription`
**Headers** : `Content-Type: application/json`
**Body (raw JSON)** :
```json
{
  "nom": "Sarah Dupont",
  "email": "sarah@test.com",
  "motDePasse": "motdepasse123",
  "confirmer": "motdepasse123",
  "classe": 3,
  "langue": "fr"
}
```

✅ Réponse succès (201) :
```json
{
  "success": true,
  "message": "Bienvenue Sarah Dupont ! Compte créé avec succès 🎉",
  "user": {
    "id": "...",
    "nom": "Sarah Dupont",
    "email": "sarah@test.com",
    "classe": 3,
    "langue": "fr",
    "role": "etudiant"
  },
  "redirection": "indexSIGHT_fr.html"
}
```

❌ Email déjà utilisé (409) :
```json
{ "success": false, "message": "Un compte avec cet email existe déjà." }
```

---

### 2. Connexion

**POST** `/api/auth/connexion`
**Body** :
```json
{
  "email": "ahmed@lumilearn.com",
  "motDePasse": "123456"
}
```

✅ Réponse succès :
```json
{
  "success": true,
  "message": "Bon retour Ahmed Ben Ali ! 🌟",
  "user": { "id": "...", "nom": "Ahmed Ben Ali", "classe": 6, ... },
  "redirection": "indexSIGHT_fr.html"
}
```

> ℹ️ Un cookie de session est créé automatiquement. Postman le sauvegarde.

---

### 3. Vérifier la session active

**GET** `/api/auth/session`

✅ Si connecté :
```json
{ "success": true, "connecte": true, "user": { ... } }
```
✅ Si non connecté :
```json
{ "success": true, "connecte": false }
```

---

### 4. Voir son profil

**GET** `/api/auth/profil`
*(nécessite d'être connecté)*

✅ Réponse :
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "nom": "Ahmed Ben Ali",
    "email": "ahmed@lumilearn.com",
    "classe": 6,
    "langue": "fr",
    "role": "etudiant",
    "progression": 0,
    "createdAt": "2025-01-01T..."
  }
}
```

---

### 5. Mettre à jour son profil

**PUT** `/api/auth/profil`
**Body** :
```json
{
  "nom": "Ahmed Ben Ali Updated",
  "langue": "ar"
}
```

---

### 6. Déconnexion

**POST** `/api/auth/deconnexion`

✅ Réponse :
```json
{ "success": true, "message": "Déconnexion réussie. À bientôt ! 👋" }
```

---

## 🎧 Audio

### 7. Tous les audios

**GET** `/api/audio`

✅ Réponse :
```json
{
  "success": true,
  "total": 12,
  "audios": [
    {
      "_id": "...",
      "titre": "Planet Earth",
      "description": "Explore les merveilles de notre planète !",
      "fichier": "Audio/Earth.mp3",
      "niveau": 3,
      "langue": "fr",
      "emoji": "🌍"
    },
    ...
  ]
}
```

---

### 8. Audios pour une classe spécifique

**GET** `/api/audio/classe/3`
*(retourne niveau=3 ET niveau=0 — tous niveaux)*

---

### 9. Audios par langue

**GET** `/api/audio/langue/ar`

---

## 📝 Quiz

### 10. Sauvegarder un résultat de quiz

**POST** `/api/quiz/resultat`
*(nécessite d'être connecté)*
**Body** :
```json
{
  "matiere": "math",
  "classe": 3,
  "difficulte": "moyen",
  "score": 11,
  "total": 15
}
```

✅ Réponse :
```json
{
  "success": true,
  "message": "Résultat sauvegardé !",
  "progression": 5
}
```

---

### 11. Mes résultats de quiz

**GET** `/api/quiz/mes-resultats`
*(nécessite d'être connecté)*

---

## 📩 Contact

### 12. Envoyer un message (public)

**POST** `/api/contact`
**Body** :
```json
{
  "nom": "Sara",
  "email": "sara@test.com",
  "sujet": "Question sur les quiz",
  "message": "Bonjour, comment accéder aux quiz de classe 4 ?"
}
```

✅ Réponse :
```json
{
  "success": true,
  "message": "Merci Sara ! Votre message a bien été reçu 💌"
}
```

---

### 13. Lire tous les messages (admin seulement)

**GET** `/api/contact`
*(doit être connecté en tant qu'admin — admin@lumilearn.com / admin123)*

---

## ❌ Codes d'erreur courants

| Code | Signification |
|------|--------------|
| 400  | Données manquantes ou invalides |
| 401  | Non connecté |
| 403  | Pas les droits (admin requis) |
| 404  | Route ou ressource introuvable |
| 409  | Conflit (email déjà utilisé) |
| 500  | Erreur serveur (vérifier la console) |
