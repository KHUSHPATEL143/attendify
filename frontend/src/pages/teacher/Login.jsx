import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { loginAdminTeacher } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginAdminTeacher(email, password, 'teacher');
      navigate('/teacher/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 className="title">Teacher Portal Login</h2>
        <p className="subtitle">Sign in to mark attendance & manage tests</p>
        
        {error && <div className="alert error">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Teacher Email</label>
            <input 
              type="email" 
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="teacher@attendify.com"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="card-footer">
          <button className="button button-outline" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
