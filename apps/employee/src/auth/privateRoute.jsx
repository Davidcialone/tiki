import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NavBarEmployee } from "../components/interface/navBarEmployee";
import { ReservationsDashboard } from "../components/dashBoard/reservationsDashboard";
import { HomePageEmployee } from "../components/interface/homePageEmployee";
import { ClientSearch } from "../components/dashBoard/clients/clientSearch";
import { CustomerFile } from "../components/dashBoard/clients/customerFile";
import { PlanningPage } from "../components/dashBoard/worker/plannigPage";
import { ReservationsViews } from "../components/dashBoard/reservations/reservationsViews";
import { SearchDashboard } from "../components/dashBoard/serachDashboard";
import { HomePageManager } from "../components/interface/homePageManager";
import { LoginPage } from "./loginPage";
import { AuthProvider, useAuth} from "./authContext"; // Import AuthProvider
import { RegisterPage } from "./registerPage"; // Import RegisterPage
import '../App.css';

// Private Route Component - Redirects if not authenticated
export const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBarEmployee />
        <Routes>
          <Route path="/" element={<HomePageManager />} />
          <Route path="/home" element={<HomePageEmployee />} />

          {/* Protected Routes */}
          <Route path="/reservations" element={<PrivateRoute><ReservationsDashboard /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><SearchDashboard /></PrivateRoute>} />
          <Route path="/clients" element={<PrivateRoute><ClientSearch /></PrivateRoute>} />
          <Route path="/clients/:clientId" element={<PrivateRoute><CustomerFile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><ReservationsViews /></PrivateRoute>} />
          <Route path="/plannings" element={<PrivateRoute><PlanningPage /></PrivateRoute>} />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Catch-all Route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
