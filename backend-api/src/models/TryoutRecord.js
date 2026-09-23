const mongoose = require('mongoose');

const TryoutRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  tryoutId: { type: String, required: true },
  tryoutTitle: { type: String, required: true },
  category: { type: String, required: true }, // TPS - Penalaran Umum, Penalaran Matematika, Literasi Bahasa Indonesia, Literasi Bahasa Inggris
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  score: { type: Number, required: true }, // e.g. 780
  takenAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('TryoutRecord', TryoutRecordSchema);
