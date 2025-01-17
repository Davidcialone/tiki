import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReservationsByDate } from "../../api/reservationApi";  // Import de l'API

export function HomePageManager() {
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalCovers, setTotalCovers] = useState(0);
  const [loading, setLoading] = useState(true); // État pour l'animation de chargement

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await getReservationsByDate(new Date().toISOString().split("T")[0]);
        setTotalReservations(reservations.length);  // Met à jour le nombre de réservations
        setTotalCovers(reservations.reduce((total, res) => total + res.number_of_people, 0));  // Calcule le total des couverts
      } catch (error) {
        console.error("Erreur lors du chargement des réservations", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen mt-16 p-4"> {/* Ajout d'un padding-top pour déplacer le contenu sous la navbar */}
      {/* Header : Bienvenue et résumé */}
      <header className="text-center animate-fadeIn"> {/* Animation pour le titre */}
        <h1 className="text-3xl font-bold text-gray-800">Bonjour, Employé !</h1>
        <p className="mt-2 text-gray-500">Voici un résumé de votre journée de travail.</p>
      </header>
      
      {/* Section Résumé de la journée */}
      <section className={`mt-6 text-center transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700 animate-bounce-in">
            <h3 className="text-lg font-semibold">Réservations du jour</h3>
            <p>{loading ? "Chargement..." : `${totalReservations} réservations`}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700 animate-bounce-in">
            <h3 className="text-lg font-semibold">Nombre de couverts</h3>
            <p>{loading ? "Chargement..." : `${totalCovers} couverts`}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700 animate-bounce-in">
            <h3 className="text-lg font-semibold">Tes horaires</h3>
            <p>pas encore dispo</p>
          </div>
        </div>
      </section>

      {/* Tableau de bord avec actions principales */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Carte d'accès à la gestion */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer animate-slide-in">
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
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer animate-slide-in">
          <h3 className="text-xl font-semibold text-gray-800">Effectuer une réservation</h3>
          <Link
            to="/reservations"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-200"
          >
            Réserver
          </Link>
        </div>

        {/* Carte de recherche */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer animate-slide-in">
          <h3 className="text-xl font-semibold text-gray-800">Rechercher un client ou une réservation</h3>
          <Link
            to="/search"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-200"
          >
            Chercher
          </Link>
        </div>

        {/* Carte de gestion des plannings */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer animate-slide-in">
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
    </div>
  );
}
