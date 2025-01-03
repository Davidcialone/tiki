import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from "date-fns/locale";
import PropTypes from "prop-types";
import { createReservation } from "../../api/reservationApi";
import emailjs from "emailjs-com";

const lunchTimes = [
  "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30"
];

const dinnerTimes = [
  "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30"
];

export function ReservationModal({ isOpen, onClose, zones, onSubmit }) {

  const today = new Date();
  const [step, setStep] = useState(1); // 1: Disponibilité, 2: Informations
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    number_of_people: 1,
    reservation_date: today,
    reservation_time: lunchTimes[0],
     // isLunch: true,
    // zone_id: zones.length > 0 ? zones[0] : "",
  });
  const [reservationDetails, setReservationDetails] = useState(null);

  // console.log("Détails de la réservation :", reservationDetails);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      reservation_date: date,
    }));
  };

  const handleTimeClick = (time) => {
    setFormData((prev) => ({
      ...prev,
      reservation_time: time,
    }));
  };

  const toggleTimePeriod = () => {
    setFormData((prev) => ({
      ...prev,
      isLunch: !prev.isLunch,
      reservation_time: prev.isLunch ? dinnerTimes[0] : lunchTimes[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    await sendConfirmationEmail(formData);
    onClose();
  };

  const handleNextStep = () => {
    setStep(2); // Passe à la deuxième étape (Informations de réservation)
  };

  const handleBackStep = () => {
    setStep(1); // Revenir à la première étape (Disponibilité)
  };
  const handleSave = async () => {
    try {
      const response = await createReservation(formData);
  
      if (response) {
        console.log("Réservation créée avec succès:", response);
  
        // Mettre à jour reservationDetails avec les informations de la réservation
        setReservationDetails(response); // Vous pouvez ajuster cela en fonction de la structure de la réponse
  
        onSubmit(formData); // Envoie les données au parent
        onClose(); // Ferme la modale
      } else {
        console.error("Erreur lors de la création de la réservation:", response);
        alert("Erreur lors de la création de la réservation");
      }
    } catch (error) {
      console.error("Erreur lors de la création de la réservation:", error);
      alert("Une erreur inattendue s'est produite.");
    }
  };
  

  const sendConfirmationEmail = async (data) => {
    try {
      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        reservation_date: formData.reservation_date.toLocaleDateString(),
        reservation_time: formData.reservation_time,
        number_of_people: formData.number_of_people,
        zone: formData.zone,
        restaurant_email: 'restaurant@example.com', // L'email du restaurant
      };

      // Remplacez "your_service_id" et "your_template_id" par vos identifiants EmailJS
      const response = await emailjs.send(
        "service_48evkpu", 
        "template_0bebbu8", 
        templateParams, 
        "X4v7N02AAcE0oyXCm"
      );

      console.log("Email envoyé avec succès :", response);
      alert("Votre réservation a été confirmée par email !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      alert("Une erreur est survenue lors de l'envoi de la confirmation.");
    }
  };
  


  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>
          Réservation
        </h2>

        {step === 1 && (
          <div>
            {/* Sélection de la disponibilité */}
            {/* Date de la réservation */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Date</label>
              <DatePicker
                selected={formData.reservation_date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                locale={fr}
                minDate={today}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px", textAlign: "center" }}>
              <button
                type="button"
                onClick={toggleTimePeriod}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                {formData.isLunch ? "Passer au Soir" : "Passer au Midi"}
              </button>
            </div>

            {/* Horaire de la réservation */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Horaire</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                {(formData.isLunch ? lunchTimes : dinnerTimes).map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeClick(time)}
                    style={{
                      padding: "10px",
                      backgroundColor: formData.reservation_time === time ? "#4CAF50" : "#f0f0f0",
                      color: formData.reservation_time === time ? "#fff" : "#333",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Nombre de personnes */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Nombre de personnes</label>
              <select
                name="number_of_people"
                value={formData.number_of_people}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Boutons : Annuler et Suivant */}
            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            {/* Informations de réservation */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              {/* Prénom */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              {/* Téléphone */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              {/* Boutons : Retour et Confirmer */}
              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  onClick={handleBackStep}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f0ad4e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Retour
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault(); // Empêche le comportement par défaut
                    handleSave(); // Appel de votre fonction de sauvegarde
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Confirmer                 </button>
              </div>
            </form>
            {reservationDetails && (
              <div>
                <h2>Récapitulatif de votre réservation</h2>
                <p>Nom : {reservationDetails.lastName} {reservationDetails.firstName}</p>
                <p>Email : {reservationDetails.email}</p>
                <p>Date : {reservationDetails.reservation_date}</p>
                <p>Heure : {reservationDetails.reservation_time}</p>
                <p>Nombre de personnes : {reservationDetails.number_of_people}</p>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

ReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  zones: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
