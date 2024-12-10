import express from "express";
import path from "path";
import cors from "cors";
import sequelize from "./db.js";
import { router as apiRouter } from "./app/routers/index.js";
import dotenv from "dotenv";

// Chargement des variables d'environnement
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        // Autorise les origines null (requêtes sans origine), vos domaines, et les sous-domaines Vercel
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

// Middleware pour le parsing des JSON et des données encodées en URL
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Route de vérification de l'état du serveur
app.get("/", (req, res) => {
  res.send("API est en cours d'exécution");
});

// Routes de l'API
app.use("/api", apiRouter);

// Servir les fichiers statiques du frontend en production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(process.cwd(), "client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "client/dist", "index.html"));
  });
}

// Démarrage du serveur
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
  }
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
