import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link from react-router-dom for routing

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-red-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
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
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex items-center">
              <img src="logo.jpg" alt="Logo" className="h-14 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Accueil
              </Link>
              <Link
                to="/reservations"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Réserver
              </Link>
              <Link
                to="/dashboard"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Gestion
              </Link>
              <Link
                to="/connexion"
                className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
              to="/"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/reservations"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Réserver
            </Link>
            <Link
              to="/dashboard"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Gestion
            </Link>
            <Link
              to="/connexion"
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
