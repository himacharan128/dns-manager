import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/homepage');
  };
  const login=()=>{
    navigate('/login');
  }
  const register=()=>{
    navigate('/register');
  }
  return (
    <nav>
        {isAuthenticated ? (
          <button onClick={onLogout} style={{ float: 'right' }}>
          Logout
        </button>
        ) : (
          <>
            <nav>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                <button onClick={login}>Login</button>
                <button onClick={register}>Register</button>
              </div>
            </nav>
          </>
        )}
    </nav>
  );
};

export default NavBar;
