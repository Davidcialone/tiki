import React from 'react';
import { useAuth } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { DashboardStats } from '../../features/dashboard/components/DashboardStats';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard Restaurant - {user?.firstname} {user?.lastname}
        </h1>

        {/* Statistiques */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gestion du service */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Service en cours</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/service/tables')}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Plan des tables
              </button>
              <button 
                onClick={() => navigate('/service/orders')}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Commandes en cours
              </button>
              <button 
                onClick={() => navigate('/service/staff')}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Personnel en service
              </button>
            </div>
          </div>

          {/* Menu et carte */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Menu & Carte</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/menu/edit')}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
              >
                Modifier la carte
              </button>
              <button 
                onClick={() => navigate('/menu/specials')}
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
              >
                Plats du jour
              </button>
              <button 
                onClick={() => navigate('/menu/prices')}
                className="w-full bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition-colors"
              >
                Tarification
              </button>
            </div>
          </div>

          {/* Gestion des stocks */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Stocks</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/stock/inventory')}
                className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
              >
                Inventaire
              </button>
              <button 
                onClick={() => navigate('/stock/orders')}
                className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
              >
                Commandes fournisseurs
              </button>
              <button 
                onClick={() => navigate('/stock/waste')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Gestion des pertes
              </button>
            </div>
          </div>

          {/* Réservations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Réservations</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/reservations/all')}
                className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
              >
                Toutes les réservations
              </button>
              <button 
                onClick={() => navigate('/reservations/settings')}
                className="w-full bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition-colors"
              >
                Paramètres réservation
              </button>
            </div>
          </div>

          {/* Personnel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Personnel</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/staff/planning')}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Planning équipe
              </button>
              <button 
                onClick={() => navigate('/staff/management')}
                className="w-full bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors"
              >
                Gestion du personnel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
