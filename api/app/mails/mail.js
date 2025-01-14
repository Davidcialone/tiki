import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const createTransporter = async () => {
  try {
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
