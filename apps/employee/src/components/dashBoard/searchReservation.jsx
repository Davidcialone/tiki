import React, { useEffect, useState } from "react";
import { getReservations } from "../../api/reservationApi";
import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SearchReservation() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  });
  const [searchName, setSearchName] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReservations();
        console.log("Données récupérées :", data);
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

  const filterReservations = (reservationsList, selectedDate, name, type) => {
    const filtered = reservationsList.filter((reservation) => {
      const matchesDate =
        type === "all" || type === "date"
          ? selectedDate
            ? new Date(reservation.reservation_date).toISOString().split("T")[0] === selectedDate
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
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    filterReservations(reservations, selectedDate, searchName, filterType);
  };

  const handleSearchNameChange = (name) => {
    setSearchName(name);
    filterReservations(reservations, date, name, filterType);
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    filterReservations(reservations, date, searchName, type);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  const TABLE_HEAD = ["Date", "Heure", "Nombre", "Note", "Client"];

  return (
    <div>
      <h2 className="p-4">Rechercher une réservation</h2>

      <div className="flex flex-col md:flex-row justify-center p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <p className="pr-4">Vous pouvez effectuer une recherche par</p>
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
      </div>

      <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedReservations.map(
              ({
                id,
                reservation_date,
                reservation_time,
                number_of_people,
                note,
                user,
              }, index) => {
                const isLast = index === paginatedReservations.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>{reservation_date}</td>
                    <td className={classes}>{reservation_time}</td>
                    <td className={classes}>{number_of_people}</td>
                    <td className={classes}>{note ? note : "Aucune note"}</td>
                    <td className={classes}>
                      {user ? (
                        <Link to={`/clients/${user.id}`} className="text-blue-800 hover:underline">
                          {user.firstname} {user.lastname}
                        </Link>
                      ) : (
                        "Client inconnu"
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Précédent
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`p-2 rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
