import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log("Email address:", process.env.EMAIL_ADDRESS);
console.log("Gmail pass:", process.env.EMAIL_PASS);

const createTransporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS, // Doit être défini dans .env
        pass: process.env.EMAIL_PASS, // Doit être défini dans .env
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    console.log("Transporteur prêt à envoyer des emails.");
    return transporter;
  } catch (error) {
    console.error(
      "Erreur lors de la création ou de la vérification du transporteur :",
      error
    );
    throw error;
  }
};

export const sendConfirmationEmail = async (emailData) => {
  try {
    console.log("Début de l'envoi d'email...");
    console.log("Données d'email reçues :", emailData);

    if (!emailData?.user || !emailData?.reservation) {
      throw new Error("Données d'email incomplètes");
    }

    // Utilisation du transporteur existant
    const transporter = await createTransporter();
    const emailresto = process.env.EMAIL_ADDRESS;

    const emailTemplate = {
      from: emailresto,
      to: emailData.user.email,
      subject: "Confirmation de réservation - Restaurant TIKI",
      text: `
        Bonjour ${emailData.user.firstname} ${emailData.user.lastname},
        Votre réservation a été confirmée pour le ${emailData.reservation.reservation_date} à ${emailData.reservation.reservation_time}.
        Nombre de personnes : ${emailData.reservation.number_of_people}
        À bientôt!
        L'équipe TIKI
      `,
      html: `
        <h2>Confirmation de réservation - Restaurant TIKI</h2>
        <p>Bonjour ${emailData.user.firstname} ${emailData.user.lastname},</p>
        <p>Votre réservation a été confirmée pour le ${emailData.reservation.reservation_date} à ${emailData.reservation.reservation_time}.</p>
        <p>Nombre de personnes : ${emailData.reservation.number_of_people}</p>
        <p>À bientôt!</p>
        <p>L'équipe TIKI</p>
      `,
    };

    console.log("Template email préparé:", emailTemplate);

    const info = await transporter.sendMail(emailTemplate);
    console.log("Email envoyé avec succès:", info);
    return info;
  } catch (error) {
    console.error("Erreur détaillée lors de l'envoi d'email :", error);
    throw error;
  }
};

export default createTransporter;
