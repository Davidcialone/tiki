import React, { useEffect, useState } from "react";
import { getReservations } from "../../../../api/reservationApi";
import { Card, Typography } from "@material-tailwind/react";

export function GestionReservations() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  });

  useEffect(() => {
    // Fonction pour récupérer les données
    const fetchData = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
        filterReservationsByDate(data, date);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des réservations");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrer les réservations par date
  const filterReservationsByDate = (reservationsList, selectedDate) => {
    const filtered = reservationsList.filter((reservation) =>
      new Date(reservation.reservation_date).toISOString().split("T")[0] === selectedDate
    );
    setFilteredReservations(filtered);
  };

  // Gestion du clic sur "Afficher"
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    filterReservationsByDate(reservations, selectedDate);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  // Calcul des totaux
  const totalClients = filteredReservations.reduce(
    (sum, reservation) => sum + (reservation.number_of_people || 0),
    0
  );

  const calculatePlacesUsed = (numberOfPeople, tableCapacity = 2) => {
    return Math.ceil(numberOfPeople / tableCapacity);
  };

  const totalTables = filteredReservations.reduce(
    (sum, reservation) => sum + calculatePlacesUsed(reservation.number_of_people || 0),
    0
  );

  // Tableau d'entêtes de colonnes
  const TABLE_HEAD = ["Date", "Heure", "Nombre", "Note", "Client", "Tables"];

  // Construction des lignes du tableau avec les réservations filtrées
  const TABLE_ROWS = filteredReservations.map((reservation) => {
    const numberOfPeople = reservation.number_of_people || 0;
    const placesUsed = calculatePlacesUsed(numberOfPeople); // Nombre de tables nécessaires

    return {
      date: new Date(reservation.reservation_date).toLocaleDateString(),
      time: reservation.reservation_time,
      numberOfPeople: numberOfPeople,
      note: reservation.note || "Aucune note",
      client: reservation.user
        ? `${reservation.user.firstname} ${reservation.user.lastname}`
        : "Inconnu",
      placesUsed: placesUsed, // Ajout des tables
    };
  });

  return (
    <div>
      <h1 className="p-4">Réservations</h1>

      {/* Sélecteur de date */}
      <div className="flex justify-center p-4">
        <input
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => handleDateChange(date)}
          className="bg-blue-500 text-white p-2 rounded-md ml-2"
        >
          Afficher
        </button>
      </div>

      {/* Tableau des réservations */}
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ date, time, numberOfPeople, note, client, placesUsed }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={date + client + index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {numberOfPeople}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {note}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {client}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {placesUsed}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
            {/* Ligne des totaux */}
            <tr>
              <td colSpan={2} className="p-4 border-t border-blue-gray-100">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  Totaux
                </Typography>
              </td>
              <td className="p-4 border-t border-blue-gray-100">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  {totalClients}
                </Typography>
              </td>
              <td className="p-4 border-t border-blue-gray-100" />
              <td className="p-4 border-t border-blue-gray-100" />
              <td className="p-4 border-t border-blue-gray-100">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  {totalTables}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default GestionReservations;
