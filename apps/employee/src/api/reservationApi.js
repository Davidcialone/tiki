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
// Exemple dans le contrôleur de réservation
export const getReservationById = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findByPk(reservationId); // ou findOne si nécessaire

    if (!reservation) {
      // Si aucune réservation n'est trouvée, on renvoie une réponse 200 OK avec un message
      return res
        .status(200)
        .json({ message: "Aucune réservation trouvée pour cet ID." });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error("Erreur lors de la récupération de la réservation:", error);
    res.status(500).send("Erreur serveur");
  }
};

/**
 * Récupération des réservations par date
 * @param {string} date - Date de la réservation (format : YYYY-MM-DD)
 */
export async function getReservationsByDate(date) {
  if (!date) {
    console.warn("Aucune date fournie, retour des réservations vides.");
    return []; // Retourner une liste vide si aucune date n'est fournie
  }

  try {
    isValidDate(date); // Validation de la date
  } catch (error) {
    console.error("La date fournie est invalide :", error.message);
    return []; // Retourner une liste vide si la date est invalide
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

  try {
    const response = await fetchWithErrorHandling(url, options);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    return []; // Retourner une liste vide en cas d'erreur de requête
  }
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
      const errorResponse = await response.json(); // Lire le message d'erreur si possible
      throw new Error(
        `Erreur API : ${response.status} - ${
          errorResponse.message || "Erreur inconnue"
        }`
      );
    }

    // Lire et retourner directement le JSON de la réponse
    const jsonResponse = await response.json();
    console.log("Données JSON reçues :", jsonResponse);
    return jsonResponse; // Retourne les données parsées
  } catch (error) {
    console.error("Erreur lors de l’appel à l’API :", error);
    throw new Error(
      "Une erreur s’est produite lors de l’exécution de la requête."
    );
  }
}

/**
 * Mise à jour d'une réservation par ID
 * @param {number} id - ID de la réservation
 */
export async function updateReservation(id, formData) {
  console.log(
    `=== Mise à jour partielle de la réservation avec l'ID : ${id} ===`
  );

  try {
    if (formData.status !== undefined) {
      // Créez un nouvel objet où seules les valeurs modifiées sont incluses
      const reservationData = {
        status: formData.status, // Seul le statut sera envoyé en modification
        reservation_time: formData.reservation_time,
        number_of_people: formData.number_of_people,
        email: formData.email,
        reservation_date: formData.reservation_date,
        phone: formData.phone,
        // Garder intactes toutes les autres données qui ne sont pas modifiées
        places_used: formData.places_used,
        end_time: formData.end_time,
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
    } else {
      throw new Error("Aucune modification détectée pour le statut.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour partielle de la réservation :",
      error
    );
    throw error; // Propager l'erreur pour être capturée côté React
  }
}

/**
 * Suppression d'une réservation par ID
 * @param {number} id - ID de la réservation
 */
export async function deleteReservation(id) {
  console.log(`=== Suppression de la réservation avec l'ID : ${id} ===`);

  const url = `${apiBaseUrl}/api/reservations/${encodeURIComponent(id)}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export async function statusReservation(reservationId, token) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/reservations/${reservationId}/status?token=${token}`
    );

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la mise à jour du statut de la réservation."
      );
    }

    // Retourner directement le texte HTML
    const html = await response.text();
    return html;
  } catch (error) {
    console.error("Erreur :", error.message);
    throw error;
  }
}

// return await fetchWithErrorHandling(url, options);

export async function newReservationsNotification(lastCheck) {
  console.log("=== Récupération des nouvelles réservations ===");

  const url = `${apiBaseUrl}/api/reservations/new?lastCheck=${lastCheck}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Assurez-vous que les cookies sont envoyés
  };

  try {
    const response = await fetch(url, options);

    // Vérifier que la réponse est correcte
    if (!response.ok) {
      throw new Error("Erreur serveur: " + response.status);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json(); // Retourner les données sous forme de JSON
    } else {
      console.error("La réponse n'est pas au format JSON");
      throw new Error("Réponse invalide");
    }
  } catch (error) {
    console.error("Erreur de récupération des nouvelles réservations:", error);
    throw error; // Propager l'erreur
  }
}
