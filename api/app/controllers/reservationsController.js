import { Reservations } from "../models/index.js";

export async function getReservations(req, res) {
  const reservationDate = req.params.reservation_date;

  // Vérifier que la date est bien fournie et au bon format
  if (!reservationDate || isNaN(Date.parse(reservationDate))) {
    return res
      .status(400)
      .json({ error: "La date fournie est invalide ou manquante." });
  }

  try {
    // Recherche des réservations pour la date spécifiée
    const dayReservations = await Reservations.findAll({
      where: {
        date: reservationDate, // Si vous avez besoin d'un format spécifique, vous pouvez le formater ici.
      },
    });

    // Si aucune réservation n'est trouvée, on renvoie un message approprié
    if (dayReservations.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour cette date." });
    }

    // Si des réservations sont trouvées, on les renvoie
    res.json(dayReservations);
  } catch (error) {
    // Gestion des erreurs de la base de données
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des réservations.",
    });
  }
}

export async function getReservation(req, res) {
  const reservationId = req.params.id;

  // Vérifier que l'ID de la réservation est fourni
  if (!reservationId) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir l'ID de la réservation à récupérer." });
  }

  try {
    // Recherche de la réservation par ID
    const reservation = await Reservations.findByPk(reservationId);

    // Vérifier si la réservation existe
    if (!reservation) {
      return res
        .status(404)
        .json({ message: "La réservation demandée n'a pas été trouvée." });
    }

    // Renvoyer la réservation
    res.json(reservation);
  } catch (error) {
    // Gestion des erreurs de la base de données
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération de la réservation.",
    });
  }
}

export async function createReservation(req, res) {
  const { firstName, lastName, email, people, date, time } = req.body;

  // Vérifier que toutes les données nécessaires sont fournies
  if (!firstName || !lastName || !email || !people || !date || !time) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir toutes les informations nécessaires." });
  }

  try {
    // Créer une nouvelle réservation
    const newReservation = await Reservations.create({
      firstName,
      lastName,
      email,
      people,
      date,
      time,
    });

    // Renvoyer la nouvelle réservation
    res.status(201).json(newReservation);
  } catch (error) {
    // Gestion des erreurs de la base de données
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de la réservation.",
    });
  }
}

export async function updateReservation(req, res) {
  const reservationId = req.params.id;
  const { firstName, lastName, email, people, date, time } = req.body;

  // Vérifier que l'ID de la réservation est fourni
  if (!reservationId) {
    return res.status(400).json({
      error: "Veuillez fournir l'ID de la réservation à mettre à jour.",
    });
  }

  try {
    // Recherche de la réservation à mettre à jour
    const reservation = await Reservations.findByPk(reservationId);

    // Vérifier si la réservation existe
    if (!reservation) {
      return res.status(404).json({
        message: "La réservation à mettre à jour n'a pas été trouvée.",
      });
    }

    // Mettre à jour les données de la réservation
    reservation.firstName = firstName;
    reservation.lastName = lastName;
    reservation.email = email;
    reservation.people = people;
    reservation.date = date;
    reservation.time = time;

    // Sauvegarder les modifications
    await reservation.save();

    // Renvoyer la réservation mise à jour
    res.json(reservation);
  } catch (error) {
    // Gestion des erreurs de la base de données
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la mise à jour de la réservation.",
    });
  }
}

export async function deleteReservation(req, res) {
  const reservationId = req.params.id;

  // Vérifier que l'ID de la réservation est fourni
  if (!reservationId) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir l'ID de la réservation à supprimer." });
  }

  try {
    // Recherche de la réservation à supprimer
    const reservation = await Reservations.findByPk(reservationId);

    // Vérifier si la réservation existe
    if (!reservation) {
      return res
        .status(404)
        .json({ message: "La réservation à supprimer n'a pas été trouvée." });
    }

    // Supprimer la réservation
    await reservation.destroy();

    // Renvoyer un message de succès
    res.json({ message: "La réservation a été supprimée avec succès." });
  } catch (error) {
    // Gestion des erreurs de la base de données
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la suppression de la réservation.",
    });
  }
}
