import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale"; // Import de la locale française

const lunchTimes = [
 "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00"
];

const dinnerTimes = [
   "19:00", "19:15", "19:30", "19:45", "20:00","20:15", "20:30", "20:45", "21:00"
];

export function ReservationModal({ isOpen, onClose, zones, onSubmit }) {
  // Dates et horaires par défaut si non disponibles
  const defaultAvailableDates = [new Date()]; // Par défaut, la date actuelle
  const defaultAvailableTimes = ["11:45","12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00", "18:45","19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45","21:00"]; // Liste d'horaires par défaut

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    people: 1,
    date: defaultAvailableDates[0], // Par défaut, la première date disponible
    time: lunchTimes[0], // Par défaut, on commence avec un horaire de midi
    zone: zones.length > 0 ? zones[0] : "", // Par défaut, première zone
  });

  // Gestion des changements de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion du changement de date
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };

    // Fonction pour gérer la sélection de l'heure
    const handleTimeClick = (time) => {
      setFormData((prev) => ({
        ...prev,
        time: time,
      }));
    };

  // Fonction pour basculer entre les horaires du midi et du soir
  const toggleTimePeriod = () => {
    setFormData((prev) => ({
      ...prev,
      isLunch: !prev.isLunch,
      time: prev.isLunch ? dinnerTimes[0] : lunchTimes[0], // Met à jour l'heure par défaut quand on change de période
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Fermer la modale après soumission
  };

  if (!isOpen) return null; // Si la modale est fermée, ne rien afficher

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
          width: "400px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "black",
            border: "1px solid black",
            borderRadius: "6px",
          }}
        >
          Réservation
        </h2>
        <form onSubmit={handleSubmit}>
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

          {/* Nom */}
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


          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Nombre de personnes</label>
            <select
              name="people"
              value={formData.people}
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




          {/* Date */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              locale={fr} // Application de la locale française
              placeholderText="Sélectionnez une date"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Choix du Midi ou du Soir */}
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

         {/* Liste des horaires */}
         <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "black" }}>
              Horaire
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
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
                    backgroundColor: formData.time === time ? "#4CAF50" : "#fff",
                    color: formData.time === time ? "#fff" : "#000",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Zone */}
          {/* <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "black" }}>Zone</label>
            <select
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone.charAt(0).toUpperCase() + zone.slice(1)}
                </option>
              ))}
            </select>
          </div> */}

          {/* Boutons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Réserver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
