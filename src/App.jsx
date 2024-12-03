import { useState } from 'react'
import './App.css'
import { ReservationProvider } from './reservationContext'
import {RestaurantLayout} from './components/restaurantLayout'

function App() {

  return (
    <ReservationProvider>
        <RestaurantLayout/>
    </ReservationProvider>
  )

}

export default App
