const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Utility function for validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  return !phone || /^\d{10,15}$/.test(phone);
};

const validatePassword = (password) => {
  return password && password.length >= 8;
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

// Fonction utilitaire pour la validation des champs requis
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter((field) => !data[field]?.trim());
  if (missingFields.length > 0) {
    throw new ApiError(`Champs manquants: ${missingFields.join(", ")}`, 400);
  }
};

// Fonction pour obtenir les messages d'erreur par défaut
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

export async function Register({
  lastname,
  firstname,
  email,
  phone,
  password,
  role_id = 1,
}) {
  try {
    // Validation des champs requis
    validateRequiredFields({ lastname, firstname, email, password }, [
      "lastname",
      "firstname",
      "email",
      "password",
    ]);

    // Validations spécifiques
    if (!validateEmail(email)) {
      throw new ApiError("Format d'email invalide", 400);
    }

    if (!validatePassword(password)) {
      throw new ApiError(
        "Le mot de passe doit contenir au moins 8 caractères",
        400
      );
    }

    if (phone && !validatePhone(phone)) {
      throw new ApiError("Format de téléphone invalide", 400);
    }

    // Préparation du payload
    const payload = {
      lastname: lastname.trim(),
      firstname: firstname.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || "",
      password,
      role_id,
    };

    const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
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
    throw new ApiError(error.message || "Erreur lors de l'inscription", 500);
  }
}

export async function Login({ email, password }) {
  console.log("=== DEBUG LOGIN START ===");

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

    // Log de la réponse brute
    const responseText = await response.text();
    console.log("Réponse brute du serveur:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
      console.log("Données parsées:", data);
    } catch (e) {
      console.error("Erreur parsing JSON:", e);
      throw new Error("Format de réponse invalide");
    }

    if (!response.ok) {
      throw new ApiError(
        data?.message || getDefaultErrorMessage(response.status),
        response.status
      );
    }

    if (!data.token) {
      throw new Error("Token manquant dans la réponse");
    }

    return data;
  } catch (error) {
    console.error("Erreur Login:", error);
    throw error;
  }
}

export async function fetchUserDetails(userId) {
  try {
    const token = Cookies ? Cookies.get("token") : null;

    if (!token) {
      throw new ApiError("Token d'authentification manquant", 401);
    }

    const response = await fetch(`${apiBaseUrl}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        getDefaultErrorMessage(response.status),
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      "Erreur lors de la récupération des détails de l'utilisateur",
      500
    );
  }
}
