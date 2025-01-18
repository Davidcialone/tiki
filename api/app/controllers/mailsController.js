import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js";

export const sendReservationMail = async (req, res) => {
  try {
    console.log("⚡️ sendReservationMail appelé");
    const reservationData = req.body;

    // Vérification des données requises
    if (!reservationData) {
      throw new Error("Données de réservation manquantes");
    }

    const emailData = {
      reservation: {
        id: reservationData.id, // Ajout de l'ID de réservation
        reservation_date: reservationData.reservation_date,
        reservation_time: reservationData.reservation_time,
        number_of_people: reservationData.number_of_people,
        places_used: reservationData.places_used || "Inconnu",
        phone: reservationData.phone || "",
      },
      user: {
        email: reservationData.email,
        firstname: (reservationData.firstName || "").toLowerCase(), // Gestion sécurisée
        lastname: (reservationData.lastName || "").toLowerCase(), // Gestion sécurisée
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
