const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  answers: [Number], // user's selected option indices
  attemptedAt: { type: Date, default: Date.now }
});

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  quizAttempts: [quizAttemptSchema],
  bestScore: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
}, {
  timestamps: true
});

// Compound index for unique user-lesson pair
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
