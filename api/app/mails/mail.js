import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS, // Remplacez par votre adresse email
    pass: process.env.GMAIL_PASS, // Remplacez par votre mot de passe ou token OAuth2
  },
  tls: {
    rejectUnauthorized: false, // Ne pas vérifier les certificats SSL
  },
});

// Test de la configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Erreur de configuration Nodemailer :", error);
  } else {
    console.log("Serveur prêt à envoyer des e-mails");
  }
});

export async function sendConfirmationEmail(reservation) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Adresse email de l'envoyeur
    to: reservation.user.email, // Adresse email du destinataire
    subject: "Confirmation de votre réservation",
    html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Confirmation de votre réservation</h2>
            <p>Bonjour ${reservation.user.firstName} ${
      reservation.user.lastName
    },</p>
            <p>Votre réservation a été enregistrée avec succès.</p>
            <p><strong>Détails de la réservation :</strong></p>
            <ul style="list-style-type: none; padding-left: 0;">
              <li><strong>Nombre de personnes :</strong> ${
                reservation.number_of_people || "Non spécifié"
              }</li>
              <li><strong>Date :</strong> ${
                reservation.reservation_date
                  ? new Date(reservation.reservation_date).toLocaleDateString()
                  : "Non spécifié"
              }</li>
              <li><strong>Heure :</strong> ${
                reservation.reservation_time || "Non spécifié"
              }</li>
              <li><strong>Téléphone :</strong> ${
                reservation.phone || "Non spécifié"
              }</li>
            </ul>
            <p>Merci de votre confiance.</p>
            <p>Cordialement,</p>
            <p>Votre équipe</p>
          </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions); // Vérifiez que le transporteur est correctement configuré
    console.log("E-mail de confirmation envoyé avec succès");
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'e-mail de confirmation :",
      error
    );
    throw error; // Propager l'erreur pour la gérer au niveau supérieur
  }
}
