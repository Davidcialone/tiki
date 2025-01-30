// Core imports
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'

// Context
import { AuthProvider } from "./auth/authContext";
import { ZonesProvider } from "./contexts/zonesContext";


// Components
import AppRoutes from './routes/AppRoutes'; // Import des routes

const App = () => {
  return (
    <AuthProvider>
      <ZonesProvider>
      {/* Le composant Router permet de gérer les routes dans l'application */}
        <Router>
          <AppRoutes />
        </Router>
      </ZonesProvider>
    </AuthProvider>
  );
};

export default App;
