import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTable, FaClipboardList, FaUsers, FaChartBar, FaCog } from "react-icons/fa";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barre latérale */}
      <div className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-8">Tableau de bord</h2>
          <nav>
            <ul className="space-y-4">
              {/* Menu principal */}
              <li>
                <Link
                  to="/home"
                  className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 ${activeSection === "home" && "bg-gray-700"}`}
                  onClick={() => setActiveSection("home")}
                >
                  <FaHome className="text-xl" />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/reservations"
                  className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 ${activeSection === "reservations" && "bg-gray-700"}`}
                  onClick={() => setActiveSection("reservations")}
                >
                  <FaClipboardList className="text-xl" />
                  <span>Réservations</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tables"
                  className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 ${activeSection === "tables" && "bg-gray-700"}`}
                  onClick={() => setActiveSection("tables")}
                >
                  <FaTable className="text-xl" />
                  <span>Tables</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 ${activeSection === "menu" && "bg-gray-700"}`}
                  onClick={() => setActiveSection("menu")}
                >
                  <FaClipboardList className="text-xl" />
                  <span>Menu</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/personnel"
                  className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 ${activeSection === "personnel" && "bg-gray-700"}`}
                  onClick={() => setActiveSection("personnel")}
                >
                  <FaUsers className="text-xl" />
                  <span>Personnel</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 ${activeSection === "analytics" && "bg-gray-700"}`}
                  onClick={() => setActiveSection("analytics")}
                >
                  <FaChartBar className="text-xl" />
                  <span>Analyse et Statistiques</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 ${activeSection === "settings" && "bg-gray-700"}`}
                  onClick={() => setActiveSection("settings")}
                >
                  <FaCog className="text-xl" />
                  <span>Paramètres</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-8">
        {activeSection === "home" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Vue d'ensemble des KPI</h3>
            {/* Contenu d'Accueil ici (graphique, indicateurs, etc.) */}
          </div>
        )}

        {activeSection === "reservations" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Réservations</h3>
            {/* Afficher les détails des réservations ici */}
          </div>
        )}

        {activeSection === "tables" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Gestion des Tables</h3>
            {/* Afficher la gestion des tables ici */}
          </div>
        )}

        {activeSection === "menu" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Menu</h3>
            {/* Afficher les informations du menu ici */}
          </div>
        )}

        {activeSection === "personnel" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Gestion du Personnel</h3>
            {/* Afficher la gestion du personnel ici */}
          </div>
        )}

        {activeSection === "analytics" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Analyse et Statistiques</h3>
            {/* Afficher les graphiques et statistiques ici */}
          </div>
        )}

        {activeSection === "settings" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Paramètres</h3>
            {/* Afficher les paramètres ici */}
          </div>
        )}
      </div>
    </div>
  );
}
