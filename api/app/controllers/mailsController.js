import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail, sendContactEmail } from "../mails/mail.js";

// Fonction utilitaire pour formater l'heure
const formatTime = (timeString) => {
  console.log("formatTime appelé avec :", timeString);
  if (!timeString) return null;

  if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
    console.log("L'heure est au format HH:MM:SS");
    return timeString;
  }

  if (/^\d{2}:\d{2}$/.test(timeString)) {
    console.log("L'heure est au format HH:MM, ajout des secondes");
    return `${timeString}:00`;
  }

  try {
    const date = new Date(`2000-01-01T${timeString}`);
    if (isNaN(date.getTime())) {
      console.error("Valeur d'heure invalide :", timeString);
      throw new Error("Invalid time value");
    }
    return date.toTimeString().split(" ")[0];
  } catch (error) {
    console.error("Erreur dans formatTime :", error.message);
    throw new Error("Invalid time value");
  }
};

export const sendReservationMail = async (req, res) => {
  try {
    console.log("⚡️ sendReservationMail appelé");
    const reservationData = req.body;
    const time = reservationData.reservation.reservation_time; // Corrigé ici

    console.log("time", time);
    const typeOfTime = typeof time;
    console.log("typeOfTime", typeOfTime);

    // Vérification si time est défini et une chaîne
    if (!time) {
      throw new Error("L'heure de réservation est requise");
    }

    if (typeOfTime !== "string") {
      throw new Error("L'heure de réservation doit être sous forme de chaîne");
    }

    const formattedTime = formatTime(time);
    console.log("formattedTime", formattedTime);

    if (!formattedTime) {
      throw new Error("Format de l'heure de réservation invalide");
    }

    console.log("Données reçues:", reservationData);

    const emailData = {
      reservation: {
        id: reservationData.reservation.id,
        reservation_date: reservationData.reservation.reservation_date,
        reservation_time: formattedTime, // Utilisation de l'heure formatée
        number_of_people: reservationData.reservation.number_of_people,
        places_used: reservationData.reservation.places_used || "Inconnu",
        phone: reservationData.reservation.phone || "",
      },
      user: {
        email: reservationData.user.email,
        firstname: (reservationData.user.firstname || "").toLowerCase(),
        lastname: (reservationData.user.lastname || "").toLowerCase(),
        phone: reservationData.user.phone || "",
      },
    };

    console.log("Données préparées pour l'envoi:", emailData);

    const result = await sendConfirmationEmail(emailData);

    return res.status(200).json({
      success: true,
      message: "Email envoyé avec succès",
      result,
    });
  } catch (error) {
    console.error("❌ Erreur dans sendReservationMail:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendContactMail = async (req, res) => {
  try {
    console.log("⚡️ sendContactMail appelé");
    const contactData = req.body;

    console.log("Données reçues:", contactData);

    const emailData = {
      email: contactData.email,
      message: contactData.message,
    };

    console.log("Données préparées pour l'envoi:", emailData);

    const result = await sendContactEmail(emailData);

    return res.status(200).json({
      success: true,
      message: "Email envoyé avec succès",
      result,
    });
  } catch (error) {
    console.error("❌ Erreur dans sendContactMail:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
