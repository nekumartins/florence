const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number, // index of correct option
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  topic: {
    type: String
  }
});

const quizSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [questionSchema],
  passingScore: {
    type: Number,
    default: 60 // percentage
  },
  timeLimit: {
    type: Number, // in minutes, 0 = no limit
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);
