import { useState, useEffect } from "react";
import { getReservationsbyDate } from "../../api/reservationApi";

export function TablesDashBoard() {
  // Initialisation de la date sélectionnée par défaut à la date du jour
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format yyyy-mm-dd
    return formattedDate;
  });

  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalCovers, setTotalCovers] = useState(0);
  const [totalTables, setTotalTables] = useState(0);

  // Charger les réservations dès qu'une nouvelle date est sélectionnée
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(""); // Réinitialiser l'erreur à chaque nouvelle requête

      if (!selectedDate) return; // Si aucune date n'est sélectionnée, on ne fait rien

      console.log("Appel API avec la date : ", selectedDate); // Affiche la date envoyée

      try {
        // Récupération des réservations pour la date sélectionnée
        const reservations = await getReservationsbyDate(selectedDate);
        console.log("Réservations récupérées:", reservations);

        if (!reservations || reservations.length === 0) {
          console.log("Aucune réservation trouvée pour cette date.");
        }

        // Calcul des statistiques
        setReservations(reservations); // Enregistrer toutes les réservations
        setFilteredReservations(reservations); // Si nécessaire, appliquer un filtrage
        setTotalReservations(reservations.length); // Nombre total de réservations
        setTotalCovers(reservations.reduce((total, reservation) => total + reservation.number_of_people, 0)); // Total des couverts

        // Calcul du nombre total de tables utilisées
        const totalTablesCount = reservations.reduce((total, reservation) => {
          const placesUsed = reservation.places_used;
          if (typeof placesUsed === 'number' && !isNaN(placesUsed)) {
            return total + placesUsed;
          }
          return total;
        }, 0);

        setTotalTables(totalTablesCount); // Nombre total de tables utilisées
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
        setError("Une erreur s'est produite lors de la récupération des données. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    // Si selectedDate existe, alors on charge les données
    if (selectedDate) {
      fetchReservations();
    }

  }, [selectedDate]); // L'effet se déclenche chaque fois que la date change.

  // Gestion du changement de la date sélectionnée
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="p-6">
      {/* Sélecteur de date */}
      <div className="mb-6">
        <label htmlFor="date-picker" className="block text-lg font-semibold text-gray-800">
          Sélectionnez une date :
        </label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full sm:w-1/3"
        />
      </div>

      {/* Chargement et erreur */}
      {loading && <p>Chargement des réservations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Résumé des statistiques */}
      {selectedDate && !loading && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Résumé des réservations pour {selectedDate}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-xl">{totalReservations}</h3>
              <p className="text-gray-600">Réservations totales</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-xl">{totalCovers}</h3>
              <p className="text-gray-600">Couverts totaux</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-xl">{totalTables}</h3>
              <p className="text-gray-600">Tables utilisées</p>
            </div>
          </div>
        </div>
      )}

      {/* Liste des réservations */}
      {selectedDate && !loading && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Liste des réservations</h3>
          <ul className="mt-4">
            {filteredReservations.map((reservation) => (
              <li key={reservation.id} className="flex justify-between p-4 border-b">
                <div>
                  <p className="font-semibold">{reservation.reservation_time}</p>
                  <p className="text-gray-600">{reservation.number_of_people} couverts</p>
                </div>
                <div>
                  <p className="text-gray-500">Table utilisée : {reservation.places_used}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
