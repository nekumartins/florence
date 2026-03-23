import { useState, useEffect } from 'react';
import api from '../utils/api';

const ProgressPage = () => {
  const [progress, setProgress] = useState(null);
  const [strengths, setStrengths] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, strengthsRes] = await Promise.all([
          api.get('/progress'),
          api.get('/progress/strengths')
        ]);
        setProgress(progressRes.data);
        setStrengths(strengthsRes.data);
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-container"><div className="spinner" /></div>;
  }

  const overview = progress?.overview || {};
  const stats = progress?.stats || {};

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Your Progress 📈</h1>
        <p>Track your learning journey through the Mathematics curriculum</p>
      </div>

      {/* Overview Stats */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="stat-card">
          <div className="stat-value">{overview.completionPercentage || 0}%</div>
          <div className="stat-label">Overall Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{overview.completed || 0}</div>
          <div className="stat-label">Lessons Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalQuizAttempts || 0}</div>
          <div className="stat-label">Quiz Attempts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.averageScore || 0}%</div>
          <div className="stat-label">Average Score</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Strengths */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.1rem' }}>💪 Strengths</h3>
          {strengths?.strengths?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {strengths.strengths.map((s, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-sm) var(--space-md)',
                  background: 'rgba(16, 185, 129, 0.05)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(16, 185, 129, 0.1)'
                }}>
                  <span style={{ fontSize: '0.9rem' }}>{s.topic}</span>
                  <span className="badge badge-completed">{s.averageScore}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Complete some quizzes to discover your strengths!
            </p>
          )}
        </div>

        {/* Weaknesses */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.1rem' }}>🎯 Areas to Improve</h3>
          {strengths?.weaknesses?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {strengths.weaknesses.map((w, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-sm) var(--space-md)',
                  background: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(245, 158, 11, 0.1)'
                }}>
                  <span style={{ fontSize: '0.9rem' }}>{w.topic}</span>
                  <span className="badge badge-advanced">{w.averageScore}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No weak areas identified yet. Keep up the great work! 🎉
            </p>
          )}
        </div>
      </div>

      {/* Lesson-by-Lesson Progress */}
      <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.1rem' }}>📚 Lesson Progress</h3>
        {progress?.progressRecords?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {progress.progressRecords
              .sort((a, b) => (a.lesson?.order || 0) - (b.lesson?.order || 0))
              .map((record, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-sm) var(--space-md)',
                background: 'var(--bg-glass)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <span>{record.status === 'completed' ? '✅' : '📖'}</span>
                  <span style={{ fontSize: '0.9rem' }}>{record.lesson?.title || 'Unknown'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  {record.bestScore > 0 && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Best: {record.bestScore}%
                    </span>
                  )}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {record.attempts} attempt{record.attempts !== 1 ? 's' : ''}
                  </span>
                  <span className={`badge badge-${record.status === 'completed' ? 'completed' : 'in-progress'}`}>
                    {record.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ padding: 'var(--space-xl)' }}>
            <div className="empty-icon">📊</div>
            <h3>No Progress Yet</h3>
            <p>Start a lesson to begin tracking your progress!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
