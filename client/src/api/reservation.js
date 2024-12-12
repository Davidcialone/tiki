import { Users, Reservations } from "../../../api/app/models/index.js";

export async function createReservation(req, res) {
  const {
    firstName,
    lastName,
    email,
    phone,
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
      numberOfPeople,
      reservationDate,
      reservationTime,
      placesUsed,
    });

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
        numberOfPeople,
        reservationDate,
        reservationTime,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("Réservation effectuée avec succès !");
    } else {
      alert("Erreur lors de la réservation.");
    }

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

    // Vérifier que la réservation existe
    if (!reservation) {
      return res.status(404).json({ error: "Réservation non trouvée." });
    }

    // Mettre à jour la réservation
    await reservation.update({
      firstName,
      lastName,
      email,
      people,
      date,
      time,
    });

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
    return res.status(400).json({
      error: "Veuillez fournir l'ID de la réservation à supprimer.",
    });
  }

  try {
    // Recherche de la réservation à supprimer
    const reservation = await Reservations.findByPk(reservationId);

    // Vérifier que la réservation existe
    if (!reservation) {
      return res.status(404).json({ error: "Réservation non trouvée." });
    }

    // Supprimer la réservation
    await reservation.destroy();

    // Renvoyer une réponse 204 No Content
    res.status(204).end();
  } catch (error) {
    // Gestion des erreurs de la base de données
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la suppression de la réservation.",
    });
  }
}

export async function getReservations(req, res) {
  try {
    // Récupérer toutes les réservations
    const reservations = await Reservations.findAll();

    // Renvoyer les réservations
    res.json(reservations);
  } catch (error) {
    // Gestion des erreurs de la base de données
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des réservations.",
    });
  }
}
