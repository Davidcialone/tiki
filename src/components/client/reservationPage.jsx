import React from "react";
import { CustomerView } from "./custumerView";
import { useState } from "react";

export function ReservationPage() {
    const [selectedZones, setSelectedZones] = useState([]);
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