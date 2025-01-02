const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// || "http://localhost:5000";

export async function createReservation(formData) {
  try {
    console.log("=== Sending Reservation Request ===");

    // Ajouter automatiquement un role_id s'il manque dans le formData
    if (!formData.role_id) {
      console.warn("role_id is missing, assigning default value of 1");
      formData.role_id = 1; // Assurez-vous que ce rôle existe dans votre table Roles
    }

    // Afficher les données envoyées pour vérifier que tout est correct
    console.log("Payload:", JSON.stringify(formData));

    // Envoi de la requête à l'API
    const response = await fetch(`${apiBaseUrl}/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Lire et afficher la réponse brute
    const responseText = await response.text();
    console.log("Response Text:", responseText);

    // Vérifier si la réponse est une erreur
    if (!response.ok) {
      throw new Error(responseText || "Reservation creation failed");
    }

    // Tenter de parser la réponse en JSON
    try {
      const responseData = JSON.parse(responseText);
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

    const fullUrl = `${apiBaseUrl}/api/reservations`;
    console.log("Endpoint Full URL:", fullUrl);

    const response = await fetch(fullUrl);

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

    const fullUrl = `${apiBaseUrl}/api/reservations/${id}`;
    console.log("Endpoint Full URL:", fullUrl);

    const response = await fetch(fullUrl);

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

export async function getReservationsByDate(date) {
  try {
    const response = await fetch(`${apiBaseUrl}/api/reservations?date=${date}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des réservations");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur de récupération des réservations:", error);
    throw error;
  }
}
