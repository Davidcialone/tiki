import { Users } from "../models/Users.js";

export async function getClientById(clientId) {
  try {
    // Recherche du client dans la base de données par clientId
    let user = await Users.findByPk(clientId);

    // Si l'utilisateur n'existe pas, log et retour
    if (!user) {
      console.log(
        "Utilisateur non trouvé, création d'un nouvel utilisateur..."
      );
      // Vous pouvez gérer la création de l'utilisateur ici, ou renvoyer un message d'erreur.
      throw new Error("Client non trouvé.");
    }

    return user; // Renvoie les informations de l'utilisateur si trouvé
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du client:",
      error.message
    );
    throw error; // Propagation de l'erreur
  }
}
