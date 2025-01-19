import { Reservation, User } from "../models/index.js";
import { generateRandomPassword } from "../services/userService.js";
import logger from "../../logger.js";
import jwt from "jsonwebtoken";

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

// Récupérer une réservation par ID
export const getReservationById = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findByPk(reservationId, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstname", "lastname", "email", "phone"],
        },
      ],
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error("Erreur lors de la récupération de la réservation :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération de la réservation.",
      error: error.message,
    });
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
  logger.info(`Début de la suppression pour l'ID: ${reservationId}`);

  try {
    const id = parseInt(reservationId, 10);
    if (isNaN(id)) {
      logger.error(`ID invalide détecté: ${reservationId}`);
      return res
        .status(400)
        .json({ message: "L'ID de la réservation est invalide." });
    }
    logger.info(`ID converti: ${id}`);

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      logger.warn(`Aucune réservation trouvée avec l'ID: ${id}`);
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    await reservation.destroy();
    logger.info(`Suppression réussie pour l'ID: ${id}`);
    res.status(204).end();
  } catch (error) {
    logger.error(`Erreur lors de la suppression: ${error.message}`);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression", error: error.message });
  }
};

export const handleReservationStatus = async (req, res) => {
  const { token } = req.query;
  logger.info("Traitement du changement de statut de réservation");

  try {
    if (!token) {
      logger.warn("Tentative de changement de statut sans token");
      return res.status(400).json({ message: "Token manquant" });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { reservationId, action } = decoded;

    // Trouver la réservation
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      logger.warn(`Réservation non trouvée pour l'ID: ${reservationId}`);
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    // Mettre à jour le statut
    const newStatus = action === "confirm" ? "CONFIRMED" : "CANCELLED";
    await reservation.update({ status: newStatus });

    logger.info(
      `Statut de la réservation ${reservationId} mis à jour: ${newStatus}`
    );

    // Préparer la page de réponse HTML
    const responseHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Statut de la réservation - TIKI</title>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px; 
              background-color: #f5f5f5;
            }
            .container {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              max-width: 600px;
              margin: 0 auto;
            }
            .message { margin: 20px 0; }
            .status-confirm { color: #28a745; }
            .status-cancel { color: #dc3545; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Restaurant TIKI</h1>
            <div class="message">
              <h2 class="status-${action}">
                ${
                  action === "confirm"
                    ? "✅ Réservation confirmée avec succès !"
                    : "❌ Réservation annulée"
                }
              </h2>
              <p>Merci de votre réponse.</p>
              ${
                action === "confirm"
                  ? "<p>Nous avons hâte de vous accueillir !</p>"
                  : "<p>N'hésitez pas à réserver pour une autre date.</p>"
              }
            </div>
          </div>
        </body>
      </html>
    `;

    res.send(responseHtml);
  } catch (error) {
    logger.error("Erreur lors du traitement du statut:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Erreur - TIKI</title>
            <meta charset="UTF-8">
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px;
                background-color: #f5f5f5;
              }
              .error-container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                max-width: 600px;
                margin: 0 auto;
              }
              .error-message { 
                color: #dc3545;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="error-container">
              <h1>Restaurant TIKI</h1>
              <div class="error-message">
                <h2>⚠️ Ce lien a expiré</h2>
                <p>Veuillez contacter le restaurant pour mettre à jour votre réservation.</p>
              </div>
            </div>
          </body>
        </html>
      `);
    }

    res
      .status(500)
      .send("Une erreur est survenue lors du traitement de votre demande.");
  }
};
