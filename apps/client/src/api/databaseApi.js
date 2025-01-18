const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// || "http://localhost:5000";

export async function activateDatabase() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/activate`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(
        `Erreur serveur : ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (err) {
    console.error(
      "Erreur lors de l'activation de la base de données :",
      err.message
    );
    throw err;
  }
}
