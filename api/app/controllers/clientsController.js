import { Op } from "sequelize";
import { User, Reservation } from "../models/index.js";

// Fonction pour récupérer les clients avec un filtre
export async function getClients(req, res) {
  const { q } = req.query; // Récupérer la recherche depuis la query string (e.g., /clients?q=nom)

  try {
    // Définir la condition de recherche
    let whereCondition = {};

    if (q) {
      whereCondition = {
        [Op.or]: [
          { lastname: { [Op.iLike]: `%${q}%` } }, // Recherche insensible à la casse
          { firstname: { [Op.iLike]: `%${q}%` } },
          { email: { [Op.iLike]: `%${q}%` } },
          { phone: { [Op.iLike]: `%${q}%` } },
        ],
      };
    }

    // Recherche des clients avec ou sans condition
    const users = await User.findAll({
      where: whereCondition, // Applique la condition de recherche si elle existe
    });

    // Si des utilisateurs sont trouvés, les renvoyer
    if (users.length > 0) {
      return res.json(users); // Renvoie la liste des clients trouvés
    } else {
      return res.status(404).json({ message: "Aucun client trouvé." }); // Si aucun client trouvé
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error.message);
    return res.status(500).json({ message: "Erreur interne du serveur." }); // Retourner une erreur si un problème survient
  }
}

// Fonction pour récupérer les détails du client par ID
export async function getClientById(req, res) {
  const { clientId } = req.params; // Récupération du paramètre clientId
  try {
    if (!clientId || isNaN(clientId)) {
      // Vérification si l'ID est valide
      return res.status(400).json({ message: "ID invalide." });
    }

    const user = await User.findByPk(clientId); // Sequelize attend un nombre ou une chaîne

    if (!user) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    return res.json(user);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du client:",
      error.message
    );
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
}

// Fonction pour créer un nouveau client
export async function createClient(clientData) {
  try {
    // Création d'un nouvel utilisateur dans la base de données
    let newUser = await User.create(clientData);

    return newUser; // Renvoie les informations du nouvel utilisateur
  } catch (error) {
    console.error("Erreur lors de la création du client:", error.message);
    throw error; // Propagation de l'erreur
  }
}

// Fonction pour mettre à jour les détails du client
export async function updateClient(clientId, clientData) {
  try {
    if (!clientId || isNaN(clientId)) {
      // Vérification si l'ID est valide
      return res.status(400).json({ message: "ID invalide." });
    }

    const user = await User.findByPk(clientId); // Sequelize attend un nombre ou une chaîne

    // Si l'utilisateur n'existe pas, log et retour
    if (!user) {
      console.log("Utilisateur non trouvé.");
      throw new Error("Client non trouvé.");
    }

    // Mise à jour des détails de l'utilisateur
    user = await user.update(clientData);

    return user; // Renvoie les informations mises à jour de l'utilisateur
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error.message);
    throw error; // Propagation de l'erreur
  }
}

// Fonction pour supprimer un client
export async function deleteClient(clientId) {
  try {
    if (!clientId || isNaN(clientId)) {
      // Vérification si l'ID est valide
      return res.status(400).json({ message: "ID invalide." });
    }

    const user = await User.findByPk(clientId); // Sequelize attend un nombre ou une chaîne

    // Si l'utilisateur n'existe pas, log et retour
    if (!user) {
      console.log("Utilisateur non trouvé.");
      throw new Error("Client non trouvé.");
    }

    // Suppression de l'utilisateur
    await user.destroy();

    return true; // Renvoie true si la suppression a réussi
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error.message);
    throw error; // Propagation de l'erreur
  }
}

// Fonction pour récupérer les réservations d'un client
export async function getClientReservations(clientId) {
  try {
    if (!clientId || isNaN(clientId)) {
      return { status: 400, data: { message: "ID invalide." } };
    }

    const user = await User.findByPk(clientId, {
      include: {
        model: Reservation,
        as: "userReservations",
      },
    });

    if (!user) {
      return { status: 404, data: { message: "Client non trouvé." } };
    }

    // Simplifier les réservations avant de les renvoyer
    const reservations = user.userReservations.map((reservation) => ({
      id: reservation.id,
      user_id: reservation.user_id,
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time,
      number_of_people: reservation.number_of_people,
      status: reservation.status,
      note: reservation.note,
      created_at: reservation.created_at,
      updated_at: reservation.updated_at,
    }));

    return { status: 200, data: reservations }; // Retourner les données formatées avec un code de statut
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des réservations du client :",
      error.message
    );
    return {
      status: 500,
      data: {
        message: "Erreur interne du serveur.",
        error: error.message,
      },
    };
  }
}
