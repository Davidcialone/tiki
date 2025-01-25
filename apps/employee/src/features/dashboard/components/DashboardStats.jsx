import React from 'react';
import { useReservationStats } from '../../reservations/hooks/useReservationStats';

export function DashboardStats() {
  const { totalReservations, totalCovers, loading, error } = useReservationStats();

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Date</h3>
        <p className="text-2xl font-bold text-blue-600">
          {loading ? "..." : new Date().toLocaleDateString()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Réservations du jour</h3>
        <p className="text-2xl font-bold text-blue-600">
          {loading ? "..." : totalReservations}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Couverts</h3>
        <p className="text-2xl font-bold text-green-600">
          {loading ? "..." : totalCovers}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Taux d'occupation</h3>
        <p className="text-2xl font-bold text-orange-600">
          {loading ? "..." : `${Math.round((totalCovers / 100) * 100)}%`}
        </p>
      </div>
    </div>
  );
}
