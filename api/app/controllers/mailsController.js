import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js";

// mailsController.js
export const sendReservationMail = async (req, res) => {
  try {
    console.log("⚡️ sendReservationMail appelé");
    console.log("Paramètres:", req.params);
    console.log("Body:", req.body);

    // Réponse simple pour tester
    return res.status(200).json({
      success: true,
      message: "Route de test atteinte avec succès",
      reservationId: req.params.reservationId,
    });
  } catch (error) {
    console.error("Erreur dans sendReservationMail:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export async function confirmReservation(reservationId) {
  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      throw new Error("Réservation non trouvée.");
    }

    reservation.status = "confirmed";
    await reservation.save();

    return { message: "Réservation confirmée avec succès." };
  } catch (error) {
    throw error;
  }
}

export async function cancelReservation(reservationId) {
  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      throw new Error("Réservation non trouvée.");
    }

    reservation.status = "cancelled";
    await reservation.save();

    return { message: "Réservation annulée avec succès." };
  } catch (error) {
    throw error;
  }
}
