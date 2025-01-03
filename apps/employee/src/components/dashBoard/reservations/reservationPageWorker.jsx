import React, { useState } from "react";
import { ReservationModal } from "../../modales/reservationModal";

export function ReservationPageWorker() {
  const [zonesOpened, setZonesOpened] = useState({
    herb: true,
    terrace: false,
    inside: true,
    gravel: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // L'état de la modale
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

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Effectuer une réservation</h2>

        {/* Le bouton "Réserver" ouvre la modale */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block bg-white text-black px-6 py-2 m-3 rounded-lg text-lg font-medium border border-[var(--primary-color)] hover:bg-black hover:text-white hover:border-white transition duration-200 z-50 relative"
        >
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
          </div>
        )}

        {/* La modale s'ouvre dès que isModalOpen est true */}
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          zones={openZones}
          availableDates={availableDates}
          availableTimes={availableTimes}
        />
      </div>
    </>
  );
}
