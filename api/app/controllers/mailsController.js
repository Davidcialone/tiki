import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js";

export const sendReservationMail = async (req, res) => {
  try {
    console.log("⚡️ sendReservationMail appelé");
    console.log("Paramètres:", req.params);
    console.log("Body:", req.body);

    // Récupération des détails de la réservation en fonction de l'ID
    const reservationId = req.params.reservationId;
    const reservation = await Reservation.findByPk(reservationId, {
      include: {
        model: User, // Inclut les informations sur l'utilisateur
        attributes: ["id", "email", "firstname", "lastname", "phone"],
      },
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée.",
      });
    }

    console.log("Reservation récupérée :", reservation); // Ajout de ce log pour vérifier l'objet récupéré

    // Appel à la fonction d’envoi d’email avec les détails de la réservation et de l'utilisateur
    const result = await sendConfirmationEmail(reservation);
    console.log("Résultat de l’envoi d’email :", result);

    return res.status(200).json({
      success: true,
      message: "Email envoyé avec succès.",
      reservationId: reservation.id,
    });
  } catch (error) {
    console.error("❌ Erreur dans sendReservationMail :", error);

    let status = 500;
    let message = "Une erreur inconnue est survenue.";

    if (error.message.includes("not found")) {
      status = 404;
      message = "Réservation non trouvée.";
    } else if (error.name === "AbortError") {
      status = 408; // Timeout error
      message = "Délai de traitement dépassé pour l’envoi de l’email.";
    } else {
      message = error.message;
    }

    return res.status(status).json({
      success: false,
      error: message,
    });
  }
};
// const reservationMock = {
//   id: 94,
//   reservation_date: "2025-01-18",
//   reservation_time: "12:30",
//   number_of_people: 4,
//   places_used: 2,
//   phone: "0609858307",
//   User: {
//     email: "cialonedavid@gmail.com",
//     firstname: "David",
//     lastname: "Cialone",
//   },
// };
// sendConfirmationEmail(reservationMock);

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
