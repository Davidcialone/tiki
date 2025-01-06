import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Table } from 'lucide-react';
import { getReservations } from "../../../api/reservationApi";

export const ReservationsViews = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [reservations, setReservations] = useState([]);
  
  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    
    fetchReservations(); // Charger les réservations au démarrage
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newDate);
    setSelectedDay(1); // Réinitialise au premier jour du mois sélectionné
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const getReservationsForDay = (day) => {
    return reservations.filter(
      (reservation) => new Date(reservation.reservation_date).getDate() === day
    );
  };

  
  const getTotalGuests = (day) => {
    const dailyReservations = getReservationsForDay(day);
    return dailyReservations.reduce((sum, res) => sum + res.number_of_people, 0);
  };
 // Fonction pour obtenir le nombre total de tables utilisées pour un jour donné
 const getTotalTables = (day) => {
  const dailyReservations = getReservationsForDay(day);

  // Afficher les réservations pour déboguer
  console.log("Réservations pour le jour", day, dailyReservations);

  return dailyReservations.reduce((sum, res) => {
    // Calculer le nombre de tables nécessaires pour chaque réservation
    const tablesNeeded = Math.ceil(res.number_of_people / 2);

    // Affichage de la somme en cours
    console.log(`Somme en cours pour les tables: ${sum} + ${tablesNeeded}`);

    return sum + tablesNeeded;
  }, 0);
};




  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  // Variables pour le swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false); // Pour éviter des comportements indésirables pendant un swipe

  const minSwipeDistance = 50; // Distance minimum pour un swipe valide

  const onTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsSwiping(true); // Indique qu'un swipe est en cours
  };

  const onTouchMove = (e) => {
    if (!touchStart || !isSwiping) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !isSwiping) return;

    const distance = touchEnd - touchStart;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance < 0) {
        // Swipe gauche, passer au jour suivant
        setSelectedDay((prev) => Math.min(prev + 1, getDaysInMonth(currentMonth)));
      } else {
        // Swipe droite, passer au jour précédent
        setSelectedDay((prev) => Math.max(prev - 1, 1));
      }
    }

    // Réinitialiser les valeurs de swipe après le déplacement
    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false); // Fin du swipe
  };

  // Empêcher la propagation de l'événement de swipe
  const onTouchCancel = () => {
    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false); // Annuler un swipe en cours si l'utilisateur interrompt l'action
  };

  return (
    <div>
      <div className="mt-16"></div>
      <div className="w-full mx-auto bg-white shadow-sm">
        {/* En-tête avec mois et navigation */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 text-black">
          <button onClick={() => navigateMonth('prev')} className="p-1">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-sm font-medium">
            {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => navigateMonth('next')} className="p-1">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Barre des jours (défilement horizontal) */}
        <div
          className="flex overflow-x-auto space-x-2 px-4 py-3 border-b"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
        >
          {generateDays().map((day) => (
        <button
        key={day}
        className={`relative flex flex-col items-center justify-center px-4 py-2 rounded-lg
          ${day === selectedDay ? 'bg-white-500 text-white' : 'bg-gray-100 text-black'}`}
        onClick={() => handleDaySelect(day)}
      >
        <span className="text-sm font-medium">{day}</span>
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
          ))}
        </div>

  {/* Liste des réservations */}
      <div className="px-4 py-2">
        {getReservationsForDay(selectedDay).length > 0 ? (
          <div className="space-y-2">
            {/* En-têtes des colonnes */}
            <div className="grid grid-cols-4 gap-4 font-semibold text-gray-600 py-2 border-b">
              <span className="text-sm text-center">Heure</span>
              <span className="text-sm text-center">Nom</span>
              <span className="text-sm text-center">Clients</span>
              <span className="text-sm text-center">Téléphone</span>
            </div>

            {/* Liste des réservations */}
            {getReservationsForDay(selectedDay).map((reservation) => (
              <div
                key={reservation.id}
                className="grid grid-cols-4 gap-4 py-2 border-b last:border-0 items-center"
              >
                {/* Heure */}
                <div className="flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {reservation.reservation_time}
                  </span>
                </div>

                {/* Nom de l'utilisateur */}
                <div className="flex flex-col items-center">
                  <span className="text-sm text-black">{reservation.user.lastname}</span>
                  <span className="text-sm text-black">{reservation.user.firstname}</span>
                </div>

                {/* Nombre de clients */}
                <div className="flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    <Users className="w-4 h-4 inline mr-1" />
                    {reservation.number_of_people}
                  </span>
                </div>

                {/* Numéro de téléphone */}
                <div className="flex flex-col items-center justify-end">
                  <span className="text-sm text-gray-600">{reservation.user.phone}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-2">
            Aucune réservation
          </p>
        )}
      </div>


      </div>
    </div>
  );
};
