import { useState } from 'react'
import './App.css'
import { ReservationProvider } from './reservationContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBarClient } from './components/interface/navBarClient';
import { HomePageClient } from './components/interface/homePageClient';
import { ReservationPage } from './components/customer/reservationPage';
import { MenuDisplay } from './components/interface/menuDisplay';
import { Contact } from './components/interface/contact';
import { Location } from './components/interface/localisation';
import { OpeningView } from './components/interface/openingView';



function App() {

  return (
    <ReservationProvider>
         <Router> {/* Wrap the entire app in Router */}
      <div className="App">
        <NavBarClient /> {/* Navigation Bar */}
        <Routes> {/* Define the Routes */}
          <Route path="/" element={<HomePageClient />} /> {/* Home Page route */}
          <Route path="/reservations" element={<ReservationPage />} /> {/* Reservation Page route */}
          <Route path="/menus" element={<MenuDisplay />} /> {/* Restaurant Layout route */}
          <Route path="/opening" element={<OpeningView />} /> {/* Opening route */}
          <Route path="/location" element={<Location />} /> {/* Location route */}
          <Route path="/contact" element={<Contact />} /> {/* Contact route */}
          <Route path="*" element={<h1>404 Not Found</h1>} /> {/* 404 Not Found route */}
        </Routes>
      </div>
    </Router>
    </ReservationProvider>
  )

}

export default App
