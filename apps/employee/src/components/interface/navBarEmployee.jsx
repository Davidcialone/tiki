import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link from react-router-dom for routing

export function NavBarEmployee() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-red-800 shadow-md rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14">
          {/* Logo à gauche */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* Logo dans un cercle avec une bordure blanche */}
              <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                <img
                  src="logo.jpg"
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Menu burger à droite */}
          <div className="absolute right-0 sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

          {/* Menu principal pour les écrans plus larges */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-xl text-sm font-medium"
              >
                Accueil
              </Link>
              <Link
                to="/reservations"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-xl text-sm font-medium"
              >
                Réservations
              </Link>
              <Link
                to="/clients"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-xl text-sm font-medium"
              >
                Clients
              </Link>
              <Link
                to="/plannings"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-xl text-sm font-medium"
              >
                Plannings
              </Link>
              <Link
                to="/dashboard"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-xl text-sm font-medium"
              >
                Gestion
              </Link>
              <Link
                to="/login"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-xl text-sm font-medium"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle visibility based on mobileMenuOpen state */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/reservations"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Réservations
            </Link>
            <Link
              to="/clients"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Clients
            </Link>
            <Link
              to="/plannings"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Plannings
            </Link>
            <Link
              to="/dashboard"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Gestion
            </Link>
            <Link
              to="/login"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Connexion
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
