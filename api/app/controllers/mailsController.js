import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js"; // Importer la fonction d'envoi d'email

export async function mailsReservations(req, res) {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findByPk(reservationId, {
      include: [{ model: User, as: "user" }],
    });

    if (!reservation || !reservation.user) {
      return res
        .status(404)
        .json({ message: "Réservation ou utilisateur non trouvé." });
    }

    // Passer l'objet réservation complet à la fonction d'envoi d'email
    await sendConfirmationEmail(reservation);

    res.json(reservation);
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’email :", error);
    res.status(500).json({ message: error.message });
  }
}

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
