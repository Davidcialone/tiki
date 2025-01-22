import React from 'react';
import { useAuth } from '../../auth/authContext';

const WorkerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard Employé - {user?.firstname} {user?.lastname}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Résumé de la journée */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Ma journée</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rendez-vous aujourd'hui</span>
                <span className="text-lg font-semibold text-blue-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Prochain rendez-vous</span>
                <span className="text-lg font-semibold text-green-600">14:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pause déjeuner</span>
                <span className="text-lg font-semibold text-orange-600">12:00 - 13:00</span>
              </div>
            </div>
          </div>

          {/* Gestion des rendez-vous */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mes rendez-vous</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Voir mes rendez-vous
              </button>
              <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                Ajouter un rendez-vous
              </button>
              <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
                Gérer les annulations
              </button>
            </div>
          </div>

          {/* Gestion des clients */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Clients</h2>
            <div className="space-y-4">
              <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                Rechercher un client
              </button>
              <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                Nouveau client
              </button>
            </div>
          </div>

          {/* Planning personnel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mon planning</h2>
            <div className="space-y-4">
              <button className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                Voir mon planning
              </button>
              <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
                Demander un congé
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Services</h2>
            <div className="space-y-4">
              <button className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors">
                Liste des services
              </button>
              <button className="w-full bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition-colors">
                Mes spécialités
              </button>
            </div>
          </div>

          {/* Mon profil */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mon profil</h2>
            <div className="space-y-4">
              <button className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
                Modifier mon profil
              </button>
              <button className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                Signaler un problème
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
