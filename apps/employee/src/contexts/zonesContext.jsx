import React, { createContext, useState } from "react";

export const ZonesContext = createContext();

export const ZonesProvider = ({ children }) => {
       
   const [zones, setZones] = useState([
       { name: "Terrasse", capacity: 50, x: 200, y: 0, width: 200, height: 250, baseColor: 'lightgreen', isOpen: true, tables: [] },
       { name: "Herbe", capacity: 10, x: 0, y: 0, width: 200, height: 100, baseColor: 'lightblue', isOpen: true, tables: [] },
       { name: "Inside", capacity: 60, x: 400, y: 0, width: 300, height: 250, baseColor: 'lightyellow', isOpen: true, tables: [] },
       { name: "Gravel", capacity: 40, x: 200, y: 300, width: 200, height: 200, baseColor: 'lightcoral', isOpen: true, tables: [] },
       { name: "Terrasse 2", capacity: 30, x: 700, y: 0, width: 300, height: 200, baseColor: 'lightpink', isOpen: true, tables: [] },
       { name: "Bar", capacity: 20, x: 450, y: 300, width: 250, height: 100, baseColor: 'peachpuff', isOpen: true, tables: [] }
     ]);

    
    return (
        <ZonesContext.Provider value={{ zones, setZones }}>
        {children}
        </ZonesContext.Provider>
    );
    }