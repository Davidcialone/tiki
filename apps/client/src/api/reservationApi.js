export async function createReservation(formData) {
  try {
    console.log("=== Sending Reservation Request ===");
    console.log("Endpoint Full URL:", "http://localhost:5000/api/reservations");
    console.log("Payload:", JSON.stringify(formData));

    const response = await fetch("http://localhost:5000/api/reservations", {
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
    console.log("Endpoint Full URL:", "http://localhost:5000/api/reservations");

    const response = await fetch("http://localhost:5000/api/reservations");

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
    console.log(
      "Endpoint Full URL:",
      `http://localhost:5000/api/reservations/${id}`
    );

    const response = await fetch(
      `http://localhost:5000/api/reservations/${id}`
    );

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
