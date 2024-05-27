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

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
