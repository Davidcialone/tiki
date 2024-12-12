import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale"; // Import de la locale française



const lunchTimes = [
 "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00","14:15", "14:30"
];

const dinnerTimes = [
   "19:00", "19:15", "19:30", "19:45", "20:00","20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30"
];

export function ReservationModal({ isOpen, onClose, zones, onSubmit }) {

  const today = new Date(); // Date actuelle

   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    people: 1,
    date: today,
    time: lunchTimes[0], // Par défaut, on commence avec un horaire de midi
    isLunch: true, // Par défaut, on commence avec le midi
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

const handleTimeClick = (time) => {
  if (!isValidDate(formData.date)) {
    alert("Veuillez sélectionner une date valide avant de choisir un horaire.");
    return;
  }
  if (!isValidTimeForDate(time, formData.date)) {
    alert("L'horaire sélectionné n'est pas disponible pour la date choisie.");
    return;
  }

  setFormData((prev) => ({
    ...prev,
    time: time,
  }));
};
  

// Valider que la date sélectionnée est valide selon les jours d'ouverture
const isValidDate = (date) => {
  if (!date) return false;
  const day = date.getDay(); // 0: Dimanche, 1: Lundi, ..., 6: Samedi

  // Règles pour les jours spécifiques
  switch (day) {
    case 1: // Lundi fermé
      return false;
    case 2: // Mardi ouvert uniquement le midi
    case 3: // Mercredi ouvert uniquement le midi
      return formData.isLunch;
    case 4: // Jeudi ouvert midi et soir
    case 5: // Vendredi ouvert midi et soir
    case 6: // Samedi ouvert midi et soir
      return true;
    case 0: // Dimanche ouvert uniquement le midi
      return formData.isLunch;
    default:
      return false;
  }
};

// Filtrer les dates invalides dans le sélecteur
const filterDate = (date) => {
  const day = date.getDay();
  // Lundi (1) est exclu, et dimanche soir (0) est exclu
  return day !== 1;
};

const isValidTimeForDate = (time, date) => {
  const day = date.getDay();
  // Conditions personnalisées selon le jour
  if ((day === 2 || day === 3 || day === 0) && !formData.isLunch) {
    return false; // Mardi, mercredi, et dimanche : pas de dîner
  }
  return true; // Tous les autres horaires sont valides pour les jours restants
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
    // Vérifier si la date est valide
    if (!isValidDate(formData.date)) {
      alert("Veuillez sélectionner une date valide.");
      return;
    }
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

          {/* Phone */}
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
              minDate={today}
              placeholderText="Sélectionnez une date"
              filterDate={filterDate} // Filtrer les dates invalides
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
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {(formData.isLunch ? lunchTimes : dinnerTimes).map((time) => (
                <button
                key={time}
                type="button"
                onClick={() => {
                  // Alerte si l'horaire est grisé
                  if (!isValidTimeForDate(time, formData.date)) {
                    alert("L'horaire sélectionné n'est pas disponible pour la date choisie.");
                  } else {
                    handleTimeClick(time); // Si valide, on sélectionne l'horaire
                  }
                }}
                // disabled={!isValidDate(formData.date) || (formData.date && !isValidTimeForDate(time, formData.date))}
                style={{
                  padding: "10px",
                  backgroundColor: formData.time === time ? "#4CAF50" : "#fff",
                  color: formData.time === time ? "#fff" : "#000",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  opacity: !isValidDate(formData.date) || (formData.date && !isValidTimeForDate(time, formData.date)) ? 0.5 : 1,
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
