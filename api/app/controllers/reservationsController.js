import { Reservation, User } from "../models/index.js";
import { generateRandomPassword } from "../services/userService.js";

// Créer une réservation
export const createReservation = async (req, res) => {
  try {
    console.log("Données reçues :", req.body); // Logs des données reçues

    const {
      email,
      firstName,
      lastName,
      phone,
      reservation_date,
      reservation_time,
      number_of_people,
      note,
      zone_id,
    } = req.body;

    console.log("Données de la réservation :", {
      email,
      firstName,
      lastName,
      phone,
      reservation_date,
      reservation_time,
      number_of_people,
      note,
      zone_id,
    });

    // Validation des champs obligatoires
    if (!email || !reservation_date || !reservation_time || !number_of_people) {
      return res.status(400).json({
        message:
          "Les champs 'email', 'reservation_date', 'reservation_time', et 'number_of_people' sont obligatoires.",
      });
    }

    // Vérifier si l'utilisateur existe
    let user = await User.findOne({ where: { email } });

    if (!user) {
      const randomPassword = generateRandomPassword();
      user = await User.create({
        email: email,
        firstname: firstName,
        lastname: lastName,
        phone,
        password: randomPassword,
        role_id: 1, // Rôle client par défaut
      });
    }

    // Création de la réservation
    const reservation = await Reservation.create({
      user_id: user.id,
      reservation_date,
      reservation_time,
      number_of_people,
      note,
      zone_id,
    });

    console.log("Réservation créée :", reservation);

    // Envoyer un email de confirmation
    // await sendConfirmationEmail(reservation);

    res.status(201).json(reservation);
  } catch (error) {
    console.error("Erreur lors de la création de la réservation :", error);
    res.status(500).json({
      message: "Erreur lors de la création de la réservation",
      error: error.message,
    });
  }
};

// Récupérer toutes les réservations
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstname", "lastname", "email", "phone"],
        },
      ],
      order: [
        ["reservation_date", "ASC"],
        ["reservation_time", "ASC"],
      ],
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations",
      error: error.message,
    });
  }
};

// Récupérer les réservations par ID de client
export const getReservationsByClientId = async (req, res) => {
  const { clientId } = req.params;

  try {
    // Validation de l'ID
    if (!clientId || isNaN(clientId)) {
      return res.status(400).json({ message: "ID du client invalide." });
    }

    const reservations = await Reservation.findAll({
      where: { user_id: clientId },
      order: [
        ["reservation_date", "DESC"],
        ["reservation_time", "DESC"],
      ],
    });

    if (reservations.length > 0) {
      return res.status(200).json(reservations);
    } else {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour ce client." });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    res.status(500).json({
      message: "Erreur interne du serveur. Veuillez réessayer plus tard.",
    });
  }
};

// Récupérer les réservations par date
export const getReservationsByDate = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "La date est requise." });
  }

  try {
    const reservations = await Reservation.findAll({
      where: { reservation_date: date },
      attributes: [
        "id",
        "user_id",
        "reservation_date",
        "reservation_time",
        "number_of_people",
        "places_used",
        "end_time",
        "note",
        "zone_id",
      ],
      order: [["reservation_time", "ASC"]],
    });

    if (reservations.length > 0) {
      return res.status(200).json(reservations);
    } else {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour cette date." });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Mettre à jour une réservation
export const updateReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    const updatedReservation = await reservation.update(req.body);

    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réservation :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la réservation." });
  }
};

// Supprimer une réservation
export const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    await reservation.destroy();

    res.status(204).end();
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la réservation." });
  }
};
