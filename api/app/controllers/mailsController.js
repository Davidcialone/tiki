import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js"; // Importer la fonction d'envoi d'email

export async function mailsReservations(reservationId) {
  try {
    console.log("Requête reçue pour l’ID de réservation :", reservationId);

    const reservation = await Reservation.findByPk(reservationId, {
      include: [{ model: User, as: "user" }],
    });

    console.log("Détails de la réservation récupérés :", reservation);

    if (!reservation || !reservation.user) {
      throw new Error("Réservation ou utilisateur non trouvé.");
    }

    // Passer l'objet réservation complet à la fonction d'envoi d'email
    console.log("Envoi d'email pour la réservation :", reservation);
    await sendConfirmationEmail(reservation);

    console.log(
      "Email envoyé avec succès pour la réservation :",
      reservationId
    );

    return { success: true, data: reservation };
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’email :", error);
    return { success: false, message: error.message };
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
