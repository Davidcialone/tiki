import { useState, useEffect } from 'react';
import { getReservationsByDate } from '../../../api/reservationApi';

export function useReservationStats() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalCovers: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const reservations = await getReservationsByDate(today);
        
        setStats({
          totalReservations: reservations.length,
          totalCovers: reservations.reduce((total, res) => total + res.number_of_people, 0),
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Erreur lors du chargement des réservations", error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: "Erreur lors du chargement des réservations"
        }));
      }
    };

    fetchReservations();
  }, []);

  return stats;
}
