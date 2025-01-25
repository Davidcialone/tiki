import React, { useState } from "react";
import { ReservationModal } from "../../modales/reservationModal";
import { createReservation } from "../../../api/reservationApi";

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
  const [errorMessage, setErrorMessage] = useState("");

  const openZones = Object.keys(zonesOpened).filter((zone) => zonesOpened[zone]);

    // Utilitaire : validation et formatage de l'heure
    const formatReservationTime = (time) => {
      if (time.includes(":")) {
        // Si l'heure inclut les secondes, ne garder que les minutes
        return time.split(":").slice(0, 2).join(":");
      }
      return `${time}:00`;
    };

  const handleModalSubmit = async (formData) => {
    try {
      // Formatage de l'heure avant la soumission
      const formattedTime = formatReservationTime(formData.reservation_time);
  
      // Validation stricte
      if (!/^\d{2}:\d{2}$/.test(formattedTime)) {
        throw new Error("Le format de l'heure est invalide (ex : HH:MM)");
      }
  
      const reservationData = {
        ...formData,
        reservation_time: formattedTime,
      };
  
      // Appel à createReservation
      const reservationResponse = await createReservation(reservationData);
  
      // Compléter les données manquantes avec formData
      const reservationDetailsComplete = {
        ...reservationResponse,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        places_used: reservationData.places_used,
        end_time: reservationData.end_time,
      };
  
      console.log("Détails de la réservation complétés :", reservationDetailsComplete);
      setReservationDetails(reservationDetailsComplete);
  
    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation:", error);
      setErrorMessage(error.message);
    }
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
