import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../interface/footer";

export function RestaurantHomePage() {
  const [progress, setProgress] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    const simulateProgress = () => {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            setIsFetching(false); // Arrêter le chargement une fois à 100%
            return 100;
          }
          return prev + 1;
        });
      }, 50); // Réduit à 50ms pour une animation plus fluide
    };

    simulateProgress();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative font-sans text-gray-800 min-h-screen space-y-0">
      {isFetching ? (
        <div className="flex items-center justify-center h-screen bg-black bg-opacity-80">
          <div>
            <div className="relative w-64 h-4 bg-gray-400 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-white mt-4 text-lg text-center">
              Chargement en cours... {progress}%
            </p>
          </div>
        </div>
      ) : (
        <>
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
                  className="inline-block bg-white text-black px-6 py-2 m-3 rounded-lg text-lg font-medium border border-[var(--primary-color)] hover:bg-black hover:text-white hover:border-white transition duration-200 z-50 relative"
                >
                  Réserver une table
                </Link>
              </div>
            </div>
          </div>

          {/* Second Background Image */}
          <div className="relative w-full h-screen bg-[url('/restaurant.png')] bg-center bg-cover bg-no-repeat">
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
            <div className="absolute top-0 w-full text-center pt-12 z-20">
              <p className="text-[var(--text-color-secondary)] text-xs px-6 md:px-16 mx-auto leading-relaxed">
                Bienvenue à O Resto,<br />
                Votre destination pour des moments festifs et conviviaux. Situé à Meyzieu, notre
                restaurant vous offre une vue imprenable sur le lac et une ambiance chaleureuse.
                Venez déguster des plats raffinés et profiter de soirées inoubliables.
              </p>
            </div>
            <div className="absolute bottom-0 w-full text-center pb-12 z-20">
              <p className="text-[var(--text-color-secondary)] text-xs px-6 md:px-16 mx-auto leading-relaxed">
                Fondé pour célébrer la joie de vivre au bord de l'eau, O Resto est bien plus qu'un
                restaurant. C'est un lieu où la gastronomie rencontre une ambiance festive et
                conviviale.<br />
                Avec des braseros pour illuminer vos soirées, des musiques envoûtantes et des saveurs
                exquises, chaque visite O Resto est une expérience inoubliable.
              </p>
            </div>
          </div>

          {/* Highlights Section */}
          <section className="bg-black py-12 bg-opacity-90 p-4 m-0 border-none">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl text-white font-semibold mb-6">Pourquoi choisir O Resto ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 shadow-lg rounded-lg bg-[var(--background-color)] z-10">
                  <h3 className="text-[var(--text-color)] text-xl font-bold mb-2">Plats raffinés</h3>
                  <p className="text-[var(--text-color)]">
                    Des créations culinaires inspirées par les produits locaux et les saveurs du monde.
                  </p>
                  <img
                    src="/bruschetta.png"
                    alt="Plats raffinés O Resto"
                    className="rounded-lg shadow-xl w-full h-64 object-cover mx-auto"
                  />
                </div>
                <div className="p-6 shadow-lg rounded-lg bg-[var(--background-color)] z-10">
                  <h3 className="text-[var(--text-color)] text-xl font-bold">Ambiance chaleureuse</h3>
                  <p className="text-[var(--text-color)]">
                    Un lieu animé par des braseros, des soirées festives et des rencontres authentiques.
                  </p>
                  <img
                    src="restaurant2.png"
                    alt="Ambiance chaleureuse O Resto"
                    className="rounded-lg shadow-xl w-full h-64 object-cover mx-auto"
                  />
                </div>
                <div className="p-6 shadow-lg rounded-lg bg-[var(--background-color)] z-10">
                  <h3 className="text-[var(--text-color)] text-xl font-bold mb-2">Vue imprenable</h3>
                  <p className="text-[var(--text-color)]">
                    Admirez le lac tout en dégustant des plats dans un cadre idyllique.
                  </p>
                  <img
                    src="restaurant.png"
                    alt="Vue imprenable O resto"
                    className="rounded-lg shadow-xl w-full h-64 object-cover mx-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section className="bg-black bg-opacity-90 text-[var(--text-color)] py-16 shadow-lg p-4 m-0 border-none">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl text-white font-semibold mb-6">Événements Inoubliables</h2>
              <p className="text-lg text-white mb-6">
                O resto accueille vos événements avec style : mariages, anniversaires, soirées
                d'entreprise, ou fêtes entre amis. Laissez notre équipe transformer vos moments spéciaux
                en souvenirs mémorables.
              </p>
              <div className="flex justify-center mt-6 mb-6">
                <img
                  className="rounded-lg shadow-2xl w-full md:w-3/4 lg:w-1/2 h-80 object-cover z-20 border-4 border-white"
                  src="soiree.png"
                  alt="Événements festifs O Resto"
                />
              </div>
              <Link
                to="/events"
                className="inline-block bg-white text-black px-6 py-2 m-3 rounded-lg text-lg font-medium border border-[var(--primary-color)] hover:bg-black hover:text-white hover:border-white transition duration-200 z-50 relative"
              >
                Découvrir nos événements
              </Link>
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
