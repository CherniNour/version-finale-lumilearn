const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Mathématiques', 'Arabe', 'Français', 'Anglais', 'Sciences', 'Étude Islamique', 'Histoire-Géographie', 'Informatique', 'Autre']
  },
  gradeLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  files: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String,  // Chemin vers le fichier dans public/uploads/
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

courseSchema.index({ gradeLevel: 1, subject: 1 });
courseSchema.index({ teacherId: 1 });

module.exports = mongoose.model('Course', courseSchema);