import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchReservation } from "./searchReservation";
import { ReservationPage } from "../../../../client/src/components/customer/reservationPage";


export function ReservationsDashboard() {

    return (
        <div className="flex flex-col items-center">
             <div className="mb-16"></div>
             <div className="container mx-auto px-4 text-center p-4 m-2 border border-solid rounded-2xl ">
                 <ReservationPage />
            </div>

            <div className="container mx-auto px-4 text-center p-4 m-2 border border-solid rounded-2xl">
                <SearchReservation />
            </div>
        </div>
    );
}

