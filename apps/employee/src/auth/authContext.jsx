import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Correction : import direct sans accolades

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Temps actuel en secondes

        if (decodedToken.exp < currentTime) {
          logout(); // Déconnexion si le token est expiré
        } else {
          setIsAuthenticated(true);
          fetchUser()
            .then((data) => setUser(data))
            .catch((error) => {
              console.error("Erreur lors de la récupération de l'utilisateur:", error);
              logout();
            });
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        logout();
      }
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    // Redirection à gérer dans un composant consommateur, pas ici
  };

  if (loading) {
    return null; // Affichez un loader si nécessaire
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
