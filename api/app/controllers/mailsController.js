import { Reservations, Users } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js"; // Importer la fonction d'envoi d'email

export async function mailsReservations(req, res) {
  try {
    const { reservationId } = req.params;

    // Récupérer la réservation avec l'utilisateur associé
    const reservation = await Reservations.findByPk(reservationId, {
      include: [{ model: Users, as: "user" }],
    });

    // Vérifier si la réservation et l'utilisateur existent
    if (!reservation || !reservation.user) {
      return res
        .status(404)
        .json({ message: "Réservation ou utilisateur non trouvé." });
    }

    // Vérification des informations de la réservation
    console.log(reservation); // Ajoutez cette ligne pour afficher l'objet complet

    // Envoyer l'e-mail avec les informations de la réservation et de l'utilisateur
    await sendConfirmationEmail(reservation);

    // Retourner les détails de la réservation dans la réponse
    res.json(reservation);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function confirmReservation(req, res) {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservations.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    // Mettre à jour le statut de la réservation pour confirmer
    reservation.status = "confirmed"; // Par exemple, vous pouvez avoir un champ status
    await reservation.save();

    res.json({ message: "Réservation confirmée avec succès." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function cancelReservation(req, res) {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservations.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    // Mettre à jour le statut de la réservation pour annuler
    reservation.status = "cancelled"; // Par exemple, un champ `status` à 'cancelled'
    await reservation.save();

    res.json({ message: "Réservation annulée avec succès." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
