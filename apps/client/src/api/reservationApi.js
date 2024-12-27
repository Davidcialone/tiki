export async function createReservation(formData) {
  try {
    console.log("=== Sending Reservation Request ===");
    console.log("Endpoint Full URL:", "/api/reservations");
    console.log("Payload:", JSON.stringify(formData));

    // Déterminer l'URL de base en fonction de l'environnement
    let API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Récupération de l'URL de base de l'API
    if (import.meta.env.MODE === "production") {
      // Supprimer le slash initial en production si nécessaire
      API_BASE_URL = API_BASE_URL.replace(/\/$/, ""); // Supprime le slash final éventuel
    }
    const response = await fetch(`${API_BASE_URL}/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("Full Response:", response);
    console.log("Response Status:", response.status);
    console.log(
      "Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log("Response Text:", responseText);

    try {
      const responseData = JSON.parse(responseText);
      console.log("Parsed Response Data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Reservation creation failed");
      }

      return responseData;
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      throw new Error(responseText || "Unexpected response format");
    }
  } catch (error) {
    console.error("Detailed Reservation Error:", error);
    throw error;
  }
}

export async function getReservations() {
  try {
    console.log("=== Sending Reservations Request ===");
    console.log("Endpoint Full URL:", "/api/reservations");

    let API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Récupération de l'URL de base de l'API
    if (import.meta.env.MODE === "production") {
      // Supprimer le slash initial en production si nécessaire
      API_BASE_URL = API_BASE_URL.replace(/\/$/, ""); // Supprime le slash final éventuel
    }

    const response = await fetch(`${API_BASE_URL}/api/reservations`);

    console.log("Full Response:", response);
    console.log("Response Status:", response.status);
    console.log(
      "Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log("Response Text:", responseText);

    try {
      const responseData = JSON.parse(responseText);
      console.log("Parsed Response Data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Reservations fetch failed");
      }

      return responseData;
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      throw new Error(responseText || "Unexpected response format");
    }
  } catch (error) {
    console.error("Detailed Reservations Error:", error);
    throw error;
  }
}

export async function getReservationById(id) {
  try {
    console.log("=== Sending Reservation Request ===");
    console.log("Endpoint Full URL:", `/api/reservations/${id}`);

    const response = await fetch(`${API_BASE_URL}/api/reservations/${id}`);

    console.log("Full Response:", response);
    console.log("Response Status:", response.status);
    console.log(
      "Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log("Response Text:", responseText);

    try {
      const responseData = JSON.parse(responseText);
      console.log("Parsed Response Data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Reservation fetch failed");
      }

      return responseData;
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      throw new Error(responseText || "Unexpected response format");
    }
  } catch (error) {
    console.error("Detailed Reservation Error:", error);
    throw error;
  }
}
