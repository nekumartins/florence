import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get('/progress');
        setProgress(res.data);
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  const overview = progress?.overview || { totalLessons: 0, completed: 0, inProgress: 0, notStarted: 0, completionPercentage: 0 };
  const stats = progress?.stats || { totalQuizAttempts: 0, averageScore: 0 };
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (overview.completionPercentage / 100) * circumference;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>{getGreeting()}, {user?.name?.split(' ')[0]} 👋</h1>
        <p>Here's your learning overview for today</p>
      </div>

      {/* Stats Row */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="stat-card">
          <div className="stat-value">{overview.completionPercentage}%</div>
          <div className="stat-label">Course Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{overview.completed}/{overview.totalLessons}</div>
          <div className="stat-label">Lessons Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalQuizAttempts}</div>
          <div className="stat-label">Quizzes Taken</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.averageScore}%</div>
          <div className="stat-label">Average Score</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Progress Ring */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)' }}>
          <div className="progress-ring">
            <svg width="130" height="130">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              <circle className="progress-ring-bg" cx="65" cy="65" r="54" strokeWidth="8" />
              <circle
                className="progress-ring-fill"
                cx="65" cy="65" r="54"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="progress-ring-text">
              {overview.completionPercentage}<small>%</small>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1.1rem' }}>Mathematics</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>
              {overview.completed} of {overview.totalLessons} lessons completed
            </p>
            <Link to="/lessons" className="btn btn-primary">
              {overview.completed === 0 ? 'Start Learning' : 'Continue Learning'}
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.1rem' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <Link to="/lessons" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              📚 Browse Lessons
            </Link>
            <Link to="/tutor" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              🤖 Ask GALE
            </Link>
            <Link to="/progress" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              📈 View Full Progress
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {progress?.recentActivity?.length > 0 && (
        <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.1rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {progress.recentActivity.map((activity, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-sm) var(--space-md)',
                background: 'var(--bg-glass)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <span>{activity.status === 'completed' ? '✅' : '📖'}</span>
                  <span style={{ fontSize: '0.9rem' }}>{activity.lesson?.title || 'Lesson'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  {activity.bestScore > 0 && (
                    <span className={`badge ${activity.bestScore >= 70 ? 'badge-completed' : 'badge-intermediate'}`}>
                      {activity.bestScore}%
                    </span>
                  )}
                  <span className={`badge badge-${activity.status === 'completed' ? 'completed' : 'in-progress'}`}>
                    {activity.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
