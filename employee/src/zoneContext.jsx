// import React, { createContext, useContext, useState } from "react";

// // Créez un contexte pour les zones ouvertes
// const ZoneContext = createContext();

// // Créez un fournisseur de contexte
// export function ZoneProvider({ children }) {
//   const [zonesOpened, setZonesOpened] = useState({
//     terrace: true,
//     herb: true,
//     inside: true,
//     gravel: true,
//   });

//   // Fonction pour basculer l'état de zone
//   const toggleZoneOpen = (zoneKey) => {
//     setZonesOpened((prevZones) => ({
//       ...prevZones,
//       [zoneKey]: !prevZones[zoneKey],
//     }));
//   };

//   return (
//     <ZoneContext.Provider value={{ zonesOpened, toggleZoneOpen }}>
//       {children}
//     </ZoneContext.Provider>
//   );
// }

// // Utilisez ce hook pour accéder au contexte dans n'importe quel composant
// export function useZones() {
//     const context = useContext(ZoneContext);
//     if (!context) {
//         throw new Error("useZones must be used within a ZoneProvider");
//     }
//   return context;
// }
