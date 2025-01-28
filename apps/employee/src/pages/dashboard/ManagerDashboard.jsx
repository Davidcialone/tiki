import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { DashboardStats } from '../../features/dashboard/components/DashboardStats';
import { saveToCookie, getFromCookie } from '../../utils/cookies';
import { newReservationsNotification } from '../../api/reservationApi';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [newReservations, setNewReservations] = useState([]);
  const [lastCheck, setLastCheck] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialLastCheck = getFromCookie('lastCheck') || new Date().toISOString();
    setLastCheck(initialLastCheck);

    const fetchReservations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const newReservations = await newReservationsNotification(initialLastCheck);
        setNewReservations(newReservations);
      } catch (error) {
        setError('Erreur lors de la récupération des notifications');
        console.error('Erreur de récupération des nouvelles réservations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();

    // Mise en place d'une vérification périodique toutes les 2 minutes
    const pollInterval = setInterval(fetchReservations, 2 * 60 * 1000);

    // Nettoyage à la destruction du composant
    return () => clearInterval(pollInterval);
  }, []); // Suppression de la dépendance lastCheck pour éviter les appels en boucle

  const markAsSeen = async () => {
    try {
      const now = new Date().toISOString();
      saveToCookie('lastCheck', now);
      setLastCheck(now);
      setNewReservations([]);
      
      // Vous pourriez ajouter ici un appel API pour marquer les notifications comme lues côté serveur
      // await markNotificationsAsRead(newReservations.map(r => r.id));
      
    } catch (error) {
      console.error('Erreur lors du marquage des notifications:', error);
      setError('Erreur lors du marquage des notifications comme vues');
    }
  };

  // Composant pour les notifications
  const NotificationsSection = () => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Nouvelles Réservations</h2>
      
      {isLoading ? (
        <p className="text-gray-500">Chargement des notifications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : newReservations.length > 0 ? (
        <div>
          <p className="text-green-600 mb-4">
            Vous avez {newReservations.length} nouvelle(s) réservation(s) depuis votre dernière consultation.
          </p>
          <div className="mb-4 max-h-40 overflow-y-auto">
            {newReservations.map((reservation) => (
              <div key={reservation.id} className="p-2 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  Réservation pour le {new Date(reservation.reservation_date).toLocaleDateString()} pour {reservation.number_of_people} personnes
                </p>
               </div>
            ))}
          
          </div>
          <button
            onClick={markAsSeen}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors"
          >
            Marquer comme vues
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Aucune nouvelle réservation.</p>
      )}
    </div>
  );

  // Le reste de votre JSX reste identique, mais on remplace la section des notifications
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard Restaurant - {user?.firstname} {user?.lastname}
        </h1>

        <div className="mb-8">
          <DashboardStats />
        </div>

        <NotificationsSection />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gestion du service */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Service en cours</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/service/tables')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Plan des tables
              </button>
              <button 
                onClick={() => navigate('/service/orders')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Commandes en cours
              </button>
              <button 
                onClick={() => navigate('/service/staff')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Personnel en service
              </button>
            </div>
          </div>
      
          {/* Réservations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Réservations</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/reservations')}
                className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
              >
                Effectuer une réservation
              </button>
              <button 
                onClick={() => navigate('/reservations/management')}
                className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
              >
                Gestion des réservations
              </button>
              <button 
                onClick={() => navigate('/reservations/settings')}
                className="w-full bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition-colors"
              >
                Paramètres réservation
              </button>
            </div>
          </div>

          {/* Clients */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Clients</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/clients/search')}
                className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
              >
                Rechercher un client
              </button>
              <button 
                onClick={() => navigate('/clients/new')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
              >
                Ajouter un client
              </button>
            </div>
          </div>

          {/* Menu et carte */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Menu & Carte</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/menu/edit')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
              >
                Modifier la carte
              </button>
              <button 
                onClick={() => navigate('/menu/specials')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
              >
                Plats du jour
              </button>
              <button 
                onClick={() => navigate('/menu/prices')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition-colors"
              >
                Tarification
              </button>
            </div>
          </div>

          {/* Stocks */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Stocks</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/stock/inventory')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
              >
                Inventaire
              </button>
              <button 
                onClick={() => navigate('/stock/orders')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
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

          {/* Personnel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Personnel</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/staff/planning')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Planning équipe
              </button>
              <button 
                onClick={() => navigate('/staff/management')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors"
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
