import React, { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservedTables, setReservedTables] = useState([]);

  return (
    <ReservationContext.Provider value={{ reservedTables, setReservedTables }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => useContext(ReservationContext);
