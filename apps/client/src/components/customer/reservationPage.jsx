import React, { useState } from "react";
import { ReservationModal } from "../../../../client/src/components/modales/reservationModal";
import { createReservation } from "../../api/reservationApi";
import { sendReservationMail } from "../../api/mailsApi";

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

  // Utilitaire : validation et formatage de la date
  const formatReservationDate = (date) => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    return date;
  };

  // Utilitaire : validation et formatage de l'heure
  const formatReservationTime = (time) => {
    if (time.includes(":")) {
      return time.length === 5 ? `${time}:00` : time; // Ajouter les secondes si manquantes
    }
    return `${time}:00`;
  };

  // Fonction de soumission du formulaire dans le modal
  const handleModalSubmit = async (formData) => {
    try {
      // S'assurer que la date est au bon format
      if (!(formData.reservation_date instanceof Date) && !formData.reservation_date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        throw new Error("Le format de la date est invalide");
      }
  
      // Créer l'objet de réservation
      const reservationData = {
        ...formData,
        reservation_date: formData.reservation_date instanceof Date 
          ? formData.reservation_date.toISOString().split('T')[0]
          : formData.reservation_date,
        reservation_time: formData.reservation_time // Déjà au format HH:MM
      };
  
      const response = await createReservation(reservationData);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la création de la réservation.");
      }
  
      const data = await response.json();
      setReservationDetails(data);
      setIsModalOpen(false);
      setErrorMessage("");
  
      await sendReservationMail(data.id);
      console.log("Email de confirmation envoyé avec succès pour la réservation:", data.id);
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
            {/* <p><strong>Zone choisie : </strong>{reservationDetails.zone || "Non spécifiée"}</p> */}
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
