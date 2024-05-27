import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    navigate('/');
  };

  const login = () => {
    navigate('/login');
  };

  const register = () => {
    navigate('/register');
  };

  return (
    <nav>
      {isAuthenticated ? (
        <button onClick={onLogout} style={{ float: 'right' }}>
          Logout
        </button>
      ) : (
        location.pathname !== '/login' && location.pathname !== '/register' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
          </div>
        )
      )}
    </nav>
  );
};

export default NavBar;
