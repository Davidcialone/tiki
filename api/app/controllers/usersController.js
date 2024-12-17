import { Op } from "sequelize";
import { Users } from "../models/Users.js";

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
    const users = await Users.findAll({
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

// userController.js
import { Users } from "../models/Users.js";

// Fonction pour récupérer les détails du client par ID
export async function getClientById(clientId) {
  try {
    // Recherche du client dans la base de données par clientId
    let user = await Users.findByPk(clientId);

    // Si l'utilisateur n'existe pas, log et retour
    if (!user) {
      console.log("Utilisateur non trouvé.");
      throw new Error("Client non trouvé.");
    }

    // Convertir l'objet Sequelize en JSON
    return user.toJSON(); // ou user.get({ plain: true }) selon la version
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du client:",
      error.message
    );
    throw error; // Propagation de l'erreur
  }
}

// Fonction pour créer un nouveau client
export async function createClient(clientData) {
  try {
    // Création d'un nouvel utilisateur dans la base de données
    let newUser = await Users.create(clientData);

    return newUser; // Renvoie les informations du nouvel utilisateur
  } catch (error) {
    console.error("Erreur lors de la création du client:", error.message);
    throw error; // Propagation de l'erreur
  }
}

// Fonction pour mettre à jour les détails du client
export async function updateClient(clientId, clientData) {
  try {
    // Recherche du client dans la base de données par clientId
    let user = await Users.findByPk(clientId);

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
    // Recherche du client dans la base de données par clientId
    let user = await Users.findByPk(clientId);

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
