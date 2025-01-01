import { Users } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Fonction pour s'authentifier
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur par email
    const user = await Users.findOne({ where: { email } });

    // Si l'utilisateur n'est pas trouvé
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérification du mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);

    // Si le mot de passe est incorrect
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error.message);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
}

export async function register(req, res) {
  const { lastname, firstname, email, phone, password, passwordConfirm } =
    req.body;

  try {
    // Validation des champs requis
    if (!lastname || !firstname || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        message: "Tous les champs obligatoires doivent être remplis",
      });
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    // Validation du mot de passe
    if (password.length < 8) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
    }

    // Vérification des mots de passe
    if (password !== passwordConfirm) {
      return res.status(400).json({
        message: "Les mots de passe ne correspondent pas",
      });
    }

    // Vérification de l'utilisateur existant avec try-catch spécifique
    try {
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          message: "Un utilisateur existe déjà avec cet email",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      return res.status(500).json({
        message: "Erreur lors de la vérification de l'email",
      });
    }

    // Hachage du mot de passe
    const hash = await bcrypt.hash(password, 12); // On peut utiliser directement 12 rounds

    // Création de l'utilisateur avec try-catch spécifique
    try {
      await Users.create({
        lastname: lastname.trim(),
        firstname: firstname.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : null,
        password: hash,
        role_id: 1,
      });

      return res.status(201).json({
        message: "Utilisateur créé avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      return res.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
}
