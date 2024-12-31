import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchClientDetails, fetchClientReservations } from "../../api/clientApi";

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
        const client = await fetchClientDetails(clientId);
        const clientReservations = await fetchClientReservations(clientId);
        console.log("Client détails :", client);
        console.log("Réservations :", clientReservations);

        setClientDetails(client);
        setReservations(clientReservations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadClientData();
  }, [clientId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-6">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Fiche du client</h1>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Nom : </span>
            {clientDetails.firstname}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Prénom : </span>
            {clientDetails.lastname}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email : </span>
            {clientDetails ? clientDetails.email : "Chargement..."}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Téléphone : </span>
            {clientDetails ? clientDetails.phone : "Chargement..."}
          </p>
        </div>

        {/* Liste des réservations */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Réservations</h2>
          {reservations.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {reservations.map((reservation) => (
                <li key={reservation.id} className="p-4 bg-gray-100 rounded shadow">
                  <p className="text-gray-700">
                    <span className="font-semibold">Date : </span>
                    {new Date(reservation.reservation_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Heure : </span>
                    {reservation.reservation_time}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Statut : </span>
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
    </div>
  );
}
