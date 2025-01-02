import React from "react";
import { Link } from "react-router-dom";

export function HomePageEmployee() {
  return (
    <div className="bg-gray-300 min-h-screen rounded-xl">
      <div className="mb-12"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section d'accueil */}
        <section className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenue, Employé!</h1>
          <p className="mt-4 text-lg text-gray-500">
            Gérez les réservations, les plannings et accédez à toutes les informations nécessaires pour votre journée de travail.
          </p>
        </section>

        {/* Section des fonctionnalités */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Carte de gestion des réservations */}
          <div className="bg-white shadow-sm rounded-lg p-6 text-center hover:bg-gray-100 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800">Gérer les réservations</h3>
            <p className="mt-2 text-gray-600">
              Consultez et gérez les réservations des clients facilement.
            </p>
            <Link to="/reservations" className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-300">
              Voir les réservations
            </Link>
          </div>

          {/* Carte de gestion des plannings */}
          <div className="bg-white shadow-sm rounded-lg p-6 text-center hover:bg-gray-100 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800">Gestion des plannings</h3>
            <p className="mt-2 text-gray-600">
              Gérez les horaires et les plannings des employés pour assurer une organisation optimale.
            </p>
            <Link to="/plannings" className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-300">
              Voir les plannings
            </Link>
          </div>

          {/* Carte d'accès à la gestion */}
          <div className="bg-white shadow-sm rounded-lg p-6 text-center hover:bg-gray-100 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800">Gestion</h3>
            <p className="mt-2 text-gray-600">
              Accédez aux outils de gestion des ressources, des clients et des statistiques.
            </p>
            <Link to="/dashboard" className="mt-4 inline-block text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition-all duration-300">
              Accéder à la gestion
            </Link>
          </div>
        </section>

        {/* Section de notifications ou d'informations */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
          <p className="mt-4 text-lg text-gray-500">
            Vous avez des notifications ou des alertes importantes concernant votre travail aujourd'hui.
          </p>
          {/* Vous pouvez ajouter ici une liste dynamique de notifications si nécessaire */}
        </section>
      </main>
    </div>
  );
}
