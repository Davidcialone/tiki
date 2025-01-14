// Validation du format de l'email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validation de l'heure au format HH:MM
export function isValidTime(time) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) {
    throw new Error("Le format de l'heure est invalide (ex: HH:MM)");
  }
  return true;
}

// Validation du format de la date
export function isValidDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Le format de la date doit être YYYY-MM-DD");
  }
  return true;
}

/**
 * Fonction pour calculer places_used et end_time
 * @param {object} formData - Données du formulaire de réservation
 * @returns {object} - Contient `places_used` et `end_time`
 */
export function calculatePlacesAndEndTime(formData) {
  const PERSONS_PER_TABLE = 2;
  const placesUsed = Math.ceil(formData.number_of_people / PERSONS_PER_TABLE);

  const reservationDateTime = `${formData.reservation_date}T${formData.reservation_time}`;
  const reservationDate = new Date(reservationDateTime);
  reservationDate.setMinutes(reservationDate.getMinutes() + 90);

  const endHours = reservationDate.getHours().toString().padStart(2, "0");
  const endMinutes = reservationDate.getMinutes().toString().padStart(2, "0");
  const endTime = `${endHours}:${endMinutes}`;

  return { placesUsed, endTime };
}
