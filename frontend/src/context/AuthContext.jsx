import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.data);
        } catch (error) {
          console.error('Failed to load user', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const loginAdminTeacher = async (email, password, role) => {
    const res = await api.post('/auth/staff-login', { email, password, role });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.data);
    return res.data;
  };

  const loginStudent = async (grNumber, dateOfBirth) => {
    const res = await api.post('/auth/student-login', { grNumber, dateOfBirth });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginAdminTeacher, loginStudent, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
