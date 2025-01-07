import { Reservations, Users } from "../models/index.js";
import { sendConfirmationEmail } from "../mails/mail.js";

// Fonction pour générer un mot de passe aléatoire
function generateRandomPassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

export const createReservation = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      reservation_date,
      reservation_time,
      number_of_people,
      note,
    } = req.body;

    console.log("Requête reçue pour créer une réservation :", req.body);

    // Validation des champs obligatoires
    if (!email || !reservation_date || !reservation_time || !number_of_people) {
      return res.status(400).json({
        message:
          "Les champs 'email', 'reservation_date', 'reservation_time', et 'number_of_people' sont obligatoires.",
      });
    }

    // Vérifier si l'utilisateur existe déjà avec l'email
    let user = await Users.findOne({ where: { email } });

    // Si l'utilisateur n'existe pas, créez-le
    if (!user) {
      console.log(
        "Utilisateur non trouvé, création d'un nouvel utilisateur..."
      );
      const randomPassword = generateRandomPassword();
      user = await Users.create({
        email,
        firstname: firstName,
        lastname: lastName,
        phone,
        password: randomPassword, // Stocker le mot de passe généré
        role_id: 1, // Rôle utilisateur par défaut
      });
      console.log("Nouvel utilisateur créé :", user);
    } else {
      console.log("Utilisateur existant trouvé :", user);
    }

    // Calcul de l'heure de fin (ajout de 1h30 à l'heure de réservation)
    const reservationDateTime = new Date(
      `${reservation_date}T${reservation_time}`
    );
    const endTime = new Date(reservationDateTime.getTime() + 90 * 60000); // Ajoute 1h30 (90 minutes)
    console.log(
      `Heure de réservation : ${reservationDateTime}, Heure de fin : ${endTime}`
    );

    // Création de la réservation
    console.log("Création de la réservation...");
    const reservation = await Reservations.create({
      user_id: user.id,
      reservation_date,
      reservation_time,
      number_of_people,
      places_used: placesUsed,
      note,
      date: new Date(), // Date de création de la réservation
      end_time: endTime, // Heure de fin calculée
    });

    console.log("Réservation créée dans la base de données :", reservation); // Ajout d'un log ici

    // Envoyer un email de confirmation
    await sendConfirmationEmail(reservation);

    res.status(201).json(reservation);
  } catch (error) {
    console.error(
      "Erreur lors de la création de la réservation :",
      error.message
    );
    res.status(500).json({
      message: "Erreur lors de la création de la réservation",
      error: error.message,
    });
  }
};

export const getReservations = async (req, res) => {
  try {
    console.log("Requête reçue pour récupérer toutes les réservations...");

    // Récupérer toutes les réservations avec les détails de l'utilisateur associé
    const reservations = await Reservations.findAll({
      include: [
        {
          model: Users,
          as: "user", // Si vous avez utilisé un alias
        },
      ],
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des réservations:",
      error.message
    );
    res
      .status(500)
      .json({ message: "Error getting reservations", error: error.message });
  }
};

// controllers/reservationsController.js
export async function getReservationsByClientId(req, res) {
  const { clientId } = req.params;

  try {
    const reservations = await Reservations.findAll({
      where: { userId: clientId }, // Filtrer par ID du client
      order: [["date", "DESC"]], // Trier par date décroissante
    });

    if (reservations.length > 0) {
      return res.json(reservations);
    } else {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour ce client." });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des réservations :",
      error.message
    );
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
}

export async function getReservationsByDate(req, res) {
  const { date } = req.query; // Utiliser req.query.date pour obtenir la date depuis les paramètres de requête

  if (!date) {
    return res.status(400).json({ message: "La date est requise." });
  }

  try {
    // Assurez-vous que la date est bien au format YYYY-MM-DD
    const reservations = await Reservations.findAll({
      where: { reservation_date: date }, // Filtrer par date de réservation
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
      order: [["reservation_time", "ASC"]], // Trier par heure de réservation croissante
    });

    if (reservations.length > 0) {
      return res.json(reservations);
    } else {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour cette date." });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des réservations :",
      error.message
    );
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
}
