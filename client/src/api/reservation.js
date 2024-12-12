import { Users, Reservations } from "../../../api/app/models/index.js";
import fetch from "node-fetch"; // Assurez-vous que fetch est correctement importé si vous utilisez Node.js

export async function createReservation(req, res) {
  const {
    firstName,
    lastName,
    email,
    phone,
    note,
    numberOfPeople,
    reservationDate,
    reservationTime,
  } = req.body;

  // Vérifier que toutes les données nécessaires sont fournies
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !numberOfPeople ||
    !reservationDate ||
    !reservationTime
  ) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir toutes les informations nécessaires." });
  }

  // Validation du format de l'email (vous pouvez ajouter une validation plus poussée)
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ error: "L'email est invalide." });
  }

  // Vérification du numéro de téléphone (exemple simple)
  if (!/^\d{10}$/.test(phone)) {
    return res
      .status(400)
      .json({ error: "Le numéro de téléphone est invalide." });
  }

  // Calculer les places utilisées comme un multiple de 2
  const placesUsed =
    numberOfPeople % 2 === 0 ? numberOfPeople : numberOfPeople + 1;

  try {
    // Créer une nouvelle réservation
    const newReservation = await Reservations.create({
      firstName,
      lastName,
      email,
      phone,
      note,
      numberOfPeople,
      reservationDate,
      reservationTime,
    });

    // Vous pouvez envoyer un fetch à un autre serveur si nécessaire
    const response = await fetch("http://localhost:5000/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        note,
        numberOfPeople,
        reservationDate,
        reservationTime,
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi des données au serveur externe");
    }

    const data = await response.json();
    console.log("Réservation envoyée au serveur externe avec succès", data);

    // Répondre au client avec la nouvelle réservation
    res.status(201).json(newReservation);
  } catch (error) {
    // Gestion des erreurs de la base de données et de la requête `fetch`
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de la réservation.",
    });
  }
}
