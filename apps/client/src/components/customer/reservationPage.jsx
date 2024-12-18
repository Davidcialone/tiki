import React, { useState } from "react";
import { ReservationModal } from "../modales/reservationModal";

export function ReservationPage() {
  const [zonesOpened, setZonesOpened] = useState({
    herb: true,
    terrace: false,
    inside: true,
    gravel: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableDates, setAvailableDates] = useState(["2024-12-20", "2024-12-21"]);
  const [availableTimes, setAvailableTimes] = useState(["19:00", "20:00"]);
  const [reservationDetails, setReservationDetails] = useState(null);

  const openZones = Object.keys(zonesOpened).filter((zone) => zonesOpened[zone]);

  const handleModalSubmit = (formData) => {
    console.log("Données de réservation :", formData);
    setReservationDetails(formData);
    alert("Réservation effectuée !");
    setIsModalOpen(false);
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <h1>Réservation</h1>

      <button onClick={() => setIsModalOpen(true)} style={buttonStyle}>
        Réserver
      </button>

      {!reservationDetails ? (
        <p style={{ marginTop: "20px" }}>Aucune réservation n'a encore été effectuée.</p>
      ) : (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h2>Récapitulatif de la réservation</h2>
          <p><strong>Nom : </strong>{reservationDetails.lastName} {reservationDetails.firstName}</p>
          <p><strong>Nombre de personnes : </strong>{reservationDetails.number_of_people}</p>
          <p><strong>Téléphone : </strong>{reservationDetails.phone}</p>
          <p><strong>Email : </strong>{reservationDetails.email}</p>
          <p><strong>Date : </strong>{new Date(reservationDetails.reservation_date).toLocaleDateString()}</p>
          <p><strong>Heure : </strong>{reservationDetails.reservation_time}</p>
          {/* <p><strong>Zone choisie : </strong>{reservationDetails.zone}</p> */}
        </div>
      )}

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        zones={openZones}
        availableDates={availableDates}
        availableTimes={availableTimes}
      />
    </div>
  );
}
