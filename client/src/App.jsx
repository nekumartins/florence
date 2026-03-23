import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import LessonView from './pages/LessonView';
import Quiz from './pages/Quiz';
import Tutor from './pages/Tutor';
import ProgressPage from './pages/ProgressPage';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppLayout><Dashboard /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/lessons" element={
        <ProtectedRoute>
          <AppLayout><Lessons /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/lessons/:id" element={
        <ProtectedRoute>
          <AppLayout><LessonView /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/quiz/:lessonId" element={
        <ProtectedRoute>
          <AppLayout><Quiz /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/tutor" element={
        <ProtectedRoute>
          <AppLayout><Tutor /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/progress" element={
        <ProtectedRoute>
          <AppLayout><ProgressPage /></AppLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
