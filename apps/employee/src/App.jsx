import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBarEmployee } from "../src/components/navBarEmployee";
import { HomePageEmployee } from "../src/components/homePageEmployee";
import { GestionReservations } from "../../employee/src/components/dashBoard/reservationsDashboard";
import './App.css';

function App() {
  return (
    <Router>
      <NavBarEmployee />
      <Routes>
        <Route path="/" element={<HomePageEmployee />} />
        <Route path="/reservations" element={<GestionReservations/>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
