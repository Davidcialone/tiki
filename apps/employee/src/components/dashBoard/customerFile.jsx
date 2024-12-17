// CustomerFile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchClientDetails } from "../../api/clientApi"; // Assurez-vous que la fonction est bien importée

export function CustomerFile() {
  const { clientId } = useParams(); // Récupérer l'ID du client à partir de l'URL
  const [clientDetails, setClientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClientDetails = async () => {
      try {
        const client = await fetchClientDetails(clientId); // Appel à l'API pour récupérer les détails du client
        setClientDetails(client);
      } catch (err) {
        setError(err.message); // Gestion des erreurs
      } finally {
        setLoading(false);
      }
    };

    loadClientDetails(); // Appel de la fonction pour charger les détails du client
  }, [clientId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Fiche du client</h1>
      <p>Nom : {clientDetails.firstname} {clientDetails.lastname}</p>
      <p>Email : {clientDetails.email}</p>
      <p>Téléphone : {clientDetails.phone}</p>
      {/* Vous pouvez ajouter d'autres informations si nécessaire */}
    </div>
  );
}
