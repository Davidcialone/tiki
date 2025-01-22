import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { AuthContext } from "../auth/authContext";
import { Login } from "../api/userApi";
import { Link } from "react-router-dom";
import { ROLES } from '../utils/constants';

export function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const loginData = await Login({ email, password });
      console.log("Login data:", loginData); // Debug
      
      if (!loginData || !loginData.token || !loginData.user) {
        throw new Error("Erreur d'authentification");
      }
      
      await login(loginData);
      
      // Rediriger en fonction du rôle
      console.log("User role:", loginData.user.role); // Debug
      
      if (loginData.user.role === ROLES.MANAGER) {
        navigate('/manager/dashboard');
      } else if (loginData.user.role === ROLES.WORKER) {
        navigate('/worker/dashboard');
      } else {
        console.error("Rôle inconnu:", loginData.user.role);
        throw new Error("Rôle utilisateur non reconnu");
      }
      
    } catch (error) {
      console.error("Erreur complète:", error);
      setError(error.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Connexion</h2>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Mot de passe
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

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
                Afficher le mot de passe
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 ${
              loading ? "bg-gray-400" : "bg-green-600"
            } text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
            disabled={loading}
            aria-label="Submit Login Form"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Vous n'avez pas de compte ?{" "}
          <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
            créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
