import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClients, fetchClientReservations } from "../../../api/clientApi";
import { AtSign , Users, Phone, SquareUser, Calendar, Clock, Bookmark } from 'lucide-react';


export function CustomerFile() {
  const { clientId } = useParams();
  const [clientDetails, setClientDetails] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    console.log("CustomerFile component mounted.");
    console.log("Received clientId from URL:", clientId);

    const loadClientData = async () => {
      try {
        if (!hasFetchedData) {
          setLoading(true);
          setError(null); // Réinitialiser les erreurs précédentes
          console.log("Fetching client details and reservations...");

          const [clientResponse, reservationsResponse] = await Promise.all([
            getClients(clientId),
            fetchClientReservations(clientId),
          ]);

          console.log("Client details fetched:", clientResponse);
          console.log("Client reservations fetched:", reservationsResponse);

          if (clientResponse && Object.keys(clientResponse).length > 0) {
            setClientDetails(clientResponse);
          } else {
            throw new Error("Détails du client non trouvés");
          }

          // Assurez-vous d'extraire correctement les réservations
          if (reservationsResponse && reservationsResponse.data && Array.isArray(reservationsResponse.data)) {
            setReservations(reservationsResponse.data); // Extraction de la propriété data
          } else {
            console.log("Aucune réservation trouvée pour ce client");
          }

          setHasFetchedData(true);
        }
      } catch (err) {
        console.error("Error during data fetching:", err);
        setError(err.message || "Une erreur est survenue lors de la récupération des données.");
      } finally {
        console.log("Finished fetching client data.");
        setLoading(false);
      }
    };

    if (clientId) {
      loadClientData();
    }
  }, [clientId, hasFetchedData]);

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
    <div className= "mt-16">
    <div className="max-w-4xl mx-auto bg-slate-300 shadow-2xl rounded-2xl overflow-hidden border border-gray-300 mt-6 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Fiche du Client</h1>
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 shadow-md hover:shadow-xl transition-all duration-300 bg-white p-6 rounded-lg">
        
          <div className="flex items-center space-x-6">
            <SquareUser className="text-gray-700 font-medium text-lg">Nom Prénom :</SquareUser>
            <span className="text-gray-800 bg-gray-200 p-4 rounded-xl shadow-sm">{clientDetails.lastname} {clientDetails.firstname}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <AtSign className="text-gray-700 font-medium text-lg">Email :</AtSign>
            <span className="text-gray-800 bg-gray-200 p-4 rounded-xl shadow-sm">{clientDetails.email}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Phone className="text-gray-700 font-medium text-lg">Téléphone :</Phone>
            <span className="text-gray-800 bg-gray-200 p-4 rounded-xl shadow-sm">{clientDetails.phone}</span>
          </div>
        </div>
      </div>
      
      {/* Liste des réservations */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Réservations</h2>
  {reservations.length > 0 ? (
    <ul className="space-y-6">
      {reservations.map((reservation) => (
        <li
          key={reservation.id}
          className="p-6 bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center text-gray-800">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              {new Date(reservation.reservation_date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-800">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              {reservation.reservation_time}
            </div>
            <div className="flex items-center text-gray-800">
              <Users className="w-5 h-5 text-gray-500 mr-2" />
              {reservation.number_of_people}
            </div>
            <div className="flex items-center text-gray-800">
              <Bookmark className="w-5 h-5 text-gray-500 mr-2" />
              {reservation.status || "Non défini"}
            </div>
          </div>
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
