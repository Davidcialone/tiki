import React, { useState } from "react";
import { ReservationPageWorker } from "./reservations/reservationPageWorker";


export function ReservationsDashboard() {

    return (
        <div>
            <div className="mb-16"></div>
        <h2>Voici la page de gestion des réservations</h2>
        <div className="flex flex-col items-center">
             <div className="mb-16"></div>
             <div className="container mx-auto px-4 text-center p-4 m-2 border border-solid rounded-2xl ">
                 <ReservationPageWorker />
            </div>
          </div>
        </div>
    );
}
