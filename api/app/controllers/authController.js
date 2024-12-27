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

// Fonction pour s'inscrire
export async function register(req, res) {
  const { email, password, confirmation } = req.body;

  try {
    // Vérification de la correspondance des mots de passe
    if (password !== confirmation) {
      return res
        .status(400)
        .json({ message: "Les mots de passe ne correspondent pas" });
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Un utilisateur existe déjà avec cet email" });
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Création de l'utilisateur
    await Users.create({ email, password: hash, role_id: 1 });

    return res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error.message);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
}
