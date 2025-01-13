const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// || "http://localhost:5000";

export async function sendReservationMail(reservationId) {
  try {
    console.log("reservationId:", reservationId);
    const response = await fetch(`${apiBaseUrl}/mails/${reservationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Réponse de l'API :", response.status, response.statusText);
      throw new Error("Erreur lors de l’envoi de l’email de confirmation.");
    }

    const data = await response.json();
    console.log("E-mail de confirmation envoyé :", data);

    return data;
  } catch (error) {
    console.error("Erreur :", error.message);
    throw error; // Propager l'erreur pour que le caller puisse la traiter
  }
}

export async function confirmReservation(reservationId) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/mails/${reservationId}/confirm`, // Remarquez que l'URL correspond maintenant à /mails/:reservationId/confirm
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la confirmation de la réservation.");
    }

    const data = await response.json();
    console.log("Réservation confirmée avec succès :", data);

    return data;
  } catch (error) {
    console.error("Erreur :", error.message);
    throw error;
  }
}

export async function cancelReservation(reservationId) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/mails/${reservationId}/cancel`, // Remarquez que l'URL correspond maintenant à /mails/:reservationId/cancel
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de l'annulation de la réservation.");
    }

    const data = await response.json();
    console.log("Réservation annulée avec succès :", data);

    return data;
  } catch (error) {
    console.error("Erreur :", error.message);
    throw error;
  }
}
