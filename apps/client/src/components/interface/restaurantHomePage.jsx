import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';

export function RestaurantHomePage() {
  return (
    <div className="relative font-sans text-gray-800 min-h-screen space-y-0">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/logo.jpg')] bg-center opacity-5 z-0"></div>

      {/* Hero Section */}
      <div className="bg-[var(--background-color)] bg-opacity-90 text-[var(--text-color)] py-16 p-4 text-center m-0 border-none">
        <h1 className="text-[var(--text-color)] text-4xl font-bold">Bienvenue dans un cadre incroyable</h1>
        <p className="text-[var(--text-color)] mt-4">
          Profitez d'une vue magnifique sur le Grand Large et d'une ambiance festive au Tiki.
        </p>
      </div>

      {/* Welcome Section */}
      <section className="bg-[var(--background-color)] bg-opacity-90 mx-auto text-center p-4 m-0 border-none">
        <p className="text-[var(--text-color)] text-lg mb-6 px-6 md:px-16 mx-auto leading-relaxed">
          Bienvenue au Tiki au Bord de l'Eau, votre destination pour des moments festifs et
          conviviaux. Situé à Meyzieu, notre restaurant vous offre une vue imprenable sur le Grand
          Large et une ambiance chaleureuse.
        </p>
        <div className="flex justify-center">
          <img
            src="002-lac-terrasse-restaurant-au-bord-de-l'eau-decines.jpg"
            alt="Vue du restaurant au bord de l'eau"
            className="rounded-lg shadow-2xl w-full md:w-3/4 lg:w-1/2 h-80 z-10 mb-4 object-cover"
          />
        </div>
      </section>

      {/* History Section */}
      <section className="bg-[var(--background-color)] bg-opacity-90 text-[var(--text-color)] py-16 shadow-lg p-4 m-0 border-none">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-6">Notre Histoire</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Fondé pour célébrer la joie de vivre au bord de l'eau, le Tiki est bien plus qu'un
            restaurant. C'est un lieu où la gastronomie rencontre une ambiance festive et
            conviviale.
          </p>
          <p className="text-lg max-w-3xl mx-auto">
            Avec des braseros pour illuminer vos soirées, des musiques envoûtantes et des saveurs
            exquises, chaque visite au Tiki est une expérience inoubliable.
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-[var(--background-color)] py-12 bg-opacity-90 p-4 m-0 border-none">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-6">Pourquoi choisir le Tiki ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-[var(--background-color)] z-10">
              <h3 className="text-[var(--text-color)] text-xl font-bold mb-2">Plats raffinés</h3>
              <p className="text-[var(--text-color)]">
                Des créations culinaires inspirées par les produits locaux et les saveurs du monde.
              </p>
              <img
                src="2024-05-02.jpg"
                alt="Plats raffinés au Tiki"
                className="rounded-lg shadow-xl w-full h-64 object-cover mx-auto"
              />
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-[var(--background-color)] z-10">
              <h3 className="text-[var(--text-color)] text-xl font-bold ">Ambiance chaleureuse</h3>
              <p className="text-[var(--text-color)]">
                Un lieu animé par des braseros, des soirées festives et des rencontres authentiques.
              </p>
              <img
                src="2024-12-09 (1).jpg"
                alt="Ambiance chaleureuse au Tiki"
                className="rounded-lg shadow-xl w-full h-64 object-cover mx-auto"
              />
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-[var(--background-color)] z-10">
              <h3 className="text-[var(--text-color)] text-xl font-bold mb-2">Vue imprenable</h3>
              <p className="text-[var(--text-color)]">
                Admirez le Grand Large tout en dégustant des plats dans un cadre idyllique.
              </p>
              <img
                src="2024-12-09.jpg"
                alt="Vue imprenable au Tiki"
                className="rounded-lg shadow-xl w-full h-64 object-cover mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-[var(--background-color)] bg-opacity-90 text-[var(--text-color)] py-16 shadow-lg p-4 m-0 border-none">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-6">Événements Inoubliables</h2>
          <p className="text-lg mb-6">
            Le Tiki accueille vos événements avec style : mariages, anniversaires, soirées
            d'entreprise, ou fêtes entre amis. Laissez notre équipe transformer vos moments spéciaux
            en souvenirs mémorables.
          </p>
          <div className="flex justify-center mt-6">
            <img
              className="rounded-lg shadow-2xl w-full md:w-3/4 lg:w-1/2 h-80 object-cover z-20"
              src="téléchargement.jpg"
              alt="Événements festifs au Tiki"
            />
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="bg-[var(--background-color)] bg-opacity-90 py-12 p-4 m-0 border-none">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Réservez une soirée magique</h2>
          <p className="mb-6">
            Profitez de l'ambiance festive et d'un cadre exceptionnel. Réservez votre table
            maintenant !
          </p>
          <Link
            to="/reservations"
            className="inline-block bg-[var(--primary-color)] bg-opacity-30 text-[var(--text-color-secondary)] px-6 py-3 rounded-lg text-lg font-medium border border-[var(--primary-color)] hover:bg-[var(--accent-color)] transition duration-200 z-50 relative"
          >
            Réserver une table
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[var(--footer-background)] text-[var(--footer-text)] py-8 m-0 border-none">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Tiki au Bord de l'Eau. Tous droits réservés.</p>
          <p className="text-sm mt-2">123 Quai du Grand Large, Meyzieu, France</p>
        </div>
      </footer>
    </div>
  );
}
