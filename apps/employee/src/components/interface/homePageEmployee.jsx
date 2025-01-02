import React from "react";
import { Link } from "react-router-dom";



export function HomePageEmployee() {
  return (

    <div className="font-Asap  text-2xl m-4">
        <h2>TIKI employés</h2>
        
        <p  className="text-lg p-4 mt-4 mb-4">Bienvenue sur l'interface de gestion des employés. </p>
             
        <div className="flex items-center justify-center p-4">
          <img src="2024-04-27.jpg" alt="" />
        </div>

        <Link
        to="/plannings"
        className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal"
        >
        <button className=" bg-customRed">Voir les plannings</button>
        </Link>

    </div>
    );

}