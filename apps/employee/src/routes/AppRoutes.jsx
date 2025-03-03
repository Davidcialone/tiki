// Core imports
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Context and Utils
import { useAuth } from "../auth/authContext.jsx";
import { ROLES } from '../utils/constants';

// Layout Components
import Navigation from '../components/common/Navigation';
import ProtectedRoute from '../auth/protectedRoute';

// Pages
import LoginPage from '../pages/auth/LoginPage';
import { RegisterPage } from '../auth/registerPage';
import WorkerDashboard from '../pages/dashboard/WorkerDashboard';
import ManagerDashboard from '../pages/dashboard/ManagerDashboard';

// Dashboard Components
// In AppRoutes.jsx
import { ClientSearch } from '../components/dashboard/clients/clientSearch';
import {CustomerFile} from '../components/dashboard/clients/customerFile.jsx';
import {ReservationPageWorker} from '../components/dashboard/reservations/reservationPageWorker.jsx';
import {PlanningPage} from '../components/dashboard/worker/planningPage.jsx';
import {ReservationsViews} from '../components/dashboard/reservations/reservationsViews.jsx';
import { ClientDashboard } from '../components/dashboard/clients/clientDashboard.jsx';
import { EmployeeDashboard } from '../components/dashboard/employees/employeeDashboard.jsx';
import {ReportDashboard } from '../components/dashboard/reports/reportDashboard.jsx';
import {RestaurantPlan} from '../components/layout/restaurantPlan.jsx';
import {RestaurantScheduler} from '../components/layout/restaurantScheduler.jsx';


const AppRoutes = () => {  const { user, isAuthenticated } = useAuth();

  // Redirection basée sur le rôle si l'utilisateur est authentifié
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

          <Route path="/clients" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <ClientDashboard />
          </ProtectedRoute>
        } />

          <Route path="/employees" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />

         <Route path="/reservations/management" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <ReservationsViews/>
          </ProtectedRoute>
        } />

          <Route path="/reservations/plan" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <RestaurantPlan/>
          </ProtectedRoute>
        } />


        <Route path="/reports" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <ReportDashboard/>
          </ProtectedRoute>
        } />



        <Route path="/planning" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER]} userRole={user?.role}>
            <PlanningPage />
          </ProtectedRoute>
        } />

          <Route path="/settings/restaurant" element={
          <ProtectedRoute allowedRoles={[ROLES.WORKER, ROLES.MANAGER]} userRole={user?.role}>
            <RestaurantScheduler />
          </ProtectedRoute>
        } />


        {/* Fallback pour les routes non trouvées */}
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
