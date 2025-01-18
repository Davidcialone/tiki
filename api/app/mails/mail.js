import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Charger les variables d'environnement avant de les utiliser
dotenv.config();

const apiBaseUrl = process.env.API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error("API_BASE_URL n'est pas défini dans le fichier .env");
}

const createTransporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
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

const formatDateFrench = (dateStr) => {
  const date = new Date(dateStr);
  return format(date, "EEEE d MMMM yyyy", { locale: fr });
};

export const sendConfirmationEmail = async (emailData) => {
  try {
    console.log("Début de l'envoi d'email...");
    console.log("Données d'email reçues :", emailData);

    if (!emailData?.user || !emailData?.reservation) {
      throw new Error("Données d'email incomplètes");
    }

    if (!emailData.id) {
      throw new Error("ID de réservation manquant");
    }

    const transporter = await createTransporter();
    const emailresto = process.env.EMAIL_ADDRESS;

    const formattedDate = formatDateFrench(
      emailData.reservation.reservation_date
    );

    // Construction des liens avec vérification
    const confirmLink = `${apiBaseUrl}/mails/${emailData.id}/confirm`;
    const cancelLink = `${apiBaseUrl}/mails/${emailData.id}/cancel`;

    console.log("confirmLink:", confirmLink);
    console.log("cancelLink:", cancelLink);

    const emailTemplate = {
      from: emailresto,
      to: emailData.user.email,
      subject: "✨ Confirmation de votre réservation - Restaurant TIKI ✨",
      text: `
        Bonjour ${emailData.user.firstname} ${emailData.user.lastname},

        Nous sommes ravis de vous confirmer votre réservation au Restaurant TIKI !

        📅 Date : ${formattedDate}
        🕛 Heure : ${emailData.reservation.reservation_time}
        👥 Nombre de personnes : ${emailData.reservation.number_of_people}

        Vous pouvez :
        - Confirmer votre réservation ici : ${confirmLink}
        - Annuler votre réservation ici : ${cancelLink}

        Nous vous attendons avec impatience pour partager un moment délicieux et convivial.

        À très bientôt !
        🍹 L'équipe TIKI
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #FF6347;">✨ Confirmation de votre réservation - Restaurant TIKI ✨</h2>
          <p>Bonjour <strong>${emailData.user.firstname} ${emailData.user.lastname}</strong>,</p>
          <p>Nous sommes ravis de vous confirmer votre réservation au <strong>Restaurant TIKI</strong> !</p>
          <ul>
            <li><strong>📅 Date :</strong> ${formattedDate}</li>
            <li><strong>🕛 Heure :</strong> ${emailData.reservation.reservation_time}</li>
            <li><strong>👥 Nombre de personnes :</strong> ${emailData.reservation.number_of_people}</li>
          </ul>
          <p>Vous pouvez :</p>
          <p>
            <a href="${confirmLink}" style="color: #28a745; text-decoration: none; font-weight: bold;">✔️ Confirmer votre réservation</a>
          </p>
          <p>
            <a href="${cancelLink}" style="color: #dc3545; text-decoration: none; font-weight: bold;">❌ Annuler votre réservation</a>
          </p>
          <p>Nous vous attendons avec impatience pour partager un moment délicieux et convivial.</p>
          <p>À très bientôt !</p>
          <p style="color: #FF6347;"><strong>🍹 L'équipe TIKI</strong></p>
        </div>
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
