import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js";

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

    console.log("Données reçues:", reservationData);

    // Vérification des données requises
    if (!reservationData) {
      throw new Error("Données de réservation manquantes");
    }

    // Formatage et validation de l'heure
    const formattedTime = formatTime(reservationData.reservation_time);
    if (!formattedTime) {
      throw new Error("L'heure de réservation est requise");
    }

    const emailData = {
      reservation: {
        id: reservationData.id,
        reservation_date: reservationData.reservation_date,
        reservation_time: formattedTime, // Utilisation de l'heure formatée
        number_of_people: reservationData.number_of_people,
        places_used: reservationData.places_used || "Inconnu",
        phone: reservationData.phone || "",
      },
      user: {
        email: reservationData.email,
        firstname: (reservationData.firstName || "").toLowerCase(),
        lastname: (reservationData.lastName || "").toLowerCase(),
        phone: reservationData.phone || "",
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
    console.error("❌ Erreur dans sendReservationMail:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Le reste du code reste inchangé...

export async function confirmReservation(req, res) {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).send(`
        <h1>Erreur</h1>
        <p>Réservation non trouvée.</p>
      `);
    }

    reservation.status = "confirmed";
    await reservation.save();

    res.send(`
      <h1>Confirmation réussie !</h1>
      <p>Votre réservation a été confirmée avec succès.</p>
    `);
  } catch (error) {
    res.status(500).send(`
      <h1>Erreur</h1>
      <p>Une erreur est survenue : ${error.message}</p>
    `);
  }
}

export async function cancelReservation(req, res) {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).send(`
        <h1>Erreur</h1>
        <p>Réservation non trouvée.</p>
      `);
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.send(`
      <h1>Réservation annulée</h1>
      <p>Votre réservation a été annulée avec succès.</p>
    `);
  } catch (error) {
    res.status(500).send(`
      <h1>Erreur</h1>
      <p>Une erreur est survenue : ${error.message}</p>
    `);
  }
}
