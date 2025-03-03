import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function NavBarEmployee() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Visibilité de la navbar
  const [lastScrollY, setLastScrollY] = useState(0); // Suivi de la position du défilement
  const [navbarOpacity, setNavbarOpacity] = useState(0); // Opacité de la navbar (commence transparente)

useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
  
      // Calcul de l'opacité
      const opacity = Math.min(scrollPosition / 300, 0.7);
      setNavbarOpacity(opacity);
  
      // Si on est tout en haut, afficher toujours la navbar
      if (scrollPosition === 0) {
        setIsVisible(true);
        return;
      }
  
      // Gérer la visibilité lors du défilement
      if (scrollPosition > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
  
      setLastScrollY(scrollPosition);
  
      // Fermer le menu mobile si l'utilisateur fait défiler
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, mobileMenuOpen]);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${navbarOpacity})`, // Exemple d'un fond transparent ou noir avec opacité dynamique
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo à gauche */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex items-center">
              <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                <img
                  src="logo.jpg"
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Menu burger à droite pour petits écrans */}
          <div className="absolute right-0 sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white-400 hover:text-white focus:outline-none focus:ring-2 bg-transparent focus:ring-white focus:ring-opacity-75"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Menu pour grands écrans */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
            <Link
                to="/reservations"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                réservation
              </Link>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Gestion
              </Link>
              <Link
                to="/search"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Recherches
              </Link>
              <Link
                to="/plannings"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Plannings
              </Link>
             
           
              <Link
                to="/login"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile qui se déploie sous la navbar */}
      {mobileMenuOpen && (
        <div
          className="sm:hidden fixed top-16 left-0 w-full bg-black bg-opacity-30 flex flex-col items-center justify-start space-y-4 py-4 transition-all duration-300"
          onClick={toggleMenu}
        >
          <Link
            to="/"
            className="text-white text-lg hover:text-gray-300"
            onClick={toggleMenu}
          >
            Accueil
          </Link>
          <Link
            to="/reservations"
            className="text-white text-lg hover:text-gray-300"
            onClick={toggleMenu}
          >
            Réservations
          </Link>
          <Link
            to="/plannings"
            className="text-white text-lg hover:text-gray-300"
            onClick={toggleMenu}
          >
            Plannings
          </Link>
          <Link
            to="/dashboard"
            className="text-white text-lg hover:text-gray-300"
            onClick={toggleMenu}
          >
            Gestion
          </Link>
          <Link
            to="/login"
            className="text-white text-lg hover:text-gray-300"
            onClick={toggleMenu}
          >
            Connexion
          </Link>
        </div>
      )}
    </nav>
  );
}
