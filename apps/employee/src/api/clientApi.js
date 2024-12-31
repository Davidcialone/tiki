const API_BASE_URL = "https://tiki-ew5j.onrender.com"; // URL de base pour les appels API

// clientApi.js
export async function fetchClientDetails(clientId) {
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

export async function searchInClientsDB(searchQuery) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/clients?q=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la recherche de clients");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// clientApi.js

export async function fetchClientReservations(clientId) {
  try {
    // Utilisation de clientId pour récupérer les réservations du client
    const response = await fetch(
      `${API_BASE_URL}/api/reservations?user_id=${clientId}`
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des réservations.");
    }

    // Retourne les réservations pour le client
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
