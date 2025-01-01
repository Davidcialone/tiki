import { Users } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Log pour vérifier la structure des données reçues
    console.log("Requête de connexion reçue avec email:", email);

    // Vérifiez les champs requis
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token généré:", token);
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Erreur dans /api/auth/login:", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur, veuillez réessayer plus tard" });
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
