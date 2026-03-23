const express = require('express');
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/progress - Get full progress dashboard data
router.get('/', auth, async (req, res) => {
  try {
    const totalLessons = await Lesson.countDocuments();
    const progressRecords = await Progress.find({ userId: req.user._id })
      .populate('lessonId', 'title topic order difficulty');

    const completed = progressRecords.filter(p => p.status === 'completed').length;
    const inProgress = progressRecords.filter(p => p.status === 'in_progress').length;
    
    // Calculate overall stats
    const totalQuizAttempts = progressRecords.reduce((sum, p) => sum + p.quizAttempts.length, 0);
    const avgScore = progressRecords.length > 0
      ? Math.round(progressRecords.reduce((sum, p) => sum + p.bestScore, 0) / progressRecords.filter(p => p.bestScore > 0).length) || 0
      : 0;
    const totalTimeSpent = progressRecords.reduce((sum, p) => sum + p.timeSpent, 0);

    // Recent activity (last 5)
    const recentActivity = progressRecords
      .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
      .slice(0, 5)
      .map(p => ({
        lesson: p.lessonId,
        status: p.status,
        bestScore: p.bestScore,
        lastAccessed: p.lastAccessed
      }));

    res.json({
      overview: {
        totalLessons,
        completed,
        inProgress,
        notStarted: totalLessons - completed - inProgress,
        completionPercentage: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0
      },
      stats: {
        totalQuizAttempts,
        averageScore: avgScore,
        totalTimeSpent
      },
      recentActivity,
      progressRecords: progressRecords.map(p => ({
        lesson: p.lessonId,
        status: p.status,
        bestScore: p.bestScore,
        attempts: p.quizAttempts.length,
        lastAccessed: p.lastAccessed
      }))
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/progress/strengths - Strengths/weaknesses analysis
router.get('/strengths', auth, async (req, res) => {
  try {
    const progressRecords = await Progress.find({ userId: req.user._id })
      .populate('lessonId', 'title topic difficulty');

    const topicScores = {};
    progressRecords.forEach(p => {
      if (p.lessonId && p.bestScore > 0) {
        const topic = p.lessonId.topic;
        if (!topicScores[topic]) {
          topicScores[topic] = { scores: [], topic };
        }
        topicScores[topic].scores.push(p.bestScore);
      }
    });

    const analysis = Object.values(topicScores).map(t => ({
      topic: t.topic,
      averageScore: Math.round(t.scores.reduce((a, b) => a + b, 0) / t.scores.length),
      attempts: t.scores.length
    })).sort((a, b) => b.averageScore - a.averageScore);

    const strengths = analysis.filter(a => a.averageScore >= 70);
    const weaknesses = analysis.filter(a => a.averageScore < 70);

    res.json({ strengths, weaknesses, allTopics: analysis });
  } catch (error) {
    console.error('Get strengths error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/progress/lesson/:lessonId - Mark lesson as completed
router.post('/lesson/:lessonId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const update = {
      status: status || 'in_progress',
      lastAccessed: Date.now()
    };
    if (status === 'completed') {
      update.completedAt = Date.now();
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user._id, lessonId: req.params.lessonId },
      update,
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
