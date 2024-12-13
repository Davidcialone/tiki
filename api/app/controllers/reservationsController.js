import { Users } from "../models/Users.js";
import { Reservations } from "../models/Reservations.js ";

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

    console.log(
      "Requête reçue pour créer une réservation avec les données suivantes:"
    );
    console.log({
      email,
      firstName,
      lastName,
      phone,
      reservation_date,
      reservation_time,
      number_of_people,
      note,
    });

    // Vérifier si l'utilisateur existe déjà avec l'email
    console.log(`Recherche d'un utilisateur avec l'email: ${email}`);
    let user = await Users.findOne({ where: { email } });

    // Si l'utilisateur n'existe pas, créez-le
    if (!user) {
      console.log(
        "Utilisateur non trouvé, création d'un nouvel utilisateur..."
      );
      user = await Users.create({
        email,
        firstname: firstName,
        lastname: lastName,
        phone,
        role_id: 1, // Le rôle utilisateur par défaut, à ajuster selon vos besoins
      });
      console.log("Nouvel utilisateur créé avec succès:", user);
    } else {
      console.log("Utilisateur existant trouvé:", user);
    }

    // Calcul de places_used
    const placesUsed = Math.ceil(number_of_people / 2) * 2; // Arrondir à la valeur supérieure si impair
    console.log(
      `Nombre de personnes: ${number_of_people}, Places utilisées calculées: ${placesUsed}`
    );

    // Calcul de l'heure de fin (ajout de 1h30 à l'heure de réservation)
    const reservationDateTime = new Date(
      `${reservation_date} ${reservation_time}`
    );
    const endTime = new Date(reservationDateTime.getTime() + 90 * 60000); // Ajoute 1h30 (90 minutes)
    console.log(
      `Heure de réservation: ${reservationDateTime}, Heure de fin calculée: ${endTime}`
    );

    // Créer la réservation avec l'utilisateur récupéré ou nouvellement créé
    console.log("Création de la réservation...");
    const reservation = await Reservations.create({
      user_id: user.id, // Utilisation de l'ID de l'utilisateur existant ou créé
      reservation_date,
      reservation_time,
      number_of_people,
      places_used: placesUsed,
      note,
      date: new Date(), // Date de création de la réservation (actuelle)
      end_time: endTime, // Heure de fin calculée
    });
    console.log("Réservation créée avec succès:", reservation);

    res.status(201).json(reservation);
  } catch (error) {
    console.error(
      "Erreur lors de la création de la réservation:",
      error.message
    );
    res
      .status(500)
      .json({ message: "Error creating reservation", error: error.message });
  }
};
