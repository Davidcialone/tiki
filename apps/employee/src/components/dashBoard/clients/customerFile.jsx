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
    const loadClientData = async () => {
      try {
        setLoading(true);
        // Récupérer les détails du client et ses réservations en parallèle
        const [client, clientReservations] = await Promise.all([
          fetchClientDetails(clientId),
          fetchClientReservations(clientId),
        ]);
        console.log("Client détails :", client);
        console.log("Réservations :", clientReservations);

        setClientDetails(client);
        setReservations(clientReservations);
      } catch (err) {
        setError("Une erreur est survenue lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    loadClientData();
  }, [clientId]);

  if (loading)
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-6 p-6">
        <p className="text-gray-500 text-lg text-center">Chargement des données client...</p>
      </div>
    );
  
  if (error)
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-6 p-6">
        <p className="text-red-500 text-lg text-center">{error}</p>
      </div>
    );

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
