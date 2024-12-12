import React from "react";
import { NavBar } from "./navBar";
import { Link } from "react-router-dom";


export function HomePage() {
  return (

    <div className="font-aquatico text-2xl">
        <h1><strong>TIKI</strong>
         <p className="text-2xl">au bord de l'eau</p></h1>
       
        <p  className="text-lg p-4">Spot idéal pour apprécier les plus beaux couchers de soleil , à seulement 20 minutes du centre de Lyon. </p>
       
        <p className="text-xl p-2 font-bold border border-white bg-customRed"> Nous sommes ouvert tout l'hiver . </p>
        <div className="flex items-center justify-center p-4">
          <img src="2024-04-27.jpg" alt="" />
        </div>
        
        <Link 
        to="/reservation"
        className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
         <button className=" bg-customRed">Réserver une table</button>
         </Link>

    </div>
    );

}