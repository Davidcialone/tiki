import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Corrigé l'import
import Cookies from "js-cookie";
import { AuthContext } from "../auth/authContext";
import { Login } from "../api/userApi";

export function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // État pour le chargement
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Activer l'état de chargement

    // Validation côté client
    if (!email.trim() || !password.trim()) {
      setError("Veuillez entrer un email et un mot de passe valides.");
      setLoading(false);
      return;
    }

    try {
      const response = await Login({ email, password });
      console.log("Réponse de l'API:", response);
      const token = response.token;
      const user = jwtDecode(token);
      
      // Connexion réussie
      login(token, user);
      Cookies.set("token", token, { expires: 7 });
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
      setError(error.message || "Erreur lors de la connexion.");
    } finally {
      setLoading(false); // Désactiver l'état de chargement
    }
  };

  const formStyles = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    color: "#333",
  };

  const inputStyles = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  };

  const buttonStyles = {
    width: "100%",
    padding: "10px",
    backgroundColor: loading ? "#ccc" : "#007bff", // Grisé en cours de chargement
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: loading ? "not-allowed" : "pointer", // Désactiver le clic
  };

  const errorStyles = {
    color: "red",
    marginBottom: "10px",
  };

  const linkStyles = {
    color: "#007bff",
    textDecoration: "none",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Connexion</h2>
      {error && <p style={errorStyles}>{error}</p>}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyles}
          aria-label="Entrez votre email"
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyles}
          aria-label="Entrez votre mot de passe"
        />
      </div>
      <button
        type="submit"
        style={buttonStyles}
        disabled={loading} // Désactiver le bouton en cours de chargement
        aria-disabled={loading}
      >
        {loading ? "Connexion en cours..." : "Se connecter"}
      </button>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Si vous n'êtes pas encore inscrit,{" "}
        <a href="/inscription" style={linkStyles}>
          cliquez ici
        </a>
        .
      </p>
    </form>
  );
}
