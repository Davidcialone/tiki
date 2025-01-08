// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", // directement spécifié
//   port: 587, // directement spécifié
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   logger: true,
//   debug: true,
// });
// console.log("Variables d'environnement :", {
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   user: process.env.EMAIL_USER,
//   apiBaseUrl: process.env.API_BASE_URL,
// });

// // Test de la configuration
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("Erreur de configuration Nodemailer :", error);
//   } else {
//     console.log("Serveur prêt à envoyer des e-mails");
//   }
// });

// export async function sendConfirmationEmail(reservation) {
//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Utilisez EMAIL_USER au lieu de GMAIL_USER
//     to: reservation.user.email,
//     subject: "Confirmation de votre réservation",
//     html: `
//       <!-- Votre template HTML reste le même -->
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("E-mail de confirmation envoyé avec succès");
//   } catch (error) {
//     console.error(
//       "Erreur lors de l'envoi de l'e-mail de confirmation :",
//       error
//     );
//     throw error; // Propager l'erreur pour la gérer au niveau supérieur
//   }
// }
