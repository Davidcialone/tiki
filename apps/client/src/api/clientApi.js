// clientApi.js
export async function fetchClientDetails(clientId) {
  let API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Récupération de l'URL de base de l'API
  if (import.meta.env.MODE === "production") {
    // Supprimer le slash initial en production si nécessaire
    API_BASE_URL = API_BASE_URL.replace(/\/$/, ""); // Supprime le slash final éventuel
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/clients/${clientId}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des détails du client");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message); // Propagation de l'erreur pour être gérée côté client
  }
}
