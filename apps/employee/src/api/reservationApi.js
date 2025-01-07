const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Valide le format de l'email
 * @param {string} email - Email à valider
 * @returns {boolean} True si l'email est valide
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Fonction utilitaire pour les requêtes fetch
 * @param {string} url - URL de l'API
 * @param {object} options - Options pour la requête fetch
 */
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur côté serveur :", errorText);
      throw new Error(errorText || "Requête échouée");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'exécution de la requête :", error);
    throw error;
  }
}

/**
 * Création d'une réservation
 * @param {object} formData - Données du formulaire de réservation
 */
export async function createReservation(formData) {
  console.log("=== Création d'une réservation ===");

  // Validation des champs requis
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

  // Validation du format de la date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.reservation_date)) {
    throw new Error("Le format de la date doit être YYYY-MM-DD");
  }

  // Validation du format de l'heure
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  if (!timeRegex.test(formData.reservation_time)) {
    throw new Error("Le format de l'heure doit être HH:MM:SS");
  }

  // Validation du nombre de personnes
  if (formData.number_of_people < 1) {
    throw new Error("Le nombre de personnes doit être au moins 1");
  }

  // Ajout de valeurs par défaut si nécessaire
  if (!formData.role_id) {
    console.warn(
      "role_id est manquant. Attribution de la valeur par défaut : 1"
    );
    formData.role_id = 1;
  }

  const url = `${apiBaseUrl}/api/reservations`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  console.log("Envoi des données :", formData);
  const response = await fetchWithErrorHandling(url, options);

  // Vérification de la réponse
  if (response?.dataValues) {
    console.log("Réservation créée avec succès, ID:", response.dataValues.id);
    return response.dataValues;
  }

  return response;
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
