import React from 'react';
import { useAuth } from '../../auth/authContext';
import { ReservationsViews } from '../../components/dashboard/reservations/reservationsViews';
import { PlanningPage } from '../../components/dashBoard/worker/plannigPage';
import { ClientSearch } from '../../components/dashboard/clients/clientSearch';

const WorkerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord - {user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReservationsViews />
        <PlanningPage />
        <ClientSearch />
      </div>
    </div>
  );
};

export default WorkerDashboard;
