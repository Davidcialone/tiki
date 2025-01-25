import React, { useEffect, useState } from "react";
import { getReservations } from "../../../api/reservationApi";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export function ReservationSearch() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
        setFilteredReservations(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des réservations.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = reservations.filter((reservation) => {
      const fullName = `${reservation.user?.firstname || ""} ${
        reservation.user?.lastname || ""
      }`.toLowerCase();
      const matchesName = fullName.includes(query);

      // Filtrage par date (si une date est sélectionnée)
      const matchesDate = filterDate
        ? reservation.reservation_date === filterDate
        : true;

      return matchesName && matchesDate;
    });
    setFilteredReservations(filtered);
    setCurrentPage(1); // Réinitialiser la pagination
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, filterDate]);

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Rechercher une réservation</h2>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par nom du client..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <input
          type="date"
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Reservation Table - Only show if search query exists */}
      {searchQuery || filterDate ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Heure</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReservations.length > 0 ? (
                paginatedReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{reservation.reservation_date}</td>
                    <td className="px-4 py-2">{reservation.reservation_time}</td>
                    <td className="px-4 py-2">{reservation.number_of_people}</td>
                    <td className="px-4 py-2">
                      {reservation.user ? (
                        <Link
                          to={`/clients/${reservation.user.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {reservation.user.firstname} {reservation.user.lastname}
                        </Link>
                      ) : (
                        "Client inconnu"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {reservation.note || "Aucune note"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    Aucune réservation trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">Veuillez effectuer une recherche.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (searchQuery || filterDate) && (
        <div className="flex justify-center items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
