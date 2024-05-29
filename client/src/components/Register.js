import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Notification from './Notification';

const Register = () => {
  const { handleRegister } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await handleRegister(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed', error);
      setError('User already exists with these credentials. Please log in or create a new account with different credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setError('');
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Notification message={error} onClose={handleCloseNotification} />}
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', margin: 'auto', maxWidth: '400px', backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
        <h2>Register</h2>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <label htmlFor="name" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '3px' }} />
        </div>
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
    </div>
  );
};

export default Register;
