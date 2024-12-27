export async function Register({ lastname, firstname, email, password }) {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lastname, firstname, email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erreur lors de l'inscription.");
  }

  return response.json(); // Retourne les données de la réponse
}
