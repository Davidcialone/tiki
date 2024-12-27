import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { AuthContext } from '../auth/authContext';

export function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    if (import.meta.env.MODE === "production") {
      API_BASE_URL = API_BASE_URL.replace(/\/$/, "");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur lors de la connexion: ${errorText}`);
      }

      const data = await response.json();

      if (data.token) {
        Cookies.set('token', data.token, { expires: 7, sameSite: 'Lax' });
        const decodedToken = jwtDecode(data.token);

        login(data.token);

        const from = location.state?.from || '/me/trips';
        navigate(from, { replace: true });
      } else {
        throw new Error("Token non reçu dans la réponse.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const formStyles = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    color: '#333',
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyles = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const errorStyles = {
    color: 'red',
    marginBottom: '10px',
  };

  const linkStyles = {
    color: '#007bff',
    textDecoration: 'none',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Connexion</h2>
      {error && <p style={errorStyles}>{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyles}
        />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyles}
        />
      </div>
      <button type="submit" style={buttonStyles}>Se connecter</button>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Si vous n'êtes pas encore inscrit,{' '}
        <a href="/inscription" style={linkStyles}>cliquez ici</a>.
      </p>
    </form>
  );
}
