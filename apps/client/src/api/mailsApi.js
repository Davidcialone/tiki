const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function sendConfirmationEmail(emailData) {
  if (!emailData) {
    throw new Error("Les données de l'email sont requises");
  }

  // Assurons-nous que toutes les chaînes de caractères sont définies
  const formattedData = {
    id: emailData.id,
    reservation: {
      id: emailData.id,
      reservation_date: emailData.reservation_date || "",
      reservation_time: emailData.reservation_time || "",
      number_of_people: emailData.number_of_people || 1,
      places_used: emailData.places_used || "Non spécifié",
      phone: emailData.phone || "",
    },
    user: {
      email: emailData.email || "",
      firstname: (emailData.firstName || "").trim(),
      lastname: (emailData.lastName || "").trim(),
      phone: emailData.phone || "",
    },
  };

  // Validation des données essentielles
  if (
    !formattedData.user.email ||
    !formattedData.user.firstname ||
    !formattedData.user.lastname
  ) {
    throw new Error("Les informations de l'utilisateur sont incomplètes");
  }

  const TIMEOUT_MS = 5000;
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
