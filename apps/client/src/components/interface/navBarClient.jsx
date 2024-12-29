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
    <nav className="bg-gradient-to-b from-[#3f1010] to-[#814646] text-white py-2 bg-opacity-60 relative z-50">
      <div className="absolute inset-0 bg-[url('/logo.jpg')] bg-center opacity-5 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Bouton du menu mobile */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
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
          {/* Logo */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex items-center">
              <img src="logo.jpg" alt="Logo" className="h-14 w-auto object-contain" />
            </Link>
          </div>
          {/* Liens pour grand écran */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Accueil
              </Link>
              <Link
                to="/reservations"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Réserver
              </Link>
              <Link
                to="/menus"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Carte
              </Link>
              <Link
                to="/opening"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Ouverture
              </Link>
              <Link
                to="/location"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Localisation
              </Link>
              <Link
                to="/contact"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`sm:hidden fixed inset-0 bg-[#3f1010] bg-opacity-95 transition-transform transform ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="px-4 pt-4 pb-4 space-y-4">
          <Link
            to="/"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Accueil
          </Link>
          <Link
            to="/reservations"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Réserver
          </Link>
          <Link
            to="/menus"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Carte
          </Link>
          <Link
            to="/opening"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Ouverture
          </Link>
          <Link
            to="/location"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Localisation
          </Link>
          <Link
            to="/contact"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </nav>
  );
}
