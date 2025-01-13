import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const OAuth2 = google.auth.OAuth2;

// Création du client OAuth2
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Fonction pour créer le transporteur avec OAuth2
const createTransporter = async () => {
  try {
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(`Erreur d'accès token: ${err}`);
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    return transporter;
  } catch (error) {
    console.log("Erreur création transporteur :", error);
    throw error;
  }
};

export async function sendConfirmationEmail(reservation) {
  try {
    // Créer le transporteur
    const transporter = await createTransporter();

    // Tester la configuration
    await transporter.verify();

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS, // Changé EMAIL_USER en EMAIL_ADDRESS pour cohérence
      to: reservation.user.email,
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

    await transporter.sendMail(mailOptions);
    console.log("E-mail de confirmation envoyé avec succès");
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'e-mail de confirmation :",
      error
    );
    throw error;
  }
}

export default createTransporter;
