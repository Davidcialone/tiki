import React, { useState } from "react";
import { ReservationModal } from "../../../../client/src/components/modales/reservationModal";
import { createReservation } from "../../api/reservationApi";
// import { mailsReservations } from "../../../../../api/app/controllers/mailsController";

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

  // Fonction de soumission du formulaire dans le modal
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
  
      const response = await createReservation(reservationData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la création de la réservation.");
      }

      const reservation = await response.json();
      setReservationDetails(reservation);

      // Envoi de l'email après la création de la réservation
      // await mailsReservations({ params: { reservationId: reservation.id } });

    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="mt-20"></div>
      <div>
        <h2>Vous pouvez effectuer votre réservation</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block bg-white text-black px-6 py-2 m-3 rounded-lg text-lg font-medium border border-[var(--primary-color)] hover:bg-black hover:text-white hover:border-white transition duration-200 z-50 relative"
        >
          Réserver
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

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
