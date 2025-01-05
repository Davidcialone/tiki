import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Register } from '../api/userApi';

export function RegisterPage() {
  const [showPasswords, setShowPasswords] = useState(false);
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['lastname', 'firstname', 'email', 'password', 'passwordConfirm'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (missingFields.length > 0) {
      setError(`Les champs suivants sont requis : ${missingFields.join(', ')}`);
      return;
    }
  
    if (formData.password !== formData.passwordConfirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
  
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
  
    try {
      const response = await Register({
        lastname: formData.lastname.trim(),
        firstname: formData.firstname.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || '',
        password: formData.password,
      });
  
      setSuccess(true);
      setError('');
      setFormData({
        lastname: '',
        firstname: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: ''
      });
  
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Inscription</h2>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
            <p className="text-green-700">Inscription réussie ! Redirection en cours...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700 text-sm font-semibold mb-2">
              Nom
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Prénom */}
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-gray-700 text-sm font-semibold mb-2">
              Prénom
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Téléphone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Mot de passe
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Confirmation du mot de passe */}
          <div className="mb-4">
            <label htmlFor="passwordConfirm" className="block text-gray-700 text-sm font-semibold mb-2">
              Confirmer le mot de passe
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

         {/* Option pour afficher ou masquer les mots de passe */}
          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="togglePasswords"
                checked={showPasswords}
                onChange={() => setShowPasswords(!showPasswords)}
                className="mr-2"
              />
              <label htmlFor="togglePasswords" className="text-gray-700">
                Afficher les mots de passe
              </label>
            </div>
          </div>


          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Vous avez déjà un compte ?{' '}
          <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
            Connectez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
}
