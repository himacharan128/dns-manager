import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate('/login');
  }

  const register = () => {
    navigate('/register');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Homepage;

