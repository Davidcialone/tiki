import React from 'react';
import { useAuth } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { DashboardStats } from '../../features/dashboard/components/DashboardStats';
import { useState, useEffect  } from 'react';


const WorkerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard Service - {user?.firstname} {user?.lastname}
        </h1>

        {/* Statistiques */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gestion des tables */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mes tables ko</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/tables')}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Voir mes tables ko
              </button>
              <button 
                onClick={() => navigate('/tables/orders')}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Prendre une commande ko
              </button>
              <button 
                onClick={() => navigate('/tables/payments')}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Encaisser une table   ko
              </button>
            </div>
          </div>

          {/* Menu du jour */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Menu du jour ko</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/menu/today')}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
              >
                Voir le menu ko
              </button>
              <button 
                onClick={() => navigate('/menu/specials')}
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
              >
                Plats du jour ko
              </button>
            </div>
          </div>

          {/* Réservations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Réservations</h2>
            <div className="space-y-4">
            <button 
                onClick={() => navigate('/reservations')}
                className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
              >
                Effectuer une réservation
              </button>
              <button 
                onClick={() => navigate('/reservations/management')}
                className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
              >
                Gestion des réservations
              </button>
            </div>
          </div>

        

          {/* Planning */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Planning</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/planning')}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Mon planning
              </button>
              <button 
                onClick={() => navigate('/planning/exchange')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Échanger un service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
