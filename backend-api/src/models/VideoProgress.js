const mongoose = require('mongoose');

const VideoProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true }, // TPS, Matematika Dasar, Bahasa Indonesia, Bahasa Inggris
  durationMinutes: { type: Number, required: true },
  watchedMinutes: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  lastWatchedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('VideoProgress', VideoProgressSchema);
