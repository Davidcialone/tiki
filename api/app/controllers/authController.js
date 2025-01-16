import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// console.log("JWT_SECRET:", process.env.JWT_SECRET);

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Log pour vérifier la structure des données reçues
    console.log("Requête de connexion reçue avec email:", email);

    // Vérifiez les champs requis
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });
    console.log("Utilisateur trouvé:", user); // Loggez l'utilisateur pour vérifier le résultat de la requête

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
  console.log("=== BACKEND REGISTER START ===");
  console.log("Headers reçus:", req.headers);
  console.log("Body reçu:", req.body);

  const { lastname, firstname, email, phone, password } = req.body; // Pas besoin de récupérer passwordConfirm ici
  console.log("Données extraites:", {
    lastname,
    firstname,
    email,
    phone,
    hasPassword: !!password,
  });

  try {
    // Validation des champs obligatoires
    if (!lastname || !firstname || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs obligatoires doivent être remplis",
      });
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }

    // Validation du mot de passe (longueur et autres règles)
    if (password.length < 8) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
    }

    // Vérification si un utilisateur existe déjà avec cet email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Un utilisateur existe déjà avec cet email" });
    }

    // Hachage du mot de passe
    const hash = await bcrypt.hash(password, 12);
    if (!hash) {
      return res
        .status(500)
        .json({ message: "Erreur lors du hachage du mot de passe" });
    }

    // Création de l'utilisateur
    await User.create({
      lastname: lastname.trim(),
      firstname: firstname.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : null,
      password: hash,
      role_id: 1,
    }).catch((error) => {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      return res.status(500).json({
        message: "Erreur interne lors de la création de l'utilisateur",
      });
    });

    return res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
}

export async function fetchUser(req, res) {
  try {
    const { userId } = req.params; // Récupération de l'ID de l'utilisateur depuis les paramètres de la route

    // Recherche de l'utilisateur en fonction de l'ID
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Exclure le mot de passe des données renvoyées
    const { password, ...userData } = user.dataValues;

    return res.status(200).json(userData); // Retourner les données de l'utilisateur sans le mot de passe
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur, veuillez réessayer plus tard" });
  }
}
