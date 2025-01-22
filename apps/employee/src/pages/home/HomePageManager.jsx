import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';

const HomePageManager = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Bienvenue Manager, {user?.name}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => navigate('/dashboard')}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Tableau de bord</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Vue d'ensemble de l'activité
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate('/employees')}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Employés</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Gérez les employés et leurs plannings
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate('/reports')}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Rapports</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Consultez les statistiques et rapports
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate('/settings')}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Paramètres</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configurez les paramètres du restaurant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageManager;
