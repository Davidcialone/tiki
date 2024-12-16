// ClientFiche.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchClientDetails } from "../../../../api/clientApi";

export function ClientFiche() {
  const { clientId } = useParams();
  const [clientDetails, setClientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await fetchClientDetails(clientId); // Passer clientId ici
        setClientDetails(data);
        setLoading(false);
      } catch (err) {
        setError(err.message); // Gestion correcte de l'erreur
        setLoading(false);
      }
    };

    fetchClient(); // Appel de la fonction pour récupérer les données
  }, [clientId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Détails du client</h1>
      {/* Affichage des détails du client */}
      <p>Nom : {clientDetails.firstname} {clientDetails.lastname}</p>
      <p>Email : {clientDetails.email}</p>
      <p>Numéro de téléphone : {clientDetails.phone}</p>
      {/* Autres détails */}
    </div>
  );
}

export default ClientFiche;
