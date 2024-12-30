const API_BASE_URL = "https://tiki-ew5j.onrender.com"; // URL de base pour les appels API

// clientApi.js
export async function fetchClientDetails(clientId) {}
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
