import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { log } from 'loglevel';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Logging in with username:', username);
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/auth/login`, {
        username,
        password,
      });

      // If using HttpOnly cookies, the token is automatically handled by the browser
      // No need to manually store it in localStorage or state

      // Call the login function from AuthContext (if needed for state management)
      login(); // Optional, depending on your AuthContext implementation

      // Redirect to the main page
      navigate('/');
    } catch (err) {
      console.error('GYATT Error logging in:', err);
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;