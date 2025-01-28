import React, { useState } from "react";
import { ReservationModal } from "../../../../client/src/components/modales/reservationModal";
import { createReservation } from "../../api/reservationApi";
import { sendConfirmationEmail } from "../../api/mailsApi";

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
  
      // Envoi du mail avec les bonnes données
      await sendConfirmationEmail(reservationDetailsComplete);  // Utilisation correcte de reservationDetailsComplete
      setReservationDetails(reservationDetailsComplete);
    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation:", error);
      setErrorMessage(error.message);
    }
  };
  
  
  
return (
  <>
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url(/restaurant2.png)",
      }}
    >
      {/* Section de contenu principal */}
      <div className="flex justify-center items-center min-h-screen bg-opacity-60 bg-black">
        <div className="text-center text-white px-4 py-8 bg-white bg-opacity-70 rounded-lg shadow-xl w-full md:w-2/3 lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Vous pouvez effectuer votre réservation</h2>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-primary-color text-white px-8 py-3 m-3 rounded-lg text-xl font-medium border border-transparent hover:bg-white hover:text-black hover:border-[var(--primary-color)] transition duration-300 ease-in-out transform hover:scale-105 z-50 relative"
          >
            Réserver
          </button>

          {errorMessage && (
            <p className="text-red-600 mt-4">{errorMessage}</p>
          )}

          {!reservationDetails ? (
            <p className="mt-6 text-lg text-black">Aucune réservation n'a encore été effectuée.</p>
          ) : (
            <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200  text-black">
              <h3 className="text-2xl font-semibold mb-4">Récapitulatif de la réservation</h3>
              <p><strong className="font-medium">Nom : </strong>{reservationDetails.lastName || "Non spécifié"} {reservationDetails.firstName || "Non spécifié"}</p>
              <p><strong className="font-medium">Nombre de personnes : </strong>{reservationDetails.number_of_people || "Non spécifié"}</p>
              <p><strong className="font-medium">Téléphone : </strong>{reservationDetails.phone || "Non spécifié"}</p>
              <p><strong className="font-medium">Email : </strong>{reservationDetails.email || "Non spécifié"}</p>
              <p><strong className="font-medium">Date : </strong>{reservationDetails.reservation_date ? new Date(reservationDetails.reservation_date).toLocaleDateString() : "Non spécifié"}</p>
              <p><strong className="font-medium">Heure : </strong>{reservationDetails.reservation_time || "Non spécifié"}</p>
            </div>
          )}

          {/* Modal de réservation */}
          <ReservationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
            zones={openZones}
            availableDates={availableDates}
            availableTimes={availableTimes}
          />
        </div>
      </div>
    </div>
  </>
);

}
