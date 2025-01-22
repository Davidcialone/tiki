import React from 'react';
import { useAuth } from '../../auth/authContext';
import { ReservationsDashboard } from '../../components/dashboard/reservationsDashboard';
import { SearchDashboard } from '../../components/dashBoard/serachDashboard';

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Manager - {user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReservationsDashboard />
        <SearchDashboard />
      </div>
    </div>
  );
};

export default ManagerDashboard;
