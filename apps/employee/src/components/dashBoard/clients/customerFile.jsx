import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchClientDetails, fetchClientReservations } from "../../../api/clientApi";

export function CustomerFile() {
  const { clientId } = useParams();
  const [clientDetails, setClientDetails] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("CustomerFile component mounted.");
    console.log("Received clientId from URL:", clientId);
  
    const loadClientData = async () => {
      try {
        setLoading(true);
        setError(null); // Réinitialiser les erreurs précédentes
        console.log("Fetching client details and reservations...");
  
        const [clientResponse, reservationsResponse] = await Promise.all([
          fetchClientDetails(clientId),
          fetchClientReservations(clientId),
        ]);
  
        console.log("Client details fetched:", clientResponse);
        console.log("Client reservations fetched:", reservationsResponse);
  
        // Vérification plus précise des réponses
        if (clientResponse && Object.keys(clientResponse).length > 0) {
          setClientDetails(clientResponse);
        } else {
          throw new Error("Détails du client non trouvés");
        }
  
        // Vérification que reservationsResponse est un tableau
        if (Array.isArray(reservationsResponse)) {
          setReservations(reservationsResponse);
        } else {
          setReservations([]); // Tableau vide si pas de réservations
          console.log("Aucune réservation trouvée pour ce client");
        }
  
      } catch (err) {
        console.error("Error during data fetching:", err);
        setError(err.message || "Une erreur est survenue lors de la récupération des données.");
      } finally {
        console.log("Finished fetching client data.");
        setLoading(false);
      }
    };
  
    if (clientId) { // Vérification que clientId existe
      loadClientData();
    }
  }, [clientId]);
  if (loading) {
    console.log("Loading state active, showing loader...");
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-6 p-6">
        <p className="text-gray-500 text-lg text-center">Chargement des données client...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error state active, showing error message:", error);
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-6 p-6">
        <p className="text-red-500 text-lg text-center">{error}</p>
      </div>
    );
  }

  console.log("Rendering client details and reservations...");
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Fiche du client</h1>
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-x-4">
          <p className="font-semibold text-gray-700">Nom :</p>
          <p className="text-gray-700">{clientDetails.firstname}</p>

          <p className="font-semibold text-gray-700">Prénom :</p>
          <p className="text-gray-700">{clientDetails.lastname}</p>

          <p className="font-semibold text-gray-700">Email :</p>
          <p className="text-gray-700">{clientDetails.email}</p>

          <p className="font-semibold text-gray-700">Téléphone :</p>
          <p className="text-gray-700">{clientDetails.phone}</p>
        </div>
      </div>

      {/* Liste des réservations */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Réservations</h2>
        {reservations.length > 0 ? (
          <ul className="space-y-4">
            {reservations.map((reservation) => (
              <li key={reservation.id} className="p-4 bg-gray-100 rounded-lg shadow">
                <p className="text-gray-700">
                  <span className="font-semibold">Date :</span>{" "}
                  {new Date(reservation.reservation_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Heure :</span>{" "}
                  {reservation.reservation_time}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Statut :</span>{" "}
                  {reservation.status || "Non défini"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucune réservation trouvée.</p>
        )}
      </div>
    </div>
  );
}
