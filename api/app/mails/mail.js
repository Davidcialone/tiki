import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Définir l'URL de base de l'API
const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

// Créez un transporteur avec vos informations d'authentification Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Utilisation de la variable d'environnement pour l'email
    pass: process.env.GMAIL_PASS, // Utilisation de la variable d'environnement pour le mot de passe
  },
  logger: true, // Active les journaux SMTP
  debug: true, // Active le mode débogage
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("Erreur de configuration Nodemailer :", error);
  } else {
    console.log("Serveur prêt à envoyer des e-mails");
  }
});

// Fonction pour envoyer l'e-mail de confirmation avec résumé de réservation
export async function sendConfirmationEmail(reservation) {
  const mailOptions = {
    from: process.env.GMAIL_USER, // Assurez-vous que cette variable d'environnement est définie
    to: reservation.user.email, // L'email de l'utilisateur
    subject: "Confirmation de votre réservation",
    html: `
      <h1>Confirmation de votre réservation</h1>
      <p>Bonjour ${reservation.user.firstname} ${reservation.user.lastname},</p>
      <p>Nous avons bien reçu votre réservation pour le ${new Date(
        reservation.reservation_date
      ).toLocaleDateString()} à ${reservation.reservation_time}.</p>
      <p><strong>Détails de la réservation :</strong></p>
      <ul>
        <li><strong>Nom :</strong> ${reservation.user.firstname} ${
      reservation.user.lastname
    }</li>
        <li><strong>Email :</strong> ${reservation.user.email}</li>
        <li><strong>Nombre de personnes :</strong> ${
          reservation.number_of_people
        }</li>
        <li><strong>Date de réservation :</strong> ${new Date(
          reservation.reservation_date
        ).toLocaleDateString()}</li>
        <li><strong>Heure de réservation :</strong> ${
          reservation.reservation_time
        }</li>
      </ul>
      <p>Pour confirmer votre réservation, veuillez cliquer sur le lien suivant :</p>
      <p><a href="${process.env.API_BASE_URL}/mails/${
      reservation.id
    }/confirm">Confirmer ma réservation</a></p>
      <p>Si vous souhaitez annuler votre réservation, veuillez cliquer sur le lien suivant :</p>
      <p><a href="${process.env.API_BASE_URL}/mails/${
      reservation.id
    }/cancel">Annuler ma réservation</a></p>
      <p>Nous vous remercions pour votre confiance et restons à votre disposition pour toute information complémentaire.</p>
      <p>Cordialement,</p>
      <p>[Nom de votre entreprise]</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de confirmation envoyé avec succès");
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'e-mail de confirmation :",
      error
    );
  }
}
