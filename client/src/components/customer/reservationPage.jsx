import React, { useState } from "react";
import { ReservationModal } from "../modales/reservationModal";


export function ReservationPage() {
  const [zonesOpened, setZonesOpened] = useState({
    herb: true,
    terrace: false,
    inside: true,
    gravel: true,
  }); // Exemple de zones ouvertes
  const [isModalOpen, setIsModalOpen] = useState(true); // Contrôle de la modale
  const [availableDates, setAvailableDates] = useState([]); // Exemple de dates disponibles
  const [availableTimes, setAvailableTimes] = useState([]); // Exemple d'horaires disponibles
  // Filtrer les zones ouvertes
  const openZones = Object.keys(zonesOpened).filter((zone) => zonesOpened[zone]);

  const handleModalSubmit = (formData) => {
    console.log("Données de réservation :", formData);
    alert("Réservation effectuée !");
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Réservation</h1>
      {/* <p>Sélectionnez les zones où vous souhaiteriez manger :</p>
      <CustomerView /> */}

      <button
        onClick={() => setIsModalOpen(true)} // Ouvrir la modale
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Réserver
      </button>

      {/* Afficher la modale */}
      <ReservationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => console.log("Submitted", data)}
          zones={openZones}
          availableDates={[availableDates]}
          availableTimes={[availableTimes]}
        />

    </div>
  );
}
