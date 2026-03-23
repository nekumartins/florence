import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get('/lessons');
        setLessons(res.data);
      } catch (err) {
        console.error('Failed to fetch lessons:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  if (loading) {
    return <div className="loading-container"><div className="spinner" /></div>;
  }

  const getDifficultyClass = (diff) => {
    if (diff === 'Beginner') return 'badge-beginner';
    if (diff === 'Intermediate') return 'badge-intermediate';
    return 'badge-advanced';
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return '✅';
    if (status === 'in_progress') return '📖';
    return '🔒';
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Mathematics Curriculum 📊</h1>
        <p>10 lessons • Beginner to Advanced • Nigerian Curriculum Aligned</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {lessons.map((lesson, index) => (
          <Link
            key={lesson._id}
            to={`/lessons/${lesson._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-lg)',
                animationDelay: `${index * 0.05}s`,
                cursor: 'pointer'
              }}
            >
              {/* Lesson Number */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: lesson.progress?.status === 'completed'
                  ? 'var(--accent-gradient)'
                  : 'var(--bg-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.1rem',
                flexShrink: 0,
                border: lesson.progress?.status === 'in_progress'
                  ? '2px solid var(--accent-primary)'
                  : '1px solid var(--border-color)',
              }}>
                {lesson.progress?.status === 'completed' ? '✓' : lesson.order}
              </div>

              {/* Lesson Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>
                  {lesson.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                  <span className={`badge ${getDifficultyClass(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    ⏱ {lesson.estimatedTime} min
                  </span>
                  {lesson.progress?.bestScore > 0 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      🏆 Best: {lesson.progress.bestScore}%
                    </span>
                  )}
                </div>
              </div>

              {/* Status */}
              <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>
                {getStatusIcon(lesson.progress?.status)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
