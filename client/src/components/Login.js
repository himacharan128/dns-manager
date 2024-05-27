import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', margin: 'auto', maxWidth: '400px', backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
      <h2>Login</h2>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
        <label htmlFor="email" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '3px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
        <label htmlFor="password" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '3px' }} />
      </div>
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
    </form>
  );
};

export default Login;
