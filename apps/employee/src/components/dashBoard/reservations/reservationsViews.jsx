import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Table, Edit, Trash2 } from 'lucide-react';
import { getReservations, updateReservation, deleteReservation } from "../../../api/reservationApi";
import { ReservationModal } from "../../modales/reservationModal";

export function ReservationsViews () {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const allReservations = await getReservations(); // Récupération de toutes les réservations
      const confirmedReservations = allReservations.filter(reservation => reservation.status === 'confirmed' || reservation.status === 'present'); // Filtrage des confirmed et present
      setReservations(confirmedReservations);  // Mise à jour avec les réservations filtrées
    };
    fetchReservations();
  }, []);
  
  

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newDate);
    setSelectedDay(new Date(newDate.getFullYear(), newDate.getMonth(), 1)); // Réinitialise au premier jour
  };

  const generateDays = () => Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1);

  const getReservationsForDay = (day) => {
    return reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.reservation_date);
      return (
        reservationDate.getFullYear() === currentMonth.getFullYear() &&
        reservationDate.getMonth() === currentMonth.getMonth() &&
        reservationDate.getDate() === day
      );
    });
  };

  const getTotalGuests = (day) => {
    const dailyReservations = getReservationsForDay(day);
    return dailyReservations.reduce((sum, res) => sum + res.number_of_people, 0);
  };

  const getTotalTables = (day) => {
    const dailyReservations = getReservationsForDay(day);
    return dailyReservations.reduce((sum, res) => {
      const tablesNeeded = Math.ceil(res.number_of_people / 2);
      return sum + tablesNeeded;
    }, 0);
  };

  const handleArrivalToggle = async (reservationId) => {
    try {
      const reservation = reservations.find((res) => res.id === reservationId);
      if (!reservation) return;
  
      // Déterminer le nouveau statut
      const newStatus = reservation.status === 'present' ? 'confirmed' : 'present';
  
      // Préparer les données à envoyer
      const dataToUpdate = {
        status: newStatus,
      };
  
      const updatedReservation = await updateReservation(reservationId, dataToUpdate);
  
      // Fusionner les données existantes avec la mise à jour
      setReservations((prev) =>
        prev.map((res) =>
          res.id === reservationId
            ? { ...res, ...updatedReservation } // Garde les données existantes et ajoute/remplace avec les nouvelles
            : res
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };
  

  const handleDeleteReservation = async (reservationId) => {
    if (!reservationId) {
      console.error("ID de réservation manquant.");
      return;
    }

    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette réservation ?"
    );

    if (!confirmDelete) {
      return;
    }

    const previousReservations = [...reservations];
    setReservations((prev) => prev.filter((res) => res.id !== reservationId));

    try {
      await deleteReservation(reservationId);
      console.log(`Réservation avec l'ID ${reservationId} supprimée.`);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression. Veuillez réessayer.");
      setReservations(previousReservations);
    }
  };

   // Fonction pour initialiser le formulaire
   const initializeFormData = (reservation = null) => {
    if (reservation) {
      return {
        number_of_people: reservation.number_of_people,
        reservation_time: reservation.reservation_time,
        phone: reservation.user?.phone || '',  // Vérification utilisateur
        email: reservation.user?.email || '',  // Vérification utilisateur
      };
    } else {
      return {
        number_of_people: '',
        reservation_time: '',
        phone: '',
        email: '',
      };
    }
  };

    // Fonction appelée au moment de l'ouverture de la modal
    const handleOpenModal = (reservationId = null) => {
      let data = {};
  
      if (reservationId) {
        // On préremplit les données pour modification
        const reservation = reservations.find((res) => res.id === reservationId);
        if (reservation) {
          data = initializeFormData(reservation);  // Remplit les données existantes
        } else {
          console.error("Réservation introuvable.");
        }
      } else {
        // On initialise les données pour création
        data = initializeFormData();
      }
  
      setFormData(data);
      setIsModalOpen(true);
    };

  const handleUpdateReservation = async (reservationId, updatedFormData) => {
    const updatedReservation = reservations.find((res) => res.id === reservationId);

    if (!updatedReservation) {
      console.error("Réservation introuvable.");
      return;
    }

    const updatedData = {
      ...updatedReservation,
      number_of_people: updatedFormData.number_of_people || updatedReservation.number_of_people,
      reservation_time: updatedFormData.reservation_time || updatedReservation.reservation_time,
      phone: updatedFormData.phone || updatedReservation.user.phone,
      email: updatedFormData.email || updatedReservation.user.email,  // Assurez-vous que l'email est inclus
          };

    try {
      const updatedResponse = await updateReservation(reservationId, updatedData);
      setReservations((prev) =>
        prev.map((res) => (res.id === reservationId ? updatedResponse : res))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleDaySelect = (day) => {
    setSelectedDay(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const openEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const changeColorOver = (numberOfPeople) => {
    if (numberOfPeople <= 2) return 'bg-green-100 dark:bg-green-300';
    if (numberOfPeople <= 4) return 'bg-yellow-100 dark:bg-yellow-300';
    if (numberOfPeople <= 6) return 'bg-orange-100 dark:bg-orange-300';
    return 'bg-red-100 dark:bg-red-300';
  };

  return (
    <div>
      {isModalOpen && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => handleUpdateReservation(selectedReservation.id, data)}
          reservation={selectedReservation}
        />
      )}
      <div className="mt-16"></div>
      <div className="w-full mx-auto bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 text-black">
          <button onClick={() => navigateMonth('prev')} className="p-1">
            <ChevronLeft className="w-5 h-5 bg-black text-white" />
          </button>
          <span className="text-sm font-medium">
            {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => navigateMonth('next')} className="p-1">
            <ChevronRight className="w-5 h-5 bg-black text-white" />
          </button>
        </div>
  
        <div className="flex overflow-x-auto space-x-2 px-4 py-3 border-b">
          {generateDays().map((day) => {
            const hasReservations = getReservationsForDay(day).length > 0;
            return (
              <button
                key={day}
                className={`relative flex flex-col items-center justify-center px-4 py-2 rounded-lg ${
                  day === selectedDay.getDate() ? 'bg-green-500 text-white' : 'bg-gray-100 text-black'
                }`}
                onClick={() => handleDaySelect(day)}
              >
                <span className="text-sm font-medium">{day}</span>
                {hasReservations && (
                  <div className="absolute bottom-0 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
                <div className="text-xs mt-1 flex flex-col items-center justify-center">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{getTotalGuests(day)}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Table className="w-4 h-4 text-blue-500" />
                    <span>{getTotalTables(day)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
  
        <div className="px-4 py-2">
          {getReservationsForDay(selectedDay.getDate()).length > 0 ? (
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center justify-between py-2 border-b font-semibold text-gray-600">
                <span className="text-sm text-center">Heure</span>
                <span className="text-sm text-center">Nom</span>
                <span className="text-sm text-center">Clients</span>
                <span className="text-sm text-center">Téléphone</span>
                <span className="text-sm text-center">Actions</span>
              </div>
              {getReservationsForDay(selectedDay.getDate()).map((reservation) => (
                <div
                  key={reservation.id}
                  className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center justify-between py-2 border-b last:border-0 ${
                    changeColorOver(reservation.number_of_people)} ${
                    reservation.arrived ? 'brightness-75' : 'brightness-100'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-600">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {reservation.reservation_time || 'Heure non spécifiée'}  {/* Message alternatif si aucune heure */}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-black">{reservation.user?.lastname || 'Nom non spécifié'}</span>
                    <span className="text-sm text-black ml-2">{reservation.user?.firstname || 'Prénom non spécifié'}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-600">
                      <Users className="w-4 h-4 inline mr-1" />
                      {reservation.number_of_people || 'Nombre de personnes non spécifié'}  {/* Message alternatif si aucune valeur */}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-black">{reservation.user?.phone || 'Téléphone non spécifié'}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      className={`flex items-center space-x-2 text-sm text-white px-2 py-1 rounded-lg ${
                        reservation.status === 'present' ? 'bg-gray-500' : 'bg-green-500'
                      }`}
                      onClick={() => handleArrivalToggle(reservation.id)}
                    >
                      <input
                        type="checkbox"
                        checked={reservation.status === 'present'}
                        readOnly
                        className="w-4 h-4"
                      />
                      <span>{reservation.status === 'present' ? 'présent' : 'En attente'}</span>
                    </button>
                     <button
                      className="bg-blue-500 text-white text-sm px-2 py-1 rounded-lg"
                      onClick={() => openEditModal(reservation)}
                    >
                      <Edit className="w-3 h-3 inline" />
                    </button>
                    <button
                      className="bg-red-500 text-white text-sm px-2 py-1 rounded-lg"
                      onClick={() => handleDeleteReservation(reservation.id)}
                    >
                      <Trash2 className="w-3 h-3 inline" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Aucune réservation pour ce jour.</div>
          )}
        </div>
      </div>
    </div>
  );
  
};
