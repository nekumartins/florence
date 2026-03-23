const express = require('express');
const Quiz = require('../models/Quiz');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/quizzes/lesson/:lessonId - Get quiz for a lesson
router.get('/lesson/:lessonId', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ lessonId: req.params.lessonId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this lesson' });
    }

    const includeAnswers = req.query.withAnswers === 'true';

    const safeQuiz = {
      _id: quiz._id,
      title: quiz.title,
      lessonId: quiz.lessonId,
      passingScore: quiz.passingScore,
      timeLimit: quiz.timeLimit,
      totalQuestions: quiz.questions.length,
      questions: quiz.questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        topic: q.topic,
        ...(includeAnswers ? { correctAnswer: q.correctAnswer, explanation: q.explanation } : {})
      }))
    };

    res.json(safeQuiz);
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/quizzes/generate - AI-generate quiz from lesson topics
router.post('/generate', auth, async (req, res) => {
  try {
    const { lessonId, difficulty, questionCount, topics } = req.body;

    if (!lessonId) {
      return res.status(400).json({ message: 'lessonId is required' });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (!process.env.GROQ_API_KEY) {
      // Fallback to seed quiz
      const seedQuiz = await Quiz.findOne({ lessonId });
      if (seedQuiz) {
        const count = Math.min(questionCount || 5, seedQuiz.questions.length);
        let questions = [...seedQuiz.questions];
        // Shuffle and slice
        questions.sort(() => Math.random() - 0.5);
        questions = questions.slice(0, count);

        return res.json({
          _id: 'generated_' + Date.now(),
          title: `${lesson.title} - Custom Quiz`,
          lessonId: lesson._id,
          passingScore: 70,
          generated: true,
          source: 'seed',
          totalQuestions: questions.length,
          questions: questions.map(q => ({
            _id: q._id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            topic: q.topic
          }))
        });
      }
      return res.status(503).json({ message: 'AI not configured and no seed quiz available.' });
    }

    const Groq = require('groq-sdk');
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const count = Math.min(questionCount || 5, 20);
    const diff = difficulty || 'medium';
    const topicFocus = topics && topics.length > 0
      ? `Focus on these specific topics: ${topics.join(', ')}.`
      : `Cover the main concepts from the lesson.`;

    const prompt = `Generate exactly ${count} multiple-choice Mathematics questions about "${lesson.title}".

Difficulty: ${diff} (easy = basic recall, medium = understanding & application, hard = tricky edge cases & multi-step problems)
${topicFocus}

Context: This is for Nigerian students preparing for WAEC, JAMB, and university exams.

RESPOND ONLY WITH A JSON ARRAY. No markdown, no code blocks, no explanation. Just the raw JSON array.
Each element must have:
- "question": the question text
- "options": array of exactly 4 string options
- "correctAnswer": index (0-3) of the correct option
- "explanation": brief explanation showing the working/steps to get the answer

Example format:
[{"question":"What is the value of 2³?","options":["4","6","8","16"],"correctAnswer":2,"explanation":"2³ = 2 × 2 × 2 = 8"}]`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 4096,
    });

    let content = completion.choices[0]?.message?.content || '';
    
    // Parse JSON from response (handle markdown code blocks)
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    let questions;
    try {
      questions = JSON.parse(content);
    } catch (parseErr) {
      // Try to extract JSON array from the text
      const match = content.match(/\[[\s\S]*\]/);
      if (match) {
        questions = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    // Validate structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('AI returned empty or invalid quiz');
    }

    questions = questions.slice(0, count).map((q, i) => ({
      _id: `gen_${Date.now()}_${i}`,
      question: q.question,
      options: Array.isArray(q.options) ? q.options.slice(0, 4) : [],
      correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
      explanation: q.explanation || 'No explanation provided.',
    }));

    res.json({
      _id: 'generated_' + Date.now(),
      title: `${lesson.title} - ${diff.charAt(0).toUpperCase() + diff.slice(1)} Quiz`,
      lessonId: lesson._id,
      passingScore: 70,
      generated: true,
      source: 'ai',
      totalQuestions: questions.length,
      questions
    });
  } catch (error) {
    console.error('Generate quiz error:', error);
    res.status(500).json({ message: 'Failed to generate quiz. ' + (error.message || '') });
  }
});

// POST /api/quizzes/:id/submit - Submit quiz answers
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answers, generatedQuiz } = req.body;

    // Handle AI-generated quizzes (not in DB)
    if (generatedQuiz && req.params.id.startsWith('generated_')) {
      const { questions, lessonId } = generatedQuiz;
      
      if (!answers || !questions || answers.length !== questions.length) {
        return res.status(400).json({ message: 'Please answer all questions' });
      }

      let correct = 0;
      const results = questions.map((q, i) => {
        const isCorrect = answers[i] === q.correctAnswer;
        if (isCorrect) correct++;
        return {
          question: q.question,
          selectedAnswer: answers[i],
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
          options: q.options
        };
      });

      const percentage = Math.round((correct / questions.length) * 100);
      const passed = percentage >= 70;

      // Still update progress for generated quizzes
      if (lessonId) {
        await Progress.findOneAndUpdate(
          { userId: req.user._id, lessonId },
          {
            $push: {
              quizAttempts: {
                score: correct,
                totalQuestions: questions.length,
                percentage,
                answers
              }
            },
            $max: { bestScore: percentage },
            ...(passed ? { status: 'completed', completedAt: Date.now() } : {})
          },
          { upsert: true, new: true }
        );
      }

      return res.json({
        score: correct,
        totalQuestions: questions.length,
        percentage,
        passed,
        passingScore: 70,
        results,
        attempts: 1
      });
    }

    // Handle seed quizzes (in DB)
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (!answers || answers.length !== quiz.questions.length) {
      return res.status(400).json({ message: 'Please answer all questions' });
    }

    let correct = 0;
    const results = quiz.questions.map((q, i) => {
      const isCorrect = answers[i] === q.correctAnswer;
      if (isCorrect) correct++;
      return {
        question: q.question,
        selectedAnswer: answers[i],
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        options: q.options
      };
    });

    const percentage = Math.round((correct / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user._id, lessonId: quiz.lessonId },
      {
        $push: {
          quizAttempts: {
            quizId: quiz._id,
            score: correct,
            totalQuestions: quiz.questions.length,
            percentage,
            answers
          }
        },
        $max: { bestScore: percentage },
        ...(passed ? { status: 'completed', completedAt: Date.now() } : {})
      },
      { upsert: true, new: true }
    );

    res.json({
      score: correct,
      totalQuestions: quiz.questions.length,
      percentage,
      passed,
      passingScore: quiz.passingScore,
      results,
      bestScore: progress.bestScore,
      attempts: progress.quizAttempts.length
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
