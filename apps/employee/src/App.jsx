import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBarEmployee } from "../../employee/src/components/interface/navBarEmployee";
import { HomePageEmployee } from "../../employee/src/components/interface/homePageEmployee";
import { GestionReservations } from "../../employee/src/components/dashBoard/reservationsDashboard";
import { ClientSearch } from "../../employee/src/components/dashBoard/clientSearch";
import {CustomerFile} from "../../employee/src/components/dashBoard/customerFile";
import './App.css';

function App() {
  return (
    <Router>
      <NavBarEmployee />
      <Routes>
        <Route path="/" element={<HomePageEmployee />} />
        <Route path="/reservations" element={<GestionReservations/>} />
        <Route path="/clients" element={<ClientSearch/>} />
        <Route path="/clients/:clientId" element={<CustomerFile/>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
