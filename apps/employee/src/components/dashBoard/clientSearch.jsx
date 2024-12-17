import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchInClientsDB } from "../../api/clientApi"; // Fonction pour rechercher les clients via l'API

export function ClientSearch() {
  const [searchQuery, setSearchQuery] = useState(""); // Valeur du champ de recherche
  const [clients, setClients] = useState([]); // Clients trouvés
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utilisé pour naviguer vers la page de la fiche client

  // Fonction de recherche
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return; // Ne pas envoyer une requête vide
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchInClientsDB(searchQuery); // Appel de l'API pour rechercher les clients
      setClients(results); // Afficher les clients trouvés
    } catch (err) {
      setError("Aucun client trouvé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher par nom, prénom ou email"
        className="p-2 border border-gray-300 rounded-md"
      />
      <button onClick={handleSearch} className="btn-search">Rechercher</button>

      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}

      <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
  <thead >
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Email</th>
      <th>Téléphone</th>
      <th >Action</th>
    </tr>
  </thead>
  <tbody>
    {clients.length > 0 ? (
      clients.map((client) => (
        <tr key={client.id} className="border">
          <td >{client.lastname}</td>
          <td >{client.firstname}</td>
          <td >{client.email}</td>
          <td >{client.phone}</td>
          <td className="px-4 py-2 text-center">
            <button
              onClick={() => navigate(`/clients/${client.id}`)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Voir la fiche
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="text-center py-4 text-gray-500">Aucun client trouvé.</td>
      </tr>
    )}
  </tbody>
</table>


    </div>
  );
}


