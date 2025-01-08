import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";
import PropTypes from "prop-types";

const lunchTimes = [
  "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30",
];

const dinnerTimes = [
  "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30",
];

export function ReservationModal({ isOpen, onClose, onSubmit }) {
  const today = new Date();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    number_of_people: 1,
    reservation_date: today,
    reservation_time: lunchTimes[0],
    isLunch: true,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, reservation_date: date }));
  };

  const handleTimeClick = (time) => {
    const formattedTime = time.length === 5 ? time : time.substring(0,5); // Assurez-vous que c'est toujours HH:mm
    setFormData((prev) => ({ ...prev, reservation_time: formattedTime }));
  };
  

  const toggleTimePeriod = () => {
    setFormData((prev) => ({
      ...prev,
      isLunch: !prev.isLunch,
      reservation_time: !prev.isLunch ? lunchTimes[0] : dinnerTimes[0],
    }));
  };

  const handleNextStep = () => {
    if (!formData.reservation_date) {
      setErrorMessage("Veuillez sélectionner une date.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handleBackStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formData.reservation_date.toISOString().split("T")[0];
    const finalData = {
      ...formData,
      reservation_date: formattedDate,
    };

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    onSubmit(finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Réservation</h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold text-sm text-center">
            {errorMessage}
          </div>
        )}

        {step === 1 && (
          <div>
            {/* Étape 1 : Choix de la date et de l’heure */}
            <div className="mb-4">
              <label htmlFor="reservation_date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <DatePicker
                id="reservation_date"
                selected={formData.reservation_date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                locale={fr}
                minDate={today}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <button
                onClick={toggleTimePeriod}
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              >
                {formData.isLunch ? "Passer au Soir" : "Passer au Midi"}
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="time_selector" className="block text-sm font-medium text-gray-700 mb-1">
                Horaire
              </label>
              <div id="time_selector" className="grid grid-cols-4 gap-2">
                {(formData.isLunch ? lunchTimes : dinnerTimes).map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      formData.reservation_time === time
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-blue-400 hover:text-white transition`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="number_of_people" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de personnes
              </label>
              <select
                id="number_of_people"
                name="number_of_people"
                value={formData.number_of_people}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleNextStep}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            {/* Étape 2 : Informations personnelles */}
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBackStep}
                className="                px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
              >
                Retour
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
              >
                Confirmer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

ReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

