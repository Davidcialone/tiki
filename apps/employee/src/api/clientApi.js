const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// clientApi.js
export async function fetchClientDetails(clientId) {
  try {
    const response = await fetch(`${apiBaseUrl}/api/clients/${clientId}`);
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
    const response = await fetch(`${apiBaseUrl}/api/clients?q=${searchQuery}`);
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
export async function fetchClientReservations(id) {
  try {
    const url = `${apiBaseUrl}/api/reservations/${encodeURIComponent(id)}`; // URL complète pour la requête GET
    const options = {
      method: "GET", // Méthode GET
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          "Erreur lors de la récupération des détails de la réservation."
      );
    }

    const data = await response.json();
    return data || {};
  } catch (err) {
    console.error("Erreur dans fetchClientReservations:", err);
    throw new Error(err.message);
  }
}
