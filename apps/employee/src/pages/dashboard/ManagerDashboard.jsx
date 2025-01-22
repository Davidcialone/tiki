import React from 'react';
import { useAuth } from '../../auth/authContext';

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard Manager - {user?.firstname} {user?.lastname}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Statistiques globales */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Vue d'ensemble</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Employés actifs</span>
                <span className="text-lg font-semibold text-blue-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Réservations aujourd'hui</span>
                <span className="text-lg font-semibold text-green-600">25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chiffre du jour</span>
                <span className="text-lg font-semibold text-purple-600">1,250€</span>
              </div>
            </div>
          </div>

          {/* Gestion des employés */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gestion des employés</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Voir tous les employés
              </button>
              <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                Ajouter un employé
              </button>
              <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                Planning des équipes
              </button>
            </div>
          </div>

          {/* Rapports et analyses */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Rapports</h2>
            <div className="space-y-4">
              <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                Rapport des ventes
              </button>
              <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
                Performance des employés
              </button>
              <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
                Statistiques clients
              </button>
            </div>
          </div>

          {/* Gestion des réservations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Réservations</h2>
            <div className="space-y-4">
              <button className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                Toutes les réservations
              </button>
              <button className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
                Gérer les créneaux
              </button>
            </div>
          </div>

          {/* Gestion des services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Services</h2>
            <div className="space-y-4">
              <button className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors">
                Liste des services
              </button>
              <button className="w-full bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition-colors">
                Ajouter un service
              </button>
            </div>
          </div>

          {/* Paramètres */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Paramètres</h2>
            <div className="space-y-4">
              <button className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
                Paramètres généraux
              </button>
              <button className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
