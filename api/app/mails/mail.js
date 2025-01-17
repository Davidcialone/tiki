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
  try {
    console.log("Début de l'envoi d'email...");
    console.log("Données d'email reçues :", emailData);

    if (!emailData?.user || !emailData?.reservation) {
      throw new Error("Données d'email incomplètes");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailTemplate = {
      from: process.env.EMAIL_USER,
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
    return info;
  } catch (error) {
    console.error("Erreur détaillée :", error);
    throw error;
  }
};
export default createTransporter;
