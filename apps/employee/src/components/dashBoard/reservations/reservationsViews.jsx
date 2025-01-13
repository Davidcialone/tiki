import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Table } from 'lucide-react';
import { getReservations } from "../../../api/reservationApi";

export const ReservationsViews = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newDate);
    setSelectedDay(new Date(newDate.getFullYear(), newDate.getMonth(), 1)); // Réinitialise au premier jour
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

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

  const handleArrivalToggle = (reservationId) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId ? { ...res, arrived: !res.arrived } : res
      )
    );
  };

  const handleDeleteReservation = (reservationId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
      // Ajoutez ici l'appel API pour supprimer la réservation côté serveur.
    }
  };

  const handleDaySelect = (day) => {
    setSelectedDay(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  // Swipe logic for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchEnd - touchStart;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance < 0) {
        // Swipe left: Go to next day
        const nextDay = new Date(selectedDay);
        nextDay.setDate(selectedDay.getDate() + 1);

        // Ensure day doesn't exceed month bounds
        if (nextDay.getMonth() === currentMonth.getMonth()) {
          setSelectedDay(nextDay);
        }
      } else {
        // Swipe right: Go to previous day
        const prevDay = new Date(selectedDay);
        prevDay.setDate(selectedDay.getDate() - 1);

        // Ensure day doesn't go below the first day
        if (prevDay.getMonth() === currentMonth.getMonth()) {
          setSelectedDay(prevDay);
        }
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

// Fonction pour déterminer la couleur en fonction du nombre de personnes
const changeColorOver = (numberOfPeople) => {
  const baseColors = {
    small: 'bg-green-100 dark:bg-green-300',  // 1-2 personnes
    medium: 'bg-yellow-100 dark:bg-yellow-300', // 3-4 personnes
    large: 'bg-orange-100 dark:bg-orange-300', // 5-6 personnes
    xlarge: 'bg-red-100 dark:bg-red-300'      // 7+ personnes
  };

  if (numberOfPeople <= 2) return baseColors.small;
  if (numberOfPeople <= 4) return baseColors.medium;
  if (numberOfPeople <= 6) return baseColors.large;
  return baseColors.xlarge;
};

  return (
    <div>
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

        <div
          className="flex overflow-x-auto space-x-2 px-4 py-3 border-b"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {generateDays().map((day) => {
            const hasReservations = getReservationsForDay(day).length > 0;
            return (
              <button
                key={day}
                className={`relative flex flex-col items-center justify-center px-4 py-2 rounded-lg
                  ${day === selectedDay.getDate() ? 'bg-green-500 text-white' : 'bg-gray-100 text-black'}`}
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
              <div className="flex flex-wrap items-center justify-between py-2 border-b font-semibold text-gray-600">
                <span className="text-sm w-1/5 text-center">Heure</span>
                <span className="text-sm w-1/5 text-center">Nom</span>
                <span className="text-sm w-1/5 text-center">Clients</span>
                <span className="text-sm w-1/5 text-center">Téléphone</span>
                <span className="text-sm w-1/5 text-center">Actions</span>
              </div>
              {getReservationsForDay(selectedDay.getDate()).map((reservation) => (
             
             <div
             key={reservation.id}
             className={`
               flex flex-wrap items-center py-2 border-b last:border-0
               ${changeColorOver(reservation.number_of_people)}
               ${reservation.arrived ? 'brightness-75' : 'brightness-100'}
             `}
           >
                  <div className="w-1/5 flex items-center justify-center">
                    <span className="text-sm text-gray-600">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {reservation.reservation_time}
                    </span>
                  </div>
                  <div className="w-1/5 flex  items-center justify-center">
                    <span className="text-sm text-black">{reservation.user.lastname}</span>
                    <span className="text-sm text-black ml-2">{reservation.user.firstname}</span>
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    <Users className="w-4 h-4 inline mr-1" />
                    {reservation.number_of_people}
                  </span>

                  </div>
                  <div className="w-1/5 flex  items-center justify-center">
                    <span className="text-sm text-gray-600">{reservation.user.phone}</span>
                  </div>
                  <div className="w-1/5 flex justify-end space-x-2 items-center">
                    <button
                      className={`p-1 rounded-full ${reservation.arrived ? 'bg-green-500' : 'bg-gray-300'}`}
                      onClick={() => handleArrivalToggle(reservation.id)}
                      title="Marquer comme arrivé"
                    >
                      ✓
                    </button>
                    <button
                      className="p-1 bg-red-800 text-white rounded-full"
                      onClick={() => handleDeleteReservation(reservation.id)}
                      title="Supprimer la réservation"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">Aucune réservation</p>
          )}
        </div>
      </div>
    </div>
  );
};
