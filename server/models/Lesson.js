const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    default: 'Python Programming'
  },
  topic: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
    unique: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  estimatedTime: {
    type: Number, // in minutes
    default: 15
  },
  objectives: [{
    type: String
  }],
  content: {
    type: String, // markdown content
    required: true
  },
  codeExamples: [{
    title: String,
    code: String,
    explanation: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);
