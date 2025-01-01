import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBarEmployee } from "../../employee/src/components/interface/navBarEmployee";
import { HomePageEmployee } from "../../employee/src/components/interface/homePageEmployee";
import { ReservationsDashboard } from "./components/dashBoard/reservationsDashboard";
import { ClientSearch } from "../../employee/src/components/dashBoard/clientSearch";
import { CustomerFile } from "../../employee/src/components/dashBoard/customerFile";
import { TablesDashBoard } from "../../employee/src/components/dashBoard/tablesDashBoard";
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
          <Route path="/dashboard" element={<TablesDashBoard/>} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage/>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
