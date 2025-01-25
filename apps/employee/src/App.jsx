// Core imports
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'

// Context
import { AuthProvider } from "./auth/authContext";

// Components
import AppRoutes from './routes/AppRoutes'; // Import des routes

const App = () => {
  return (
    <AuthProvider>
      {/* Le composant Router permet de gérer les routes dans l'application */}
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
