import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/authContext'; // AuthProvider est maintenant en dehors de App
import { ROLES } from './utils/constants';

import Navigation from './components/common/Navigation';
import ProtectedRoute from './auth/protectedRoute';

import LoginPage from './pages/auth/LoginPage';
import { RegisterPage } from './auth/registerPage';
import WorkerDashboard from './pages/dashboard/WorkerDashboard';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';

import { ClientSearch } from './components/dashboard/clients/clientSearch';
import { CustomerFile } from './components/dashboard/clients/customerFile';
import { ReservationPageWorker } from './components/dashboard/reservations/reservationPageWorker';
import { PlanningPage } from './components/dashboard/worker/planningPage';
import { ReservationsViews } from './components/dashboard/reservations/reservationsViews';

import './App.css';

const App = () => {
  return (
    <AuthProvider>  {/* AuthProvider est le parent maintenant */}
      <Router>
        <AppRoutes /> {/* Utilisation des routes dans un composant dédié */}
      </Router>
    </AuthProvider>
  );
};

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth(); // Déplacez l'utilisation de `useAuth` ici

  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/login';
    return user?.role === ROLES.MANAGER ? '/manager/dashboard' : '/worker/dashboard';
  };

  return (
    <>
      {isAuthenticated && <Navigation />}
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={getDefaultRoute()} replace />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to={getDefaultRoute()} replace />} />
        
        {/* Route racine avec redirection */}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

        {/* Routes du Manager */}
        <Route path="/manager/dashboard" element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]} userRole={user?.role}>
            <ManagerDashboard />
          </ProtectedRoute>
        } />

        {/* Routes du Worker */}
        <Route path="/worker/dashboard" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER]} userRole={user?.role}>
            <WorkerDashboard />
          </ProtectedRoute>
        } />

        {/* Autres routes protégées */}
        <Route path="/clients/search" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <ClientSearch />
          </ProtectedRoute>
        } />

        <Route path="/clients/:clientId" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <CustomerFile />
          </ProtectedRoute>
        } />

        <Route path="/reservations" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <ReservationPageWorker />
          </ProtectedRoute>
        } />

        <Route path="/reservations/management" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <ReservationsViews />
          </ProtectedRoute>
        } />

        <Route path="/planning" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER]} userRole={user?.role}>
            <PlanningPage />
          </ProtectedRoute>
        } />

        {/* Fallback pour les routes non trouvées */}
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
};

export default App;
