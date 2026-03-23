const express = require('express');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/lessons - Get all lessons (ordered)
router.get('/', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .select('-content -codeExamples')
      .sort({ order: 1 });

    // Get user progress for each lesson
    const progressRecords = await Progress.find({ userId: req.user._id });
    const progressMap = {};
    progressRecords.forEach(p => {
      progressMap[p.lessonId.toString()] = {
        status: p.status,
        bestScore: p.bestScore,
        lastAccessed: p.lastAccessed
      };
    });

    const lessonsWithProgress = lessons.map(lesson => ({
      ...lesson.toObject(),
      progress: progressMap[lesson._id.toString()] || { status: 'not_started', bestScore: 0 }
    }));

    res.json(lessonsWithProgress);
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/lessons/:id - Get single lesson with content
router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Update or create progress record
    await Progress.findOneAndUpdate(
      { userId: req.user._id, lessonId: lesson._id },
      { 
        status: 'in_progress',
        lastAccessed: Date.now()
      },
      { upsert: true, new: true }
    );

    // Get adjacent lessons for navigation
    const prevLesson = await Lesson.findOne({ order: lesson.order - 1 }).select('_id title');
    const nextLesson = await Lesson.findOne({ order: lesson.order + 1 }).select('_id title');

    res.json({
      ...lesson.toObject(),
      prevLesson,
      nextLesson
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
