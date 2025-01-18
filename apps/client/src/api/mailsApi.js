const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // || "http://localhost:5000";

export async function sendConfirmationEmail(emailData) {
  if (!emailData) {
    throw new Error("Les données de l'email sont requises");
  }

  // Restructuration des données pour correspondre au format attendu par le serveur
  const formattedData = {
    id: emailData.id, // On garde l'ID au niveau racine pour la route
    reservation: {
      id: emailData.id,
      reservation_date: emailData.reservation_date,
      reservation_time: emailData.reservation_time,
      number_of_people: emailData.number_of_people,
      places_used: emailData.places_used,
      phone: emailData.phone,
    },
    user: {
      email: emailData.email,
      firstname: emailData.firstName,
      lastname: emailData.lastName,
      phone: emailData.phone,
    },
  };

  const TIMEOUT_MS = 5000; // 5 secondes de timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  console.log("Données formatées pour l'envoi:", formattedData);

  try {
    console.log(
      "📤 Envoi de la demande d'email pour la réservation :",
      formattedData.id
    );

    const response = await fetch(
      `${apiBaseUrl}/api/mails/${formattedData.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formattedData),
        signal: controller.signal,
      }
    );

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
      reservationId: formattedData.id,
      response: data,
    });

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        `Timeout dépassé (${TIMEOUT_MS}ms) pour la réservation: ${formattedData.id}`
      );
    }

    console.error("❌ Erreur lors de l'envoi de l'email:", {
      reservationId: formattedData.id,
      error: error.message,
      type: error.name,
    });

    throw error;
  }
}

export async function confirmReservation(reservationId) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/mails/${reservationId}/confirm`,
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
        throw new Error("Erreur lors de l'envoi de l'email de confirmation.");
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
      `${apiBaseUrl}/mails/${reservationId}/cancel`,
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
