import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Register } from '../api/userApi';

export function RegisterPage() {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await Register({ lastname, firstname, email, password }); // Appel à l'API
      navigate('/connexion', { replace: true }); // Redirection en cas de succès
    } catch (err) {
      setError(err.message); // Affiche l'erreur retournée par l'API
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
    color: '#fff',
  };

  const buttonStyles = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
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
    <form onSubmit={handleSignup} style={formStyles}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Inscription</h2>
      {error && <p style={errorStyles}>{error}</p>}
      <div>
        <label>Nom:</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          style={inputStyles}
        />
      </div>
      <div>
        <label>Prénom:</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          style={inputStyles}
        />
      </div>
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
      <div>
        <label>Confirmation:</label>
        <input
          type="password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          required
          style={inputStyles}
        />
      </div>
      <button type="submit" style={buttonStyles}>S'inscrire</button>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Vous avez déjà un compte ?{' '}
        <a href="/connexion" style={linkStyles}>Connectez-vous ici</a>.
      </p>
    </form>
  );
}
