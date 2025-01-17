import { Reservation, User } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js";

export const sendReservationMail = async (req, res) => {
  try {
    console.log("⚡️ sendReservationMail appelé");
    console.log("Paramètres:", req.params);
    console.log("Body:", req.body);

    const reservationId = req.params.reservationId;

    // Récupération de la réservation avec l'inclusion de l'utilisateur
    const reservation = await Reservation.findOne({
      where: { id: reservationId },
      include: [
        {
          model: User, // Relation avec le modèle User
          as: "user", // Alias pour le modèle User
          attributes: ["id", "email", "firstname", "lastname"], // Sélectionnez les champs nécessaires
        },
      ],
    });

    // Log plus détaillé après la requête
    console.log("Type de reservation:", typeof reservation);
    console.log("Type de user:", typeof reservation?.user);
    console.log("User data:", reservation?.user?.get({ plain: true }));

    if (!reservation) {
      throw new Error("Réservation non trouvée.");
    }

    // Convertir l'instance Sequelize en objet plain JavaScript
    const plainReservation = reservation.get({ plain: true });
    console.log("Plain reservation:", plainReservation);

    // Début de l'envoi d'email avec l'objet plain
    console.log("Début de l'envoi d'email...");
    const result = await sendConfirmationEmail(plainReservation);
    console.log("Résultat de l'envoi d'email :", result);

    return res.status(200).json({
      success: true,
      message: "Email envoyé avec succès.",
      reservationId: reservation.id,
    });
  } catch (error) {
    console.error("❌ Erreur dans sendReservationMail :", error);
    return res.status(500).json({
      success: false,
      error: error.message,
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
