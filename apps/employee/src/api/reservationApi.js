const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Validation du format de l'email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validation de l'heure au format HH:MM
function isValidTime(time) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

/**
 * Fonction pour créer une réservation
 * @param {object} formData - Données du formulaire de réservation
 */
export async function createReservation(formData) {
  console.log("=== Création d'une réservation ===");

  // Validation des champs obligatoires
  const requiredFields = [
    "email",
    "reservation_date",
    "reservation_time",
    "number_of_people",
  ];

  for (const field of requiredFields) {
    if (!formData[field]) {
      throw new Error(`Le champ '${field}' est obligatoire.`);
    }
  }

  // Validation spécifique de l'email
  if (!isValidEmail(formData.email)) {
    throw new Error("Le format de l'email est invalide");
  }

  // Validation de l'heure au format HH:MM
  if (!isValidTime(formData.reservation_time)) {
    throw new Error("Le format de l'heure est invalide (ex : HH:MM)");
  }

  // Validation du nombre de personnes
  if (formData.number_of_people < 1) {
    throw new Error("Le nombre de personnes doit être au moins 1");
  }

  // Création de l'objet final à envoyer à l'API
  const reservationData = {
    ...formData,
    reservation_time: formData.reservation_time, // Ne pas ajouter ":00"
  };

  const url = `${apiBaseUrl}/api/reservations`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  };

  console.log("Envoi des données :", reservationData);
  return await fetchWithErrorHandling(url, options);
}

/**
 * Récupération de toutes les réservations
 */
export async function getReservations() {
  console.log("=== Récupération de toutes les réservations ===");

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
 * @param {number} id - ID de la réservation
 */
export async function getReservationById(id) {
  if (!id) {
    throw new Error("L'ID de la réservation est requis.");
  }

  console.log(`=== Récupération de la réservation avec l'ID : ${id} ===`);

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
 * @param {string} date - Date de la réservation (format : YYYY-MM-DD)
 */
export async function getReservationsByDate(date) {
  if (!date) {
    throw new Error("La date est obligatoire pour cette requête.");
  }

  // Validation du format de la date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Le format de la date doit être YYYY-MM-DD");
  }

  console.log(`=== Récupération des réservations pour la date : ${date} ===`);

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

/**
 * Fonction générique pour gérer les erreurs d'appel API
 * @param {string} url - URL de l'API
 * @param {object} options - Options de la requête fetch
 */
async function fetchWithErrorHandling(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur API : ${response.status} - ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
    throw new Error(
      "Une erreur s'est produite lors de l'exécution de la requête."
    );
  }
}
