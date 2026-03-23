import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('juyi_token');
    const savedUser = localStorage.getItem('juyi_user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      api.get('/auth/me')
        .then(res => {
          setUser(res.data);
          localStorage.setItem('juyi_user', JSON.stringify(res.data));
        })
        .catch(() => {
          localStorage.removeItem('juyi_token');
          localStorage.removeItem('juyi_user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem('juyi_token', token);
    localStorage.setItem('juyi_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem('juyi_token', token);
    localStorage.setItem('juyi_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const googleLogin = async (credential) => {
    const res = await api.post('/auth/google', { credential });
    const { token, ...userData } = res.data;
    localStorage.setItem('juyi_token', token);
    localStorage.setItem('juyi_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('juyi_token');
    localStorage.removeItem('juyi_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
