import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBarEmployee } from "../src/components/navBarEmployee";
import { HomePageEmployee } from "../src/components/homePageEmployee";
import './App.css';

function App() {
  return (
    <Router>
      <NavBarEmployee />
      <Routes>
        <Route path="/employee" element={<HomePageEmployee />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
