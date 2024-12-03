import { useState } from 'react'
import './App.css'
import { ReservationProvider } from './reservationContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {RestaurantLayout} from './components/owner/layout/restaurantLayout'
import {NavBar}  from './components/interface/navBar'
import { HomePage } from './components/interface/homePage';
import { ReservationPage } from './components/client/reservationPage';
import { DashBoard } from './components/owner/layout/dashBoard/dashBoard';


function App() {

  return (
    <ReservationProvider>
         <Router> {/* Wrap the entire app in Router */}
      <div className="App">
        <NavBar /> {/* Navigation Bar */}
        <Routes> {/* Define the Routes */}
          <Route path="/" element={<HomePage />} /> {/* Home Page route */}
          <Route path="/restaurant" element={<RestaurantLayout />} /> {/* Restaurant Layout route */}
          <Route path="/reservation" element={<ReservationPage />} /> {/* Reservation Page route */}
          <Route path="/gestion" element={<DashBoard/>} /> {/* Tableau de bord */}
          <Route path="/restaurantLayout" element={<RestaurantLayout />} /> {/* Restaurant Layout route */}
          <Route path="*" element={<h1>404 Not Found</h1>} /> {/* 404 Not Found route */}
        </Routes>
      </div>
    </Router>
    </ReservationProvider>
  )

}

export default App
