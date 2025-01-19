import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import jwt from "jsonwebtoken";

dotenv.config();

const apiBaseUrl = process.env.API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error("API_BASE_URL n'est pas défini dans le fichier .env");
}
const JWT_SECRET = process.env.JWT_SECRET; // Ajoutez cette clé dans votre .env

// Fonction pour générer un token sécurisé
const generateReservationToken = (reservationId, action) => {
  return jwt.sign(
    {
      reservationId,
      action,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Expire dans 24h
    },
    JWT_SECRET
  );
};

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

    if (!emailData.reservation.id) {
      throw new Error("ID de réservation manquant dans l'objet reservation");
    }

    const transporter = await createTransporter();
    const emailresto = process.env.EMAIL_ADDRESS;

    // Générer des tokens sécurisés pour la confirmation et l'annulation
    const confirmToken = generateReservationToken(
      emailData.reservation.id,
      "confirm"
    );
    const cancelToken = generateReservationToken(
      emailData.reservation.id,
      "cancel"
    );

    // Création des URLs avec les tokens selon la nouvelle structure
    const confirmLink = `${apiBaseUrl}/api/reservations/${emailData.reservation.id}/status?token=${confirmToken}`;
    const cancelLink = `${apiBaseUrl}/api/reservations/${emailData.reservation.id}/status?token=${cancelToken}`;

    const formattedDate = formatDateFrench(
      emailData.reservation.reservation_date
    );

    console.log("confirmLink:", confirmLink);
    console.log("cancelLink:", cancelLink);

    const emailTemplate = {
      from: emailresto,
      to: emailData.user.email,
      subject: "✨ Confirmation de votre réservation - Restaurant TIKI ✨",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #FF6347; text-align: center;">✨ Confirmation de votre réservation - Restaurant TIKI ✨</h2>
          
          <p>Bonjour <strong>${emailData.user.firstname} ${emailData.user.lastname}</strong>,</p>
          
          <p>Nous sommes ravis de vous confirmer votre réservation au <strong>Restaurant TIKI</strong> !</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin: 10px 0;"><strong>📅 Date :</strong> ${formattedDate}</li>
              <li style="margin: 10px 0;"><strong>🕛 Heure :</strong> ${emailData.reservation.reservation_time}</li>
              <li style="margin: 10px 0;"><strong>👥 Nombre de personnes :</strong> ${emailData.reservation.number_of_people}</li>
            </ul>
          </div>
    
          <p style="text-align: center; margin: 30px 0;">Veuillez confirmer ou annuler votre réservation :</p>
          
          <div style="display: flex; flex-direction: column; gap: 15px; text-align: center;">
            <a href="${confirmLink}" 
               style="display: block; background-color: #28a745; color: white; padding: 15px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-bottom: 15px;">
               ✔️ Confirmer la réservation
            </a>
            
            <a href="${cancelLink}" 
               style="display: block; background-color: #dc3545; color: white; padding: 15px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
               ❌ Annuler la réservation
            </a>
          </div>
    
          <div style="margin-top: 40px; text-align: center; color: #666;">
            <p>Nous vous attendons avec impatience pour partager un moment délicieux et convivial.</p>
            <p>À très bientôt !</p>
            <p style="color: #FF6347; margin-top: 20px;"><strong>🍹 L'équipe TIKI</strong></p>
          </div>
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
