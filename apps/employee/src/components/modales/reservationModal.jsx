import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";
import PropTypes from "prop-types";

const generateTimes = (startHour, endHour) => {
  const times = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      times.push(`${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`);
    }
  }
  return times;
};

const lunchTimes = generateTimes(12, 14);
const dinnerTimes = generateTimes(19, 22);

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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, reservation_date: date }));
  };

  const handleTimeClick = (time) => {
    setFormData((prev) => ({ ...prev, reservation_time: time }));
  };

  const toggleTimePeriod = () => {
    setFormData((prev) => ({
      ...prev,
      isLunch: !prev.isLunch,
      reservation_time: !prev.isLunch ? lunchTimes[0] : dinnerTimes[0],
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.reservation_date) {
      newErrors.reservation_date = "Veuillez sélectionner une date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Prénom obligatoire.";
    if (!formData.lastName) newErrors.lastName = "Nom obligatoire.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email invalide.";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Numéro de téléphone invalide.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) setStep(2);
  };

  const handleBackStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const formattedDate = formData.reservation_date.toISOString().split("T")[0];
      const finalData = { ...formData, reservation_date: formattedDate };
      onSubmit(finalData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 id="modal-title" className="text-2xl font-semibold text-center mb-6">Réservation</h2>
        {Object.values(errors).map((error, index) => (
          <div key={index} className="mb-4 text-red-600 font-semibold text-sm text-center">
            {error}
          </div>
        ))}

        {step === 1 && (
          <div>
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
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBackStep}
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
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
