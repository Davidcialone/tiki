import React from "react";
import { CustomerView } from "./custumerView";

export function ReservationPage() {
    return (
        <div>
        <h1>Réservation</h1>
        <p>Vous pouvez réserver une table pour un maximum de 5 personnes. Pour réserver une table, veuillez cliquer sur
        le bouton "Réserver une table" ci-dessous.</p>
        <button>Réserver une table</button>
        <CustomerView />

    </div>

    );
}