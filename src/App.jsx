import { useState } from 'react'
import './App.css'
import { ReservationProvider } from './reservationContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {RestaurantLayout} from './components/restaurantLayout'
import {NavBar}  from './components/navBar'
import { HomePage } from './components/homePage';
import { ReservationPage } from './components/reservationPage';

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
        </Routes>
      </div>
    </Router>
    </ReservationProvider>
  )

}

export default App
