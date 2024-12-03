import React from "react";
import { CustomerView } from "./custumerView";

export function ReservationPage() {
    return (
        <div>
        <h1>Réservation</h1>
           
        Sélectionnez les zones ou vous souhaiteriez manger :
        <CustomerView />

        Une fois vos zones sélectionnées , cliquez sur ce bouton  :
        <button>Réserver</button>

    </div>

    );
}