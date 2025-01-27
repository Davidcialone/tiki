import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { DashboardStats } from '../../features/dashboard/components/DashboardStats';
import { saveToCookie, getFromCookie } from '../../utils/cookies'; // Importation des fonctions depuis utils/cookies
import { newReservationsNotification } from '../../api/reservationApi'; // Assurez-vous que le chemin vers votre fonction est correct

const ManagerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [newReservations, setNewReservations] = useState([]);
  const [lastCheck, setLastCheck] = useState('');

  // Utilisation de useEffect pour récupérer les nouvelles réservations
  useEffect(() => {
    const lastCheck = getFromCookie('lastCheck') || new Date().toISOString(); // On récupère 'lastCheck' depuis le cookie ou on met une date par défaut
    setLastCheck(lastCheck);

    const fetchReservations = async () => {
      try {
        const newReservations = await newReservationsNotification(lastCheck);  // Appel à la fonction
        setNewReservations(newReservations);  // Mettre à jour les réservations
      } catch (error) {
        console.error('Erreur de récupération des nouvelles réservations:', error);
      }
    };

    fetchReservations();
  }, [lastCheck]); // Cette dépendance garantit que l'effet sera déclenché si 'lastCheck' change

  const markAsSeen = () => {
    const now = new Date().toISOString();
    saveToCookie('lastCheck', now); // Met à jour 'lastCheck' dans les cookies
    setLastCheck(now); // Mise à jour du state
    setNewReservations([]); // Réinitialiser les nouvelles réservations après consultation
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard Restaurant - {user?.firstname} {user?.lastname}
        </h1>

        {/* Section des statistiques */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Notifications de nouvelles réservations */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Nouvelles Réservations</h2>
          {newReservations.length > 0 ? (
            <div>
              <p className="text-green-600 mb-4">
                Vous avez {newReservations.length} nouvelle(s) réservation(s) depuis votre dernière consultation.
              </p>
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
                className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
              >
                Rechercher un client
              </button>
              <button 
                onClick={() => navigate('/clients/new')}
                className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
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

          {/* Stocks */}
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
