import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentLogin = () => {
  const [grNumber, setGrNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { loginStudent } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginStudent(grNumber, dateOfBirth);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 className="title">Student Portal Login</h2>
        <p className="subtitle">Sign in to check attendance & results</p>
        
        {error && <div className="alert error">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>GR Number</label>
            <input 
              type="text" 
              className="input"
              value={grNumber}
              onChange={(e) => setGrNumber(e.target.value)}
              required 
              placeholder="e.g. 1205"
            />
          </div>
          
          <div className="form-group">
            <label>Date of Birth</label>
            <input 
              type="date" 
              className="input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required 
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

export default StudentLogin;
