// test-email.js
import { sendConfirmationEmail } from "../api/app/mails/mail.js";

async function testEmailSending() {
  // Création d'une réservation de test
  const testReservation = {
    user: {
      firstName: "Test",
      lastName: "Utilisateur",
      email: "oresto69330@gmail.com", // Remplacez par votre email pour le test
    },
    number_of_people: 2,
    reservation_date: new Date(),
    reservation_time: "19:30",
    phone: "0123456789",
  };

  try {
    console.log("Démarrage du test d'envoi d'email...");
    await sendConfirmationEmail(testReservation);
    console.log("✅ Test réussi ! Vérifiez votre boîte mail.");
  } catch (error) {
    console.error("❌ Échec du test :", error);
    console.error("Details de l'erreur:", error.message);
    if (error.response) {
      console.error("Réponse du serveur:", error.response.body);
    }
  }
}

// Exécuter le test
testEmailSending();
