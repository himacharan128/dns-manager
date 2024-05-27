import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (email, password) => {
    const response = await login(email, password);
    localStorage.setItem('token', response.token);
    setIsAuthenticated(true);
  };

  const handleRegister = async (name, email, password) => {
    const response = await register(name, email, password);
    localStorage.setItem('token', response.token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export default AuthProvider;
