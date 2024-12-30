import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function NavBarClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
<nav className="absolute inset-0 text-white p-4 m-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      {/* Bouton du menu mobile */}
      <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white hover:text-gray-300 focus:outline-none"
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
      <div className="hidden sm:block sm:ml-6">
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            Accueil
          </Link>
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

  {/* Menu mobile */}
  {mobileMenuOpen && (
    <div className="sm:hidden fixed inset-0 z-40 flex flex-col items-center justify-center space-y-4">
      <button
        onClick={closeMenu}
        className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
      >
        <span className="sr-only">Close main menu</span>
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <Link
        to="/"
        className="text-white text-lg hover:text-gray-300"
        onClick={closeMenu}
      >
        Accueil
      </Link>
      <Link
        to="/reservations"
        className="text-white text-lg hover:text-gray-300"
        onClick={closeMenu}
      >
        Réserver
      </Link>
      <Link
        to="/menus"
        className="text-white text-lg hover:text-gray-300"
        onClick={closeMenu}
      >
        Carte
      </Link>
      <Link
        to="/opening"
        className="text-white text-lg hover:text-gray-300"
        onClick={closeMenu}
      >
        Ouverture
      </Link>
      <Link
        to="/location"
        className="text-white text-lg hover:text-gray-300"
        onClick={closeMenu}
      >
        Localisation
      </Link>
      <Link
        to="/contact"
        className="text-white text-lg hover:text-gray-300"
        onClick={closeMenu}
      >
        Nous contacter
      </Link>
    </div>
      )}
    </nav>
  );
}

