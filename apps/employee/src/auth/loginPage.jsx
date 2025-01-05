import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { AuthContext } from "../auth/authContext";
import { Login } from "../api/userApi";

export function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Veuillez entrer un email et un mot de passe valides.");
      setLoading(false);
      return;
    }

    try {
      const response = await Login({ email, password });
      const token = response.token;
      const user = jwtDecode(token);

      login(token, user);
      Cookies.set("token", token, { expires: 7 });
      navigate(location.state?.from || "/");
    } catch (error) {
      setError(error.message || "Erreur lors de la connexion.");
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
          {/* Email */}
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

          {/* Mot de passe */}
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
                Afficher le mot de passe
              </label>
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className={`w-full py-3 ${
              loading ? "bg-gray-400" : "bg-green-600"
            } text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Vous n'avez pas de compte ?{" "}
          <a href="/register" className="text-green-600 hover:text-green-700 font-medium">
            Inscrivez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
}
