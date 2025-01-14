const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// || "http://localhost:5000";

// mailsApi.js
export async function sendReservationMail(reservationId) {
  if (!reservationId) {
    throw new Error("L'ID de réservation est requis");
  }

  const TIMEOUT_MS = 5000; // 5 secondes de timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    console.log(
      "📤 Envoi de la demande d'email pour la réservation:",
      reservationId
    );

    const response = await fetch(`${apiBaseUrl}/mails/${reservationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Erreur API (${response.status}): ${
          errorData.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    console.log("✅ Email traité avec succès:", {
      reservationId,
      response: data,
    });

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        `Timeout dépassé (${TIMEOUT_MS}ms) pour la réservation: ${reservationId}`
      );
    }

    console.error("❌ Erreur lors de l'envoi de l'email:", {
      reservationId,
      error: error.message,
      type: error.name,
    });

    throw error;
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
      if (response.status === 404) {
        throw new Error("Mail not found for this reservation ID.");
      } else {
        throw new Error("Erreur lors de l’envoi de l’email de confirmation.");
      }
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
