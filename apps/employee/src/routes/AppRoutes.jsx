import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { ROLES } from '../utils/constants';
import Navigation from '../components/common/Navigation';
import ProtectedRoute from '../auth/protectedRoute';

// Pages
import LoginPage from '../pages/auth/LoginPage';
import { RegisterPage } from '../auth/registerPage';
import HomePageEmployee from '../pages/home/HomePageEmployee';
import HomePageManager from '../pages/home/HomePageManager';
import WorkerDashboard from '../pages/dashboard/WorkerDashboard';
import ManagerDashboard from '../pages/dashboard/ManagerDashboard';
import { ClientSearch } from '../components/dashboard/clients/clientSearch';
import { CustomerFile } from '../components/dashboard/clients/customerFile';
import { ReservationsDashboard } from '../components/dashboard/reservationsDashboard';
import { PlanningPage } from '../components/dashBoard/worker/plannigPage';

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navigation />}
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />} />
        
        {/* Routes protégées */}
        <Route path="/" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            {user?.role === ROLES.MANAGER ? <HomePageManager /> : <HomePageEmployee />}
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            {user?.role === ROLES.MANAGER ? <ManagerDashboard /> : <WorkerDashboard />}
          </ProtectedRoute>
        } />

        <Route path="/reservations" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <ReservationsDashboard />
          </ProtectedRoute>
        } />

        <Route path="/clients" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <ClientSearch />
          </ProtectedRoute>
        } />

        <Route path="/clients/:clientId" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <CustomerFile />
          </ProtectedRoute>
        } />

        <Route path="/plannings" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <PlanningPage />
          </ProtectedRoute>
        } />

        {/* Routes Manager uniquement */}
        <Route path="/employees" element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]} userRole={user?.role}>
            <div>Page de gestion des employés</div>
          </ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]} userRole={user?.role}>
            <div>Page des rapports</div>
          </ProtectedRoute>
        } />

        {/* Route par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
