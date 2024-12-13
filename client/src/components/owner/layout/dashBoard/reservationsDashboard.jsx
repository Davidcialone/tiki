import React, { useEffect, useState } from "react";
import { getReservations } from "../../../../api/reservationApi";
import { Card, Typography } from "@material-tailwind/react";

export function GestionReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données
    const fetchData = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des réservations");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  // Tableau d'entêtes de colonnes
  const TABLE_HEAD = ["Date", "Heure", "Nombre", "Note", "Client"];

  // Construction des lignes du tableau avec les réservations
  const TABLE_ROWS = reservations.map((reservation) => ({
    date: new Date(reservation.reservation_date).toLocaleDateString(),
    time: reservation.reservation_time,
    numberOfPeople: reservation.number_of_people,
    note: reservation.note || "Aucune note",
    client: reservation.user ? `${reservation.user.firstname} ${reservation.user.lastname}` : "Inconnu",
  }));

  return (
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
          {TABLE_ROWS.map(({ date, time, numberOfPeople, note, client }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={date + client}>
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
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {client}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default GestionReservations;
