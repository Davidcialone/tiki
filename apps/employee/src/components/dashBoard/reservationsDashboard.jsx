import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReservationSearch } from "./reservations/reservationsSearch";
import { ReservationPageWorker } from "./reservations/reservationPageWorker";
import { ClientSearch } from "../dashBoard/clients/clientSearch";

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

            <div className="container mx-auto px-4 text-center p-4 m-2 border border-solid rounded-2xl">
                <ReservationSearch />
            </div>

            <div className="container mx-auto px-4 text-center p-4 m-2 border border-solid rounded-2xl">
                <ClientSearch />
            </div>
        </div>
        </div>
    );
}


