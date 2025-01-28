import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function NavBarClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarBackground, setNavbarBackground] = useState('rgba(0, 0, 0, 0.8)'); // Opacité de base

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Gérer la visibilité lors du défilement
      if (scrollPosition === 0) {
        // Au top de la page
        setNavbarBackground('rgba(0, 0, 0, 0.8)'); // Opacité fixe en haut
        setIsVisible(true);
      } else {
        // Pendant le scroll
        setNavbarBackground('rgba(0, 0, 0, 0.9)'); // Opacité plus forte pendant le scroll
        
        if (scrollPosition > lastScrollY && !mobileMenuOpen) {
          setIsVisible(false); // Cache la navbar quand on scroll vers le bas
        } else {
          setIsVisible(true); // Montre la navbar quand on scroll vers le haut
        }
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
        backgroundColor: navbarBackground,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', // Pour Safari
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="relative flex items-center justify-between h-16">
          {/* Bouton du menu mobile */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none bg-transparent"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6 text-white"
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

          {/* Logo */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex items-center">
              <img
                src="logo.jpg"
                alt="Logo"
                className="h-14 w-14 object-contain border-2 border-white rounded-full"
              />
            </Link>
          </div>

          {/* Liens pour grand écran */}
          <div className="hidden sm:block sm:ml-6 ">
            <div className="flex space-x-4">
              <Link
                to="/reservations"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Réserver
              </Link>
              <Link
                to="/menus"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Carte
              </Link>
              <Link
                to="/events"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Evenements
              </Link>
              <Link
                to="/opening"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Ouverture
              </Link>
              <Link
                to="/location"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Localisation
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

          {mobileMenuOpen && (
      <div
        className="fixed inset-0 w-full min-h-screen bg-black bg-opacity-90 flex flex-col items-center justify-start space-y-4 py-4 transition-all duration-300 z-50"
        onClick={toggleMenu}
      >
        <Link to="/reservations" className="text-white text-lg hover:text-gray-300">
          Réserver
        </Link>
        <Link to="/menus" className="text-white text-lg hover:text-gray-300">
          Carte
        </Link>
        <Link to="/events" className="text-white text-lg hover:text-gray-300">
          Evenements
        </Link>
        <Link to="/opening" className="text-white text-lg hover:text-gray-300">
          Ouverture
        </Link>
        <Link to="/location" className="text-white text-lg hover:text-gray-300">
          Localisation
        </Link>
        <Link to="/contact" className="text-white text-lg hover:text-gray-300">
          Nous contacter
        </Link>
      </div>
    )}
    </nav>
  );
}
