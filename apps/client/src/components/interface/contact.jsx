import React, { useState } from "react";
import { sendContactEmail } from "../../api/mailsApi";

export function Contact() {
  // États pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Réinitialiser les messages de succès/erreur
    setSuccess(false);
    setError("");

    try {
      // Appel à la fonction d'API pour envoyer l'email
      const response = await sendContactEmail({ email, message });

      // Vérifiez si l'envoi est un succès
      if (response.success) {
        setSuccess(true); // Affiche le message de succès
        setEmail(""); // Réinitialise les champs du formulaire
        setMessage("");
      } else {
        throw new Error(response.message || "Erreur lors de l'envoi.");
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi du formulaire :", err.message);
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <>
      {/* Espace sous la navbar */}
      <div className="mt-16"></div>

      <div className="p-6 font-sans">
        <h1 className="text-2xl font-bold">Contactez-nous</h1>
        <p className="mt-2">Appelez-nous au : 04 78 78 78 78</p>
        <p>Ou contactez-nous par message :</p>

        {/* Messages de feedback */}
        {success && (
          <p className="mt-4 text-green-500">
            Merci pour votre message. Nous reviendrons vers vous sous peu !
          </p>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Formulaire de contact */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-6 flex flex-col gap-4"
        >
          <label htmlFor="email" className="text-sm font-medium">
            Email :
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border rounded focus:ring focus:ring-blue-300"
          />

          <label htmlFor="message" className="text-sm font-medium">
            Message :
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="5"
            className="p-2 border rounded focus:ring focus:ring-blue-300"
          ></textarea>

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
}
