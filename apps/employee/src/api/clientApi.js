export async function searchInClientsDB(searchQuery) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/clients?q=${searchQuery}`
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
export async function fetchClientDetails(clientId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/clients/${clientId}`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des détails du client");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message); // Propagation de l'erreur pour être gérée côté client
  }
}
