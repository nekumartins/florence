import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import api from '../utils/api';

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/lessons/${id}`);
        setLesson(res.data);
      } catch (err) {
        console.error('Failed to fetch lesson:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  const handleMarkComplete = async () => {
    try {
      await api.post(`/progress/lesson/${id}`, { status: 'completed' });
      // Navigate to quiz
      navigate(`/quiz/${id}`);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner" /></div>;
  }

  if (!lesson) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>Lesson Not Found</h3>
        <p>This lesson doesn't exist or has been removed.</p>
        <Link to="/lessons" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>Back to Lessons</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-lg)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <Link to="/lessons" style={{ color: 'var(--text-muted)' }}>Lessons</Link>
        <span>›</span>
        <span style={{ color: 'var(--text-secondary)' }}>Lesson {lesson.order}</span>
      </div>

      {/* Lesson Header */}
      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
          <span className={`badge badge-${lesson.difficulty.toLowerCase()}`}>{lesson.difficulty}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>⏱ {lesson.estimatedTime} min</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--space-sm)' }}>{lesson.title}</h1>
        
        {lesson.objectives?.length > 0 && (
          <div style={{ marginTop: 'var(--space-md)' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Learning Objectives
            </h4>
            <ul style={{ paddingLeft: 'var(--space-lg)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {lesson.objectives.map((obj, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Lesson Content */}
      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="markdown-content">
          <Markdown>{lesson.content}</Markdown>
        </div>
      </div>

      {/* Code Examples */}
      {lesson.codeExamples?.length > 0 && (
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)', fontSize: '1.1rem' }}>💻 Code Examples</h3>
          {lesson.codeExamples.map((example, i) => (
            <div key={i} style={{ marginBottom: 'var(--space-lg)' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-sm)', color: 'var(--accent-primary)' }}>{example.title}</h4>
              <pre style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
                overflow: 'auto'
              }}>
                <code style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.85rem', color: '#e2e8f0' }}>
                  {example.code}
                </code>
              </pre>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 'var(--space-sm)' }}>{example.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'var(--space-md)',
        flexWrap: 'wrap'
      }}>
        {lesson.prevLesson ? (
          <Link to={`/lessons/${lesson.prevLesson._id}`} className="btn btn-secondary">
            ← {lesson.prevLesson.title}
          </Link>
        ) : <div />}

        <button onClick={handleMarkComplete} className="btn btn-primary btn-lg">
          Take Quiz →
        </button>

        {lesson.nextLesson ? (
          <Link to={`/lessons/${lesson.nextLesson._id}`} className="btn btn-secondary">
            {lesson.nextLesson.title} →
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

export default LessonView;
