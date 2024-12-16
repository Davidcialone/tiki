import React, { useEffect, useState } from "react";
import { getReservations } from "../../api/reservationApi";
import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom"; // Import de Link pour la navigation

export function GestionReservations() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour les critères de recherche
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  });
  const [searchName, setSearchName] = useState(""); // Recherche par nom
  const [filterType, setFilterType] = useState("all"); // Type de filtre : "date", "name", ou "all"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
        filterReservations(data, date, searchName, filterType);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des réservations");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour filtrer les réservations
  const filterReservations = (reservationsList, selectedDate, name, type) => {
    const filtered = reservationsList.filter((reservation) => {
      const matchesDate =
        type === "all" || type === "date"
          ? selectedDate
            ? new Date(reservation.reservation_date).toISOString().split("T")[0] ===
              selectedDate
            : true
          : true;

      const matchesName =
        type === "all" || type === "name"
          ? name
            ? (reservation.user?.firstname + " " + reservation.user?.lastname)
                .toLowerCase()
                .includes(name.toLowerCase())
            : true
          : true;

      return matchesDate && matchesName;
    });
    setFilteredReservations(filtered);
  };

  // Gestion du changement de date
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    filterReservations(reservations, selectedDate, searchName, filterType);
  };

  // Gestion du changement dans le champ de recherche
  const handleSearchNameChange = (name) => {
    setSearchName(name);
    filterReservations(reservations, date, name, filterType);
  };

  // Gestion du changement du type de filtre
  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    filterReservations(reservations, date, searchName, type);
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
      clientId: reservation.user ? reservation.user.id : null, // ID du client
      placesUsed: placesUsed, // Ajout des tables
    };
  });

  return (
    <div>
      <h1 className="p-4">Réservations</h1>

      {/* Barre de recherche */}
      <div className="flex flex-col md:flex-row justify-center p-4 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchName}
          onChange={(e) => handleSearchNameChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={filterType}
          onChange={(e) => handleFilterTypeChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">Nom et Date</option>
          <option value="name">Nom uniquement</option>
          <option value="date">Date uniquement</option>
        </select>
      </div>

      {/* Tableau des réservations */}
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ date, time, numberOfPeople, note, client, clientId, placesUsed }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={date + client + index}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {numberOfPeople}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {note}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {/* Lien sur le nom du client */}
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {clientId ? (
                          <Link to={`/clients/${clientId}`} className="text-blue-500 hover:underline">
                            {client}
                          </Link>
                        ) : (
                          client
                        )}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
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
                <Typography variant="small" color="blue-gray" className="font-bold">
                  Totaux
                </Typography>
              </td>
              <td className="p-4 border-t border-blue-gray-100">
                <Typography variant="small" color="blue-gray" className="font-bold">
                  {totalClients}
                </Typography>
              </td>
              <td className="p-4 border-t border-blue-gray-100" />
              <td className="p-4 border-t border-blue-gray-100" />
              <td className="p-4 border-t border-blue-gray-100">
                <Typography variant="small" color="blue-gray" className="font-bold">
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
