import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Quiz.css';

const Quiz = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // Config state (LearnRhythm-style)
  const [phase, setPhase] = useState('config'); // config | loading | quiz | results
  const [lessonInfo, setLessonInfo] = useState(null);
  const [config, setConfig] = useState({
    difficulty: 'medium',
    questionCount: 5,
    timerEnabled: false,
    showAnswerAfterEach: true,
    quizSource: 'seed', // seed | ai
  });

  // Quiz state
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // for instant feedback mode

  // Timer state
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // Fetch lesson info for config screen
  useEffect(() => {
    api.get(`/lessons/${lessonId}`)
      .then(res => setLessonInfo(res.data))
      .catch(() => setLessonInfo({ title: 'Maths Quiz' }));
  }, [lessonId]);

  // Timer logic
  useEffect(() => {
    if (phase !== 'quiz' || !config.timerEnabled || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, config.timerEnabled, timeLeft]);

  const handleAutoSubmit = useCallback(() => {
    // Auto-submit when timer runs out
    handleSubmit(true);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Start quiz with config
  const startQuiz = async () => {
    setPhase('loading');

    try {
      let quizData;

      if (config.quizSource === 'ai') {
        // AI-generated quiz
        const res = await api.post('/quizzes/generate', {
          lessonId,
          difficulty: config.difficulty,
          questionCount: config.questionCount,
        });
        quizData = res.data;
      } else {
        // Seed quiz — include answers if instant feedback is on
        const answerParam = config.showAnswerAfterEach ? '?withAnswers=true' : '';
        const res = await api.get(`/quizzes/lesson/${lessonId}${answerParam}`);
        quizData = res.data;
      }

      setQuiz(quizData);
      setAnswers(new Array(quizData.totalQuestions || quizData.questions.length).fill(-1));
      setCurrentQ(0);
      setFeedback(null);

      // Set timer (1.5 min per question)
      if (config.timerEnabled) {
        const totalSeconds = (quizData.totalQuestions || quizData.questions.length) * 90;
        setTimeLeft(totalSeconds);
      }

      setPhase('quiz');
    } catch (err) {
      console.error('Failed to load quiz:', err);
      alert(err.response?.data?.message || 'Failed to load quiz. Try again.');
      setPhase('config');
    }
  };

  const handleSelect = (optionIndex) => {
    if (feedback) return; // Lock selection during feedback

    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);

    // Instant feedback mode
    if (config.showAnswerAfterEach && quiz.questions[currentQ]) {
      const q = quiz.questions[currentQ];
      const isCorrect = optionIndex === q.correctAnswer;
      setFeedback({
        isCorrect,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        selected: optionIndex,
      });
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (!config.showAnswerAfterEach) {
      setFeedback(null);
      setCurrentQ(prev => Math.max(0, prev - 1));
    }
  };

  const handleSubmit = async (auto = false) => {
    if (!auto && answers.some(a => a === -1)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    clearInterval(timerRef.current);
    setSubmitting(true);

    try {
      const payload = { answers };

      // For AI-generated quizzes, include full quiz data
      if (quiz.generated) {
        payload.generatedQuiz = {
          questions: quiz.questions,
          lessonId: quiz.lessonId,
        };
      }

      const res = await api.post(`/quizzes/${quiz._id}/submit`, payload);
      setResults({
        ...res.data,
        timeTaken: config.timerEnabled ? 
          ((quiz.questions.length * 90) - timeLeft) : null,
        config: { ...config },
      });
      setPhase('results');
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      alert('Failed to submit quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  // ==================== CONFIG SCREEN ====================
  if (phase === 'config') {
    return (
      <div className="quiz-config animate-fade-in">
        <Link to={`/lessons/${lessonId}`} className="btn btn-ghost" style={{ marginBottom: 'var(--space-md)' }}>
          ← Back to Lesson
        </Link>

        <div className="config-header">
          <h1>🧠 Quiz Time</h1>
          <p className="config-lesson-name">
            {lessonInfo?.title || 'Loading...'}
          </p>
          <p className="config-subtitle">Configure your quiz before we get started</p>
        </div>

        <div className="config-section">
          <h3>How cooked do you wanna be? 🔥</h3>
          <div className="config-pills">
            {[
              { value: 'easy', label: 'Easy 😌', desc: 'Basic recall' },
              { value: 'medium', label: 'Medium 🤔', desc: 'Understanding' },
              { value: 'hard', label: 'Hard 💀', desc: 'Edge cases' },
            ].map(d => (
              <button
                key={d.value}
                className={`config-pill ${config.difficulty === d.value ? 'active' : ''}`}
                onClick={() => setConfig(c => ({ ...c, difficulty: d.value }))}
              >
                <span className="pill-label">{d.label}</span>
                <span className="pill-desc">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="config-section">
          <h3>How many questions can you handle? 📝</h3>
          <div className="config-pills">
            {[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 15, label: '15' },
              { value: 0, label: 'Surprise me 🎲' },
            ].map(q => (
              <button
                key={q.value}
                className={`config-pill pill-sm ${config.questionCount === q.value ? 'active' : ''}`}
                onClick={() => setConfig(c => ({ ...c, questionCount: q.value === 0 ? Math.floor(Math.random() * 11) + 5 : q.value }))}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        <div className="config-section">
          <h3>Timer — pressure or peace of mind? ⏱️</h3>
          <div className="config-pills">
            <button
              className={`config-pill pill-sm ${config.timerEnabled ? 'active' : ''}`}
              onClick={() => setConfig(c => ({ ...c, timerEnabled: true }))}
            >
              Timer on
            </button>
            <button
              className={`config-pill pill-sm ${!config.timerEnabled ? 'active' : ''}`}
              onClick={() => setConfig(c => ({ ...c, timerEnabled: false }))}
            >
              Timer off
            </button>
          </div>
        </div>

        <div className="config-section">
          <h3>Wanna see answers after each question? 👀</h3>
          <div className="config-pills">
            <button
              className={`config-pill pill-sm ${config.showAnswerAfterEach ? 'active' : ''}`}
              onClick={() => setConfig(c => ({ ...c, showAnswerAfterEach: true }))}
            >
              Yes please
            </button>
            <button
              className={`config-pill pill-sm ${!config.showAnswerAfterEach ? 'active' : ''}`}
              onClick={() => setConfig(c => ({ ...c, showAnswerAfterEach: false }))}
            >
              Nah, show me at the end
            </button>
          </div>
        </div>

        <div className="config-section">
          <h3>Quiz source 🎯</h3>
          <div className="config-pills">
            <button
              className={`config-pill pill-sm ${config.quizSource === 'seed' ? 'active' : ''}`}
              onClick={() => setConfig(c => ({ ...c, quizSource: 'seed' }))}
            >
              📚 Curriculum questions
            </button>
            <button
              className={`config-pill pill-sm ${config.quizSource === 'ai' ? 'active' : ''}`}
              onClick={() => setConfig(c => ({ ...c, quizSource: 'ai' }))}
            >
              🤖 AI-generated
            </button>
          </div>
        </div>

        <button className="config-start-btn" onClick={startQuiz}>
          Let's get humbled 💀
        </button>
      </div>
    );
  }

  // ==================== LOADING SCREEN ====================
  if (phase === 'loading') {
    return (
      <div className="quiz-loading">
        <div className="spinner" />
        <p>{config.quizSource === 'ai' ? '🤖 AI is cooking up your questions...' : 'Loading quiz...'}</p>
      </div>
    );
  }

  // ==================== RESULTS SCREEN ====================
  if (phase === 'results' && results) {
    const emoji = results.percentage >= 90 ? '🏆' : results.percentage >= 70 ? '🎉' : results.percentage >= 50 ? '💪' : '📚';
    const message = results.percentage >= 90 ? 'Outstanding!'
      : results.percentage >= 70 ? 'You passed! Great job!'
      : results.percentage >= 50 ? 'Almost there, keep going!'
      : 'Keep studying, you got this!';

    return (
      <div className="quiz-results animate-fade-in">
        <div className="results-hero">
          <div className="results-emoji">{emoji}</div>
          <h1>{message}</h1>
          <p className="results-sub">
            {results.passed
              ? 'You\'ve mastered this topic!'
              : `You need 70% to pass. Don't stop now!`}
          </p>
        </div>

        <div className="results-stats">
          <div className="results-stat">
            <div className="results-stat-value">{results.score}/{results.totalQuestions}</div>
            <div className="results-stat-label">Correct</div>
          </div>
          <div className="results-stat results-stat-main">
            <div className="results-stat-value results-score">{results.percentage}%</div>
            <div className="results-stat-label">Score</div>
          </div>
          <div className="results-stat">
            <div className="results-stat-value">
              {results.timeTaken ? formatTime(results.timeTaken) : '—'}
            </div>
            <div className="results-stat-label">Time</div>
          </div>
        </div>

        {/* Performance breakdown */}
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)', fontSize: '1rem' }}>📊 Performance Breakdown</h3>
          <div className="perf-bar-container">
            <div className="perf-bar">
              <div
                className="perf-bar-fill"
                style={{
                  width: `${results.percentage}%`,
                  background: results.percentage >= 70 ? 'var(--accent-gradient)' : 'linear-gradient(135deg, #ef4444, #f97316)',
                }}
              />
            </div>
            <div className="perf-labels">
              <span>0%</span>
              <span className="perf-passing">70% passing</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1rem' }}>📋 Question Review</h3>
          {results.results.map((r, i) => (
            <div key={i} className={`result-item ${r.isCorrect ? 'result-correct' : 'result-wrong'}`}>
              <div className="result-header">
                <span className="result-icon">{r.isCorrect ? '✅' : '❌'}</span>
                <strong>{r.question}</strong>
              </div>
              {!r.isCorrect && (
                <div className="result-details">
                  <p className="result-yours">Your answer: {r.options[r.selectedAnswer] || 'Unanswered'}</p>
                  <p className="result-correct-answer">Correct: {r.options[r.correctAnswer]}</p>
                </div>
              )}
              <p className="result-explanation">💡 {r.explanation}</p>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <button className="btn btn-primary btn-lg" onClick={() => { setPhase('config'); setResults(null); setQuiz(null); }}>
            🔄 Try Again
          </button>
          <Link to="/lessons" className="btn btn-secondary">📚 Back to Lessons</Link>
          <Link to="/dashboard" className="btn btn-ghost">📊 Dashboard</Link>
        </div>
      </div>
    );
  }

  // ==================== QUIZ TAKING SCREEN ====================
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No Quiz Available</h3>
        <p>There's no quiz for this lesson yet.</p>
        <Link to="/lessons" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>Back to Lessons</Link>
      </div>
    );
  }

  const question = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQ === quiz.questions.length - 1;
  const allAnswered = !answers.some(a => a === -1);

  return (
    <div className="quiz-taking animate-fade-in">
      {/* Top bar */}
      <div className="quiz-top-bar">
        <span className="quiz-progress-text">
          Question {currentQ + 1} of {quiz.questions.length}
        </span>
        {config.timerEnabled && (
          <span className={`quiz-timer ${timeLeft < 60 ? 'timer-danger' : timeLeft < 180 ? 'timer-warning' : ''}`}>
            ⏱️ {formatTime(timeLeft)}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question Card */}
      <div className="card quiz-question-card">
        <h2 className="quiz-question-text">{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((option, i) => {
            let optionClass = 'quiz-option';
            if (feedback) {
              if (i === feedback.correctAnswer) optionClass += ' option-correct';
              else if (i === feedback.selected && !feedback.isCorrect) optionClass += ' option-wrong';
            } else if (answers[currentQ] === i) {
              optionClass += ' option-selected';
            }

            return (
              <button
                key={i}
                className={optionClass}
                onClick={() => handleSelect(i)}
                disabled={!!feedback}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Instant feedback */}
        {feedback && (
          <div className={`quiz-feedback ${feedback.isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
            <div className="feedback-header">
              {feedback.isCorrect ? '✅ Correct!' : '❌ Not quite'}
            </div>
            <p className="feedback-explanation">💡 {feedback.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="quiz-nav">
        {!config.showAnswerAfterEach && (
          <button
            className="btn btn-secondary"
            onClick={prevQuestion}
            disabled={currentQ === 0}
          >
            ← Previous
          </button>
        )}
        <div style={{ flex: 1 }} />
        
        {feedback ? (
          // After feedback, show next/submit
          isLastQuestion ? (
            <button className="btn btn-primary btn-lg" onClick={() => { setFeedback(null); handleSubmit(); }} disabled={submitting}>
              {submitting ? 'Submitting...' : 'See Results 🚀'}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={nextQuestion}>
              Next →
            </button>
          )
        ) : (
          // No feedback mode
          !config.showAnswerAfterEach && (
            isLastQuestion ? (
              <button className="btn btn-primary btn-lg" onClick={() => handleSubmit()} disabled={submitting || !allAnswered}>
                {submitting ? 'Submitting...' : 'Submit Quiz 🚀'}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={nextQuestion}>
                Next →
              </button>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Quiz;
