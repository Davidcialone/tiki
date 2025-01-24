import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchInClientsDB } from "../../../api/clientApi";
import { AiOutlineSearch, AiOutlineReload } from "react-icons/ai";

export const ClientSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Valeur du champ de recherche
  const [clients, setClients] = useState([]); // Clients trouvés
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utilisé pour naviguer vers la page de la fiche client

  // Fonction de recherche
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setClients([]); // Si la recherche est vide, réinitialisez les résultats
      setError(null); // Nettoyer les erreurs
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchInClientsDB(searchQuery); // Appel de l'API pour rechercher les clients
      setClients(results);
    } catch (err) {
      setError("Aucun client trouvé. Essayez un autre terme.");
    } finally {
      setLoading(false);
    }
  };

  // Déclencher la recherche avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Réinitialiser la recherche
  const resetSearch = () => {
    setSearchQuery("");
    setClients([]);
    setError(null);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Barre de recherche */}
      <div className="relative flex items-center max-w-md mx-auto">
        <AiOutlineSearch className="absolute left-3 text-gray-400" size={24} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un client (nom, email, téléphone...)"
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={resetSearch}
            className="absolute right-3 text-gray-500 hover:text-red-500 transition"
          >
            <AiOutlineReload size={24} />
          </button>
        )}
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="max-w-md mx-auto p-4 bg-red-100 text-red-700 rounded-lg shadow-md flex items-center space-x-2">
          <AiOutlineSearch size={24} />
          <span>{error}</span>
        </div>
      )}

      {/* Résultats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-bold text-gray-800">
              {client.firstname} {client.lastname}
            </h2>
            <p className="text-sm text-gray-500">{client.email}</p>
            <p className="text-sm text-gray-500">{client.phone}</p>
            <button
              onClick={() => navigate(`/clients/${client.id}`)}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Voir la fiche
            </button>
          </div>
        ))}

        {!loading && clients.length === 0 && !error && (
          <p className="text-center text-gray-500 col-span-full">
            Aucun résultat. Essayez de modifier votre recherche.
          </p>
        )}
      </div>
    </div>
  );
}
