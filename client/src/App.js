import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import './styles/styles.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={Dashboard} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
