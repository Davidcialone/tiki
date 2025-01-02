const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// || "http://localhost:5000";

// Utility function for validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  return !phone || /^\d{10,15}$/.test(phone);
};

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

export async function Register({
  lastname,
  firstname,
  email,
  phone,
  password,
  passwordConfirm,
  role_id = 1,
}) {
  // Log des données reçues
  console.log("=== DEBUG REGISTER START ===");
  console.log("1. Données reçues:", {
    lastname,
    firstname,
    email,
    phone,
    role_id,
    hasPassword: !!password,
    hasPasswordConfirm: !!passwordConfirm,
  });

  // Validation des champs requis
  const requiredFields = { lastname, firstname, email, password };
  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    console.log("2. Champs manquants:", missingFields);
    throw new Error(`Champs manquants: ${missingFields.join(", ")}`);
  }

  // Préparation du payload
  const payload = {
    lastname: lastname?.trim(),
    firstname: firstname?.trim(),
    email: email?.toLowerCase().trim(),
    phone: phone?.trim() || "",
    password,
    role_id: 1, // Forcer role_id à 1
  };

  console.log("3. Payload préparé:", {
    ...payload,
    password: "[MASQUÉ]",
  });

  try {
    // Log de la requête complète
    console.log("4. Envoi de la requête:", {
      url: `${apiBaseUrl}/api/auth/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("5. Status de la réponse:", response.status);
    console.log(
      "6. Headers de la réponse:",
      Object.fromEntries(response.headers)
    );

    // Récupérer et logger le texte brut de la réponse
    const responseText = await response.text();
    console.log("7. Réponse brute:", responseText);

    // Tenter de parser la réponse JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log("8. Données parsées:", data);
    } catch (e) {
      console.error("9. Erreur de parsing JSON:", e);
      throw new Error("Réponse invalide du serveur");
    }

    if (!response.ok) {
      console.error("10. Erreur de réponse:", data);
      throw new Error(data.message || "Erreur lors de l'inscription");
    }

    console.log("=== DEBUG REGISTER SUCCESS ===");
    return data;
  } catch (error) {
    console.error("=== DEBUG REGISTER ERROR ===");
    console.error("Erreur complète:", error);
    throw error;
  }
}

export async function Login({ email, password }) {
  if (!email?.trim() || !password) {
    throw new ApiError("Email et mot de passe requis", 400);
  }

  if (!validateEmail(email)) {
    throw new ApiError("Format d'email invalide", 400);
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        password,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        data?.message || getDefaultErrorMessage(response.status),
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error instanceof TypeError) {
      throw new ApiError("Erreur de connexion au serveur", 503);
    }

    throw new ApiError("Erreur lors de la connexion", 500);
  }
}

export async function fetchUserDetails(userId) {
  try {
    const response = await fetch(`${apiBaseUrl}/api/users/${userId}`);
    if (!response.ok) {
      throw new ApiError(
        "Erreur lors de la récupération des détails de l'utilisateur",
        response.status
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new ApiError(
      error.message ||
        "Erreur lors de la récupération des détails de l'utilisateur",
      500
    );
  }
}

function getDefaultErrorMessage(status) {
  const messages = {
    400: "Données invalides",
    401: "Non autorisé",
    403: "Accès refusé",
    404: "Ressource non trouvée",
    409: "Un utilisateur existe déjà avec cet email",
    500: "Erreur serveur, veuillez réessayer plus tard",
  };
  return messages[status] || "Une erreur est survenue";
}
