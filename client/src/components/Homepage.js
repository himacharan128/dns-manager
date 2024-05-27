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
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '10vh' 
    }}>
      <button 
        onClick={login} 
        style={{ 
          padding: '10px 20px', 
          margin: '0 10px', 
          cursor: 'pointer', 
          backgroundColor: '#4CAF50', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px' 
        }}
      >
        Login
      </button>
      <button 
        onClick={register} 
        style={{ 
          padding: '10px 20px', 
          margin: '0 10px', 
          cursor: 'pointer', 
          backgroundColor: '#2196F3', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px' 
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Homepage;

