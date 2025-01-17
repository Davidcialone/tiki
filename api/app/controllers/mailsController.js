import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js";

export const sendReservationMail = async (req, res) => {
  try {
    console.log("⚡️ sendReservationMail appelé");
    const reservationData = req.body;

    const emailData = {
      reservation: {
        reservation_date: reservationData.reservation_date,
        reservation_time: reservationData.reservation_time,
        number_of_people: reservationData.number_of_people,
        places_used: reservationData.places_used || "Inconnu",
        phone: reservationData.phone,
      },
      user: {
        email: reservationData.email,
        firstname: reservationData.firstName.toLowerCase(), // Conversion en minuscules
        lastname: reservationData.lastName.toLowerCase(), // Conversion en minuscules
        phone: reservationData.phone,
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
