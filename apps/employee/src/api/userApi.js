const API_BASE_URL = "https://tiki-ew5j.onrender.com";

export async function Register({
  lastname,
  firstname,
  email,
  phone,
  password,
  passwordConfirm, // Ajout de la confirmation du mot de passe
  role_id = 1,
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

    // Gestion des différents types d'erreurs
    if (!response.ok) {
      const data = await response.json().catch(() => null);

      if (response.status === 400) {
        throw new Error(data?.message || "Données d'inscription invalides");
      }
      if (response.status === 409) {
        throw new Error("Un utilisateur existe déjà avec cet email");
      }
      if (response.status === 500) {
        throw new Error("Erreur serveur, veuillez réessayer plus tard");
      }

      throw new Error("Erreur lors de l'inscription");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Erreur de connexion au serveur");
    }
    throw error; // Renvoi l'erreur originale si ce n'est pas une erreur réseau
  }
}
