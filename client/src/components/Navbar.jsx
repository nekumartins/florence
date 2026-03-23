import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/lessons', icon: '📚', label: 'Lessons' },
    { path: '/tutor', icon: '🤖', label: 'GALE' },
    { path: '/progress', icon: '📈', label: 'Progress' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">Florence AI</span>
        </div>
      </div>

      <div className="sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="user-details">
            <span className="user-name">{user?.name || 'Student'}</span>
            <span className="user-role">{user?.role || 'student'}</span>
          </div>
        </div>
        <button className="btn-ghost logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
