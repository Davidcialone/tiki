const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
import {
  isValidEmail,
  isValidTime,
  isValidDate,
  calculatePlacesAndEndTime,
} from "../../services/services.js"; // Validation du format de l'email

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

  // Calcul de places_used et end_time
  const { placesUsed, endTime } = calculatePlacesAndEndTime(formData);

  // Construction de l'objet final à envoyer à l'API
  const reservationData = {
    ...formData,
    places_used: placesUsed,
    end_time: endTime,
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

  isValidDate(date); // Utilisation de la fonction de validation de la date

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
      const errorResponse = await response.json();
      throw new Error(
        `Erreur API : ${response.status} - ${
          errorResponse.message || "Erreur inconnue"
        }`
      );
    }

    // Pour les requêtes DELETE qui renvoient 204
    if (response.status === 204) {
      return null;
    }

    const jsonResponse = await response.json();
    console.log("Données JSON reçues :", jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
    throw new Error(
      "Une erreur s'est produite lors de l'exécution de la requête."
    );
  }
}

/**
 * Mise à jour d'une réservation par ID
 * @param {number} id - ID de la réservation
 */
export async function updateReservation(id, formData) {
  console.log(`=== Mise à jour de la réservation avec l'ID : ${id} ===`);

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

  const { placesUsed, endTime } = calculatePlacesAndEndTime(formData);

  // Construction de l'objet final à envoyer à l'API
  const reservationData = {
    ...formData,
    places_used: placesUsed,
    end_time: endTime,
    reservation_time: formData.reservation_time, // Ne pas ajouter ":00"
  };

  const url = `${apiBaseUrl}/api/reservations/${encodeURIComponent(id)}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  };

  console.log("Envoi des données :", reservationData);
  return await fetchWithErrorHandling(url, options);
}

/**
 * Suppression d'une réservation par ID
 * @param {number} id - ID de la réservation
 */
export async function deleteReservation(id) {
  console.log(`=== Début de la suppression de la réservation ${id} ===`);

  // Vérifier d'abord si on peut récupérer la réservation
  const checkResponse = await fetch(`${apiBaseUrl}/api/reservations`);
  const allReservations = await checkResponse.json();
  const exists = allReservations.some((res) => res.id === parseInt(id));

  if (!exists) {
    console.log("La réservation n'existe pas dans la liste complète");
    throw new Error("Réservation introuvable");
  }

  const url = `${apiBaseUrl}/api/reservations/${id}`;
  console.log("URL de suppression:", url);

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Réponse d'erreur:", errorText);
    throw new Error(`Erreur ${response.status}: ${errorText}`);
  }

  return response;
}
