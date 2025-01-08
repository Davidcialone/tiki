const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Validation du format de l'email en front-end
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validation du format de l'heure en front-end
function isValidTime(time) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

// Calcul de l'heure de fin en front-end
const calculateEndTime = (reservation_time, reservation_date) => {
  const reservationDateTime = new Date(
    `${reservation_date}T${reservation_time}`
  );
  const endTime = new Date(reservationDateTime.getTime() + 90 * 60000); // 1h30 en millisecondes
  return endTime.toISOString().split("T").join(" ").split(".")[0]; // Format : YYYY-MM-DD HH:MM:SS
};

/**
 * Fonction pour la création d'une réservation
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

  // Validation de l'heure au format HH:MM
  if (!isValidTime(formData.reservation_time)) {
    throw new Error("Le format de l'heure est invalide (ex : HH:MM)");
  }

  // Validation du nombre de personnes
  if (formData.number_of_people < 1) {
    throw new Error("Le nombre de personnes doit être au moins 1");
  }

  // Calcul de end_time
  const end_time = calculateEndTime(
    formData.reservation_time,
    formData.reservation_date
  );

  // Création de l'objet final à envoyer à l'API
  const reservationData = {
    ...formData,
    end_time,
    reservation_time: formData.reservation_time + ":00", // Ajouter les secondes pour l'API
  };

  // Envoyer les données à l'API
  const url = `${apiBaseUrl}/api/reservations`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  };

  console.log("Envoi des données :", reservationData);
  const response = await fetchWithErrorHandling(url, options);

  // Vérification de la réponse
  if (response?.dataValues) {
    console.log("Réservation créée avec succès, ID:", response.dataValues.id);
    console.log("Réponse de l'API :", response);

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
