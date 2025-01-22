import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';

const HomePageEmployee = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Bienvenue, {user?.name}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => navigate('/dashboard')}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Tableau de bord</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Accédez à votre tableau de bord personnalisé
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate('/reservations')}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Réservations</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Gérez les réservations des clients
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate('/clients')}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Clients</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Recherchez et gérez les informations clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageEmployee;
