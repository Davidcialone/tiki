import { User, Role } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// console.log("JWT_SECRET:", process.env.JWT_SECRET);

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    console.log("Tentative de connexion pour:", email);

    if (!email || !password) {
      console.log("Email ou mot de passe manquant");
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Récupérer l'utilisateur avec son rôle
    const user = await User.findOne({
      where: { email },
      include: [{
        model: Role,
        as: 'role'
      }],
      attributes: ['id', 'email', 'password', 'firstname', 'lastname']
    });

    console.log("Utilisateur trouvé:", user?.toJSON());

    if (!user) {
      console.log("Utilisateur non trouvé pour l'email :", email);
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Résultat de la comparaison des mots de passe :", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Mot de passe incorrect");
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Convertir le rôle en format attendu par le frontend
    const roleName = user.role?.name?.toUpperCase() || 'WORKER';
    const normalizedRole = roleName === 'MANAGER' ? 'MANAGER' : 'WORKER';

    // Préparer les données utilisateur pour le token
    const userData = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: normalizedRole
    };

    // Générer le token avec les données utilisateur
    const token = jwt.sign(
      userData,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Token généré avec données utilisateur:", {
      ...userData,
      token: token.substring(0, 20) + '...' // Log partiel du token pour la sécurité
    });

    // Renvoyer le token et les données utilisateur
    return res.status(200).json({
      token,
      user: userData
    });

  } catch (err) {
    console.error("Erreur dans /api/auth/login:", err);
    return res.status(500).json({ 
      message: "Erreur serveur, veuillez réessayer plus tard",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}

// Fonction d'inscription
export async function register(req, res) {
  try {
    const { lastname, firstname, email, phone, password } = req.body;

    console.log("Tentative d'inscription pour:", email);

    // Validation des champs obligatoires
    if (!lastname || !firstname || !email || !password) {
      return res
        .status(400)
        .json({ message: "Tous les champs obligatoires doivent être remplis" });
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }

    // Validation du mot de passe (exemple : longueur minimale)
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
    const hashedPassword = await bcrypt.hash(password, 12);

    // Création de l'utilisateur
    await User.create({
      lastname: lastname.trim(),
      firstname: firstname.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : null,
      password: hashedPassword,
      role_id: 1, // Par défaut, rôle utilisateur
    });

    return res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
}

// Récupération d'un utilisateur par ID
export async function fetchUser(req, res) {
  try {
    const { userId } = req.params;

    console.log("Récupération des informations pour l'utilisateur:", userId);

    // Recherche de l'utilisateur
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Exclusion du mot de passe des données renvoyées
    const { password, ...userData } = user.dataValues;

    return res.status(200).json(userData);
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur, veuillez réessayer plus tard" });
  }
}
