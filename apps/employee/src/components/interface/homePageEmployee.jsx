import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReservationsByDate } from "../../api/reservationApi"; // Import de l'API

export function HomePageEmployee() {
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalCovers, setTotalCovers] = useState(0);
  const [loading, setLoading] = useState(true); // État pour l'animation de chargement
  const [progress, setProgress] = useState(0); // État pour la progression

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await getReservationsByDate(new Date().toISOString().split("T")[0]);
        setTotalReservations(reservations.length); // Met à jour le nombre de réservations
        setTotalCovers(reservations.reduce((total, res) => total + res.number_of_people, 0)); // Calcule le total des couverts
      } catch (error) {
        console.error("Erreur lors du chargement des réservations", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    const simulateProgress = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(simulateProgress);
          return 100;
        }
        return prev + 1;
      });
    }, 500); // Simule la progression toutes les 500ms

    fetchReservations();

    return () => clearInterval(simulateProgress);
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen mt-16 p-4">
      {/* Animation de chargement */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* Barre de chargement */}
          <div className="relative w-64 h-4 bg-gray-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Texte personnalisé */}
          <p className="mt-4 text-lg font-medium text-gray-700">
          <p>J'active la base de données gratuite, désolé c'est un peu long</p>
            Chargement en cours... {progress}%
          </p>
        </div>
      ) : (
        <>
          {/* Header : Bienvenue et résumé */}
          <header className="text-center animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-800">Bonjour, Employé !</h1>
            <p className="mt-2 text-gray-500">Voici un résumé de votre journée de travail.</p>
          </header>

          {/* Section Résumé de la journée */}
          <section className="mt-6 text-center">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
                <h3 className="text-lg font-semibold">Réservations du jour</h3>
                <p>{`${totalReservations} réservations`}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
                <h3 className="text-lg font-semibold">Nombre de couverts</h3>
                <p>{`${totalCovers} couverts`}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
                <h3 className="text-lg font-semibold">Tes horaires</h3>
                <p>pas encore dispo</p>
              </div>
            </div>
          </section>

          {/* Tableau de bord avec actions principales */}
          <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Carte d'accès à la gestion */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-800">Gestion des réservations</h3>
              <p className="mt-2 text-gray-600">Tableau de bord des réservations.</p>
              <Link
                to="/dashboard"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Accéder
              </Link>
            </div>

            {/* Carte de gestion des réservations */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-800">Effectuer une réservation</h3>
              <Link
                to="/reservations"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Réserver
              </Link>
            </div>

            {/* Carte de recherche */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-800">Rechercher un client ou une réservation</h3>
              <Link
                to="/search"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Chercher
              </Link>
            </div>

            {/* Carte de gestion des plannings */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-800">Mon Planning</h3>
              <p className="mt-2 text-gray-600">Consultez votre planning de travail.</p>
              <Link
                to="/plannings"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Voir
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
