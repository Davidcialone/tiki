import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReservationsbyDate } from "../../api/reservationApi";

export function TablesDashBoard() {
  const [dailyReservations, setDailyReservations] = useState([]);
  const [totalCovers, setTotalCovers] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalTables, setTotalTables] = useState(0); // Variable pour stocker le nombre total de tables
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Date par défaut: aujourd'hui
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true); // Début du chargement
      try {
        const reservations = await getReservationsbyDate(selectedDate);
        console.log("Réservations récupérées:", reservations);  // Vérifier les données reçues
        setDailyReservations(reservations);
        setTotalReservations(reservations.length);
        setTotalCovers(reservations.reduce((total, reservation) => total + reservation.number_of_people, 0));
  
        // Calcul du nombre de tables en fonction de places_used
      const totalTablesCount = reservations.reduce((total, reservation) => {
  // Assurez-vous que places_used est un nombre valide
  const placesUsed = reservation.places_used;
  
  if (typeof placesUsed === 'number' && !isNaN(placesUsed)) {
    return total + placesUsed;
  }

  console.warn("places_used invalide ou manquant pour la réservation ID:", reservation.id);
  return total; // Si places_used est invalide, ne pas l'ajouter au total
}, 0);

  
        setTotalTables(totalTablesCount);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
  
    loadDashboardData();
  }, [selectedDate]);
  
  

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tableau de bord - Gestion des Réservations</h1>
      <p className="mt-2">Vous pouvez gérer les réservations et les tables de votre restaurant à partir de cette page.</p>

      <div className="mt-6 flex flex-col md:flex-row md:space-x-8">
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
          <h3 className="font-semibold text-lg">Sélectionner la date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2 mt-2 rounded-md w-full"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
          <h3 className="font-semibold text-lg">Réservations du jour</h3>
          <p className="text-gray-700 mt-2">{totalReservations} réservations</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
          <h3 className="font-semibold text-lg">Nombre de couverts</h3>
          <p className="text-gray-700 mt-2">{totalCovers} couverts</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
          <h3 className="font-semibold text-lg">Nombre de tables</h3>
          {loading ? (
            <p className="text-gray-700 mt-2">Chargement...</p>
          ) : (
            <p className="text-gray-700 mt-2">{totalTables} tables</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold text-lg">Liste des réservations pour {selectedDate}</h2>
        <table className="min-w-full table-auto mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Heure</th>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Nombre de couverts</th>
              <th className="border px-4 py-2">Détails</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">Chargement...</td>
              </tr>
            ) : dailyReservations.length > 0 ? (
              dailyReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="border px-4 py-2">{reservation.reservation_time}</td>
                  <td className="border px-4 py-2">
                    {reservation.user ? `${reservation.user.lastname} ${reservation.user.firstname}` : 'Inconnu'}
                  </td>
                  <td className="border px-4 py-2">{reservation.number_of_people}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/reservations/${reservation.id}`} className="text-blue-500 hover:text-blue-700">
                      Voir les détails
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">Aucune réservation pour cette date</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
