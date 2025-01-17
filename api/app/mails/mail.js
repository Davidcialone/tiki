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

export const sendConfirmationEmail = async (emailData) => {
  console.log("Début de l'envoi d'email...");
  try {
    const user = emailData.user;
    console.log("User object:", user);

    if (!user || !user.email) {
      throw new Error("L'utilisateur associé à la réservation n'existe pas.");
    }

    const userData = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: emailData.reservation.phone,
    };

    console.log("Extracted user data:", userData);
    // Vérification des données requises
    if (!userData.email || !userData.firstname || !userData.lastname) {
      throw new Error("Données utilisateur incomplètes");
    }

    const transporter = await createTransporter();
    console.log("Transporteur créé");

    const verifyResult = await transporter.verify();
    console.log("Vérification du transporteur :", verifyResult);

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userData.email,
      subject: "Confirmation de votre réservation",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Confirmation de votre réservation</h2>
          <p>Bonjour ${userData.firstname} ${userData.lastname},</p>
          <p>Votre réservation a été enregistrée avec succès.</p>
          <p><strong>Détails de la réservation :</strong></p>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Nombre de personnes :</strong> ${
              reservation.dataValues.number_of_people
            }</li>
            <li><strong>Date :</strong> ${new Date(
              reservation.dataValues.reservation_date
            ).toLocaleDateString()}</li>
            <li><strong>Heure :</strong> ${
              reservation.dataValues.reservation_time
            }</li>
            <li><strong>Téléphone :</strong> ${userData.phone}</li>
          </ul>
          <p>Merci de votre confiance.</p>
          <p>Cordialement,</p>
          <p>Votre équipe</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Résultat de l'envoi :", result);

    return result;
  } catch (error) {
    console.error("Erreur détaillée :", error);
    throw error;
  }
};
export default createTransporter;
