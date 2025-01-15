import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const createTransporter = async () => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
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
    console.log("Début de l'envoi d'email...");
    const transporter = await createTransporter();
    console.log("Transporteur créé");

    const verifyResult = await transporter.verify();
    console.log("Vérification du transporteur :", verifyResult);

    // Utilise l'association user pour récupérer l'email et le nom
    const user = reservation.User; // assumption: `User` est l'association qui contient l'utilisateur
    if (!user) {
      throw new Error("L'utilisateur associé à la réservation n'existe pas.");
    }

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email, // Utilisation de l'email de l'utilisateur
      subject: "Confirmation de votre réservation",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Confirmation de votre réservation</h2>
          <p>Bonjour ${user.firstname} ${user.lastname},</p>
          <p>Votre réservation a été enregistrée avec succès.</p>
          <p><strong>Détails de la réservation :</strong></p>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Nombre de personnes :</strong> ${
              reservation.number_of_people
            }</li>
            <li><strong>Date :</strong> ${new Date(
              reservation.reservation_date
            ).toLocaleDateString()}</li>
            <li><strong>Heure :</strong> ${reservation.reservation_time}</li>
            <li><strong>Téléphone :</strong> ${reservation.phone}</li>
          </ul>
          <p>Merci de votre confiance.</p>
          <p>Cordialement,</p>
          <p>Votre équipe</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Résultat de l’envoi :", result);

    return result;
  } catch (error) {
    console.error("Erreur détaillée :", error);
    throw error;
  }
}

export default createTransporter;
