import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchClientDetails } from "../../api/clientApi"; // Fonction pour récupérer les détails du client

export function CustomerFile() {
  const { clientId } = useParams(); // Récupérer l'ID du client à partir de l'URL
  const [clientDetails, setClientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les détails du client à partir de l'API
  useEffect(() => {
    const loadClientDetails = async () => {
      try {
        const client = await fetchClientDetails(clientId); // Appel à l'API
        setClientDetails(client);
      } catch (err) {
        setError(err.message); // Enregistrement de l'erreur
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    loadClientDetails();
  }, [clientId]);

  // Gestion des clics sur Modifier et Supprimer
  const handleEdit = () => {
    console.log("Modifier le client :", clientDetails);
    // Logique supplémentaire pour ouvrir un formulaire ou une modale
  };

  const handleDelete = () => {
    console.log("Supprimer le client :", clientDetails);
    // Logique supplémentaire pour confirmer ou effectuer la suppression
  };

  // Affichage du chargement ou des erreurs
  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;

  // Affichage de la fiche client
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-6">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Fiche du client</h1>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Nom : </span>
            {clientDetails.firstname} {clientDetails.lastname}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email : </span>
            {clientDetails.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Téléphone : </span>
            {clientDetails.phone}
          </p>
        </div>

        {/* Boutons Modifier et Supprimer */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
