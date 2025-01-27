import Cookies from "js-cookie"; // Utilisez une bibliothèque comme js-cookie pour simplifier la gestion des cookies

// Sauvegarder les données dans un cookie
export const saveToCookie = (key, value) => {
  const currentData = JSON.parse(Cookies.get("userPreferences") || "{}");
  const newData = { ...currentData, [key]: value };
  Cookies.set("userPreferences", JSON.stringify(newData), { expires: 7 }); // Expire dans 7 jours
};

// Récupérer les données depuis le cookie
export const getFromCookie = (key) => {
  const data = JSON.parse(Cookies.get("userPreferences") || "{}");
  return data[key];
};

// Supprimer un cookie
export const removeCookie = (key) => {
  const currentData = JSON.parse(Cookies.get("userPreferences") || "{}");
  delete currentData[key];
  Cookies.set("userPreferences", JSON.stringify(currentData), { expires: 7 });
};
