import React from "react";
import { Link } from "react-router-dom";
import { RestaurantLayout } from "../restaurantLayout";

export function TablesDashBoard() {
    return (
        <div>
        <h1 className="p-4">Gestion</h1>
        <p className="p-4">Vous pouvez gérer les réservations et les tables de votre restaurant à partir de cette page.</p>

        <button className="m-2 ">
      <Link to="/restaurantLayout">Zones Tables</Link>
    </button>
        <button className="m-2 "><Link>Réservations</Link></button>
        <button className="m-2 "><Link>Statistiques</Link></button>
        
        <RestaurantLayout/>

        </div>
    );
    }