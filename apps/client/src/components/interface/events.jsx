import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

export function Events() {
  const events = [
    {
      id: 1,
      title: "Soirée Concert",
      photo: "event4.png",
      date: "2025-01-20",
      description: "Profitez d'une soirée concert avec des artistes locaux.",
    },
    {
      id: 2,
      title: "Dîner à thème italien",
      photo: "event.png",
      date: "2025-02-10",
      description: "Découvrez les saveurs de l'Italie avec un menu spécial.",
    },
    {
      id: 3,
      title: "Atelier de cuisine",
      photo: "event2.png",
      date: "2025-03-05",
      description: "Apprenez à préparer des plats raffinés avec notre chef.",
    },
    {
      id: 4,
      title: "Soirée St Valentin",
      photo: "event3.png",
      date: "2025-02-14",
      description: "Célébrez la St Valentin avec un dîner romantique.",
    },
  ];

  return (
    <div className="relative font-sans text-gray-800 min-h-screen space-y-0">
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-[url('/events-hero.jpg')] bg-center bg-cover bg-no-repeat z-0">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full text-center">
          <div className="text-[var(--text-color-secondary)] px-8 py-6">
            <h1 className="text-4xl font-bold">Événements Chez O Resto</h1>
            <p className="mt-4 text-lg">
              Découvrez nos événements spéciaux qui rendent chaque moment mémorable.
            </p>
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <section className="bg-black bg-opacity-90 py-12 p-4">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-white font-semibold mb-6 text-center">À venir</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative shadow-lg rounded-lg overflow-hidden group"
              >
                <img
                  src={event.photo}
                  alt={event.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Date : </strong>
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  <Link
                    to="/reservations"
                    className="inline-block bg-white text-black px-4 py-2 rounded-lg text-lg font-medium border border-white hover:bg-black hover:text-white hover:border-white transition duration-200"
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-[var(--footer-text)] py-8 m-0 border-white border-solid border-t-2">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2025 O Resto. Tous droits réservés.</p>
          <p className="text-sm mt-2">123 Quai du Lac, Meyzieu, France</p>
        </div>
      </footer>
    </div>
  );
}
