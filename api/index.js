import express from "express";
import path from "path";
import cors from "cors";
import sequelize from "./db.js";
import { router as apiRouter } from "./app/routers/index.js";
import dotenv from "dotenv";

// Charger le fichier .env approprié
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });

// Vérification des variables d'environnement nécessaires
const requiredEnvVars = [
  "FRONTEND_URL_CLIENT",
  "FRONTEND_URL_EMPLOYEE",
  "PG_URL",
];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(
      `Erreur : la variable d'environnement ${varName} est manquante.`
    );
    process.exit(1);
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      process.env.FRONTEND_URL_CLIENT,
      process.env.FRONTEND_URL_EMPLOYEE,
    ].filter(Boolean), // Supprime les valeurs non définies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware pour parser les JSON et données encodées
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Log des requêtes entrantes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route d'état du serveur
app.get("/", (req, res) => {
  res.send("API est en cours d'exécution");
});

// Routes de l'API
app.use("/api", apiRouter);

// Servir les fichiers statiques en production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(process.cwd(), "client/dist");
  app.use(express.static(clientPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// Démarrage du serveur après la connexion à la base de données
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");
    await sequelize.sync({ alter: true });
    console.log("Modèles synchronisés.");
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  } catch (error) {
    console.error(
      "Erreur lors de la connexion à la base de données :",
      error.message
    );
    process.exit(1);
  }
});
