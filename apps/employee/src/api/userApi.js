const API_BASE_URL = "https://tiki-ew5j.onrender.com";

export async function Register({
  lastname,
  firstname,
  email,
  phone,
  password,
  passwordConfirm,
  role_id = 1, // Ajout d'un rôle par défaut
}) {
  // Validations côté client
  if (!lastname || !firstname || !email || !password || !passwordConfirm) {
    throw new Error("Tous les champs obligatoires doivent être remplis");
  }

  // Validation du format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Format d'email invalide");
  }

  // Validation des mots de passe
  if (password !== passwordConfirm) {
    throw new Error("Les mots de passe ne correspondent pas");
  }

  if (password.length < 8) {
    throw new Error("Le mot de passe doit contenir au moins 8 caractères");
  }

  // Validation optionnelle du numéro de téléphone
  if (phone && !/^\d{10,15}$/.test(phone)) {
    throw new Error("Le numéro de téléphone est invalide");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        lastname: lastname.trim(),
        firstname: firstname.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : null,
        password,
        passwordConfirm,
        role_id,
      }),
    });

    // Gestion des réponses HTTP
    if (!response.ok) {
      const data = await response.json().catch(() => null);

      switch (response.status) {
        case 400:
          throw new Error(data?.message || "Données d'inscription invalides");
        case 409:
          throw new Error("Un utilisateur existe déjà avec cet email");
        case 500:
          throw new Error("Erreur serveur, veuillez réessayer plus tard");
        default:
          throw new Error("Erreur lors de l'inscription");
      }
    }

    // Retourne la réponse JSON en cas de succès
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Erreur réseau ou problème de connexion
      throw new Error("Erreur de connexion au serveur");
    }
    throw error; // Renvoie les autres erreurs
  }
}
