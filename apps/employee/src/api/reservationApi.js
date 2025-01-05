const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Fonction utilitaire pour les requêtes fetch
 */
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      throw new Error(errorText || "Request failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

/**
 * Création d'une réservation
 */
export async function createReservation(formData) {
  console.log("=== Sending Reservation Request ===");

  if (!formData.role_id) {
    console.warn("role_id is missing, assigning default value of 1");
    formData.role_id = 1;
  }

  console.log("Payload:", JSON.stringify(formData));

  const url = `${apiBaseUrl}/api/reservations`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  return await fetchWithErrorHandling(url, options);
}

/**
 * Récupération de toutes les réservations
 */
export async function getReservations() {
  console.log("=== Sending Reservations Request ===");

  const url = `${apiBaseUrl}/api/reservations`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await fetchWithErrorHandling(url, options);
}

/**
 * Récupération d'une réservation par ID
 */
export async function getReservationById(id) {
  if (!id) {
    throw new Error("Reservation ID is required");
  }

  console.log("=== Sending Reservation By ID Request ===");

  const url = `${apiBaseUrl}/api/reservations/${encodeURIComponent(id)}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await fetchWithErrorHandling(url, options);
}

/**
 * Récupération des réservations par date
 */
export async function getReservationsByDate(date) {
  if (!date) {
    throw new Error("Date is required");
  }

  console.log("=== Sending Reservations By Date Request ===");

  const url = `${apiBaseUrl}/api/reservations/by-date?date=${encodeURIComponent(
    date
  )}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await fetchWithErrorHandling(url, options);
}
