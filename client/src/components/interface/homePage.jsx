import React from "react";
import { NavBar } from "./navBar";


export function HomePage() {
  return (

    <div className="font-aquatico text-2xl">
        <h1><strong>TIKI</strong> <p>au bord de l'eau</p></h1>
       
        <p>Spot idéal pour apprécier les plus beaux couchers de soleil , à seulement 20 minutes du centre de Lyon. </p>
       
        <p>  Nous sommes ouverts tout l'hiver . </p>
        <div className="flex items-center justify-center p-4">
          <img src="2024-12-09 (3).jpg" alt="" />
        </div>
        
         <button>Réserver une table</button>

    </div>
    );

}