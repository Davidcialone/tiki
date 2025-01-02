import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function HomePageEmployee() {
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalCovers, setTotalCovers] = useState(0);

  useEffect(() => {
    // Simuler les données réelles
    setTotalReservations(5);
    setTotalCovers(15);
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen mt-16 p-4"> {/* Ajout d'un padding-top pour déplacer le contenu sous la navbar */}
      {/* Header : Bienvenue et résumé */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Bonjour, Employé !</h1>
        <p className="mt-2 text-gray-500">Voici un résumé de votre journée de travail.</p>
      </header>

      {/* Tableau de bord avec actions principales */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Carte de gestion des réservations */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer">
          <h3 className="text-xl font-semibold text-gray-800">Réservations</h3>
          <p className="mt-2 text-gray-600">Vous avez {totalReservations} réservations aujourd'hui.</p>
          <Link
            to="/reservations"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-200"
          >
            Gérer
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

        {/* Carte d'accès à la gestion */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-200 cursor-pointer">
          <h3 className="text-xl font-semibold text-gray-800">Gestion</h3>
          <p className="mt-2 text-gray-600">Accédez aux outils de gestion et aux ressources.</p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-200"
          >
            Accéder
          </Link>
        </div>
      </section>

      {/* Section Résumé de la journée */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Résumé de votre journée</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
            <h3 className="text-lg font-semibold">Réservations du jour</h3>
            <p>{totalReservations} réservations</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
            <h3 className="text-lg font-semibold">Couverts à préparer</h3>
            <p>{totalCovers} couverts</p>
          </div>
        </div>
      </section>
    </div>
  );
}
