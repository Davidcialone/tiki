import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBarEmployee } from "../../employee/src/components/interface/navBarEmployee";
import { ReservationsDashboard } from "./components/dashBoard/reservationsDashboard";
import { HomePageEmployee } from "../../employee/src/components/interface/homePageEmployee";
import { ClientSearch } from "../../employee/src/components/dashBoard/clients/clientSearch";
import { CustomerFile } from "../../employee/src/components/dashBoard/clients/customerFile";
import { PlanningPage } from "../../employee/src/components/dashBoard/worker/plannigPage";
import { ReservationsViews } from "../../employee/src/components/dashBoard/reservations/reservationsViews";


import { LoginPage } from "./auth/loginPage";
import { AuthProvider } from "./auth/authContext"; // Import AuthProvider
import { RegisterPage } from "./auth/registerPage"; // Import RegisterPage
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBarEmployee />
        <Routes>
          <Route path="/" element={<HomePageEmployee />} />
          <Route path="/reservations" element={<ReservationsDashboard />} />
          <Route path="/clients" element={<ClientSearch />} />
          <Route path="/clients/:clientId" element={<CustomerFile />} />
          <Route path="/dashboard" element={<ReservationsViews/>} />
          <Route path="/plannings" element={<PlanningPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
