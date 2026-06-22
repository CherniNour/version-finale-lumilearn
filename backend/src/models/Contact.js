// ─────────────────────────────────────────────────────────────
// COLLECTION : contacts
// Messages envoyés via le formulaire contact.html
// ─────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    nom:     { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true },
    sujet:   { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    // 'nouveau' → lu par admin → 'lu' → répondu → 'repondu'
    statut:  { type: String, enum: ['nouveau', 'lu', 'repondu'], default: 'nouveau' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);