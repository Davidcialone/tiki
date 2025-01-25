import React, { useState, useEffect, useMemo } from 'react';
import { format, parseISO, startOfDay, getDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { fr } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getReservations } from '../../../api/reservationApi';

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const CoversStatistics = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [period, setPeriod] = useState('jour'); // Options: jour, semaine, mois, année
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur de récupération des réservations:', error);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    switch (period) {
      case 'semaine':
        setSelectedStartDate(startOfWeek(new Date(), { locale: fr }));
        setSelectedEndDate(endOfWeek(new Date(), { locale: fr }));
        break;
      case 'mois':
        setSelectedStartDate(startOfMonth(new Date()));
        setSelectedEndDate(endOfMonth(new Date()));
        break;
      case 'année':
        setSelectedStartDate(startOfYear(new Date()));
        setSelectedEndDate(endOfYear(new Date()));
        break;
      default:
        setSelectedStartDate(new Date());
        setSelectedEndDate(new Date());
        break;
    }
  }, [period]);

  // Filtrer les réservations par date et statut "confirmed"
  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => {
      const reservationDate = parseISO(reservation.reservation_date);
      return (
        reservation.status === 'confirmed' && // Filtrer par statut "confirmed"
        reservationDate >= startOfDay(selectedStartDate) &&
        reservationDate <= startOfDay(selectedEndDate)
      );
    });
  }, [reservations, selectedStartDate, selectedEndDate]);

  // Calculer les couverts par jour de la semaine
  const coversByDayOfWeek = useMemo(() => {
    const covers = Array(7).fill(0);
    filteredReservations.forEach(reservation => {
      const reservationDate = parseISO(reservation.reservation_date);
      const day = getDay(reservationDate); // 0 (dimanche) -> 6 (samedi)
      covers[day] += reservation.number_of_people;
    });
    return covers;
  }, [filteredReservations]);

  // Calculer le total des couverts
  const totalCovers = useMemo(() => {
    return filteredReservations.reduce((total, reservation) => total + reservation.number_of_people, 0);
  }, [filteredReservations]);

  // Données pour le graphique
  const chartData = useMemo(() => {
    return {
      labels: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      datasets: [
        {
          label: 'Couverts',
          data: coversByDayOfWeek,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [coversByDayOfWeek]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Couverts par jour de la semaine',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Jour de la semaine',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Nombre de couverts',
          },
          beginAtZero: true,
        },
      },
    };
  }, []);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      {/* Sélection des filtres */}
      <div className="mb-4 flex items-center">
        <label className="mr-2">Période:</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border p-2 rounded mr-4"
        >
          <option value="jour">Aujourd'hui</option>
          <option value="semaine">Cette semaine</option>
          <option value="mois">Ce mois</option>
          <option value="année">Cette année</option>
        </select>
        <label className="mr-2">Date de début:</label>
        <DatePicker
          selected={selectedStartDate}
          onChange={(date) => setSelectedStartDate(date)}
          dateFormat="dd/MM/yyyy"
          locale={fr}
          className="border p-2 rounded mr-4"
        />
        <label className="mr-2">Date de fin:</label>
        <DatePicker
          selected={selectedEndDate}
          onChange={(date) => setSelectedEndDate(date)}
          dateFormat="dd/MM/yyyy"
          locale={fr}
          className="border p-2 rounded"
        />
      </div>

      {/* Graphique */}
      <div className="mb-6">
  <Bar
    data={chartData}
    options={{
      ...chartOptions,
      responsive: true,
      maintainAspectRatio: false, // Permet de gérer les dimensions
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Couverts par jour de la semaine',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Jour de la semaine',
          },
          ticks: {
            font: {
              size: 10, // Ajuste la taille des ticks
            },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Nombre de couverts',
          },
          ticks: {
            font: {
              size: 10, // Ajuste la taille des ticks
            },
            beginAtZero: true,
          },
        },
      },
    }}
    height={250} // Ajuste la hauteur du graphique
  />
</div>


      {/* Résumé et détails */}
      <div className="flex mb-4 space-x-6">
        {/* Résumé - Colonne plus petite */}
        <div className="w-1/5 p-4 bg-gray-50 rounded-lg shadow-md text-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Résumé</h3>
          <p className="text-gray-700 text-xl">
            Total des couverts : <span className="font-bold text-green-700">{totalCovers}</span>
          </p>
        </div>

        {/* Détails par jour - Colonne plus large */}
        <div className="w-4/5 p-4 bg-gray-50 rounded-lg shadow-lg text-sm">
  <h3 className="font-semibold text-gray-800 mb-4 text-xl">Détails par jour</h3>
  <div className="grid grid-cols-1 sm:grid-cols-7 lg:grid-cols-7 gap-2">
    {['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((day, index) => (
      <div
        key={index}
        className={`flex flex-col items-center p-2 rounded-lg shadow-md ${
          coversByDayOfWeek[index] > 50
            ? 'bg-green-100 text-green-800'
            : coversByDayOfWeek[index] > 30
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        } transition-all duration-300`}
      >
        {/* Nom du jour */}
        <span className="font-medium text-lg mb-1">{day}</span>
        {/* Nombre de couverts */}
        <span className="font-semibold text-sm">{coversByDayOfWeek[index]} couverts</span>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};
