import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./footer";
import { activateDatabase } from "../../api/databaseApi";
import '../../App.css';

export function RestaurantHomePage() {
  const [isFetching, setIsFetching] = useState(true); // État pour surveiller la requête

  useEffect(() => {
    const fetchDatabase = async () => {
      try {
        await activateDatabase(); // Assurez-vous que l'import est correct
      } catch (error) {
        console.error("Erreur lors de l'activation de la base de données :", error);
      } finally {
        setIsFetching(false); // Met à jour l'état une fois la requête terminée
      }
    };
  
    fetchDatabase();
  }, []);
  

  return (
    <div className="relative font-sans text-gray-800 min-h-screen space-y-0">
      {isFetching ? (
        <div className="flex items-center justify-center h-screen bg-black bg-opacity-80">
          <div>
            <div className="relative w-64 h-4 bg-gray-400 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 animate-loading"></div>
            </div>
            <p className="text-white mt-4 text-lg text-center">Chargement en cours...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Votre contenu existant */}
          <div className="relative w-full h-screen bg-[url('/restaurant2.png')] bg-center bg-cover bg-no-repeat z-0">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 flex items-center justify-center w-full h-full text-center">
              <div className="text-[var(--text-color-secondary)] px-8 py-6">
                <h1 className="text-4xl font-bold">O Resto</h1>
                <p className="mt-4 text-lg">
                  Profitez d'une vue magnifique au bord du lac et d'une ambiance festive chez O resto.
                </p>
                <Link
                  to="/reservations"
                  className="inline-block bg-white text-black px-6 py-2 m-3 rounded-lg text-lg font-medium border border-[var(--primary-color)] hover:bg-black  hover:text-white hover:border-white transition duration-200 z-50 relative"
                >
                  Réserver une table
                </Link>
              </div>
            </div>
          </div>
          {/* Le reste de vos sections ici */}
          <Footer />
        </>
      )}
    </div>
  );
}
