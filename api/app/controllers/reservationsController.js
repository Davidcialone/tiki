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

    // Filtrer les champs à mettre à jour
    const updateFields = [
      "email",
      "reservation_date",
      "reservation_time",
      "number_of_people",
      "status",
    ];
    const updateData = {};

    // Ajouter uniquement les champs présents dans le formulaire
    updateFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Validation des champs
    if (updateData.email && !isValidEmail(updateData.email)) {
      return res
        .status(400)
        .json({ message: "Le format de l'email est invalide." });
    }

    if (
      updateData.reservation_time &&
      !isValidTime(updateData.reservation_time)
    ) {
      return res
        .status(400)
        .json({ message: "Le format de l'heure est invalide (ex: HH:MM)." });
    }

    if (updateData.number_of_people < 1) {
      return res
        .status(400)
        .json({ message: "Le nombre de personnes doit être au moins 1." });
    }

    // Si aucune des modifications n'a été faite, renvoyer une erreur
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "Aucune modification n'a été apportée." });
    }

    // Mettre à jour la réservation
    const updatedReservation = await reservation.update(updateData);

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
  try {
    const { reservationId } = req.params; // Utilisation de reservationId
    const { token } = req.query;

    logger.info("Requête reçue pour mise à jour du statut de réservation", {
      reservationId,
      token: token ? "présent" : "absent",
    });

    if (!reservationId) {
      logger.error("ID de réservation manquant dans l'URL");
      return res.status(400).send("ID de réservation manquant");
    }

    if (!token) {
      logger.warn("Tentative de changement de statut sans token");
      return res.status(400).json({ message: "Token manquant" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      logger.info("Token décodé avec succès", { decoded });
    } catch (error) {
      logger.error("Erreur lors de la vérification du token", { error });
      throw error;
    }

    const { action } = decoded;
    logger.info("Action extraite du token", { action });

    // Validation de l'ID
    const id = parseInt(reservationId, 10);
    if (isNaN(id)) {
      logger.error(`ID de réservation invalide: ${reservationId}`);
      return res.status(400).json({
        message: "ID de réservation invalide",
        error: "L'ID doit être un nombre",
      });
    }
    logger.info("ID de réservation validé", { id });

    // Récupération de la réservation et de l'utilisateur associé
    const reservation = await Reservation.findByPk(id, {
      include: [
        {
          model: User,
          as: "user", // Utilisation de l'alias correct
          attributes: ["firstname", "lastname", "email"],
        },
      ],
    });

    if (!reservation) {
      logger.warn(`Réservation non trouvée pour l'ID: ${id}`);
      return res.status(404).json({
        message: "Réservation non trouvée",
        error: `Aucune réservation trouvée avec l'ID: ${id}`,
      });
    }

    logger.info("Réservation trouvée", { reservation });

    if (!reservation.user) {
      logger.warn(`Utilisateur non trouvé pour la réservation ID: ${id}`);
      return res.status(404).json({
        message: "Utilisateur associé non trouvé",
        error: "Aucun utilisateur n'est associé à cette réservation.",
      });
    }

    logger.info("Utilisateur associé trouvé", { user: reservation.user });

    // Mise à jour avec les nouveaux statuts ENUM
    const newStatus = action === "confirm" ? "confirmed" : "cancelled";
    await reservation.update({ status: newStatus });

    logger.info(`Statut de la réservation ${id} mis à jour`, { newStatus });

    // Utilisation des données utilisateur avec valeurs par défaut
    const userFirstName = reservation.user.firstname || "Cher client";
    const userLastName = reservation.user.lastname || "";

    logger.info("Données utilisateur pour le rendu HTML", {
      userFirstName,
      userLastName,
    });

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
              <p>Merci ${userFirstName} ${userLastName} pour votre réponse.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    res.send(responseHtml);
  } catch (error) {
    logger.error("Erreur lors du traitement du statut", { error });

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        message: "Le lien a expiré",
        error:
          "Veuillez contacter le restaurant pour mettre à jour votre réservation",
      });
    }

    res.status(500).json({
      message: "Erreur lors du traitement de la demande",
      error: error.message,
    });
  }
};

export const getNewReservations = async (req, res) => {
  try {
    console.log("lastCheck:", req.query.lastCheck); // Afficher lastCheck
    const lastCheck = req.query.lastCheck
      ? new Date(req.query.lastCheck)
      : null;

    // Ajoutez un log pour vérifier si la requête à la base de données se fait correctement
    console.log("Vérification des réservations depuis:", lastCheck);

    const newReservations = await Reservation.findAll({
      where: {
        status: "confirmed",
        ...(lastCheck && { updatedAt: { $gt: lastCheck } }),
      },
    });

    const reservationsData = newReservations.map((reservation) =>
      reservation.get()
    );

    console.log("Réservations récupérées:", reservationsData); // Afficher les réservations récupérées
    res.status(200).json(reservationsData);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des nouvelles réservations:",
      error.message
    );
    console.error("Stack trace:", error.stack); // Affiche la stack trace complète

    res.status(500).send("Erreur serveur");
  }
};
